/* ═══════════════════════════════════════════════════════════
   NOCTURNE — cases-d.js   ·   Files 15–17
   Tier III (Grave) · Tier IV opens at 18
   ═══════════════════════════════════════════════════════════ */

/* ── FILE 15 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 15, tier: "hard", title: "The Absent Tenant",
  date: "11 February 1948", weather: "Fog, thick, for four days", place: "Number 9 Cutwater Buildings",
  client: "Mrs. Iolanthe Speke, proprietor of the building", fee: "£120, and I want him out",
  brief: [
    "Room nine has been let to a Mr. Emmerich Saul since November on a weekly tenancy of twelve shillings, paid in advance, in cash, and he has paid every week and he has not once been at work and I have not once asked, because the last three tenants asked nothing and paid everything and I did not look at their papers and neither did anybody else in this building.",
    "On Friday I sent a man up to change the locks and I was told that Mr. Saul was not in, and the room was locked, and there was a smell coming out from under the door that has taken the paint off the frame, and Mr. Saul is not in room nine, and Mr. Saul is not answering the door, and Mr. Saul does not answer the bell because the bell has been broken since the first war.",
    "I have four other tenants, one of whom is a man who leaves at six and comes back at eleven, and I am asking you to find out which of them did it, and to do it without telling my other four that there is anything to tell."
  ],
  setup: "A room nobody can enter, a smell nobody can ignore, and five tenants who all pay cash.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Gwilym Ardley",  role: "Room 2. Leaves at six, back at eleven.", face: "G", note: "A commercial traveller, according to himself. Seen at eleven, every night, by four people." },
    { id: "s2", name: "Constance Vell",   role: "Room 4. A dressmaker with eleven clients.", face: "C", note: "Works from six in the morning. Has an alibi made of other women's mouths." },
    { id: "s3", name: "Mr. Sowerby",     role: "Room 7. A man of forty-eight with no occupation.", face: "S", note: "Pays in coin. Reads until the gas is out. Has never once asked to post a letter." },
    { id: "s4", name: "The girl on the stairs", role: "Rooms 1, 3, 5 and 6", face: "J", note: "Nineteen. Clerks all day. Knows the building better than the gas company does." },
    { id: "s5", name: "Emmerich Saul",   role: "Room 9. The absent tenant.",   face: "E", note: "There is no Emmerich Saul. There never has been." }
  ],
  motives: [
    "Room nine was to be let in February and somebody wanted the letting in his own name",
    "The smelly room is going to cost the building its licence",
    "Somebody in this building knows what the man in room nine was and cannot have that said",
    "There is no motive. Room nine has been doing that since November and nobody in this building has mentioned it"
  ],
  methods: [
    "Locked from the inside with a key that is under the mat, and the smell is the room",
    "The room was locked from the outside with a bar, and the bar is the tenant's own",
    "Never locked at all. The door is a hotel door and a hotel door has a catch",
    "The room is empty and the smell is in the passage, and the passage has been cleaned every morning by the girl on the stairs"
  ],
  locations: [
    { id: "l1", name: "The passage", icon: "🚪", present: ["s4"],
      desc: "A stair, a landing, four doors on the first floor and one at the end. The boards by room nine are dark in a strip a foot wide from the door to the wall, as though something has been carried along them and set down against the skirting, and the strip has been scrubbed with something that was not soap.",
      exams: [
        { id: "x1", name: "The dark strip", icon: "🟫", note: "A foot wide. Carried, not walked.", clue: "c1" },
        { id: "x2", name: "Room nine's door", icon: "🚪", note: "Hotel door. Look at the catch, not the lock.", clue: "c2" },
        { id: "x3", name: "The frame and the paint", icon: "🎨", note: "The paint is lifted in a bloom. It is not rot.", clue: "c3" },
        { id: "x4", name: "The mat", icon: "🧹", note: "Nothing under it. Look under the bath instead.", clue: "c4" },
        { id: "x5", name: "The gas bracket", icon: "💡", note: "A bracket left in a room that is let furnished.", dead: true }
      ] },
    { id: "l2", name: "Room 9, the threshold", icon: "🚪", present: [],
      desc: "The door is locked and the key is not in the door and the key is not in the house. Under the door, on the boards, a dark line, and where the dark line stops, a clean crescent two feet across, and in the crescent, one clean cigarette end, and it is the only thing in this corridor that has not been scrubbed.",
      exams: [
        { id: "x6", name: "The line under the door", icon: "🟤", note: "Two days old, and it is not what is upstairs.", clue: "c5" },
        { id: "x7", name: "The clean crescent", icon: "🌙", note: "A man stood here and smoked and did not care.", clue: "c6" },
        { id: "x8", name: "The key", icon: "🔑", note: "There are four keys to this door in the world.", clue: "c7" }
      ] },
    { id: "l3", name: "The building's papers", icon: "📋", present: ["s5"],
      desc: "A tin box in Mrs. Speke's kitchen with a tenancy book in it going back nine years, and the book for room nine has an entry in November in a hand that is not Mrs. Speke's, and the entry names Emmerich Saul, and there is no such name in the district, in the telephone book, in the electoral roll, or on any list of anybody who has ever been in this city.",
      exams: [
        { id: "x9", name: "The tenancy book", icon: "📕", note: "Room nine, November. Read the hand.", clue: "c8" },
        { id: "x10", name: "The rent book", icon: "💷", note: "Twelve shillings a week, in coin, since November.", clue: "c9" },
        { id: "x11", name: "The insurance", icon: "📄", note: "The house is insured. Ask what the house is insured against.", clue: "c10" },
        { id: "x12", name: "Mrs. Speke's account", icon: "🗣", note: "She will tell you everything she never asked.", clue: "c11" }
      ] },
    { id: "l4", name: "Room 7", icon: "🕯", present: ["s3"],
      desc: "Two chairs, a table, a bed, a shelf of books and no gas lit, and the window open two inches against four days of fog. On the table, a cup, a spoon, and a newspaper of the ninth of February, and it has been read, and there is a paragraph in it with a pencil line under it.",
      exams: [
        { id: "x13", name: "The pencil line", icon: "📰", note: "Read the paragraph, then read the man's face.", clue: "c12" },
        { id: "x14", name: "The books", icon: "📚", note: "Foreign, second-hand, and shelved in order.", clue: "c13" },
        { id: "x15", name: "Sowerby's account", icon: "🗣", note: "He will tell you why he does not work. He will not tell you the rest.", clue: "c14" }
      ] },
    { id: "l5", name: "Room 2", icon: "🧳", present: ["s1"],
      desc: "A commercial traveller's room: a case, a lot of samples, and a bed made in ten seconds. There is no wardrobe. There is a hat stand with one hat and a hook with one coat, and the coat is a very clean coat, and the samples are all the same product from the same firm, and the firm went out of business in 1944.",
      exams: [
        { id: "x16", name: "The clean coat", icon: "🧥", note: "Too clean. There is no such thing as too clean.", clue: "c15" },
        { id: "x17", name: "The samples", icon: "📦", note: "One firm, one product, no sale since 1944.", clue: "c16" },
        { id: "x18", name: "Ardley's account", icon: "🗣", note: "He will offer you tea and a story and both are prepared.", clue: "c17" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A foot-wide strip", type: "physical", from: "l1", text: "The boards are dark in a strip a foot wide from the door of room nine to the skirting, and the strip is not under the door, it is in the passage, and it is not a stain that walked. Something was carried out of that room along that line, and set down against the skirting, and the passage was scrubbed afterwards with something that was not soap because soap does not take out that colour." },
    { id: "c2", name: "A catch, not a lock", type: "observation", from: "l1", text: "There is no lock on that door. There is a hotel catch, a brass lever inside that drops into a socket, and from the passage the catch cannot be lifted, but the door has four hinges on the passage side, and the top one has two screws out of three, and a door with a loose top hinge can be lifted off its hinge pin and put back." },
    { id: "c3", name: "The bloom on the paint", type: "physical", from: "l1", text: "The paint is lifted in a bloom a foot above the boards, round the frame, and the bloom is soft at its edges and hard in the middle. That is heat, coming off a thing at a distance, over some hours. Whatever has been in this room is not a body. A body does not lift paint at a foot." },
    { id: "c4", name: "Under the bath", type: "physical", from: "l1", text: "A hotel bath on feet, and under it, wedged between the feet and the wall, a key. It is not the room nine key, which is a Yale and has a bow. It is a Yale with a bow, and it is numbered, and it is the second of the four keys to a door in this corridor, and the number has been filed off with a file." },
    { id: "c5", name: "Two days old", type: "physical", from: "l2", text: "The line under the door is two days old and it is dark brown and it has run slightly towards the corridor, which is the wrong way for a room, because a room of anything liquid runs out, and this has run in, and it means whatever made it is in the room and is still there, and the door has been closed against it for two days with the gas off." },
    { id: "c6", name: "The clean crescent", type: "physical", from: "l2", text: "A man stood in this exact place for long enough to finish a cigarette, and did not shift his feet, and the boards are clean in a two-foot crescent where the scrubbing stopped, and there is one cigarette end in the middle of it, and it is a full cigarette smoked to the butt. A man does not stand at a door in a fog for four minutes to smoke. A man stands at a door he intends to go in, and waits, and goes in when somebody opens it for him." },
    { id: "c7", name: "Four keys", type: "observation", from: "l2", text: "There are four keys to the door of room nine in the world: one at this house, one at the house agent who let it, one on a ring in the house agent's office drawer, and one which the letting clerk has had in his own pocket since November, because a letting clerk keeps the key until the deposit is paid, and the deposit has not been paid, and the clerk has not asked for it." },
    { id: "c8", name: "A name in the wrong hand", type: "document", from: "l3", text: "Room nine, the ninth of November, E. SAUL, twelve shillings weekly, in a small upright hand that is not Mrs. Speke's and is not the house agent's. The house agent has written LET at the top of the page in a large commercial hand and then somebody has added the name underneath it, in a smaller one, as though the letting had come to him second-hand through somebody he trusts." },
    { id: "c9", name: "Twelve shillings in coin", type: "document", from: "l3", text: "Every week since the ninth of November, twelve shillings, in coin, left on the table outside room nine overnight, and the coins are always the same coins. They are not new money. They are four half-crowns, one florin, one sixpence, and three threepences, and they have been in circulation since before the war, and they were in a man's pocket in a country with no coin like that, for eleven days." },
    { id: "c10", name: "What the house is insured against", type: "document", from: "l3", text: "Fire, and burst pipes, and the landlord's fixtures, and a line added in a different pen in a different year: 'in respect of any offensive or noxious trade, article or substance whatsoever, including chemicals, to a limit of £500.' A boarding house in a fog has no chemicals. That line was added by somebody who knew what was being kept in this building." },
    { id: "c11", name: "Mrs. Speke's account", type: "testimony", from: "l3", text: "\"I have not asked him what he does and I have not asked the others either, because if you ask the first one you must ask all of them, and if you ask all of them they all go, and I have a mortgage.\" She is not ashamed of it and she is not proud of it. \"I can tell you what I can tell you. He paid on the ninth and the sixteenth and the twenty-third and the thirtieth and the seventh of this month, and on the seventh the money was there and the man was not, and I did not notice that until Friday, and I have not slept since Friday.\"" },
    { id: "c12", name: "The pencil line", type: "document", from: "l4", text: "The ninth of February, and the paragraph is a notice of an inquest held on a man whose body was found in a warehouse on the third, and the man's name is printed, and the name is E. SAUL, and the name is the name in the tenancy book, and Sowerby has ruled a line under the notice and read it and left it open on the table where anybody coming into the room would see it, which is not what a frightened man does with a newspaper." },
    { id: "c13", name: "Foreign books in order", type: "observation", from: "l4", text: "Every book on that shelf is printed abroad, every one of them is in a language that is not English, and they are shelved in strict order of size, which is the order a man uses when a woman has been putting his books back wrong for years and he has stopped explaining. The languages are three, and they do not match. A man reads three languages and keeps them in size order and does not work, and the ground floor of this building has a letting clerk's office in it." },
    { id: "c14", name: "Why he does not work", type: "testimony", from: "l4", text: "\"Because I am on a list in two countries and a list in one of them is a prison, and I would rather be poor and free than comfortable and taken.\" He says it as a fact and without self-pity. \"I have paid twelve shillings a week since November in coin I have not spent, and I have paid it to buy a room with a key in it, and I did not know until Friday that I had bought a room with a body in it. That is all. I have not seen a newspaper of my own name in three years and I did not expect to and I was wrong, and the man who was in that warehouse is not me.\"" },
    { id: "c15", name: "Too clean a coat", type: "physical", from: "l5", text: "One coat on one hook and it is the cleanest garment in the building, including the laundered linen in room four. It is not clean because it is new. It is clean the way a thing is when it is put out on a hook to be looked at, and Ardley has looked at it four times since Friday, and there is a clean square of dust on the shelf below the hook where the coat has not been for some hours, and the coat has been on the hook all day, because Ardley wanted it there when you came." },
    { id: "c16", name: "A firm that closed in 1944", type: "physical", from: "l5", text: "Twelve identical cases of the same product from a firm that was wound up in 1944, and a commercial traveller cannot sell a product from a firm that no longer exists, and has not carried a sample case into a house in four years, and the samples have no dust on them at all, and Ardley has a card of prices with no prices on it and a book of order forms with no orders in it since 1944." },
    { id: "c17", name: "Ardley's account", type: "testimony", from: "l5", text: "\"I leave at six and I am in at eleven and I do not go up at eleven because I do not go up, and four people will tell you I am in at eleven, and I have never once asked four people to tell you anything.\" He has the story ready and it is a good story, and it has one fault in it, and the fault is that he has said 'four people' before you have said 'four'." }
  ],
  confront: {
    s1: {
      c15: { line: "Ardley looks at the clean coat and then at the clean square of dust. \"I have not had it dry-cleaned.\" He says it flatly. \"I have not had it dry-cleaned since 1944, and there is no laundry in this city that takes a coat of that make, and I have known that for three years.\"", reveals: "c16" },
      c16: { line: "\"A firm that closed in 1944.\" He puts the case down. \"I have carried that case into this house in November, and I have carried it in on a Tuesday, and I have not opened it, and I have slept in this room for three months and I have not opened a case that is not mine.\" He is not defensive now; he is frightened. \"Somebody in this building has been paying me to look like a man who goes out at six, and I have let him, because it is a room with a lock on it, and I have been eleven days knowing what I am in a room next to.\"" },
      c1: { line: "\"A foot wide, along the skirting.\" He is a man who has noticed things all his life. \"I have carried a foot-wide strip like that from the agent's office in Vessel Street, twice a month, for a man who is not the man in this building, and the man in that office pays me in coin and does not give me a name. I have never once asked the name. I have been waiting to be asked whether there is one.\"" }
    },
    s2: {
      c5: { line: "Constance Vell does not stop sewing. \"Two days and the door shut on it.\" She snips a thread. \"I have been in this building four years and I have told the girl on the stairs not to scrub that corridor, and the girl has asked me why, and I have said because the boards are old. That is a lie and it is the only one I have told in four years.\"", reveals: "c1" },
      c1: { line: "\"A foot wide, and scrubbed with something that is not soap.\" She puts the needle down. \"I scrubbed it. On Saturday morning, at six, before the others were down, and I scrubbed it to the skirting and I used the carbolic from the landing cupboard, and I did it because I have been carrying it out of that room in a laundry bag on Thursdays for nine weeks and there was no other way to carry a bag down a corridor that a girl on the stairs uses four times a day.\"", reveals: "c3" },
      c3: { line: "\"It lifted the paint a foot above the boards.\" She is very still. \"Then it is not a body and I want to be clear with you about that, because I have thought about it every night since Friday. I took nine weeks of laundry out of that room and I never once went in far enough to see what was in it, and I have known for nine weeks what it was, and I have carried it, and I did not ask.\"" }
    },
    s3: {
      c12: { line: "Sowerby does not turn the newspaper round. \"I left it open on the table.\" He says it to the wall. \"I have been in this room three years and I have never once put a hand on a newspaper on a Sunday, and I put that one on the table on the ninth and I ruled the line under it and I left it where the light from the door falls on it, and I have been sitting here since Friday waiting to see who would pick it up.\"", reveals: "c14" },
      c14: { line: "\"Two countries.\" He turns round. \"One of them is this one, and I have been on a list in this one since before the war, and the reason I am on it is a lists clerk in a northern town with a bad hand, in 1931, who copied a name wrong, and I have never gone back and had it corrected, because to have it corrected I must produce papers, and my papers are in a country where producing papers is a capital offence. That is the whole of me. I have been hiding behind a mistake made by a stranger in 1931.\"" },
      c7: { line: "\"Four keys.\" He says it slowly. \"One of them is on a ring in the house agent's office drawer, and I have known that since November, and I have not been in that office, and I want you to understand that I have not been in that office.\"" }
    },
    s4: {
      c6: { line: "The girl on the stairs looks at the crescent for a long moment. \"I scrubbed that corridor on Saturday and I stopped at the door because I was not going to scrub under a door with something coming out of it, and I have thought about the place I stopped at every day since.\" She swallows. \"It is where I stand to knock. I have knocked at that door on Sundays for three months for the rent, and I have never gone in, and I have heard somebody on the other side every Sunday, and I thought he was asleep.\"", reveals: "c2" },
      c2: { line: "\"The top hinge has two screws out.\" She looks at the door and sees it properly for the first time. \"I have been telling that door is locked since November. He locks it at night and it is locked in the morning. I have been reporting that to the agent every Sunday and the agent has written it down every Sunday, and somebody has been reading those entries, and a man who reads them can tell you a locked door is a locked door for ever.\"" }
    },
    s5: {
      c9: { line: "There is no Emmerich Saul to confront, and there never was. The four half-crowns, the florin, the sixpence and the three threepences are in a police property room in this city, and they were minted in 1921 and 1922 and went into a pocket in a country four hundred miles away in 1911, and came back to this one on the ninth of November in a man's hand, twelve shillings at a time, for eleven weeks, by a man buying a room with a key in it so that a name on a list could not be found in it.\\n\\nThe man in the warehouse on the third of February is not him. The papers have been very clear about that and the papers are right, and the man who was in room nine has read the notice himself, and ruled a line under it, and put it on a table in a lit doorway to be seen, because he wanted somebody to know that he was not the man in the warehouse before anybody came and took him for him.", reveals: "c14" }
    }
  },
  truth: {
    culprit: "s1", motive: "The smelly room is going to cost the building its licence", method: "Never locked at all. The door is a hotel door and a hotel door has a catch",
    key: ["c2", "c3", "c5"],
    narrative: "Room nine was a chemical works. Somebody in this building — not a killer, a factor — had been distilling in it since November behind a tenant who paid twelve shillings a week in coin he did not spend, and who was not the man in the warehouse, and who has been sitting in room seven since Friday with a newspaper open on a table, waiting to be found.",
    reveal: "Gwilym Ardley was not a commercial traveller and has not been for three years; he was a man paid in coin to be visible in a corridor, and on Friday the man in room nine stopped opening the door, and the door has two screws out of three in the top hinge, and the girl on the stairs has written locked in a Sunday book every week since November for somebody to read."
  },
  hint: "Nobody has tried the door. It has a catch and not a lock, and a catch on a door with loose top hinges is a suggestion, not a problem. And read what the insurance is for — a boarding house in a fog has no chemicals, and somebody added a line about chemicals to a policy in a different pen.",
  merit: 1150
});

/* ── FILE 16 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 16, tier: "hard", title: "The Tinsmith's Daughter",
  date: "5 March 1948", weather: "Sleet, three days of it, wind from the north-east", place: "Bramsey; a foundry, a temperance hotel and a lock-up",
  client: "Constable idem, Bramsey — in writing, and he means it", fee: "£200 and a warrant",
  brief: [
    "Two dead in one weekend in Bramsey, a foundry on Sallow Lane, a temperance hotel on the same lane, and a lock-up behind the hotel. Saturday night: Annette Voss, thirty-one, the tinsmith's daughter, found in the lock-up at two in the morning with her jaw broken and a hand on the back of her head. Sunday afternoon: Tobias Voss, sixty-eight, the tinsmith, found in the foundry with his throat cut.",
    "I have got a girl of nineteen who was the last one to see the father alive and a man of forty who was seen carrying a sacking sheet at eleven o'clock at night and a foundryman who has been locked out since Friday because of a strike. And I have got the two of them, on a bench in my office, saying they did it, and the two of them cannot both have done both, and it is Friday before the assizes and I have to charge somebody by noon."
  ],
  setup: "Two dead, two confessing, and a weekend that does not add up.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Ray Soutar",   role: "Lock-up keeper, and night watchman", face: "R", note: "Locked the lock-up at midnight. It was open at two. He is the man with the sacking sheet." },
    { id: "s2", name: "Perry Voss",   role: "The tinsmith's brother",             face: "P", note: "Lives over the shop. He signed the statement on Sunday and has not changed one word of it." },
    { id: "s3", name: "Enid Sowerby", role: "Hotel landlady and daughter of the witness", face: "E", note: "Answers for the temperance hotel and for the girl of nineteen." },
    { id: "s4", name: "Hollis Meak",  role: "Foundryman, locked out since Friday", face: "H", note: "Owes the tinsmith forty pounds and says so to everybody, loudly, for years." },
    { id: "s5", name: "Ada Sowerby",  role: "The girl of nineteen",               face: "A", note: "Was the last person to see Tobias Voss alive. Has not slept and will not be alone." }
  ],
  motives: [
    "He had put her in the lock-up on Friday night and locked it, and Sunday he finished it",
    "The foundry, the house, and thirty-one years of a family nobody had asked about",
    "Eleven months' rent, in a strike, with the lock-up two doors down",
    "There are two motives, and they belong to two different men, and that is why two men have confessed to both"
  ],
  methods: [
    "Struck twice in the back of the head in the lock-up between midnight and two",
    "Struck once, and the lock-up door was open, and the man who opens it is the man who locks it",
    "Struck outside on the lane and carried in, and the sacking sheet proves it",
    "Struck on the foundry floor at four feet from the furnace, and the furnace was banked at four"
  ],
  locations: [
    { id: "l1", name: "The lock-up", icon: "🚪", present: ["s1"],
      desc: "A stone room behind the temperance hotel, three paces by five, with a door that takes a padlock and a bar. At two o'clock on Saturday the door was open and the bar was hanging by one screw and the padlock was on the step, and there is a smell in here that is coal gas and something sweet, and there are four clean rectangles on the floor where the coke sacks were, because somebody moved the coke sacks to have somewhere to put a body.",
      exams: [
        { id: "x1", name: "The body", icon: "🧍", note: "Two blows. Read the second one.", clue: "c1" },
        { id: "x2", name: "The bar and the padlock", icon: "🔒", note: "One screw. Whose bar? Whose lock?", clue: "c2" },
        { id: "x3", name: "The coke sacks", icon: "🪨", note: "Four clean rectangles and a fifth mark.", clue: "c3" },
        { id: "x4", name: "The gas", icon: "🔥", note: "Coal gas, and something sweet, and it is still here.", clue: "c4" },
        { id: "x5", name: "The step", icon: "🪜", note: "Padlock on the step. And a print.", dead: true }
      ] },
    { id: "l2", name: "The temperance hotel", icon: "🏨", present: ["s3"],
      desc: "Twelve rooms, a bar that serves tea and biscuits, and a kitchen, and a girl of nineteen who answers for it. There were nineteen people in the building on Saturday night and Mrs. Sowerby has the book, and the book has the times, and the times are in three hands.",
      exams: [
        { id: "x6", name: "The book", icon: "📕", note: "Nineteen rooms, one book, three hands. Compare them.", clue: "c5" },
        { id: "x7", name: "The keys", icon: "🔑", note: "A hook, a board, and one key off the board.", clue: "c6" },
        { id: "x8", name: "Mrs. Sowerby's account", icon: "🗣", note: "She will give you the book and not the story.", clue: "c7" }
      ] },
    { id: "l3", name: "The foundry", icon: "🏭", present: ["s4"],
      desc: "A tin shop, a furnace, a banked fire, and a smell of hot tin. Tobias Voss worked here alone for sixty-eight years and he worked alone here on Sunday afternoon, and the strike is outside the gates, and the only men in the yard are the men who are not on strike, and there are none of those.",
      exams: [
        { id: "x9", name: "The furnace", icon: "🔥", note: "Banked at four on a Sunday. Ask who banks it.", clue: "c8" },
        { id: "x10", name: "The floor", icon: "⬛", note: "Four feet from the fire and no drag marks.", clue: "c9" },
        { id: "x11", name: "The bench", icon: "🔧", note: "A job half done, and the tools laid out in order.", clue: "c10" },
        { id: "x12", name: "The gate book", icon: "📋", note: "Locked out since Friday, and the padlock is his.", clue: "c11" },
        { id: "x13", name: "Meak's account", icon: "🗣", note: "He has been telling people what he owes for four years.", clue: "c12" }
      ] },
    { id: "l4", name: "The shop and the house over it", icon: "🏠", present: ["s2", "s5"],
      desc: "Two rooms and a workshop, and a daughter dead in the lock-up behind the hotel two hundred yards off, and a brother signing statements. On the table, a ledger, a pair of spectacles, and a Sunday paper that has been folded and refolded so often that it is coming apart.",
      exams: [
        { id: "x14", name: "The ledger", icon: "📒", note: "The tin shop, the forge, and a page for Friday.", clue: "c13" },
        { id: "x15", name: "The folded paper", icon: "📰", note: "Something in it has been read and read and read.", clue: "c14" },
        { id: "x16", name: "Perry Voss's statement", icon: "🗣", note: "Signed Sunday. Not varied since.", clue: "c15" },
        { id: "x17", name: "Ada Sowerby's account", icon: "🗣", note: "She saw him alive. Then she saw the yard.", clue: "c16" }
      ] }
  ],
  clues: [
    { id: "c1", name: "Two blows, not one", type: "physical", from: "l1", text: "The first blow has taken the skin off the back of the head and the second has been to the same place, smaller, harder, and closer, and a man who swings twice has missed the first time. A man who is frightened enough to swing twice and misses the first time is a man who is not a big man and has never done this and is standing behind somebody and is not getting the result he expected." },
    { id: "c2", name: "A bar on one screw", type: "physical", from: "l1", text: "The bar is a foundry bar, four feet, and it hangs by one screw because the other screw is in the door frame and it is still in the frame, and it has been there since the strike because Meak's father made the door frame in 1911 and the screws have been in the wood for thirty-seven years. The bar belongs to that door and to that door only, and to whoever could lift it off its screw." },
    { id: "c3", name: "A fifth mark", type: "physical", from: "l1", text: "Four clean rectangles where the coke sacks stood and a fifth, smaller, mark against the wall, and the fifth mark is a boot, and the boot is a woman's, and the room was cleared so that the body could go against the wall out of the way of the bars. Somebody made space in here on Saturday evening, deliberately, before midnight, with a bar off its own screw." },
    { id: "c4", name: "Coal gas and something sweet", type: "physical", from: "l1", text: "The gas is a temperance hotel's, off the main, and the sweet is chloroform, and a public analyst will say the chloroform in this room is enough to put a large man down and keep him down, and a man who has been put down with chloroform does not need his jaw broken at two in the morning. The jaw was broken at two in the morning to make a room. The room was made at eleven." },
    { id: "c5", name: "Three hands in one book", type: "document", from: "l2", text: "The hotel's book is kept by the landlady, and the Saturday night column is in her hand, and eleven of the nineteen entries are in a second, rounder hand, and the eleven are rooms three, five, six, eight, nine, ten, eleven, thirteen, fourteen, sixteen and seventeen — every other one, in order, in a hand that is copying a list rather than writing a book, and the last of the eleven is signed at eleven o'clock, which is the hour the room was made." },
    { id: "c6", name: "A key off the board", type: "physical", from: "l2", text: "The hotel's spare keys hang on a board by the door in the office, and there is one hook empty, and the hook is marked 9, and room nine's key has been on the hook since the fifteenth of February because the lock on room nine was changed after a drunk put his fist through it, and the lock was changed on the fifteenth, and the key to the old lock was not destroyed, it was in the tin with the duplicates." },
    { id: "c7", name: "Mrs. Sowerby's account", type: "testimony", from: "l2", text: "\"I will give you the book and I will give you the times and I will not give you a story, because I have a daughter who is nineteen and was in this building when it happened and I will not have her in a newspaper for anything.\" She turns the book round. \"I have not been in the lock-up since 1945. I have not been in it since the coal hole came in through the roof and I went in with a lamp at night, and I have not been near it since, and I do not go near it, and everybody on this lane knows that and will say so.\"" },
    { id: "c8", name: "Banked at four on a Sunday", type: "document", from: "l3", text: "A foundry fire is banked at four and left till six, and the man who banks it is the man who has been doing it for sixty-eight years, and the ash pan on Sunday shows a banked fire with no poker marks in it at all. Nobody banked that fire. It was banked by being raked and left, which is a different operation and a quicker one, and it is done by a man in a hurry who does not want his prints in the ash." },
    { id: "c9", name: "Four feet, and no drag", type: "physical", from: "l3", text: "He was four feet from the furnace mouth and the floor beneath him is unscorched and there are no drag marks, and a body that has been carried has drag marks or two pairs of feet in the dust, and there is no dust on that floor at all, because somebody had swept it, and the sweep is at the edge of the ash pan and the sweep pattern is a soft broom used by a man who sweeps every day of his life." },
    { id: "c10", name: "Tools in order", type: "physical", from: "l3", text: "A job half done: a sheet of tin, an edge, a solder pot still warm. The tools are laid out in the order he reaches for them, which is a thing no visitor can fake and no murderer would think to bother with, and beside the solder pot there is a hammer that does not belong to a tinsmith, because a tinsmith's hammer has a peen and that hammer has a face and is eight ounces." },
    { id: "c11", name: "Locked out since Friday", type: "document", from: "l3", text: "The gate book: the padlock was put on at four o'clock on Friday by Tobias Voss himself, and the key went into his pocket, and the men on strike have been outside the gate since Friday morning and the lock has not been forced and nobody has tried. On Sunday at half past two somebody crossed the yard, and there is a footprint in the ash, and the footprint is a man's and it goes to the shop and back and it does not go out through the gate." },
    { id: "c12", name: "Meak's account", type: "testimony", from: "l3", text: "\"I owe him forty pound and I have said so in this yard every week for two years and I will say it in the assizes if they let me.\" He is genuinely bewildered by the accusation. \"I have not been in that foundry since Tuesday. I was not in that yard until the police came out on Sunday. I have been on that gate since Friday with thirty men and I have not shut my mouth once, and a man who says out loud that he owes forty pound is not a man planning to be tried on Friday.\"" },
    { id: "c13", name: "The page for Friday", type: "document", from: "l4", text: "The shop ledger for the Friday: tin, at four, and then a line underneath in a different pen: 'wages stopped, Meak, 40.00 — per A.V.' Tobias Voss stopped a man's wages on the Friday of the week his daughter was found dead, and signed it with her initials, and a man who signs a debt with his daughter's initials is a man making an entry that is not about wages." },
    { id: "c14", name: "The refolded paper", type: "document", from: "l4", text: "A Sunday paper folded and refolded until it is in three pieces, and the piece that has been most used is the notices column, and the notice is one line: HOUSEKEEPING WANTED, APPLY TO 9 SALLOW LANE, and 9 Sallow Lane is the lock-up behind the temperance hotel, and the address has been read four hundred times, and there is a pencil mark beside it in a hand that is not the reader's." },
    { id: "c15", name: "Perry Voss's statement", type: "testimony", from: "l4", text: "\"I did it. Both. I have said so and I will say so again and I am not going to be talked out of it by a man in a good coat.\" He has the words ready and he has had them since Sunday. \"My brother put his own daughter in that lock-up on Friday night and locked her in, and I found out on Saturday morning, and I could not go to the police, because the police would ask me how I found out, and the only way I found out is that I was in the lane.\" He says it without a flicker. \"Ask me for one detail. Only one. I have been waiting two days for somebody to ask me for one detail.\"" },
    { id: "c16", name: "Ada's account", type: "testimony", from: "l4", text: "\"I took his tea in at half past two on the Sunday and he was alive and he was swearing about the gate, and I put it on the bench and I went out and Perry was in the doorway and he had my uncle's hammer in his hand.\" She stops for a long time. \"And I went up the lane to the hotel, and I did not go back, and I have not been able to say that out loud until this minute, and I have not told my mother, and I have not told the police, and I have been in this room since Sunday waiting for somebody to make me.\"" }
  ],
  confront: {
    s1: {
      c4: { line: "Soutar does not look at the sweet smell. \"Chloroform.\" He says it as though he had known. \"There is chloroform in a temperance hotel because there is chloroform in a room off this lane where it is made and sold and nobody asks about it, and the man who makes it is the man who locks this door at midnight, and you have worked that out, so I will save us both the afternoon.\"", reveals: "c3" },
      c3: { line: "\"A fifth mark. A woman's boot.\" He looks at the floor for a long time. \"I cleared that room at eleven. Somebody came to me at a quarter to ten and told me to clear it and put the sacks by the wall, and I did it, and I have told nobody that, and I have not slept.\"" },
      c2: { line: "\"The bar is off the door's own screw.\" He almost laughs. \"I know whose bar it is. It is the bar off my own door and it is in the police bag now and it has been since Saturday, and nobody has sent me one single question about it, and I have been waiting since Saturday for one single question about it.\"" }
    },
    s2: {
      c15: { line: "Perry Voss goes very still and then sits down on the edge of the bench, heavily, like a man who has been holding something up for two days. \"You are going to ask me a detail.\" He waits. \"I did not put my hand on my brother's throat. I was in the doorway at half past two with the hammer in my hand and I put the hammer down and I said Annette is dead, and he said go and fetch Ada, and I said I cannot fetch Ada because Ada is standing on the foundry wall with a sacking sheet round her, and he said then fetch somebody.\"", reveals: "c13" },
      c13: { line: "\"I am not the man who did it.\" He looks at the ledger. \"He stopped Meak's wages on the Friday with a pen, in the shop, at four o'clock, and signed it A.V., and I asked him on the Saturday what A.V. meant, and he said my daughter, and I said you have written a letter to a man you have stopped paying, and he said I have written a warning, and I have not been able to make that word sit still since.\"" },
      c14: { line: "\"The notice.\" He is quiet for a moment. \"My brother put a notice in the paper for a housekeeper at number nine. In November. I have read it four hundred times and I read it as a man looking for work, and I am not a fool, and I have been reading it as a man looking for somebody all the autumn, and I did not say so on Sunday because if I said so then I was helping.\"" }
    },
    s3: {
      c6: { line: "Mrs. Sowerby takes the key off the table and turns it over. \"The old lock on room nine. The fifteenth of February. I put that key in the tin and the tin is in the office, and the tin is the same tin that the lock-up spare key comes out of, and the lock-up spare key has been on its hook since I can remember and it is not on its hook.\"", reveals: "c5" },
      c5: { line: "She reads the eleven names in the second hand. \"Every other room, in order, in a round hand. That is not a book. That is a list being copied by somebody who has been told to make the book look complete, and there is only one person in this building who could copy a list and put the hours in and who would also be the only one who could be in every other room on a Saturday night.\" She puts the book down. \"I did not put the eleven there. I have had this book nine years and I know every letter in it and I would take my oath there is not a round hand in the 1947 book.\"" }
    },
    s4: {
      c11: { line: "Meak looks at the gate book and then at the padlock still on the gate. \"He put that on himself at four on the Friday with the key in his pocket, and I watched him do it, and I have been standing on the wrong side of it for two days with thirty men, and I have not been in that yard.\" He spits. \"Whoever it was came in over a locked gate at half past two on the Sunday. There is one way into that yard without the gate and I know it because I have used it four times since Friday, and I have told three men on that gate about it and none of them wrote it down.\"", reveals: "c9" },
      c9: { line: "\"Somebody swept that floor.\" He is angry now, at the floor. \"A man who sweeps a foundry floor at half past two on the Sunday and banks a fire without a poker in it is a man who has worked in a foundry, and there are eleven men on that gate and nine of them have worked in a foundry, and one of them has not been to mass on the Sunday because his wife is expecting.\"" }
    },
    s5: {
      c16: { line: "Ada Sowerby says the whole of it in one breath and then sits down. \"I was on the wall with the sacking sheet. I had it round me because I was going to go down into the yard and get them out, and I am not a fool, I know what a sacking sheet is for, and I have been a lock-up keeper's daughter since I was six.\" Her hands are flat on the table. \"I watched two men walk across that yard. I did not know my uncle. I have not known that man since I was six. And I have not said it because the man in the lock-up is Mr. Soutar and Mr. Soutar is the man who did not lock the door at midnight, and I do not understand any of it, and I am nineteen and I am so tired.\"", reveals: "c1" },
      c1: { line: "\"Two blows, and the second one smaller.\" She looks up. \"That is not a big man. That is somebody who has never hit anybody in his life. And it is not my uncle Perry, because I have watched him mend a gate.\"" }
    }
  },
  truth: {
    culprit: "s1", motive: "Eleven months' rent, in a strike, with the lock-up two doors down", method: "Struck once, and the lock-up door was open, and the man who opens it is the man who locks it",
    key: ["c2", "c3", "c4"],
    narrative: "Ray Soutar locked the lock-up at midnight because it was his job, and a man who locks a door at midnight is a man who knows exactly what is in the room and has known since a quarter to ten, when somebody paid him to clear the coke sacks out to make space against the wall. He had a room off Sallow Lane that made chloroform, and the girl in it was Annette Voss, and the man who came to see her at half past nine on the Saturday was not the tinsmith's brother.",
    reveal: "Perry Voss has confessed to both murders because the truth about Saturday night would require him to explain the doorway of the foundry at half past two, and the truth about that is that he was holding an eight-ounce face hammer and Ada Sowerby was on the wall with a sacking sheet, and a nineteen-year-old girl has been sitting on that since Sunday rather than say it."
  },
  hint: "Two men have confessed to two murders and neither of them can have done both. Stop listening to the confessions and read the room instead: the padlock was on the step, the bar was off its own screw, and the room was cleared at eleven — which is an hour before the lock-up keeper says he locked it.",
  merit: 1250
});

/* ── FILE 17 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 17, tier: "hard", title: "Carrion Comfort",
  date: "28 April 1948", weather: "Warm for the first time, close, flies", place: "The Alhambra, Rotherhithe; a music hall",
  client: "Ivor Sclater, proprietor of the Alhambra", fee: "£150, and God help you",
  brief: [
    "Dolly Pargeter was on that stage on Monday at nine and ten forty and she died on it at ten forty-seven, in front of eleven hundred people, and the applause went on for a minute and a half before anybody in the back row knew anything was wrong, and that is the part I cannot get past, because a man who has been dead for ninety seconds ought to stop moving.",
    "The house doctor says natural causes and I have known the house doctor thirty years and he is not a liar, he is a coward. The coroner says poison and has sent for the analyst and the analyst will not have a result until Friday, and the box office has taken four hundred and sixty pounds for Friday and I have not told one of those people a thing, and if it is poison then somebody put it in that theatre on purpose and I would like to know before the rest of the week."
  ],
  setup: "Eleven hundred witnesses, one that is not a witness, and a woman who stopped moving in the middle of a laugh.",
  deadline: 21600,
  suspects: [
    { id: "s1", name: "Cyril Vance",   role: "Theatre manager",            face: "C", note: "Fired her in March for missing the Monday, and hired her back in April for money." },
    { id: "s2", name: "Lionel Fisk",  role: "Her husband, in the front row", face: "L", note: "In row G on Monday, in the stalls, and says he never left it." },
    { id: "s3", name: "Ruth Ellery",   role: "Costume mistress",          face: "R", note: "Dressed her every night for six years. Fitted the green dress at seven." },
    { id: "s4", name: "Nancy Brake",   role: "The girl in the second scene", face: "N", note: "Stood eleven feet from her for four minutes on Monday night." },
    { id: "s5", name: "Mr. Halloway",  role: "Sergeant, city division",  face: "H", note: "There because Rotherhithe has a murder in it twice a year and it likes a policeman in the house." }
  ],
  motives: [
    "She had a note in her handbag on Monday and a note is a motive with a name on it",
    "Eleven hundred people saw him sitting in row G and one of them saw something else",
    "Six years of dressing a woman and one dress in eleven weeks that she would not let her be measured for",
    "The house doctor has not slept since Monday, and a man who cannot sleep has usually been told something by somebody he trusts"
  ],
  methods: [
    "In the green dress, and the dress was fitted on Monday evening by two hands",
    "In the lipstick, and the lipstick was made up on Monday at four in the afternoon",
    "In a glass of water she was handed in the wings by somebody she trusted",
    "Not in anything she took. In the air of the stage, which is warmed, and which is fed by a pipe under the boards"
  ],
  locations: [
    { id: "l1", name: "The stage", icon: "🎭", present: [],
      desc: "Four hundred square feet of sprung boards and hot air and eleven hundred people looking at it. The boards lift in three places, the heating pipe runs under the fourth, and there is a mark on the boards at centre where a man has knelt with a spanner, and the mark is new, and the boards have not been lifted since 1944.",
      exams: [
        { id: "x1", name: "The boards at centre", icon: "🪵", note: "A kneeling mark and a spanner mark.", clue: "c1" },
        { id: "x2", name: "The heating pipe", icon: "♨", note: "Under the fourth board, and it is warm.", clue: "c2" },
        { id: "x3", name: "The wings, stage left", icon: "👗", note: "A glass on a stool, and a puddle.", clue: "c3" },
        { id: "x4", name: "The front of house", icon: "🎟", note: "Row G, seat 12, and the seat next to it.", clue: "c4" },
        { id: "x5", name: "The orchestra pit", icon: "🎼", note: "Under the boards. Where the warm air comes from.", dead: true }
      ] },
    { id: "l2", name: "The dressing rooms", icon: "🚪", present: ["s3"],
      desc: "Four rooms off a corridor, and Dolly's is the end one, and it is as it was on Monday, because Sclater locked it on Tuesday and has not let anybody in since, including the police, which the police have been extremely polite about.",
      exams: [
        { id: "x6", name: "The green dress", icon: "👗", note: "She was measured for it in three sittings.", clue: "c5" },
        { id: "x7", name: "Her handbag", icon: "👛", note: "Everything in it has been counted. Except one thing.", clue: "c6" },
        { id: "x8", name: "The mirror and the shelf", icon: "🪞", note: "Theatrical greasepaint, and a pot of cold cream.", clue: "c7" },
        { id: "x9", name: "Ruth Ellery's account", icon: "🗣", note: "Six years, and one dress, and one Tuesday.", clue: "c8" }
      ] },
    { id: "l3", name: "The front of house", icon: "🎟", present: ["s2", "s5"],
      desc: "Eleven hundred seats and a crush at the bar, and a programme, and a seat plan, and a commissioner's return of the take on the door, and a police sergeant standing in the circle because Rotherhithe likes a policeman in the house.",
      exams: [
        { id: "x10", name: "Row G, seat 12", icon: "🎫", note: "Lionel Fisk. Sold, and the stub is in a coat.", clue: "c9" },
        { id: "x11", name: "The programme", icon: "📰", note: "A programme is a way of finding out who came.", clue: "c10" },
        { id: "x12", name: "Fisk's account", icon: "🗣", note: "He will tell you about the interval and not the act.", clue: "c11" },
        { id: "x13", name: "Halloway's account", icon: "🗣", note: "He was in the circle and he was watching the house, not the stage.", clue: "c12" }
      ] },
    { id: "l4", name: "The wings and the prompt corner", icon: "🕯", present: ["s4"],
      desc: "A dark corner stage right, a stool, a candle stub, and a prompt book on a string. The prompt book is Nancy Brake's, and it is written in two hands, and the second hand is not hers, and it has been writing in this book since March.",
      exams: [
        { id: "x14", name: "The prompt book", icon: "📓", note: "Two hands. One of them has been at it since March.", clue: "c13" },
        { id: "x15", name: "The glass on the stool", icon: "🥛", note: "Water, in a glass, from a tap in the wings.", clue: "c14" },
        { id: "x16", name: "Nancy Brake's account", icon: "🗣", note: "Eleven feet away for four minutes. She has not moved.", clue: "c15" }
      ] },
    { id: "l5", name: "The manager's office", icon: "📋", present: ["s1"],
      desc: "Above the corridor, a desk, a safe, and a fire door onto the back stairs, and the back stairs come out in a lane, and the lane goes to the mortuary. Vance has been in this office since Tuesday and has the box office figures and has not read them.",
      exams: [
        { id: "x17", name: "The March letter", icon: "✉", note: "The dismissal. Read what is in the file copy.", clue: "c16" },
        { id: "x18", name: "The heating contract", icon: "📄", note: "Signed in 1944. Read the works clause.", clue: "c17" },
        { id: "x19", name: "Vance's account", icon: "🗣", note: "He will be candid about money and careful about the rest.", clue: "c18" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A kneeling mark", type: "physical", from: "l1", text: "A scuffed arc in the wax at centre stage, the width of two knees, and beside it a bright scrape in the board where a spanner slipped, and the fourth board from the front edge is loose in its rebate, and the loose board is the one directly over the heating pipe, and the heating pipe is the pipe that was replaced under this stage in 1944 by a contractor whose name is on a contract in an office upstairs." },
    { id: "c2", name: "The pipe", type: "physical", from: "l1", text: "A four-inch steam pipe running the full width of the stage under the fourth board, lagged, and the lag is off for eighteen inches at the centre, and the pipe under the gap is bright. Somebody has had their hands on a bare hot pipe in a theatre in the last two days, and eleven hundred people have been breathing over that gap since Monday night." },
    { id: "c3", name: "The glass on the stool", type: "physical", from: "l1", text: "Half a pint of water in a stage glass with a chip on the rim, on a stool in the wings, and a wet ring on the floor beneath it, and the ring is the shape of a chemical bottle, two inches, and the glass in the glass is not tap water, it is faintly pink, and the tap in the wings is on the same pipe as the bath on the second floor and nobody has touched the bath." },
    { id: "c4", name: "Seat 12 and seat 13", type: "document", from: "l1", text: "Row G, seat 12, sold on the Monday to L. Fisk, one pound, and seat 13 in the same transaction, also one pound, and the transaction was a cash sale with no name on the book, and the programme of that night was sold at one and six, so a man who came on the Monday night and wanted a good seat and wanted it next to his wife, and did not want to be on the programme list, paid cash for two." },
    { id: "c5", name: "The green dress", type: "physical", from: "l2", text: "A green stage dress, new, and it is beautiful, and it is eleven weeks old, and it was fitted in three sittings, and the third fitting was on the eleventh of April, and the third sitting is recorded in the wardrobe book as a taking-in and it is not a taking-in, because the bust is let out an inch and a half and a woman who has lost weight is measured smaller and not larger." },
    { id: "c6", name: "What is not in the handbag", type: "physical", from: "l2", text: "Money, a comb, a handkerchief, two tickets, a photograph, a bottle of aspirins, a small brass key, and the place where a letter had been. The letter is not in the handbag and the letter is not in the room and the handbag was counted on Wednesday by a constable and an inventory was written and the inventory does not mention a letter, and a woman does not carry a brass key in her handbag for thirty-one years and not a letter in it for four days." },
    { id: "c7", name: "Cold cream and greasepaint", type: "physical", from: "l2", text: "Cold cream on the shelf, opened, and the greasepaint is in a cake and the cake has been cut into with a knife, and there is a clean thumbprint in it. Cold cream is for the face. Greasepaint is for the stage. A woman who uses both does not cut into the cake with a knife, and a woman whose face has been made up by somebody else, on the last night, with somebody else's hand, has a thumbprint in the greasepaint." },
    { id: "c8", name: "Ruth Ellery's account", type: "testimony", from: "l2", text: "\"I have dressed that woman six years and I know the shape of her in my sleep. The green dress was a different house's dress and I told her so and she told me the manager had it made and it was the last thing she would ever say about it.\" She is precise and cold. \"On Monday I did not lay it out. I have laid out every costume in this house for six years and I do not lay out. Vance asked me to leave the green dress on its rail and let Ruth do it, and Ruth was not in until half past six.\"" },
    { id: "c9", name: "A stub in a coat", type: "document", from: "l3", text: "The seat 12 stub, torn, in the breast pocket of a coat hanging in the bar of the Alhambra, and it is not Fisk's coat, and Fisk has a season ticket and has never bought a seat in his life, and a man who has never bought a seat has no stub, and a man with a season ticket needs no seat and would sit in a seat anyway, for the look of it, and would say so, and would not mention a coat in a bar." },
    { id: "c10", name: "The programme list", type: "observation", from: "l3", text: "The Alhambra prints a programme with the company list on the back, and the front-of-house manager's book shows nine programmes unsold out of forty, and eight of the nine were bought in the interval, and the interval on the Monday was between the second and the third item, and the third item is the one she died in, and somebody in this house has spent eight shillings in an interval to be in the audience at the moment it happened and to not be in the programme." },
    { id: "c11", name: "Fisk's account", type: "testimony", from: "l3", text: "\"I was in row G for the whole of it. The whole of it. I bought two seats because I do not sit next to people I have met at a bar and Dolly used to do that to me and I have not forgiven her and I loved her.\" He says it steadily. \"I was not in the interval. I was in row G in the interval with a programme I did not buy, and at twenty to eleven she began the third item and at ten forty-seven she stopped, and I was ninety feet from her and I could not have known and I have been ninety feet from her for three days.\"" },
    { id: "c12", name: "What the sergeant was watching", type: "testimony", from: "l3", text: "\"I was in the circle watching the house, because that is what I do in a house like this and I have done it for eleven years.\" He stops. \"At about ten past ten on the Monday there was a man who came down the side aisle from the circle and stood at the back of the stalls and did not go back up, and I noted him, because in eleven years a man who comes down and does not go back up is either going to the bar or going out of the fire door, and he did not go to the bar.\"" },
    { id: "c13", name: "Two hands in the prompt book", type: "document", from: "l4", text: "Nancy Brake's prompt book in her own hand in the cues, and in a second hand in the margins, since March, and the second hand is small and round and it is not a stage hand's, and it writes one kind of note and one kind only: a time and a name. 8.40 Nancy. 9.05 Dolly. 9.50 Nancy. 10.40 Dolly. Every half hour since March, two names, in a round hand, in a book that goes on a hook and is read by the whole company." },
    { id: "c14", name: "The water is not water", type: "physical", from: "l4", text: "A stage glass of water that is faintly pink, from a tap in the wings, and the tap has a wing nut on it that is scored and bright, and the bright scoring is new, and a man who has been opening and closing a wing nut on a tap in a theatre every half hour since March leaves a bright scoring and no one to notice it, and the wings have no clock in them." },
    { id: "c15", name: "Eleven feet away for four minutes", type: "testimony", from: "l4", text: "\"I did not move.\" She has not moved, and she says it without any self-pity. \"I was eleven feet from her for four minutes on the Monday and I have not moved since, and I am not going to tell you what I have been thinking about for three days, because I have been thinking: I could have said something on Monday at ten forty-six.\" She looks at the prompt book. \"I was in the wings at ten twenty. There is a glass on the stool. I do not know who put it there. I have looked at that glass a hundred times and I cannot see it any more, and I would be very glad if somebody would tell me the glass was always there.\"" },
    { id: "c16", name: "The March letter", type: "document", from: "l5", text: "The file copy of the letter that fired Dolly Pargeter in March, in Vance's hand, and the letter is about missing a Monday, and the last line of the file copy, which is not in the copy that was sent, says: 'and if you are seen in this building again I shall put you off the boards at the stage door in front of the company, which I can arrange.' It was sent on the ninth of March. She was back on the payroll on the second of April." },
    { id: "c17", name: "The heating contract", type: "document", from: "l5", text: "The 1944 contract for the stage heating, and the works clause specifies a weekly inspection of the pipe run under the fourth board, signed by a theatre employee, and the inspection sheet for the last eighteen months has a signature on every week but the second of April, and the second of April is a Monday, and the second of April is the day Dolly Pargeter came back to the Alhambra for four pounds a week more." },
    { id: "c18", name: "Vance's account", type: "testimony", from: "l5", text: "\"I fired her in March for missing a Monday. I took her back in April because a girl who will not come back is worth nothing and a girl who will come back for four pounds is worth everything.\" He is entirely candid about it, as advertised. \"I have signed six hundred of those letters in this theatre and I have never once put off a fire door at the stage door, and if you have found the file copy, then you have found the only document in this building that says I said it, and I said it, and I did not do it.\"" }
  ],
  confront: {
    s1: {
      c18: { line: "Vance does not deny the letter and does not enjoy the denial. \"I said it. I have said forty of them. I do it because it works, and because in nine years of war I learned that a threat is the only currency some people understand, and I have never once carried one out and everybody in this building knows I have never once carried one out.\"", reveals: "c17" },
      c17: { line: "He reads the inspection sheet and goes still. \"The second of April. That is mine. I sign that sheet on a Monday, I have signed it every Monday for eighteen months, and I did not sign it that Monday because I was in a solicitor's office in Fleet Street signing a lease on the bar and I sent a boy.\" He puts the sheet down. \"A boy. In 1944 I signed it myself, because it is eight feet of pipe under my stage and I have never trusted anybody with it.\"" },
      c1: { line: "\"A kneeling mark at centre.\" He is looking at the stage and not at you. \"I have had that pipe looked at twice in four years and both times I was told it was the lag. It is the lag, and the lag is off for eighteen inches now, and if that was in my building on Monday night then it was put there by one of two people, and one of them is a man in my office who has been in this building for nine years and who I have never once seen do a job on a Monday.\"" }
    },
    s2: {
      c9: { line: "Fisk does not go near the coat. \"A stub in a coat in the bar.\" He looks at it. \"I have a season ticket. I have had it for four years. I have never bought a seat in the Alhambra in my life, and I have just told you that you were ninety feet away, and both of those things are true, and you are about to tell me they cannot both be true.\"", reveals: "c4" },
      c4: { line: "\"Two seats, cash, no name.\" He is quiet. \"There is a man I know. He came to the bar on the Monday at half past eight and asked me to go up to the circle and take two seats in the front on the cash table, and he said he would settle, and he did not settle, and he took the tickets off the woman at the door and went out and I have not seen him since and I have not said one word about it because he has money and I do not.\" He looks at the coat. \"The coat is his. He has left it in that bar four Mondays running and it is a very bad coat.\"" },
      c12: { line: "\"A man who came down the side aisle.\" He nods. \"That was him. He was in the circle with me at the interval and he came down and stood at the back of the stalls and I thought he was going out for air, and he was not going out for air, because I watched him come back up during the last item and he was in his seat before the applause started.\"" }
    },
    s3: {
      c5: { line: "Ruth Ellery holds the dress up to the light and does not answer for some time. \"Let out an inch and a half at the bust.\" Then: \"A woman who is being poisoned for eleven days loses eleven pounds and a woman who is being measured for a dress that is going to be opened at the side is measured for a dress that is going to be opened at the side.\" She lays it down. \"I have dressed her six years and I have never once seen a measure taken for a costume that opens. I did not think about it. That is the honest end of it.\"", reveals: "c8" },
      c8: { line: "\"Vance asked me to leave it on the rail and let Ruth do it.\" She says the name and stops. \"There is no Ruth who does that. There has never been a Ruth. There is Ruth, and there is Nancy Brake, and Nancy Brake has been in this building since she was fourteen, and if Vance has been in this office saying the word Ruth to a woman who has dressed a star for six years, then Vance has been saying it to somebody else, and he has been saying it for eleven months.\"", reveals: "c13" }
    },
    s4: {
      c13: { line: "Nancy Brake looks at the prompt book and then walks away from it. \"I have never written in that book.\" She says it to the wall. \"That is not my hand and it is not a stage hand's hand, and I know who writes like that, and I have known since March, and I have said nothing, because the last time I said something to the management about that book I was sixteen and I did not work for two years.\"", reveals: "c14" },
      c14: { line: "\"The tap.\" She stops. \"I do not drink. I have not drunk anything since I was seventeen. He brought me a glass of water every half hour from the tap in that wings because I am always the one on that corner and I am always too dry to speak, and he did it every single time for two hours, and I never once thought about a tap.\" She turns round. \"I have thought about a tap for three days. That is what I have been thinking about. Not her.\"" },
      c15: { line: "\"Eleven feet away for four minutes.\" She is not crying and she is very calm. \"I could have said something at ten forty-six. I have had that in front of me for three days like a bill. You are telling me now that a man brought me a glass of water two hours before, and that he brought it in a glass with a chip on the rim, and that I was too dry to speak, and that is a reason, and I have been three days without one.\"" }
    },
    s5: {
      c12: { line: "Halloway is the only man in this case who sounds like a policeman. \"I came down the side aisle in my own time and I did not see the man in front of me and I saw the back of him, and I noted the coat because it is a very bad coat, and I have been in eleven hundred seats' worth of theatres for eleven years and I have never in my life seen a worse one.\"", reveals: "c10" },
      c10: { line: "\"Eight programmes in the interval.\" He writes it down. \"Cash, in the interval, in a house where everything is on a commissioner's return, which means the interval is the one time of the evening when a man in this audience can stand in a bookshop and nobody asks him for a shilling. I have watched men do it for eleven years to get in free.\" He looks up. \"And on the Monday, the man who did it had already bought a seat, and bought it in cash at the door, and gave the tickets to somebody. That is not a man trying to get in. That is a man making sure somebody else was in the room.\"" }
    }
  },
  truth: {
    culprit: "s1", motive: "Six years of dressing a woman and one dress in eleven weeks that she would not let her be measured for", method: "Not in anything she took. In the air of the stage, which is warmed, and which is fed by a pipe under the boards",
    key: ["c1", "c17", "c6"],
    narrative: "Cyril Vance fired Dolly Pargeter in March with a threat in the file copy that he has never carried out, and then hired her back for four pounds a week in April, and a woman who has been put off a stage and put back on it for a raise is a woman who begins to keep things. The brass key in the handbag was a letter from the front-of-house manager, and a letter she was carrying to a solicitor, and the green dress was made to be opened at the side, and the pipe under the fourth board was where a theatre manager goes when a girl has told him she is going to talk.",
    reveal: "He filled her water glass from the tap in the wings at the interval in a chip on the rim and did it himself so that nobody could say, and he sat in row G with a coat that was not his so that eleven hundred people would say a thing that was in the programme, and he has been in that theatre for nine years and he has never once been seen to do a job on a Monday."
  },
  hint: "Nobody has asked what was in the dress, and nobody has asked what was under the floor. There is a kneeling mark at centre stage and a contract upstairs that says a man inspects eight feet of pipe every Monday, and he missed one Monday, and it was the Monday she came back.",
  merit: 1300
});
