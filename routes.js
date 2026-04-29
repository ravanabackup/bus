/**
 * CTU ROUTE DATA
 * Standardized stop names used: 
 * PGI, ISBT-17, ISBT-43, Railway Station, IT Park, Aroma Chowk, 
 * Tribune Chowk, Elante Mall, Housing Board, Manimajra, Airport.
 */

window.CTU_ROUTES = [
  {
    id: "1A",
    name: "PGI → PGI (Circular via Railway Station)",
    stops: ["PGI", "New OPD", "Sec-11 Mkt", "Sec-10 Mkt", "Sec-9 Mkt", "Sec-8 Mkt", "Sec-7 Mkt", "GGS College", "Sec-26 Mkt", "Railway Station", "Railway Crossing", "Housing Board", "Manimajra", "Modern Complex", "ISBT-17", "Sec-18 Mkt", "Sec-16 Mkt", "Sec-15 Mkt", "PGI"],
    tags: ["Circular"]
  },
  {
    id: "1C",
    name: "PGI → PGI (Circular via ISBT-17)",
    stops: ["PGI", "New OPD", "Sec-11", "Sec-10", "Sec-16", "ISBT-17", "Sec-18", "Sec-19", "Sec-27", "Sec-26", "Grain Market", "Railway Station", "Manimajra", "PGI"],
    tags: ["Circular"]
  },
  {
    id: "2A",
    name: "Manimajra → Manimajra (Circular)",
    stops: ["Manimajra", "Indira Colony", "Modern Complex", "Railway Station", "CTU Workshop", "Grain Market", "Sec-26", "Sec-19", "Sec-18", "ISBT-17", "Sec-22", "Sec-23", "Sec-24", "Sec-25", "DMC", "Dhanas", "Sarangpur", "Khuda Lahora", "PGI", "Sec-11", "Sec-10", "Manimajra"],
    tags: ["Circular"]
  },
  {
    id: "2D",
    name: "PGI → IT Park",
    stops: ["PGI", "New OPD", "Sec-11", "Sec-10", "Sec-16", "ISBT-17", "Sec-18", "Sec-8", "Sec-21", "Sec-20", "Sec-27", "Grain Market", "CTU Workshop", "Railway Station", "Housing Board", "Manimajra", "Indira Colony", "Kishangarh", "IT Park"],
    tags: []
  },
  {
    id: "3",
    name: "Mauli Jagran → PGI",
    stops: ["Mauli Jagran", "Sec-18/19", "Housing Board", "TPT Chowk", "Grain Market", "Sec-26", "Sec-19", "Sec-18", "Sec-22", "Sec-17", "Sec-16", "Sec-10", "Sec-11", "PEC", "PGI"],
    tags: []
  },
  {
    id: "5A",
    name: "Ram Darbar → Ram Darbar",
    stops: ["Ram Darbar", "Sec-47", "Sec-46", "Sec-32", "Sec-30", "Sec-20", "Sec-19", "Sec-7", "Sec-8", "Sec-18", "ISBT-17", "PGI", "Dhanas", "Maloya", "ISBT-43", "Sec-44", "Ram Darbar"],
    tags: ["Circular"]
  },
  {
    id: "7A",
    name: "ISBT-17 → ISBT-17 (Circular)",
    stops: ["ISBT-17", "Sec-22", "Sec-23", "Sec-24", "Sec-38", "Maloya", "Sec-39", "Sec-40", "Sec-41", "ISBT-43", "Sec-44", "Sec-34", "Sec-33", "Sec-32", "Sec-31", "Industrial Area", "Ram Darbar", "ISBT-17"],
    tags: ["Circular"]
  },
  {
    id: "10",
    name: "ISBT-43 → Mansa Devi",
    stops: ["ISBT-43", "Sec-44/51", "Sec-45", "Sec-46", "Sec-47", "Ram Darbar", "Tribune Chowk", "Sec-30", "Sec-20", "Sec-19", "Sec-7", "Sec-26", "Railway Station", "Manimajra", "Mansa Devi"],
    tags: []
  },
  {
    id: "17",
    name: "ISBT-43 → Airport",
    stops: ["ISBT-43", "Attawa Chowk", "Sec-36/35", "Sec-23/22", "ISBT-17", "Aroma Chowk", "Sec-21", "Sec-20", "Sec-30", "Sec-29", "Elante Mall", "Industrial Area", "Hallo Majra", "Airport"],
    tags: ["Direct-Airport"]
  },
  {
    id: "20",
    name: "Chandigarh → Kharar",
    stops: ["ISBT-17", "Aroma Chowk", "Sec-21 Mkt", "Sec-20/21", "Sec-33/34", "Sec-44/45", "ISBT-43", "YPS Chowk", "Ph-7 Mohali", "Sohana", "Lakhnaur", "Landran", "Chappar Chiri", "Kharar"],
    tags: []
  },
  {
    id: "22",
    name: "ISBT-43 → IT Park",
    stops: ["ISBT-43", "Attawa", "Sec-36/35", "Sec-23/22", "ISBT-17", "Sec-18", "Sec-19", "Sec-27", "Sec-28", "CTU Workshop", "Railway Station", "Housing Board", "Manimajra", "Kishangarh", "IT Park"],
    tags: []
  },
  {
    id: "24A",
    name: "ISBT-43 → PGI (Night Service)",
    stops: ["ISBT-43", "Sec-44", "Sec-35", "Sec-34", "Aroma Chowk", "Sec-22", "Sec-17", "Sec-16", "Sec-10", "PGI"],
    tags: ["Night"]
  },
  {
    id: "30",
    name: "ISBT-43 → Nada Sahib",
    stops: ["ISBT-43", "Attawa", "Sec-23", "Sec-22", "ISBT-17", "Aroma Chowk", "Sec-21", "Sec-20 Mkt", "Sec-19", "Sec-27", "Sec-26", "Railway Station", "Housing Board", "Manimajra", "Command Hospital", "Nada Sahib"],
    tags: []
  },
  {
    id: "32",
    name: "ISBT-17 → Dera Bassi",
    stops: ["ISBT-17", "Sec-18", "Sec-19", "Sec-20", "Grain Market", "Sec-26", "Sec-28", "Tribune Chowk", "Industrial Area", "Hallo Majra", "Zirakpur", "Dera Bassi"],
    tags: []
  },
  {
    id: "35",
    name: "ISBT-17 → Kharar",
    stops: ["ISBT-17", "Aroma Chowk", "Sec-35", "Kisan Bhawan", "Sec-36", "Sec-37", "Sec-40", "Sec-41", "Mohali Ph-2", "Mohali Ph-6", "Balongi", "Daun", "Desu Majra", "Mundi Kharar"],
    tags: []
  },
  {
    id: "38",
    name: "ISBT-17 → New Airport",
    stops: ["ISBT-17", "Sec-22/23", "Sec-35/36", "ISBT-43", "Sec-51", "Sec-50", "Sec-49", "Sec-48", "Jagatpura", "Sec-65", "New Airport"],
    tags: []
  },
  {
    id: "39",
    name: "Mohali Phase-11 → PGI",
    stops: ["Mohali Phase-11", "Sec-66", "Sec-67", "Sec-68", "Kumbra", "Phase-7 Mohali", "Phase-3/5 Mohali", "YPS Chowk", "ISBT-43", "Sec-35", "Sec-22", "ISBT-17", "Sec-16", "PGI"],
    tags: []
  },
  {
    id: "71",
    name: "ISBT-43 → Saketri",
    stops: ["ISBT-43", "Sec-35", "Sec-34", "Kisan Bhawan", "Sec-22", "ISBT-17", "Sec-18", "Sec-19", "Sec-27", "Grain Market", "Manimajra", "Mansa Devi", "Saketri"],
    tags: []
  },
  {
    id: "80",
    name: "Zirakpur → PGI",
    stops: ["Zirakpur", "Baltana", "Mauli Jagran", "Hallo Majra", "Colony No-4", "Elante Mall", "Sec-29", "Sec-30", "Sec-20", "Aroma Chowk", "Sec-22", "ISBT-17", "PEC", "New OPD", "PGI"],
    tags: []
  },
  {
    id: "206",
    name: "ISBT-43 → IT Park",
    stops: ["ISBT-43", "Sec-44", "Sec-42", "Sec-36", "Sec-35", "Sec-23", "Sec-22", "ISBT-17", "Sec-18", "Sec-8", "Sec-7", "Sec-26", "Railway Station", "Housing Board", "Manimajra", "Kishangarh", "IT Park"],
    tags: []
  },
  {
    id: "213",
    name: "Kharar → Mansa Devi",
    stops: ["Kharar", "Desu Majra", "Balongi", "Mohali Ph-6", "Sec-39", "Sec-40", "Sec-41", "Sec-42", "ISBT-43", "Sec-35", "Sec-23", "ISBT-17", "Sec-18", "Sec-7", "TPT Chowk", "Manimajra", "Mansa Devi"],
    tags: []
  },
  {
    id: "242",
    name: "Landran → PGI",
    stops: ["Landran", "Sohana", "Mohali Ph-7", "Mohali Ph-3", "YPS Chowk", "ISBT-43", "Sec-35", "Sec-22", "ISBT-17", "Sec-16", "PGI"],
    tags: []
  }
];
