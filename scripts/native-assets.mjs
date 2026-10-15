// Render our own vector mark into platform assets; original artwork stays in public/icon.svg.
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
const executablePath = [
  process.env.CHROMIUM_PATH,
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => p && existsSync(p));
const browser = await chromium.launch({
  executablePath,
  args: process.platform === "linux" ? ["--no-sandbox"] : [],
});
const page = await browser.newPage();
const mark = (await fs.readFile("public/icon.svg", "utf8")).replace(
  'rx="48"',
  'rx="0"',
);
async function render(file, width, height, svg) {
  await page.setViewportSize({ width, height });
  await page.setContent(
    `<style>html,body{margin:0;width:100%;height:100%;background:#f6edf1}svg{display:block;width:100%;height:100%}</style>${svg}`,
  );
  await page.screenshot({ path: file });
}
async function allFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await allFiles(p)));
    else out.push(p);
  }
  return out;
}
const ios = "ios/App/App/Assets.xcassets";
await render(`${ios}/AppIcon.appiconset/AppIcon-512@2x.png`, 1024, 1024, mark);
const inner = mark.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const splash = (w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#f6edf1"/><svg x="${w / 2 - Math.min(w, h) * 0.11}" y="${h / 2 - Math.min(w, h) * 0.11}" width="${Math.min(w, h) * 0.22}" height="${Math.min(w, h) * 0.22}" viewBox="0 0 192 192">${inner}</svg></svg>`;
for (const file of await allFiles(ios))
  if (file.includes("Splash.imageset") && file.endsWith(".png"))
    await render(file, 2732, 2732, splash(2732, 2732));
for (const file of await allFiles("android/app/src/main/res"))
  if (file.endsWith(".png")) {
    const png = await fs.readFile(file);
    const width = png.readUInt32BE(16),
      height = png.readUInt32BE(20);
    await render(
      file,
      width,
      height,
      file.includes("splash") ? splash(width, height) : mark,
    );
  }
await browser.close();
console.log("iOS and Android icons and launch artwork rendered.");
