// JavaScript para funcionalidades do site
document.addEventListener('DOMContentLoaded', function() {
    // --- Elementos Comuns ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const bookingModal = document.getElementById('booking-modal');
    const productModal = document.getElementById('product-modal');
    const cartModal = document.getElementById('cart-modal');

    const unidadesSection = document.getElementById('unidades');
    const dynamicSections = document.querySelectorAll('#servicos, #barbeiros, #produtos, #depoimentos, #cta');

    // Elementos do botão de login/logout
    const loginButtonHero = document.getElementById('login-button'); // Botão "Agendar Agora" na Hero Section
    const logoutButton = document.getElementById('logout-button'); // Botão de Logout desktop
    const logoutButtonMobile = document.getElementById('logout-button-mobile'); // Botão de Logout mobile

    // --- Funções Auxiliares para Modais ---
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('hidden');
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('hidden');
        }
    }

    // --- Lógica de Visibilidade de Seções Principais ---
    // showUnits: true para mostrar unidades, false para mostrar serviços/barbeiros/etc.
    function toggleMainSectionVisibility(showUnits) {
        // Apenas aplica a lógica se estiver na página inicial
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            if (unidadesSection && dynamicSections.length > 0) {
                if (showUnits) {
                    unidadesSection.classList.remove('hidden');
                    dynamicSections.forEach(section => section.classList.add('hidden'));
                    // Rola para a seção de unidades se ela for exibida
                    unidadesSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    unidadesSection.classList.add('hidden');
                    dynamicSections.forEach(section => section.classList.remove('hidden'));
                    // Rola para a seção de serviços se ela for exibida
                    const servicosSection = document.getElementById('servicos');
                    if (servicosSection) {
                        servicosSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        } else {
            // Em outras páginas (ex: produtos.html), a seção de unidades não deve aparecer
            if (unidadesSection) unidadesSection.classList.add('hidden');
            // E as seções dinâmicas devem estar sempre visíveis (se existirem)
            dynamicSections.forEach(section => section.classList.remove('hidden'));
        }
    }

    // --- Lógica de Visibilidade dos Botões de Login/Logout ---
    function updateLoginLogoutButtons() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        // Botão "Agendar Agora" na Hero Section
        if (loginButtonHero) {
            if (isLoggedIn) {
                loginButtonHero.classList.add('hidden'); // Esconde se logado
            } else {
                loginButtonHero.classList.remove('hidden'); // Mostra se deslogado
            }
        }

        // Botões de Logout na navegação
        if (logoutButton) {
            if (isLoggedIn) {
                logoutButton.classList.remove('hidden'); // Mostra se logado
            } else {
                logoutButton.classList.add('hidden'); // Esconde se deslogado
            }
        }
        if (logoutButtonMobile) {
            if (isLoggedIn) {
                logoutButtonMobile.classList.remove('hidden'); // Mostra se logado
            } else {
                logoutButtonMobile.classList.add('hidden'); // Esconde se deslogado
            }
        }
    }

    // --- Inicialização da Visibilidade na Carga da Página ---
    // Na página inicial, verifica o estado de login E se uma unidade já foi "escolhida" na sessão.
    // Em outras páginas, sempre mostra o conteúdo principal.
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const unitChosen = sessionStorage.getItem('unitChosen') === 'true'; 

        // Se não estiver logado OU se uma unidade não foi escolhida, mostra as unidades.
        // Caso contrário (logado E unidade escolhida), mostra as seções dinâmicas.
        if (!isLoggedIn || !unitChosen) {
            toggleMainSectionVisibility(true); // Mostra unidades
        } else {
            toggleMainSectionVisibility(false); // Mostra seções dinâmicas
        }
        updateLoginLogoutButtons(); // Atualiza a visibilidade dos botões ao carregar
    } else {
        // Para produtos.html, etc., garante que as seções dinâmicas estejam visíveis
        // e que a seção de unidades (se por algum motivo estiver lá) esteja oculta.
        toggleMainSectionVisibility(false); // Sempre mostra as seções dinâmicas
        updateLoginLogoutButtons(); // Atualiza a visibilidade dos botões ao carregar
    }

    // --- Event Listeners Globais ---

    // Mobile Menu Toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Login Modal
    const loginButton = document.getElementById('login-button'); // Este é o botão "Agendar Agora" na Hero
    const closeLoginModal = document.getElementById('close-login-modal');
    if (loginButton) loginButton.addEventListener('click', () => openModal(loginModal));
    if (closeLoginModal) closeLoginModal.addEventListener('click', () => closeModal(loginModal));

    // Register Modal
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const closeRegisterModal = document.getElementById('close-register-modal');
    if (showRegister) showRegister.addEventListener('click', function() { closeModal(loginModal); openModal(registerModal); });
    if (showLogin) showLogin.addEventListener('click', function() { closeModal(registerModal); openModal(loginModal); });
    if (closeRegisterModal) closeRegisterModal.addEventListener('click', () => closeModal(registerModal));

    // Booking Modal
    const bookButton = document.getElementById('book-button');
    const closeBookingModal = document.getElementById('close-booking-modal');
    if (bookButton) bookButton.addEventListener('click', () => openModal(bookingModal));
    if (closeBookingModal) closeBookingModal.addEventListener('click', () => closeModal(bookingModal));

    // Product Modal
    const closeProductModal = document.getElementById('close-product-modal');
    document.querySelectorAll('.product-card .card-image').forEach(img => {
        img.addEventListener('click', () => openModal(productModal));
    });
    if (closeProductModal) closeProductModal.addEventListener('click', () => closeModal(productModal));

    // Shopping Cart Modal
    const closeCartModal = document.getElementById('close-cart-modal');
    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que o clique no botão de adicionar ao carrinho feche o modal do produto, se houver
            openModal(cartModal);
        });
    });
    if (closeCartModal) closeCartModal.addEventListener('click', () => closeModal(cartModal));

    // --- Form Submissions ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality would be implemented here');
            localStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('unitChosen', 'true'); // Marca que a unidade foi "escolhida" via login
            closeModal(loginModal);
            toggleMainSectionVisibility(false); // Após login, mostra as seções dinâmicas
            updateLoginLogoutButtons(); // Atualiza a visibilidade dos botões após login
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration functionality would be implemented here');
            localStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('unitChosen', 'true'); // Marca que a unidade foi "escolhida" via registro
            closeModal(registerModal);
            toggleMainSectionVisibility(false); // Após registro, mostra as seções dinâmicas
            updateLoginLogoutButtons(); // Atualiza a visibilidade dos botões após registro
        });
    }

    // --- Botões de Navegação e Ações Específicas ---

    // Botões "Escolher esta unidade"
    document.querySelectorAll('.unit-card .choose-unit-button').forEach(button => {
        button.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                openModal(loginModal);
            } else {
                sessionStorage.setItem('unitChosen', 'true'); // Marca que a unidade foi escolhida
                toggleMainSectionVisibility(false); // Se logado, mostra as seções dinâmicas
            }
        });
    });

    // Botão "Unidades" na navegação (Desktop e Mobile)
    const backToUnitsButton = document.getElementById('back-to-units-button');
    const backToUnitsButtonMobile = document.getElementById('back-to-units-button-mobile');

    function handleBackToUnits(e) {
        e.preventDefault();
        // Se já estiver na index.html, apenas alterna a visibilidade
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            sessionStorage.removeItem('unitChosen'); // Remove o estado de unidade escolhida para forçar a exibição das unidades
            toggleMainSectionVisibility(true); // Mostra a seção de unidades
        } else {
            // Se estiver em outra página (ex: produtos.html), redireciona para a index.html
            // e a lógica de DOMContentLoaded na index.html cuidará da visibilidade inicial.
            sessionStorage.removeItem('unitChosen'); // Remove o estado de unidade escolhida antes de redirecionar
            window.location.href = 'index.html';
        }
        closeModal(mobileMenu); // Fecha o menu mobile, se aberto
    }

    if (backToUnitsButton) backToUnitsButton.addEventListener('click', handleBackToUnits);
    if (backToUnitsButtonMobile) backToUnitsButtonMobile.addEventListener('click', handleBackToUnits);

    // Botão de Logout (Desktop e Mobile)
    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn'); // Remove o estado de login
        sessionStorage.removeItem('unitChosen'); // Remove o estado de unidade escolhida
        alert('Você foi desconectado.');
        // Redireciona para a página inicial para reavaliar a visibilidade
        window.location.href = 'index.html'; // Isso vai recarregar a página e a lógica de inicialização cuidará da visibilidade
    }

    if (logoutButton) logoutButton.addEventListener('click', handleLogout);
    if (logoutButtonMobile) logoutButtonMobile.addEventListener('click', handleLogout);

    // --- Outras Funcionalidades Existentes ---

    // Smooth scrolling for anchor links (only for index.html)
    // MODIFICAÇÃO AQUI: Ajuste na lógica de rolagem para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Se o targetId for '#unidades' e já estiver na página inicial,
            // ou se for qualquer outro link de âncora na página inicial,
            // permite o comportamento padrão de rolagem.
            if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
                e.preventDefault(); // Previne o comportamento padrão apenas se estiver na index.html
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Se o link for para #unidades, garante que a seção de unidades esteja visível
                    if (targetId === '#unidades') {
                        sessionStorage.removeItem('unitChosen'); // Garante que as unidades sejam mostradas
                        toggleMainSectionVisibility(true);
                    }
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    closeModal(mobileMenu);
                }
            }
            // Se estiver em produtos.html e o link for para index.html#unidades,
            // o comportamento padrão de navegação para a âncora em outra página já funciona.
        });
    });

    // Active nav link highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        // Para links para outras páginas (como produtos.html)
        if (linkHref && linkHref.includes('.html')) {
            if (currentPath.includes(linkHref)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
        // Para links de âncora na mesma página (index.html)
        else if (currentPath === '/' || currentPath.includes('index.html')) {
            // Remove o listener de scroll para evitar múltiplos listeners
            // e gerencia o estado ativo com base na visibilidade das seções
            // (a lógica de scroll para active class é mais complexa com seções ocultas)
            // Por simplicidade, o 'Início' será ativo no topo e outros links de âncora
            // não terão destaque dinâmico por scroll se as seções estiverem ocultas.
            // Se precisar de destaque dinâmico para seções ocultas, a lógica precisa ser mais sofisticada.
            // MODIFICAÇÃO AQUI: Lógica para ativar o link "Início" quando a seção de unidades estiver visível
            if (linkHref === '#unidades') { // Agora o link "Início" aponta para #unidades
                if (unidadesSection && !unidadesSection.classList.contains('hidden')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            } else if (linkHref === '#') { // Se houver algum link '#' genérico, manter a lógica anterior
                if (window.scrollY < 100 && unidadesSection && !unidadesSection.classList.contains('hidden')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
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
            openModal(cartModal);
        });
    });

    // Service selection in booking modal
    document.querySelectorAll('.service-item').forEach(service => {
        service.addEventListener('click', function() {
            document.querySelectorAll('.service-item').forEach(s => { s.classList.remove('selected'); });
            this.classList.add('selected');
            const serviceSummary = document.querySelector('.service-summary');
            const totalPrice = document.querySelector('.total-price');
            if (serviceSummary) serviceSummary.textContent = this.querySelector('.service-name').textContent;
            if (totalPrice) totalPrice.textContent = this.querySelector('.service-price').textContent;
        });
    });

    // Barber selection in booking modal
    document.querySelectorAll('.barber-item').forEach(barber => {
        barber.addEventListener('click', function() {
            document.querySelectorAll('.barber-item').forEach(b => { b.classList.remove('selected'); });
            this.classList.add('selected');
            const barberSummary = document.querySelector('.barber-summary');
            if (barberSummary) barberSummary.textContent = this.querySelector('.barber-name').textContent;
        });
    });

    // Time slot selection in booking modal
    document.querySelectorAll('.time-slot-button').forEach(slot => {
        slot.addEventListener('click', function() {
            document.querySelectorAll('.time-slot-button').forEach(s => { s.classList.remove('selected'); });
            this.classList.add('selected');
            const timeSummary = document.querySelector('.time-summary');
            if (timeSummary) timeSummary.textContent = this.textContent;
        });
    });

    // Date selection in booking modal
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
            closeModal(bookingModal);
            alert('Agendamento confirmado! Você receberá uma confirmação por WhatsApp.');
        });
    }

    // Cart functionality (Finalizar Compra)
    const cartCheckoutButton = document.querySelector('#cart-modal .cart-checkout-button');
    if (cartCheckoutButton) {
        cartCheckoutButton.addEventListener('click', function() {
            closeModal(cartModal);
            alert('Checkout completo! Obrigado por sua compra.');
        });
    }

    // Product modal image gallery
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

    // --- Product Category Filtering ---
    const categoryButtons = document.querySelectorAll('.category-button');
    const productCategorySections = document.querySelectorAll('.product-category-section');
    const allProductCards = document.querySelectorAll('.product-card'); // Seleciona todos os cards de produto

    function filterProducts(category) {
        // Esconde todas as seções de categoria
        productCategorySections.forEach(section => {
            section.classList.add('hidden');
        });

        // Mostra a seção de categoria selecionada ou todas
        if (category === 'all') {
            productCategorySections.forEach(section => {
                section.classList.remove('hidden');
            });
        } else {
            const targetSection = document.getElementById(`category-${category}`);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        }

        // Atualiza a classe 'active' nos botões de categoria
        categoryButtons.forEach(button => {
            if (button.dataset.category === category) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Adiciona event listeners aos botões de categoria
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
        });
    });

    // Inicializa a página mostrando todos os produtos por padrão
    filterProducts('all');
});
