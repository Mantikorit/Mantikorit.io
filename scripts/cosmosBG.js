
// Создаем элемент <style> для динамической вставки CSS
const spaceStyle = document.createElement('style');
const scriptElement = document.currentScript;
const configUrl = scriptElement?.getAttribute('data-config');
spaceStyle.textContent = `
  /* Сброс стандартных отступов и модели box-sizing */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* Основные стили для body */
  body {
    color: #fff;
    overflow-x: hidden;        /* Скрываем горизонтальную прокрутку */
    min-height: 100vh;         /* Минимальная высота на весь экран */
    position: relative;
    background: #000000;       /* Фон по умолчанию */
    font-family: Arial, sans-serif;
  }
  
  /* Анимация мерцания звезд */
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; } /* Состояния минимальной видимости */
    50% { opacity: 1; }        /* Пик яркости звезды */
  }
  
  /* Анимация полета кометы */
  @keyframes cometFly {
    0% {
      transform: rotate(-45deg) translateX(-100vw); /* Начало за пределами экрана */
      opacity: 0;              /* Полная прозрачность */
    }
    20% { opacity: 1; }        /* Появление кометы */
    80% { opacity: 1; }        /* Видимость в середине пути */
    100% {
      transform: rotate(-45deg) translateX(100vw); /* Уход за пределы экрана */
      opacity: 0;              /* Исчезновение */
    }
  }
  
  /* Адаптация для мобильных устройств */
  @media (max-width: 768px) {
    #spaceBg {
      top: -15% !important;
      left: -15% !important;
      width: 130% !important;
      height: 130% !important;
    }
  }
`;
// Добавляем стили в <head> документа
document.head.appendChild(spaceStyle);

