import * as vscode from 'vscode';
import { exec } from 'child_process';

let lastErrorCount = 0;

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

    // --- 1. Diagnostic Listener (Editor Errors) ---
    const diagnosticListener = vscode.languages.onDidChangeDiagnostics((e: vscode.DiagnosticChangeEvent) => {
        let currentErrorCount = 0;
        e.uris.forEach((uri: vscode.Uri) => {
            const diagnostics = vscode.languages.getDiagnostics(uri);
            currentErrorCount += diagnostics.filter((d: vscode.Diagnostic) => d.severity === vscode.DiagnosticSeverity.Error).length;
        });

        if (currentErrorCount > lastErrorCount) {
            speakName(getRandomName());
        }
        lastErrorCount = currentErrorCount;
    });

    // --- 2. Task Listener (Runtime Errors) ---
    const taskListener = vscode.tasks.onDidEndTaskProcess((e: vscode.TaskProcessEndEvent) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            speakName(getRandomName());
        }
    });

    context.subscriptions.push(testCommand, diagnosticListener, taskListener);
}

export function deactivate() { }
