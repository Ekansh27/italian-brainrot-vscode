# Italian Brainrot on Error

A VS Code extension that speaks an Italian Brainrot character name out loud every time your code errors. Bombardiro Crocodillo has no mercy.

## How it works

Every time a new error appears in your editor — or a task/build fails — a random Italian Brainrot character is summoned and announced via text-to-speech in an Italian accent.

Characters include:

- Bombardiro Crocodillo
- Tralalero Tralala
- Tung Tung Tung Sahur
- Cappuccino Assassino
- Bombombini Gusini
- Frigo Camelo
- Chimpanzini Bananini
- La Vaca Saturno Saturnita
- Boneca Ambalabu
- ...and 21 more

## Features

- **Editor Diagnostics**: Triggers when linting/type errors appear in the editor
- **Task Failures**: Triggers when a VS Code task (build, run, test) exits with a non-zero code
- **Manual Summon**: Run `Italian Brainrot: Summon Character` from the command palette to test

## Requirements

- **macOS**: Uses the built-in `say` command with the Alice (Italian) voice — no setup needed
- **Windows**: Uses PowerShell speech synthesis with an Italian voice
- **Linux**: Uses `espeak` — install with `sudo apt install espeak`

## License

MIT
