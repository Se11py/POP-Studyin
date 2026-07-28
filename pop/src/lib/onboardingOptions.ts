export const yearGroups = ["Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13"];

export const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science", "English Literature", "History", "Economics"];

export const schools = [
  "Wycombe Abbey School Bangkok",
  "Bangkok Patana School",
  "Harrow International School Bangkok",
  "Shrewsbury International School Bangkok",
  "Amnuay Silpa School",
  "Regent's International School Bangkok",
  "Wellington College International School Bangkok",
  "King's College International School Bangkok",
  "Brighton College International School Bangkok",
  "Bangkok Prep",
  "St. Andrews International School Bangkok",
  "Denla British School",
  "Bromsgrove International School Thailand",
  "Wells International School",
  "International School Bangkok (ISB)",
  "Ruamrudee International School (RIS)",
  "International Community School (ICS)",
  "The American School of Bangkok (ASB)",
  "Berkeley International School",
  "NIST International School",
  "KIS International School",
  "Concordian International School",
  "SISB (Singapore International School of Bangkok)",
  "Anglo Singapore International School",
  "Thai-Chinese International School (TCIS)",
  "Lycée Français International de Bangkok",
  "RIS Swiss Section",
  "Thai-Nichi International School & Japanese School in Bangkok",
  "Home school",
  "Thai public school",
  "International school outside Bangkok",
  "Other",
];

export const requiresCustomSchool = (school: string) => ["Other", "Thai public school", "International school outside Bangkok"].includes(school);
