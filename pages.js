document.addEventListener('DOMContentLoaded', () => {
    loadContent('home');

    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('home');
    });

    document.getElementById('about-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('about');
    });

    document.getElementById('contact-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('contact');
    });
});

function loadContent(page) {
    console.log(`Пытаемся загрузить: ${page}.html`); // Отладка
    fetch(`${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = '<p>Ошибка загрузки контента.</p>';
            console.error(`Не удалось загрузить ${page}.html:`, error);
        });
}