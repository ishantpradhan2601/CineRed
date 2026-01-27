document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const movieGrid = document.querySelector('.movie-grid');
    const sections = {
        home: document.getElementById('hero'),
        movies: document.getElementById('movies-section'),
        trending: document.getElementById('trending-section')
    };

    // Movie Data from img folder
    const movies = [
        { id: 1, title: "Aftermath", genre: "Drama", year: 2023, rating: 8.1, img: "img/1.jpeg", trending: true },
        { id: 2, title: "Neon Nights", genre: "Sci-Fi", year: 2024, rating: 8.5, img: "img/2.jpeg", trending: false },
        { id: 3, title: "The Abyss", genre: "Horror", year: 2022, rating: 7.2, img: "img/3.jpg", trending: true },
        { id: 4, title: "Skyline", genre: "Action", year: 2023, rating: 7.9, img: "img/4.jpg", trending: false },
        { id: 5, title: "Red Smoke", genre: "Thriller", year: 2024, rating: 8.8, img: "img/5.jpg", trending: true },
        { id: 6, title: "Silent Hill", genre: "Mystery", year: 2021, rating: 6.9, img: "img/6.jpg", trending: false },
        { id: 7, title: "Shadows", genre: "Drama", year: 2023, rating: 7.5, img: "img/7.jpg", trending: false },
        { id: 8, title: "Deep Sea", genre: "Adventure", year: 2024, rating: 8.2, img: "img/8.jpg", trending: true },
        { id: 9, title: "Old World", genre: "History", year: 2022, rating: 7.8, img: "img/9.jpg", trending: false },
        { id: 10, title: "Apex", genre: "Action", year: 2024, rating: 9.1, img: "img/10.jpg", trending: true },
        { id: 11, title: "Glitch", genre: "Sci-Fi", year: 2023, rating: 7.4, img: "img/11.jpg", trending: false },
        { id: 12, title: "Frozen", genre: "Horror", year: 2023, rating: 6.5, img: "img/12.jpg", trending: false },
        { id: 13, title: "Titan", genre: "Sci-Fi", year: 2024, rating: 8.9, img: "img/13.jpg", trending: true },
        { id: 14, title: "Rogue", genre: "Action", year: 2023, rating: 8.3, img: "img/14.jpg", trending: false },
        { id: 15, title: "Phantom", genre: "Thriller", year: 2022, rating: 7.7, img: "img/15.jpg", trending: false },
        { id: 16, title: "Eclipse", genre: "Sci-Fi", year: 2024, rating: 8.6, img: "img/16.jpg", trending: true },
        { id: 17, title: "Nomad", genre: "Drama", year: 2023, rating: 8.0, img: "img/17.jpg", trending: false },
        { id: 18, title: "Vortex", genre: "Action", year: 2024, rating: 7.5, img: "img/18.jpg", trending: false },
        { id: 19, title: "Pulse", genre: "Documentary", year: 2024, rating: 8.4, img: "img/19.jpg", trending: true },
        { id: 20, title: "Fearless", genre: "Action", year: 2023, rating: 8.7, img: "img/f-1.jpg", trending: true },
        { id: 21, title: "Guardian", genre: "Fantasy", year: 2024, rating: 7.9, img: "img/f-2.jpg", trending: false },
        { id: 22, title: "The Trail", genre: "Adventure", year: 2024, rating: 7.6, img: "img/f-t-1.png", trending: true },
        { id: 23, title: "After Dawn", genre: "Drama", year: 2023, rating: 8.0, img: "img/f-t-2.png", trending: false }
    ];

    // Function to render movies
    const renderMovies = (targetGrid, movieSet) => {
        if (!targetGrid) return;
        targetGrid.innerHTML = '';
        movieSet.forEach(movie => {
            const card = document.createElement('article');
            card.className = 'movie-card fade-in';
            card.innerHTML = `
                <div class="movie-img">
                    <img src="${movie.img}" alt="${movie.title}" loading="lazy">
                    <div class="movie-overlay">
                        <button class="btn btn-primary">Details</button>
                    </div>
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.genre} • ${movie.year}</p>
                    <div class="rating">⭐ ${movie.rating}</div>
                </div>
            `;
            targetGrid.appendChild(card);
            appearOnScroll.observe(card);
        });
    };

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        mobileMenuBtn.classList.toggle('toggle');
    });

    // Intersection Observer for Animations
    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    // Routing System
    const handleRouting = () => {
        const hash = window.location.hash || '#home';

        // Hide all sections
        Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = 'none';
        });

        // Dynamic Loading based on route
        if (hash === '#home') {
            sections.home.style.display = 'flex';
            sections.movies.style.display = 'block';
            renderMovies(document.querySelector('#movies-section .movie-grid'), movies.slice(0, 6));
            document.querySelector('#movies-section .section-header h2').innerHTML = 'Featured <span>Movies</span>';
        } else if (hash === '#movies') {
            sections.movies.style.display = 'block';
            renderMovies(document.querySelector('#movies-section .movie-grid'), movies);
            document.querySelector('#movies-section .section-header h2').innerHTML = 'Full <span>Library</span>';
        } else if (hash === '#trending') {
            sections.movies.style.display = 'block';
            const trendingMovies = movies.filter(m => m.trending);
            renderMovies(document.querySelector('#movies-section .movie-grid'), trendingMovies);
            document.querySelector('#movies-section .section-header h2').innerHTML = 'Trending <span>Now</span>';
        }

        // Update active link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleRouting);
    handleRouting(); // Initial call

    // Smooth Scrolling (for links that aren't routing)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                // If it's one of our main routes, let hashchange handle it
                if (['#home', '#movies', '#trending'].includes(targetId)) return;

                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }

            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                mobileMenuBtn.classList.remove('toggle');
            }
        });
    });
});
