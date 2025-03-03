// Game URLs and configurations
const gameURLs = {
    // Popular Games
    'slope': 'https://ubg77.github.io/game131014/slope/',
    '2048': 'https://funhtml5games.com/2048/index.html',
    'among-us': 'https://ubg77.github.io/game131014/among-us/',
    'fall-guys': 'https://ubg77.github.io/game131014/fall-guys/',
    'minecraft': 'https://classic.minecraft.net/',
    'subway-surfers': 'https://ubg77.github.io/game131014/subway-surfers-ny/',
    'geometry-dash': 'https://ubg77.github.io/game131014/geometry-dash/',
    'happy-wheels': 'https://ubg77.github.io/game131014/happy-wheels/',
    'crossy-road': 'https://ubg77.github.io/game131014/crossy-road/',
    'flappy-bird': 'https://ubg77.github.io/game131014/flappy-bird/',
    
    // Action Games
    'temple-run-2': 'https://ubg77.github.io/game131014/temple-run-2/',
    'basketball-stars': 'https://ubg77.github.io/game131014/basketball-stars/',
    'rocket-league': 'https://ubg77.github.io/game131014/rocket-league/',
    'run3': 'https://ubg77.github.io/edit/run-3/',
    'tunnel-rush': 'https://ubg77.github.io/game131014/tunnel-rush/',
    'vex': 'https://ubg77.github.io/game131014/vex/',
    'retro-bowl': 'https://ubg77.github.io/game131014/retro-bowl/',
    
    // Racing Games
    'moto-x3m': 'https://ubg77.github.io/game131014/moto-x3m/',
    'drive-mad': 'https://ubg77.github.io/game131014/drive-mad/',
    'hill-climb': 'https://ubg77.github.io/game131014/hill-climb-racing/',
    
    // Puzzle Games
    'tetris': 'https://ubg77.github.io/game131014/tetris/',
    'snake': 'https://www.google.com/fbx?fbx=snake_arcade',
    'wordle': 'https://www.nytimes.com/games/wordle/index.html',
    'candy-crush': 'https://ubg77.github.io/game131014/candy-crush/',
    'cut-the-rope': 'https://ubg77.github.io/game131014/cut-the-rope/',
    
    // Fighting Games
    'street-fighter': 'https://ubg77.github.io/game131014/street-fighter/',
    'mortal-kombat': 'https://ubg77.github.io/game131014/mortal-kombat/',
    
    // Sports Games
    'soccer-stars': 'https://ubg77.github.io/game131014/soccer-stars/',
    '8-ball-pool': 'https://ubg77.github.io/game131014/8-ball-pool/',
    'table-tennis': 'https://ubg77.github.io/game131014/table-tennis/',
    
    // Classic Games
    'pacman': 'https://ubg77.github.io/game131014/pacman/',
    'mario': 'https://ubg77.github.io/game131014/super-mario/',
    'sonic': 'https://ubg77.github.io/game131014/sonic/',
    'doom': 'https://ubg77.github.io/game131014/doom/',
    'donkey-kong': 'https://ubg77.github.io/game131014/donkey-kong/'
};

// Modal and game frame handling
const modal = document.getElementById('gameModal');
const gameFrame = document.getElementById('gameFrame');
const fullscreenBtn = document.querySelector('.fullscreen-btn');

// Play button click handlers
document.querySelectorAll('.play-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const gameId = e.target.getAttribute('data-game');
        if (gameURLs[gameId]) {
            gameFrame.src = gameURLs[gameId];
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        const gameContainer = document.querySelector('.game-frame-container');
        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.webkitRequestFullscreen) {
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) {
            gameContainer.msRequestFullscreen();
        }
    }
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGame();
    }
});

// Close game function
function closeGame() {
    modal.style.display = 'none';
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeGame();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const gameCards = document.querySelectorAll('.game-card');

function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    gameCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || category.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Game card hover effect
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add loading animation for game images
window.addEventListener('load', () => {
    const gameImages = document.querySelectorAll('.game-image img');
    gameImages.forEach(image => {
        image.style.opacity = '0';
        image.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
            image.style.opacity = '1';
        }, 300);
    });
});

// Mobile menu toggle (if needed for smaller screens)
function createMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.classList.add('mobile-menu-btn');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuButton.innerHTML = navLinks.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        if (!document.querySelector('.mobile-menu-btn')) {
            navbar.insertBefore(menuButton, navLinks);
        }
    }
}

// Call createMobileMenu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu); 