// Основной класс для создания космического фона
class StarBackground {
  constructor(config = {}) {
    // Конфигурация по умолчанию
    this.defaultConfig = {
      starsCount: 400,         // Количество звезд
      nebulae: [],             // Массив туманностей
      parallax: {              // Настройки параллакс-эффекта
        intensity: 30,         // Сила смещения
        smoothness: 0.1,       // Плавность движения
        maxOffset: 50,         // Максимальное смещение
        enabled: true,         // Активность эффекта
        xAxis: true,           // Активность по оси X
        yAxis: true,           // Активность по оси Y
        inverted: false,       // Инверсия направления
        scaleFactor: 1.0       // Множитель масштаба
      },
      colors: {                // Цветовые параметры
        primaryGradient: '#1a0a2e',
        secondaryGradient: '#0f0523',
        tertiaryGradient: '#2d0b50',
        bgColor: '#000000'
      },
      stars: {                 // Настройки звезд
        minSize: 0.5,          // Минимальный размер
        maxSize: 2.5,          // Максимальный размер
        minOpacity: 0.2,       // Минимальная прозрачность
        maxOpacity: 0.7,       // Максимальная прозрачность
        minDuration: 3,        // Мин. длительность анимации
        maxDuration: 10        // Макс. длительность анимации
      },
      animations: {            // Настройки анимаций
        fadeInDuration: 2000,  // Длительность появления
        starsChangeDuration: 1000
      },
      nebulaeSettings: {       // Настройки туманностей
        minCount: 1,           // Минимальное количество
        maxCount: 5,           // Максимальное количество
        minSize: 100,          // Минимальный размер
        maxSize: 400,          // Максимальный размер
        minBlur: 20,           // Минимальное размытие
        maxBlur: 100,          // Максимальное размытие
        minOpacity: 0.1,       // Минимальная прозрачность
        maxOpacity: 0.5        // Максимальная прозрачность
      },
      // НАСТРОЙКИ КОМЕТ
      comets: {
        count: 3,              // Количество комет
        minDelay: 1000,        // Минимальная задержка появления (мс)
        maxDelay: 5000,        // Максимальная задержка
        minLength: 80,         // Минимальная длина хвоста
        maxLength: 200,        // Максимальная длина
        minThickness: 1,       // Минимальная толщина
        maxThickness: 4        // Максимальная толщина
      },
      // Цветовые схемы для элементов
      nebulaColorSchemes: [
        { name: "Фиолетовая", colors: ['#8c2a5d', '#5d2a8c', '#8c5a7a'] },
        { name: "Синяя", colors: ['#2a5d8c', '#5a8c8c', '#2a8c5d'] },
        { name: "Теплая", colors: ['#8c5d2a', '#5d8c2a', '#8c2a2a'] }
      ],
      starColorSchemes: [
        { name: "Белая", colors: ['#ffffff', '#f0f0f0', '#e0e0e0'] },
        { name: "Золотая", colors: ['#ffeb3b', '#ffc107', '#ff9800'] },
        { name: "Голубая", colors: ['#03a9f4', '#00bcd4', '#4fc3f7'] }
      ],
      cometColorSchemes: [
        { name: "Белая", colors: ['#ffffff'] },
        { name: "Синяя", colors: ['#2196f3', '#03a9f4', '#00bcd4'] },
        { name: "Красная", colors: ['#f44336', '#e91e63', '#ff5722'] }
      ]
    };

    // Цветовые схемы для фона
    this.defaultColorSchemes = [
      {
        name: "Фиолетовая",
        primaryGradient: '#1a0a2e',
        secondaryGradient: '#0f0523',
        tertiaryGradient: '#2d0b50',
        bgColor: '#000000',
        linkedNebulaSchemes: ["Фиолетовая", "Синяя"],
        linkedStarSchemes: ["Белая"],
        linkedCometSchemes: ["Синяя"]
      },
      {
        name: "Голубая",
        primaryGradient: '#0a1a2e',
        secondaryGradient: '#051223',
        tertiaryGradient: '#0b2d50',
        bgColor: '#000011',
        linkedNebulaSchemes: ["Синяя"],
        linkedStarSchemes: ["Голубая"],
        linkedCometSchemes: ["Белая"]
      },
      {
        name: "Красная",
        primaryGradient: '#2e0a0a',
        secondaryGradient: '#230505',
        tertiaryGradient: '#500b0b',
        bgColor: '#110000',
        linkedNebulaSchemes: ["Теплая", "Фиолетовая"],
        linkedStarSchemes: ["Золотая"],
        linkedCometSchemes: ["Красная"]
      },
      {
        name: "Зеленая",
        primaryGradient: '#0a2e1a',
        secondaryGradient: '#052312',
        tertiaryGradient: '#0b502d',
        bgColor: '#001100',
        linkedStarSchemes: ["Белая"],
        linkedCometSchemes: ["Белая"]
      },
      {
        name: "Золотая",
        primaryGradient: '#2e1a0a',
        secondaryGradient: '#231205',
        tertiaryGradient: '#503d0b',
        bgColor: '#110d00',
        linkedStarSchemes: ["Золотая"],
        linkedCometSchemes: ["Красная"]
      }
    ];

    // Глубокое слияние конфигураций
    this.config = {
      ...this.defaultConfig,
      ...config,
      parallax: {
        ...this.defaultConfig.parallax,
        ...(config.parallax || {})
      },
      nebulaeSettings: {
        ...this.defaultConfig.nebulaeSettings,
        ...(config.nebulaeSettings || {})
      },
      // ОБЪЕДИНЕНИЕ НАСТРОЕК КОМЕТ
      comets: {
        ...this.defaultConfig.comets,
        ...(config.comets || {})
      }
    };

    // Применение пользовательских схем
    this.colorSchemes = config.colorSchemes || this.defaultColorSchemes;
    this.nebulaColorSchemes = config.nebulaColorSchemes || this.defaultConfig.nebulaColorSchemes;
    this.starColorSchemes = config.starColorSchemes || this.defaultConfig.starColorSchemes;
    this.cometColorSchemes = config.cometColorSchemes || this.defaultConfig.cometColorSchemes;
    
    // Установка цветов элементов
    this.nebulaColors = this.defaultConfig.nebulaColorSchemes[0].colors;
    this.starColors = this.defaultConfig.starColorSchemes[0].colors;
    this.cometColors = this.defaultConfig.cometColorSchemes[0].colors;

    // Автовыбор цветовой схемы если не задана
    if (!config.colors) {
      this.config.colors = this.getRandomColorScheme();
    }
    
    // Применение связанных цветовых схем
    this.applyLinkedSchemes();

    // Генерация туманностей если не заданы
    if (!config.nebulae) {
      this.generateRandomNebulae();
    }

    // Автокоррекция для мобильных устройств
    this.autoAdjustForMobile();

    // Инициализация системы
    this.init();
  }

  // Автоматическая настройка для мобильных
  autoAdjustForMobile() {
    if (window.innerWidth <= 768) {
      this.config.parallax.maxOffset = Math.min(this.config.parallax.maxOffset, 30);
      this.config.parallax.intensity = Math.min(this.config.parallax.intensity, 20);
      this.config.parallax.scaleFactor = Math.min(this.config.parallax.scaleFactor, 0.8);
      // Коррекция для комет на мобильных
      this.config.comets.minLength = Math.min(this.config.comets.minLength, 60);
      this.config.comets.maxLength = Math.min(this.config.comets.maxLength, 150);
    }
  }

