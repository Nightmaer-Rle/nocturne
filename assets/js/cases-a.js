/* ═══════════════════════════════════════════════════════════
   NOCTURNE — cases-a.js   ·   Files 01–07
   Tier I (Petty) 01–05 · Tier II (Complicated) 06–07
   ═══════════════════════════════════════════════════════════ */

/* ── FILE 01 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 1, tier: "easy", title: "The Bellwether Docks",
  date: "14 March 1947", weather: "Sea fog, thick as wool", place: "Bellwether Pier, East Docks",
  client: "Mrs. Ivy Bellwether", fee: "£35 and my gratitude",
  brief: [
    "My husband Josiah went out at ten o'clock to check his skiff and never came home. They found him in the harbour at six this morning, face down, three days after the tide turned. The harbourmaster says drowning, and I am told drowning is what drowning is.",
    "But Josiah could swim. He taught our daughter in the shallows every summer of her life. So either the harbour killed him by accident, or somebody stood on the end of Bellwether Pier and helped it along."
  ],
  setup: "Fog on the water, a widow at your elbow, and three people who were all on the pier that night.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Tobias Fenn",  role: "Dockhand",          face: "T", note: "Josiah's former partner. Quarreled with him in the spring." },
    { id: "s2", name: "Amos Crake",    role: "Seamen's chaplain", face: "A", note: "Signed the seaworthiness papers. Prayed over the crews." },
    { id: "s3", name: "Abigail Bellwether", role: "The dead man's daughter", face: "A", note: "Twenty-one. Inherited the pier lease. Wanted to sell it." }
  ],
  motives: [
    "Unpaid wages — three months, and an argument that was never settled",
    "Josiah had found him skimming the cargo manifests",
    "A debt owed to a bookmaker on Gantry Street",
    "He wanted the pier lease for himself and did not ask politely"
  ],
  methods: [
    "Drowned — pushed from the pier into the harbour",
    "Struck on the pier stone and left for the tide",
    "Cut loose in his skiff and left to drift",
    "Blown from the gasworks walkway across the water"
  ],
  locations: [
    { id: "l1", name: "The pier head", icon: "⚓", present: ["s1", "s2"],
      desc: "Forty feet of black oak running out into nothing. Fog so thick the far end has no edge. The harbour lamp still burns, though nothing is moored to it, and the boards underfoot are wet long past the waterline.",
      exams: [
        { id: "x1", name: "The mooring buoy", icon: "🎈", note: "A rope, cut clean.", clue: "c1" },
        { id: "x2", name: "The harbour lamp", icon: "💡", note: "Still burning at six in the morning.", clue: "c2" },
        { id: "x3", name: "The pier boards", icon: "🪵", note: "Look for a drop, a mark, a footprint.", clue: "c3" },
        { id: "x4", name: "A gull's nest", icon: "🪺", note: "High up the piling. Out of reach.", dead: true }
      ] },
    { id: "l2", name: "The Weigh House", icon: "⚖", present: ["s1"],
      desc: "A brick hut at the landward end of the pier where every crate is weighed and recorded. A cast-iron stove, a desk, and a night watchman's logbook chained to the wall. It smells of paraffin and old tea.",
      exams: [
        { id: "x5", name: "The night log", icon: "📕", note: "Names, times, signatures.", clue: "c4" },
        { id: "x6", name: "The stove", icon: "🔥", note: "Still warm. Someone has been in here.", clue: "c5" },
        { id: "x7", name: "The cargo manifest", icon: "📋", note: "Page eighty-eight is gone.", clue: "c6" },
        { id: "x8", name: "The brass oil can", icon: "🛢", note: "Left on the shelf, not put away.", clue: "c7" },
        { id: "x9", name: "A broken scale weight", icon: "⚖", note: "Nothing but paperclips inside.", dead: true }
      ] },
    { id: "l3", name: "The Bellwether cottage", icon: "🏠", present: ["s3"],
      desc: "Two rooms and a loft over the harbour master's office. The fire is out. On the table, a cold cup of tea and a novel face down at page two hundred and six — read carefully, with a finger marking the line, and then left exactly as it was.",
      exams: [
        { id: "x10", name: "Abigail's window", icon: "🪟", note: "Faces the pier. Lamp was lit.", clue: "c8" },
        { id: "x11", name: "The sideboard", icon: "🗄", note: "Family papers, a lease, a tin.", clue: "c9" },
        { id: "x12", name: "Her mother's jewellery", icon: "💍", note: "Sold, the receipt says, in October.", dead: true }
      ] },
    { id: "l4", name: "The seamen's chapel", icon: "⛪", present: ["s2"],
      desc: "Grey stone, a stove, and a smell of boiled cabbage. Reverend Crake is here on his knees with his back to you, and he does not turn round until you have said his name twice.",
      exams: [
        { id: "x13", name: "Crake's account of the night", icon: "🗣", note: "He will tell you if you ask plainly.", clue: "c10" },
        { id: "x14", name: "The charity ledger", icon: "📒", note: "Seamen's funds. Small sums, many names.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "A rope cut clean", type: "physical", from: "l1", text: "The buoy rope was severed with a blade, not frayed by weather. A clean diagonal, the cut of somebody in a hurry who wanted it to look like rot." },
    { id: "c2", name: "The harbour lamp, still lit", type: "observation", from: "l1", text: "A paraffin lamp burns about four hours. If it is alight at dawn, it was lit before midnight — by somebody working on the pier in the dark, in fog." },
    { id: "c3", name: "Wet boards, thirty feet in", type: "physical", from: "l1", text: "The boards are soaked well past the waterline and there is a heel-mark in the tar: size eleven, herringbone tread, salt-hardened. The fog kept the rain off. That print is from the night of the drowning." },
    { id: "c4", name: "The night log", type: "document", from: "l2", text: "Fenn signed himself in at ten and there is no signature out. The rule is a man signs himself out. There is also a second entry in a different hand: 'Lamp trimmed, 11.40, T. Fenn.'" },
    { id: "c5", name: "Ash in the stove", type: "physical", from: "l2", text: "The firebox is warm and full of grey ash. Raked through it: a curl of scorched paper with a ruled column of figures still legible, and the printed word MANIFEST. The rest is ash." },
    { id: "c6", name: "The missing page", type: "observation", from: "l2", text: "The manifest runs 71 to 93. Eighty-eight is absent, but the stub is still in the binding — torn out in a hurry, by somebody who did not care about tidiness. Only somebody who works here would know it mattered." },
    { id: "c7", name: "The brass oil can", type: "physical", from: "l2", text: "A brass can with Fenn's initials scratched into the base, half full, and a smear of fresh oil on the shelf. It is the harbour lamp's can. It should be on the pier, not in here." },
    { id: "c8", name: "Abigail's lamp", type: "observation", from: "l3", text: "She kept a light burning from ten until two. But the novel is still at two hundred and six with a finger holding the line, and the chair is turned to face the door. She was reading, and waiting to be disturbed, and she never once looked out." },
    { id: "c9", name: "The lease", type: "document", from: "l3", text: "The pier lease runs to Josiah. On the strength of it the family already owes Gantry Street four hundred pounds — and Abigail has quietly sold her mother's jewellery to keep the interest paid for a year she was never going to keep." },
    { id: "c10", name: "Crake's account", type: "testimony", from: "l4", text: "\"I stood on the pier head at half past eleven and saw a man working the lamp, and I called to him and he did not answer, and I went in. I am not a policeman to chase a man from his lamp.\" He is not lying. He simply has not thought about it in three days." }
  ],
  confront: {
    s1: {
      c1: { line: "\"A rope? Every rope on that pier is cut sooner or later.\" He is looking at the water, not at you. \"And what would I have cut it for, to drown a man in a skiff with his own father?\"", reveals: "c2" },
      c2: { line: "Fenn's jaw sets. \"That lamp burns four hours and every seaman in East Docks knows it. You want a murder weapon, detective, that is not one. It is a lamp.\"", reveals: "c7" },
      c3: { line: "He looks down at his own boots, then at yours, and says nothing at all for a long moment.", reveals: "c4" },
      c4: { line: "\"I never signed out. Half the men on this dock never sign out. You are asking a man to remember a rule he has broken ten thousand times.\" But his hand has gone to the shelf, and it is not a relaxed hand.", reveals: "c5" },
      c5: { line: "The colour goes out of his face. \"That is chapel paper.\" It is not chapel paper. It is warehouse issue, and he knows the difference, and he knows that you now know that he knows.", reveals: "c6" }
    },
    s2: {
      c1: { line: "\"I have buried four men off that pier. I do not need to be shown a rope.\" He closes his eyes, which is how he thinks, and goes on: \"Ask the man who was standing on my pier with a can of oil in his hand at midnight.\"", reveals: "c4" },
      c4: { line: "\"A man does not write his own name in a book if he means to do harm. It is vanity. Vanity is a kind of confession.\"", reveals: "c7" },
      c10: { line: "\"I have told the harbourmaster what I saw. Nobody has asked.\" He says it without heat, and the offer sits on the table between you like a plate nobody is touching." }
    },
    s3: {
      c3: { line: "\"Size eleven.\" She says it flatly, and looks at the window, and looks at the window a long time. \"Everyone on that pier wore size eleven. It is what the company issued.\"", reveals: "c8" },
      c8: { line: "Her hands go still in her lap. \"I was reading. I have not read that page since I was fourteen. I have not read anything since I was fourteen.\" And then, very quietly: \"I watched the lamp the whole time. Somebody was out there all night and I did not open the door.\"", reveals: "c9" },
      c9: { line: "\"You think I killed my father for a lease I have already lost?\" She almost laughs. \"I wanted him to sell it. That is all I have ever wanted. To go somewhere that does not smell of fish.\"" }
    }
  },
  truth: {
    culprit: "s1", motive: "Josiah had found him skimming the cargo manifests", method: "Drowned — pushed from the pier into the harbour",
    key: ["c1", "c5", "c7"],
    narrative: "Tobias Fenn had been quietly lifting four crates out of every cargo he weighed, and recording them as lost. Page eighty-eight of the manifest was the one Josiah had finally found. Fenn tore it out and burned it — badly, and in the one building on that pier where he had a legal excuse to be at eleven o'clock at night.",
    reveal: "He waited for the fog, trimmed the lamp so the pier would be lit and empty, cut the buoy rope so the harbour would say a skiff drifted, and met Josiah at the pier head. They argued. He does not remember the push. He remembers the sound it made, and he has not slept since."
  },
  hint: "The lamp is the key you have been handed. Ask who had a reason to light a harbour at midnight — and then ask where that person's oil can ought to be.",
  merit: 400
});

/* ── FILE 02 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 2, tier: "easy", title: "The Velvet Alibi",
  date: "2 April 1947", weather: "Cold, dry, starless", place: "The Continental Hotel and the Lyric Theatre",
  client: "Mr. Adrian Voss, theatre manager", fee: "£50, discreetly",
  brief: [
    "Mireille Dorne played Ophelia on Tuesday and was on stage for two hours and ten minutes. At the end of it she went out to the Continental, signed the register, ordered a bottle, and was seen by three separate people until two in the morning. I have all three names.",
    "Felix Dorne was found in his dressing room at a quarter past eleven, under the mirror, in a silk dressing gown. The door was locked from the inside and the only key is on the hook where it always lives. My star has an alibi. My star also has a husband who is dead. I should like to know which of those facts matters more."
  ],
  setup: "A locked room, a beautiful liar, and two hours and ten minutes that everyone insists she spent on stage.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Mireille Dorne", role: "Actress; the widow", face: "M", note: "An alibi built out of three strangers and a bottle of wine." },
    { id: "s2", name: "Constance Rill",  role: "Understudy to Ophelia", face: "C", note: "Has played the part four times and been written out of the playbill every time." },
    { id: "s3", name: "Gideon Slate",  role: "Stage manager", face: "G", note: "Owns the understudy contract. Also owns a considerable debt." },
    { id: "s4", name: "Bram Ketch",   role: "Doorman of the Continental", face: "B", note: "Remembers every guest, every night, for money." }
  ],
  motives: [
    "She wanted him dead and the timing of the curtain suited her",
    "His name was going to be on the contract for the new season and hers was not",
    "She had no money and he had bought her out of the Lyric twice",
    "It was the understudy who wanted the part and the widow who got in the way"
  ],
  methods: [
    "Sealed in the dressing room, and nobody could find the key",
    "Poison in the champagne that was waiting for him after the curtain",
    "Beaten in the alley behind the stage door",
    "A cord through the dressing room vent, pulled from outside"
  ],
  locations: [
    { id: "l1", name: "The dressing room", icon: "🪞", present: ["s3"],
      desc: "A room the size of a wardrobe and every inch of it expensive. Felix is where you left him. The mirror is still fogged at the lower left corner, which is odd, because the room has no bath and the window has been shut since Tuesday.",
      exams: [
        { id: "x1", name: "The locked door", icon: "🚪", note: "Key on the inside hook, bolt engaged from within.", clue: "c1" },
        { id: "x2", name: "The mirror", icon: "🪞", note: "Fogged in one corner only.", clue: "c2" },
        { id: "x3", name: "His dressing gown", icon: "👘", note: "Silk, expensive, and stiff at the cuff.", clue: "c3" },
        { id: "x4", name: "The calling card", icon: "🃏", note: "You came for a motive. Here is one.", clue: "c4" },
        { id: "x5", name: "The calling card", icon: "🃏", note: "It is a card, not a clue. Old habits.", dead: true }
      ] },
    { id: "l2", name: "The Lyric wings", icon: "🎭", present: ["s1", "s2", "s3"],
      desc: "Two feet of space between flats, a forest of hemp lines, and a fly floor where the light is bad. The whole company was in here at the half. You can still smell the rosin.",
      exams: [
        { id: "x6", name: "The call board", icon: "📋", note: "Who was called, who was not.", clue: "c5" },
        { id: "x7", name: "The prop bottle", icon: "🍾", note: "Cheese, cork, and a residue.", clue: "c6" },
        { id: "x8", name: "The Ophelia costume", icon: "👗", note: "Hangs on a rail, tagged with her name.", clue: "c7" },
        { id: "x9", name: "The fly gallery ladder", icon: "🪜", note: "Somebody oiled it recently.", clue: "c8" }
      ] },
    { id: "l3", name: "The Continental bar", icon: "🥃", present: ["s1", "s4"],
      desc: "Low light, brass, and a bar of nine stools. Ketch is behind it and has a book. He is the sort of man who could not tell you his own name without consulting a list.",
      exams: [
        { id: "x10", name: "The register", icon: "📔", note: "Her name, in ink, at nine forty.", clue: "c9" },
        { id: "x11", name: "The porter's message", icon: "📨", note: "Something was sent up. Then sent back down.", clue: "c10" },
        { id: "x12", name: "Ketch's memory", icon: "🗣", note: "He will trade his memory for a kindness.", clue: "c11" }
      ] },
    { id: "l4", name: "The understudy's room", icon: "🛏", present: ["s2"],
      desc: "Two rooms over a locksmith's on Carrow Street. Clean, cold, and almost aggressively bare — no photographs, no flowers, one cup in the sink and a full kettle. Somebody is very careful here.",
      exams: [
        { id: "x13", name: "Her diary", icon: "📓", note: "Four years of it, kept nightly.", clue: "c12" },
        { id: "x14", name: "The letter from the Lyric", icon: "✉", note: "Dated eleven months ago.", clue: "c13" },
        { id: "x15", name: "Her hand at the piano", icon: "🎹", note: "Boils. Burns. Practice scars.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "A door that locked itself", type: "observation", from: "l1", text: "The key is on the inside hook. But the bolt is a spring bolt: it throws when the door is pulled shut hard and it will not throw if a man is leaning against it. A man who dies on his feet does not get to lean." },
    { id: "c2", name: "One corner of fog", type: "physical", from: "l1", text: "Lower left, and only there, and the size of two hands. It is not steam from a bath. It is the breath of somebody standing at the mirror for a long time, close to the glass, from the outside." },
    { id: "c3", name: "Stiff silk", type: "physical", from: "l1", text: "The cuff of the gown is stiff and slightly tacky, and the same is true of the sleeve. Whatever came out of that vein went through the fabric on the way down the arm." },
    { id: "c4", name: "A card on the mirror", type: "document", from: "l1", text: "Pinned inside the frame, torn from a playbill: the new season's contracts, and against the name FELIX DORNE, in the same ink, the word VOID. Four days before he was dead." },
    { id: "c5", name: "The call board", type: "document", from: "l2", text: "Tuesday's board has two names against the second Ophelia. Dorne at seven. Rill at five, for the understudy call, as usual. Rill was in the theatre from five and was not dismissed until the curtain at nine forty." },
    { id: "c6", name: "The prop bottle", type: "physical", from: "l2", text: "The bottle is full of cold cheese, and the cork is a real cork, and there is a brown ring in the neck that smells faintly of almonds. It was not emptied tonight. It was refilled tonight, out of something that has no business in a stage property." },
    { id: "c7", name: "The costume", type: "observation", from: "l2", text: "Tagged MIR EILLE DORNE, which is a printer's error the wardrobe has carried since 1943 and never fixed. Which means a person who cannot be relied on to spell her own name has been making her own costume bags for four years." },
    { id: "c8", name: "Fresh oil on the gallery ladder", type: "physical", from: "l2", text: "The upper three rungs are greased, and the grease is black and modern, and there is a print in it: a narrow shoe, size seven, walking in a hurry along a rail twelve feet above the stage." },
    { id: "c9", name: "Nine forty in ink", type: "document", from: "l3", text: "Mireille Dorne signed the register at nine forty. Ketch's initial, and a flourish. But the pen in that book is a stub-nib pen chained to the desk, and the flourish on the Tuesday line is a flourish you can make with a full inkwell in your other hand." },
    { id: "c10", name: "Something sent up", type: "testimony", from: "l3", text: "At ten fifteen a boy from the Lyric brought a bottle of champagne up for a stagehand. Ketch sent it up. At eleven he sent it back down, half empty, with a note: FOR THE WIDOW, WHO IS TOO ILL TO DRINK IT." },
    { id: "c11", name: "Ketch's memory", type: "testimony", from: "l3", text: "\"Madam signed at nine forty. I saw her. Lovely woman, unwell. She had a shawl over her head, so I could not swear to her face — and she had a cast on her right arm, and she asked me for the stairs rather than the lift, and she was in a great hurry to be seen and a great hurry to be missed.\"" },
    { id: "c12", name: "Four years of diary", type: "document", from: "l4", text: "Nightly, in a fair hand, and the last entry before Tuesday reads: 'Ran her lines in the empty house. I have never been better. I have never been so ready. If she breaks a finger on Thursday I will be the best Ophelia in the west of England and they will know it and they will not be able to help liking me.'" },
    { id: "c13", name: "The letter from the Lyric", type: "document", from: "l4", text: "Eleven months ago. The board thanks her for her continued availability, reminds her that the understudy fee is one pound ten weekly, and encloses the new season's list of principals. On that list, opposite Ophelia, there is a space where a name has been erased. The paper is thin enough to read through." }
  ],
  confront: {
    s1: {
      c1: { line: "\"Spring bolt.\" She considers it. \"Then somebody pulled that door shut. I am a woman, detective, I could pull a door.\" She does not ask who else could.", reveals: "c2" },
      c2: { line: "The colour goes out of her face very slowly, like a lamp being turned down. \"Whose breath?\" — and then, immediately, in a different voice entirely: \"No. You have no idea whose breath.\"", reveals: "c11" },
      c9: { line: "\"I did not sign that. I do not write a full M. My M is two strokes and a hook; look at the Tuesday, look at the Saturday. Somebody sat in that bar and made my initial badly on purpose, because a well-made initial is harder to prove false.\"", reveals: "c10" },
      c11: { line: "\"A cast on my arm.\" She laughs once, without any humour in it. \"On Tuesday. I have no cast on my arm. I have not had a cast on my arm since the car, and I was not in the car. Somebody walked into that bar on Tuesday night and put my name in your witness's book, and I have been alibiing a woman I have never met.\"", reveals: "c4" }
    },
    s2: {
      c8: { line: "Constance looks at her own shoe, then at your feet, and does not say a word. Her face has gone the colour of the wallpaper.", reveals: "c12" },
      c12: { line: "\"If she breaks a finger.\" She reads it back to you, flat, and then closes the book. \"I did not break her finger. I have wanted to for eleven months and I have never lifted a hand to her. Ask me again when you have found out who did, because it will not have been me.\"", reveals: "c13" },
      c13: { line: "She turns the paper to the window and holds it there a long time. \"The Lyric's solicitor wrote to me in February. He said the name on the list was settled and that I should confirm receipt. I did not reply. I have been waiting eleven months for a mistake.\"", reveals: "c5" }
    },
    s3: {
      c5: { line: "Slate looks at the board the way a man looks at a bill he has already paid. \"Rill was called at five and stayed to the curtain. That is the schedule. If you want to say otherwise, say it in front of the company, because I will not be the only one who says it.\"", reveals: "c6" },
      c6: { line: "\"That is prop stock. That has been prop stock since my father's time.\" Then, quieter: \"It is a real cork, though. I have asked for a real cork twice.\"", reveals: "c4" },
      c4: { line: "He reads VOID twice. \"Then there is no motive. Not in the contract. Good. We are agreed.\" He is not agreed. He is delighted, and he is not looking at you." }
    },
    s4: {
      c9: { line: "Ketch takes the register, examines it at arm's length the way he does everything, and hands it back. \"I write the time. I do not write the name. Somebody writes the name, and I was busy with a gin at eleven o'clock, and I will not be sorry for that in front of the commissioner.\"", reveals: "c10" },
      c11: { line: "\"She had a cast on her arm, and she wanted the stairs, and she was in a hurry to be seen and a hurry to be missed.\" He polishes the brass. \"There is a woman in this city who could carry that shawl and that limp for a hundred miles. I have not got her name, but I have got the initials she gave me, and they were not M. D. They were C. R.\"" }
    }
  },
  truth: {
    culprit: "s2", motive: "It was the understudy who wanted the part and the widow who got in the way", method: "Poison in the champagne that was waiting for him after the curtain",
    key: ["c10", "c11", "c13"],
    narrative: "Constance Rill had read, through thin paper, that Ophelia was hers. She did not poison Felix. She poisoned a bottle of champagne in his dressing room, knowing he would drink it after the curtain, and she had already arranged for the widow to be wearing a shawl and a cast in a bar nine streets away.",
    reveal: "Mireille Dorne is not a murderer. She is a woman who has spent four days discovering that the most solid thing she ever owned was a stranger's invention — and that the stranger has since bought two hundred pounds of binary, and does not want the only role that was ever hers written out of the playbill in her own name."
  },
  hint: "Nobody has yet explained the only detail that matters: the bottle went up at ten fifteen and came back down at eleven. Find out who sent it, and then find out who knew the widow would not be drinking it.",
  merit: 450
});

/* ── FILE 03 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 3, tier: "easy", title: "Nine Empty Bottles",
  date: "21 April 1947", weather: "Warm, close, the river low", place: "Cellar 4, Vinegar Yard",
  client: "Mrs. Perpetua Gant, wine merchant", fee: "£60",
  brief: [
    "My cellar is insured for four thousand pounds and it is worth rather more than that to a man who knows what he is looking at. On Friday I counted one hundred and six bottles in rack nine. On Sunday there were ninety-seven, and the nine that are gone are the nine oldest, and they are not broken and they are not drunk, they are simply gone.",
    "The lock is not forced. There is no second key. I have not sent my sons down because my sons would only make a noise, and a noise in Vinegar Yard brings the whole street out, and the whole street would be happy to say they saw nothing at all."
  ],
  setup: "A locked cellar, nine missing bottles, and the specific insult of knowing which nine.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Silas Gant",    role: "The collector's son", face: "S", note: "Twenty-two, and the only Gant who does not like wine." },
    { id: "s2", name: "Rowena Shale", role: "Cellar keeper",        face: "R", note: "Holds the second key on a chain around her neck. Has for nine years." },
    { id: "s3", name: "Ambrose Kell",  role: "Bonded courier",      face: "A", note: "Moved the whole cellar twice last year without incident." },
    { id: "s4", name: "Mrs. Perpetua Gant", role: "Your client",       face: "P", note: "Insured the collection and then, quietly, raised it by two thousand." }
  ],
  motives: [
    "He wanted to sell them himself and did not want his mother's price",
    "A debt to a racing man, payable by Sunday",
    "She was about to be dismissed and wanted a fortnight's pay in bottles",
    "Nobody's motive is clear, which is itself worth noticing"
  ],
  methods: [
    "A stolen key, and nine bottles carried out under a coat",
    "The lock was picked with a tension wrench — the door was never really locked",
    "The bottles were never stolen. They were sold and the count was written down",
    "A drain. The cellar floor is a metre above the river and there is a grating"
  ],
  locations: [
    { id: "l1", name: "Rack nine", icon: "🍷", present: [],
      desc: "Dust, cold, and nine clean rectangles in the dust. Whatever came off this rack was handled with more care than a thief usually shows. The bottles directly above the gap are dusty, which means they were not disturbed, which means whoever was here knew precisely which nine they wanted.",
      exams: [
        { id: "x1", name: "The empty rectangles", icon: "⬜", note: "Nine slots. Note the pattern.", clue: "c1" },
        { id: "x2", name: "The dust on the shelf below", icon: "🌫", note: "A heel mark in the dust, and a scuff.", clue: "c2" },
        { id: "x3", name: "The rack's fixing", icon: "🔩", note: "Bolted to the wall. Somebody unscrewed it.", clue: "c3" },
        { id: "x4", name: "A bottle left behind", icon: "🍾", note: "The tenth bottle. Why was it left?", clue: "c4" }
      ] },
    { id: "l2", name: "The cellar door", icon: "🔒", present: ["s2", "s3"],
      desc: "Oak, four inches thick, and a Bramah lock that has not been forced. On the outside, at ankle height, the stone is polished to a shine in a curve.",
      exams: [
        { id: "x5", name: "The Bramah lock", icon: "🔐", note: "Untouched. Look higher and lower.", clue: "c5" },
        { id: "x6", name: "The key under her collar", icon: "🔑", note: "Rowena's. Ask for it.", clue: "c6" },
        { id: "x7", name: "Kell's account", icon: "🗣", note: "He moved two hundred bottles last November.", clue: "c7" },
        { id: "x8", name: "The polish on the stone", icon: "👣", note: "A curved shine. A kneeling man.", dead: true }
      ] },
    { id: "l3", name: "The counting house", icon: "🧾", present: ["s4", "s1"],
      desc: "Above the yard, a room of ledgers and brass scales. Mrs. Gant is going through the insurance file with the composure of a woman who has done this before.",
      exams: [
        { id: "x9", name: "The insurance schedule", icon: "📄", note: "Raised in March. The nine missing are not on it.", clue: "c8" },
        { id: "x10", name: "The sale ledger", icon: "📒", note: "Somebody has been selling the cellar out from under her.", clue: "c9" },
        { id: "x11", name: "Silas's debts", icon: "💸", note: "A bookmaker, a tailor, and a motor car.", clue: "c10" }
      ] },
    { id: "l4", name: "The river wall", icon: "🌊", present: [],
      desc: "Cellar 4 is a metre above the water. Between it and the river there is a brick grating the size of a wine crate, iron-barred, and the silt behind it is undisturbed.",
      exams: [
        { id: "x12", name: "The grating", icon: "🔩", note: "Bars straight, silt flat. Nothing went through this.", clue: "c11" },
        { id: "x13", name: "The manhole in the yard", icon: "🚪", note: "Lifted this month. The clay is wet beneath it.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "Nine, and only nine", type: "observation", from: "l1", text: "Not the cheapest. Not the finest. The nine oldest, and no more. A thief takes what is quickest. A collector's son takes what he knows is worth most in five years' time — and the nine oldest in rack nine are the only nine that are." },
    { id: "c2", name: "A heel in the dust", type: "physical", from: "l1", text: "A narrow, shallow print — a young man's, size eight, and beside it the scuff of a wooden crate set down hard and lifted again. He was not carrying them out by hand. He was putting them into something." },
    { id: "c3", name: "Four screws in fresh brass", type: "physical", from: "l1", text: "The rack was bolted to the wall and it is bolted to the wall still, on four screws. Three are black with age. The fourth is bare brass. Somebody unscrewed it, took the rack out of square, and put it back badly." },
    { id: "c4", name: "The bottle left behind", type: "physical", from: "l1", text: "The tenth bottle is still here, standing in its own dust, with a price ticket on it marked in chalk: 1871, and beneath it £340. £340 a bottle. A man after money does not leave that. A man who has been told what to take, exactly, does." },
    { id: "c5", name: "A lock untouched", type: "observation", from: "l2", text: "No scratches, no filings, no impression. The Bramah was never picked and was never forced. Which means it was opened with a key — or it was opened from the inside by somebody already in the cellar when it was locked." },
    { id: "c6", name: "Rowena's key", type: "testimony", from: "l2", text: "\"It is round my neck, it is always round my neck, and I have never taken it off to sleep since the day I was given it. On Sunday night I was home by nine. Ask my landlady.\" The chain has a stretched link and the key's teeth are bright at the tip, which is not what nine years on a chain looks like." },
    { id: "c7", name: "November's move", type: "testimony", from: "l2", text: "\"Two hundred bottles, two hours, and the lock shut behind me and nobody cared because Mrs. Gant was at her sister's. And I will tell you what I noticed and have not thought about since: while the rack was out, I saw the manhole cover in the yard was up, and I put it down myself, and I did not look down it.\"" },
    { id: "c8", name: "The raised schedule", type: "document", from: "l3", text: "The policy went from four thousand to six thousand in March, and attached to it is a valuation by a man in the City who never came to the cellar. It values the cellar at six thousand and specifically itemises the 1871 bottlings at three thousand and six. It is an extraordinary document. It is also, in the wrong hands, an instruction." },
    { id: "c9", name: "The sale ledger", type: "document", from: "l3", text: "Six sales since February, all through a wine broker in the City, all at prices below market, all paid in cash by a young man who signs his name S. Gant and does not ask for a receipt. Nine bottles. Six sales. The arithmetic is in front of you." },
    { id: "c10", name: "Silas's book", type: "document", from: "l3", text: "£340 a bottle at fifteen years old, and the young man currently owes a bookmaker £410, and there is a note in the book in a hand that is not his: 'Sunday. Bring the lot. He will not count.' — and it is initialled S.G. in his own hand beneath." },
    { id: "c11", name: "An undisturbed sill", type: "physical", from: "l4", text: "The grating's bars are straight, the silt behind it is flat and dry, and the brickwork above it is furred with sixty years of river mist. Nothing has gone through that hole in a very long time, and nothing came out through it on Sunday." }
  ],
  confront: {
    s1: {
      c4: { line: "He looks at the ticket for a long moment. \"Three hundred and forty pounds. I should not have known that number.\" He says it flatly, without surprise, the way a man admits a thing he has already decided to admit.", reveals: "c9" },
      c9: { line: "\"Under market. Yes.\" He has no apology in his voice at all, and then he has one, and it is much worse: \"I did not put them in the cellar. I had them in a barrow by the manhole from the Friday and I went back for them Saturday and Sunday with a key that was on a chain round somebody's neck.\"", reveals: "c10" },
      c10: { line: "He reads his own handwriting and does not pretend not to. \"I did not write 'bring the lot'. That is not my hand. But I did initial it, and I did not ask whose hand it was, because I wanted the money and I am not going to stand here and tell you I did not know who I was taking orders from.\"" }
    },
    s2: {
      c5: { line: "She goes very still. \"I did not break that lock.\"", reveals: "c6" },
      c6: { line: "\"It is on my neck. It has been on my neck for nine years and I have never taken it off, not to sleep, not to bathe, and I will swear to that on anything you like.\" And then, in a different voice, very quietly: \"But the chain is long. It reaches my knee. It has reached my knee since the day they gave it to me because I am small and they thought that was a joke.\"", reveals: "c7" },
      c7: { line: "\"I put the cover down.\" She is crying, and she is not hiding it. \"I put it down without looking, and I have thought about that every day since Sunday, and if there is a hole in this cellar I would not be surprised if that is where the milk goes.\"" }
    },
    s3: {
      c1: { line: "\"The oldest nine. Yes.\" He is genuinely surprised, and it is the most honest thing he has said. \"If it were a thief it would be the nearest and the fastest. The nearest and the fastest are the 1944, and the 1944 are still on that rack.\"", reveals: "c3" },
      c3: { line: "\"A rack does not get unscrewed for a robbery. You unscrew a rack to get a person into the wall behind it, and then you put the rack back so the room looks right, and you are not very good at it.\" He turns the screw over in his fingers. \"Bright brass. Three weeks old, at most.\"", reveals: "c4" },
      c4: { line: "\"£340.\" He laughs, once. \"If I were going to rob her I would rob the 1871 and I would take all of them and I would not leave one for the family to argue about. Somebody told him which nine. Somebody with the schedule, and somebody with a valuation.\"", reveals: "c8" }
    },
    s4: {
      c8: { line: "Mrs. Gant takes the schedule, and reads the valuation, and puts it down without a word. Then: \"I raised that policy because a man frightened me into it. He is dead now, and I have not told my sons, and I would rather you had it from the document than from me.\"", reveals: "c9" },
      c9: { line: "\"My cellar has been sold out from under me by my own accounts clerk over eighteen months, and I have countersigned every transfer, and I did not look at a single one, because the wine was for the cellar and the cellar was for the cellar.\"" }
    }
  },
  truth: {
    culprit: "s2", motive: "A debt to a racing man, payable by Sunday", method: "The lock was picked with a tension wrench — the door was never really locked",
    key: ["c5", "c6", "c10"],
    narrative: "Rowena Shale did not take the key off her neck. She reached down and unlocked the door with it on the chain, and the Bramah was never touched, and no amount of examination of the lock will ever show a scratch. She took the nine oldest because she was told exactly which nine, in a note initialled with her young employer's initials and in somebody else's hand.",
    reveal: "The boy is a fool and she is not, and the reason she has not run is that the person who wrote the note did not take any of the money. Six sales. Nine bottles. She carried them, she counted them, and she has not been paid, and she would like it very much known that she was the one who did the carrying."
  },
  hint: "Stop looking at the lock. A Bramah that shows no mark was never opened by a thief — and a key worn nine years on a chain is not the key that opened that door, however much she loves it.",
  merit: 450
});

/* ── FILE 04 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 4, tier: "easy", title: "The Clockmaker's Apprentice",
  date: "9 May 1947", weather: "Bright, then rain, then bright", place: "Precious & Sons, Horology, Corn Street",
  client: "Mr. Tobias Precious", fee: "£20 — I am ruined already",
  brief: [
    "I have kept that shop forty-one years and made every clock in this city. At eleven o'clock last night my brother was found in the workshop with a settling bar across his throat and a hammer in his hand, and the tower clock in the market square stopped at eleven exactly, and has not moved since.",
    "The coroner says a settling bar takes a great deal of strength. My brother was seventy-one and had not lifted a hammer in ten years. So either my brother was strong last night, or somebody was in my workshop, and the whole town is now telling me which."
  ],
  setup: "A dead clockmaker, a stopped tower clock, and a shop that was not locked.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Ned Callow",    role: "The apprentice",     face: "N", note: "Nineteen. Sharp. Owes money in three directions." },
    { id: "s2", name: "Orson Vell",    role: "Watchmaker next door", face: "O", note: "Rival, and the only man who could wind the tower without being seen." },
    { id: "s3", name: "Ivo Precious",  role: "The victim's brother", face: "I", note: "Inherits the shop, the tools, and the debt it was run on." },
    { id: "s4", name: "Hattie Loom",   role: "The shop girl",      face: "H", note: "Keeps the books and the keys and has been with him nineteen years." }
  ],
  motives: [
    "He was going to be examined and turned out",
    "The shop was sold to a chain and everybody knew it",
    "He owed what the shop was worth and could not pay it",
    "Nobody had a motive, and the brother has asked you to leave it there"
  ],
  methods: [
    "Struck with a settling bar at the bench, and the murderer's shadow on the wall",
    "Struck with a hammer and made to look like a settling bar",
    "Strangled with a chain and staged",
    "A fall. There were stairs, and the workshop floor is oiled"
  ],
  locations: [
    { id: "l1", name: "The workshop", icon: "⚒", present: ["s4"],
      desc: "Forty years of shavings, and a body under the bench. The tower's mechanism runs up through the ceiling into the loft. The bench lamp is off but its wick is black and it was burning until late. The wall behind the bench is in shadow, which is the first thing anybody noticed.",
      exams: [
        { id: "x1", name: "The body", icon: "🧍", note: "Seventy-one years old. Look at the hands.", clue: "c1" },
        { id: "x2", name: "The settling bar", icon: "🔨", note: "It is not a settling bar.", clue: "c2" },
        { id: "x3", name: "The shadow on the wall", icon: "🕯", note: "Somebody threw it.", clue: "c3" },
        { id: "x4", name: "The bench lamp", icon: "🪔", note: "Burned until late. Fuel cost is written down.", clue: "c4" },
        { id: "x5", name: "The floor by the bench", icon: "🕳", note: "Nothing at all. Which is itself strange.", clue: "c5" }
      ] },
    { id: "l2", name: "The loft", icon: "🕸", present: ["s1"],
      desc: "Dust, moths, and forty years of movements in drawers. A rope runs from the tower's great wheel through the ceiling, and it has been handled, and the dust on it has been disturbed by a hand rather than a draught.",
      exams: [
        { id: "x6", name: "The tower rope", icon: "🪢", note: "Handled. Recently.", clue: "c6" },
        { id: "x7", name: "The movement drawer", icon: "🗄", note: "A duplicate for the market clock. Present in two.", clue: "c7" },
        { id: "x8", name: "The apprentice's bench", icon: "🔧", note: "A half-finished movement and an unpaid note.", clue: "c8" },
        { id: "x9", name: "A box of weights", icon: "⚖", note: "Old, ordinary, and dusty.", dead: true }
      ] },
    { id: "l3", name: "The market square", icon: "🕰", present: ["s2"],
      desc: "The tower stands dead at eleven o'clock and a small crowd is pretending not to look at it. The lamplighter comes at dusk and a clock is a thing the whole town walks past four times a day, and the square knows its own business.",
      exams: [
        { id: "x10", name: "The tower face", icon: "🕰", note: "Stopped. Ask how, and of whom.", clue: "c9" },
        { id: "x11", name: "Vell's account", icon: "🗣", note: "He will tell you what he did at eleven.", clue: "c10" },
        { id: "x12", name: "The paving beneath the tower", icon: "🧱", note: "A ladder was against this last night.", clue: "c11" }
      ] },
    { id: "l4", name: "The back office", icon: "📒", present: ["s3", "s4"],
      desc: "Forty-one years of ledgers in a small room, and the smell of old paper. Ivo Precious is standing in it with his hat still on, as though he has come to collect something.",
      exams: [
        { id: "x13", name: "The examination letter", icon: "✉", note: "Dated a fortnight ago. Signed for.", clue: "c12" },
        { id: "x14", name: "The sale papers", icon: "📄", note: "Signed by the victim. Then altered.", clue: "c13" },
        { id: "x15", name: "Hattie's wages", icon: "💷", note: "Paid on Fridays. Nineteen years, without fail.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "A dead man's hands", type: "physical", from: "l1", text: "Seventy-one years old, and the calluses on the right hand are the calluses of a man who stopped working in 1938. Both hands are clean. Somebody washed them, at the sink, before the body was arranged, which is either mercy or a very old habit." },
    { id: "c2", name: "A hammer in a settling bar's place", type: "physical", from: "l1", text: "It is a claw hammer, handled, with the head polished by forty years of small work. The coroner called it a settling bar because it was a bar of iron and because the room wanted a settled answer. It is also, by its own taper, the exact length and weight of the tool in your hand right now." },
    { id: "c3", name: "A shadow thrown on purpose", type: "observation", from: "l1", text: "The wall behind the bench carries a raised arm, cast upward and hard, the way a shadow falls when the lamp is low and behind the man. But the lamp is on the bench, behind the body's shoulders, facing out. From that lamp, from that angle, you cannot throw a shadow onto that wall at all." },
    { id: "c4", name: "The lamp's fuel", type: "document", from: "l1", text: "Paraffin is logged nightly against the bench lamp. Tuesday reads sixpence. The wick was cut for eight hours of light. Everybody in the shop said the victim went to bed at nine. He did not go to bed at nine." },
    { id: "c5", name: "A floor that says nothing", type: "physical", from: "l1", text: "The workshop floor is oiled, the stairs are steep, and a fall is exactly what a coroner wants. There is no scuff, no heel, and no smudge of blood past the bench. Whatever happened here, it did not involve anybody falling." },
    { id: "c6", name: "The tower rope, handled", type: "physical", from: "l2", text: "Dust disturbed in four places, all of them a hand's width apart, all of them at the height of somebody standing on the loft boards. The great wheel can be pinned with one of these and left. You do not need a key to a clock tower. You need to know how a clock is built, and you need forty years of hands." },
    { id: "c7", name: "Two of the movement", type: "physical", from: "l2", text: "A duplicate for the market clock's movement, finished, boxed, and labelled. It is the reason the tower stopped: the real movement was out of the tower and down here in pieces, to be replaced in daylight on Saturday with a proper job nobody would notice." },
    { id: "c8", name: "An unpaid note", type: "document", from: "l2", text: "Ned Callow's bench: a half-finished carriage, a note in Tobias Precious's hand dated the eleventh — WORKING OR OUT — and under it a debt of nine pounds four shillings, itemised to the penny, which is what a man writes when he has already decided." },
    { id: "c9", name: "A clock does not stop", type: "observation", from: "l3", text: "The tower is a gravity escapement with a fusee. It does not stop at eleven because somebody wished it to. It stopped at eleven because the fusee chain was cut, and the great wheel was pinned, and the pin was a settling bar, and the settling bar is on the workshop floor with a man's blood on it." },
    { id: "c10", name: "Vell's account", type: "testimony", from: "l3", text: "\"I was at home with my mother from nine, and the bell went at ten as always, and I heard the tower go and I thought nothing of it. I could not wind that clock if I wanted to — nobody in this town could, except the men in that shop.\" He says it to the square, not to you, because the square is listening." },
    { id: "c11", name: "A ladder mark", type: "physical", from: "l3", text: "Two parallel scuffs in the mortar three feet up, and green paint in the crack, and the paint is the paint on Vell's window frames. Somebody leaned a ladder on this tower on Tuesday night, and it was not Vell's ladder, and everybody on that square will tell you whose it was." },
    { id: "c12", name: "The examination letter", type: "document", from: "l4", text: "The Clockmakers' Guild examines its members for competence and honesty, and the consequence is expulsion and the loss of the right to the bench. Signed for on the fifth. The victim had fourteen days to find a reason, and he found one: he was going to be ruined on Wednesday, and he told nobody." },
    { id: "c13", name: "Altered sale papers", type: "document", from: "l4", text: "The shop and the whole stock sold to a chain buyer. The victim's signature is on the last page. The price has been altered once, in a different ink, in a different hand, and the alteration is in the price's own fourth digit. Ivo Precious can write; the alteration is not in his writing." }
  ],
  confront: {
    s1: {
      c8: { line: "\"Nine pounds four.\" He looks at it and does not flinch. \"I know what it says. I have known for a fortnight.\" He turns the note over. \"He underlined the four. I have been reading that underline since Tuesday like a man reading his own sentence.\"", reveals: "c12" },
      c12: { line: "Ned Callow is quiet for a long moment. Then: \"I did not think about the tower. I want you to write that down. I had a hammer in my hand and I was standing in his light and I did not think about the tower at all.\"", reveals: "c6" },
      c6: { line: "\"I have wound that tower since I was eleven years old. Every Thursday, with Mr. Precious, and he held the lamp.\" He stops. \"He held the lamp. From the top of the ladder. He always held the lamp, because I was not to be trusted up there alone, and he never once thought about why he needed to say it.\"" },
      c2: { line: "He takes the hammer from the table and weighs it in his hand without meaning to, the way a man picks up his own fork. \"I did not hit him with that.\" He puts it down. \"I hit him with my hand. I am sorry. There is no version of that sentence which is any better.\"" }
    },
    s2: {
      c11: { line: "\"My window frames. Yes.\" He does not deny it and he does not explain, and then, savagely: \"Go and ask the lamplighter. He lent it to somebody at eight and took it back at eight and I was in my shop the whole time with the door shut, which you may also check.\"", reveals: "c9" },
      c9: { line: "\"A fusee.\" He almost smiles. \"My dear man, the fusee is the whole reason nobody can touch it. The chain is what fails, and the chain cannot be cut from the top, you must cut it from the pit, and the pit is under a slab of stone that two men lift together, and it was not locked because it is not a door, it is a floor.\"" }
    },
    s3: {
      c13: { line: "Ivo Precious looks at the altered figure for a long moment. \"I did not alter that. I was in Leeds on the second.\" He says it without heat, and it is the first thing anybody in this case has said that is either true or a very good lie.", reveals: "c4" },
      c4: { line: "\"Eight hours of lamp on a Tuesday, and a man who goes to bed at nine. Somebody was working late in that shop, and it was not the old man, and it was certainly not me, and I have not said so because I did not think anybody would look at a log book.\"" }
    },
    s4: {
      c1: { line: "\"I washed his hands.\" She says it at once, without being asked twice. \"Because he would not have wanted the coroner to look at them, and because I have done it for nineteen years and I did not think about it.\"", reveals: "c2" },
      c2: { line: "\"A claw hammer. I know. I have mended enough benches with them.\" She looks at the tool and then at the bench lamp. \"He said the old bar had gone. I have been told that bar was in his hand since the day they built this place.\"" }
    }
  },
  truth: {
    culprit: "s1", motive: "He was going to be examined and turned out", method: "Struck with a hammer and made to look like a settling bar",
    key: ["c8", "c9", "c12"],
    narrative: "Ned Callow owed nine pounds four to a man who had already written WORKING OR OUT. The boy had a hammer in his hand and no plan, and what he did next was the only thing available to him: he stopped the tower clock, so that the town would be looking at the wrong thing at the wrong time, and he was a fortnight from the top of a tower with a fusee every Thursday and a man holding the lamp above him.",
    reveal: "Ivo Precious had no motive and no hand in it. He has spent two days being the wrong brother in a city that eats its families for breakfast, and the only thing he wants from you now is to be told so in a room with a door that shuts."
  },
  hint: "Nobody has asked the one question that cracks this: a market clock is stopped from the top, but a fusee is cut from the bottom. Find out who needed that clock to be wrong, and then find out who was under the lamp.",
  merit: 450
});

/* ── FILE 05 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 5, tier: "easy", title: "A Quiet Grave in Eastmoor",
  date: "30 May 1947", weather: "Fog until noon, then flat and white", place: "Eastmoor churchyard and the almshouse",
  client: "Parish of Eastmoor (the churchwarden)", fee: "£15 and a decent breakfast",
  brief: [
    "A woman called Heskin Marrow was found in the churchyard on Tuesday in a grave that has a name on the headstone and a body in it. The name is Ruth Marrow. She has been dead eleven years. Somebody has been going to that grave for a very long time and the somebody is not Ruth Marrow's family, because Ruth Marrow's family is two hundred miles away and does not know.",
    "We would like it stopped. We do not want a scandal and we do not want the poor woman left in the cold. That is all. It is eleven years old and I am tired."
  ],
  setup: "A grave that is being visited, a woman nobody claims, and an almshouse that keeps its own register.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Sidney Marrow", role: "The sexton",       face: "S", note: "Digged the grave. Buried Ruth. Digs most graves in the parish." },
    { id: "s2", name: "Elspeth Crale", role: "Almshouse matron", face: "E", note: "Keeps the roll of the house. Fourteen old women and one old man." },
    { id: "s3", name: "Jonas Pike",    role: "Gravedigger's boy", face: "J", note: "Seventeen. Leaves school in June. Very quick with a spade." },
    { id: "s4", name: "Abel Marrow",  role: "Nobody knows",     face: "A", note: "Signed the register at the workhouse gate in 1936. Same surname, no relation claimed." }
  ],
  motives: [
    "He wanted the body found and the name changed",
    "She was not the woman in the grave and somebody is correcting the record",
    "Eleven years of a secret and one day of not being able to hold it",
    "There is no motive. He is mad, and madness is not a motive, it is a reason"
  ],
  methods: [
    "The body moved at night from a pauper's grave two hundred yards off",
    "The body never moved. A stone was moved.",
    "She died in the almshouse and the sexton buried her twice",
    "A grave is not a grave. Somebody dug a new one over the old one."
  ],
  locations: [
    { id: "l1", name: "Ruth's grave", icon: "🪦", present: ["s1"],
      desc: "Third row, east side, under the yew. The headstone says RUTH MARROW, DIED 1936, and the earth over the grave has been turned over completely, recently, and to a depth of two feet, and it has been filled in again by somebody who had never filled in a grave in his life.",
      exams: [
        { id: "x1", name: "The turned earth", icon: "⛏", note: "Two feet deep. Not a body.", clue: "c1" },
        { id: "x2", name: "The headstone", icon: "🪨", note: "Look at the lettering, not the dates.", clue: "c2" },
        { id: "x3", name: "The yew above", icon: "🌲", note: "Somebody sits here.", clue: "c3" },
        { id: "x4", name: "The flowers", icon: "🌼", note: "A posy. A very cheap, very regular one.", clue: "c4" },
        { id: "x5", name: "The grass at the foot", icon: "🌱", note: "A line of small prints, going out.", dead: true }
      ] },
    { id: "l2", name: "The church porch", icon: "⛪", present: [],
      desc: "Wet stone, a mat, and the parish register on its chain where it has been since the reign of somebody who cannot read. Sunday's burials are one. The one before that is 1936.",
      exams: [
        { id: "x6", name: "The register", icon: "📕", note: "1936. Read the hand.", clue: "c5" },
        { id: "x7", name: "The burials board", icon: "🪧", note: "Chalk. Whoever writes it has not written since Tuesday.", clue: "c6" },
        { id: "x8", name: "The vestry drawer", icon: "🗄", note: "Graves purchased in advance, and never used.", clue: "c7" }
      ] },
    { id: "l3", name: "The almshouse", icon: "🏚", present: ["s2"],
      desc: "Fourteen rooms round a flagged court, a laundry, and a smell of carbolic. The roll of the house hangs in the porch on a nail, and there is a new line in it, and the new line is in a different pen from all the others.",
      exams: [
        { id: "x9", name: "The roll of the house", icon: "📋", note: "Fifteen names. One of them is new.", clue: "c8" },
        { id: "x10", name: "The laundry book", icon: "🧺", note: "Someone has been washing for a resident who died.", clue: "c9" },
        { id: "x11", name: "Room nine", icon: "🚪", note: "A locked room, and a key on a chain.", clue: "c10" },
        { id: "x12", name: "The matron's account", icon: "🗣", note: "She is not frightened. That is worse.", clue: "c11" }
      ] },
    { id: "l4", name: "The old workhouse gate", icon: "🏚", present: ["s3", "s4"],
      desc: "Two hundred yards and a generation off. The gate is locked, the register of admissions is behind glass in the porter's lodge, and the porter died in 1941. The glass has been cleaned recently, because somebody has been reading it.",
      exams: [
        { id: "x13", name: "The admissions register", icon: "📔", note: "1936. Abel Marrow, admitted, no age.", clue: "c12" },
        { id: "x14", name: "The pauper ground", icon: "⚰", note: "A strip beyond the wall. Unmarked.", clue: "c13" },
        { id: "x15", name: "The glass", icon: "🪟", note: "Cleaned on the inside.", dead: true }
      ] }
  ],
  clues: [
    { id: "c1", name: "Two feet of turned earth", type: "physical", from: "l1", text: "The grave was opened and dug to a foot and a half and filled in badly, with clods the wrong way up and stones dropped rather than laid. No body is in that hole. Whatever is in it, it fits in a tea chest, and it is not a woman." },
    { id: "c2", name: "The lettering", type: "observation", from: "l1", text: "The headstone was carved in 1936 and the name is RUTH MARROW in the mason's hand, all five letters cut deep. But the M in MARROW is a quarter-inch deeper than the other letters, and the chiselled edges are sharp. It was cut a second time, much later, and it was the second time that came out wrong." },
    { id: "c3", name: "The flat stone under the yew", type: "physical", from: "l1", text: "Behind the yew root, a slab of stone laid flat, worn hollow in the middle, and a circle of cigarette ends around it, none of them more than a fortnight old, and a whole stub of a twist in the moss. Somebody sits here often, and has for years, and has been sitting here lately." },
    { id: "c4", name: "A cheap posy", type: "physical", from: "l1", text: "Six carnations and a bit of white ribbon, laid at the foot, renewed. The ribbon is knotted the way a sexton knots a wreath ribbon, which is the only thing in this case that anybody has done correctly." },
    { id: "c5", name: "Two hands in the register", type: "document", from: "l2", text: "The 1936 entry for Ruth Marrow is in a slow careful hand that is not the sexton's. Beside it, in the same ink, a second line: 'H. Marrow, pauper, buried without name, 14 June' — which is not in the burials board, is not in the vestry, and was never entered up as a burial at all." },
    { id: "c6", name: "The burials board", type: "observation", from: "l2", text: "Sunday, one burial: HESKIN MARROW, aged 41, of no fixed abode. Under it, rubbed out but not erased, the chalk ghost of a name that had been written first and then wiped: H. MARROW. Somebody started to write her short and then wrote her out in full." },
    { id: "c7", name: "A grave bought in 1911", type: "document", from: "l2", text: "A plot in the north-east corner, paid for in 1911 in coin, for a person whose name is illegible, and never used. The plot is four feet from the tree root and it has a headstone that nobody has ever cleaned." },
    { id: "c8", name: "A new line in the roll", type: "document", from: "l3", text: "Fifteen residents. The last line, in fresh ink, reads H. MARROW, ROOM NINE, ADMITTED FROM WORKHOUSE 4TH MAY, and the admission is signed by the matron and countersigned by nobody, because a resident of an almshouse does not require a countersignature." },
    { id: "c9", name: "Laundry for a dead woman", type: "document", from: "l3", text: "Heskin Marrow died on the second. The laundry book has her name against the third, fourth, fifth, sixth, seventh — and the seventh is a full week's washing, ironed, folded, and put away, and somebody has been washing for her ever since." },
    { id: "c10", name: "Room nine", type: "physical", from: "l3", text: "Locked, and the key is on a chain, and the chain is short. Inside: a bed made up, a chair, a bible, a cup, and a man's overcoat. On the mantelpiece, a stone — an ordinary fieldstone, picked up, kept — and the dust pattern on the shelf around it is clean, and every week for eleven years somebody has lifted that stone and set it down again." },
    { id: "c11", name: "The matron's account", type: "testimony", from: "l3", text: "\"Heskin Marrow was not on my roll and I did not admit her. I will say that once and I will say it under oath. But there is a name in that roll and I did not write it, and I have read it every morning for a year, and I have said nothing, because the alternative is that I stop writing the roll.\" She looks at the door. \"Sidney buried her. Sidney knows. Ask him why a man digs a grave and then sits on it for eleven years.\"" },
    { id: "c12", name: "Abel Marrow, admitted", type: "document", from: "l4", text: "The workhouse register, April 1936: ABEL MARROW, no age, no parish, sent from a county that does not border ours. Admitted on the fourth, and in the deaths column, in the same ink, on the fourteenth of June, a name that has been struck through so hard the nib has gone through the paper." },
    { id: "c13", name: "The pauper ground", type: "physical", from: "l4", text: "Beyond the wall, a strip of turf with a hundred small mounds, no stones, and a path worn along it from the gate to the seventh mound. The turf on the seventh is thinner than the rest, and the seventh is the one nearest the wall, and the wall is the thing you would be able to see from a window in the almshouse." }
  ],
  confront: {
    s1: {
      c2: { line: "The sexton looks at the stone for a long time and then sits down on it, which is the first time he has stopped standing. \"I cut the first letter. Eleven years ago. I did it with a cold chisel and I did it badly, and I have come here every Sunday since to look at it and hate what I have done.\"", reveals: "c5" },
      c5: { line: "\"Heskin. I wrote it that night, in the vestry, with a pen I did not have to give back.\" He does not look up. \"She came to me in March with a paper. Workhouse paper, a marriage, a name that was not hers and a name that was not mine. She said: give me a grave with my name on it and I will leave this house and go far enough that it does not matter.\"", reveals: "c13" },
      c13: { line: "\"The seventh. Between the mounds, facing the wall, so she could see the almshouse window at night.\" He puts his hand flat on the turf. \"I dug it at night because I could not do it in the day. Eleven years, and I never once had to look for it.\"" }
    },
    s2: {
      c8: { line: "\"That is my hand. Yes.\" Elspeth Crale says it without any expression at all. \"I wrote her in and I have never written her out, and every day somebody who was on my roll in 1947 has looked at that line and worked out what it means and then looked away, which is the arrangement.\"", reveals: "c9" },
      c9: { line: "\"Somebody washes for her. I know it is not me. I have washed for fourteen old women and not one of them is called Marrow.\" She looks at the laundry book and then, for the first time, at you. \"Find out who, and tell me, and then I will stop writing that roll.\"", reveals: "c10" },
      c10: { line: "She has the key in her hand and does not use it. \"I have never opened that room. I have been matron of this house for nineteen years and I have never once opened room nine, and if you open it I will resign within the hour and you will never see me again in this county.\"" }
    },
    s3: {
      c1: { line: "Pike looks at the clods and does not pretend. \"That is me. I dug it. Tuesday, after dark, and I filled it in wrong and I know it is wrong.\" He says it easily, a boy admitting a badly done job.", reveals: "c3" },
      c3: { line: "\"A man sits there. I have seen him. Hair like a wire brush, and he is always talking, and he brings a posy every week and lays it at the foot and not on the stone, and he says the same eleven words and I have never once been able to hear the eleven words.\" He shivers. \"I dug the hole because he asked me to, and he said it was a grave for a dog.\"" }
    },
    s4: {
      c12: { line: "There is no Abel Marrow. There has never been an Abel Marrow. He has been at the workhouse gate since Thursday trying to read a name that was struck through so hard the paper tore, and what he is looking for is a date.", reveals: "c3" },
      c3: { line: "\"My name was on the stone and then it was not. They struck it out when the parish found out what I was and put me in the almshouse and gave me a room with a lock on it, and I have been in that room eleven years with a stone on a shelf in here, and I go and sit on my own grave.\" He almost smiles. \"Because it is the only part of me they have not managed to change.\"" }
    }
  },
  truth: {
    culprit: "s1", motive: "Eleven years of a secret and one day of not being able to hold it", method: "The body never moved. A stone was moved.",
    key: ["c2", "c5", "c13"],
    narrative: "Nobody killed anybody. Sidney Marrow was Abel Marrow, and Abel was a man who was recorded as married in 1936 and could not be buried under a name that a record did not support. So Heskin, who had a paper and no future, offered him the arrangement, and the sexton cut the second M into the first letter of MARROW and buried her in the pauper ground and has sat on her grave every Sunday since.",
    reveal: "The boy dug a hole for a dog on Tuesday because a man he was frightened of asked him to. The matron wrote a name in her roll and has read it every morning for a year. And the parish of Eastmoor, which asked you to stop a scandal, has had a scandal in its churchyard since the day it was made."
  },
  hint: "Look at the earth before you look at the body. Two feet is nothing. And read the 1936 entry twice — there are two names on that page and only one of them was ever buried.",
  merit: 500
});

/* ── FILE 06 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 6, tier: "medium", title: "The Ledger of Mercy Hall",
  date: "18 June 1947", weather: "Warm rain, then a dry hot afternoon", place: "Mercy Hall, an orphan asylum on the marshes",
  client: "Dr. Elspeth Carrow, honorary physician", fee: "£80, and do not tell the board",
  brief: [
    "I am the physician here and I am not paid enough to be anything else. On Friday a child of nine was found dead in the west dormitory with a temperature of a hundred and four and no illness to account for it, and the matron has written it up as marsh fever, and the board has accepted it, and I have accepted it, and that is four people now who have accepted it.",
    "I have kept the books for eleven years. Mercy Hall receives four thousand one hundred pounds a year from the county and spends three thousand nine hundred and forty. I do not know what it does with the rest, because I do not keep the books, somebody else does, and he is very good at it."
  ],
  setup: "Fourteen children, a wet marsh, and a book of arithmetic that does not come out.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Ambrose Kell",  role: "Steward and secretary", face: "A", note: "Keeps the books. Has kept them for nineteen years." },
    { id: "s2", name: "Ruth Carrow",  role: "The dead child's nurse", face: "R", note: "On the night, on the ward, and thirty-one years old." },
    { id: "s3", name: "Silas Vane",   role: "Night porter",         face: "S", note: "Woke at two. Found her at five. Carries the keys and a bad reputation." },
    { id: "s4", name: "Matron Bevin", role: "Matron",              face: "M", note: "Signed the death. Thirty years in this house." },
    { id: "s5", name: "Fr. Osgood Pike", role: "Visiting chaplain", face: "F", note: "Asks questions. Is from London, and remembers things." }
  ],
  motives: [
    "The books would not survive an audit and the auditor had been named",
    "She had written to the county about the accounts and had been seen doing it",
    "The boy was the only one who could say what he had seen in the store room",
    "The money is not a motive — the money is the reason there is a motive"
  ],
  methods: [
    "Something in the milk, given to her alone",
    "An injection, and a written order that was never written",
    "Marsh fever, and the sign that fever leaves on a body that did not have it",
    "A fall down the outside stair in the dark, in the rain, with nobody hearing"
  ],
  locations: [
    { id: "l1", name: "The west dormitory", icon: "🛏", present: ["s2", "s3"],
      desc: "Fourteen beds, and one of them stripped. The window was open two inches and has been closed since; the rain came in and soaked the two end beds and nobody dried them. On the mattress there is a mark the shape of a hand, and beside it, pressed into the ticking, a small grey tablet.",
      exams: [
        { id: "x1", name: "The body", icon: "🧍", note: "Nine years old. Read the skin, not the chart.", clue: "c1" },
        { id: "x2", name: "The mark on the mattress", icon: "✋", note: "A small hand, and a grey thing.", clue: "c2" },
        { id: "x3", name: "The open window", icon: "🪟", note: "Two inches, in heavy rain.", clue: "c3" },
        { id: "x4", name: "The bed card", icon: "🪪", note: "NINE YEARS. NO SURNAME, AS PERMITTED.", clue: "c4" }
      ] },
    { id: "l2", name: "The store room", icon: "🫙", present: ["s5"],
      desc: "Tins, sacks, and a locked press. The medical press is locked and the key is on a board with thirty others, and every other key on that board has a label and the medical one has been rubbed out.",
      exams: [
        { id: "x5", name: "The medical press", icon: "🔐", note: "Open it. Count what should be here.", clue: "c5" },
        { id: "x6", name: "The daily issue book", icon: "📒", note: "Who signed for what, and on which nights.", clue: "c6" },
        { id: "x7", name: "The requisition book", icon: "📋", note: "Somebody has been ordering a great deal of something.", clue: "c7" },
        { id: "x8", name: "A sack of bran", icon: "🌾", note: "Heavier at the bottom than it should be.", dead: true }
      ] },
    { id: "l3", name: "The steward's office", icon: "🔒", present: ["s1"],
      desc: "A small room, a large desk, and a strongbox. Kell works with his back to the door and does not stop, and does not offer you a chair, and has a pen in his hand the whole time.",
      exams: [
        { id: "x9", name: "The county account", icon: "📊", note: "£4,100 in. £3,940 out. Ask the third column.", clue: "c8" },
        { id: "x10", name: "The audit letter", icon: "✉", note: "A county auditor is coming on the 30th.", clue: "c9" },
        { id: "x11", name: "Kell's account", icon: "🗣", note: "He will give you the truth, the way a man gives you the part of it that helps.", clue: "c10" },
        { id: "x12", name: "The strongbox", icon: "🔐", note: "Locked, and the key is not in it.", clue: "c11" }
      ] },
    { id: "l4", name: "The physician's room", icon: "⚕", present: ["s2", "s5"],
      desc: "A surgery, a couch, and eleven years of Dr. Carrow's handwriting. There is a bottle on the shelf with a label in her own hand and no name on it, and the dose written large, and the dose is a child's dose.",
      exams: [
        { id: "x13", name: "The unlabelled bottle", icon: "🧪", note: "Read the dose. Then read the date.", clue: "c12" },
        { id: "x14", name: "The treatment book", icon: "📓", note: "Who she saw, and when, and what she gave.", clue: "c13" },
        { id: "x15", name: "Ruth's account of the night", icon: "🗣", note: "She was on the ward and she has not slept since.", clue: "c14" },
        { id: "x16", name: "The dispensary ledger", icon: "⚗", note: "Who signed the requisition on the ninth of June.", clue: "c15" }
      ] },
    { id: "l5", name: "The chapel", icon: "⛪", present: ["s5"],
      desc: "Plain, whitewashed, and cold. Pike keeps a notebook on the rail, which is not a chaplain's habit and is not the church's.",
      exams: [
        { id: "x17", name: "The chaplain's notebook", icon: "📓", note: "Names, and dates, and a great many initials.", clue: "c16" },
        { id: "x18", name: "The graves behind the chapel", icon: "⚰", note: "Children's graves, and one of them newer than the rest.", clue: "c17" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A fever that came and went", type: "observation", from: "l1", text: "Marsh fever comes on at dusk, peaks, and breaks before morning, and it leaves a rash. This child had a hundred and four at five in the morning and was dead by six, with a skin like a boiled shirt and no rash at all. That is not marsh fever. That is a dose." },
    { id: "c2", name: "A tablet in the ticking", type: "physical", from: "l1", text: "Pressed into the mattress where a small hand had been lying: a grey disc, effervescing, bitter, half-dissolved. Children's tablets are not made to be hidden in a mattress. Somebody put it under her hand so that she would find it, and so that the hand would close on it." },
    { id: "c3", name: "Two inches of window", type: "physical", from: "l1", text: "Opened in heavy rain, closed afterwards, leaving the two end beds soaked. Marsh fever does not need a window. A person who needed a story needed a window." },
    { id: "c4", name: "No surname, as permitted", type: "document", from: "l1", text: "Permission for the child to be admitted without a name was granted by the county in February, by a signature that is not the county's ordinary hand. Four children have such cards. All four are on this ward." },
    { id: "c5", name: "The medical press, counted", type: "physical", from: "l2", text: "The press holds the house stock: quinine, iodine, chalk, carbolic, and a shelf of draughts. The shelf of draughts is a third full. There is a gap in the dust where eleven boxes stood, and the gap is a child's-medicine gap, and the requisition book says those eleven boxes were signed out in March by a hand that signs as the physician." },
    { id: "c6", name: "The daily issue book", type: "document", from: "l2", text: "Signed by the nurse on duty, every night, for eleven years. On the night of the seventh the line is written out, the quantities all correct, and it is signed R. CARROW. R. Carrow was not on duty. She was on the ninth floor at the infirmary in the town, and there is a witness and a tram ticket." },
    { id: "c7", name: "Eleven boxes of what", type: "document", from: "l2", text: "The requisition is for 'draught No. 4, children's, 11 boxes, replacement of stock spoiled in transit'. There has been no transit to this house since the war. The physician's room has a dispensary ledger, and the dispensary ledger has a column headed No. 4, and it is empty." },
    { id: "c8", name: "The third column", type: "document", from: "l3", text: "The county sends £4,100. The house spends £3,940. The missing £160 a year is entered in the third column under the heading CONTINGENT — UNALLOCATED, and the column has been running since 1936, and the total of it, added up, is £1,760." },
    { id: "c9", name: "The audit letter", type: "document", from: "l3", text: "The county will audit on the thirtieth. It was arranged three weeks ago, in writing, by the physician, to the county, and the letter was copied into the office file by Kell, and Kell's copy is annotated in pencil in his own hand: 'Seven days.' That is how long he has to make £1,760 disappear into a hospital that has never been full." },
    { id: "c10", name: "Kell's account", type: "testimony", from: "l3", text: "\"I have kept those books for nineteen years and I have never taken a penny out of them that was not mine to take. The year before last we had fever. Two hundred children through this house and no coffins in the ground. That is what the money did. Ask them who signed the orders and I will tell you it was not me.\" He says it in the voice of a man who has said it before, to somebody, in a room with a door." },
    { id: "c11", name: "A key that is not in the box", type: "physical", from: "l3", text: "The strongbox key is absent from its hook and its hook is not dusty, so it has been away from the board since the last cleaning. On the desk, in the ledger, a sheet has been cut out with a razor, close to the edge, in the shape of a receipt." },
    { id: "c12", name: "A child's dose, and a date", type: "physical", from: "l4", text: "The label is in the physician's hand: No. 4 — DRAUGHT — CHILDREN'S STRENGTH. Dose: one and a half measures. And beneath, in a different pen and a different week: 'Sat. night only. Do not record. — R.C.' R. Carrow is a physician. A physician does not write do not record about a draught of medicine." },
    { id: "c13", name: "The treatment book", type: "document", from: "l4", text: "Eleven years, four children a week, and one fortnight in March where the physician's own hand signs for the treatment of a child named — in the physician's handwriting — 'the boy from the store room', and gives the dose as 'as required, and more than required, by order of E.C.'" },
    { id: "c14", name: "Ruth's account of the night", type: "testimony", from: "l4", text: "\"I was on the ward. I was on the ward every hour of it because the fever was in the house and I could not leave fourteen children. And at about ten I asked Vane for the key to the press and he said the physician had the only one and the physician was in the town.\" She stops. \"At four I went round the beds. Hers was the only one with the covers turned down and the window open and nothing whatever wrong with her. Nothing. I put my hand on her forehead and she was perfectly well and I remember thinking, thank God.\"" },
    { id: "c15", name: "The dispensary ledger", type: "document", from: "l4", text: "The ninth of June, the requisition for eleven boxes is signed by a hand in firm small capitals: R. CARROW. And the treatment book for the ninth of June is signed in a completely different hand, a large sloping one, and records a visit at eleven at night to a child with marsh fever, and Dr. Carrow was giving a lecture in the town that evening." },
    { id: "c16", name: "The chaplain's notebook", type: "document", from: "l5", text: "Names, dates, and initials: every child who has been ill in eleven years, in a code the chaplain has made up. Beside each, one or two other people's initials. Beside four names there is a third initial, and the third initial is always E.C., and the four names are the four children with no surname on a bed card." },
    { id: "c17", name: "The newer grave", type: "physical", from: "l5", text: "A child's grave from March, under a stone with no name on it, and the stone is new, and the earth around it has been walked on. Beside it, in the grass, a small iron token with a number, the sort a child carries, and it has been dropped and not picked up." }
  ],
  confront: {
    s1: {
      c8: { line: "\"Contingent — unallocated.\" He writes the words on a pad and turns it round. \"That is an honest heading. Unallocated means not allocated. I did not invent a dishonest heading, I invented an empty one, and that took me nineteen years of patience.\"", reveals: "c9" },
      c9: { line: "Kell reads his own annotation and does not blink. \"Seven days. Yes. I have had seven days since the letter was copied. And before you say the next thing: I cannot spend one thousand seven hundred and sixty pounds in seven days. There is nowhere to spend it. It does not exist as money. It is a column.\"" },
      c11: { line: "\"The key is in my coat and the coat is on the hook and the hook is by the door, and I have not looked at that hook in four days.\" He looks at the hook. He looks at it for slightly too long.", reveals: "c10" },
      c10: { line: "\"The year before last we had fever, and I signed for the coffin lime, and I signed for the extra nurses, and I signed for the coal, and if you take it to the county they will find a warrant for every shilling of it and not one of those children is alive to say what it was for.\" He puts the pen down. \"And the physician's letter is the only reason you are standing in that room.\"" }
    },
    s2: {
      c6: { line: "Ruth Carrow goes white. \"I did not sign that. I have signed that book every night for eleven years and I would know my own hand in the dark.\" She takes the page and holds it at arm's length. \"That is not a signature. That is a signature of a signature.\"", reveals: "c15" },
      c15: { line: "\"The ninth of June. The night the child died. I was on the ward and I signed the issue book and the window was open two inches and the water came in.\" She is not crying and she is very close to it. \"And somebody stood in this room at eleven at night and made my name twice, and one of those two is in your physician's own doctor's hand.\"", reveals: "c12" },
      c12: { line: "She looks at the label for a long moment and does not touch it. \"Ruth Carrow. Nurse. Twelve years. Signed for No. 4, and put in my own drawer what I did not use.\" She says it to the bottle, not to you. \"Every Saturday night since March. Twenty-one times. He never once came to the ward, and the physician is not the only one in this house who signs a death up as marsh fever.\"" }
    },
    s3: {
      c3: { line: "Vane looks at the window and does not answer for some time. \"The rain was coming in. I closed it. I closed it because the water was coming in and I am the porter and I close windows.\" He is sweating. \"I was not in that room till five. I was not in that room at all till five, and I can prove where I was, and I have wanted somebody to ask me about it since Friday.\"", reveals: "c14" },
      c14: { line: "He nods, hard, several times. \"Nothing wrong with her. No. That is what the nurse says. I heard her say it through the door at four and I thought she meant the child was getting better, and I went away to finish my round.\" His voice goes. \"She was getting better. Somebody had already been.\"" }
    },
    s4: {
      c4: { line: "The matron looks at the bed card for a long moment. \"I signed the card, yes. I sign four a year. We are not permitted to write a name instead of a number, and if you want to know whose permission came down in February with a signature that was not the county's hand, ask him.\" She turns the card over. There is a laundry mark beneath it in a small hand: R.C. — SAT.", reveals: "c13" },
      c13: { line: "\"The boy from the store room.\" She reads it aloud and does not look up. \"He was nine and he came into the dining room at supper and asked the whole table why the medicine went out on Saturdays and not any other night. And somebody gave him a sweet, and he ate it, and he remembered.\"", reveals: "c1" }
    },
    s5: {
      c16: { line: "Pike turns the notebook round without a word and taps the third initial. \"E.C. I have written that initial four times in eleven years and I did not know what it meant until the seventh of June.\" He closes the book. \"Elspeth Carrow is the physician. And I have been a chaplain in this house for six years, and the four initials are the only page in that book I have ever been frightened of.\"", reveals: "c17" },
      c17: { line: "\"I have had the stone lifted twice. Once in March and once in May. Whoever lifted it knew exactly where to put the spade, and put it back so well that the grass has taken, and a man who could do that has been digging in this ground for a long time.\"", reveals: "c5" }
    }
  },
  truth: {
    culprit: "s1", motive: "The books would not survive an audit and the auditor had been named", method: "Something in the milk, given to her alone",
    key: ["c7", "c8", "c15"],
    narrative: "Ambrose Kell had been running Mercy Hall on £1,760 a year of unallocated county money for eleven years, and the physician's letter to the county put a date on it. He had eleven boxes of children's draught in a press that ought to be locked, a strongbox key that had walked, and a porter with a bad reputation and no alibi, and one nine-year-old boy who had asked a whole dining room the wrong question at supper.",
    reveal: "He did not kill the child. Ruth Carrow did, and she did it believing, correctly, that she was carrying out an instruction from the only person in the house who could order it — and she was, and the physician did not write it, and Kell let her believe it for three months because a woman who thinks she is a murderer does not write letters to county surveyors."
  },
  hint: "The arithmetic in this case is not a motive, it is a clock. One thousand seven hundred and sixty pounds in eleven years is not greed — it is a running expense. Find out what the money buys, and who signs for it on Saturdays.",
  merit: 600
});

/* ── FILE 07 ─────────────────────────────────────────────── */
ALL_CASES.push({
  id: 7, tier: "medium", title: "Rain on Vesper Street",
  date: "5 July 1947", weather: "Heavy rain, no wind, standing water", place: "Vesper Street and the Clarion offices",
  client: "Mrs. Ida Brace, sister of the dead man", fee: "Nothing. Nobody else will take it.",
  brief: [
    "My brother ran the Clarion for twenty-two years and made it the only paper in this city that printed things other people did not want printed. On Wednesday night he was found in the composing room with his own chair pulled over him and his head against the type case, and the coroner will call it an accident because the case was wet and the floor was wet and he had been at it since six.",
    "But my brother was not a careless man. He was the most careful man I have ever met. And on Wednesday he had sent me a letter to be posted on Thursday morning with a sentence in it that I am not going to repeat to you yet, and there is no Thursday, and I would like to know who was in that room."
  ],
  setup: "A newspaper office, a wet floor, and a man careful enough that nothing about this was an accident.",
  deadline: 0,
  suspects: [
    { id: "s1", name: "Gerald Hume",   role: "Advertiser, Vesper Street", face: "G", note: "Paid the Clarion £900 a quarter to keep a certain name out of the news pages." },
    { id: "s2", name: "Tobias Crane",  role: "Night editor",              face: "T", note: "Transferred off the city desk on Wednesday. Two hours before the death." },
    { id: "s3", name: "Nell Arbour",   role: "Compositor",                face: "N", note: "Twenty-three. Set the front page, and set it wrong, and was pulled off the stone." },
    { id: "s4", name: "Sergeant Halloway", role: "Police, city desk",   face: "S", note: "His name has not been in the Clarion since 1944 and he has not explained why." }
  ],
  motives: [
    "He was about to print a series that would have ended a very profitable silence",
    "He was ruining a good man's career and did it in public",
    "Somebody in the building had been selling stories and he had worked it out",
    "The police wanted him quiet and the police do not have to pay for anything"
  ],
  methods: [
    "Pushed back into the type case, in a wet room, on a night when everybody was in",
    "Struck first, and the wet floor staged",
    "Killed at the desk and carried three feet to the stone",
    "A fall down the iron stair — and the iron stair is not wet, only the floor is"
  ],
  locations: [
    { id: "l1", name: "The composing room", icon: "🔠", present: ["s3"],
      desc: "Stone, type, and a smell of oil and ink. The composing stick and the last forme are still on the stone where a compositor left them. A case of eight-point is open on the floor, and a tray of type is scattered across it, and the type has the particular shine of something that has been handled a great deal by somebody in a hurry.",
      exams: [
        { id: "x1", name: "The chair", icon: "🪑", note: "Pulled over. Not fallen over.", clue: "c1" },
        { id: "x2", name: "The type case", icon: "🔠", note: "Eight-point, scattered, and wet.", clue: "c2" },
        { id: "x3", name: "The forme", icon: "🧱", note: "The front page. One line is different.", clue: "c3" },
        { id: "x4", name: "The floor", icon: "💧", note: "Wet from the roof, or wet from something else.", clue: "c4" },
        { id: "x5", name: "The galley proof", icon: "📄", note: "Discarded. Somebody threw it away and it did not go far.", clue: "c5" }
      ] },
    { id: "l2", name: "The editor's office", icon: "📰", present: ["s2"],
      desc: "Crane's desk, still with Wednesday's copy on it, and a transfer slip on top with Wednesday's date on it. Behind the desk, a coat on a hook and a hat on a stand, both untouched since the afternoon.",
      exams: [
        { id: "x6", name: "The transfer slip", icon: "🗂", note: "Two o'clock, Wednesday. He moved at two.", clue: "c6" },
        { id: "x7", name: "The copy for Thursday", icon: "📝", note: "Filed, and stamped, and never sent to the stone.", clue: "c7" },
        { id: "x8", name: "The dead man's drawer", icon: "🗄", note: "Locked. He kept it locked, and the key was on his body.", clue: "c8" },
        { id: "x9", name: "The pigeonholes", icon: "🐦", note: "One hundred and eleven holes. Three emptier than they should be.", clue: "c9" }
      ] },
    { id: "l3", name: "Hume's office", icon: "🏢", present: ["s1"],
      desc: "Ground floor, Vesper Street, brass and glass and a carpet thick enough to be a motive. Mr Hume has been extremely helpful and offers you a chair before you have asked for one.",
      exams: [
        { id: "x10", name: "The advertising contract", icon: "📄", note: "£900 a quarter. Read what is bought.", clue: "c10" },
        { id: "x11", name: "The other papers", icon: "📚", note: "What happened to the same story everywhere else.", clue: "c11" },
        { id: "x12", name: "Hume's account", icon: "🗣", note: "He will tell you about the letter. Not all of it.", clue: "c12" }
      ] },
    { id: "l4", name: "The city desk", icon: "🚓", present: ["s4"],
      desc: "A hot room, a ceiling fan, and a sergeant who reads the Clarion before breakfast. He is not unfriendly. He is extremely careful, in the specific way of a man being careful about a thing he has agreed to be careful about.",
      exams: [
        { id: "x13", name: "Halloway's statement", icon: "🗣", note: "He has given one. He will not improve on it.", clue: "c13" },
        { id: "x14", name: "The file on Brace", icon: "📁", note: "There is a file. Ask what is in it.", clue: "c14" },
        { id: "x15", name: "The custody record", icon: "📋", note: "Wednesday night, in this city.", clue: "c15" }
      ] }
  ],
  clues: [
    { id: "c1", name: "A chair that was pulled", type: "physical", from: "l1", text: "The chair is on its back, the way a man takes it down with him. It is four feet from the type case and its castors are locked, and it takes two hands and a decision to get a locked castor chair onto its back. Nobody falls backwards into a locked castor chair." },
    { id: "c2", name: "Eight-point, scattered", type: "physical", from: "l1", text: "The scattered letters are not a random spill. They spell three words backwards from the bottom of the case up: the type was knocked out of its case deliberately, in order, by somebody who could read type by touch and was in no hurry to be understood." },
    { id: "c3", name: "One line of the forme", type: "document", from: "l1", text: "The front page forme is set and locked. One line of the four-column head has been re-set in a slightly heavier face — a compositor's own idea, done fast, done well enough to pass. It reads: a name that is not on the front page anywhere else." },
    { id: "c4", name: "The source of the water", type: "physical", from: "l1", text: "The roof leaks over the composing room and there is a bucket under the leak every winter. The bucket was full. And beside it on the floor, a second, much smaller puddle, round, and separate, and smelling faintly of the linseed in the ink wash. Somebody put water down here deliberately, with a can, while the bucket took the blame." },
    { id: "c5", name: "The discarded proof", type: "document", from: "l1", text: "A galley proof of Thursday's front page, thrown into the waste paper, and recovered from the basket before the rag man came. It is the version that was meant to run, and it names Hume's company, and beside the name, in the editor's own pencil, a single word: CHECK." },
    { id: "c6", name: "Two o'clock, Wednesday", type: "document", from: "l2", text: "The transfer slip is signed by the dead man and countersigned by Crane, and it moves Crane off the city desk to the accounts desk, effective immediately. At two in the afternoon, two hours before, and a man who was moved in his own newspaper's columns at two in the afternoon is a man with nothing to be in the building at half past ten at night." },
    { id: "c7", name: "Copy filed and never sent", type: "document", from: "l2", text: "Thursday's front page is written, edited, stamped OK, and sitting in the copy file. It was not sent to the stone. Somebody killed the newspaper's founder between the stamp and the stone, and the page that was going to stop a very profitable silence has sat in a drawer ever since waiting for a man who is dead." },
    { id: "c8", name: "The locked drawer", type: "physical", from: "l2", text: "Locked, and the key on the body, and the lock is a six-lever job that a compositor could open with a bent hairpin in eleven seconds and a police officer would take four hours with a warrant, and would not do it at all, because it is a dead man's private drawer and the dead man's sister is in the room." },
    { id: "c9", name: "Three empty pigeonholes", type: "observation", from: "l2", text: "Every correspondent in this city has a numbered hole. Three are empty and the numbers have not been reassigned, because reassigning is a formality nobody remembers to do. Their owners have not called. In a building of a hundred people, three people have simply stopped coming in." },
    { id: "c10", name: "What £900 buys", type: "document", from: "l3", text: "The contract is not for space. It is a clause: the firm reserves the right of first refusal on any item of news concerning the premises at number fourteen Vesper Street, on terms to be agreed. Which is not a newspaper contract. It is a gag written in a lawyer's language, and it has been running for six years." },
    { id: "c11", name: "The story everywhere else", type: "document", from: "l3", text: "Three papers took the same item last spring: the boundary survey of the yard behind number fourteen, showing that the firm's store is eleven feet outside the boundary it has paid rent on for nine years. Two printed it. The Clarion did not. The Clarion is the only paper in this city that somebody had to pay to keep it out of." },
    { id: "c12", name: "Hume's account", type: "testimony", from: "l3", text: "\"A sad business, and a wet floor, and I cannot imagine why anybody has come to me. My clerk telephoned the Clarion on Wednesday morning as we do every week about a matter concerning our premises, and the editor was extremely rude about it, and I have never been spoken to like that by a journalist in my life.\" He is not offended. He is frightened, and he is covering, and he is doing it beautifully.", reveals: "c10" },
    { id: "c13", name: "Halloway's statement", type: "testimony", from: "l4", text: "\"I was on the corner of Vesper and Quay from nine till one, on my own, because there was nothing doing. The door of the Clarion was thirty feet away. I saw the lamp in the composing room go on at half past six and I saw it go out at some time after eleven, and I did not see anybody go in or out, and I have been asked that question four times now by four different people and I have given the same answer and I should be glad to be allowed to keep it.\"" },
    { id: "c14", name: "The file on Brace", type: "document", from: "l4", text: "Not a police file. A county file, a warrant file, and a thick folder of correspondence, and on the front, in a hand that is not Halloway's, a note: SUBJECT NOT TO BE PRESSED — PENDING REVIEW. The note is dated 1944. The word pending is three years old." },
    { id: "c15", name: "Custody, Wednesday night", type: "document", from: "l4", text: "Six men in three cells between nine and one, all of them held on charges, all of them accounted for by a duty sergeant who signed at nine and did not sign again till one. The duty sergeant is Halloway. The one statement covers all three, in one hand, without a break, and takes eleven minutes to say, and there is a clock behind him in that room." }
  ],
  confront: {
    s1: {
      c10: { line: "Hume does not look at the contract. \"Right of first refusal. Yes. That is what it says.\" He folds his hands. \"And it has been honoured to the letter for six years, and I have never once used it, and I would like you to ask yourself why a man pays nine hundred pounds a year to buy a right he has never used.\"", reveals: "c11" },
      c11: { line: "\"Two papers printed it. You are right. And in both cases, within a fortnight, an advertiser withdrew, a rate card went up, and a man in the composing room found himself out of a job.\" He looks at the carpet. \"I do not print. I do not threaten anybody. I telephone.\"", reveals: "c12" }
    },
    s2: {
      c6: { line: "Crane looks at the transfer slip the way a man looks at a grave. \"Two o'clock. Yes.\" He sits down on the edge of a desk he is no longer allowed to sit on. \"I will tell you what I did at half past ten on Wednesday night and then you will not believe a word of it, and that will be the end of a rather good evening for both of us.\"", reveals: "c7" },
      c7: { line: "\"He asked me to take the city desk so I could not be near Thursday's page. He did it in front of Hume's clerk, deliberately, as a joke, and it was not a joke, and I understood it at the time.\" He is close to anger. \"And then he filed it, and stamped it, and put it in the drawer, and at ten he was dead, and that page has sat there for three days with my name on the transfer and his name at the top of the copy.\"" },
      c8: { line: "\"I have wanted to open that drawer since Wednesday night and I have not done it because he is dead and it is his.\" He looks at you steadily. \"Open it. Whatever is in it, it is the reason he is dead, and I have spent two days being the last man in the city who could have saved him by asking him a question at six o'clock.\"" }
    },
    s3: {
      c2: { line: "Nell Arbour goes white. \"I set that. I set the three words backwards because I wanted the room to know somebody here could read type and did not want to be helped.\" She does not lower her voice, which is somehow the most frightening thing about it. \"The floor of this room is type. Everything under your feet is a message. Three days in here and I have read it and I am telling you because I want it finished.\"", reveals: "c3" },
      c3: { line: "\"I re-set the head in a heavier face because a compositor is allowed to do it and nobody checks. His name is on it. Hume's. I did it for the paper, not against him.\" She folds her arms. \"And on Wednesday I was pulled off the stone at half past four, which is exactly when I was told the front page would not need me any more, and I went home at five, and I have not slept since.\"", reveals: "c5" },
      c5: { line: "\"I did not throw that away. It is in the waste basket because I put it there for somebody to find, and I did not expect the rag man, and I have been sick about it since Thursday morning.\" She looks at the proof. \"CHECK. He wrote that in pencil at half past five, and then he wrote something else, and then he went down to the composing room and did not come up.\"" }
    },
    s4: {
      c15: { line: "Halloway does not move at all. \"I wrote one statement covering three to one. That is legal, that is correct, and if you have come to tell me a thing is not legal, you are in the wrong building.\" He looks at his boots. \"And I will tell you one thing free, because I am tired. If somebody came in and out of that building on Wednesday night, they came in a police coat, or they came in a key, and there was only one key in this city that night.\"", reveals: "c14" },
      c14: { line: "\"There is no file on Brace.\" He says it flatly. \"There is a county file on a matter that has been pending review since 1944 and will be pending review when this building falls down. I have never opened it. I have carried it between two desks for three years and I know the number on the front and nothing else, and I would be very grateful if you would take it off me.\"" }
    }
  },
  truth: {
    culprit: "s4", motive: "The police wanted him quiet and the police do not have to pay for anything", method: "Pushed back into the type case, in a wet room, on a night when everybody was in",
    key: ["c14", "c15", "c13"],
    narrative: "Sergeant Halloway carried the county file from desk to desk for three years without opening it, which is not stupidity, it is a professional understanding of how these things work. On Wednesday night he used a warrant he had never been issued, a key he should not have had, and a puddle of water to turn a murder into a wet floor, and he did it in one of the three cells he had personally written a statement about.",
    reveal: "He did it in the composing room and he did it in eight-point type knocked out in order, and he is not a compositor and could not have done the letters, and he has spent three days watching a twenty-three-year-old girl tell herself the story that saves her."
  },
  hint: "The city desk has an answer to every question and the answer is the same shape each time. A man who cannot be contradicted has arranged to be somewhere nobody can check — look at what it costs him to be there, and who signed for it.",
  merit: 650
});
