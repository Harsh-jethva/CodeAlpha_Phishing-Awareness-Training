#!/usr/bin/env python3
"""
Interactive Phishing Awareness Training — CLI module.
Covers recognition, social engineering, best practices, and quizzes.
"""

from __future__ import annotations

import random
import sys
from dataclasses import dataclass
from typing import Callable


def clear_screen() -> None:
    print("\n" * 2)


def pause() -> None:
    input("\nPress Enter to continue...")


def section(title: str) -> None:
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60 + "\n")


@dataclass
class Question:
    prompt: str
    choices: list[str]
    correct_index: int
    explanation: str


def ask_multiple_choice(q: Question) -> bool:
    print(q.prompt)
    for i, c in enumerate(q.choices):
        label = chr(65 + i)
        print(f"  {label}) {c}")
    while True:
        raw = input("Your answer (letter): ").strip().upper()
        if not raw:
            continue
        idx = ord(raw[0]) - ord("A")
        if 0 <= idx < len(q.choices):
            ok = idx == q.correct_index
            print("\n" + ("Correct." if ok else "Incorrect."))
            print(q.explanation)
            return ok
        print("Please enter a valid letter (e.g. A, B, C).")


def teach_recognition() -> None:
    section("Recognizing phishing emails and fake websites")
    print(
        "• Sender address may mimic a brand (e.g. support@paypa1-security.com).\n"
        "• Links often hide the real destination — hover or long-press before clicking.\n"
        "• Urgent threats (“account suspended today”) pressure you to act without thinking.\n"
        "• Requests for passwords, MFA codes, or remote access are almost never legitimate.\n"
        "• Fake sites may use typosquatting (faceboook.com), HTTP-only login pages, or odd fonts.\n"
    )
    pause()


def teach_social_engineering() -> None:
    section("Social engineering tactics")
    print(
        "• Pretexting: attacker invents a scenario (IT audit, vendor callback).\n"
        "• Authority: impersonating executives or government to demand compliance.\n"
        "• Urgency and fear: artificial deadlines to bypass verification.\n"
        "• Familiarity: referencing coworkers or projects scraped from public sources.\n"
        "• Helpfulness: offering “support” to harvest credentials.\n"
    )
    pause()


def teach_best_practices() -> None:
    section("Best practices")
    print(
        "• Verify out-of-band: call a known number from the company website, not from the email.\n"
        "• Use bookmarked URLs for banking and email; avoid links in unexpected messages.\n"
        "• Enable MFA on important accounts; prefer app-based or hardware keys.\n"
        "• Report suspicious mail via your security team or email provider’s report button.\n"
        "• Keep software updated; use a password manager for unique strong passwords.\n"
    )
    pause()


def teach_examples() -> None:
    section("Real-world style examples (scenarios)")
    scenarios = [
        (
            "CEO fraud",
            "An urgent email from “the CEO” asks you to buy gift cards for a client "
            "and send the codes by reply. The reply-to domain is slightly wrong.",
        ),
        (
            "Tax / refund lure",
            "A message claims you’re owed a refund and must “confirm” bank details on a "
            "site that looks like your government portal but the URL is unrelated.",
        ),
        (
            "Shared-file trap",
            "You get “shared document” notification from a service you use; the button "
            "goes to a login page that steals your password.",
        ),
    ]
    for title, body in scenarios:
        print(f"— {title}\n  {body}\n")
    pause()


