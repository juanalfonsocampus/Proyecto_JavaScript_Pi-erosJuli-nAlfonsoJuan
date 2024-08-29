document.addEventListener('DOMContentLoaded', () => {
    const showAllInfoButton = document.getElementById('show-all-info-btn');
    const openingCrawlButton = document.getElementById('opening-crawl-btn');
    const directorButton = document.getElementById('director-btn');
    const producerButton = document.getElementById('producer-btn');
    const container = document.getElementById('films-container');

    fetchAndDisplayFilms('all'); // Load all information by default

    showAllInfoButton.addEventListener('click', async () => {
        await fetchAndDisplayFilms('all');
    });

    openingCrawlButton.addEventListener('click', async () => {
        await fetchAndDisplayFilms('opening_crawl');
    });

    directorButton.addEventListener('click', async () => {
        await fetchAndDisplayFilms('director');
    });

    producerButton.addEventListener('click', async () => {
        await fetchAndDisplayFilms('producer');
    });

    async function fetchAndDisplayFilms(type) {
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            const data = await response.json();
            displayFilms(data.results, type);
        } catch (error) {
            console.error('Error fetching films data:', error);
        }
    }

    function displayFilms(films, type) {
        container.innerHTML = ''; // Clear previous content

        films.forEach(film => {
            const card = document.createElement('div');
            card.className = 'info-card';
            let info;
            if (type === 'all') {
                info = `
                    <strong>Title:</strong> ${film.title}<br>
                    <strong>Episode ID:</strong> ${film.episode_id}<br>
                    <strong>Opening Crawl:</strong> <p>${film.opening_crawl}</p><br>
                    <strong>Director:</strong> ${film.director}<br>
                    <strong>Producer:</strong> ${film.producer}
                `;
            } else if (type === 'opening_crawl') {
                info = `
                    <strong>Title:</strong> ${film.title}<br>
                    <strong>Episode ID:</strong> ${film.episode_id}<br>
                    <strong>Opening Crawl:</strong> <p>${film.opening_crawl}</p>
                `;
            } else if (type === 'director') {
                info = `
                    <strong>Title:</strong> ${film.title}<br>
                    <strong>Episode ID:</strong> ${film.episode_id}<br>
                    <strong>Director:</strong> ${film.director}
                `;
            } else if (type === 'producer') {
                info = `
                    <strong>Title:</strong> ${film.title}<br>
                    <strong>Episode ID:</strong> ${film.episode_id}<br>
                    <strong>Producer:</strong> ${film.producer}
                `;
            }
            card.innerHTML = info;
            container.appendChild(card);
        });
    }
});
