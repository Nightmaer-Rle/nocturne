/* ═══════════════════════════════════════════════════════════
   NOCTURNE — data.js
   Tiers, ranks, commendations, flavour. Case files follow in
   cases-a.js / cases-b.js / cases-c.js and push into ALL_CASES.
   ═══════════════════════════════════════════════════════════ */

const TIERS = {
  easy:   { id: "easy",   roman: "I",   name: "Petty",      blurb: "One killer, one method, one lie that does not hold.", cold: true },
  medium: { id: "medium", roman: "II",  name: "Complicated", blurb: "Three people with reasons. Only one with nerve." },
  hard:   { id: "hard",   roman: "III", name: "Grave",      blurb: "A deadline, a planted clue, and a witness who wants something." },
  expert: { id: "expert", roman: "IV",  name: "Nocturnal",  blurb: "The file was closed. Someone reopened it. You are the mistake." }
};

const TIER_ORDER = ["easy", "medium", "hard", "expert"];

/** Ranks progress on cumulative merit. */
const RANKS = [
  { at: 0,    badge: "R", title: "Probationary Cadet" },
  { at: 600,  badge: "C", title: "Junior Investigator" },
  { at: 1500, badge: "S", title: "Field Detective" },
  { at: 3000, badge: "D", title: "Senior Detective" },
  { at: 5200, badge: "I", title: "Inspector" },
  { at: 8200, badge: "C", title: "Chief Inspector" },
  { at: 12500, badge: "H", title: "Superintendent" },
  { at: 18000, badge: "A", title: "Commissioner" }
];

const ACHIEVEMENTS = [
  { id: "first-case", icon: "🗝", name: "First Key",        desc: "Close your first case." },
  { id: "first-perfect", icon: "🎯", name: "Read Like Print", desc: "Earn three stars on any case." },
  { id: "ten-stars",  icon: "⭐", name: "Ten-Streak",      desc: "Earn ten stars in total." },
  { id: "no-hints",   icon: "🧠", name: "Your Own Eyes",   desc: "Close a case without consulting the file." },
  { id: "speed",      icon: "⏱", name: "Before the Rain Stops", desc: "Close a timed case with over a minute to spare." },
  { id: "tier1",      icon: "🔨", name: "Petty Business",  desc: "Close all five Tier I cases." },
  { id: "tier2",      icon: "⚖", name: "Justitia",         desc: "Close all Tier II cases." },
  { id: "tier3",      icon: "🌧", name: "Wet Work",         desc: "Close all Tier III cases." },
  { id: "tier4",      icon: "👁", name: "You Were There",   desc: "Clear every Tier IV case without the file ever closing." },
  { id: "all-closed", icon: "🏛", name: "The Whole Book",   desc: "Close all twenty cases." },
  { id: "wrong-turn", icon: "🚪", name: "Door Number Four", desc: "Reopen a case you already closed." },
  { id: "archivist",  icon: "📚", name: "Archivist",        desc: "Find every key piece of evidence in any single case." }
];

const QUOTES = [
  "The truth is a rope you pull. The rest is just waiting.",
  "Everyone lies. The trick is working out which lie is load-bearing.",
  "A missing page is louder than a written one.",
  "Rain washes a street clean. It does nothing for a conscience.",
  "The dead cannot be cross-examined. That is what makes them useful.",
  "Never trust a man who has no enemies.",
  "Clockmakers lie twice a day, and always honestly.",
  "Somebody always saw. The trick is what they wanted for having seen it."
];

const KIND_LABEL = { physical: "Physical", testimony: "Testimony", document: "Document", observation: "Observation" };

/** Populated by the case files. */
const ALL_CASES = [];
