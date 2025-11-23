window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.display = "none";
    }, 4000);
});

// --- EASTER EGG: BACKGROUND ANIMATION ---
let clickCount = 0;
let clickTimer = null;
const logo = document.getElementById('logo');

// Easter egg trigger: Click logo 3 times rapidly
logo?.addEventListener('click', () => {
    clickCount++;
    
    // Reset counter after 1 second of no clicks
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 1000);
    
    if (clickCount === 3) {
        activateEasterEggAnimation();
        clickCount = 0;
    }
});

// Alternative trigger: Press "ONLYAC" keys
const keySequence = ['O', 'N', 'L', 'Y', 'A', 'C'];
let keyIndex = 0;

window.addEventListener('keydown', (e) => {
    if (e.key.toUpperCase() === keySequence[keyIndex]) {
        keyIndex++;
        if (keyIndex === keySequence.length) {
            activateEasterEggAnimation();
            keyIndex = 0;
        }
    } else {
        keyIndex = 0;
    }
});

function activateEasterEggAnimation() {
    const bgAnimation = document.querySelector('.bg-animation');
    bgAnimation.classList.add('easter-egg-active');
    
    // Create burst of emoji/particles
    createEasterEggBurst();
    
    // Play sound effect if available (optional)
    playEasterEggSound();
    
    // Remove the easter egg effect after 15 seconds
    setTimeout(() => {
        bgAnimation.classList.remove('easter-egg-active');
    }, 15000);
}

function createEasterEggBurst() {
    const bgAnimation = document.querySelector('.bg-animation');
    const emojis = ['🎉', '🚀', '✨', '🎊', '💫', '⭐', '🌟', '🔥', '👾', '🎮', '🎪', '🎨', '🎭', '💎', '🌈'];
    
    // Create multiple bursts from center
    for (let i = 0; i < 30; i++) {
        const burst = document.createElement('div');
        burst.className = 'easter-egg-burst';
        burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Center of screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        burst.style.left = centerX + 'px';
        burst.style.top = centerY + 'px';
        burst.style.fontSize = (Math.random() * 40 + 20) + 'px';
        
        // Calculate explosion direction
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 200 + Math.random() * 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        burst.style.setProperty('--tx', tx + 'px');
        burst.style.setProperty('--ty', ty + 'px');
        burst.style.setProperty('--duration', (2 + Math.random() * 2) + 's');
        
        bgAnimation.appendChild(burst);
        
        // Remove burst element after animation completes
        setTimeout(() => burst.remove(), 4000);
    }
}

function playEasterEggSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Silently fail if audio context not available
    }
}

// --- MORE EASTER EGGS FOR OTHER SECTIONS ---

// Games Section: Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

window.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiEasterEgg() {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        gamesSection.classList.add('konami-mode');
        
        // Show secret message
        const message = document.createElement('div');
        message.className = 'konami-message';
        message.textContent = '🎮 KONAMI CODE ACTIVATED! 🎮\n\nYou\'ve unlocked INFINITE LIVES MODE! 👾';
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 4000);
        setTimeout(() => gamesSection.classList.remove('konami-mode'), 5000);
    }
}

// Team Section: Hover all member cards to reveal a secret message
let teamCardsHovered = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bento-item');
    const totalTeamCards = cards.length;
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            teamCardsHovered.add(index);
            
            // Check if all cards have been hovered
            if (teamCardsHovered.size === totalTeamCards) {
                activateTeamSecretMessage();
                teamCardsHovered.clear();
            }
        });
    });
});

function activateTeamSecretMessage() {
    const aboutSection = document.getElementById('about');
    const secretMessage = document.createElement('div');
    secretMessage.className = 'team-secret-message';
    secretMessage.innerHTML = `
        <div class="secret-content">
            <h3>🤫 Secret Unlocked! 🤫</h3>
            <p>"The real treasure was the chaos we made along the way."</p>
            <p style="font-size: 12px; margin-top: 10px;">- OnlyAc Squad</p>
        </div>
    `;
    aboutSection?.appendChild(secretMessage);
    
    setTimeout(() => secretMessage.remove(), 5000);
}

