// ===================================
// ANIMACIONES DE TIMELINE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    // Configuración del observer para timeline
    const timelineObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Agregar delay escalonado
                setTimeout(() => {
                    entry.target.classList.add('timeline-item-visible');
                }, index * 100);
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, timelineObserverOptions);
    
    // Observar cada item del timeline
    timelineItems.forEach(item => {
        item.classList.add('timeline-item-hidden');
        timelineObserver.observe(item);
    });
    
    // Agregar estilos CSS dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item-hidden {
            opacity: 0;
            transform: translateX(-30px);
        }
        
        .timeline-item-visible {
            opacity: 1;
            transform: translateX(0);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-dot {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(37, 99, 235, 0);
            }
        }
        
        .timeline::before {
            animation: growLine 1.5s ease-out forwards;
            transform-origin: top;
        }
        
        @keyframes growLine {
            from {
                transform: scaleY(0);
            }
            to {
                transform: scaleY(1);
            }
        }
    `;
    document.head.appendChild(style);
});

// ===================================
// TIMELINE INTERACTIVO
// ===================================

function makeTimelineInteractive() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        
        if (!content) return;
        
        // Hover effect mejorado
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            content.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            content.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
        
        // Click para expandir (opcional)
        content.addEventListener('click', function() {
            const isExpanded = this.classList.contains('expanded');
            
            // Cerrar todos los demás
            document.querySelectorAll('.timeline-content.expanded').forEach(el => {
                if (el !== this) {
                    el.classList.remove('expanded');
                }
            });
            
            // Toggle actual
            this.classList.toggle('expanded');
        });
    });
}

document.addEventListener('DOMContentLoaded', makeTimelineInteractive);

// ===================================
// FILTRO DE TIMELINE POR FECHA
// ===================================

function filterTimelineByYear(year) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const dateText = item.querySelector('.timeline-date').textContent;
        
        if (year === 'all' || dateText.includes(year)) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ===================================
// CREAR FILTROS DE AÑO (si es necesario)
// ===================================

function createYearFilters() {
    const timelineSection = document.querySelector('.timeline-section');
    
    if (!timelineSection) return;
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    const years = new Set();
    
    // Extraer años únicos
    timelineItems.forEach(item => {
        const dateText = item.querySelector('.timeline-date').textContent;
        const yearMatch = dateText.match(/\d{4}/);
        if (yearMatch) {
            years.add(yearMatch[0]);
        }
    });
    
    if (years.size <= 1) return; // No crear filtros si solo hay un año
    
    // Crear contenedor de filtros
    const filterContainer = document.createElement('div');
    filterContainer.className = 'timeline-filters';
    filterContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    `;
    
    // Botón "Todos"
    const allButton = createFilterButton('Todos', 'all', true);
    filterContainer.appendChild(allButton);
    
    // Botones de años
    Array.from(years).sort().reverse().forEach(year => {
        const button = createFilterButton(year, year, false);
        filterContainer.appendChild(button);
    });
    
    // Insertar antes del timeline
    const timeline = timelineSection.querySelector('.timeline');
    timeline.parentNode.insertBefore(filterContainer, timeline);
}

function createFilterButton(text, value, active) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = `timeline-filter-btn ${active ? 'active' : ''}`;
    button.dataset.year = value;
    button.style.cssText = `
        padding: 0.5rem 1.5rem;
        background-color: ${active ? '#2563eb' : '#f3f4f6'};
        color: ${active ? 'white' : '#1f2937'};
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', function() {
        // Remover active de todos
        document.querySelectorAll('.timeline-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = '#f3f4f6';
            btn.style.color = '#1f2937';
        });
        
        // Activar este
        this.classList.add('active');
        this.style.backgroundColor = '#2563eb';
        this.style.color = 'white';
        
        // Filtrar timeline
        filterTimelineByYear(this.dataset.year);
    });
    
    button.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.backgroundColor = '#e5e7eb';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.backgroundColor = '#f3f4f6';
        }
    });
    
    return button;
}

// Activar filtros si es necesario
// document.addEventListener('DOMContentLoaded', createYearFilters);

console.log('✅ Timeline scripts cargados correctamente');
