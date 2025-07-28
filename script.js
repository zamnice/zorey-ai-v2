class ZoreyAI {
    constructor() {
        this.API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemma-3-1b-it:generateContent";
        this.API_KEY = "AIzaSyDJ0R_S8bcqcRNvwfsv0wWm7YE8pUiZ8Is";

        this.state = {
            darkMode: false,
            isTyping: false
        };

        this.elements = {
            app: document.getElementById('app'),
            chatContainer: document.getElementById('chat-container'),
            userInput: document.getElementById('user-input'),
            sendBtn: document.getElementById('send-btn'),
            themeToggle: document.getElementById('theme-toggle'),
            toast: document.getElementById('toast')
        };

        this.init();
    }

    // ... (implementasi method lainnya tetap sama seperti sebelumnya) ...
}

// Initialize Zorey AI
const zoreyAI = new ZoreyAI();

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
});

function showInstallPrompt() {
    const installPrompt = document.createElement('div');
    installPrompt.id = 'install-prompt';
    installPrompt.innerHTML = `
        <p>Pasang Zorey AI di perangkat Anda?</p>
        <button id="install-confirm">Pasang</button>
        <button id="install-cancel">Nanti</button>
    `;
    document.body.appendChild(installPrompt);
    
    document.getElementById('install-confirm').addEventListener('click', installApp);
    document.getElementById('install-cancel').addEventListener('click', hideInstallPrompt);
}

function installApp() {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted install');
        }
        deferredPrompt = null;
        hideInstallPrompt();
    });
}

function hideInstallPrompt() {
    const prompt = document.getElementById('install-prompt');
    if (prompt) prompt.remove();
}

// Sembunyikan loading page setelah 3 detik
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-page').style.display = 'none';
    }, 3000);
});
