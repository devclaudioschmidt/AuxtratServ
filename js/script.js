/**
 * Main Script for AuxTrat
 */

document.addEventListener('DOMContentLoaded', async () => {
    
    // Function to load external HTML components
    const loadComponent = async (id, filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Could not fetch ${filePath}`);
            const html = await response.text();
            document.getElementById(id).innerHTML = html;
        } catch (error) {
            console.error('Error loading component:', error);
            document.getElementById(id).innerHTML = `<p style="color:red; text-align:center; padding: 2rem;">Erro ao carregar componente. Se você abriu o index.html direto pelo explorador de arquivos (file://), precisa de um servidor local como o 'Live Server' do VSCode ou XAMPP devido às regras de CORS de navegadores locais.</p>`;
        }
    };

    // Load Header and Footer
    await loadComponent('header-placeholder', './components/header.html');
    await loadComponent('footer-placeholder', './components/footer.html');

    // Initialize Interactivity AFTER DOM injection
    initializeInteractions();
});

function initializeInteractions() {
    // 1. Sticky Header Functionality
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navbar = document.getElementById('navbar');
    
    if (mobileMenuBtn && navbar) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        const toggleMenu = () => {
            navbar.classList.toggle('active');
            
            if (navbar.classList.contains('active')) {
                menuIcon.classList.remove('ph-list');
                menuIcon.classList.add('ph-x');
            } else {
                menuIcon.classList.remove('ph-x');
                menuIcon.classList.add('ph-list');
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking to a link internally (Mobile)
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu();
                }
            });
        });
    }

    // 3. Mobile Dropdown Toggle (Accordion style)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                const parent = toggle.closest('.nav-item-dropdown');
                parent.classList.toggle('active');
            }
        });
    });
}