  // Применение всех связанных цветовых схем
  applyLinkedSchemes() {
    this.applyLinkedNebulaSchemes();
    this.applyLinkedStarSchemes();
    this.applyLinkedCometSchemes();
  }

  // Применение схем для туманностей
  applyLinkedNebulaSchemes() {
    if (this.config.colors.linkedNebulaSchemes && 
        Array.isArray(this.config.colors.linkedNebulaSchemes)) {
      
      const allColors = [];
      
      // Собираем цвета из связанных схем
      this.config.colors.linkedNebulaSchemes.forEach(schemeName => {
        const nebulaScheme = this.nebulaColorSchemes.find(
          scheme => scheme.name === schemeName
        );
        
        if (nebulaScheme?.colors) {
          allColors.push(...nebulaScheme.colors);
        }
      });
      
      if (allColors.length > 0) {
        this.nebulaColors = allColors;
      }
    }
  }

  // Применение схем для звезд
  applyLinkedStarSchemes() {
    if (this.config.colors.linkedStarSchemes && 
        Array.isArray(this.config.colors.linkedStarSchemes)) {
      
      const allColors = [];
      
      this.config.colors.linkedStarSchemes.forEach(schemeName => {
        const starScheme = this.starColorSchemes.find(
          scheme => scheme.name === schemeName
        );
        
        if (starScheme?.colors) {
          allColors.push(...starScheme.colors);
        }
      });
      
      if (allColors.length > 0) {
        this.starColors = allColors;
      }
    }
  }

  // Применение схем для комет
  applyLinkedCometSchemes() {
    if (this.config.colors.linkedCometSchemes && 
        Array.isArray(this.config.colors.linkedCometSchemes)) {
      
      const allColors = [];
      
      this.config.colors.linkedCometSchemes.forEach(schemeName => {
        const cometScheme = this.cometColorSchemes.find(
          scheme => scheme.name === schemeName
        );
        
        if (cometScheme?.colors) {
          allColors.push(...cometScheme.colors);
        }
      });
      
      if (allColors.length > 0) {
        this.cometColors = allColors;
      }
    }
  }

  // Генерация параметров для градиента
  getRandomGradientParams() {
    return {
      radialX: Math.floor(Math.random() * 101),  // Случайная позиция X (0-100%)
      radialY: Math.floor(Math.random() * 101),  // Случайная позиция Y (0-100%)
      linearAngle: Math.floor(Math.random() * 361), // Угол наклона (0-360°)
      radialSize: 30 + Math.floor(Math.random() * 41) // Размер градиента (30-70%)
    };
  }

  // Создание фонового градиента
  generateBackgroundGradient() {
    const { radialX, radialY, linearAngle, radialSize } = this.getRandomGradientParams();
    
    return `
      radial-gradient(
        circle at ${radialX}% ${radialY}%, 
        ${this.config.colors.primaryGradient} 0%, 
        ${this.config.colors.bgColor} ${radialSize}%
      ),
      linear-gradient(
        ${linearAngle}deg, 
        ${this.config.colors.secondaryGradient} 0%, 
        ${this.config.colors.tertiaryGradient} 100%
      )
    `;
  }

  // Выбор случайной цветовой схемы
  getRandomColorScheme() {
    return this.colorSchemes[Math.floor(Math.random() * this.colorSchemes.length)];
  }

  // Генерация случайных туманностей
  generateRandomNebulae() {
    const { 
      minCount, maxCount, 
      minSize, maxSize, 
      minBlur, maxBlur, 
      minOpacity, maxOpacity 
    } = this.config.nebulaeSettings;
    
    // Случайное количество туманностей
    const nebulaCount = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    this.config.nebulae = [];
    
    for (let i = 0; i < nebulaCount; i++) {
      // Случайный цвет из активной палитры
      const color = this.nebulaColors[Math.floor(Math.random() * this.nebulaColors.length)];
      
      this.config.nebulae.push({
        color,
        size: Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
        blur: Math.floor(Math.random() * (maxBlur - minBlur + 1)) + minBlur,
        opacity: minOpacity + Math.random() * (maxOpacity - minOpacity),
        position: {
          top: `${10 + Math.floor(Math.random() * 80)}%`,  // 10-90%
          left: `${10 + Math.floor(Math.random() * 80)}%`  // 10-90%
        }
      });
    }
  }

