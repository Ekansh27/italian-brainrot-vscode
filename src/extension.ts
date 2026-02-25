import * as vscode from 'vscode';
import * as path from 'path';
import { exec } from 'child_process';

let lastErrorCount = 0;

export function activate(context: vscode.ExtensionContext) {
    console.log('Fahh Sound extension is now active!');

    const soundPath = path.join(context.extensionPath, 'fahh-but-louder.mp3');

    // Command to test the sound
    let disposable = vscode.commands.registerCommand('fahh-sound-on-error.testSound', () => {
        playSound(soundPath);
        vscode.window.showInformationMessage('Fahh!');
    });

    // --- 1. Diagnostic Listener (Editor Errors) ---
    const diagnosticListener = vscode.languages.onDidChangeDiagnostics((e) => {
        let currentErrorCount = 0;
        e.uris.forEach(uri => {
            const diagnostics = vscode.languages.getDiagnostics(uri);
            currentErrorCount += diagnostics.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length;
        });

        if (currentErrorCount > lastErrorCount) {
            playSound(soundPath);
        }
        lastErrorCount = currentErrorCount;
    });

    // --- 2. Task Listener (Runtime Errors) ---
    const taskListener = vscode.tasks.onDidEndTaskProcess((e) => {
        if (e.exitCode !== undefined && e.exitCode !== 0) {
            console.log(`Task ${e.execution.task.name} failed with exit code ${e.exitCode}`);
            playSound(soundPath);
        }
    });

    // --- 3. Debug Listener (Crashes) ---
    const debugListener = vscode.debug.onDidTerminateDebugSession((session) => {
        // Optional logic for debug session crashes could go here
    });

    context.subscriptions.push(disposable, diagnosticListener, taskListener, debugListener);
}

function playSound(soundPath: string) {
    // PowerShell command to play MP3 on Windows
    const command = `powershell -c "Add-Type -AssemblyName presentationCore; $mediaPlayer = New-Object system.windows.media.mediaplayer; $mediaPlayer.open('${soundPath}'); $mediaPlayer.Play(); Start-Sleep 2"`;

    exec(command, (error) => {
        if (error) {
            console.error(`Error playing sound: ${error.message}`);
        }
    });
}

export function deactivate() { }
