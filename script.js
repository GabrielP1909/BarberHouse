// JavaScript para funcionalidades do site
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Login Modal
    const loginButton = document.getElementById('login-button'); // Mantido
    const loginModal = document.getElementById('login-modal');
    const closeLoginModal = document.getElementById('close-login-modal');
    
    if (loginButton) { // Check if element exists on the page
        loginButton.addEventListener('click', function() {
            loginModal.classList.remove('hidden');
        });
    }
    
    if (closeLoginModal) { // Check if element exists on the page
        closeLoginModal.addEventListener('click', function() {
            loginModal.classList.add('hidden');
        });
    }
    
    // Show Register Form
    const showRegister = document.getElementById('show-register');
    const registerModal = document.getElementById('register-modal');
    const showLogin = document.getElementById('show-login');
    
    if (showRegister) { // Check if element exists on the page
        showRegister.addEventListener('click', function() {
            loginModal.classList.add('hidden');
            registerModal.classList.remove('hidden');
        });
    }
    
    if (showLogin) { // Check if element exists on the page
        showLogin.addEventListener('click', function() {
            registerModal.classList.add('hidden');
            loginModal.classList.remove('hidden');
        });
    }
    
    // Close Register Modal
    const closeRegisterModal = document.getElementById('close-register-modal');
    
    if (closeRegisterModal) { // Check if element exists on the page
        closeRegisterModal.addEventListener('click', function() {
            registerModal.classList.add('hidden');
        });
    }
    
    // Booking Modal
    const bookButton = document.getElementById('book-button');
    const bookingModal = document.getElementById('booking-modal');
    const closeBookingModal = document.getElementById('close-booking-modal');
    
    if (bookButton) { // Check if element exists on the page
        bookButton.addEventListener('click', function() {
            bookingModal.classList.remove('hidden');
        });
    }
    
    if (closeBookingModal) { // Check if element exists on the page
        closeBookingModal.addEventListener('click', function() {
            bookingModal.classList.add('hidden');
        });
    }
    
    // Product Modal
    const productModal = document.getElementById('product-modal');
    const closeProductModal = document.getElementById('close-product-modal');
    
    // Example of opening product modal (you would add click events to your product cards)
    // This now targets product cards specifically, not all images
    document.querySelectorAll('.product-card .card-image').forEach(img => {
        img.addEventListener('click', function() {
            if (productModal) { // Ensure modal exists
                productModal.classList.remove('hidden');
            }
        });
    });
    
    if (closeProductModal) { // Check if element exists on the page
        closeProductModal.addEventListener('click', function() {
            productModal.classList.add('hidden');
        });
    }
    
    // Shopping Cart Modal
    const cartModal = document.getElementById('cart-modal');
    const closeCartModal = document.getElementById('close-cart-modal');
    
    // Example of opening cart modal (you would add this to your cart button)
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => { // Target specific add to cart buttons
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            if (cartModal) { // Ensure modal exists
                cartModal.classList.remove('hidden');
            }
        });
    });
    
    if (closeCartModal) { // Check if element exists on the page
        closeCartModal.addEventListener('click', function() {
            cartModal.classList.add('hidden');
        });
    }
    
    // Form Submissions
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented here');
            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true'); 
            if (loginModal) loginModal.classList.add('hidden');
            // After login, re-evaluate the page state
            handleUnitSelectionVisibility();
        });
    }
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration functionality would be implemented here');
            // Simulate successful registration and login
            localStorage.setItem('isLoggedIn', 'true'); 
            if (registerModal) registerModal.classList.add('hidden');
            // After registration, re-evaluate the page state
            handleUnitSelectionVisibility();
        });
    }
    
    // Smooth scrolling for anchor links (only for index.html)
    // This logic needs to be aware of the current page
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }
    
    // Active nav link highlighting
    // This needs to handle both single-page and multi-page navigation
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // For links to other pages (like produtos.html)
        if (linkHref && linkHref.includes('.html')) {
            if (currentPath.includes(linkHref)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        } 
        // For anchor links on the same page (index.html)
        else if (currentPath === '/' || currentPath.includes('index.html')) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.offsetTop - 100; // Offset for fixed header
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    // Apenas adicione a classe 'active' se a seção não estiver oculta
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && !section.classList.contains('hidden')) {
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    }
                });
            });
            // Handle initial active state for index.html
            if (linkHref === '#') { // Assuming '#' is for 'Início'
                if (window.scrollY < 100) { // If at the top of the page
                    link.classList.add('active');
                }
            }
        }
    });
    
    // Add to cart functionality (simplified for demonstration)
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            alert(`Added to cart: ${productName} - ${productPrice}`);
            if (cartModal) cartModal.classList.remove('hidden'); 
        });
    });
    
    // Service selection in booking modal
    document.querySelectorAll('.service-item').forEach(service => { 
        service.addEventListener('click', function() {
            document.querySelectorAll('.service-item').forEach(s => {
                s.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // Update summary
            const serviceSummary = document.querySelector('.service-summary');
            const totalPrice = document.querySelector('.total-price');
            if (serviceSummary) serviceSummary.textContent = this.querySelector('.service-name').textContent;
            if (totalPrice) totalPrice.textContent = this.querySelector('.service-price').textContent;
        });
    });
    
    // Barber selection in booking modal
    document.querySelectorAll('.barber-item').forEach(barber => {
        barber.addEventListener('click', function() {
            document.querySelectorAll('.barber-item').forEach(b => {
                b.classList.remove('selected');
            });
            this.classList.add('selected');

            // Update summary
            const barberSummary = document.querySelector('.barber-summary');
            if (barberSummary) barberSummary.textContent = this.querySelector('.barber-name').textContent;
        });
    });
    
    // Time slot selection in booking modal
    document.querySelectorAll('.time-slot-button').forEach(slot => { 
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot-button').forEach(s => {
                s.classList.remove('selected');
            });
            
            this.classList.add('selected');
            
            // Update selected time in summary
            const timeSummary = document.querySelector('.time-summary');
            if (timeSummary) timeSummary.textContent = this.textContent;
        });
    });

    // Date selection in booking modal (simple update for summary)
    const bookingDateInput = document.querySelector('.booking-modal input[type="date"]');
    if (bookingDateInput) {
        bookingDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const formattedDate = selectedDate.toLocaleDateString('pt-BR');
            const dateSummary = document.querySelector('.date-summary');
            if (dateSummary) dateSummary.textContent = formattedDate;
        });
    }
    
    // Confirm booking
    const confirmBookingButton = document.querySelector('.booking-modal .btn-primary');
    if (confirmBookingButton) {
        confirmBookingButton.addEventListener('click', function() {
            if (bookingModal) bookingModal.classList.add('hidden');
            alert('Agendamento confirmado! Você receberá uma confirmação por WhatsApp.');
        });
    }
    
    // Cart functionality (Finalizar Compra)
    const cartCheckoutButton = document.querySelector('#cart-modal .cart-checkout-button');
    if (cartCheckoutButton) {
        cartCheckoutButton.addEventListener('click', function() {
            if (cartModal) cartModal.classList.add('hidden');
            alert('Checkout completo! Obrigado por sua compra.');
        });
    }

    // Product modal image gallery (simple functionality)
    document.querySelectorAll('.product-thumbnails .thumbnail-image').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const mainImage = document.querySelector('.product-main-image');
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
        });
    });

    // Quantity selector in product modal
    const quantityDisplay = document.querySelector('.quantity-display');
    if (quantityDisplay) {
        document.querySelectorAll('.quantity-button').forEach(button => {
            button.addEventListener('click', function() {
                let currentQuantity = parseInt(quantityDisplay.textContent);
                if (this.textContent === '+') {
                    currentQuantity++;
                } else if (this.textContent === '-' && currentQuantity > 1) {
                    currentQuantity--;
                }
                quantityDisplay.textContent = currentQuantity;
            });
        });
    }

    // --- MODIFICAÇÕES AQUI ---

    // Função para verificar o estado de login e controlar a visibilidade das seções
    function handleInitialSectionVisibility() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Simula o estado de login

        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            const unidadesSection = document.getElementById('unidades');
            // Seleciona as seções que devem ser ocultadas/exibidas dinamicamente
            const dynamicSections = document.querySelectorAll('#servicos, #barbeiros, #produtos, #depoimentos, #cta');

            if (isLoggedIn) {
                // Se estiver logado, oculta unidades e mostra as seções dinâmicas
                unidadesSection.classList.add('hidden');
                dynamicSections.forEach(section => section.classList.remove('hidden'));
                // Rola para a seção de serviços
                document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
            } else {
                // Se não estiver logado, mostra unidades e oculta as seções dinâmicas
                unidadesSection.classList.remove('hidden');
                dynamicSections.forEach(section => section.classList.add('hidden'));
            }
        }
    }

    // Event listener para os botões "Escolher esta unidade"
    document.querySelectorAll('.unit-card .choose-unit-button').forEach(button => {
        button.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Verifica o estado de login

            if (!isLoggedIn) {
                // Se não estiver logado, exibe o modal de login
                loginModal.classList.remove('hidden');
            } else {
                // Se estiver logado, oculta a seção de unidades e mostra as seções dinâmicas
                document.getElementById('unidades').classList.add('hidden');
                document.querySelectorAll('#servicos, #barbeiros, #produtos, #depoimentos, #cta').forEach(section => {
                    section.classList.remove('hidden');
                });
                // Rola para a seção de serviços
                document.getElementById('servicos').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Chamada inicial para configurar a visibilidade ao carregar a página
    handleInitialSectionVisibility();
});