QUIZ_BANK: list[Question] = [
    Question(
        prompt="Which is the strongest first step when an unexpected email asks you to log in?",
        choices=[
            "Click the link and check if the site looks official.",
            "Use a bookmark or type the known company URL yourself.",
            "Reply with your username so they can “verify” you.",
            "Disable antivirus to avoid blocking the login page.",
        ],
        correct_index=1,
        explanation="Always navigate via trusted bookmarks or manually typed URLs you already know.",
    ),
    Question(
        prompt="A caller says they’re from IT and need your password to fix an issue. You should:",
        choices=[
            "Give them a temporary password.",
            "Hang up and call IT using the internal directory or official number.",
            "Give half the password “for security.”",
            "Install any remote tool they send immediately.",
        ],
        correct_index=1,
        explanation="Never share passwords. Verify identity through an official channel you initiate.",
    ),
    Question(
        prompt="Which sign most suggests a phishing email?",
        choices=[
            "Plain-text signature from a colleague.",
            "Unexpected attachment + urgency + slight typo in sender domain.",
            "Meeting invite from your calendar system.",
            "Newsletter you subscribed to with unsubscribe link.",
        ],
        correct_index=1,
        explanation="Urgency, unexpected attachments, and domain anomalies are classic phishing signals.",
    ),
    Question(
        prompt="Best description of “pretexting” in social engineering:",
        choices=[
            "Encrypting data before sending it.",
            "Building a fabricated story to manipulate someone into revealing information.",
            "Blocking malicious domains at the firewall.",
            "Using two-factor authentication.",
        ],
        correct_index=1,
        explanation="Pretexting is inventing a plausible scenario to gain trust or data.",
    ),
    Question(
        prompt="Which combination best reduces account takeover from phishing?",
        choices=[
            "Reusing one strong password everywhere for consistency.",
            "Unique passwords per site plus MFA (preferably app or hardware key).",
            "Turning off MFA so you are not locked out.",
            "Saving passwords only in email drafts.",
        ],
        correct_index=1,
        explanation="Unique passwords limit blast radius; MFA adds a second factor phishers cannot reuse easily.",
    ),
    Question(
        prompt="What does the HTTPS padlock in the browser primarily tell you?",
        choices=[
            "The website is guaranteed legitimate and safe from scams.",
            "The connection to that host is encrypted (TLS); it does not prove trustworthiness.",
            "The site cannot contain malware.",
            "The owner has been verified by your government.",
        ],
        correct_index=1,
        explanation="TLS protects data in transit. Scammers can use HTTPS too — always verify the domain and context.",
    ),
    Question(
        prompt="Spear phishing differs from generic phishing mainly because it is:",
        choices=[
            "Sent only by SMS, never email.",
            "Targeted using research on a specific person, role, or organization.",
            "Always blocked by spam filters.",
            "Legal if the sender uses a real company logo.",
        ],
        correct_index=1,
        explanation="Spear phishing tailors lures with personal or org details to increase believability.",
    ),
    Question(
        prompt="You receive an unexpected attachment from an address that looks almost right. Best first step:",
        choices=[
            "Open it immediately to see if it is important.",
            "Enable macros if prompted so security software can scan it.",
            "Confirm with the sender through a separate trusted channel before opening.",
            "Forward it to your entire team for visibility.",
        ],
        correct_index=2,
        explanation="Verify through a channel you trust (internal directory, chat, known phone) before opening unexpected files.",
    ),
    Question(
        prompt="“Smishing” refers to phishing conducted via:",
        choices=[
            "Social media direct messages only.",
            "SMS/text messages.",
            "Bluetooth pairing prompts.",
            "SSL certificate warnings.",
        ],
        correct_index=1,
        explanation="Smishing uses text messages to trick you into clicking links or revealing information.",
    ),
    Question(
        prompt="Business Email Compromise (BEC) attacks often involve:",
        choices=[
            "Encrypting the CEO’s laptop with ransomware.",
            "Impersonating executives or vendors to redirect payments or sensitive data.",
            "Physically stealing servers from a data center.",
            "Only attacking consumers, not businesses.",
        ],
        correct_index=1,
        explanation="BEC relies on trusted identities and payment-process abuse — verify changes through known procedures.",
    ),
    Question(
        prompt="Using public Wi‑Fi for banking or entering MFA codes is risky because:",
        choices=[
            "HTTPS makes public Wi‑Fi always safe for those tasks.",
            "Attackers on the same network may intercept or manipulate traffic; prefer cellular or trusted networks.",
            "Banks block Wi‑Fi logins entirely.",
            "Only laptops are affected, not phones.",
        ],
        correct_index=1,
        explanation="Treat untrusted networks as hostile; use cellular data or a known secure connection for sensitive actions.",
    ),
    Question(
        prompt="You suspect a phishing email at work. You should:",
        choices=[
            "Reply asking whether it is real.",
            "Follow your organization’s process (e.g. report-phishing button or security contact).",
            "Delete it silently and never tell anyone.",
            "Click every link once to “test” them.",
        ],
        correct_index=1,
        explanation="Reporting helps defenders block campaigns and protect others — use the channel your security team defines.",
    ),
    Question(
        prompt="A QR code on a flyer says “scan to verify your account.” What is the main concern?",
        choices=[
            "QR codes cannot contain URLs.",
            "You cannot see the destination before scanning; it could lead to a malicious site.",
            "QR codes work only on government websites.",
            "Scanning always installs antivirus updates.",
        ],
        correct_index=1,
        explanation="Treat unsolicited QR codes like unknown links — verify the source and use official apps or URLs.",
    ),
    Question(
        prompt="“Vishing” is best described as:",
        choices=[
            "Phishing using fake video calls only.",
            "Voice phishing — social engineering over phone calls.",
            "Attacking VPN tunnels.",
            "Virus infections spread by USB.",
        ],
        correct_index=1,
        explanation="Vishing uses phone calls to extract info or actions; verify callers through official numbers you dial.",
    ),
    Question(
        prompt="A message warns “your package failed — click to reschedule.” You did not order anything. You should:",
        choices=[
            "Click the link quickly before the package returns.",
            "Ignore or report it; use the carrier’s official site or app if you truly expect a parcel.",
            "Reply with your full address for confirmation.",
            "Download the attached “shipping label.”",
        ],
        correct_index=1,
        explanation="Unexpected delivery lures are common; use official channels you initiate, not links in the message.",
    ),
    Question(
        prompt="Which URL habit best prevents typosquatting traps?",
        choices=[
            "Trust Google’s first sponsored result.",
            "Type or bookmark known domains; inspect full hostnames for subtle misspellings.",
            "Assume subdomains always belong to the parent brand.",
            "Click faster when the page looks familiar.",
        ],
        correct_index=1,
        explanation="Read the full hostname; attackers register look-alike domains to steal credentials.",
    ),
]


def run_quiz(num_questions: int = 6) -> None:
    section("Interactive quiz")
    picks = random.sample(QUIZ_BANK, min(num_questions, len(QUIZ_BANK)))
    score = sum(1 for q in picks if ask_multiple_choice(q))
    print(f"\nScore: {score}/{len(picks)}")
    pause()


MENU: list[tuple[str, Callable[[], None]]] = [
    ("Recognition: emails & fake sites", teach_recognition),
    ("Social engineering tactics", teach_social_engineering),
    ("Best practices", teach_best_practices),
    ("Real-world examples", teach_examples),
    ("Take the quiz", run_quiz),
]


def main() -> None:
    print("\nPhishing Awareness Training (TASK 2)\n")
    while True:
        print("Choose a topic:")
        for i, (label, _) in enumerate(MENU, start=1):
            print(f"  {i}. {label}")
        print("  0. Exit")
        choice = input("\nEnter number: ").strip()
        if choice == "0":
            print("Stay vigilant. Goodbye.\n")
            sys.exit(0)
        try:
            idx = int(choice)
            if 1 <= idx <= len(MENU):
                MENU[idx - 1][1]()
            else:
                print("Invalid option.")
        except ValueError:
            print("Please enter a number.")


if __name__ == "__main__":
    main()
