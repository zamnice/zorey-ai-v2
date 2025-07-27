class ZoreyAI {
            constructor() {
                // API Configuration
                this.API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemma-pro:generateContent";
                this.API_KEY = process.env.GEMMA_API_KEY || this.loadApiKeyFromStorage();
                
                // App State
                this.state = {
                    currentLanguage: 'id',
                    darkMode: false,
                    chatHistory: [],
                    deferredPrompt: null,
                    isTyping: false
                };

                // DOM Elements
                this.elements = {
                    app: document.getElementById('app'),
                    welcomeScreen: document.getElementById('welcome-screen'),
                    chatContainer: document.getElementById('chat-container'),
                    userInput: document.getElementById('user-input'),
                    sendBtn: document.getElementById('send-btn'),
                    newChatBtn: document.getElementById('new-chat-btn'),
                    darkModeBtn: document.getElementById('darkmode-btn'),
                    shareBtn: document.getElementById('share-btn'),
                    installPrompt: document.getElementById('install-prompt'),
                    installConfirm: document.getElementById('install-confirm'),
                    installCancel: document.getElementById('install-cancel'),
                    toast: document.getElementById('toast')
                };

                // Initialize
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.loadPreferences();
                this.registerServiceWorker();
                this.setupInstallPrompt();
                
                // Check for API key
                if (!this.API_KEY) {
                    this.showToast('API Key tidak ditemukan. Beberapa fitur mungkin terbatas.');
                }
            }

            setupEventListeners() {
                // Send Message
                this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
                this.elements.userInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });

                // Quick Actions
                document.querySelectorAll('.quick-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const prompt = e.currentTarget.getAttribute('data-prompt');
                        this.elements.userInput.value = prompt;
                        this.sendMessage();
                    });
                });

                // Header Buttons
                this.elements.newChatBtn.addEventListener('click', () => this.startNewChat());
                this.elements.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());
                this.elements.shareBtn.addEventListener('click', () => this.shareChat());

                // Install Prompt
                this.elements.installConfirm.addEventListener('click', () => this.installApp());
                this.elements.installCancel.addEventListener('click', () => 
