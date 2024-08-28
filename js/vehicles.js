document.addEventListener('DOMContentLoaded', () => {
    fetch('https://swapi.dev/api/vehicles/')
        .then(response => response.json())
        .then(data => {
            const vehicles = data.results;
            const vehicleInfoDiv = document.getElementById('vehicle-info');

            vehicleInfoDiv.innerHTML = vehicles.map(vehicle => `
                <div class="card">
                    <h2>${vehicle.name}</h2>
                    <p><strong>Model:</strong> ${vehicle.model}</p>
                    <p><strong>Manufacturer:</strong> ${vehicle.manufacturer}</p>
                    <p><strong>Cost in Credits:</strong> ${vehicle.cost_in_credits}</p>
                    <p><strong>Length:</strong> ${vehicle.length} meters</p>
                    <p><strong>Crew:</strong> ${vehicle.crew}</p>
                    <p><strong>Passengers:</strong> ${vehicle.passengers}</p>
                    <p><strong>Vehicle Class:</strong> ${vehicle.vehicle_class}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching vehicle data:', error);
        });
});
