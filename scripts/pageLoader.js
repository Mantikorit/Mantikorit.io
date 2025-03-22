document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    if (!content) return;

    let pageCache = {}; // Кеш для загруженных страниц

    function loadPage(urlWithHash) {
        const [url, hash] = urlWithHash.split('#');

        if (pageCache[url]) {
            content.innerHTML = pageCache[url];
            return;
        }

        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`Ошибка ${response.status}`))
            .then(data => {
                pageCache[url] = data;
                content.innerHTML = data;
                if (hash) {
                    setTimeout(() => {
                        const target = document.getElementById(hash);
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            })
            .catch(error => {
                content.innerHTML = `<p>Ошибка загрузки: ${error}</p>`;
            });
    }

    document.querySelector('main')?.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (link) {
            e.preventDefault();
            loadPage(link.getAttribute('href'));
        }
    });

    loadPage('pages/links.html');
});