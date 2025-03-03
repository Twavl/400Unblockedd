// Game URLs and configurations
const gameURLs = {
    'slope': 'https://slope-game.github.io/',
    '2048': 'https://play2048.co/',
    'tetris': 'https://tetris.com/play-tetris',
    'snake': 'https://playsnake.org/',
    'tunnel-rush': 'https://tunnel-rush.io/',
    'run3': 'https://run3.io/',
    'minesweeper': 'https://minesweeper.online/',
    'sudoku': 'https://sudoku.com/'
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
