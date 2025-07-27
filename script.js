// Konfigurasi
const config = {
    apiKey = process.env.GEMMA_API_KEY
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemma-pro:generateContent'
};

// State Aplikasi
const state = {
    darkMode: false,
    isTyping: false
};

// Inisialisasi
document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
    checkDarkMode();
    setupInstallPrompt();
}

function setupEventListeners() {
    // Tombol Header
    document.getElementById('darkmode-btn').addEventListener('click', toggleDarkMode);
    document.getElementById('share-btn').addEventListener('click', shareChat);
    document.getElementById('translate-btn').addEventListener('click', toggleLanguage);
    
    // Input Area
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Quick Actions
    document.querySelectorAll('.quick-actions button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.getElementById('user-input').value = e.target.dataset.prompt;
            sendMessage();
        });
    });
    
    // Install Prompt
    document.getElementById('install-cancel').addEventListener('click', hideInstallPrompt);
    document.getElementById('install-confirm').addEventListener('click', installApp);
}

// Fungsi Chat
function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    showTyping();
    
    // Simulasi respon AI
    setTimeout(() => {
        hideTyping();
        addMessage("Ini adalah balasan simulasi AI.", 'ai');
    }, 1500);
}

function addMessage(text, sender) {
    const container = document.getElementById('chat-container');
    const messages = document.getElementById('chat-messages');
    
    if (container.style.display === 'none') {
        document.getElementById('welcome-screen').style.display = 'none';
        container.style.display = 'flex';
    }
    
    const msgElement = document.createElement('div');
    msgElement.className = `message ${sender}-message`;
    msgElement.textContent = text;
    
    messages.appendChild(msgElement);
    messages.scrollTop = messages.scrollHeight;
}

// Fungsi UI
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', state.darkMode);
}

function checkDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
}

function showTyping() {
    state.isTyping = true;
    document.getElementById('typing-indicator').style.display = 'flex';
}

function hideTyping() {
    state.isTyping = false;
    document.getElementById('typing-indicator').style.display = 'none';
}

// PWA Functions
function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setTimeout(() => {
            document.getElementById('install-prompt').style.display = 'flex';
        }, 5000);
    });
}

function hideInstallPrompt() {
    document.getElementById('install-prompt').style.display = 'none';
}

function installApp() {
    // Implementasi install PWA
    hideInstallPrompt();
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}