// Chill Zone: Double-click music bars for a beat drop animation
document.addEventListener('DOMContentLoaded', () => {
    const musicBars = document.querySelector('.music-bars');
    if (musicBars) {
        let doubleClickCount = 0;
        let doubleClickTimer = null;
        
        musicBars.addEventListener('click', () => {
            doubleClickCount++;
            clearTimeout(doubleClickTimer);
            doubleClickTimer = setTimeout(() => doubleClickCount = 0, 500);
            
            if (doubleClickCount === 2) {
                activateBeatDrop();
                doubleClickCount = 0;
            }
        });
    }
});

function activateBeatDrop() {
    const chillZone = document.getElementById('media-chillzone');
    if (chillZone) {
        chillZone.classList.add('beat-drop-mode');
        
        // Create beat drop particles
        for (let i = 0; i < 15; i++) {
            const drop = document.createElement('div');
            drop.className = 'beat-drop-particle';
            drop.innerHTML = '🎵';
            drop.style.left = Math.random() * 100 + '%';
            drop.style.top = '-50px';
            chillZone.appendChild(drop);
            
            setTimeout(() => drop.remove(), 2000);
        }
        
        setTimeout(() => {
            chillZone.classList.remove('beat-drop-mode');
        }, 2500);
    }
}

// Shoutouts: Type "LETSGOO" to unlock a special shoutout
const shoutoutCode = ['L', 'E', 'T', 'S', 'G', 'O', 'O'];
let shoutoutIndex = 0;

window.addEventListener('keydown', (e) => {
    if (e.key.toUpperCase() === shoutoutCode[shoutoutIndex]) {
        shoutoutIndex++;
        if (shoutoutIndex === shoutoutCode.length) {
            addSpecialShoutout();
            shoutoutIndex = 0;
        }
    } else {
        shoutoutIndex = 0;
    }
});

function addSpecialShoutout() {
    const shoutoutsFeed = document.getElementById('shoutoutsFeed');
    if (shoutoutsFeed) {
        const specialCard = document.createElement('div');
        specialCard.className = 'shoutout-card special-shoutout';
        specialCard.innerHTML = `
            <div class="shoutout-author">🤖 Secret Bot <i class="fas fa-robot"></i></div>
            <p>You've unlocked a hidden shoutout! Congratulations, you're officially part of the OnlyAc Elite! 🏆</p>
        `;
        shoutoutsFeed.insertBefore(specialCard, shoutoutsFeed.firstChild);
        
        setTimeout(() => specialCard.remove(), 6000);
    }
}

// --- DATA STRUCTURES ---
const QUIZ_QUESTIONS = [
    {
        type: 'quiz',
        question: "Which member is most likely to show up an hour late to a planned event?",
        options: ["Alex", "Sam", "Jordan", "Casey"],
        answer: "Jordan",
        joke: "It's always the photographer, fashionably delayed to capture the moment they finally arrive!"
    },
    {
        type: 'quiz',
        question: 'Who once famously said, "Is it a meal if it doesn\'t involve cheese?"',
        options: ["Alex", "Sam", "Jordan", "Casey"],
        answer: "Sam",
        joke: "A true foodie quote. Sam's spirit animal is cheddar."
    },
    {
        type: 'quiz',
        question: "What was the name of the bar we decided to 'never go to again' after the great karaoke incident?",
        options: ["The Blue Lagoon", "The Rusty Mug", "The Golden Mic", "The Purple Haze"],
        answer: "The Golden Mic",
        joke: "The Golden Mic incident is legendary. We all agreed to take that one to the grave."
    }
];

const TRUTH_DARE_DATA = {
    truths: [
        "What is the most embarrassing thing you've worn in public?",
        "What is one thing you secretly hope never changes about our squad?",
        "What's the biggest lie you've told to get out of a squad event?",
        "If you could trade lives with anyone in the squad for a day, who and why?",
        "What is your least favorite memory involving the group?"
    ],
    dares: [
        "Send a text message to a random contact saying 'The Eagle has landed' and show the reply.",
        "Do your best impression of another squad member and have the others guess who it is.",
        "Serenade the next person who walks by your window or door (or an imaginary person if you're alone).",
        "Change your profile picture to a photo chosen by the squad for 24 hours.",
        "Eat a spoonful of a condiment of the squad's choosing."
    ]
};

