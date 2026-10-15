export type Listing = {
  id: number;
  title: string;
  category: string;
  description: string;
  kind: "offer" | "request";
  minutes: number;
  credits: number;
  exchange: "direct" | "coins" | "either";
  theme: string;
  status: "published" | "archived";
};
export const emptyListing: Listing = {
  id: 0,
  title: "",
  category: "Photo & vidéo",
  description: "",
  kind: "offer",
  minutes: 60,
  credits: 1,
  exchange: "either",
  theme: "sage",
  status: "published",
};
