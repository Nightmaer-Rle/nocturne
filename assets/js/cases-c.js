/* ═══════════════════════════════════════════════════════════
   NOCTURNE — cases-c.js   ·   Files 13–14
   Tier III (Grave)
   ═══════════════════════════════════════════════════════════ */

/* ── FILE 13 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 13, tier: "hard", title: "The Glass Orchard",
  date: "3 December 1947", weather: "Hard frost, fog on the glass, no wind", place: "The Rookery, Thornbury",
  client: "Miss Cornelia Rook, sister of the dead", fee: "£200, and be quick",
  brief: [
    "My sister Hester and her husband and two children are dead in that glasshouse, and the doctor says arsenic, and the doctor is right, and the police have been in the house since Friday and have not found where it came from, and it is now the third of December and the frost will finish the vines, and the vines are worth eleven hundred pounds.",
    "The children were found first. The parents after. The order is the thing I cannot get past. Whoever did it did the children first, and I would like to know what that means, and I would like to know it before the frost takes my sister's vines."
  ],
  setup: "Four people dead, the order of death is the clue, and a frost with a clock on it.",
  deadline: 11400,
  suspects: [
    { id: "s1", name: "Aldous Rook",    role: "The dead man's business partner", face: "A", note: "Wine merchant. Bought Thornbury fruit for eleven years and stopped last March." },
    { id: "s2", name: "Perrin Quill",   role: "The family's solicitor and friend", face: "P", note: "Wrote the will. Dined in the house on Thursday." },
    { id: "s3", name: "Silvie Marchant", role: "The children's governess",         face: "S", note: "Left the house on Friday afternoon. Her account is in writing and has not varied." },
    { id: "s4", name: "Dr. Emrys Vail", role: "Physician",                       face: "E", note: "Called on Friday morning. Signed the certificates." },
    { id: "s5", name: "Hester Rook",    role: "The dead woman",                  face: "H", note: "Twenty-nine years old. She made that tea." }
  ],
  motives: [
    "A contract that Thornbury fruit would have ruined in one season",
    "A will he wrote and a beneficiary he has never been able to name aloud",
    "She knew what was in the tea and she made the tea",
    "There is no motive that puts an eleven-year-old in a glasshouse, and I do not believe there is one"
  ],
  methods: [
    "Arsenic in the tea, made by the woman herself, and distributed at four o'clock",
    "Arsenic in the fruit, and the fruit was cut into the children's tea at four",
    "Arsenic sprayed in the glasshouse and absorbed through the skin by everyone who entered it",
    "Arsenic in the well, and the well is a hundred yards from the house"
  ],
  locations: [
    { id: "l1", name: "The glasshouse", icon: "🌿", present: [],
      desc: "A hundred feet of Victorian glass, half of it fogged inside. Four dead things in the order they were found: the children at the warm end, by the pipe, where the heat is; the parents at the cold end, by the door. Somebody has been very careful with the order of this room, and it is not the order a murderer would keep.",
      exams: [
        { id: "x1", name: "The pipe end", icon: "🔥", note: "Where they were found. Look at the air here.", clue: "c1" },
        { id: "x2", name: "The vines", icon: "🍇", note: "Eleven hundred pounds of vine and a scorch mark.", clue: "c2" },
        { id: "x3", name: "The staging", icon: "🪵", note: "Slatted. Look under the slats.", clue: "c3" },
        { id: "x4", name: "The floor", icon: "⬛", note: "Lime and soot on the tiles. And two prints.", clue: "c4" },
        { id: "x5", name: "The ventilation sash", icon: "🪟", note: "The catch is wired shut. Has been for years.", dead: true }
      ] },
    { id: "l2", name: "The kitchen", icon: "🍵", present: [],
      desc: "A cold kitchen in a house with a dead family in it. On the table, four cups, a teapot and a jug. One cup is clean. Three are used. There is a caked teabag, a tin marked SUGAR, and a second tin under the sugar tin that is not labelled, because it is a tin a housekeeper keeps the things she should not have in a labelled tin.",
      exams: [
        { id: "x6", name: "The four cups", icon: "🍵", note: "Three used, one clean. Whose is which?", clue: "c5" },
        { id: "x7", name: "The teapot", icon: "🫖", note: "It is her mother's. It is from the good service.", clue: "c6" },
        { id: "x8", name: "The second tin", icon: "🥫", note: "You will want a warrant. You will not get one.", clue: "c7" },
        { id: "x9", name: "The two clocks", icon: "🕐", note: "The kitchen clock and the hall clock.", clue: "c8" }
      ] },
    { id: "l3", name: "The dispensary", icon: "💊", present: ["s4"],
      desc: "A room off the surgery with a press and a ledger and a smell of it. The key is in Dr. Vail's waistcoat and he has taken it out and handed it over without being asked, which is either innocence or a man who is not afraid of what is in there.",
      exams: [
        { id: "x10", name: "The poisons register", icon: "📕", note: "Signed in and signed out, by law, for years.", clue: "c9" },
        { id: "x11", name: "The press", icon: "🗄", note: "Fifty bottles. Count them against the book.", clue: "c10" },
        { id: "x12", name: "The dispensary ledger", icon: "📒", note: "A sale in Thornbury on the ninth of November.", clue: "c12" },
        { id: "x13", name: "Vail's account", icon: "🗣", note: "He will tell you about Thursday and Friday.", clue: "c11" }
      ] },
    { id: "l4", name: "The study", icon: "📚", present: ["s2"],
      desc: "A gentleman's room, a bureau, and a set of books with one shelf out of line. Quill is at the bureau and has been at the bureau for two days, doing the inventory a dying man would want done.",
      exams: [
        { id: "x14", name: "The will", icon: "📜", note: "Three copies. One is a fair copy. One is not.", clue: "c13" },
        { id: "x15", name: "The out-of-line shelf", icon: "📕", note: "There is a book that is not in the inventory.", clue: "c14" },
        { id: "x16", name: "Quill's account", icon: "🗣", note: "He was in the house on Thursday at dinner.", clue: "c15" },
        { id: "x17", name: "The bureau", icon: "🗄", note: "A drawer that sticks, and a keyhole worn round.", clue: "c16" }
      ] },
    { id: "l5", name: "The nursery", icon: "🧸", present: ["s3"],
      desc: "Two small beds and a schoolroom, and on the desk a slate with a sum on it in a child's hand. Silvie Marchant is not here. She has written to say that she will not come back.",
      exams: [
        { id: "x18", name: "The slate", icon: "🪨", note: "Read it as a child's writing, not an instruction.", clue: "c17" },
        { id: "x19", name: "The children's tea things", icon: "🧸", note: "Two cups. Both clean.", clue: "c18" },
        { id: "x20", name: "Marchant's letter", icon: "✉", note: "One page. Very careful.", clue: "c19" }
      ] }
  ],
  clues: [
    { id: "c1", name: "Where the children were", type: "observation", from: "l1", text: "The children were found at the warm end, by the pipe, at four o'clock on a Sunday afternoon, in a glasshouse with the sun on the far wall, and the two of them had come in to be warm, because there is a four o'clock tea at the warm end of the glasshouse on a Sunday in December because the mother is pregnant and cannot get up the stairs twice." },
    { id: "c2", name: "The scorch", type: "physical", from: "l1", text: "A scorch on the vine leaves, four feet up, on the side facing the door, and not on the vine, and not on the glass, and not on the staging. A flame, briefly, at four feet, in a glasshouse full of dry vine wood, in December, in fog. Somebody put a candle on a cane in there to see by, and it caught the vine, and the shape of the burnt leaf tells you how long they stood in there after they lit it. Twenty minutes. No more." },
    { id: "c3", name: "Under the slats", type: "physical", from: "l1", text: "Arsenic does not fall out of the air. It is white, tasteless, and heavy enough to sit in a crack and stay there, and there is a line of it in the crack between the staging slats a yard from the door, and it has been swept into a heap and the heap has been put back and smoothed over with lime." },
    { id: "c4", name: "Two sets of prints", type: "physical", from: "l1", text: "Lime and soot on the tiles and two sets of prints: a schoolroom boot, size thirteen, which goes in and out, and a size nine, which goes in and stays." },
    { id: "c5", name: "One clean cup", type: "physical", from: "l2", text: "Four cups on the table. Three used, one clean, and the clean one is on the left of the place where the mother sits, and there is a damp ring on its saucer. She made the tea, all four cups, and the fourth went into the tin and back in again, or the fourth was made after the other three and never used. A woman who has just poisoned her family does not go to the trouble of making a fourth cup." },
    { id: "c6", name: "The good service", type: "observation", from: "l2", text: "The teapot is the best one in the house and it has been in weekly use since September, and it is used for the four o'clock tea, and the four o'clock tea is taken in the glasshouse, and it is taken on Sundays, and the children were found dead on a Sunday at four o'clock, and nobody has ever in this case suggested a day." },
    { id: "c7", name: "The unlabelled tin", type: "physical", from: "l2", text: "Under the sugar tin, a tin with a soldered lid that has been opened and resoldered with tacks, and inside it, wrapped in a cloth: white powder, and a chemist's label in a village dispensary's hand, and the label is the dispensary's and the handwriting is not the dispensary's." },
    { id: "c8", name: "Two clocks", type: "document", from: "l2", text: "The kitchen clock is a Seth Thomas and loses four minutes a week. The hall clock is a regulator that keeps time. Both were stopped at four o'clock and both have since been wound, and the woman of the house wound the hall clock every Sunday night at ten and never once touched the kitchen clock, which her mother brought her and which nobody else has ever wound in eleven years." },
    { id: "c9", name: "Signed out on the ninth", type: "document", from: "l3", text: "The poisons register, kept and signed by law: ARSENIC, one ounce, signed out on the ninth of November by P. QUILL, solicitor, on a written requisition signed by Dr. E. VAIL, and returned the same day unopened, and the return is signed by the same hand." },
    { id: "c10", name: "Fifty-one bottles", type: "physical", from: "l3", text: "The press holds fifty bottles, as the purchases say. The purchases are one book and the returns are another, and the two disagree by one every year since 1943, and a dispensary that is a bottle short every year is a dispensary with a second book, and the second book is not in the surgery." },
    { id: "c11", name: "Vail's account", type: "testimony", from: "l3", text: "\"I gave her iron on Thursday. I have given her iron since August and I saw her on Friday morning at nine and I gave her aspirin and told the house to call me if the children took anything unusual, and I told her to keep the dispensary key out of reach, in front of the children, as a joke.\" He takes out the key. \"She laughed. I have thought about that joke every day, and I signed a requisition for arsenic on the ninth of November because he is a gentleman of this county and I have signed a hundred of them and never once asked what it was for.\"" },
    { id: "c12", name: "A sale, not a return", type: "document", from: "l3", text: "One ounce of arsenic, sold on the ninth of November to a customer written as R. ROOK, paid for, and never entered in the poisons register, because a sale is not an issue, and because a man in a hurry to buy an ounce of arsenic in a village on a wet Thursday does not ask whether the shopkeeper is writing it down. He did not make it: Dr. Vail was at the county hospital from ten until four and his hand is on a register there. R. ROOK wrote it, and R. ROOK was standing in that room at the same time as the solicitor." },
    { id: "c13", name: "Three copies", type: "document", from: "l4", text: "A will executed in 1945, three copies: a fair copy in Quill's hand, signed by the testator and two witnesses; a draft with a name in the third line struck through; and the third in the bureau, whose drawer sticks, and whose keyhole is worn round." },
    { id: "c14", name: "The book that is not in the inventory", type: "document", from: "l4", text: "A shelf out of line and behind it a book not on the list: this year's market almanack, with the market days marked, and the second Sunday of December marked, and beside it in pencil: 4. G.H. The two children were E. and T. and the woman was Hester, and nobody in that house has ever been called G.H., and the letters are in a nine-year-old's hand." },
    { id: "c15", name: "Quill's account", type: "testimony", from: "l4", text: "\"I dined there on Thursday, ate a good dinner, drank a glass of wine and left at nine, and I drove my own car and there is a receipt at the garage. I will tell you exactly what I said to her at dinner: I told her the Pear Tree contract was safe and that Aldous would sign in March. I told her that to put her at ease. I did not tell her why I wanted it signed in March.\"" },
    { id: "c16", name: "A worn keyhole", type: "physical", from: "l4", text: "The bureau drawer sticks because it is swollen, and the keyhole is worn round on the outside, and the wax in it is fresh sealing wax, and there are two impressions on it and they are the same impression, and they are not the impression of the key to the bureau, because the key to the bureau is in Quill's pocket and he has offered it to you." },
    { id: "c17", name: "A child's slate", type: "document", from: "l5", text: "In a nine-year-old's hand: 4 OCKOCK. ALL OF US. THE WARM END. — and beneath it, smaller, in the same hand: if nobody comes i will put it on the fire. Which is a child reporting a plan. A child cannot invent a reason to stand in a glasshouse with a candle, and this is the same hand as the G.H. in the almanack." },
    { id: "c18", name: "Two clean cups", type: "physical", from: "l5", text: "The children's own cups, in the nursery, both washed, both dry, and each marked with its owner's initial. Neither child's cup had been in the kitchen on a Sunday. The four o'clock tea is taken in the glasshouse, in the good service, and it has always been taken in the good service, and the governess has been in that house for four years." },
    { id: "c19", name: "Marchant's letter", type: "testimony", from: "l5", text: "One page, written on the Friday before anybody had asked her a question: the children were taken to the glasshouse for their tea as usual, on their own, as they had done every Sunday; she was in the schoolroom; Hester came in and said she would not be long and put the tray out herself; and the governess did not follow her into the glasshouse, because in four years nobody in that house had ever followed her anywhere, and you do not begin on a Sunday." }
  ],
  confront: {
    s1: {
      c9: { line: "Aldous Rook does not look up from the fruit ledger. \"A solicitor requisitioned arsenic out of a dispensary. I did not. Ask him what it was for and he will tell you a story about a tenant's dog, and it will be a good story, and it will not be true, and I have been listening to good stories about that man for eleven years.\"", reveals: "c3" },
      c3: { line: "\"A heap of it under the staging.\" He closes the ledger. \"Then somebody swept it up and put it back, in the one place they know will not be searched until the frost kills the vines and the floor is dug.\" He looks at you for the first time. \"Which is my trade, and which is why I know it, and which is why I have not slept since Friday.\"" },
      c2: { line: "\"A candle on a cane.\" He reads the burnt shape the way other men read a receipt. \"You are asking me to tell you how long they stood there. Twenty minutes, no more. Which means the person who lit it knew the way to the warm end, knew it would be dark, and had twenty minutes to decide what to do with what they had come in to do.\"" }
    },
    s2: {
      c9: { line: "Quill lays the register flat on the desk. \"Signed out and returned the same day, unopened, and I will tell you why, because you are going to write it down and I would rather write it down first. I wanted to know whether he would sign it. He signed it in front of me, and then he asked me what it was for, and I told him a dog.\"", reveals: "c13" },
      c13: { line: "He takes out the draft and does not unfold it. \"There is a name in the third line of the 1945 will, struck through, in my hand, in this room, at his instruction, and the name struck through is the name of the man who would have inherited this house, the vine, and the four of them.\"", reveals: "c14" },
      c14: { line: "\"G. H.\" He says it slowly. \"I have not seen those initials anywhere, and I have looked. And I will tell you the thing that has kept me from sleeping: the almanack is in a bookcase in the room I have been sitting in for two days, and the bookcase is out of line, and I moved it on Friday afternoon to reach a volume of leases behind it, and I have not mentioned that to anybody.\"" }
    },
    s3: {
      c19: { line: "Marchant reads her own letter and sets it down. \"I wrote that on Friday morning, before the police came, because I knew what I would be asked and I wanted the answer to be in my own hand in my own words before anybody helped me with it.\" She is not defensive; she is finished. \"I did not follow her into the glasshouse because nobody in that house has ever followed her anywhere, and you do not begin on a Sunday.\"", reveals: "c18" },
      c18: { line: "\"The cups.\" For the first time she looks frightened. \"I washed them. On Friday afternoon, in the nursery sink, before I wrote the letter. I washed two children's cups that had not been used since Wednesday, and I washed them because I could not bear to leave them, and I have not told one single person on this earth that I did it, and I have just told you.\"", reveals: "c17" }
    },
    s4: {
      c12: { line: "Vail reads the entry and sits very still. \"R. ROOK. That is a purchase and not an issue, and I did not make it, because I have never kept a second book and because on the ninth of November I was at the county hospital from ten until four and my hand is on a register there.\" He is not slow; he is arriving. \"But R. ROOK wrote it. Somebody came into my dispensary and bought an ounce of arsenic out of my stock, and I signed the requisition for it, and the two of us were in that room at the same time.\"", reveals: "c11" },
      c11: { line: "\"I told her to keep the key out of reach, in front of her children, as a joke.\" He puts his face in his hands for a moment. \"I have been a physician for twenty-two years and I have never in my life told a woman to keep a key out of reach in front of her children unless I wanted her to.\"" }
    },
    s5: {
      c5: { line: "There is nobody to confront. The dead woman's account is the four cups and the good service and the one clean saucer with a damp ring on it, and it says what it has been saying since the second of December: she made four cups of tea, and she made the fourth one for herself, and she drank it, and she took the poison with her own hand.\" \n\nThe doctor's post-mortem put arsenic in all four stomachs, which is the detail that has kept this case open for a week. It cannot be. And yet there are four stomachs and four cups and one clean saucer, and a woman who could not have known which of the three cups her children would pick up.\"", reveals: "c6" },
      c6: { line: "\"The good service, for the four o'clock tea, in the glasshouse, on Sundays, since September.\" There is no voice here, and the ledger in the study has a column for it in a nine-year-old's hand, and the column has eleven entries, and every one of them ends with a different time.\"" }
    }
  },
  truth: {
    culprit: "s5", motive: "She knew what was in the tea and she made the tea", method: "Arsenic in the tea, made by the woman herself, and distributed at four o'clock",
    key: ["c5", "c8", "c14"],
    narrative: "Hester Rook read her own plan in a market almanack her children could climb up and read, because she had left it on a shelf where they played. She was twenty-nine and pregnant, with four hundred pounds and eleven hundred pounds of vine and no husband but a man who signs things in March. She bought an ounce of arsenic out of a village dispensary in her own name on the ninth of November and put it where the housekeeper could not reach it and the children could not open it.",
    reveal: "The children were first because a child on a Sunday in December goes to the warm end of a glasshouse at four o'clock without being asked, and she sent them in before she sent the tray out, and she lit a candle on a cane so she could see the door, and she stood there twenty minutes with the vine catching behind her while her children drank their tea."
  },
  hint: "The order of the bodies is the message and you are reading it upside down. She was not careless about who found the children first; she was careful about who found the fourth cup clean. Go and read the kitchen, and then read the almanack.",
  merit: 1000
});

/* ── FILE 14 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 14, tier: "hard", title: "Nine Days in Antwerp",
  date: "20 January 1948", weather: "Cold, sleet, a black North Sea", place: "The Meridian ferry and the customs house",
  client: "HM Customs (through a solicitor, and reluctantly)", fee: "£400, drawn on account, no questions",
  brief: [
    "A customs surveyor of this port walked off the Rotterdam ferry on the ninth of January and has not been heard of since. He was not on the passenger list. He was not in the car park. He was, however, seen at nine o'clock at Antwerp by a man who has since been extremely unhelpful, and nine days is not a long time, and it is a great deal of time for a man to be nobody.",
    "You are not being asked to bring him back. You are being asked to establish what was in the two cases he carried across, and the department is aware that the answer may be unpleasant and is more aware still that it must be documented before a certain Friday."
  ],
  setup: "A missing customs man, a ferry, nine days of not being anybody, and a department with a deadline.",
  deadline: 15600,
  suspects: [
    { id: "s1", name: "Anton Vreede", role: "Dock labourer, Antwerp",  face: "A", note: "Found the surveyor's cap on the quay. Bought a coat with money that was not his." },
    { id: "s2", name: "Hester Aylward", role: "The surveyor's niece",    face: "H", note: "Nine days in Antwerp, three nights in a hotel, and no luggage through customs." },
    { id: "s3", name: "Dirk Vollen",   role: "Customs clerk, Rotterdam", face: "D", note: "Cleared the car. Logged it at 9.40. Never saw who was driving." },
    { id: "s4", name: "Ivo Brandt",    role: "Shipping agent",         face: "I", note: "Chartered the ship. His company's name is on the third case." },
    { id: "s5", name: "Ruth Pryce",    role: "The department's own clerk", face: "R", note: "Signs the account out every Friday. She did not sign it this one." }
  ],
  motives: [
    "The third case was not on the manifest and was worth more than the department",
    "He was going to be made an example of, and he had nine days and a foreign coast",
    "Somebody paid the department to look the other way and the surveyor found the receipt",
    "He was never on the ferry. The man seen at Antwerp was a man in his coat, with his cap, and no more"
  ],
  methods: [
    "Never got off the ferry. Went down with it, or was put off before it docked",
    "Walked into the port, out of the cap, into a coat, and into nine days",
    "Drowned in the harbour, which the department has already written off",
    "Is alive, in Antwerp, in a hotel, on a passport that belongs to somebody else"
  ],
  locations: [
    { id: "l1", name: "The ferry", icon: "🛳", present: ["s3", "s5"],
      desc: "The Meridian, forty-eight hours Rotterdam to Hull with a call at Antwerp, and a vehicle deck that smells of tar and diesel and forty tons of freight nobody has opened. There were thirty-one crossings that week and a manifest for each and a customs check for each, and the surveyor's name is on none of them.",
      exams: [
        { id: "x1", name: "The passenger list", icon: "📋", note: "Three crossings. He is on none of them.", clue: "c1" },
        { id: "x2", name: "The crew list", icon: "👥", note: "A relief hand joined at Antwerp and left at Hull.", clue: "c3" },
        { id: "x3", name: "The lost property", icon: "🎒", note: "One article. Not the cap. Better than the cap.", clue: "c4" },
        { id: "x4", name: "The purser's book", icon: "📔", note: "Somebody asked for a quiet table twice.", dead: true }
      ] },
    { id: "l2", name: "The customs house", icon: "🏛", present: ["s3", "s5"],
      desc: "A room of ledgers, a green lamp over the counter, a strong room, and the particular smell of a building where the only thing that matters is a signature. Vollen has been on that counter all week and has not been relieved and does not want to be.",
      exams: [
        { id: "x5", name: "The 9.40 log", icon: "📕", note: "A car, a driver, and a signature.", clue: "c2" },
        { id: "x6", name: "The strong room", icon: "🔐", note: "Three cases, and the third is not in the register.", clue: "c5" },
        { id: "x7", name: "The confiscations book", icon: "📒", note: "Seized, destroyed, or quietly not seized.", clue: "c6" },
        { id: "x8", name: "The account book", icon: "📚", note: "Signed out every Friday. This one is not signed at all.", clue: "c7" },
        { id: "x5b", name: "Pryce, at the counter", icon: "🗣", note: "She has not been relieved all week. Ask her about Friday.", clue: "c8" }
      ] },
    { id: "l3", name: "The quay at Antwerp", icon: "⚓", present: ["s1"],
      desc: "Cold, wet, working quay, and a hut where a man sleeps in the daytime. A cap was found on the ninth and a man bought a heavy coat two streets away at eleven at night on the ninth with a note, and the note is still in the shop's book.",
      exams: [
        { id: "x9", name: "The cap", icon: "🧢", note: "Found, reported, and kept by a man who wanted a shilling.", clue: "c9" },
        { id: "x10", name: "The shop's book", icon: "🛒", note: "A coat, paid in a banknote that is not Dutch.", clue: "c10" },
        { id: "x11", name: "The shipping times", icon: "🕐", note: "Nine o'clock, says the man. Read the tide.", dead: true },
        { id: "x12", name: "Vreede's account", icon: "🗣", note: "He will sell you a great deal for very little.", clue: "c11" }
      ] },
    { id: "l4", name: "The hotel", icon: "🏨", present: ["s2"],
      desc: "Three nights, a room at the end of a corridor, a register, and a name in the register that is not quite the name of the woman who paid. There is a cup on the sill, a window that does not shut, and a wardrobe with nothing in it but a coat that is not a coat.",
      exams: [
        { id: "x13", name: "The register", icon: "📕", note: "Three nights, paid in advance, in the wrong name.", clue: "c12" },
        { id: "x14", name: "The envelope", icon: "✉", note: "Aylward's account of the nine days, in order.", clue: "c13" },
        { id: "x15", name: "The telephone", icon: "☎", note: "A call to Hull on the eighth, at eleven at night.", clue: "c14" }
      ] },
    { id: "l5", name: "The chandler's office", icon: "🏢", present: ["s4"],
      desc: "An office above a chandler's with a chart of the water on the wall and a telephone that rings while you are standing in it. Brandt is very calm and has been very calm since you came in, and has offered you tea twice.",
      exams: [
        { id: "x16", name: "The charter party", icon: "📜", note: "Signed in November. Three cases named on it.", clue: "c15" },
        { id: "x17", name: "The safe", icon: "🧰", note: "Locked. And the bill for its repair is in the tin.", clue: "c16" },
        { id: "x18", name: "Brandt's account", icon: "🗣", note: "He will answer everything, slowly, and mean none of it.", clue: "c17" }
      ] }
  ],
  clues: [
    { id: "c1", name: "Thirty-one crossings", type: "document", from: "l1", text: "The lists for the seventh, the eighth and the ninth all read as ordinary: crew, two hundred and eleven passengers, four cars, freight sealed at Rotterdam. A customs surveyor in his own port does not sail as a passenger on his own service; he is freight, and he is on the freight sheet, and he is on the freight sheet for three sailings in a different font, which is the font a man uses when he is writing with somebody else's hand held over his." },
    { id: "c2", name: "Nine-forty, and a signature", type: "document", from: "l2", text: "The car cleared at Antwerp at 9.40 with a woman in it and two cases in the boot, and the signature is D. VOLLEN, and the man on the quay says he saw a man in a cap at nine o'clock outside the customs gate, and the ferry came in at eight and was alongside for fifty minutes, and the cap was on the quay at nine, and a man does not walk off a ship at eight and stand outside a gate at nine unless he has spent an hour deciding where to stand." },
    { id: "c3", name: "A relief hand", type: "document", from: "l1", text: "The crew list: a bosun's mate, one A. Deveau, engaged at Antwerp and signed off at Hull, paid in the purser's book in cash, no address required. A man who joins a ship at one port and leaves at the next and gives no address is a man who was put ashore and a man who was put aboard, and the purser's book has a note beside his wage: 'per inst. of agent'." },
    { id: "c4", name: "One article of lost property", type: "physical", from: "l1", text: "A spectacle case, handed in on the Rotterdam sailing by a man who gave the name A. DEVEAU and no address, and found at the other end. It is cheap, it is empty, and the inside of the lid is scratched with three letters and four digits. The three letters are H.A.Y. The four digits are a date." },
    { id: "c5", name: "The uncleared third case", type: "document", from: "l2", text: "The strong room holds two cases for the surveyor and its register says two, and there is a third, in the corner, behind the shelving, and it is on no sheet in that room, and the corner is the corner where a thing is put when it has arrived in a hurry and is not going to be looked for until Friday." },
    { id: "c6", name: "The confiscations book", type: "document", from: "l2", text: "A page for the ninth of January: SEIZED, one case, declared value nil, contents not examined, destroyed by authority. Below the entry, in the same hand, an extra line: 'disposal deferred to R.P.' A customs officer may defer disposal. A customs clerk may not. The initials are a clerk's, and the clerk signs the account out every Friday, and she did not sign it this one." },
    { id: "c7", name: "Friday's account, unsigned", type: "document", from: "l2", text: "The account for the week of the ninth, and every page signed R. PRYCE except the last, and the last page is the one that would account for a man being on a boat. She has said she was ill. The signature she has given for that is a doctor's, and the doctor is the one on the third page of the same book, dated the sixth." },
    { id: "c8", name: "Pryce's account", type: "testimony", from: "l2", text: "\"I have signed that account every Friday for six years and I did not sign it this one because I was in bed with a temperature and there is a doctor's line in the book beside the other doctor's line and both are from Dr. Ashby, and I know exactly what you are about to say, and I have said it to myself all week.\"" },
    { id: "c9", name: "A cap for a shilling", type: "physical", from: "l3", text: "A service cap of the Rotterdam customs, found on the quay on the ninth and reported to a hut, and the man in the hut kept it because it was worth keeping and then it was worth a shilling, and the sight of it is a cap and nothing else. It has been on a shelf in a hut for eleven days in a port where a man in a cap is a man in a uniform, and it is the only part of this case that anybody could buy." },
    { id: "c10", name: "A coat, paid in the wrong money", type: "document", from: "l3", text: "The shop's book: one heavy coat, on the ninth, at eleven at night, paid with a note that is not a Dutch note and not a Belgian note, and the shopkeeper wrote the serial down because he writes serials down, and a light-fingered man who took a coat for a foreign banknote did not know there would be a written number on the note." },
    { id: "c11", name: "Vreede's account", type: "testimony", from: "l3", text: "\"A man in a cap, yes, at the gate, and he had a case and he was not in a hurry and he was not lost, he was waiting, and he was waiting for somebody because he did not go and find anybody. He stood by the pillar and he watched the ship go out. Then he took the cap off and put it in his pocket and he went up the road, and I said good evening and he said good evening, in your language, the way a man says good evening who has been learning it from a book.\"" },
    { id: "c12", name: "Three nights in the wrong name", type: "document", from: "l4", text: "A. DEVAUE, at the end of a corridor, three nights, paid in advance in full, no luggage beyond one case, and the signature in the register is not the signature in the passenger book that says A. Deveau was a bosun's mate. Two different men's hands, one borrowed name, and the borrowed name is the name of a man who got off that ship at Rotterdam on the ninth." },
    { id: "c13", name: "The account of the nine days", type: "document", from: "l4", text: "Hester Aylward, in order, in her own hand: I went to Antwerp on the sixth to meet my uncle at the ferry and he was not on the ship and I waited two days, and on the ninth I saw a man in a cap, and I followed him for a mile, and I sat down in a street and I worked out that he was not a customs man, he was a woman dressed as a customs man, and I understood the whole of it at once. And then, in a hand that has been going steadier as it goes, because she is a woman who was frightened and then became steady: I have been wearing his cap since the ninth and I did not know it was his until the second day, and I have been in his hotel since the ninth, and I have not been out of it." },
    { id: "c14", name: "A call to Hull", type: "testimony", from: "l4", text: "The hotel's telephone account, produced without any difficulty: a call to a number in Hull at eleven at night on the eighth of January, four minutes, and a call to the same number on the ninth, nine minutes, and a call on the tenth, two minutes. The number belongs to the customs house. The eighth was before the car sailed. The tenth was after the man seen at Antwerp had already been a man in a hotel for a day." },
    { id: "c15", name: "Three cases on the charter", type: "document", from: "l5", text: "The charter party of November, signed by Brandt for the owner and by a man for the charterer, and the cargo schedule lists three cases against the surveyor's firm. Two of them are the ones in the strong room. The third is described as INSTRUMENTS, RETURN, and the return column against it has been left blank, and a case of instruments that comes back does not need a return column, and the surveyor signed the schedule himself at the top." },
    { id: "c16", name: "A bill for a safe", type: "document", from: "l5", text: "A tin of bills, and in it an invoice from a Rotterdam locksmith for the repair of a Chubb safe, dated the sixth of January: door re-hung, hinges re-pinned, and a note in the locksmith's hand, 'no forcing, mechanism binding, job cheap because he did not want the police looking at the lock'. Somebody opened that safe without opening it, and then paid for the opening." },
    { id: "c17", name: "Brandt's account", type: "testimony", from: "l5", text: "\"Three cases, yes, and the third is not my company's and never was. I charter space. I do not fill it. If a man at the customs house put a case of instruments into my charter I am very sorry, and I have signed a statement, and I will sign it again, and I will sign whatever else you would like, and I should like you to notice that I have offered to do all of that before you asked me a single question.\"" }
  ],
  confront: {
    s1: {
      c10: { line: "Vreede turns the shop's book round without being asked and points at the number. \"A man gave my friend a coat and a note with a number on it and my friend wrote the number down because he is careful, and I read the number, and I have been waiting eleven days for a man who has not come for a coat that was not his.\"", reveals: "c9" },
      c9: { line: "\"A cap.\" He shrugs. \"A cap is a shilling and a story. I do not know who was in it. I know who took it off, because I was standing four feet away and I have watched men take things off in this port for twenty years, and a man takes off a cap he has been wearing, and a man does not take off a cap he has only just bought.\"" },
      c11: { line: "\"He said good evening in your language like a man learning from a book.\" He looks at you. \"He is a woman. I have carried heavy things on this quay for twenty years and I know the difference, and I have not said it because she paid me on the tenth and she paid me well.\"" }
    },
    s2: {
      c13: { line: "Aylward reads her own letter and does not look up. \"Yes. I have been in that hotel since the ninth of January, in my uncle's cap, on my uncle's name, and I have written the whole of it down in order because I have known for nine days that nobody in this city would believe a word of it from a woman who has spent nine days in a hotel in Antwerp.\"", reveals: "c12" },
      c12: { line: "\"He got off the ship at Rotterdam. I saw him do it, from the quay, at eight in the morning, and he walked into the gate and stood by the pillar and I came off on the boat after him, and that is the whole crime.\" She finally looks up. \"He was not running from anything. He was carrying two hundred and forty thousand pounds of this department's money to a man who owns a warehouse on this quay, and he had a fortnight to decide whether to be a thief, and he had not decided, and he stood at that gate for two hours deciding.\"" },
      c14: { line: "\"The calls are mine.\" She says it without any drama. \"I telephoned Hull from the hotel on the eighth, before the car sailed, to tell my uncle's office that I was coming. On the ninth, nine minutes, to say I was here and to keep them off me. On the tenth, two minutes, to say that the third case was in the chandler's safe, and that the man who opened it did not force it, and that the locksmith had a note saying he did not want the police looking at the lock. And nobody came, because they were busy looking for me.\"" }
    },
    s3: {
      c5: { line: "Vollen reads his own signature for a long time. \"I signed the car through at 9.40. I did not see who was driving because I was looking at the freight sheet. That is not a defence, it is a description.\" He turns the page round. \"And there is a third case in that strong room that is not on any sheet in that room, and I have been in that room every working day for six years.\"", reveals: "c6" },
      c6: { line: "\"Deferral to R.P.\" He reads it twice. \"A clerk cannot defer a disposal. That is the first thing they teach you. Whoever wrote that line wanted the book to say the case was destroyed when it was not, and they wanted a clerk's initials on it, and there is exactly one clerk who writes R.P.\"", reveals: "c7" }
    },
    s4: {
      c15: { line: "Brandt looks at the schedule for a long moment and does not offer you tea. \"Three cases. Instruments, return, blank column. Yes.\" He takes off his glasses. \"I will now tell you the thing I have been not telling you since Tuesday, and I would like it recorded that you did not have to take my glasses off to hear it.\"", reveals: "c16" },
      c16: { line: "\"Somebody opened my safe without opening it and then paid a locksmith to write down that they had. I did not do that. I did not have to, and I would like you to understand why I did not have to.\" He replaces his glasses. \"Because on the sixth of January a customs surveyor came into this office and told me that the third case was on my charter and that he had signed the schedule, and that he had a fortnight to decide, and that if I moved that case for him he would put my company on a list.\"" }
    },
    s5: {
      c7: { line: "Pryce does not sit down. \"I did not sign it because I was in bed.\" Flat, and quiet, and not looking at the book. \"I want to be exact, because you will make me be exact and I would rather be exact first: I was in bed. I was also in this building on the ninth, at four in the afternoon, alone, and there is a third case in that strong room and it is the case of instruments and it weighs something.\"", reveals: "c8" },
      c8: { line: "\"And the doctor's line is real. Both lines are real. Dr. Ashby is a liar, but he is a liar who puts his name to things, and I chose that particular liar, and I chose him on the sixth, and on the seventh I went to his surgery and asked him for a line, and he asked me no questions at all, which is how I knew he would do it.\" She finally looks at you. \"I have been sick about it since. Not about the man. About the six days it took me to work out that the easiest thing in the world was to keep him alive.\"" }
    }
  },
  truth: {
    culprit: "s2", motive: "He was going to be made an example of, and he had nine days and a foreign coast", method: "Walked into the port, out of the cap, into a coat, and into nine days",
    key: ["c1", "c4", "c6"],
    narrative: "Hester Aylward was not the man on the quay. The man on the quay was a customs surveyor with two hundred and forty thousand pounds of his own department's money in two cases and a fortnight to decide, who chose not to decide and told a shipping agent where his third case was, and was then written out of his own life by his own department in four days of ledgers and one forged doctor's line.",
    reveal: "She took the cap off him on the ninth and has worn it since, and she has spent nine days in an Antwerp hotel under a bosun's name waiting for a decision that was made in a customs house in England, and the only person who has said anything true about it in eleven days is a dock labourer who wants to be left alone."
  },
  hint: "Nobody has asked what was in the cap. Three articles of lost property, one borrowed name, two different hands, and a spectacle case with a date scratched into the lid that somebody has not thought about in eleven days.",
  merit: 1100
});