// State variables for the game
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let gameType = '';

// --- CORE FUNCTIONALITY ---

// Preloader Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
        }, 800);
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';

    // Create particles on theme change
    createParticles();
});

// Create floating particles
function createParticles() {
    const colors = ['#6366f1', '#ec4899', '#06b6d4', '#f59e0b'];
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animation = `particleFloat ${Math.random() * 3 + 3}s linear`;
        document.querySelector('.bg-animation').appendChild(particle);

        setTimeout(() => particle.remove(), 6000);
    }
}

// --- BENTO CARD 3D FLIP AND MOUSE TRACKING ---
document.querySelectorAll('.bento-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distX = (e.clientX - centerX) / (rect.width / 2);
        const distY = (e.clientY - centerY) / (rect.height / 2);
        
        // Subtle rotation: -5 to 5 degrees, card tilts TOWARDS mouse pointer
        const rotateY = Math.max(-5, Math.min(5, distX * 5));
        const rotateX = Math.max(-5, Math.min(5, distY * 5));
        
        // Apply CSS custom properties for smooth animation
        card.style.setProperty('--rotateX', `${rotateX}deg`);
        card.style.setProperty('--rotateY', `${rotateY}deg`);
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset rotation when mouse leaves
        card.style.setProperty('--rotateX', '0deg');
        card.style.setProperty('--rotateY', '0deg');
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');
    const themeToggle = document.querySelector('nav > .theme-toggle'); // Select the button from the main nav

    navLinks.classList.toggle('active');

    // Logic for button transition
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');

        // Move the theme toggle button into the mobile menu
        if (themeToggle) {
            navLinks.appendChild(themeToggle);
            themeToggle.style.display = 'flex'; // Ensure it's displayed inside the menu
            // Add a class to differentiate the dropdown button for CSS
            themeToggle.classList.add('dropdown-theme-toggle');
        }
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');

        // Move the theme toggle button back to the main nav
        const nav = document.querySelector('nav');
        if (themeToggle && nav.contains(navLinks)) {
            nav.insertBefore(themeToggle, document.querySelector('.menu-toggle'));
            themeToggle.style.display = ''; // Revert display style
            themeToggle.classList.remove('dropdown-theme-toggle');
        }
    }
}

// Smooth Scroll to Top (FAB)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth Scroll from Nav/CTA
// --- NAVBAR GLITCH EFFECT ---
const scrambleText = (element, originalText) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';
    const duration = 700; // Total animation time in milliseconds
    let startTime = null;
    let frame = 0;

    // Function to get a random character
    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

    // Core animation step
    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < duration) {
            let newText = '';
            for (let i = 0; i < originalText.length; i++) {
                // Determine how many characters to reveal based on time
                const progress = elapsed / duration;

                // Gradually transition from random to original characters
                if (i < progress * originalText.length) {
                    newText += originalText[i];
                } else {
                    newText += getRandomChar();
                }
            }
            element.textContent = newText;
            frame = requestAnimationFrame(animate);
        } else {
            // End state: ensure text is the original value
            element.textContent = originalText;
            cancelAnimationFrame(frame);
        }
    };

    frame = requestAnimationFrame(animate);
};

document.querySelectorAll('.hero-cards a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
});
});

