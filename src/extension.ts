import * as vscode from 'vscode';
import { exec } from 'child_process';


const brainrotNames = [
    "Bombardiro Crocodillo",
    "Tralalero Tralala",
    "Tung Tung Tung Sahur",
    "Bombombini Gusini",
    "Brr Brr Patapim",
    "Frigo Camelo",
    "Glorbo Fruttodrillo",
    "Cappuccino Assassino",
    "Lirilì Larilà",
    "Ballerina Cappuccina",
    "Crocodilo Trompetisto",
    "Pinguino Atletico",
    "Il Cactus Mariachi",
    "Scheletro Ballerino",
    "Boneca Ambalabu",
    "Chimpanzini Bananini",
    "Bobrito Bandito",
    "La Vaca Saturno Saturnita",
    "Trippi Troppi",
    "Orangutini Martinini",
    "Pterodattilo Ulalà",
    "Giraffini Maccheronini",
    "Rinoceronte Canterino",
    "Pesce Spada Chitarrista",
    "Polpo Acrobatico",
    "Zucchino Esplosivo",
    "Anatra Filosofica",
    "Bufalo Spaghettini",
    "Tigre Metallico",
    "Serpentino Danzarino",
];

function getRandomName(): string {
    return brainrotNames[Math.floor(Math.random() * brainrotNames.length)];
}

function speakName(name: string) {
    let command: string;
    if (process.platform === 'darwin') {
        command = `/usr/bin/say -v Alice "${name}"`;
    } else if (process.platform === 'win32') {
        command = `powershell -c "Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; $s.SelectVoiceByHints('it-IT'); $s.Speak('${name}')"`;
    } else {
        command = `espeak -v it "${name}"`;
    }

    exec(command, (error) => {
        if (error) {
            console.error(`Error speaking: ${error.message}`);
        }
    });
}

export function activate(context: vscode.ExtensionContext) {
    const testCommand = vscode.commands.registerCommand('italian-brainrot.testBrainrot', () => {
        speakName(getRandomName());
    });

    // Fires when a terminal command finishes with a non-zero exit code
    const terminalListener = vscode.window.onDidEndTerminalShellExecution((e) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            speakName(getRandomName());
        }
    });

    context.subscriptions.push(testCommand, terminalListener);
}

export function deactivate() { }