  // Основная инициализация
  init() {
    this.createContainer();     // Создание контейнера
    this.createNebulae(true);   // Генерация туманностей с анимацией
    this.createStars(true);     // Генерация звезд с анимацией
    this.initParallax();        // Инициализация параллакс-эффекта
    this.addResizeListener();   // Добавление обработчика ресайза
    this.createComets();        // СОЗДАНИЕ КОМЕТ
  }

  // НОВЫЙ МЕТОД: СОЗДАНИЕ КОМЕТ
  createComets() {
    const { count, minDelay, maxDelay } = this.config.comets;
    
    // Создаем кометы со случайными задержками
    for (let i = 0; i < count; i++) {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      setTimeout(() => this.addComet(), delay);
    }
  }

  // Создание основного контейнера
  createContainer() {
    this.spaceBg = document.createElement('div');
    this.spaceBg.id = 'spaceBg';
    
    // Применение стилей к контейнеру
    Object.assign(this.spaceBg.style, {
      position: 'fixed',
      top: '-10%',          // Расширение за границы экрана
      left: '-10%',
      width: '120%',        // Для плавного параллакса
      height: '120%',
      background: this.generateBackgroundGradient(),
      zIndex: '-1',         // Под всем контентом
      overflow: 'hidden',    // Скрытие выходящих за границы элементов
      willChange: 'transform', // Оптимизация анимаций
      opacity: '0',          // Начальное состояние - прозрачный
      transition: `opacity ${this.config.animations.fadeInDuration}ms ease-out`
    });

    // Вставка контейнера в начало body
    document.body.prepend(this.spaceBg);

    // Плавное появление через 100мс
    setTimeout(() => {
      this.spaceBg.style.opacity = '1';
    }, 100);
  }

  // Создание туманностей
  createNebulae(fadeIn = false) {
    this.config.nebulae.forEach(nebula => {
      const element = document.createElement('div');
      
      // Применение стилей к туманности
      Object.assign(element.style, {
        position: 'absolute',
        borderRadius: '50%',   // Круглая форма
        filter: `blur(${nebula.blur}px)`, // Эффект размытия
        opacity: fadeIn ? '0' : nebula.opacity, // Начальная прозрачность
        width: `${nebula.size}px`,
        height: `${nebula.size}px`,
        background: `radial-gradient(circle, ${nebula.color}, transparent 70%)`,
        top: nebula.position.top,   // Позиционирование
        left: nebula.position.left,
        transition: `opacity ${this.config.animations.fadeInDuration}ms ease-out`
      });

      this.spaceBg.appendChild(element);

      // Плавное появление
      if (fadeIn) {
        setTimeout(() => {
          element.style.opacity = nebula.opacity;
        }, 200);
      }
    });
  }

