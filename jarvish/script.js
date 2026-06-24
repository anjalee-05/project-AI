document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const micBtn = document.getElementById('mic-btn');
    const listeningIndicator = document.getElementById('listening-indicator');
    const jarvishOrb = document.getElementById('jarvish-orb');
    const userNameInput = document.getElementById('user-name-input');
    const userProfileName = document.querySelector('.user-profile span');

    function getCurrentName() {
        return userNameInput?.value.trim() || 'User';
    }

    function getCurrentInitial() {
        const name = getCurrentName();
        return name.charAt(0).toUpperCase();
    }

    function updateDisplayName() {
        const name = getCurrentName();
        if (userProfileName) userProfileName.textContent = name;
        const headerTitle = document.querySelector('.chat-header h1');
        if (headerTitle) headerTitle.textContent = `Good Evening, ${name}`;
    }

    if (userNameInput) {
        userNameInput.addEventListener('input', updateDisplayName);
    }

    updateDisplayName();

    // Speech Recognition Setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isRecording = false;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            isRecording = true;
            micBtn.classList.add('recording');
            listeningIndicator.classList.remove('hidden');
            if (jarvishOrb) jarvishOrb.classList.add('listening');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            sendMessage();
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            stopRecording();
        };

        recognition.onend = () => {
            stopRecording();
        };
    } else {
        micBtn.style.display = 'none'; // Hide mic if not supported
        console.warn("Speech Recognition API not supported in this browser.");
    }

    function toggleRecording() {
        if (!recognition) return;
        
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
        }
    }

    function stopRecording() {
        isRecording = false;
        micBtn.classList.remove('recording');
        listeningIndicator.classList.add('hidden');
        if (jarvishOrb) jarvishOrb.classList.remove('listening');
    }

    micBtn.addEventListener('click', toggleRecording);

    // Chat functionality
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'jarvish-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        avatarDiv.innerHTML = isUser ? getCurrentInitial() : '<i class="fa-solid fa-robot"></i>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        const p = document.createElement('p');
        p.textContent = text;
        contentDiv.appendChild(p);

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTo({
            top: messagesContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    // Advanced Jarvish Response Logic
    async function getJarvishResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        let response = "I am processing your request.";

        const name = getCurrentName();

        // Personalization and Basic Info
        if (/chat (everyone|everybody) (named|with name) /i.test(userMessage)) {
            const match = userMessage.match(/chat (?:everyone|everybody) (?:named|with name) (.+)/i);
            if (match && match[1]) {
                const targetName = match[1].replace(/[?.!]/g, '').trim();
                if (targetName) {
                    if (userNameInput) {
                        userNameInput.value = targetName;
                        updateDisplayName();
                    }
                    response = `Now chatting with everyone named ${targetName}.`;
                    return response;
                }
            }
        }
        else if (lowerMsg.startsWith('my name is ') || lowerMsg.startsWith('set name to ') || lowerMsg.startsWith('call me ')) {
            const namePart = userMessage.replace(/^(my name is |set name to |call me )/i, '').replace(/[?.!]/g, '').trim();
            if (namePart && userNameInput) {
                userNameInput.value = namePart;
                updateDisplayName();
                response = `Okay ${namePart}, I will address you by that name.`;
                return response;
            }
        }
        else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            response = `Hello ${name}! How can I assist you today?`;
        } else if (lowerMsg.includes('how are you')) {
            response = "I'm functioning perfectly. All systems are online.";
        } else if (lowerMsg.includes('what can you do')) {
            response = "I can chat with you, calculate math, tell jokes, and open any app or website you ask for.";
        } else if (lowerMsg.includes('time')) {
            response = `The current time is ${new Date().toLocaleTimeString()}.`;
        } else if (lowerMsg.includes('day') || lowerMsg.includes('date')) {
            response = `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
        } 
        
        // Play Media (YouTube)
        else if (/\b(play|song)\b/.test(lowerMsg) && /\byoutube\b/.test(lowerMsg)) {
            let query = lowerMsg.replace(/.*\b(play|song)\b/, '').replace(/\byoutube\b.*/,'').trim();
            if (!query) {
                query = lowerMsg.replace(/\byoutube\b/, '').replace(/\b(play|song)\b/, '').trim();
            }
            if (!query) {
                query = 'music';
            }
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
            response = `Playing YouTube results for ${query}.`;
        }
        else if (lowerMsg.startsWith('play ')) {
            const query = lowerMsg.replace('play ', '').replace(/[.,!?]+$/, '').trim();
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
            response = `Searching YouTube for ${query}.`;
        }
        // App Openers (URI Schemes & Websites)
        else if (lowerMsg.startsWith('open ') || lowerMsg.startsWith('one ')) {
            let app = lowerMsg.replace('open ', '').replace('one ', '').replace(/[.,!?]+$/, '').trim();
            // Extract just the primary app/site name (e.g. "open youtube and sing" -> "youtube")
            const site = app.split(' ')[0];
            const cleanSite = site.replace(/[^a-z0-9-]/g, '');

            const uriSchemes = {
                'whatsapp': 'whatsapp://'
            };
            
            if (uriSchemes[cleanSite]) {
                window.location.href = uriSchemes[cleanSite];
                response = `Opening ${cleanSite} on your device.`;
            } else {
                // Fallback to website
                window.open(`https://www.${cleanSite}.com`, '_blank');
                response = `Opening ${cleanSite} in your browser.`;
            }
        } 
        
        // Math Calculator
        else if (lowerMsg.includes('calculate') || lowerMsg.includes('what is')) {
            try {
                // Extract math expression and remove unsafe characters
                const expr = lowerMsg.replace('calculate', '').replace('what is', '').trim().replace(/[^\d\+\-\*\/\.\(\)\s]/g, '');
                if (expr) {
                    const result = new Function('return ' + expr)();
                    response = `The answer is ${result}.`;
                } else {
                    response = "Please provide a valid math expression.";
                }
            } catch (e) {
                response = "I couldn't calculate that. Please try again.";
            }
        } 
        
        // Joke API
        else if (lowerMsg.includes('joke')) {
            try {
                const res = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode&type=single');
                const data = await res.json();
                response = data.joke || "Why did the robot cross the road? To get to the other server.";
            } catch (e) {
                response = "I'm having trouble connecting to my joke database.";
            }
        } 
        
        // Quote API
        else if (lowerMsg.includes('quote') || lowerMsg.includes('inspire')) {
            try {
                const res = await fetch('https://api.quotable.io/random');
                const data = await res.json();
                response = `${data.content} — ${data.author}`;
            } catch (e) {
                response = "The best way to predict the future is to invent it.";
            }
        } 
        
        // Coin Flip & Dice Roll
        else if (lowerMsg.includes('flip') && lowerMsg.includes('coin')) {
            response = Math.random() < 0.5 ? "It's Heads." : "It's Tails.";
        } else if (lowerMsg.includes('roll') && lowerMsg.includes('dice')) {
            response = `You rolled a ${Math.floor(Math.random() * 6) + 1}.`;
        }
        
        // Smart Search Fallback
        else if (lowerMsg.startsWith('search for ') || lowerMsg.startsWith('google ')) {
            const query = lowerMsg.replace('search for ', '').replace('google ', '').trim();
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            response = `I searched Google for ${query}.`;
        } 
        
        // Generic Fallback
        else {
            const genericResponses = [
                "That's interesting. Tell me more.",
                "I've noted that down.",
                "How can I assist you further with that?",
                "I don't have a specific answer, but I'm learning every day."
            ];
            response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        }

        return response;
    }

    async function sendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        // Add user message
        addMessage(text, true);
        chatInput.value = '';

        try {
            const response = await getJarvishResponse(text);
            addMessage(response, false);
            speak(response);
        } catch (e) {
            console.error("Error getting response:", e);
        }
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial greeting sound
    setTimeout(() => {
        // We usually don't auto-speak without user interaction, but can be added here if desired.
    }, 1000);
});
