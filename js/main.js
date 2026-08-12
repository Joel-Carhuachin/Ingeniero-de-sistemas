// ===================================
// NAVEGACIÓN MÓVIL
// comentario de prueba 
 // ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu móvil
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevenir scroll cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    }
});

// ===================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Solo aplicar smooth scroll si no es solo "#"
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // 80px para compensar el navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// ANIMACIÓN DE ELEMENTOS AL SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con clase 'fade-in'
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.work-card, .service-card, .portfolio-card, .timeline-item');
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===================================
// LOADING LAZY DE IMÁGENES
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// CONTADOR ANIMADO (para estadísticas)
// ===================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Activar contadores cuando sean visibles
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// ===================================
// TOOLTIP SIMPLE
// ===================================
function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background-color: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    `;
    
    element.addEventListener('mouseenter', function(e) {
        document.body.appendChild(tooltip);
        const rect = element.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
        setTimeout(() => tooltip.style.opacity = '1', 10);
    });
    
    element.addEventListener('mouseleave', function() {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    });
}

// Activar tooltips en elementos con atributo data-tooltip
document.addEventListener('DOMContentLoaded', function() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        createTooltip(element, element.dataset.tooltip);
    });
});

// ===================================
// COPIAR AL PORTAPAPELES
// ===================================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('¡Copiado al portapapeles!', 'success');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    } else {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showNotification('¡Copiado al portapapeles!', 'success');
        } catch (err) {
            console.error('Error al copiar:', err);
        }
        document.body.removeChild(textarea);
    }
}

// ===================================
// SISTEMA DE NOTIFICACIONES
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// VALIDACIÓN DE FORMULARIOS
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Aplicar validación a formularios
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const emailInputs = form.querySelectorAll('input[type="email"]');
            const phoneInputs = form.querySelectorAll('input[type="tel"]');
            let isValid = true;
            
            // Validar emails
            emailInputs.forEach(input => {
                if (input.value && !validateEmail(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    showNotification('Por favor ingresa un email válido', 'error');
                } else {
                    input.style.borderColor = '';
                }
            });
            
            // Validar teléfonos
            phoneInputs.forEach(input => {
                if (input.value && !validatePhone(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                    showNotification('Por favor ingresa un teléfono válido', 'error');
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Remover error al escribir
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
}

// Crear botón de volver arriba
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===================================
// PRELOADER (Opcional)
// ===================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ===================================
// DETECTAR MODO OSCURO DEL SISTEMA
// ===================================
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // El usuario prefiere modo oscuro
    // Aquí puedes agregar lógica para activar un tema oscuro
    console.log('Modo oscuro detectado');
}

// Escuchar cambios en la preferencia de modo oscuro
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newColorScheme = e.matches ? "dark" : "light";
    console.log('Cambio a modo:', newColorScheme);
});

// ===================================
// UTILIDADES GENERALES
// ===================================

// Debounce function para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para optimizar eventos
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Ejemplo de uso de throttle para scroll
const handleScroll = throttle(() => {
    // Tu código de scroll aquí
}, 100);

window.addEventListener('scroll', handleScroll);

// ===================================
// MANEJO DE ERRORES DE IMÁGENES
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Imagen placeholder en caso de error
            this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
            this.alt = 'Imagen no disponible';
        });
    });
});

console.log('✅ Scripts principales cargados correctamente');
