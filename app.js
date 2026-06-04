/**
 * Quiz pool — mirrors phishing_training.py QUIZ_BANK.
 * Each session picks a random subset and shuffles answer order.
 */
const QUESTIONS_PER_QUIZ = 6;

const QUESTIONS = [
  {
    prompt:
      "Which is the strongest first step when an unexpected email asks you to log in?",
    choices: [
      "Click the link and check if the site looks official.",
      "Use a bookmark or type the known company URL yourself.",
      "Reply with your username so they can “verify” you.",
      "Disable antivirus to avoid blocking the login page.",
    ],
    correctIndex: 1,
    explanation:
      "Always navigate via trusted bookmarks or manually typed URLs you already know.",
  },
  {
    prompt: "A caller says they’re from IT and need your password to fix an issue. You should:",
    choices: [
      "Give them a temporary password.",
      "Hang up and call IT using the internal directory or official number.",
      "Give half the password “for security.”",
      "Install any remote tool they send immediately.",
    ],
    correctIndex: 1,
    explanation:
      "Never share passwords. Verify identity through an official channel you initiate.",
  },
  {
    prompt: "Which sign most suggests a phishing email?",
    choices: [
      "Plain-text signature from a colleague.",
      "Unexpected attachment + urgency + slight typo in sender domain.",
      "Meeting invite from your calendar system.",
      "Newsletter you subscribed to with unsubscribe link.",
    ],
    correctIndex: 1,
    explanation:
      "Urgency, unexpected attachments, and domain anomalies are classic phishing signals.",
  },
  {
    prompt: "Best description of “pretexting” in social engineering:",
    choices: [
      "Encrypting data before sending it.",
      "Building a fabricated story to manipulate someone into revealing information.",
      "Blocking malicious domains at the firewall.",
      "Using two-factor authentication.",
    ],
    correctIndex: 1,
    explanation: "Pretexting is inventing a plausible scenario to gain trust or data.",
  },
  {
    prompt: "Which combination best reduces account takeover from phishing?",
    choices: [
      "Reusing one strong password everywhere for consistency.",
      "Unique passwords per site plus MFA (preferably app or hardware key).",
      "Turning off MFA so you are not locked out.",
      "Saving passwords only in email drafts.",
    ],
    correctIndex: 1,
    explanation:
      "Unique passwords limit blast radius; MFA adds a second factor phishers cannot reuse easily.",
  },
  {
    prompt: "What does the HTTPS padlock in the browser primarily tell you?",
    choices: [
      "The website is guaranteed legitimate and safe from scams.",
      "The connection to that host is encrypted (TLS); it does not prove trustworthiness.",
      "The site cannot contain malware.",
      "The owner has been verified by your government.",
    ],
    correctIndex: 1,
    explanation:
      "TLS protects data in transit. Scammers can use HTTPS too — always verify the domain and context.",
  },
  {
    prompt: "Spear phishing differs from generic phishing mainly because it is:",
    choices: [
      "Sent only by SMS, never email.",
      "Targeted using research on a specific person, role, or organization.",
      "Always blocked by spam filters.",
      "Legal if the sender uses a real company logo.",
    ],
    correctIndex: 1,
    explanation:
      "Spear phishing tailors lures with personal or org details to increase believability.",
  },
  {
    prompt: "You receive an unexpected attachment from an address that looks almost right. Best first step:",
    choices: [
      "Open it immediately to see if it is important.",
      "Enable macros if prompted so security software can scan it.",
      "Confirm with the sender through a separate trusted channel before opening.",
      "Forward it to your entire team for visibility.",
    ],
    correctIndex: 2,
    explanation:
      "Verify through a channel you trust (internal directory, chat, known phone) before opening unexpected files.",
  },
  {
    prompt: "“Smishing” refers to phishing conducted via:",
    choices: [
      "Social media direct messages only.",
      "SMS/text messages.",
      "Bluetooth pairing prompts.",
      "SSL certificate warnings.",
    ],
    correctIndex: 1,
    explanation: "Smishing uses text messages to trick you into clicking links or revealing information.",
  },
  {
    prompt: "Business Email Compromise (BEC) attacks often involve:",
    choices: [
      "Encrypting the CEO’s laptop with ransomware.",
      "Impersonating executives or vendors to redirect payments or sensitive data.",
      "Physically stealing servers from a data center.",
      "Only attacking consumers, not businesses.",
    ],
    correctIndex: 1,
    explanation:
      "BEC relies on trusted identities and payment-process abuse — verify changes through known procedures.",
  },
  {
    prompt: "Using public Wi‑Fi for banking or entering MFA codes is risky because:",
    choices: [
      "HTTPS makes public Wi‑Fi always safe for those tasks.",
      "Attackers on the same network may intercept or manipulate traffic; prefer cellular or trusted networks.",
      "Banks block Wi‑Fi logins entirely.",
      "Only laptops are affected, not phones.",
    ],
    correctIndex: 1,
    explanation:
      "Treat untrusted networks as hostile; use cellular data or a known secure connection for sensitive actions.",
  },
  {
    prompt: "You suspect a phishing email at work. You should:",
    choices: [
      "Reply asking whether it is real.",
      "Follow your organization’s process (e.g. report-phishing button or security contact).",
      "Delete it silently and never tell anyone.",
      "Click every link once to “test” them.",
    ],
    correctIndex: 1,
    explanation:
      "Reporting helps defenders block campaigns and protect others — use the channel your security team defines.",
  },
  {
    prompt: "A QR code on a flyer says “scan to verify your account.” What is the main concern?",
    choices: [
      "QR codes cannot contain URLs.",
      "You cannot see the destination before scanning; it could lead to a malicious site.",
      "QR codes work only on government websites.",
      "Scanning always installs antivirus updates.",
    ],
    correctIndex: 1,
    explanation:
      "Treat unsolicited QR codes like unknown links — verify the source and use official apps or URLs.",
  },
  {
    prompt: "“Vishing” is best described as:",
    choices: [
      "Phishing using fake video calls only.",
      "Voice phishing — social engineering over phone calls.",
      "Attacking VPN tunnels.",
      "Virus infections spread by USB.",
    ],
    correctIndex: 1,
    explanation:
      "Vishing uses phone calls to extract info or actions; verify callers through official numbers you dial.",
  },
  {
    prompt: "A message warns “your package failed — click to reschedule.” You did not order anything. You should:",
    choices: [
      "Click the link quickly before the package returns.",
      "Ignore or report it; use the carrier’s official site or app if you truly expect a parcel.",
      "Reply with your full address for confirmation.",
      "Download the attached “shipping label.”",
    ],
    correctIndex: 1,
    explanation:
      "Unexpected delivery lures are common; use official channels you initiate, not links in the message.",
  },
  {
    prompt: "Which URL habit best prevents typosquatting traps?",
    choices: [
      "Trust Google’s first sponsored result.",
      "Type or bookmark known domains; inspect full hostnames for subtle misspellings.",
      "Assume subdomains always belong to the parent brand.",
      "Click faster when the page looks familiar.",
    ],
    correctIndex: 1,
    explanation:
      "Read the full hostname; attackers register look-alike domains to steal credentials.",
  },
];