document.querySelectorAll('.logo a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
});
});
// Smooth Scroll & Glitch Trigger
document.querySelectorAll('.nav-links a').forEach(anchor => {
    const originalText = anchor.textContent;
    let animationRunning = false;
    let animationFrame = null;

    // 1. Hover (Glitch Start)
    anchor.addEventListener('mouseenter', () => {
        if (animationRunning) return;

        animationRunning = true;

        // Use a wrapper function for the scramble to integrate better with mouse events
        const scrambleLoop = (timestamp) => {
            const duration = 1500; // Animation duration (1.5 seconds)

            let newText = '';
            let isFinished = true;

            for (let i = 0; i < originalText.length; i++) {
                // Randomly decide if a character should be the original or a random glitch
                if (Math.random() < 0.95) { // 95% chance to glitch
                    newText += originalText[i];
                    isFinished = false;
                } else {
                    newText += ' '; // Or use getRandomChar() for more aggressive glitch
                }
            }

            if (newText.trim() === originalText.trim()) {
                // If it coincidentally lands on the original too quickly, give it another shot
                if (Math.random() > 0.5) {
                    newText = newText.split('').map((char, index) => Math.random() < 0.2 ? chars[Math.floor(Math.random() * chars.length)] : originalText[index]).join('');
                }
            }

            anchor.textContent = newText;
            animationFrame = requestAnimationFrame(scrambleLoop);
        };

        // Instead of a sustained random glitch, let's use the controlled scrambleText for the effect
        scrambleText(anchor, originalText);

        anchor.setAttribute('data-original-text', originalText); // Store for reference
    });

    anchor.addEventListener('mouseleave', () => {
        // Since scrambleText has a fixed duration, this listener primarily handles cleanup
        anchor.textContent = originalText;
        animationRunning = false;
        cancelAnimationFrame(animationFrame);
    });

    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        anchor.textContent = originalText;

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        const navLinks = document.getElementById('navLinks');
        const menuIcon = document.getElementById('menuIcon');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});

// --- GALLERY FUNCTIONS ---

// Gallery Filter
function filterGallery(event, category) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.tab-btn');

    // Update active button state
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    } else {
        // Default 'All' button if event is null (initial load)
        document.querySelector('.gallery-tabs .tab-btn').classList.add('active');
    }

    // Filter visibility
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Gallery View Toggle (Grid/Masonry)
function setGalleryView(view) {
    const grid = document.getElementById('gallery-grid');
    const gridBtn = document.getElementById('grid-view-btn');
    const masonryBtn = document.getElementById('masonry-view-btn');

    grid.classList.remove('grid', 'masonry');
    gridBtn.classList.remove('active');
    masonryBtn.classList.remove('active');

    if (view === 'masonry') {
        grid.classList.add('masonry');
        masonryBtn.classList.add('active');
    } else {
        grid.classList.add('grid');
        gridBtn.classList.add('active');
    }
}

// Gallery Lightbox
function openLightbox(iconClass, title, description, date, imageSrc) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxBg = document.getElementById('lightboxBg');
    document.getElementById('lightbox-icon').className = 'lightbox-icon ' + iconClass;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;
    document.getElementById('lightbox-date').textContent = 'Date: ' + date;
    
    // Set the background image with opacity overlay
    if (imageSrc) {
        lightboxBg.style.backgroundImage = `url('${imageSrc}')`;
    }
    
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('imageLightbox').style.display = 'none';
}

// Initialize gallery view
document.addEventListener('DOMContentLoaded', () => {
    setGalleryView('grid'); // Set default view on load
    filterGallery(null, 'all'); // Ensure 'All' tab is active
});


// --- EVENTS/SHOUTOUTS FUNCTIONS ---

function rsvp(eventName) {
    alert(`🎉 RSVP received! You're confirmed for the ${eventName}! We'll send final details.`);
}

function addShoutout() {
    const nameInput = document.getElementById('shoutoutName');
    const messageInput = document.getElementById('shoutoutMessage');
    const name = nameInput.value || 'Anonymous Squad Member';
    const message = messageInput.value;

    if (message.trim() === '') {
        alert('Don\'t forget to type your message!');
        return;
    }

    const feed = document.getElementById('shoutoutsFeed');
    const card = document.createElement('div');
    card.className = 'shoutout-card';
    card.innerHTML = `
                <div class="shoutout-author">${name} <i class="fas fa-comment-dots"></i></div>
                <p>${message}</p>
            `;
    feed.insertBefore(card, feed.firstChild);

    nameInput.value = '';
    messageInput.value = '';
}

// --- GAMES FUNCTIONS ---

