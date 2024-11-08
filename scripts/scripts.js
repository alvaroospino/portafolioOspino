
        // Datos de los proyectos
        const projects = [
            {
                title: "Plataforma para Aprender Ingles",
                description: "Plataforma para aprender ingles desarrollada con html, Css y Javascript, es un proyecto que aun esta en desarrollo ",
                image: "img/acadeia-ingles.png",
                tags: ["Html", "Css", "Javascript"],
                demoUrl: "https://alvaroospino.github.io/FDS-Academia-Ingles/",
                githubUrl: "https://github.com/alvaroospino/FDS-Academia-Ingles"
            },
            {
                title: "CalculadoraOspino",
                description: "CalculadoraOspino es un proyecto innovador que permite realizar cálculos matemáticos de forma interactiva y divertida, invitando a explorar y jugar con las operaciones.",
                image: "img/calculadora.png",
                tags: ["Html", "Css", "Javascript"],
                demoUrl: "https://alvaroospino.github.io/calculadoraOspino/",
                githubUrl: "https://github.com/alvaroospino/calculadoraOspino"
            },
            {
                title: "Portfolio Website",
                description: "Sitio web diseñado para revivir la historia y cultura de nuestros antepasados, explorando sus tradiciones y formas de vida.",
                image: "img/academia-historia.png",
                tags: ["HTML", "CSS", "JavaScript"],
                demoUrl: "https://alvaroospino.github.io/Academia-De-Historia/",
                githubUrl: "https://github.com/alvaroospino/Academia-De-Historia"
            },
            {
                title: "Diario Del Programador",
                description: "Este proyecto está dirigido a programadores creativos que disfrutan de documentar ideas, eventos cotidianos y experiencias de programación.",
                image: "img/DiarioDelProgramador.png",
                tags: ["HTML", "CSS", "JavaScript"],
                demoUrl: "https://alvaroospino.github.io/Diario-Del-Programador/",
                githubUrl: "https://github.com/alvaroospino/Diario-Del-Programador"
            }
        ];

        // Clase principal para manejar toda la funcionalidad
        class PortfolioApp {
            constructor() {
                this.initializeComponents();
                this.setupEventListeners();
                this.loadProjects();
                this.checkSkillsVisibility();
            }

            initializeComponents() {
                // Referencias a elementos del DOM
                this.header = document.querySelector('.header');
                this.scrollProgress = document.querySelector('.scroll-bar');
                this.projectsGrid = document.querySelector('.projects-grid');
                this.contactForm = document.querySelector('.contact-form');
            }

            setupEventListeners() {
                // Scroll events
                window.addEventListener('scroll', () => {
                    this.updateScrollProgress();
                    this.updateHeader();
                    this.checkProjectsVisibility();
                });

                // Smooth scroll para links de navegación
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                    anchor.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.smoothScroll(anchor.getAttribute('href'));
                    });
                });

                // Formulario de contacto
                if (this.contactForm) {
                    this.contactForm.addEventListener('submit', (e) => {
                        this.handleFormSubmit(e);
                    });
                }
                window.addEventListener('scroll', () => {
                    this.checkSkillsVisibility();
                });
            }

            updateScrollProgress() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                this.scrollProgress.style.width = `${scrolled}%`;
            }

            updateHeader() {
                if (window.scrollY > 100) {
                    this.header.classList.add('scrolled');
                } else {
                    this.header.classList.remove('scrolled');
                }
            }

            smoothScroll(targetId) {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            loadProjects() {
                projects.forEach((project, index) => {
                    const projectElement = this.createProjectElement(project);
                    this.projectsGrid.appendChild(projectElement);
                    
                    // Añadir delay a la animación
                    setTimeout(() => {
                        projectElement.classList.add('visible');
                    }, index * 200);
                });
            }

            createProjectElement(project) {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project-card';
                
                projectDiv.innerHTML = `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="project-content">
                        <div class="project-tags">
                            ${project.tags.map(tag => `
                                <span class="project-tag">${tag}</span>
                            `).join('')}
                        </div>
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-links">
                            <a href="${project.demoUrl}" class="project-link primary" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                                Demo
                            </a>
                            <a href="${project.githubUrl}" class="project-link secondary" target="_blank">
                                <i class="fab fa-github"></i>
                                Código
                            </a>
                        </div>
                    </div>
                `;

                return projectDiv;
            }

            checkProjectsVisibility() {
                const cards = document.querySelectorAll('.project-card');
                const triggerBottom = window.innerHeight * 0.8;

                cards.forEach(card => {
                    const cardTop = card.getBoundingClientRect().top;

                    if (cardTop < triggerBottom) {
                        card.classList.add('visible');
                    }
                });
            }

            async handleFormSubmit(e) {
                e.preventDefault();
                const submitBtn = e.target.querySelector('.submit-btn');
                const originalContent = submitBtn.innerHTML;

                try {
                    // Mostrar estado de carga
                    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enviando...`;
                    submitBtn.disabled = true;

                    // Simular envío (reemplazar con tu lógica real) recordar hacerlo con Emailjs
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // Mostrar éxito
                    submitBtn.innerHTML = `<i class="fas fa-check"></i> Enviado!`;
                    submitBtn.style.background = '#00b894';
                    e.target.reset();

                    // Restaurar botón después de 3 segundos
                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);

                } catch (error) {
                    // Manejar error
                    submitBtn.innerHTML = `<i class="fas fa-times"></i> Error`;
                    submitBtn.style.background = '#ff7675';

                    setTimeout(() => {
                        submitBtn.innerHTML = originalContent;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            }
            checkSkillsVisibility() {
                const skills = document.querySelectorAll('.skill-progress');
                const triggerBottom = window.innerHeight * 0.8;
            
                skills.forEach(skill => {
                    const skillTop = skill.getBoundingClientRect().top;
                    if (skillTop < triggerBottom) {
                        skill.style.animation = 'fillBar 1s ease forwards';
                    }
                });
            }
        }

        // Inicializar la aplicación cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            new PortfolioApp();
        });