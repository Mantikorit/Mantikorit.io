fetch('data.json')
                .then(response => response.ok ? response.json() : Promise.reject('Ошибка загрузки JSON'))
                .then(data => {
                    function getRandomPhrase(phrases) {
                        let weightedPhrases = [];
                        phrases.forEach(phrase => {
                            for (let i = 0; i < phrase.rarity; i++) {
                                weightedPhrases.push(phrase.text);
                            }
                        });
                        return weightedPhrases[Math.floor(Math.random() * weightedPhrases.length)];
                    }

                    document.getElementById('phrase').textContent = getRandomPhrase(data.phrases);
                })
                .catch(() => {
                    document.getElementById('phrase').textContent = 'Не удалось загрузить данные.';
                });