function closeGameModal() {
    document.getElementById('gameModal').style.display = 'none';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function openGameModal(type) {
    gameType = type;
    document.getElementById('gameModal').style.display = 'flex';
    const scoreElement = document.getElementById('game-score');
    const nextBtn = document.getElementById('next-btn');

    // Reset next button to its original state for quiz, in case it was used for dare mode
    nextBtn.innerHTML = 'Next Question <i class="fas fa-arrow-right"></i>';
    nextBtn.onclick = nextQuestion;

    // Handle Truth or Dare - MODIFIED
    if (type === 'dare') {
        scoreElement.textContent = 'Mode: Truth or Dare Generator';
        nextBtn.style.display = 'block';
        nextBtn.innerHTML = 'Generate Another! <i class="fas fa-sync-alt"></i>'; // Change text to be less final
        nextBtn.onclick = () => loadDare(true); // Call loadDare to generate a new T/D
        loadDare();
        return;
    }

    // Handle Quiz
    score = 0;
    currentQuestionIndex = 0;
    currentQuestions = shuffle(QUIZ_QUESTIONS.filter(q => q.type === type || type === 'quiz'));

    if (currentQuestions.length === 0) {
        alert('No questions available for this game type yet!');
        document.getElementById('gameModal').style.display = 'none';
        return;
    }

    scoreElement.textContent = `Score: 0 / 0`;
    loadQuestion();
}

function loadDare() {
    const qElement = document.getElementById('game-question');
    const optionsElement = document.getElementById('game-options');

    qElement.textContent = 'What do you choose?';
    optionsElement.innerHTML = '';

    // Truth Button
    const truthBtn = document.createElement('button');
    truthBtn.className = 'option-btn';
    truthBtn.textContent = 'Truth';
    truthBtn.onclick = () => showRandomDare('truth');
    optionsElement.appendChild(truthBtn);

    // Dare Button
    const dareBtn = document.createElement('button');
    dareBtn.className = 'option-btn';
    dareBtn.textContent = 'Dare';
    dareBtn.onclick = () => showRandomDare('dare');
    optionsElement.appendChild(dareBtn);
}

function showRandomDare(choice) {
    const data = choice === 'truth' ? TRUTH_DARE_DATA.truths : TRUTH_DARE_DATA.dares;
    const randomItem = data[Math.floor(Math.random() * data.length)];

    document.getElementById('game-question').textContent = `${choice.toUpperCase()}! ${randomItem}`;
    document.getElementById('game-options').innerHTML = '';

    const nextBtn = document.getElementById('next-btn');
    nextBtn.innerHTML = 'Generate Another!';
    nextBtn.onclick = () => loadDare();
}


function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const qData = currentQuestions[currentQuestionIndex];
    const qElement = document.getElementById('game-question');
    const optionsElement = document.getElementById('game-options');
    const nextBtn = document.getElementById('next-btn');

    // ⭐ CRITICAL FIX: Ensure the Next button handler is reset for quizzes
    nextBtn.onclick = nextQuestion;

    qElement.textContent = qData.question;
    optionsElement.innerHTML = '';
    nextBtn.style.display = 'none';

    document.getElementById('game-score').textContent = `Score: ${score} / ${currentQuestionIndex}`;

    qData.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, option, qData.answer, qData.joke);
        optionsElement.appendChild(btn);
    });
}

function checkAnswer(selectedButton, selectedOption, correctAnswer, joke) {
    const allOptions = document.querySelectorAll('.option-btn');
    const nextBtn = document.getElementById('next-btn');
    let isCorrect = false;

    allOptions.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
            if (btn === selectedButton) {
                score++;
                isCorrect = true;
            }
        } else {
            btn.classList.add('wrong');
        }
        btn.style.pointerEvents = 'none'; // Disable all options
    });

    // Update score display before moving on
    document.getElementById('game-score').textContent = `Score: ${score} / ${currentQuestionIndex + 1}`;

    // FIX: Use innerHTML to render the icon correctly
    nextBtn.innerHTML = isCorrect ? `Correct! ${joke} - Next <i class="fas fa-arrow-right"></i>` : `Wrong! The answer was ${correctAnswer}. - Next <i class="fas fa-arrow-right"></i>`;
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

