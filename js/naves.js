document.addEventListener('DOMContentLoaded', () => {
    fetch('https://swapi.py4e.com/api/starships/')
        .then(response => response.json())
        .then(data => {
            const starships = data.results;
            const starshipInfoDiv = document.getElementById('starship-info');

            starshipInfoDiv.innerHTML = starships.map(starship => `
                <div class="card">
                    <h2>${starship.name}</h2>
                    <p><strong>Model:</strong> ${starship.model}</p>
                    <p><strong>Manufacturer:</strong> ${starship.manufacturer}</p>
                    <p><strong>Cost in Credits:</strong> ${starship.cost_in_credits}</p>
                    <p><strong>Length:</strong> ${starship.length} meters</p>
                    <p><strong>Crew:</strong> ${starship.crew}</p>
                    <p><strong>Passengers:</strong> ${starship.passengers}</p>
                    <p><strong>Starship Class:</strong> ${starship.starship_class}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching starship data:', error);
        });
});