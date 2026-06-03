/**
 * GCI — Gykhamine Concept Investigation
 * Script UI & Navigation
 */

// ═══════════════════════════════════════════════════════════════
// 1. HAMBURGER — ouvre/ferme le menu mobile
// ═══════════════════════════════════════════════════════════════

function toggleMenu() {
    var menu = document.getElementById('navLinks');
    if (menu) menu.classList.toggle('open');
}

// ═══════════════════════════════════════════════════════════════
// 2. NAVIGATION — dropdowns, fermeture, état actif, clavier
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // --- Dropdowns mobile : ouvrir/fermer les sous-menus ---
    document.querySelectorAll('.nav-drop-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                var li = this.closest('.nav-dropdown');
                var wasOpen = li.classList.contains('open');
                // Fermer tous les dropdowns ouverts
                document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
                // Rouvrir si ce n'était pas déjà ouvert
                if (!wasOpen) li.classList.add('open');
            }
        });
    });

    // --- Fermer dropdowns et menu hamburger sur clic d'un lien final ---
    document.querySelectorAll('.nav-submenu a, .nav-links > li > a:not(.nav-drop-toggle)').forEach(function (link) {
        link.addEventListener('click', function () {
            var menu = document.getElementById('navLinks');
            if (menu) menu.remove('open');
            document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
        });
    });

    // --- CORRECTION : Fermer les dropdowns ET le menu mobile en cliquant hors de la nav ---
    document.addEventListener('click', function (e) {
        if (!e.target.closest('nav')) {
            var menu = document.getElementById('navLinks');
            if (menu) menu.classList.remove('open'); // Ferme le volet mobile
            document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); }); // Ferme les sous-menus
        }
    });

    // --- Fermer sur Echap ---
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            var menu = document.getElementById('navLinks');
            if (menu) menu.classList.remove('open');
            document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
        }
    });

    // --- Fermer le menu hamburger au redimensionnement vers grand écran ---
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            var menu = document.getElementById('navLinks');
            if (menu) menu.classList.remove('open');
            document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
        }
    });

    // --- Marquer le lien actif ---
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Smooth scroll sur les ancres (hors href="#" des dropdowns) ---
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            // Ignorer les toggles dropdown (href="#" seul)
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                var menu = document.getElementById('navLinks');
                if (menu) menu.classList.remove('open');
            }
        });
    });

});

// ═══════════════════════════════════════════════════════════════
// 3. LAZY LOADING — Images avec data-src
// ═══════════════════════════════════════════════════════════════

window.addEventListener('load', function () {
    var images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        });
        images.forEach(function (img) { observer.observe(img); });
    } else {
        images.forEach(function (img) { img.src = img.dataset.src; });
    }
});

// ═══════════════════════════════════════════════════════════════
// 4. BACK TO TOP
// ═══════════════════════════════════════════════════════════════

window.addEventListener('load', function () {
    var btn = document.createElement('button');
    btn.id = 'backToTop';
    btn.innerHTML = '↑';
    btn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:var(--gold);color:#fff;border:none;border-radius:50%;cursor:pointer;display:none;z-index:99;font-size:1.5rem;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,.2);transition:all .3s;';
    document.body.appendChild(btn);
    window.addEventListener('scroll', function () {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

console.log('✅ GCI Script initialized');
