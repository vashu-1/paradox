const questions = [
  {
    id: 1,
    question:
      'Alice, Bob, Charlie: one truth-teller, one liar, one spy.\n\nAlice: "Not truth-teller."\nBob: "Not spy."\nCharlie: "Not liar"\n\nWhat really "Charlie" is?',
    options: ['Liar', 'Truth-teller', 'Spy', 'Statements are Contradicting'],
    correctAnswer: 'Spy',
  },
  {
    id: 2,
    question: 'What fruit is missing in the fruit bowl grid?',
    image:
      'https://d33609liqwio9r.cloudfront.net/2026-01-02T06:21:48.489Z-Picture1.jpg', // Add your image path here
    options: ['Orange', 'Dates', 'Mango', 'Plum'],
    correctAnswer: 'Mango',
  },
  {
    id: 3,
    question:
      'I run, but I cannot walk. I sometimes sing but never talk. I lack arms, but I have hands. I lack a head, but I have a face. What am I?\n\nHint: "Hints are not always hints, and warnings are not always threats"',
    link: 'https://drive.google.com/drive/folders/1nWcw25h--ozNcR-e5SXBHykqYmhfjxh_',
    linkText: 'Click here for hints',
    options: ['River', 'Radio', 'Deck of cards', 'Clock'],
    correctAnswer: 'Clock',
  },
  {
    id: 4,
    question:
      'What is the Answer?\n\nHint: "To stay here is to be blind; to click is to see. The question is a ghost; the link is the flesh"',
    link: 'https://forms.gle/s67PzLHrQKsh5sSg7',
    linkText: 'Click to find the answer',
    options: ['Option C', 'Option D', 'Option A', 'Option B'],
    correctAnswer: 'Option B',
  },
  {
    id: 5,
    question:
      "A single apple was taken from a local vendor. Five suspects from Mr. Bryant's class—Jim, Hank, Tom, Don, and Eddie—were interrogated.\n\nMr. Bryant, knowing his students' characters perfectly, revealed a crucial detail: Exactly three of these boys always tell the truth, while exactly two of them lie every time.\n\nTheir testimonies were as follows:\n• Jim: 'It was either Hank or Tom.'\n• Hank: 'Neither Eddie nor I did it.'\n• Tom: 'Both Jim and Hank are lying.'\n• Don: 'Exactly one of them [Jim or Hank] is lying; the other is telling the truth.'\n• Eddie: 'Don, what you just said is a lie.'\n\n📄 Here a password protected PDF will be uploaded which contains The Question that is asked for this Situation, password will be the answer of question 3 (all in small letters), PDF name will be TRAP.\n\nBased on these statements, who took the apple? → this statement will be in the protected PDF\n\nHint: \"We gave you the situation, we gave you the options, but we kept the subject. You have the 'How' and the 'Where,' but you are missing the 'Who.' The 'Who' is currently locked inside a 1.2MB container labeled as a TRAP. Will you release the data\"",
    options: ['Hank', 'Tom', 'Eddie', 'Don', 'Insufficient data'],
    correctAnswer: 'Eddie',
  },
  {
    id: 6,
    question:
      "Go to the Model Club's Instagram handle. Find the post from 15th September 2025. In the caption, which word is the synonym of Excellence?",
    options: [],
    correctAnswer: 'Brilliance', // User needs to type the answer
  },
  {
    id: 7,
    question:
      'The loudest signal is often the greatest lie. Do not let your hunger for the end blind you to the teeth of the trap. This link is a whisper—tread carefully, or it will become a scream.\n\nHint: "The world will try to feed you everything you don\'t need just to keep you from becoming who you\'re meant to be. Stay hungry for the vision, not the distractions"\n\nWHAT PASSCODE YOU REALLY GOT?',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSceL5FHuQExIgIKm9uUsy0G95lfxThXFXecGtLDgsyCJpQOyg/viewform?usp=header',
    linkText: 'Open the form carefully',
    image:
      'https://d33609liqwio9r.cloudfront.net/2026-01-02T06:22:36.733Z-Picture2.jpg',
    options: ['5566', '7788', '5577', '6688'],
    correctAnswer: '5577',
  },
  {
    id: 8,
    question:
      '🪙 THE COIN PUZZLE\n\n10 coins are placed before you on a table, while you stay blindfolded. The candidate is permitted to touch the coins, however conditions to the puzzle dictates that he can\'t really determine which way up they are by feel.\n\n5 coins are placed heads up, while the other 5 are kept tails up, without the interviewee knowing which ones are which.\n\nIf you\'re allowed to flip the coins any number of times, how would you build two piles of coins each with the same number of heads up?\n\n🔑 KEY: Calculate the sum of the digits in the Question 7 passcode and keep the last digit of the result safely\n\nHint: "Your progress is measured by what you finish, not by how many useless things you explored along the way. Leave the junk for those who want to lose"',
    link: 'https://drive.google.com/drive/folders/1Qoc5MXxYtec23HRDsZCGwuAB8OZuYkeg?usp=sharing',
    linkText: 'View additional resources',
    image:
      'https://d33609liqwio9r.cloudfront.net/2026-01-02T06:23:21.532Z-Picture3.jpg',
    options: [
      'The Sequential Flip: Line all 10 coins up. Flip every second coin (2nd, 4th, 6th, 8th, 10th) and then split them down the middle.',
      'The Ratio Shift: Create one pile of 3 coins and one pile of 7 coins. Flip the pile of 3 coins twice and the pile of 7 coins once.',
      'The Blind Rotation: Rotate each coin 180 degrees on the table surface without flipping, then divide them into two groups of 5.',
      'The Prime Divide: Separate the coins into a pile of 4 and a pile of 6.',
      'Other',
    ],
    correctAnswer: 'Other',
  },
  {
    id: 9,
    question:
      '⚠️ THE OXYGEN DEBT\n\n🔴 The Situation:\nYou are an engineer trapped in a high-tech, airtight underground bunker with two other people. The oxygen levels are dropping fast. There is an electronic keypad on the exit door, but the screen is shattered. You cannot see what you are typing.\n\n📊 The Facts:\n• The System: The keypad has 10 buttons (0-9)\n• Every time you press a button, a red light flashes if the number is wrong, and a green light flashes if the number is correct\n\n⏱️ The Problem:\n• You have exactly three seconds of consciousness left\n• You only have enough strength to press one button\n\n🗑️ The "Junk":\n• One person is screaming the code is "999" because it\'s the highest\n• The other is screaming it\'s "123" because it\'s the most common\n• Both are guessing based on "exploration" and "feeling"\n\n❓ The Question:\nIf you want to survive, which single button do you press?\n\nHint: "The map shows the path, but the terrain dictates the pace. Do not be fooled by the \'extra\' steps; look for the \'solid\' ground. The base is the prize; the increase is just the bait"',
    link: 'https://drive.google.com/drive/folders/1J38-nfhRb8-zd5le3sQrAM4ywU3-fGd7?usp=sharing',
    linkText: 'Access the bunker files',
    options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    correctAnswer: '0',
  },
  {
    id: 10,
    question: 'Identify the character from the trending movie?',
    options: ['Voldermort', 'Davy Jones', 'Vecna', 'Vilgax'],
    image:
      'https://d33609liqwio9r.cloudfront.net/2026-01-02T12:11:54.145Z-WhatsApp%20Image%202025-12-13%20at%2001.00.30.jpeg',
    correctAnswer: 'Vecna',
  },
];

export default questions;
