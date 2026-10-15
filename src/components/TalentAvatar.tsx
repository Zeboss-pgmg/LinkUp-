// Frame workshop photographs as portraits without changing the source assets.
export default function TalentAvatar({ src, size = 38 }: { src: string; size?: number }) {
  const scene = /\/(noah|ines|adam|mila|sami|jade)\.webp$/.test(src);
  return (
    <span className="talent-avatar" style={{ width: size, height: size }}>
      <img src={src} alt="" className={scene ? "scene-portrait" : ""} />
    </span>
  );
}
