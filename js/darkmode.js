// Функция для переключения темного режима
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Функция для загрузки контента страницы
function loadPage(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, 'text/html');
            var newContent = doc.getElementById('content');
            if (newContent) {
                document.getElementById('content').innerHTML = newContent.innerHTML;
            } else {
                document.getElementById('content').innerHTML = xhr.responseText;
            }
            history.pushState(null, '', url);
        } else {
            console.error('Ошибка загрузки страницы');
        }
    };
    
    xhr.onerror = function() {
        console.error('Ошибка сети');
    };
    
    xhr.send();
}

// Обработчик клика по ссылкам
function handleNavigation(event) {
    var target = event.target.closest('a');  // Находим ближайший родительский элемент <a>
    if (target && target.getAttribute('href')) {
        event.preventDefault();
        var url = target.getAttribute('href');
        loadPage(url);
    }
}

// Добавляем обработчик для всего документа, включая динамически загруженный контент
document.addEventListener('click', handleNavigation);

// Обработчик события popstate
window.addEventListener('popstate', function(event) {
    loadPage(location.pathname);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Применение темного режима, если он был включен ранее
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Загрузка начальной страницы
    loadPage(window.location.pathname);
});