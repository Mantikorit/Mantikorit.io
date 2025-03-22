// Загружаем JSON файл с фразами
fetch('data.json')  // Путь к вашему JSON файлу
.then(response => {
    if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
    }
    return response.json(); // Преобразуем в формат JSON
})
.then(data => {
    // Функция для получения случайной фразы с учётом редкости
    function getRandomPhrase(phrases) {
        const weightedPhrases = [];

        // Заполняем массив фраз в зависимости от их редкости
        phrases.forEach(phrase => {
            for (let i = 0; i < phrase.rarity; i++) {
                weightedPhrases.push(phrase.text);
            }
        });

        // Случайный выбор фразы из массива с учётом редкости
        const randomIndex = Math.floor(Math.random() * weightedPhrases.length);
        return weightedPhrases[randomIndex];
    }

    // Получаем случайную фразу
    const randomPhrase = getRandomPhrase(data.phrases);

    // Отображаем фразу на сайте
    document.getElementById('phrase').textContent = randomPhrase;
})
.catch(error => {
    console.error('Ошибка:', error);
    document.getElementById('phrase').textContent = 'Не удалось загрузить данные.';
});