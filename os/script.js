/**
 * GCI — Gykhamine Concept Investigation
 * Smart UI & Responsive Management
 * Gère les débordements, le responsive, et l'expérience utilisateur
 */

// ═══════════════════════════════════════════════════════════════
// 1. MENU HAMBURGER TOGGLE
// ═══════════════════════════════════════════════════════════════

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks?.classList.toggle('open');
}

// Fermer le menu en cliquant sur un lien
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('navLinks');
            if (menu && menu.classList.contains('open')) {
                menu.classList.remove('open');
            }
        });
    });
});

// ═══════════════════════════════════════════════════════════════
// 2. RESPONSIVE NAV BAR — Ajustement automatique
// ═══════════════════════════════════════════════════════════════

function adjustNavbar() {
    const nav = document.querySelector('nav');
    const navLinks = document.getElementById('navLinks');
    const navBurger = document.querySelector('.nav-burger');
    
    if (!nav || !navLinks) return;
    
    const windowWidth = window.innerWidth;
    
    // Sur petit écran : afficher le burger
    if (windowWidth <= 768) {
        if (navBurger) navBurger.style.display = 'flex';
        navLinks.style.display = 'none'; // caché par défaut
    }
    // Sur écran moyen (problématique) : gérer intelligemment
    else if (windowWidth <= 1200) {
        if (navBurger) navBurger.style.display = 'flex';
        navLinks.style.display = 'none';
    }
    // Sur grand écran : afficher tout normalement
    else {
        if (navBurger) navBurger.style.display = 'none';
        navLinks.style.display = 'flex';
        navLinks.classList.remove('open');
    }
}

// Appeler au chargement et au redimensionnement
window.addEventListener('load', adjustNavbar);
window.addEventListener('resize', adjustNavbar);

// ═══════════════════════════════════════════════════════════════
// 3. DETECTION OVERFLOW — Prévenir les débordements de texte
// ═══════════════════════════════════════════════════════════════

function preventOverflow() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const contentWidth = section.scrollWidth;
        const containerWidth = section.clientWidth;
        
        // Si le contenu dépasse, ajouter une classe pour compensation
        if (contentWidth > containerWidth) {
            section.classList.add('overflow-managed');
            section.style.overflowX = 'hidden';
        }
    });
    
    // Surveiller les héros spécialement
    const heroes = document.querySelectorAll('.hero');
    heroes.forEach(hero => {
        hero.style.overflowX = 'hidden';
        hero.style.overflowY = 'hidden';
    });
}

window.addEventListener('load', preventOverflow);
window.addEventListener('resize', preventOverflow);

// ═══════════════════════════════════════════════════════════════
// 4. TRUNCATE INTELLIGENT — Afficher/Masquer les longs textes
// ═══════════════════════════════════════════════════════════════

function handleTextTruncation() {
    const longTexts = document.querySelectorAll('p');
    
    longTexts.forEach(para => {
        // Si le texte contient des [...] troncatures
        if (para.textContent.includes('[...]')) {
            // Ajouter un bouton "Lire plus"
            const originalText = para.innerHTML;
            const truncated = originalText.includes('...');
            
            if (truncated && !para.querySelector('.expand-btn')) {
                const btn = document.createElement('button');
                btn.className = 'expand-btn';
                btn.textContent = 'Lire plus';
                btn.style.cssText = `
                    background: var(--gold);
                    color: #fff;
                    border: none;
                    padding: 5px 12px;
                    margin-top: 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 600;
                `;
                
                para.parentElement.insertBefore(btn, para.nextSibling);
                
                btn.addEventListener('click', function() {
                    para.style.display = para.style.display === 'none' ? 'block' : 'none';
                    btn.textContent = btn.textContent === 'Lire plus' ? 'Lire moins' : 'Lire plus';
                });
            }
        }
    });
}

window.addEventListener('load', handleTextTruncation);

// ═══════════════════════════════════════════════════════════════
// 5. SMOOTH SCROLL FIX — Corriger les scroll aux ancres
// ═══════════════════════════════════════════════════════════════

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Fermer le menu mobile si ouvert
            const menu = document.getElementById('navLinks');
            if (menu && menu.classList.contains('open')) {
                menu.classList.remove('open');
            }
        }
    }
});

// ═══════════════════════════════════════════════════════════════
// 6. NAVBAR ACTIVE STATE — Marquer le lien actif
// ═══════════════════════════════════════════════════════════════

function updateActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('load', updateActiveLink);

// ═════════════════════════════════════��═════════════════════════
// 7. PERFORMANCE — Lazy loading des images et contenus lourds
// ═══════════════════════════════════════════════════════════════

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazy-loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour anciens navigateurs
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

window.addEventListener('load', initLazyLoading);

// ═══════════════════════════════════════════════════════════════
// 8. BACK TO TOP — Bouton vers le haut (optionnel)
// ═══════════════════════════════════════════════════════════════

function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gold);
        color: #fff;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 99;
        font-size: 1.5rem;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

window.addEventListener('load', initBackToTop);

// ═══════════════════════════════════════════════════════════════
// 9. ACCESSIBILITY — Améliorer l'accessibilité
// ═══════════════════════════════════════════════════════════════

function improveAccessibility() {
    // Ajouter tabindex aux éléments interactifs
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (!btn.hasAttribute('tabindex')) {
            btn.setAttribute('tabindex', '0');
        }
    });
    
    // Clavier navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const menu = document.getElementById('navLinks');
            if (menu && menu.classList.contains('open')) {
                menu.classList.remove('open');
            }
        }
    });
}

window.addEventListener('load', improveAccessibility);

// ═══════════════════════════════════════════════════════════════
// 10. MONITOR LAYOUT ISSUES — Détecter les problèmes en temps réel
// ═══════════════════════════════════════════════════════════════

function monitorLayout() {
    // En développement : afficher les overflow
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', function() {
            console.log('🔍 Layout Monitor:');
            
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                const scrollWidth = el.scrollWidth;
                const clientWidth = el.clientWidth;
                
                if (scrollWidth > clientWidth) {
                    console.warn(`Overflow détecté sur:`, el, `Scroll: ${scrollWidth}px, Client: ${clientWidth}px`);
                }
            });
        });
    }
}

window.addEventListener('load', monitorLayout);

console.log('✅ GCI Script initialized');
