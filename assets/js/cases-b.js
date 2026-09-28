/* ═══════════════════════════════════════════════════════════
   NOCTURNE — cases-b.js   ·   Files 08–12
   Tier II (Complicated)
   ═══════════════════════════════════════════════════════════ */

/* ── FILE 08 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 8, tier: "medium", title: "The Charmed Nightingale",
  date: "26 August 1947", weather: "Hot, close, the last of the fair", place: "The Blue Perch, Wardour Street",
  client: "Mr. Dominic Stroud, proprietor of the Blue Perch", fee: "£100, and the name of whoever did it",
  brief: [
    "The Perch was full to the door on Saturday because the fair was in town and nobody wants to be home. Ines Varenne sang the first set at eleven, the second at one, and the last at three, and between the second and the last somebody strangled her in her own dressing room with her own scarf, in a building with two hundred people in it, and the police have a man downstairs who is going to lose his job over it.",
    "She was twenty-six. She had one engagement a night and she was the only reason eighty people came to my cellar. I want the truth and I want it by Friday and I would rather you did not make a speech about the fair being full."
  ],
  setup: "Two hundred people, one locked door, and an alibi made of nothing but the fact that everybody was busy.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Salvatore Ricci", role: "Pianist",           face: "S", note: "Played under her for four years. Sent to Coventry for a week in June." },
    { id: "s2", name: "Vera Lund",     role: "Club proprietress", face: "V", note: "Owns the room, the band, and half of what Ines earned." },
    { id: "s3", name: "Boyd Aitchison", role: "Telegraph messenger", face: "B", note: "Delivered a telegram to the Perch at one o'clock and signed for it." },
    { id: "s4", name: "Cyril Embury",  role: "Producer, and the dead woman's husband", face: "C", note: "Married her in June. Was in Manchester on Saturday, and can prove it, and has offered to prove it four times." },
    { id: "s5", name: "Dora Fenwick",   role: "Dressing-room attendant", face: "D", note: "The only person with a key. Says she was in the cellar all night." }
  ],
  motives: [
    "He was going to lose her voice and she was going to be famous without him",
    "The contract ran out on the twelfth and she had already signed with the rival house",
    "A telegram came at one o'clock and the contents ended everything",
    "Nobody had a motive, and the husband has the best one in the world, which is grief"
  ],
  methods: [
    "Strangled with her own scarf in a locked room, and the key was inside",
    "Strangled in the cellar stairwell and carried up to make a room",
    "Drugged first, and strangled afterwards by somebody who was not there",
    "Not strangled. The scarf was arranged. She was dead before she got upstairs"
  ],
  locations: [
    { id: "l1", name: "The dressing room", icon: "🎤", present: ["s5"],
      desc: "Ten feet by eight, a mirror with bulbs, a chair, a rug. The door has no lock — it has a bolt on the outside, and the bolt is shot, and the room is eight feet above a cellar stair that the fair crowd uses as a shortcut because nobody stops them.",
      exams: [
        { id: "x1", name: "The body", icon: "🧍", note: "The scarf is not what killed her. Look closer.", clue: "c1" },
        { id: "x2", name: "The bolt", icon: "🔒", note: "Shot from outside. It works from outside.", clue: "c2" },
        { id: "x3", name: "The mirror", icon: "🪞", note: "Three bulbs out. Find out which.", clue: "c3" },
        { id: "x4", name: "The rug", icon: "🧶", note: "Two sets of heels, one pair of size four.", clue: "c4" },
        { id: "x5", name: "The dressing table", icon: "💄", note: "A glass, a cigarette, a telegram receipt.", clue: "c5" },
        { id: "x6", name: "The door frame", icon: "🪵", note: "The wood is old. Somebody leaned on it.", dead: true }
      ] },
    { id: "l2", name: "The cellar stair", icon: "🪜", present: ["s1", "s3"],
      desc: "Stone steps behind the bar, dark, and a service corridor that comes out at the fair ground. The handrail is polished by two hundred people a night and by one man a night for four years, and you cannot tell which.",
      exams: [
        { id: "x7", name: "The service corridor", icon: "🚪", note: "Open to the fair. All night.", clue: "c6" },
        { id: "x8", name: "Ricci's account", icon: "🗣", note: "He was playing. Ask what he played and when.", clue: "c7" },
        { id: "x9", name: "The fire bucket", icon: "🪣", note: "A bottle in it. Not a bottle of beer.", clue: "c8" }
      ] },
    { id: "l3", name: "The band room", icon: "🎹", present: ["s1", "s2"],
      desc: "Upright piano, a stool, a wall of sheet music, and the smell of beer. Vera Lund keeps the contracts in a biscuit tin in the corner, and the corner has a chair in front of it, and the chair has been moved.",
      exams: [
        { id: "x10", name: "The biscuit tin", icon: "🍪", note: "Contracts, and one that is torn.", clue: "c9" },
        { id: "x11", name: "The set list", icon: "🎶", note: "Signed by the pianist, as he signs them.", clue: "c10" },
        { id: "x12", name: "Lund's account", icon: "🗣", note: "She will tell you about the contract and not the girl.", clue: "c11" }
      ] },
    { id: "l4", name: "The telegraph office", icon: "📨", present: ["s3"],
      desc: "The counter, the tape, and a boy's wages in a folded envelope. Saturday's tape is still on the spool and the office boy will copy anything you ask for, slowly, out loud, twice.",
      exams: [
        { id: "x13", name: "Saturday's tape", icon: "📜", note: "One o'clock. Read it twice.", clue: "c12" },
        { id: "x14", name: "Aitchison's route", icon: "🗺", note: "Eleven deliveries. He wrote them down.", clue: "c13" },
        { id: "x15", name: "The signature book", icon: "✍", note: "Every telegram signed for. Compare the hands.", clue: "c14" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A throat and a scarf", type: "physical", from: "l1", text: "The scarf is knotted at the throat and pulled from behind and the marks are wrong: they run up under the jaw and the skin is unbroken over the windpipe. You cannot strangle a person with a scarf and leave the front of the neck unmarked. The scarf was tied afterwards, by somebody who wanted a shape." },
    { id: "c2", name: "A bolt that works from outside", type: "physical", from: "l1", text: "There is no key. The bolt slides home from the corridor side, so the room could be shut and it could not be entered. A locked room with a bolt on the outside is not a locked room. It is a stage flat, and somebody in this cast knows stage flats." },
    { id: "c3", name: "Three bulbs out", type: "physical", from: "l1", text: "Three of the mirror bulbs are dead and the one over her right shoulder is alive. The fuse is in the ceiling rose and it is not tripped. Somebody put a hand up and removed three bulbs, in the dark, in order, and left the fourth because they were not a good enough electrician to know it mattered." },
    { id: "c4", name: "Two sets of heels", type: "physical", from: "l1", text: "Her own size four is in the rug, deep. A size seven is at the edge, and the size seven is turned, and it goes to the door, and it does not come back. One person went out of that room in a hurry and one person went in wearing somebody else's shoes." },
    { id: "c5", name: "The telegram receipt", type: "document", from: "l1", text: "A counterfoil, one o'clock, signed AITCHISON BOYD, and a fourpenny charge and a note in Vera Lund's hand: PAID IN CASH, DO NOT PUT ON THE SLIP. On the dressing table, next to the dead woman's cigarette, there is a second cigarette, unlit, of a different make." },
    { id: "c6", name: "A corridor open to the fair", type: "observation", from: "l2", text: "The service corridor runs from the cellar stair out through a beer hatch into the fair ground, and it is not watched and it is not locked and two hundred people went through it Saturday evening. That is not an alibi. That is a supply route." },
    { id: "c7", name: "What Ricci played", type: "testimony", from: "l2", text: "\"I played the whole of the last set and I will give you the programme and the metronome and the bar numbers, and I will give you the second violinist' name who was sitting eight feet from me and can say the same.\" He is not offended by the question; he is offended that you asked it in front of the room. \"The last set ended at twenty to four. She came up for it at three. Ask the twenty people who were facing the stage.\"" },
    { id: "c8", name: "A bottle in the fire bucket", type: "physical", from: "l2", text: "Half a bottle of barbiturate, poured out, and a spoon in it. The label is a chemist's and the chemist's is two streets away and closed on Saturday. The bottle is full of water now, because somebody rinsed it and put it in the bucket, and rinsing is a thing you only do for a reason." },
    { id: "c9", name: "The torn contract", type: "document", from: "l3", text: "Ines Varenne's engagement, torn in half and reassembled badly, with the counter-signature of the rival house showing through the tear. A singer is not a prisoner. She can leave. She had signed for eleven pounds a week more, and the contract says 1 September, and the eleven pounds was the whole argument." },
    { id: "c10", name: "The set lists", type: "document", from: "l3", text: "Ricci signs them, and he signs them the same way every night for four years, and Saturday's is signed and the time is written as 3.00. But Saturday's list has one piece on it that is not in the binder and not in his hand, and the piece is the one he plays when he wants the room quiet." },
    { id: "c11", name: "Lund's account", type: "testimony", from: "l3", text: "\"She was my singer for four years and I paid her on time and I gave her the best dressing room in this city and I will not sit here and be sorry for it in front of a policeman. Yes, we spoke about the twelfth. Yes, she had a better offer. No, I did not tear up anything, and if you want to know what she said to me on Saturday afternoon it was that she would do the summer and then she would think about the winter, and men never hear the second half of a woman's sentence.\"" },
    { id: "c12", name: "The one o'clock telegram", type: "document", from: "l4", text: "LIVERPOOL 1142 TO BLUE PERCH WARDOUR STOP SHE IS NOT TO KNOW BEFORE MONDAY STOP SIGNED C E STOP. Sent at 12.31, delivered at one, five words that any person in the Perch could have read over the shoulder of the man paying the counter fee." },
    { id: "c13", name: "Eleven deliveries", type: "document", from: "l4", text: "Aitchison's route in his own hand, in the fair season when he carries messages to the fair ground: number fourteen, Wardour, at one o'clock, and then nothing until four, and then the Strand, and the four hours in the middle are four hours in which he is standing on a fair ground with a boy who is having the time of his life." },
    { id: "c14", name: "Three hands in the book", type: "document", from: "l4", text: "Every signature on Saturday is AITCHISON BOYD until the one o'clock entry, which is AITCHISON B — and then three letters added afterwards, in a heavier hand, in ballpoint. The three letters are B, O and Y, added one at a time, because the boy's hand was unsteady and somebody was standing over him making him finish it." }
  ],
  confront: {
    s1: {
      c9: { line: "Ricci does not touch the contract. \"Eleven pounds.\" He says the number the way other men say a woman's name. \"I have played under four women. I did not stay because of eleven pounds. I stayed because of a girl from Trieste who could make two hundred people stop eating.\"", reveals: "c10" },
      c10: { line: "He looks at the extra piece for a long time. \"That is not my writing and it is not in the binder. And it is the thing I play when I want the room to stop talking, and I wrote it on every set list for four years, and I did not write it on Saturday.\" He puts it down very carefully. \"Somebody sat in this room on Tuesday and copied one line off a hundred set lists.\"" },
      c8: { line: "\"I did not touch the bucket.\" Then, after a moment: \"But I know who rinses a bottle. A man rinses a bottle to see if his teeth hold the mark. A woman rinses a bottle because a bottle is dirty.\"" }
    },
    s2: {
      c9: { line: "Lund reads the tear and does not pretend not to. \"Yes.\" Flat. \"I tore it on Wednesday and I taped it and I put it back in the tin, because if I threw it away he would have a document and if I gave it to him he would take her on Saturday and read it out in front of the whole book.\"", reveals: "c11" },
      c11: { line: "\"The second half of the sentence.\" She looks at the tin. \"Her second half was: and if you go to the Rialto, they will find out that you tore it. I have been sitting on that for three days and I have not been able to say it to the police, and you are the first person I have said it to, and I would like you to think very carefully about why that is.\"" }
    },
    s3: {
      c12: { line: "The boy goes the colour of the wall. \"I did not read it. I never read them. You do not read them.\" His hands are shaking. \"But I did not take the fourpence off Vera, and I did not put it on the slip, and if I had put it on the slip the man would not have known who was standing behind me.\"", reveals: "c14" },
      c14: { line: "He looks at the three added letters for a very long time. \"I wrote the A. Then somebody took the pen out of my hand and made me finish it, and he did it slow, and he stood behind my shoulder, and he was a man, and he smelled of hair oil.\" He swallows. \"And I did not turn round. I did not turn round because he paid me eleven shillings on Saturday and it is the fair and my father is on the swing boats.\"" }
    },
    s4: {
      c5: { line: "Embury looks at the unlit cigarette and does not touch it. \"That is not my make. I do not smoke and everybody in this business knows it, including everybody who has ever wanted me to be somewhere I was not.\" He looks at the receipt. \"Cash. Do not put it on the slip. That is Vera, and that is the reason nobody can put me in that room, and Vera has known that since Wednesday.\"" },
      c12: { line: "The colour goes out of his face and does not come back. \"C. E.\" He sits down. \"That is my initial. That has been my initial for thirty-one years and there are eleven people alive who can sign it, and I telephoned two of them on Sunday and neither of them is in this country.\"", reveals: "c1" },
      c1: { line: "\"She was dead before she reached the top of that stair.\" He says it flatly, the way a man says a thing he has been saying to himself since Saturday. \"I have been reading about the scarf for three days. I am not a fool. I do not believe the scarf. I am telling you that I do not believe it because I cannot think of anybody else who would.\"" }
    },
    s5: {
      c3: { line: "Dora Fenwick looks at the three dead bulbs and her face does not change at all. \"I change the bulbs in this room every month and I have changed them for six years and I do not need an electrician. I take them out with a cloth so I do not break the bayonet.\"", reveals: "c4" },
      c4: { line: "\"Size seven.\" She looks down at her own feet, which are size four. \"Somebody put on my other pair and walked out of my room in them, and I have been in this cellar since six o'clock on Saturday, and nobody has come down these steps, and if you want to be very kind you will stop asking me to say it again.\"" }
    }
  },
  truth: {
    culprit: "s5", motive: "A telegram came at one o'clock and the contents ended everything", method: "Drugged first, and strangled afterwards by somebody who was not there",
    key: ["c1", "c12", "c14"],
    narrative: "Dora Fenwick did not strangle a woman. She fed her three barbiturate tablets washed into a glass, sat her down on the rug because she could not hold her up, and went upstairs. Somebody whose initial is C.E. and who owns a hairdressing business in a town forty miles away had been in the band room on Tuesday copying a line off a hundred set lists, and had arranged on Saturday for the man in the corridor to sign a book in a boy's unsteady hand.",
    reveal: "He is not a monster and he has not slept. He has spent three days constructing a murder in a room with a bolt on the outside of the door, and a poor boy in a telegraph office is the only witness left who can describe his shoes, and a girl who has changed six years' worth of bulbs is the only one who can say the room was dark."
  },
  hint: "The scarf is a signature, not a weapon — read the neck, not the story. Then find out who in that building had four free hours on Saturday, and who could pay a telegraph boy in cash.",
  merit: 700
});

/* ── FILE 09 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 9, tier: "medium", title: "Twelve Keys",
  date: "11 September 1947", weather: "Rain from noon, continuous", place: "Provincial & Hale, bankers, Threadneedle Lane",
  client: "Mr. Aylward Hale, managing director", fee: "£150, and the ledger will balance",
  brief: [
    "We have had a robbery. Not a burglary — a robbery, in our own strong room, at four o'clock in the afternoon on a Tuesday, while four hundred people are in the bank. Two hundred and forty thousand pounds in bearer bonds. Our cashier walked out at half past four and has not been seen since, and the strong room is still locked, and the alarm did not go off, and the money is exactly the amount that a man could carry in one coat.",
    "The bank has been in my family for one hundred and four years. I do not intend to hand it to a police investigation that will take two years and a newspaper to find out that I have been robbed by one of my own."
  ],
  setup: "A strong room nobody broke into, a cashier nobody can find, and a bank with twelve keys and eleven people who say where theirs were.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Edwin Prance", role: "Cashier",            face: "E", note: "Twenty-six years in the building. Walked out at half past four." },
    { id: "s2", name: "Ruth Ilminster", role: "Second cashier", face: "R", note: "Counted the bearer bonds in front of him that morning. Was counting them at ten at night." },
    { id: "s3", name: "Gerald Fisk",  role: "Accountant",        face: "G", note: "Works in the back office with the custody ledgers. Hates being a suspect." },
    { id: "s4", name: "Amos Brierley", role: "Night watchman",   face: "A", note: "Found Prance's coat. Reported it. Has a brother who lost a leg at the Fair." },
    { id: "s5", name: "Sir Hildebrand Quaile", role: "Director",  face: "S", note: "Was in the bank at four. Left before the alarm was even raised." }
  ],
  motives: [
    "He had been living off the count for eleven months and the audit found it",
    "He was leaving the country and needed a boat fare, and that is all it was",
    "The bearer bonds were written off in 1943 and reissued — somebody was covering an old fraud",
    "A man who resigns on a Tuesday afternoon at half past four is a man who has been given notice"
  ],
  methods: [
    "He was given the combination and the door opened at four",
    "The door was opened with a key, and there are twelve, and eleven people said where theirs were",
    "The door was never opened. The bonds were never in the strong room.",
    "The bonds were carried out in a newspaper bundle by somebody everybody was watching"
  ],
  locations: [
    { id: "l1", name: "The strong room", icon: "🔐", present: ["s2"],
      desc: "Eleven feet of steel, a four-wheel door, and a combination lock over a time lock. There is a drawer inside it, and the drawer is for the day book, and the day book is in the drawer, and the day book stops on the morning of the robbery.",
      exams: [
        { id: "x1", name: "The time lock", icon: "⏰", note: "It opens for the bank, not for a hand.", clue: "c1" },
        { id: "x2", name: "The door wheel", icon: "⚙", note: "Read the grease, and read the dust.", clue: "c2" },
        { id: "x3", name: "The day book", icon: "📕", note: "It is a record of the day. Read Wednesday.", clue: "c3" },
        { id: "x4", name: "The bond racks", icon: "🗄", note: "Two hundred and forty thousand, and a gap.", clue: "c4" },
        { id: "x5", name: "The floor beneath the racks", icon: "🧹", note: "Swept. Recently, and by somebody careful.", clue: "c5" }
      ] },
    { id: "l2", name: "The banking hall", icon: "🏛", present: ["s2", "s5"],
      desc: "Marble, brass, and a line of customers at three o'clock. From the teller's cage you can see the strong room door, and everybody in this bank can see the teller's cage, and that is a fact with a great many uses.",
      exams: [
        { id: "x6", name: "The teller's cage", icon: "🧾", note: "Whose cage. Read the ink on the ledge.", clue: "c6" },
        { id: "x7", name: "The public counter", icon: "🪟", note: "Four hundred people, all of them waiting.", clue: "c7" },
        { id: "x8", name: "Quaile's account", icon: "🗣", note: "He was in the building at four o'clock.", clue: "c8" }
      ] },
    { id: "l3", name: "The back office", icon: "🗃", present: ["s3"],
      desc: "A room of ledgers, a fireproof safe, and a smell of copying fluid. Fisk has been in since seven and has done nothing but work, and has done it with the frantic competence of a man who wants to be visibly doing something.",
      exams: [
        { id: "x9", name: "The custody ledger", icon: "📒", note: "Who holds the keys. Read the bottom of the page.", clue: "c9" },
        { id: "x10", name: "The 1943 write-off", icon: "📄", note: "Two hundred and forty thousand, written off, reissued.", clue: "c10" },
        { id: "x11", name: "Fisk's account", icon: "🗣", note: "He will answer everything, in order, at length.", clue: "c11" }
      ] },
    { id: "l4", name: "The watchman's lodge", icon: "🛖", present: ["s4"],
      desc: "A brick hut, a stove, a chair, and a desk. On the desk is a coat with a label in the sewing and a list of eleven names and a column of times, and the column of times is complete for every man in the bank that night except one.",
      exams: [
        { id: "x12", name: "The coat", icon: "🧥", note: "Prance's. Found in the corridor, folded.", clue: "c12" },
        { id: "x13", name: "Brierley's round", icon: "📝", note: "Eleven men. Ten signed. One did not.", clue: "c13" },
        { id: "x14", name: "The lodge clock", icon: "🕰", note: "The watchman keeps time by the bank.", clue: "c14" },
        { id: "x15", name: "The stove", icon: "🔥", note: "Burned paper. Not the newspaper.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "A lock that ignores hands", type: "physical", from: "l1", text: "The time lock is a spring mechanism set by the bank's own clock. It released the bolts at four, and no key and no amount of turning would have released them at any other hour. Whoever opened that door at four o'clock did not break anything, because nothing was broken. They arrived on time." },
    { id: "c2", name: "Grease and dust", type: "physical", from: "l1", text: "The wheel is greased on the inside face of the third spoke only, and the dust on the sill is undisturbed, and the door swung out, not in. Two people in this bank know which spoke to grease and when, and one of them is eighty-one and does not come in on a Wednesday." },
    { id: "c3", name: "The day book stops", type: "document", from: "l1", text: "The day book is opened each morning and closed each night, in ink, in two hands. The last entry is Tuesday morning. There is no Tuesday night entry, and the book has not been closed, which in one hundred and four years of this bank has happened four times, and twice it was because the building was on fire." },
    { id: "c4", name: "A tidy gap", type: "physical", from: "l1", text: "The bonds were not pulled at random. They were taken from the middle of the middle rack, in one run of twelve, and the pressure marks of the twelve are still in the dust of the rack, and the rest of the racks have been squared up afterwards by somebody who tidies." },
    { id: "c5", name: "A swept floor", type: "physical", from: "l1", text: "The floor under the bond racks is swept and the dust is in the corners in a neat line, and the sweep is a soft broom used carefully. There is one thing on that floor that is worth sweeping and it is worth two hundred and forty thousand pounds, and it is worth sweeping because it would be recognisable." },
    { id: "c6", name: "The teller's ledge", type: "document", from: "l2", text: "A coat of banker's ink on the ledge of the second cage, and the second cage was Prance's, and Prance has not signed on that ledge since the middle of August, and by the end of August the second cage was Ilminster's and there was no reason on earth for her ink to be on his ledge." },
    { id: "c7", name: "Four hundred people", type: "testimony", from: "l2", text: "Ilminster, flatly: \"At four o'clock I had two hundred and forty thousand pounds of bearer bonds under my hand on the counter, in front of my own customer, counting them out for a stock transfer. I have never in twenty-two years been in that strong room and I would not know the combination if you paid me.\" And she is right, and that is the point of her." },
    { id: "c8", name: "Quaile's account", type: "testimony", from: "l2", text: "\"I was in the bank at four because I was in the bank at four, because I am a director and directors are in banks. I left at six minutes past four, which is before I was told anything, and before the alarm, and before the police, and I have written all of that down in my own diary in my own hand and I am happy to be checked against a railway timetable.\" He is entirely correct and that is why it is interesting." },
    { id: "c9", name: "Who holds the keys", type: "document", from: "l3", text: "Twelve keys: two held by directors, four by officers, five by the night staff, one by the watchman, and one in the strong room itself on a chain round the duty manager's neck at night. The custody ledger has a column for each and a column for the last time each was signed for, and one line in the last column is signed in pencil, at half past three on the Tuesday, by a man whose surname is Prance, for an item described as the time key." },
    { id: "c10", name: "The 1943 write-off", type: "document", from: "l3", text: "In 1943, during the bank examination, two hundred and forty thousand pounds of bearer bonds were written off as lost and reissued from the Bank of England. The reissue was made in the same denominations, in the same numbers, in the same rack. The bonds taken on Tuesday were, as bearer bonds are, indistinguishable from the bonds issued to replace them. Which means nobody can say for certain which half of that rack was robbed." },
    { id: "c11", name: "Fisk's account", type: "testimony", from: "l3", text: "\"I have never been in the strong room. I have never had a key. I can tell you what the bonds were worth on Tuesday because I did the exposure, and the exposure says the rack was two hundred and forty and the day book says the rack was two hundred and forty, and the difference is nothing.\" He goes on for nine minutes. He is telling the truth in the order he prepared it, and he has not once looked at the 1943 file, and nobody has mentioned the 1943 file to him." },
    { id: "c12", name: "Prance's coat", type: "physical", from: "l4", text: "Folded on a chair in the corridor at ten past five by Brierley, and it is not a coat left behind by a man in a hurry — it is folded, square, in the way a thing is folded by somebody who was told to fold it. There is a handkerchief in the pocket, folded. There is nothing in the pockets at all, and no money, and no ticket, and no letter." },
    { id: "c13", name: "Eleven men, ten signatures", type: "document", from: "l4", text: "Brierley's round, in his own hand, in ink, every hour from ten to six. Ten signatures. The gap is half past three to half past four, and the reason is written in the margin and the reason is in his own hand: 'AS PER TELEPHONE, DIRECTOR.' No director telephoned. Brierley will swear to that on anything, and he is a man who swears carefully." },
    { id: "c14", name: "The bank as a clock", type: "observation", from: "l4", text: "The watchman does not carry a watch. He sets his rounds by the bank clock in the strong room, which is correct, and which means that for one hour in the afternoon the only accurate clock in the building is behind a four-wheel steel door that anybody in the bank can see from the banking hall." }
  ],
  confront: {
    s1: {
      c9: { line: "Prance's face does not change, which is how you know. \"I signed for the time key at half past three.\" He says it to the middle distance. \"I have signed for that key every Tuesday for four years. It is my job on a Tuesday. Ask the managing director who stands in the banking hall on Tuesdays.\"", reveals: "c12" },
      c12: { line: "\"I did not leave my coat. I was not in a hurry. I walked out of that bank at half past four with my coat on and I walked to the station and I have been sitting in a lodging house in Ancoats for four days because I could not think of a single place I could go.\" His hands are entirely steady. \"Somebody else folded it. Somebody else put the handkerchief in. And I have been too frightened to say so, because if I say so I am a man who walked out of a bank with a key.\"" },
      c10: { line: "\"The reissued bonds.\" He looks up for the first time. \"Then you cannot prove which bonds they took, and if you cannot prove which bonds they took, then you cannot prove what was taken, and if you cannot prove what was taken then there was no robbery at all.\" He is not enjoying it. He is frightened to death. \"Ask the man who signed the 1943 examination. Ask him what was in the rack in 1943 and who counted it.\"" }
    },
    s2: {
      c6: { line: "Ilminster looks at the ink on the ledge for a long moment and then at her own hand. \"I did not put my hand on his ledge. I have never once put my hand on that ledge.\" She puts it on the ledge now, deliberately, and looks at the result. \"There. Now it is there. Now somebody will say it was always there.\"", reveals: "c4" },
      c4: { line: "\"Twelve in a run out of the middle.\" She says it without any expression. \"That is a man who has been told which shelf. A man who came in to steal two hundred and forty thousand in an afternoon in a busy bank is not going to choose a tidy run of twelve. He is going to take the whole rack and drop it.\"", reveals: "c9" }
    },
    s3: {
      c10: { line: "Fisk stops dead. \"The 1943 file is in the fireproof safe and the fireproof safe is in this room and I am in this room.\" He looks at the safe. Then, in a completely different voice, tired to the floor: \"I have been in this bank nineteen years and I have never once opened the 1943 file, and you have just told me it exists, and I would like to go home.\"", reveals: "c11" },
      c11: { line: "\"I have never been asked about 1943.\" He says it flatly. \"Not by you, not by the police, not by Mr. Hale. Nineteen years. And the bonds on that rack are the bonds that were reissued in 1943, and if a man walked in and took them in 1943, then nothing has been stolen this week, and one of two men in this building has known that since the day it happened.\"" }
    },
    s4: {
      c13: { line: "Brierley puts the round book down very carefully. \"I did not write 'as per telephone'. I was told what to write and I wrote it, and I wrote it because a director telephoned the lodge at half past three and I took the message and I did not know the name and I did not ask for it.\" He swallows. \"That is a lie. There was no telephone. I wrote it because the man who came to the lodge at half past three said if I wrote anything else I would not have a brother at the Fair.\"", reveals: "c2" },
      c2: { line: "\"The third spoke.\" He is looking at his hands. \"I have greased that wheel every Wednesday night for nineteen years on the same spoke, because that is where the grease trap is, and if you have been in the strong room since nineteen hundred and forty-five you would have found it, and if you have not you would have greased the hub like a fool and I would have seen the mistake at seven o'clock the next morning.\"" }
    },
    s5: {
      c8: { line: "Quaile does not sit down. \"I have been checked against a railway timetable, as I said you might do. I was on the 4.20 for Dunmere and the man beside me will say so, and the booking clerk will say so.\" He adjusts a cuff. \"Now. I have a question for you, and I should like it answered before I leave this room. Which bonds did you say were taken? Because I read the phrase in the managing director's statement and I do not think it was the phrase he said to me.\"", reveals: "c10" },
      c10: { line: "The first thing that happens in this room is a very long silence. Then: \"I examined this bank in 1943. I signed the write-off. I was thirty-four and I did not look at the rack and I have thought about that rack every year since.\" He picks up his hat. \"I would like to be recorded as saying that I was not in the strong room on Tuesday. I would also like to be recorded as saying that I knew where those bonds were at half past three.\"" }
    }
  },
  truth: {
    culprit: "s3", motive: "The bearer bonds were written off in 1943 and reissued — somebody was covering an old fraud", method: "The door was never opened. The bonds were never in the strong room.",
    key: ["c10", "c13", "c4"],
    narrative: "Nobody robbed that bank. The two hundred and forty thousand pounds on rack three was the same two hundred and forty thousand pounds that was written off in 1943 and never actually returned to the Bank of England, and Gerald Fisk had spent nineteen years keeping a fraud in a file while a cashier stood in a banking hall every Tuesday holding bearer bonds that the bank no longer owned.",
    reveal: "Edwin Prance signed for the time key every Tuesday and every Tuesday a man who does not exist as far as the bank is concerned stood in the banking hall and watched him do it. Prance walked out at half past four because somebody telephoned the lodge and told a watchman with a brother at the fair that the next question would be a harder one."
  },
  hint: "A time lock makes this robbery too easy. Ask whether the money was ever there — and if it was not there in 1943 either, ask which file nobody in that building has ever opened.",
  merit: 750
});

/* ── FILE 10 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 10, tier: "medium", title: "The Alabaster Hand",
  date: "2 October 1947", weather: "First frost, bright and hard", place: "A sculptor's studio in Cobb Street",
  client: "The Cobb Street Improvement Society (a delegation of four)", fee: "£90, plus a plaster cast for the society",
  brief: [
    "Corvin Hale was found dead in his own studio on Monday night, standing, in front of his own finished work, with a chisel in his right hand and no wound on his right hand. The coroner says heart. The coroner also says a man standing up with a chisel in a dead man's hand and no wound is a sentence that requires a certain amount of believing.",
    "The society is aware that Mr. Hale was, by all accounts, a difficult man, and that he had made a very great deal of money, and that four people have now come forward to say that he had ruined each of them in turn. We would like the matter closed without an exhibition of the family, and we would like it closed this month."
  ],
  setup: "A dead sculptor, a clean right hand, and a cast of a hand that somebody else had made.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Nell Ashby",   role: "The dead man's apprentice and mistress", face: "N", note: "Twelve years in the studio. Was painting in the loft." },
    { id: "s2", name: "Reuben Carse",  role: "Marble merchant",                     face: "R", note: "Supplied the stone for eleven years. Was ruined by the last commission." },
    { id: "s3", name: "Dr. Ivo Sarn",  role: "Physician",                           face: "I", note: "Called at nine on Monday. Prescribed for the heart." },
    { id: "s4", name: "Fen Halliday",  role: "Society secretary",                  face: "F", note: "Wanted the Cobb Street war memorial removed from the square." }
  ],
  motives: [
    "Twelve years in the studio and not one line of her own name on anything",
    "He had been ruined by the last commission and was about to be ruined publicly",
    "The heart pills were not the right ones and somebody had told him to change to them",
    "The war memorial was his finest work and it was going to be taken down and carted away"
  ],
  methods: [
    "Heart, as the coroner says, and a chisel put in his hand afterwards",
    "Strangled from behind while he was working and then set upright",
    "Drugged, and stood up, and waited for",
    "A fall from the modelling platform, and the studio arranged afterwards"
  ],
  locations: [
    { id: "l1", name: "The studio floor", icon: "🗿", present: ["s1"],
      desc: "A north light, a bench, a modelling stand, and stone dust everywhere including on the ceiling beams. The work in front of him is finished, and signed, and dated three days before he died. His feet are square, his back is straight, and the chisel is in his right hand at an angle that no working man ever holds.",
      exams: [
        { id: "x1", name: "The right hand", icon: "✋", note: "No wound. Look at the wrist instead.", clue: "c1" },
        { id: "x2", name: "The left hand", icon: "🖐", note: "What the left hand is doing is very interesting.", clue: "c2" },
        { id: "x3", name: "The feet", icon: "👣", note: "Stone dust on the toes, and a fourth mark.", clue: "c3" },
        { id: "x4", name: "The finished work", icon: "🗿", note: "It is not the war memorial. Look closer.", clue: "c4" },
        { id: "x5", name: "The modelling stand", icon: "🛖", note: "Two feet high, four steps, a rail.", dead: true }
      ] },
    { id: "l2", name: "The plaster casts", icon: "🧱", present: ["s1"],
      desc: "Shelves to the ceiling, and on them the hands of every person whose hand Hale ever modelled. Including, on a middle shelf, a right hand, adult, male, in three-quarter view, and the index on its shelf card has a date on it, and the date is three weeks ago.",
      exams: [
        { id: "x6", name: "The dated cast", icon: "🤚", note: "Right hand, adult male, cast three weeks ago.", clue: "c5" },
        { id: "x7", name: "The shelf of arms", icon: "💪", note: "Somebody has been signing for a man in this city for a year.", clue: "c6" },
        { id: "x8", name: "The negative", icon: "🕳", note: "A plaster negative of a hand, and it is not Hale's.", clue: "c7" }
      ] },
    { id: "l3", name: "The loft", icon: "🎨", present: ["s1"],
      desc: "Easels, turpentine, and a canvas face down on a chair. The window is directly above the studio floor and the ledge is wide enough to stand on, and the ladder is Hale's and it is marked with his own height in pencil, and the mark is eleven inches below the top rung.",
      exams: [
        { id: "x9", name: "The face-down canvas", icon: "🖼", note: "Six weeks of work, and it is not hers.", clue: "c8" },
        { id: "x10", name: "The ladder and the mark", icon: "🪜", note: "Eleven inches. Read it as a fact, not an insult.", clue: "c9" },
        { id: "x11", name: "The palette", icon: "🎨", note: "Two greens. One is for leaves.", dead: true }
      ] },
    { id: "l4", name: "The physician's rooms", icon: "⚕", present: ["s3"],
      desc: "A surgery, a dispensary, and a prescription book. Sarn was out all evening on Monday and is out now, and his housekeeper has let you in because he told her to and would have said so himself.",
      exams: [
        { id: "x12", name: "The prescription book", icon: "📋", note: "Monday, nine o'clock. Read the dose.", clue: "c10" },
        { id: "x13", name: "The dispensary", icon: "🧪", note: "Three strengths of the same tablet.", clue: "c11" },
        { id: "x14", name: "The housekeeper's account", icon: "🗣", note: "She will tell you about the nine o'clock call and the telephone.", clue: "c12" }
      ] },
    { id: "l5", name: "The war memorial", icon: "🕊", present: ["s2", "s4"],
      desc: "It stands in the middle of Cobb Square in the rain and it is the best thing in the city, and the society has a petition open against it, and a removal contractor has been定价 quoting in the corridor of the council house. Hale carved the faces on it in 1941. It took him two years and it nearly killed him.",
      exams: [
        { id: "x15", name: "The faces", icon: "😶", note: "Seventeen of them, and one is not finished.", clue: "c13" },
        { id: "x16", name: "The contractor's quote", icon: "📄", note: "Dated Monday. Dated the day.", clue: "c14" },
        { id: "x17", name: "The petition", icon: "📝", note: "Three thousand signatures. Look at the last page.", clue: "c15" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A wrist, not a wound", type: "physical", from: "l1", text: "No wound on the right hand, but a band of bruising round the right wrist, four fingers wide, and the thumb is unmarked, and the fingers are marked. A hand that held a chisel all evening does not bruise like that. A wrist held still while a hand is guided is the other thing entirely." },
    { id: "c2", name: "What the left hand does", type: "physical", from: "l1", text: "The left hand is behind his back, and the fingers are curled, and it is not gripping. It is the hand of a man hiding something from a sculptor, which is a thing a sculptor would notice before he noticed anything else on earth." },
    { id: "c3", name: "A fourth mark", type: "physical", from: "l1", text: "The toes are square, planted, dusted, and behind them is a fourth pair of prints, narrower, shallower, in a swept place, going up to the modelling platform and back. The body was carried to the spot and set down on its feet by somebody who knew how to hold a man upright, which is a studio skill and not a general one." },
    { id: "c4", name: "The finished work", type: "document", from: "l1", text: "The work in front of him is not the memorial. It is a life mask: a man's face, taken in one sitting, in plaster, from life, three days before he died, and it is signed under the jaw, and it is the only thing in that studio that he ever signed, because he never signed anything that was not his own work and this one was not his own work." },
    { id: "c5", name: "A cast cast three weeks ago", type: "physical", from: "l2", text: "A right hand, adult male, plaster, in three-quarter view, taken on or about the tenth of September and marked HOLD. The fingers are longer than Hale's. There is a small hard lump at the base of the second finger and a groove on the inside of the wrist, and Hale's own casts are in the same room two feet away, and they are nothing like it." },
    { id: "c6", name: "Twelve men, no names", type: "observation", from: "l2", text: "A row of arm casts going back two years, each with a card, and every card says only a date and the word SIGNED. Hale was modelling a signature. He had been casting arms and forearms and hands from men who did not want to be known as having signed anything." },
    { id: "c7", name: "The negative", type: "physical", from: "l2", text: "Under the shelf, wrapped in oilcloth, a plaster negative of a right hand — the mould from which the cast was taken, and the mould is the evidence, because a cast is a copy and a negative is the original, and Hale kept negatives for forty years and had never thrown one away." },
    { id: "c8", name: "Six weeks of green", type: "observation", from: "l3", text: "The face-down canvas is a portrait of a woman, in greens, unfinished but good — very good, better than her, and the technique is Hale's, learned over twelve years, and the palette is her palette, and the subject's face is a photograph of Nell Ashby's own, cut from a magazine, taped to the reverse of the canvas and left there by somebody in a hurry." },
    { id: "c9", name: "Eleven inches", type: "observation", from: "l3", text: "Hale's height marked on his own ladder in pencil, and the mark is eleven inches below the top rung. Hale was five foot ten and could reach the top rung standing on it. This is a fact about a short woman with a long reach, and a short woman with a long reach can be in a loft for six hours a night and it will be recorded as painting." },
    { id: "c10", name: "The prescription", type: "document", from: "l4", text: "Monday, nine o'clock: digitalis, one tenth of a grain, and the second line reads TO BE TAKEN ONCE ONLY AT SEVEN THIS EVENING AND NO OTHER DOSE. One tenth of a grain is nothing. It is a dose for a heart that is not failing. Somebody wrote a real prescription and then wrote a small one underneath it." },
    { id: "c11", name: "Three strengths", type: "physical", from: "l4", text: "The dispensary holds three strengths of the same tablet. Sarn writes for the one-tenth. The one-half is prescribed to nobody in this city that the book can find, and the bottle of the one-half is three-quarters full and has been opened with a fingernail rather than a cork knife." },
    { id: "c12", name: "The housekeeper's account", type: "testimony", from: "l4", text: "\"The doctor was out from six and he did not come home till midnight, and there was a telephone call at half past six for him and I said he was out and the voice said to tell him it was the studio, and the doctor said it would keep, and then it did not keep.\" She hesitates. \"He was very strange about that call when he came in. He asked me what time it had been and wrote it down.\"" },
    { id: "c13", name: "The unfinished face", type: "observation", from: "l5", text: "Seventeen faces on the memorial. Sixteen are finished to Hale's standard, which is exacting. One is a smooth blank on the left side. The blank is at the far end, in the shadow of the plinth, and it is the only part of that work in four years that nobody could photograph or measure or describe, and Hale was not a man who left a blank." },
    { id: "c14", name: "A quote dated Monday", type: "document", from: "l5", text: "The removal contractor's quote for dismantling, carting, and erecting elsewhere: £340, dated the second of October, dated the day Hale was found dead in the evening, and sent to the Cobb Street Improvement Society, and countersigned by the society secretary, and Hale did not die until nine." },
    { id: "c15", name: "The last page of the petition", type: "document", from: "l5", text: "Three thousand signatures against the memorial, gathered in eight weeks. The last two hundred are in a different hand from the rest, tighter, in ink, and the addresses are all of one street, and the street is the one the marble merchant lives on, and the improvement society has been circulating this petition on a printing press that belongs to the Improvement Society, which has a printing press, and Mr Carse has been on its committee for nine years." }
  ],
  confront: {
    s1: {
      c5: { line: "Nell Ashby takes the cast out of Hale's hands without being asked, which nobody in twelve years would do. \"This is not a hand from a dead man and it is not a hand from a living one either. This is a hand from somebody who has never been in this studio.\" She turns it over. \"He made this on the tenth. I know the tenth. I was out of the city and I was in Worcester and I came back on the eleventh and he had shut the studio and would not tell me what he had been doing.\"", reveals: "c8" },
      c8: { line: "She looks at the canvas for a long time and does not cry, which is worse. \"Six weeks. Every night after eleven. I have been painting his portrait from a photograph of me in the Courier and he let me do it and he never once looked at it, and on Monday he asked me to leave it face down because somebody was coming at seven.\"", reveals: "c2" },
      c2: { line: "\"He had something behind his back.\" She almost laughs. \"He had the mould of a hand. He made me carry it down from the loft on Friday and put it in the press and he said if anybody asked, it was a study, and I have never in my life heard him lie about his own work.\"" }
    },
    s2: {
      c15: { line: "Carse does not read the page. \"I have been on that committee for nine years and I have printed every page of that petition and I did not know nine out of ten of the names on it, and I have said so to the secretary twice.\" He is genuinely angry and it is not directed at you. \"Carve me a man's hand and you can sign anything you like. I have known that since I was twenty-two.\"", reveals: "c14" },
      c14: { line: "\"Monday.\" He says the date like a curse. \"Monday. I did not see it until Tuesday morning, and it was dated the day, and a man who dates a quote for work that has not been agreed does not do it by accident.\" He takes it out and folds it. \"And the secretary countersigned it, and I have been nine years on a committee with him, and I did not ask him a single question about a single thing.\"" }
    },
    s3: {
      c10: { line: "Sarn reads his own handwriting and is silent for a long moment. \"The second line is mine. I wrote a real prescription and then I wrote a small one because he told me he was having attacks and that a large dose made him feel — \" he stops. \"He told me a large dose made him feel strange. In a man's chest. And I wrote what he asked me to write, and I have been a physician for nineteen years and I did not think about why a man would want less.\"", reveals: "c11" },
      c11: { line: "\"That is a half-grain bottle and I have never written for a half grain in this city.\" He goes and looks at it and comes back and his face has changed. \"It was opened with a fingernail. Somebody in this house, or somebody in that studio, wanted half a grain and wanted not to be written down, and I should like to know which of us you are going to have to write that in a report about.\"" },
      c12: { line: "\"The studio, at half past six.\" He writes it down again in front of you. \"Somebody telephoned me at half past six to say the studio was ringing, and I said it would keep, and at ten minutes to nine the studio telephoned again and I was in the middle of a dinner party and I did not answer, and I have thought about that every day.\"" }
    },
    s4: {
      c13: { line: "Halliday takes a photograph of the blank face out of his coat, as though he has been carrying it since 1943. \"Sixteen faces. The seventeenth is smooth. I have photographed that plinth from that angle in nineteen forty-four and in nineteen forty-five because I always thought it was the light.\" He looks up. \"It is not the light. It is a cast of a hand, held against the stone, and it is the only signature he ever put on public work, and somebody has been standing here for three days with a chisel in his hand.\"", reveals: "c6" },
      c6: { line: "\"Signature casts.\" Halliday says it slowly, like a man arriving somewhere. \"He has been casting arms. Twelve of them, two years of them, with no names, and Mr Hale is a man who did not do anything in secret, he did it publicly and slowly and let you come and look.\" He folds the photographs. \"There is one man in this city who was carving a public monument and signing it, and he was not carving it with a chisel.\"" }
    }
  },
  truth: {
    culprit: "s3", motive: "The heart pills were not the right ones and somebody had told him to change to them", method: "Strangled from behind while he was working and then set upright",
    key: ["c5", "c10", "c12"],
    narrative: "Corvin Hale had begun casting hands, because his hands were going, and because he had carved a hand into the memorial that he could not finish and never could. Dr. Sarn, frightened by a telephone call from the studio at half past six and by nothing else, went in at seven with a half grain of digitalis in a bottle opened with a fingernail, and did what he had been asked to do at a quarter past seven rather than at seven.",
    reveal: "The chiselled hand in his own hand at an angle no working man holds is a cast of somebody else's hand — Nell Ashby's, made without her knowing, dressed into his own dead one. He was not murdered. He was being made into the seventeen blank face on Cobb Square, and somebody is still standing at that plinth with a chisel."
  },
  hint: "The coroner has given you the answer and told you to disbelieve it. Read the wrist rather than the wound — and then read the prescription, twice, because a physician writes small for one reason only.",
  merit: 800
});

/* ── FILE 11 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 11, tier: "medium", title: "Ferryman's Holiday",
  date: "19 October 1947", weather: "Bright, cold, a flat sea", place: "Ossery Reach and the Ardwell rowboat club",
  client: "Mrs. Elspeth Rennick", fee: "£60, and the club would prefer nothing at all",
  brief: [
    "My husband has been a ferryman on that reach for thirty-one years and he has never once taken a holiday in his life, and in August he took four days, and he went with the Ardwell rowboat club to a hotel on the coast where he was known and liked and where he had no business being, and on the third day he went out for a walk and never came back and they found his coat on the sea wall at low water.",
    "They found the body on the fourth day, eight miles down, which the doctor says is right for the tide and wrong for the man, because my husband could not swim but he could row, and there was a boat hired at that hotel on the third day, and the boat came back, and the boat was empty, and there were five hundred people in that hotel and not one of them saw him."
  ],
  setup: "A man who could not swim and could row, a boat that came back empty, and a club that has all met each other for twenty years.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Silas Tranter", role: "Rowing club captain",    face: "S", note: "Twenty years in the boat. Would have been in the boat." },
    { id: "s2", name: "Agnes Pride",  role: "Hotel proprietress",    face: "A", note: "Knew him for a decade. Closed the hire book late on the third." },
    { id: "s3", name: "Bertie Lomax",  role: "Club member",          face: "B", note: "Drinks, and owed him money, and is the only man who says he saw him." },
    { id: "s4", name: "Ivor Rennick", role: "The widow's brother",  face: "I", note: "Lives two miles upriver. Was in the club's boat on the fourth day." }
  ],
  motives: [
    "He was going to report the club's books and had already written to the county",
    "He was owed his ferryman's pension and the ferry was to be sold",
    "A holiday he took was a habit breaking, and somebody could not bear it",
    "No motive at all, and a widow who has not asked any of you to find one"
  ],
  methods: [
    "Drowned off the sea wall, and the rower who did it rowed back",
    "Drowned further out, where the clubboat found the body",
    "Pushed off the wall by somebody who then rowed back in the hire",
    "He was never on the wall. The coat was placed there by somebody who needed the eight miles to be right"
  ],
  locations: [
    { id: "l1", name: "The sea wall", icon: "🧱", present: [],
      desc: "Half a mile of granite and iron steps down to the water, and at low tide the steps go under for a hundred feet. The coat is on the wall, folded. The rail is wet on the inside as well as the outside, and there is a boot-print in the sand on the low side of the wall and not one on the high side.",
      exams: [
        { id: "x1", name: "The coat", icon: "🧥", note: "Folded, not dropped.", clue: "c1" },
        { id: "x2", name: "The rail", icon: "🪜", note: "Wet inside and out. Look up, not down.", clue: "c2" },
        { id: "x3", name: "The boot-print", icon: "👣", note: "Which side. Which boot.", clue: "c3" },
        { id: "x4", name: "The tide board", icon: "🌊", note: "The hotel posts it. What does it say?", clue: "c4" }
      ] },
    { id: "l2", name: "The hotel", icon: "🏨", present: ["s2", "s3"],
      desc: "A big white hotel with a harbour view and a slate roof, and a hire book in the office, and a landing slip on a nail. The bar was full until one and nobody heard anything, which the police have treated as suspicious and the bar has treated as a compliment.",
      exams: [
        { id: "x5", name: "The hire book", icon: "📕", note: "Third of August. One boat.", clue: "c5" },
        { id: "x6", name: "The landing slip", icon: "🧾", note: "Signed in and signed out. Compare the times.", clue: "c6" },
        { id: "x7", name: "Pride's account", icon: "🗣", note: "She will tell you about the day. All of it.", clue: "c7" },
        { id: "x8", name: "Lomax's account", icon: "🗣", note: "The only man who says he saw him.", clue: "c8" }
      ] },
    { id: "l3", name: "The reach", icon: "⛵", present: ["s1", "s4"],
      desc: "Two miles of water, a hard pull, and a flat bottom for most of it. The clubhouse is a shed with a board of member names on it, and the board has a new nail, and one name is not on the board that is on the members' book.",
      exams: [
        { id: "x9", name: "The members' board", icon: "🪧", note: "One name missing from the wall.", clue: "c9" },
        { id: "x10", name: "The club boat's log", icon: "📒", note: "Out on the fourth. Crew of two.", clue: "c10" },
        { id: "x11", name: "Tranter's account", icon: "🗣", note: "He will be exact about the boat, and vague about the man.", clue: "c11" },
        { id: "x12", name: "The club's books", icon: "📊", note: "The secretary keeps them. She is not in the club.", clue: "c12" }
      ] },
    { id: "l4", name: "The ferry", icon: "🛶", present: [],
      desc: "A chain ferry and a man who has worked it for thirty-one years, and a hut with a stove and a wall of tide tables and a pension application in a tin. The widow's brother did not come here for three weeks. He has been here four times since Tuesday.",
      exams: [
        { id: "x13", name: "The pension application", icon: "📄", note: "Signed by the widow, three weeks old.", clue: "c13" },
        { id: "x14", name: "The hut door", icon: "🚪", note: "Nobody locks this door. It has been opened with a key.", clue: "c14" },
        { id: "x15", name: "The tide tables", icon: "📈", note: "Pinned up for thirty-one years, in his handwriting.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "A folded coat", type: "physical", from: "l1", text: "The coat is on the wall, folded in three, the way a man folds a coat before he puts it on a chair. A man who falls off a wall does not fold a coat on the top of it. The fold is down, on the inside, and it is wet, so the coat was folded while it was wet, on the wall, by somebody standing where the water is." },
    { id: "c2", name: "A wet inside rail", type: "physical", from: "l1", text: "The rail is wet on the seaward face, as expected. It is also wet along a length of four feet on the landward face at the height of a man's chest, and that is a man leaning over from the landward side with his chest against the iron. He did not get on the wall. He was put over it, or he was on the steps below and was taken over." },
    { id: "c3", name: "One boot, low side", type: "physical", from: "l1", text: "The print is on the seaward side of the wall, in the sand, toe pointing at the water, size ten, and it is a left boot. He went over on his own and then went back and took the wall — and a right-footed man who goes over, gets wet, and climbs back up leaves two prints, and there is one, and the tide has been over it since Thursday." },
    { id: "c4", name: "The tide board", type: "document", from: "l1", text: "The hotel's own board, chalked daily, in two hands for fifty years: high and low water for every day of August. The third: low water at 6.41 a.m. The hotel's own hire slip says the boat came back at 5.20. A man who went out for a walk at five and drowned on a wall whose steps are under water at 6.41 was drowned at 6.41, not at five." },
    { id: "c5", name: "One boat hired", type: "document", from: "l2", text: "The hire book: one dinghy, the Northerly, three shillings, taken out at four o'clock on the third of August by R. RENNICK, in the hand of the man who signed the book. Rennick was fifty-eight, a ferryman, and had been in a rowing club since 1931. He knew how to handle a dinghy. He had simply never, in thirty-one years, taken four days off." },
    { id: "c6", name: "In at 5.20, out at 5.20", type: "document", from: "l2", text: "The landing slip is signed out at four and signed in at twenty past five, and both signatures are R. Rennick, and the two signatures are in exactly the same hand. The same man's handwriting at four in the afternoon and at twenty past five in the evening, at a hiring desk, in a hotel on a cliff, is a signature written twice by one man, or written once and copied by one man." },
    { id: "c7", name: "Pride's account", type: "testimony", from: "l2", text: "\"I have known Elspeth's husband for ten years and I will say this and no more. He was a quiet man and he was a happy man and he came to my bar on the third of August at three o'clock and asked for a room with a view of the water and I gave him the one at the end, and I did not see him again until the morning they told me.\" A pause. \"And I signed that hire book at twenty past five, and I did not see him come in, and I signed it because a boy brought it in and said Mr. Rennick had left the dinghy and the money was right.\"" },
    { id: "c8", name: "Lomax's account", type: "testimony", from: "l2", text: "\"I saw him. I saw him on the steps at about half past five, coming up out of the water, and I said Rennick! and he said nothing and went up to his room, and I thought that was the drink. That is what I told the police and it is true and it is not what happened, and I have had three days to work out what I actually saw, which is that I saw a man come up the steps and I had been drinking since lunch.\"" },
    { id: "c9", name: "A name off the wall", type: "document", from: "l3", text: "Twenty-two names on the members' board, forty years of them, brass on a blackboard, put up by a secretary nobody has ever met. The secretary's own book has twenty-three. The twenty-third is Rennick's brother, Ivor, and the twenty-third was added to the book this year, and the nail is new, and the twenty-third has no name on the wall because a name on that wall is a thing a man's widow can see." },
    { id: "c10", name: "The club boat's log", type: "document", from: "l3", text: "The club boat went out on the fourth and found the body at eight miles and brought it in at four. The log records the crew as R. RENNICK and S. TRANTER. It also records, in a different pen, at the bottom of that page, a struck-out line: 'searched S. wall 2 hrs 1400–1600. J. PELL.' The secretary's hand and the captain's hand are not the same hand and this line has been struck out on the day." },
    { id: "c11", name: "Tranter's account", type: "testimony", from: "l3", text: "\"Boat out at eight, body at half past eight, in at four. I have rowed that reach since 1927 and I will give you every number.\" He gives every number, and every number is correct. \"What I will not give you is a word about the man, because I was not in the room when he died, and I have spent three days being asked by everybody in this club where I was, and I was at my own mother's, and my mother is eighty-eight, and I have the parish nurse to say so.\"" },
    { id: "c12", name: "The club's books", type: "document", from: "l3", text: "The Ardwell Rowboat Club has been solvent for forty years on subscriptions of four pounds a head and a boat that was bought in 1938. The subscriptions are in the book. Fourteen of the twenty-two members have not paid in three years, and four of those fourteen are recorded as having paid, in a different ink, in the secretary's hand." },
    { id: "c13", name: "The pension application", type: "document", from: "l4", text: "Signed by Mrs. Rennick three weeks ago: a ferryman's pension, on the grounds that the reach is to be mechanised and the crossing is to be sold. Beneath the signature, in the same hand and a steadier one, is a paragraph of extra detail about the club's accounts, the unpaid subscriptions, and the fourteen members, and it is written in a style that Mrs. Rennick did not use when she wrote the first three lines." },
    { id: "c14", name: "A key that was not needed", type: "physical", from: "l4", text: "The hut door does not lock, and everybody in the district knows it, because the tide tables are public and the wall of them is the most useful thing on that reach. There is a key in the lock and there is a bright scratch on the escutcheon, and somebody has been opening that hut with a key four times since Tuesday, which is only worth doing for one thing inside it." }
  ],
  confront: {
    s1: {
      c10: { line: "Tranter takes the log and finds the struck line and goes white to the lips. \"That is not me. I have never written Pell on that log in my life.\" He puts it down with both hands. \"I will be perfectly honest with you. That line was there when the boat came in and I did not see it, and I signed the log, and the log is a legal document, and I have just told a policeman that I signed a page I did not read.\"", reveals: "c9" },
      c9: { line: "\"Ivor has been a member since April. Ivor Rennick has been dead since March.\" He says it and then stops, and then sits down on the shed step, which is the first genuinely shocked thing anybody has done in this case. \"March. We buried him in March and somebody put his name in the book in April and I have voted on it.\"" },
      c12: { line: "\"Fourteen of them have not paid in three years and I have not chased one of them, and I did not think about that until this moment.\" He looks at the board on the wall. \"I have been captain for twenty years and I do not know what my own club costs to run, and somebody has known, and has written it down where a widow would find it.\"" }
    },
    s2: {
      c6: { line: "Pride goes very quiet. \"The same hand at four and at twenty past five.\" She looks at the slip for a long moment. \"I did not see him come in. I have said so three times and I have been quite rude about it three times. And I will say it again: I did not see him come in, and I signed for a man who was not in front of me, at twenty past five, on the third of August, and I have been the licensee of this hotel for nineteen years.\"", reveals: "c7" },
      c7: { line: "\"A boy brought the slip in. From the slip, not from the room. If he had come to the desk I would have spoken to him, and I have not spoken to him, and I have thought about that for three days and I cannot make it come out right.\"" }
    },
    s3: {
      c8: { line: "Lomax is not sorry. He is past sorry. \"I have been a member of that club for nineteen years and I owe your husband four pounds and I have owed him four pounds for eleven of them. He never once said a word about it. I saw a man come up those steps and I called him a name because I am a drunk and it was easier than looking.\"", reveals: "c3" },
      c3: { line: "\"One boot, low side, toe to the water.\" He stops for a long moment. \"I was on those steps at half past five and I was looking at the water and a man came up past me and I said Rennick and he went up, and there is one boot-print in that sand and it is a left boot, and Elspeth's husband was a left-handed man who rowed with his right hand on the oar. That is why I have not been able to say it out loud since Tuesday.\"" }
    },
    s4: {
      c13: { line: "Ivo Rennick does not deny the paragraph and does not claim it either, which is the worst possible thing a man can do. \"I wrote the facts. My sister does not write like a lawyer and she would never get a pension past the board without somebody doing the summing for her, and the facts were true.\" He is not looking at you. \"They were all true. That is the part I would like you to sit with.\"", reveals: "c9" },
      c9: { line: "His hands go to the table. \"I was not a member. I have never rowed. My brother was a member for thirty-one years and I was the one who taught him, and when we buried him in March there was a gap in the boat, and somebody said the gap should be filled, and I said fill it, and I have not been in a boat since.\"" },
      c14: { line: "\"I went in there four times.\" He says it evenly. \"For the pension papers, which are in the tin, which she cannot get out on her own because the tin is behind the stove and the stove is a bad enough liar that nobody moves it. I have been going in there for the same three pieces of paper four times, and the third time I found the key in the lock and I used it, and I have never told anybody there was a key in that lock.\"" }
    }
  },
  truth: {
    culprit: "s4", motive: "A holiday he took was a habit breaking, and somebody could not bear it", method: "Pushed off the wall by somebody who then rowed back in the hire",
    key: ["c1", "c3", "c6"],
    narrative: "Ivo Rennick was a man who had never rowed in his life and had had his name written into a club he did not belong to in April by somebody who wanted the gap in the boat filled, and who was now being asked by a tribunal to read a paragraph he had written about his own brother in his sister's handwriting. He hired the boat, signed the book twice, took the man out on the wall at low water, and pushed him over.",
    reveal: "He did not drown him. That was the sea. He rowed back, folded his brother's coat on the top of the wall in the wet, and put a name in the members' book and a struck line in the club log and a paragraph in a pension application, and he has spent three days building a case, and every single document in it is true."
  },
  hint: "There are two handwritings in this case and everybody is reading the wrong one. The man's own hand is on the hire book at four and again at five. Find out whose hand it is, and find out which way a left-handed man holds an oar.",
  merit: 800
});

/* ── FILE 12 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 12, tier: "medium", title: "The Winter Broadcast",
  date: "14 November 1947", weather: "Fog, freezing, the transmitter iced", place: "CWR — the city's wireless station",
  client: "The station (reluctantly)", fee: "Nothing. Nobody else is going to be seen to pay you.",
  brief: [
    "Mr. Roderick Vance died on Tuesday evening at twenty past ten, live, on the air, in the middle of the nine o'clock bulletin, and eleven thousand people heard him die, and this station is going to be closed by Christmas if it is not understood that this was an accident of the heart.",
    "I am not asking you to find a murderer. I am asking you to find out how it happened, quickly, so that I can say something true on the air before Christmas and get a station back. He died on a live microphone in a locked room with a glass between him and a studio of nine people."
  ],
  setup: "A glass booth, a locked door, nine people, and eleven thousand listeners who heard a man die in real time.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Aurelia Saye",  role: "The announcer's wife; a voice on the wireless", face: "A", note: "Read the nine o'clock bulletin from the next studio, eight feet away." },
    { id: "s2", name: "Peter Vance",   role: "The dead man's son; engineer", face: "P", note: "Transmitter, aerial, and the only man who could switch a microphone off." },
    { id: "s3", name: "Merrivale Sykes", role: "Station manager",       face: "M", note: "Losing the licence. Blamed the death on the cold on Tuesday to the press." },
    { id: "s4", name: "Otto Grimsson", role: "Night switchboard",    face: "O", note: "Connected the studio lines. Heard the call come in from the studio." }
  ],
  motives: [
    "He was going to name a sponsor on the air on Wednesday and name him properly",
    "The station is being sold and he was going to be a witness against it",
    "The transmitter killed him and somebody decided to make that look like a story",
    "No motive. It was a heart, in a cold building, and eleven thousand people heard it"
  ],
  methods: [
    "A heart, in a glass booth, on a live microphone, in a room locked from inside",
    "A poisoned cup, taken at twenty past ten in a studio nobody drinks in",
    "An electric shock at the mixing desk and the booth door was not locked",
    "A fall against the glass, and the glass held, and there is no mark on it"
  ],
  locations: [
    { id: "l1", name: "Studio Two", icon: "🎙", present: ["s1"],
      desc: "A table, a chair, a lamp with a green shade, a red lamp, and a script. The door is locked from the inside and the key is on a hook on the inside, and there is a second key in the manager's office because there always is. On the table: a script, a pencil, an ashtray with one cigarette in it, and a cup with tea in it, cold, and the tea is the colour of paper.",
      exams: [
        { id: "x1", name: "The locked door", icon: "🔒", note: "Locked inside, key inside. Or it looks that way.", clue: "c1" },
        { id: "x2", name: "The cup", icon: "☕", note: "Do not drink it. Ask about it.", clue: "c2" },
        { id: "x3", name: "The script", icon: "📄", note: "The nine o'clock bulletin. Read the third page.", clue: "c3" },
        { id: "x4", name: "The red lamp", icon: "🔴", note: "On air. It should have been on the whole time.", clue: "c4" },
        { id: "x5", name: "The glass", icon: "🪟", note: "Inside. Then outside. Then inside again.", dead: true }
      ] },
    { id: "l2", name: "The control room", icon: "🎛", present: ["s3", "s4"],
      desc: "A wall of dials and a man in front of them, and a mixing desk with eight channels and a switching panel and a small brass lever. The programme ends and the master clock runs and everything is written in a book in a hand that is not the operator's.",
      exams: [
        { id: "x6", name: "The mixing desk", icon: "🎚", note: "Channel four was open for eleven seconds.", clue: "c5" },
        { id: "x7", name: "The switching panel", icon: "🔀", note: "Two studios, one engineer, one switchboard.", clue: "c6" },
        { id: "x8", name: "The programme book", icon: "📕", note: "Written up afterwards. Read who wrote it up.", clue: "c7" },
        { id: "x9", name: "Sykes's account", icon: "🗣", note: "He has given the statement that is going in the papers.", clue: "c8" }
      ] },
    { id: "l3", name: "The transmitter house", icon: "📡", present: ["s2"],
      desc: "Half a mile out on the hill, and the largest door in the county in it. Ice on the insulators, a frost, and a log book with a temperature column that somebody has drawn a thick line under for four days.",
      exams: [
        { id: "x10", name: "The log", icon: "🌡", note: "The line under the temperature column.", clue: "c9" },
        { id: "x11", name: "The microphone line", icon: "🎚", note: "Follow it from the desk to the booth.", clue: "c10" },
        { id: "x12", name: "Vance's account", icon: "🗣", note: "He was in this room at ten past ten. He can prove it.", clue: "c11" }
      ] },
    { id: "l4", name: "Aurelia Saye's studio", icon: "🎙", present: ["s1"],
      desc: "Eight feet from Studio Two on the same corridor, and the same table, the same lamp, the same cup. She is reading the bulletin from a memory of a bulletin, and she has been doing it for three days, and the studio is exactly as he left it, and she has not touched anything.",
      exams: [
        { id: "x13", name: "Her cup", icon: "☕", note: "The same tea. The same jug.", clue: "c12" },
        { id: "x14", name: "Her account", icon: "🗣", note: "She will tell you about the four seconds.", clue: "c13" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A door locked from inside", type: "observation", from: "l1", text: "The bolt is a spring bolt on a wooden door, and the key is on the inside hook, and the door is closed. A spring bolt on a wooden door in a house that has been locked up over winter is a door that has been pushed, and a door that has been pushed can be pulled back into the frame by a hand on the other side, and the key on the inside hook is not a witness to anything at all." },
    { id: "c2", name: "A cup of paper-coloured tea", type: "physical", from: "l1", text: "Cold, brown, and absolutely opaque, in a white cup, and the strength is not what a man makes in a jug at four o'clock and pours at ten. The station's tea is made once and there is a jug on the trolley with his name on it, and his cup is four times as strong as anything in the jug. Somebody made that cup at some point on Tuesday and it went cold while he was reading." },
    { id: "c3", name: "The third page of the script", type: "document", from: "l1", text: "Pages one and two are the bulletin. Page three is a sponsor's announcement, timed to the minute, and it names a firm that no other station in this country names on a Tuesday, and beside it, in the announcer's pencil, the single word CONFIRM. Somebody intended to say a name out loud on the air on the following evening." },
    { id: "c4", name: "The red lamp", type: "observation", from: "l1", text: "The on-air lamp is a mechanical indicator on the studio wall that lights when the booth microphone is live. It is lit, which is correct, and it is lit on a spring, and the spring is wound when the booth is opened and released when the door is shut. It was lit at 6.41 and it is still lit at 6.44, three days later, because nobody has opened that door to let it down, because the police sealed the studio on Tuesday and sealed it in the position he died in." },
    { id: "c5", name: "Eleven seconds of channel four", type: "physical", from: "l2", text: "The desk meter for channel four, the announcer's booth, has a mechanical counter, and it reads eleven seconds longer than the booth was on air, because the booth feeds a monitor bus for the engineer and the monitor bus is not switched off until the channel is closed. Eleven seconds is not a pause. It is a hand on a door, or a man not yet dead, or a somebody standing in a corridor deciding something." },
    { id: "c6", name: "Who could reach what", type: "observation", from: "l2", text: "Two studios, one corridor, one control room, one transmitter house half a mile off, and a switchboard that connects all four. To be in Studio Two at ten past ten on Tuesday evening a person had to be in the corridor, in the control room, in the transmitter house, or on the switchboard panel, and three of those four are a telephone exchange and the fourth is a hill." },
    { id: "c7", name: "The programme book", type: "document", from: "l2", text: "The log of what went out and in what order, which every station writes up at the end of the shift. Tuesday's page is in the operator's hand to 10.19, and in a different, much more upright hand from 10.20 to the end, and it is not the operator's hand, and the operator is the man who wrote 10.19." },
    { id: "c8", name: "Sykes's statement", type: "testimony", from: "l2", text: "\"A heart, in a cold building, on a live microphone, at a quarter past ten on a Tuesday. There is no mystery and I would be obliged if the gentlemen from the wireless would stop dressing it up as one.\" He has been up all night and he wants this closed and he does not care by whom. He is also, in his own estimation, extremely well placed to know, which is exactly what a manager says when he has arranged the answer." },
    { id: "c9", name: "A line under the temperature", type: "document", from: "l3", text: "The transmitter log for November has a temperature column, and for the last nine days a thick black line is ruled underneath every entry, which is not a station's habit. On Monday the transmitter was quiet, and at 10.20 on Tuesday, with the man in the booth and eleven thousand people listening, the whole of the hill was opened up and left open for four hours." },
    { id: "c10", name: "The line from the desk to the booth", type: "physical", from: "l3", text: "The booth line leaves the control room, goes up a riser, and comes into Studio Two through a junction box on the corridor wall outside the door. The junction box is a four-inch tin box with a lid, and it has a spare conduit entry, and the entry is used, and the tape round the lid has been cut." },
    { id: "c11", name: "Vance's account", type: "testimony", from: "l3", text: "\"I was on the hill from eight until one and the log is signed every half hour in my hand and there is a man from the electricity company in there with me from nine because of the ice, and I could not have killed my father and I am not going to insult either of you by pretending to be sorry about it.\" He says it without any apology, and then, after a while, in a different voice: \"I have been on this hill for three nights because I cannot think where else to be.\"" },
    { id: "c12", name: "The same jug", type: "physical", from: "l4", text: "One jug, one trolley, two studios, made at four o'clock. His cup is four times the strength of the jug, which is not a mistake anybody makes in error — a cup four times the strength of the jug is a cup made of the grounds themselves, which is what a man does when he wants to stay awake, or what somebody does when he wants a man to stop being any good at reading." },
    { id: "c13", name: "Four seconds", type: "testimony", from: "l4", text: "\"I read the bulletin from my own studio, eight feet away, and I heard him get to the third page and I heard him stop.\" She is very steady. \"He stopped for four seconds. And in those four seconds the studio was not silent, because a microphone is live whether a man is speaking or not, and I could hear the room. Somebody walked across that corridor with hard shoes.\"" }
  ],
  confront: {
    s1: {
      c5: { line: "\"Eleven seconds.\" Saye closes her eyes. \"I have counted them out of a night's sleep, which is a thing I would not recommend. In four seconds of him stopped, somebody crossed my corridor. In seven more, somebody was at my door and my door does not lock, and I have not asked why that door does not lock since Tuesday.\"", reveals: "c1" },
      c1: { line: "\"It is a spring bolt. It is a wooden door. Any door in a wireless station closes itself if you pull it.\" She looks at the hook with the key on it. \"The key on that hook is for the engineer in the morning, and Roderick put it on the hook every night of his life, and it means nothing at all, and I would thank you to tell the coroner that the lock in that studio proves nothing whatsoever.\"" },
      c3: { line: "She reads the third page and her face closes completely. \"The sponsor. Yes. He rang me on Saturday about the sponsorship and I told him it was a commercial matter and not a wireless one and he said it was going to be a wireless matter on Wednesday.\" She folds the page. \"He was going to say a name out loud on the air and he was going to be right and eleven thousand people were going to hear it, and that is a thing you cannot un-say.\"" }
    },
    s2: {
      c9: { line: "Vance looks at the ruled line in his own log and goes very quiet. \"That is not me.\" He puts the log down. \"I ruled a line under it, yes — on the second, when the ice started, so that anybody reading it after the weekend would know it was the weather and not carelessness. It is in my hand and I will not deny it. But the entry for Tuesday at 10.20 is a full page, in a hand I have never seen, about a high-power test that did not happen.\"", reveals: "c10" },
      c10: { line: "\"A spare conduit into the corridor junction box.\" He is on his feet. \"The corridor box carries four lines and it has five entries and the fifth goes down the outside wall to the substation hut at the foot of the hill, and there has never been anything in the substation hut, and it is forty yards from the west door of this building, and it is locked, and the key to it is on my father's key ring, along with the studio key he put on that hook every night.\"" }
    },
    s3: {
      c7: { line: "Sykes looks at the two hands and does not blink. \"I wrote up Tuesday. The engineer was on the hill and the operator had gone and the programme was over and somebody had to write it up before midnight or the station loses its licence, and I wrote it up.\" He turns the page round. \"You may check every entry in it against the engineer's log. They agree.\" They do agree. That is the difficulty with Sykes.", reveals: "c8" },
      c8: { line: "\"A heart. That is what I have said from the beginning and I will say it in front of a magistrate.\" He is a good administrator; you can see it even now. \"I have a station with no money, a licence in December, a transmitter that ices, and a dead man who was going to say something on the air on Wednesday. Tell me which of those four facts you would like me to be sorry about.\"" }
    },
    s4: {
      c6: { line: "Grimsson is a man who has spent a life being the last voice a caller hears. \"The panel. Yes. I connect the studios. Anybody in this building can get a line to anybody, including the hill, and I will tell you the only line I connected on Tuesday evening after the bulletin and it was a call from the substation hut to the control room, and it lasted forty seconds, and there is nothing about it in the book because the book is not my book.\"", reveals: "c7" },
      c7: { line: "He looks at the two hands and does not go white, and does not go pale either. \"I did not write it.\" He says it slowly. \"I want to be exact. I did not write it. I heard the line open in my own headphones at 10.20 and I heard a man's voice in the substation hut and I said station two, and that is the last thing I did, and at half past ten I was on a tram.\"", reveals: "c10" }
    }
  },
  truth: {
    culprit: "s3", motive: "The station is being sold and he was going to be a witness against it", method: "An electric shock at the mixing desk and the booth door was not locked",
    key: ["c10", "c11", "c5"],
    narrative: "Merrivale Sykes had three days and a man in a booth. He made a cup of tea from the grounds, a hundred times the strength of the jug, and he put a spare cable into the corridor junction box, and he went up to the substation hut at the foot of the hill with a key off the engineer's ring, and he wrote a page in the log, and the eleven seconds on the monitor bus were him standing in a corridor listening to a man find out that he was not going to say anything on Wednesday.",
    reveal: "Roderick Vance knew what was coming and told his wife on Saturday, and put a sponsor's page in the script, and went up to the hill to find a spare key on a ring that had been in his own coat pocket all week, and Peter Vance has been sitting on the ice for three nights because his father was the man with the key and he cannot work out whether that is the saddest thing in this case or the most useful."
  },
  hint: "The room proves nothing — a spring bolt and a key on a hook are not a witness. The wire does prove something. Follow the booth line out of the control room and find out how many doors it comes out of.",
  merit: 850
});
