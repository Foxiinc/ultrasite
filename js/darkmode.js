
    function toggleDarkMode() {
        document.body.classList.toggle('bg-gray-800');
        document.body.classList.toggle('text-white');
        document.querySelectorAll('.bg-white').forEach(element => {
            element.classList.toggle('bg-gray-900');
            element.classList.toggle('text-white');
        });
        document.querySelectorAll('.text-gray-700').forEach(element => {
            element.classList.toggle('text-gray-300');
        });

        // Сохраняем состояние темы в localStorage
        if (document.body.classList.contains('bg-gray-800')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Восстанавливаем тему при загрузке страницы
    window.onload = function() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('bg-gray-800', 'text-white');
            document.querySelectorAll('.bg-white').forEach(element => {
                element.classList.add('bg-gray-900', 'text-white');
            });
            document.querySelectorAll('.text-gray-700').forEach(element => {
                element.classList.add('text-gray-300');
            });
        }
    }
