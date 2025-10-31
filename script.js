document.addEventListener('DOMContentLoaded', function() {

    // 1. Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 900,       // Duração da animação
        easing: 'ease-in-out', // Curva de animação
        once: true,          // Animar apenas uma vez
        offset: 100          // Inicia a animação 100px antes do elemento aparecer
    });

    // 2. Lógica para marcar link ativo na Navbar (Opcional)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') && a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 3. Lógica para Alternar Modo Claro/Escuro (Dark Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Pega o <html>

    // Verifica a preferência do usuário ou o que está salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Se não há preferência salva, verifica a preferência do sistema
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }


    themeToggle.addEventListener('click', () => {
        let currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').className = 'fas fa-sun'; // Ícone de sol para modo escuro
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').className = 'fas fa-moon'; // Ícone de lua para modo claro
        }
    });

    // 4. Lógica para Música Automática (com controle de Play/Pause/Mute)
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');

    // Tentar dar play na música automaticamente
    // OBS: Navegadores modernos podem bloquear autoplay sem interação do usuário.
    // O usuário pode precisar clicar no botão de play uma vez.
    backgroundMusic.volume = 0.3; // Define um volume inicial mais baixo
    backgroundMusic.play().catch(error => {
        console.log("Autoplay de áudio bloqueado. O usuário pode precisar interagir.", error);
        // Se autoplay falhar, pausamos e esperamos a interação do usuário
        backgroundMusic.pause();
        musicToggle.querySelector('i').className = 'fas fa-volume-mute'; // Mostra ícone de mudo
    });

    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.querySelector('i').className = 'fas fa-volume-up';
        } else {
            backgroundMusic.pause();
            musicToggle.querySelector('i').className = 'fas fa-volume-mute';
        }
    });

    // Extra: Se a música parar por algum motivo (ex: o navegador pausou), atualiza o ícone
    backgroundMusic.addEventListener('pause', () => {
        musicToggle.querySelector('i').className = 'fas fa-volume-mute';
    });
    backgroundMusic.addEventListener('play', () => {
        musicToggle.querySelector('i').className = 'fas fa-volume-up';
    });


    // 5. Lógica para o menu hamburguer (se for implementar no CSS/HTML)
    //    Não implementado nesta versão, mas ficaria aqui.
});