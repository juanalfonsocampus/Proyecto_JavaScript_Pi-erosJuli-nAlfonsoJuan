document.addEventListener('DOMContentLoaded', () => {
    const designationButton = document.getElementById('designation-btn');
    const classificationButton = document.getElementById('classification-btn');
    const languageButton = document.getElementById('language-btn');
    const skinColorsButton = document.getElementById('skin-colors-btn');
    const averageHeightButton = document.getElementById('average-height-btn');
    const averageLifespanButton = document.getElementById('average-lifespan-btn');
    const eyeColorsButton = document.getElementById('eye-colors-btn');
    const container = document.getElementById('species-container');

    designationButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('designation');
    });

    classificationButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('classification');
    });

    languageButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('language');
    });

    skinColorsButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('skin_colors');
    });

    averageHeightButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('average_height');
    });

    averageLifespanButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('average_lifespan');
    });

    eyeColorsButton.addEventListener('click', async () => {
        await fetchAndDisplaySpecies('eye_colors');
    });

    async function fetchAndDisplaySpecies(type) {
        try {
            const response = await fetch('https://swapi.dev/api/species/');
            const data = await response.json();
            displaySpecies(data.results, type);
        } catch (error) {
            console.error('Error fetching species data:', error);
        }
    }

    function displaySpecies(species, type) {
        container.innerHTML = '';
        species.forEach(speciesItem => {
            const card = document.createElement('div');
            card.className = 'info-card';
            let info;
            if (type === 'designation') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Designation:</strong> ${speciesItem.designation}
                `;
            } else if (type === 'classification') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Classification:</strong> ${speciesItem.classification}
                `;
            } else if (type === 'language') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Language:</strong> ${speciesItem.language}
                `;
            } else if (type === 'skin_colors') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Skin Color:</strong> ${speciesItem.skin_colors}
                `;
            } else if (type === 'average_height') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Average Height:</strong> ${speciesItem.average_height}
                `;
            } else if (type === 'average_lifespan') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Average Lifespan:</strong> ${speciesItem.average_lifespan}
                `;
            } else if (type === 'eye_colors') {
                info = `
                    <strong>Name:</strong> ${speciesItem.name}<br>
                    <strong>Eye Colors:</strong> ${speciesItem.eye_colors}
                `;
            }
            card.innerHTML = info;
            container.appendChild(card);
        });
    }

});