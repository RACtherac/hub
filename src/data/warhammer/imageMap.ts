// ─────────────────────────────────────────────────────────────────────────────
// IMAGE MAP  —  fill these in as you add images to public/warhammerimages/
//
// Keys are the unit/character/wargear IDs that come back from the API.
// Leave a key out (or set it to undefined) and the image slot will be empty.
// ─────────────────────────────────────────────────────────────────────────────

// Unit images.
// Infantry / battleline units can have size-specific images (image5, image10).
// Vehicles / monsters / transports use a single `image`.
export const unitImageMap: Record<
  string,
  { image?: string; image3?: string; image5?: string; image6?: string; image10?: string }
> = {
  // Space Marines
  "intercessors": {
    image5:  "/warhammerimages/SpaceMarine/intercessor5.png",
    image10: "/warhammerimages/SpaceMarine/intercessor10.png",
  },
  "assault-intercessors": {
    image5:  "/warhammerimages/assault-interceessor5.png",
    image10: "/warhammerimages/SpaceMarine/assault-intercessor10.png",
  },
  "rhino": {
    image: "/warhammerimages/SpaceMarine/rhino.png",
  },

  // Chaos Space Marines
  "chaos-space-marines": {
    image5:  "/warhammerimages/chaos-marines5.png",
    image10: "/warhammerimages/chaos-marines10.png",
  },
  "obliterator": {
    image: "/warhammerimages/obliterator.png",
  },
  "chaos-rhino": {
    image: "/warhammerimages/chaos-rhino.png",
  },

  // Tyranids
  "termagants": {
    image5:  "/warhammerimages/termagants5.png",
    image10: "/warhammerimages/termagants10.png",
  },
  "hormagaunts": {
    image5:  "/warhammerimages/hormagaunts5.png",
    image10: "/warhammerimages/hormagaunts10.png",
  },
  "carnifex": {
    image: "/warhammerimages/Tyranids/carnifex.png",
  },
  "tyrannocyte": {
    image: "/warhammerimages/tyrannocyte.png",
  },
  "genestealers": {
    image5:  "/warhammerimages/tyrannocyte.png",
    image10: "/warhammerimages/tyrannocyte.png",
  },
};

// Character images — single image per character.
export const characterImageMap: Record<string, string> = {
  "captain":    "/warhammerimages/captain.png",
  "lieutenant": "/warhammerimages/lieutenant.png",
};

// Wargear images — single image per wargear option.
export const wargearImageMap: Record<string, string> = {
  // Space Marines
  "grenade":       "/warhammerimages/SpaceMarine/intercessor-grenade.png",
  "power-fist":    "/warhammerimages/SpaceMarine/assault-intercessor-powerfist.png",
  "power-sword":   "/warhammerimages/power-sword.png",

  // Chaos
  "plasma-gun":    "/warhammerimages/plasma-gun.png",
  "chaos-guns":    "/warhammerimages/chaos-guns.png",

  // Tyranids
  "fleshborer":    "/warhammerimages/fleshborer.png",
  "devourer":      "/warhammerimages/devourer.png",
  "scything-talons": "/warhammerimages/scything-talons.png",
  "heavy-venom":   "/warhammerimages/heavy-venom.png",
  "crushing-claws": "/warhammerimages/crushing-claws.png",
};