function shuffle(array) {
  const out = array.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Shuffle answer choices while tracking the new correct index.
 */
function prepareQuestion(raw) {
  const tagged = raw.choices.map((text, i) => ({
    text,
    isCorrect: i === raw.correctIndex,
  }));
  shuffle(tagged);
  return {
    prompt: raw.prompt,
    explanation: raw.explanation,
    choices: tagged.map((t) => t.text),
    correctIndex: tagged.findIndex((t) => t.isCorrect),
  };
}

function pickSessionQuestions() {
  const shuffled = shuffle(QUESTIONS.slice());
  const n = Math.min(QUESTIONS_PER_QUIZ, shuffled.length);
  return shuffled.slice(0, n).map(prepareQuestion);
}

function $(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing #${id}`);
  return el;
}

const quizStart = $("quiz-start");
const quizQuestionWrap = $("quiz-question-wrap");
const quizPrompt = $("quiz-prompt");
const quizOptions = $("quiz-options");
const quizSubmit = $("quiz-submit");
const quizNext = $("quiz-next");
const quizFeedback = $("quiz-feedback");
const quizProgress = $("quiz-progress");
const quizResults = $("quiz-results");
const quizScore = $("quiz-score");
const quizRetry = $("quiz-retry");

let sessionQuestions = [];
let index = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  answered = false;
  const q = sessionQuestions[index];
  quizPrompt.textContent = q.prompt;
  quizOptions.innerHTML = "";
  quizFeedback.hidden = true;
  quizFeedback.textContent = "";
  quizFeedback.classList.remove("correct", "incorrect");
  quizSubmit.hidden = false;
  quizSubmit.disabled = false;
  quizNext.hidden = true;

  q.choices.forEach((text, i) => {
    const label = document.createElement("label");
    label.className = "quiz-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "quiz-answer";
    input.value = String(i);
    const span = document.createElement("span");
    span.textContent = text;
    label.appendChild(input);
    label.appendChild(span);
    quizOptions.appendChild(label);
  });

  quizProgress.textContent = `Question ${index + 1} of ${sessionQuestions.length}`;
}

function selectedIndex() {
  const picked = quizOptions.querySelector('input[name="quiz-answer"]:checked');
  return picked ? parseInt(picked.value, 10) : null;
}

function lockOptions() {
  quizOptions.querySelectorAll(".quiz-option").forEach((label) => {
    label.classList.add("disabled");
    label.querySelector("input").disabled = true;
  });
}

quizSubmit.addEventListener("click", () => {
  if (answered) return;
  const picked = selectedIndex();
  if (picked === null) {
    quizFeedback.hidden = false;
    quizFeedback.className = "quiz-feedback incorrect";
    quizFeedback.innerHTML = "<strong>Choose an answer</strong><span>Select one option above.</span>";
    return;
  }

  answered = true;
  const q = sessionQuestions[index];
  const correct = picked === q.correctIndex;
  if (correct) score += 1;

  lockOptions();
  quizFeedback.hidden = false;
  quizFeedback.className = "quiz-feedback " + (correct ? "correct" : "incorrect");
  quizFeedback.innerHTML =
    `<strong>${correct ? "Correct." : "Incorrect."}</strong>` + `<span>${q.explanation}</span>`;

  quizSubmit.hidden = true;
  quizNext.hidden = false;
  quizNext.focus();
});

quizNext.addEventListener("click", () => {
  index += 1;
  if (index >= sessionQuestions.length) {
    quizQuestionWrap.hidden = true;
    quizResults.hidden = false;
    quizScore.textContent = `Your score: ${score} out of ${sessionQuestions.length}`;
    quizProgress.textContent = "";
    return;
  }
  renderQuestion();
});

quizStart.addEventListener("click", () => {
  sessionQuestions = pickSessionQuestions();
  index = 0;
  score = 0;
  quizStart.hidden = true;
  quizResults.hidden = true;
  quizQuestionWrap.hidden = false;
  renderQuestion();
});

quizRetry.addEventListener("click", () => {
  quizResults.hidden = true;
  quizStart.click();
});
