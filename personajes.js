document.addEventListener('DOMContentLoaded', () => {
    fetch('https://swapi.py4e.com/api/people/')
        .then(response => response.json())
        .then(data => {
            const characters = data.results;
            const characterInfoDiv = document.getElementById('character-info');

            characterInfoDiv.innerHTML = characters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Height:</strong> ${character.height} cm</p>
                    <p><strong>Mass:</strong> ${character.mass} kg</p>
                    <p><strong>Hair Color:</strong> ${character.hair_color}</p>
                    <p><strong>Skin Color:</strong> ${character.skin_color}</p>
                    <p><strong>Eye Color:</strong> ${character.eye_color}</p>
                    <p><strong>Birth Year:</strong> ${character.birth_year}</p>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching character data:', error);
        });
});