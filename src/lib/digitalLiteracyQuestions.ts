export type Difficulty = "easy" | "medium" | "hard";

export type DLCategory =
  | "Internet & Browsing"
  | "Search Skills"
  | "Email & Communication"
  | "Cloud & File Sharing"
  | "Video Calls"
  | "Password & Account Security"
  | "Cybersecurity Awareness"
  | "Digital Etiquette"
  | "Troubleshooting & Shortcuts";

export interface DLQuestion {
  id: string;
  category: DLCategory;
  difficulty: Difficulty;
  type: "multiple-choice" | "scenario";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const categories: DLCategory[] = [
  "Internet & Browsing",
  "Search Skills",
  "Email & Communication",
  "Cloud & File Sharing",
  "Video Calls",
  "Password & Account Security",
  "Cybersecurity Awareness",
  "Digital Etiquette",
  "Troubleshooting & Shortcuts",
];

export const questionBank: DLQuestion[] = [
  // Internet & Browsing
  {
    id: "browse-1",
    category: "Internet & Browsing",
    difficulty: "easy",
    type: "multiple-choice",
    question: "What does it mean when a website URL starts with \"https://\" instead of \"http://\"?",
    options: [
      "The site loads faster",
      "The connection is encrypted and more secure",
      "The site is owned by Google",
      "It's a mobile-only version of the site",
    ],
    correctIndex: 1,
    explanation: "The 's' in https stands for 'secure' — data sent between you and the site is encrypted.",
  },
  {
    id: "browse-2",
    category: "Internet & Browsing",
    difficulty: "medium",
    type: "scenario",
    question: "You have 12 tabs open and can't find the one with your job application form. What's the fastest way to find it?",
    options: [
      "Close all tabs and start over",
      "Use Ctrl/Cmd+Shift+A (or browser tab search) to search open tabs",
      "Restart your computer",
      "Open a new window and hope it's there",
    ],
    correctIndex: 1,
    explanation: "Most modern browsers let you search across open tabs — much faster than clicking through each one.",
  },
  {
    id: "browse-3",
    category: "Internet & Browsing",
    difficulty: "hard",
    type: "multiple-choice",
    question: "A site keeps showing you old, outdated content even after it's been updated. What should you try first?",
    options: [
      "Uninstall your browser",
      "Clear your cache or do a hard refresh (Ctrl/Cmd+Shift+R)",
      "Change your WiFi network",
      "Report the website to Google",
    ],
    correctIndex: 1,
    explanation: "Browsers cache pages for speed. A hard refresh forces it to reload the latest version.",
  },

  // Search Skills
  {
    id: "search-1",
    category: "Search Skills",
    difficulty: "easy",
    type: "multiple-choice",
    question: "You want results that contain the EXACT phrase \"virtual assistant jobs\". What should you type in Google?",
    options: [
      "virtual assistant jobs",
      "\"virtual assistant jobs\"",
      "virtual + assistant + jobs",
      "find virtual assistant jobs please",
    ],
    correctIndex: 1,
    explanation: "Quotation marks tell Google to search for that exact phrase, not just related words.",
  },
  {
    id: "search-2",
    category: "Search Skills",
    difficulty: "medium",
    type: "scenario",
    question: "You want to find PDF resume templates only, not web pages. What search technique helps?",
    options: [
      "Type 'resume template' twice",
      "Add filetype:pdf to your search",
      "Search in all caps",
      "Use a different search engine entirely",
    ],
    correctIndex: 1,
    explanation: "The filetype: operator filters results to a specific file format like PDF, DOCX, or XLSX.",
  },
  {
    id: "search-3",
    category: "Search Skills",
    difficulty: "hard",
    type: "scenario",
    question: "You're researching 'Python' but keep getting results about the snake, not the programming language. Best fix?",
    options: [
      "Give up and use a different word",
      "Add context terms like 'Python programming' or exclude with -snake",
      "Search in incognito mode",
      "Only search on YouTube",
    ],
    correctIndex: 1,
    explanation: "Adding context words (or using the minus operator to exclude terms) narrows results to what you actually mean.",
  },

  // Email & Communication
  {
    id: "email-1",
    category: "Email & Communication",
    difficulty: "easy",
    type: "multiple-choice",
    question: "What's the difference between \"Reply\" and \"Reply All\" in email?",
    options: [
      "There is no difference",
      "Reply sends to only the sender; Reply All sends to everyone included on the email",
      "Reply All deletes the original message",
      "Reply is for phones, Reply All is for computers",
    ],
    correctIndex: 1,
    explanation: "Reply All can be embarrassing if used carelessly — it includes every recipient, not just the sender.",
  },
  {
    id: "email-2",
    category: "Email & Communication",
    difficulty: "medium",
    type: "scenario",
    question: "A client emails asking for your availability and rate. What makes the most professional reply?",
    options: [
      "A one-word reply: 'Available'",
      "A clear, complete reply with your availability, rate, and a friendly greeting/sign-off",
      "Wait a week before replying so you don't seem too eager",
      "Reply with a meme",
    ],
    correctIndex: 1,
    explanation: "Professional email replies are prompt, complete, and answer every question the sender asked.",
  },
  {
    id: "email-3",
    category: "Email & Communication",
    difficulty: "hard",
    type: "scenario",
    question: "You need to send a client a 40MB video file by email. Most inboxes reject attachments over 25MB. What should you do?",
    options: [
      "Split the video into 40 separate emails",
      "Upload it to Google Drive/cloud storage and share a link instead",
      "Compress it into a .zip and hope it fits",
      "Ask the client to accept a smaller, blurry version",
    ],
    correctIndex: 1,
    explanation: "Cloud storage links are the standard professional solution for large files that exceed email limits.",
  },

  // Cloud & File Sharing
  {
    id: "cloud-1",
    category: "Cloud & File Sharing",
    difficulty: "easy",
    type: "multiple-choice",
    question: "What is Google Drive mainly used for?",
    options: [
      "Only for storing photos",
      "Storing and sharing files online so you can access them from any device",
      "Sending emails",
      "Making video calls",
    ],
    correctIndex: 1,
    explanation: "Cloud storage like Google Drive lets you store, organize, and share files without needing a physical device with you.",
  },
  {
    id: "cloud-2",
    category: "Cloud & File Sharing",
    difficulty: "medium",
    type: "scenario",
    question: "You want a client to be able to VIEW a file but not accidentally edit or delete it. What sharing setting should you use?",
    options: [
      "Give them 'Editor' access",
      "Give them 'Viewer' access",
      "Share your entire Drive account login",
      "Download it and mail a USB drive",
    ],
    correctIndex: 1,
    explanation: "'Viewer' permission lets others see a file without being able to change it — the safer default for shared work.",
  },
  {
    id: "cloud-3",
    category: "Cloud & File Sharing",
    difficulty: "hard",
    type: "scenario",
    question: "You need to send a client 30 files organized in folders. What's the most efficient way?",
    options: [
      "Attach all 30 files individually to one email",
      "Zip the folder or share the whole Drive folder link at once",
      "Send them one file per day for 30 days",
      "Print them and mail them",
    ],
    correctIndex: 1,
    explanation: "Compressing into a ZIP or sharing a single folder link keeps everything organized in one place.",
  },

  // Video Calls
  {
    id: "video-1",
    category: "Video Calls",
    difficulty: "easy",
    type: "multiple-choice",
    question: "You're in a Zoom/Google Meet call and not speaking. What should you usually do?",
    options: [
      "Mute your microphone to reduce background noise",
      "Turn off your camera and leave",
      "Keep talking anyway",
      "Close the app",
    ],
    correctIndex: 0,
    explanation: "Muting when not speaking is standard video call etiquette — it prevents background noise from disrupting others.",
  },
  {
    id: "video-2",
    category: "Video Calls",
    difficulty: "medium",
    type: "scenario",
    question: "You're about to join an important client call in Google Meet. What should you check beforehand?",
    options: [
      "Nothing, just click join",
      "Your camera, mic, internet connection, and background/lighting",
      "Only your camera",
      "Only your internet speed",
    ],
    correctIndex: 1,
    explanation: "A quick pre-call check of audio, video, connection, and environment prevents awkward technical delays.",
  },
  {
    id: "video-3",
    category: "Video Calls",
    difficulty: "hard",
    type: "scenario",
    question: "You need to show a client your screen and a specific document during a Zoom call. What's the correct sequence?",
    options: [
      "Email the document instead and skip screen sharing",
      "Open the document first, then use 'Share Screen' and select the correct window",
      "Share your entire desktop with all apps and notifications visible",
      "Ask the client to share their screen instead",
    ],
    correctIndex: 1,
    explanation: "Opening the file first and sharing the specific window (not full desktop) keeps the call focused and avoids exposing private notifications.",
  },

  // Password & Account Security
  {
    id: "pass-1",
    category: "Password & Account Security",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Which of these is the STRONGEST password?",
    options: [
      "123456",
      "yourname2024",
      "Tr@vel!Mango_92Bike",
      "password",
    ],
    correctIndex: 2,
    explanation: "Strong passwords mix upper/lowercase, numbers, symbols, and avoid personal info or common words.",
  },
  {
    id: "pass-2",
    category: "Password & Account Security",
    difficulty: "medium",
    type: "multiple-choice",
    question: "What is Two-Factor Authentication (2FA)?",
    options: [
      "Using two different passwords",
      "A second verification step (like an SMS code or app) in addition to your password",
      "Logging in twice",
      "Sharing your account with two people",
    ],
    correctIndex: 1,
    explanation: "2FA adds a second layer of proof it's really you — even if someone steals your password, they can't log in without the second factor.",
  },
  {
    id: "pass-3",
    category: "Password & Account Security",
    difficulty: "hard",
    type: "scenario",
    question: "You use the same password for your email, bank, and freelance accounts. One gets leaked in a data breach. What's the real risk?",
    options: [
      "No risk — breaches only affect the one site",
      "Attackers can try that same password on all your other accounts (credential stuffing)",
      "Your internet speed will slow down",
      "Nothing happens unless you get an email about it",
    ],
    correctIndex: 1,
    explanation: "Reusing passwords means one breach can compromise every account that shares it. Unique passwords per account (ideally via a password manager) prevent this.",
  },

  // Cybersecurity Awareness
  {
    id: "sec-1",
    category: "Cybersecurity Awareness",
    difficulty: "easy",
    type: "scenario",
    question: "You get an email saying you won a prize and must click a link and enter your bank details to claim it. What is this?",
    options: [
      "A legitimate prize notification",
      "A phishing scam",
      "A software update",
      "A newsletter",
    ],
    correctIndex: 1,
    explanation: "Unsolicited prize emails asking for banking or personal details are a classic phishing pattern.",
  },
  {
    id: "sec-2",
    category: "Cybersecurity Awareness",
    difficulty: "medium",
    type: "scenario",
    question: "A message claiming to be your bank asks you to 'verify your account' by clicking a link with a slightly misspelled domain (e.g. bp-security-check.net). What should you do?",
    options: [
      "Click it quickly before the offer expires",
      "Don't click — go directly to the bank's official app or website instead",
      "Reply asking if it's real",
      "Forward it to friends to warn them, then click it",
    ],
    correctIndex: 1,
    explanation: "Never trust links in unexpected messages. Always navigate to official sites/apps directly rather than clicking embedded links.",
  },
  {
    id: "sec-3",
    category: "Cybersecurity Awareness",
    difficulty: "hard",
    type: "scenario",
    question: "You're about to connect to a free public WiFi at a coffee shop to log into a client's admin dashboard. What's the safest approach?",
    options: [
      "Log in normally — public WiFi is fine for anything",
      "Avoid logging into sensitive accounts on public WiFi, or use a VPN first",
      "Turn off your antivirus to connect faster",
      "Share the WiFi password with your client for convenience",
    ],
    correctIndex: 1,
    explanation: "Public WiFi can expose unencrypted traffic to others on the network. Sensitive logins are safer on a VPN or trusted network.",
  },

  // Digital Etiquette
  {
    id: "eti-1",
    category: "Digital Etiquette",
    difficulty: "easy",
    type: "multiple-choice",
    question: "Typing a message IN ALL CAPS in a professional chat usually comes across as:",
    options: [
      "Extra polite",
      "Shouting or aggressive",
      "More formal",
      "It has no effect",
    ],
    correctIndex: 1,
    explanation: "ALL CAPS is widely read as shouting or aggressive tone in written communication.",
  },
  {
    id: "eti-2",
    category: "Digital Etiquette",
    difficulty: "medium",
    type: "scenario",
    question: "A client messages you at 11PM asking a non-urgent question. What's the professional move?",
    options: [
      "Reply immediately no matter the hour to seem responsive",
      "Reply during your normal working hours the next day",
      "Ignore it permanently",
      "Call them back immediately",
    ],
    correctIndex: 1,
    explanation: "Setting clear working-hour boundaries while still being reliable is professional — you don't need to be 'always on'.",
  },
  {
    id: "eti-3",
    category: "Digital Etiquette",
    difficulty: "hard",
    type: "scenario",
    question: "You disagree with feedback a client gave on your work in a group chat with other stakeholders watching. What's the best response?",
    options: [
      "Argue back publicly in the group chat to defend yourself",
      "Acknowledge it professionally in the group, then discuss details privately if needed",
      "Ignore the feedback entirely",
      "Leave the group chat",
    ],
    correctIndex: 1,
    explanation: "Keeping public responses professional and moving detailed disagreements to a private channel protects your reputation and the relationship.",
  },

  // Troubleshooting & Shortcuts
  {
    id: "trouble-1",
    category: "Troubleshooting & Shortcuts",
    difficulty: "easy",
    type: "multiple-choice",
    question: "What does Ctrl+Z (or Cmd+Z on Mac) do?",
    options: [
      "Zoom in",
      "Undo the last action",
      "Save the file",
      "Close the window",
    ],
    correctIndex: 1,
    explanation: "Ctrl/Cmd+Z is the universal 'undo' shortcut across most apps and operating systems.",
  },
  {
    id: "trouble-2",
    category: "Troubleshooting & Shortcuts",
    difficulty: "medium",
    type: "scenario",
    question: "An app has frozen and isn't responding to any clicks. First thing to try?",
    options: [
      "Immediately unplug the computer",
      "Wait a moment, then force-close/restart just that app",
      "Reinstall your entire operating system",
      "Buy a new computer",
    ],
    correctIndex: 1,
    explanation: "Force-closing and reopening the specific frozen app resolves most freezes without drastic measures.",
  },
  {
    id: "trouble-3",
    category: "Troubleshooting & Shortcuts",
    difficulty: "hard",
    type: "scenario",
    question: "You need to quickly move text from one document to another, and also want to see everything currently on your clipboard history. What helps?",
    options: [
      "Retype everything manually",
      "Use copy/paste shortcuts, and your OS's clipboard history tool if available (Win+V on Windows)",
      "Take a screenshot of the text instead",
      "Print the document and retype from paper",
    ],
    correctIndex: 1,
    explanation: "Clipboard history tools (like Win+V) let you access multiple recently copied items, not just the last one — a major efficiency boost.",
  },
];

export function getQuestionsByCategory(category: DLCategory): DLQuestion[] {
  return questionBank.filter((q) => q.category === category);
}
