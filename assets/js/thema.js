document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    let isDark = true; // Tema oscuro por defecto

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;

        if (isDark) {
            // Tema oscuro
            transformToTheme(
                '#0a0a12',
                '#ffffff',
                'rgba(16, 16, 26, 0.25)',
                'rgba(20, 20, 35, 0.35)',
                "url('../images/dark-bg.jpg')" 
            );

            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        } else {
            // Tema claro
            transformToTheme(
                '#ffffff',
                '#0a0a12',
                'rgba(255, 255, 255, 0.8)',
                'rgba(240, 240, 255, 0.9)',
                "url('../images/withe-bg.jpg')" 
            );

            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    });

    function transformToTheme(bgColor, textColor, navBg, dropdownBg, bgImage) {
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--nav-bg', navBg);
        document.documentElement.style.setProperty('--dropdown-bg', dropdownBg);
        document.documentElement.style.setProperty('--bg-image', bgImage);

        if (isDark) {
            document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #0a0a12, #151530)');
            document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
            document.documentElement.style.setProperty('--text-description', 'rgba(255, 255, 255, 0.7)');
        } else {
            document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #ffffff, #f0f4ff)');
            document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
            document.documentElement.style.setProperty('--text-description', 'rgba(0, 0, 0, 0.7)');
        }

        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    }
});
