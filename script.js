class ZoreyAI {
    constructor() {
        this.initElements();
        this.setupEventListeners();
        this.loadPreferences();
    
      // Di dalam class ZoreyAI
    async getAIResponse(prompt) {
    const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer GEMMA_API_KEY'
        },
        body: JSON.stringify({ prompt })
    });
    return response.json();
}
  }
}

    initElements() {
        this.elements = {
            userInput: document.getElementById('user-input'),
            sendBtn: document.getElementById('send-btn'),
            chatContainer: document.getElementById('chat-container'),
            darkModeBtn: document.getElementById('darkmode-btn'),
            shareBtn: document.getElementById('share-btn')
        };
    }

    setupEventListeners() {
        // Kirim pesan
        this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
        this.elements.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Dark Mode
        this.elements.darkModeBtn.addEventListener('click', () => this.toggleDarkMode());

        // Share Chat
        this.elements.shareBtn.addEventListener('click', () => this.shareChat());
    }

    sendMessage() {
        const message = this.elements.userInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.elements.userInput.value = '';
        
        // Simulasi AI typing
        setTimeout(() => {
            this.addMessage("Maaf, fitur API sedang dalam pengembangan. Ini hanya simulasi balasan.", 'ai');
        }, 800);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message message`;
        messageDiv.textContent = text;
        this.elements.chatContainer.appendChild(messageDiv);
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    }

    toggleDarkMode() {
        document.body.dataset.theme = 
            document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', document.body.dataset.theme);
    }

    shareChat() {
        const messages = Array.from(document.querySelectorAll('.message'))
            .map(msg => `${msg.classList.contains('user-message') ? 'Anda' : 'Zorey AI'}: ${msg.textContent}`)
            .join('\n\n');
        
        if (navigator.share) {
            navigator.share({
                title: 'Chat dengan Zorey AI',
                text: messages
            }).catch(err => {
                console.error('Error sharing:', err);
                this.copyToClipboard(messages);
            });
        } else {
            this.copyToClipboard(messages);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => alert('Chat berhasil disalin!'))
            .catch(err => console.error('Gagal menyalin:', err));
    }

    loadPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.dataset.theme = savedTheme;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ZoreyAI();
});