function endGame() {
    const totalQuestions = currentQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    let resultMessage = '';

    if (percentage === 100) {
        resultMessage = '🤯 PERFECT SCORE! You are the ultimate Squad Master!';
    } else if (percentage >= 75) {
        resultMessage = '👍 Elite Knowledge! You know the squad well.';
    } else if (percentage >= 50) {
        resultMessage = '🤔 Decent attempt! You need to pay closer attention!';
    } else {
        resultMessage = '🚩 Rookie Status! Time for a squad refresher course.';
    }

    document.getElementById('game-question').textContent = resultMessage;
    document.getElementById('game-options').innerHTML = '';
    // FIX: Use innerHTML to render the icon correctly
    document.getElementById('next-btn').innerHTML = 'Play Again! <i class="fas fa-redo-alt"></i>';
    document.getElementById('next-btn').onclick = () => { document.getElementById('gameModal').style.display = 'none'; };
}

// --- COUNTDOWN TIMER ---
// function updateCountdown() {
//     // Target date: December 20, 2025
//     const eventDate = new Date('2025-12-20T00:00:00').getTime();
//     const now = new Date().getTime();
//     const distance = eventDate - now;

//     const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     if (distance < 0) {
//         document.querySelector('.countdown-container h3').textContent = '🎉 The Reunion is ON!';
//         document.getElementById('days').textContent = '0';
//         document.getElementById('hours').textContent = '0';
//         document.getElementById('minutes').textContent = '0';
//         document.getElementById('seconds').textContent = '0';
//     } else {
//         document.getElementById('days').textContent = days;
//         document.getElementById('hours').textContent = hours;
//         document.getElementById('minutes').textContent = minutes;
//         document.getElementById('seconds').textContent = seconds;
//     }
// }

// // Start countdown timer
// setInterval(updateCountdown, 1000);
// updateCountdown(); 

// --- MEDIA/CHILL ZONE FUNCTIONS ---
const MEMES = document.querySelectorAll('.meme-item');
let currentMemeIndex = 0;

function nextMeme() {
    if (MEMES.length === 0) return;

    // Remove active class from current meme
    MEMES[currentMemeIndex].classList.remove('active');

    // Calculate next index (loops back to 0)
    currentMemeIndex = (currentMemeIndex + 1) % MEMES.length;

    // Add active class to new current meme
    MEMES[currentMemeIndex].classList.add('active');
}

// --- EASTER EGG BACKGROUND ANIMATION ---
let easterEggActive = false;
let easterEggClickCount = 0;
const EASTER_EGG_THRESHOLD = 7; // Number of clicks to trigger

const homeSection = document.getElementById('home');
const easterEggContainer = document.getElementById('easterEggContainer');

function triggerEasterEgg() {
    if (easterEggActive) return;
    
    easterEggActive = true;
    homeSection.classList.add('easter-egg-active');
    homeSection.classList.add('easter-egg-bg-pulse');
    
    // Create burst of particles
    for (let i = 0; i < 25; i++) {
        createParticle();
    }
    
    // Reset after animation
    setTimeout(() => {
        easterEggActive = false;
        homeSection.classList.remove('easter-egg-active');
        homeSection.classList.remove('easter-egg-bg-pulse');
    }, 3000);
}

function createParticle() {
    const container = document.getElementById('easterEggContainer');
    const isHeart = Math.random() > 0.5;
    const particle = document.createElement('div');
    
    particle.className = isHeart ? 'particle heart' : 'particle star';
    particle.textContent = isHeart ? '❤️' : '✨';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.5 + 200;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    // Random burst direction
    const angle = (Math.random() * Math.PI * 2);
    const velocity = 50 + Math.random() * 150;
    const tx = Math.cos(angle) * velocity;
    const ty = (Math.sin(angle) - 1.5) * velocity;
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => particle.remove(), 2000);
}

// Click on title to trigger easter egg
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.cursor = 'pointer';
        heroTitle.addEventListener('click', () => {
            easterEggClickCount++;
            
            // Visual feedback
            heroTitle.style.transform = 'scale(0.98)';
            setTimeout(() => {
                heroTitle.style.transform = 'scale(1)';
            }, 100);
            
            if (easterEggClickCount >= EASTER_EGG_THRESHOLD) {
                triggerEasterEgg();
                easterEggClickCount = 0;
                
                // Add celebration message (hidden)
                console.log('🎉 You found the easter egg! Amazing!');
            }
        });
    }
});