  // Создание звезд
  createStars(fadeIn = false) {
    const { 
      minSize, maxSize, 
      minOpacity, maxOpacity, 
      minDuration, maxDuration 
    } = this.config.stars;

    for (let i = 0; i < this.config.starsCount; i++) {
      const star = document.createElement('div');
      
      // Случайные параметры звезды
      const size = Math.random() * (maxSize - minSize) + minSize;
      const duration = minDuration + Math.random() * (maxDuration - minDuration);
      const opacity = minOpacity + Math.random() * (maxOpacity - minOpacity);
      const color = this.starColors[Math.floor(Math.random() * this.starColors.length)];

      // Применение стилей к звезде
      Object.assign(star.style, {
        position: 'absolute',
        backgroundColor: color,     // Цвет из активной палитры
        borderRadius: '50%',         // Круглая форма
        animation: `twinkle ${duration}s infinite ease-in-out`, // Анимация мерцания
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`, // Случайная позиция по X
        top: `${Math.random() * 100}%`,  // Случайная позиция по Y
        opacity: fadeIn ? '0' : opacity, // Начальная прозрачность
        transition: `opacity ${this.config.animations.fadeInDuration}ms ease-out`
      });

      this.spaceBg.appendChild(star);

      // Плавное появление со случайной задержкой
      if (fadeIn) {
        setTimeout(() => {
          star.style.opacity = opacity;
        }, Math.random() * this.config.animations.fadeInDuration);
      }
    }
  }

  // Инициализация параллакс-эффекта
  initParallax() {
    // Выход если эффект отключен
    if (!this.config.parallax.enabled) return;
    
    // Инициализация переменных позиции
    this.lastX = 0;
    this.lastY = 0;
    this.targetX = 0;
    this.targetY = 0;

    // Обработчик движения мыши
    const handleMove = (x, y) => {
      // Нормализация координат (от -0.5 до 0.5)
      const normalizedX = x / window.innerWidth - 0.5;
      const normalizedY = y / window.innerHeight - 0.5;
      
      // Определение направления
      const direction = this.config.parallax.inverted ? -1 : 1;
      
      // Расчет целевого смещения
      if (this.config.parallax.xAxis) {
        this.targetX = normalizedX * this.config.parallax.intensity * 
                       direction * this.config.parallax.scaleFactor;
      }
      
      if (this.config.parallax.yAxis) {
        this.targetY = normalizedY * this.config.parallax.intensity * 
                       direction * this.config.parallax.scaleFactor;
      }
    };

    // Обработчики событий
    document.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    // Запуск анимации
    this.animateParallax();
  }

  // Анимация параллакс-эффекта
  animateParallax() {
    // Интерполяция для плавного движения
    this.lastX += (this.targetX - this.lastX) * this.config.parallax.smoothness;
    this.lastY += (this.targetY - this.lastY) * this.config.parallax.smoothness;

    // Ограничение смещения
    const maxOffset = this.config.parallax.maxOffset;
    const limitedX = Math.max(-maxOffset, Math.min(maxOffset, this.lastX));
    const limitedY = Math.max(-maxOffset, Math.min(maxOffset, this.lastY));

    // Применение трансформации
    this.spaceBg.style.transform = `translate(${limitedX}px, ${limitedY}px)`;
    
    // Рекурсивный вызов анимации
    if (this.config.parallax.enabled) {
      requestAnimationFrame(() => this.animateParallax());
    }
  }

  // Обработчик изменения размера окна
  addResizeListener() {
    window.addEventListener('resize', () => {
      // Автокоррекция для мобильных устройств
      this.autoAdjustForMobile();
      
      // Сброс позиции при ресайзе
      this.spaceBg.style.transform = 'translate(0px, 0px)';
      this.lastX = 0;
      this.lastY = 0;
      this.targetX = 0;
      this.targetY = 0;
    });
  }

  // Добавление кометы (ОБНОВЛЕНО)
  addComet() {
    const comet = document.createElement('div');
    
    // Случайный цвет из активной палитры
    const baseColor = this.cometColors[Math.floor(Math.random() * this.cometColors.length)];
    
    // Конвертация HEX в RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace('#', ''), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    };
    
    const rgb = hexToRgb(baseColor);
    
    // Параметры из конфига
    const { minLength, maxLength, minThickness, maxThickness } = this.config.comets;
    
    // Случайные размеры
    const length = minLength + Math.random() * (maxLength - minLength);
    const thickness = minThickness + Math.random() * (maxThickness - minThickness);
    
    // Применение стилей к комете
    Object.assign(comet.style, {
      position: 'absolute',
      width: `${length}px`,     // Используем настройки
      height: `${thickness}px`, // Используем настройки
      background: `linear-gradient(90deg, 
        rgba(${rgb.r},${rgb.g},${rgb.b},0) 0%, 
        rgba(${rgb.r},${rgb.g},${rgb.b},0.8) 50%, 
        rgba(${rgb.r},${rgb.g},${rgb.b},0) 100%)`,
      transformOrigin: 'left center', // Точка вращения
      transform: 'rotate(-45deg)',   // Угол полета
      top: `${Math.random() * 100}%`, // Случайная позиция
      left: `${Math.random() * 100}%`,
      animation: `cometFly ${8 + Math.random() * 15}s infinite linear`, // Случайная скорость
      opacity: '0',          // Начальная прозрачность
      transition: 'opacity 1s ease-out'
    });

    this.spaceBg.appendChild(comet);

    // Плавное появление
    setTimeout(() => {
      comet.style.opacity = '1';
    }, 50);
  }
}

// Функция для загрузки конфигурации из JSON-файла
async function loadConfigFromJson(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading config from JSON:', error);
    return null;
  }
}

// Функция для создания космического фона с возможностью загрузки конфига
async function createSpaceBackground() {
    let config;
    try {
        const response = await fetch(configUrl);
        if (!response.ok) throw new Error('Failed to load config');
        config = await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        config = {};
    }
    return new StarBackground(config);
}

// Инициализация после полной загрузки DOM
document.addEventListener('DOMContentLoaded', async () => {
  const spaceBg = await createSpaceBackground();
  console.log('Space background initialized with custom config');
});
