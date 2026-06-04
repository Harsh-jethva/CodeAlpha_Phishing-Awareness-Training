# Phishing Awareness Training

An educational resource that teaches how to recognize phishing, social engineering tactics, and safer habits — with an interactive quiz that pulls **random questions** from a larger bank and **shuffles answer order** each session.

![Theme](https://img.shields.io/badge/theme-cyber%20SOC-00e5ff?style=flat-square)

## Contents

- **Web module** (`web/`): Single-page training site with a cybersecurity-inspired UI (terminal/SOC styling).
- **CLI module** (`phishing_training.py`): Same topics plus a menu-driven quiz aligned with the web question bank.

## Features

- Sections on recognition, social engineering, best practices, and real-world-style examples.
- **Interactive quiz**: Each run selects a subset of questions at random; answers are shuffled so memorizing positions does not help.
- **Python quiz**: `random.sample` over the shared bank (default 6 questions per session).

## Requirements

- **Web**: Any modern browser. Optional: [XAMPP](https://www.apachefriends.org/) or any static file server if you prefer serving over HTTP instead of opening files directly.
- **CLI**: Python **3.9+** (uses type hints and `list[str]` style).

## Quick start — web

1. Clone or download this repository.
2. Open `web/index.html` in your browser, **or** place the project under your web root (e.g. XAMPP `htdocs`) and browse to the folder URL.

No build step or package install is required.

## Quick start — CLI

From the project root:

```bash
python phishing_training.py
```

Use the numbered menu to read each section or take the quiz. Exit with `0`.

## Project layout

```text
CodeAlpha_Phishing Awareness Training/
├── README.md
├── phishing_training.py    # CLI training + quiz (QUIZ_BANK)
└── web/
    ├── index.html          # Training page + quiz markup
    ├── styles.css          # Cyber SOC theme
    └── app.js              # Random quiz selection + shuffled options
```

## Customizing the quiz

- **Web — how many questions per round**: In `web/app.js`, change `QUESTIONS_PER_QUIZ` (default: `6`).
- **Web / CLI — add or edit questions**: Add entries to `QUESTIONS` in `web/app.js` and mirror them in `QUIZ_BANK` in `phishing_training.py` so both stay in sync.

## Disclaimer

This project is for **security awareness and education** only. It does not provide legal or enterprise security policy advice. Always follow your organization’s security procedures and local regulations.

## License

If you do not add a `LICENSE` file, GitHub will not apply a default license. Consider adding one (e.g. MIT) if you want to clarify how others may use your work.

---

*CodeAlpha / Phishing Awareness Training — stay skeptical, stay safe.*
