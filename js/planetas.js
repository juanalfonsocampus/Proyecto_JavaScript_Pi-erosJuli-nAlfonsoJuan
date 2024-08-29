document.addEventListener('DOMContentLoaded', () => {
    const climateButton = document.getElementById('climateButton');
    const gravityButton = document.getElementById('gravityButton');
    const terrainButton = document.getElementById('terrainButton');
    const populationButton = document.getElementById('populationButton');
    const rotationPeriodButton = document.getElementById('rotationPeriodButton');
    const orbitalPeriodButton = document.getElementById('orbitalPeriodButton');
    const diameterButton = document.getElementById('diameterButton');
    const planetContainer = document.getElementById('planetContainer');

    climateButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('climate');
    });

    gravityButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('gravity');
    });

    terrainButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('terrain');
    });

    populationButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('population');
    });

    rotationPeriodButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('rotation_period');
    });

    orbitalPeriodButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('orbital_period');
    });

    diameterButton.addEventListener('click', async () => {
        await fetchAndDisplayPlanets('diameter');
    });

    async function fetchAndDisplayPlanets(type) {
        try {
            const response = await fetch('https://swapi.dev/api/planets/');
            const data = await response.json();
            displayPlanets(data.results, type);
        } catch (error) {
            console.error('Error fetching planet data:', error);
        }
    }

    function displayPlanets(planets, type) {
        planetContainer.innerHTML = ''; // Clear previous content

        planets.forEach(planet => {
            const planetCard = document.createElement('div');
            planetCard.className = 'planet-card';
            let info;
            if (type === 'climate') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Climate:</strong> ${planet.climate}
                `;
            } else if (type === 'gravity') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Gravity:</strong> ${planet.gravity}
                `;
            } else if (type === 'terrain') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Terrain:</strong> ${planet.terrain}
                `;
            } else if (type === 'population') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Population:</strong> ${planet.population}
                `;
            } else if (type === 'rotation_period') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Rotation Period:</strong> ${planet.rotation_period}
                `;
            } else if (type === 'orbital_period') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Orbital Period:</strong> ${planet.orbital_period}
                `;
            } else if (type === 'diameter') {
                info = `
                    <strong>Planet:</strong> ${planet.name}<br>
                    <strong>Diameter:</strong> ${planet.diameter}
                `;
            }
            planetCard.innerHTML = info;
            planetContainer.appendChild(planetCard);
        });
    }
});