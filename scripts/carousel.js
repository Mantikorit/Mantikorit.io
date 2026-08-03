// Упрощенная версия с мгновенным переключением (без анимации)
class Carousel {
    constructor(containerElement) {
        this.container = containerElement;
        this.carousel = containerElement.querySelector('.carousel');
        this.slideContainer = containerElement.querySelector('.carousel-slide');
        this.slides = Array.from(containerElement.querySelectorAll('.slide'));
        this.prevBtn = containerElement.querySelector('.prevBtn');
        this.nextBtn = containerElement.querySelector('.nextBtn');
        this.dotsContainer = containerElement.querySelector('.dots');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        const carouselWidth = this.carousel.clientWidth;
        
        this.slides.forEach(slide => {
            slide.style.minWidth = `${carouselWidth}px`;
            slide.style.width = `${carouselWidth}px`;
            slide.style.flexShrink = '0';
        });
        
        this.createDots();
        this.updatePosition();
        this.addEventListeners();
        this.addContentClickListeners();
        this.updateActiveDot();
    }
    
    updatePosition() {
        // Отключаем любые анимации
        this.slideContainer.style.transition = 'none';
        
        const slideWidth = this.carousel.clientWidth;
        const translateX = -this.currentIndex * slideWidth;
        this.slideContainer.style.transform = `translateX(${translateX}px)`;
    }
    
    nextSlide() {
        if (this.currentIndex === this.totalSlides - 1) {
            // Мгновенно переходим на первый слайд
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updatePosition();
        this.updateActiveDot();
    }
    
    prevSlide() {
        if (this.currentIndex === 0) {
            // Мгновенно переходим на последний слайд
            this.currentIndex = this.totalSlides - 1;
        } else {
            this.currentIndex--;
        }
        this.updatePosition();
        this.updateActiveDot();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updatePosition();
        this.updateActiveDot();
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateActiveDot() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentIndex);
        });
    }
    
    addEventListeners() {
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextSlide();
        });
        
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevSlide();
        });
        
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const carouselWidth = this.carousel.clientWidth;
                this.slides.forEach(slide => {
                    slide.style.minWidth = `${carouselWidth}px`;
                    slide.style.width = `${carouselWidth}px`;
                });
                this.updatePosition();
            }, 250);
        });
    }
    
    addContentClickListeners() {
        const allImages = this.container.querySelectorAll('.slide img');
        allImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.ModalManager && typeof window.ModalManager.open === 'function') {
                    window.ModalManager.open(img.src);
                } else if (typeof window.openModal === 'function') {
                    window.openModal(img.src);
                }
            });
        });
    }
}

function initAllCarousels() {
    const galleries = document.querySelectorAll('.gallery-container');
    galleries.forEach(gallery => {
        new Carousel(gallery);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllCarousels);
} else {
    initAllCarousels();
}