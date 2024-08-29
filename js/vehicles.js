document.addEventListener('DOMContentLoaded', () => {
    const showAllInfoButton = document.getElementById('show-all-info-btn');
    const passengersButton = document.getElementById('passengers-btn');
    const crewButton = document.getElementById('crew-btn');
    const manufacturerButton = document.getElementById('manufacturer-btn');
    const repulsorcraftButton = document.getElementById('repulsorcraft-btn');
    const lengthButton = document.getElementById('length-btn');
    const cargoCapacityButton = document.getElementById('cargo-capacity-btn');
    const costInCreditsButton = document.getElementById('cost-in-credits-btn'); // New Button
    const container = document.getElementById('vehicles-container');

    fetchAndDisplayVehicles('all'); // Load all information by default

    showAllInfoButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('all');
    });

    passengersButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('passengers');
    });

    crewButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('crew');
    });

    manufacturerButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('manufacturer');
    });

    repulsorcraftButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('repulsorcraft');
    });

    lengthButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('length');
    });

    cargoCapacityButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('cargo_capacity');
    });

    costInCreditsButton.addEventListener('click', async () => {
        await fetchAndDisplayVehicles('cost_in_credits');
    });

    async function fetchAndDisplayVehicles(type) {
        try {
            const response = await fetch('https://swapi.dev/api/vehicles/');
            const data = await response.json();
            const vehicles = data.results;
            console.log('Fetched vehicles:', vehicles); // Debugging: Log the fetched vehicles

            if (type === 'repulsorcraft') {
                displayRepulsorcraft(vehicles);
            } else if (type === 'length') {
                displayLength(vehicles);
            } else if (type === 'cargo_capacity') {
                displayCargoCapacity(vehicles);
            } else if (type === 'cost_in_credits') {
                displayCostInCredits(vehicles);
            } else {
                displayVehicles(vehicles, type);
            }
        } catch (error) {
            console.error('Error fetching vehicles data:', error);
        }
    }

    function displayVehicles(vehicles, type) {
        container.innerHTML = ''; // Clear previous content

        vehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'info-card';
            let info;
            if (type === 'all') {
                info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Manufacturer:</strong> ${vehicle.manufacturer}<br>
                    <strong>Passengers:</strong> ${vehicle.passengers}<br>
                    <strong>Crew:</strong> ${vehicle.crew}<br>
                    <strong>Length:</strong> ${vehicle.length}<br>
                    <strong>Cargo Capacity:</strong> ${vehicle.cargo_capacity}<br>
                    <strong>Cost in Credits:</strong> ${vehicle.cost_in_credits}
                `;
            } else if (type === 'passengers') {
                info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Passengers:</strong> ${vehicle.passengers}
                `;
            } else if (type === 'crew') {
                info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Crew:</strong> ${vehicle.crew}
                `;
            } else if (type === 'manufacturer') {
                info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Manufacturer:</strong> ${vehicle.manufacturer}
                `;
            }
            card.innerHTML = info;
            container.appendChild(card);
        });
    }

    function displayRepulsorcraft(vehicles) {
        container.innerHTML = ''; // Clear previous content

        vehicles
            .filter(vehicle => vehicle.vehicle_class === 'repulsorcraft')
            .forEach(vehicle => {
                const card = document.createElement('div');
                card.className = 'info-card';
                const info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Class:</strong> ${vehicle.vehicle_class}
                `;
                card.innerHTML = info;
                container.appendChild(card);
            });
    }

    function displayLength(vehicles) {
        container.innerHTML = ''; // Clear previous content

        vehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'info-card';
            const info = `
                <strong>Name:</strong> ${vehicle.name}<br>
                <strong>Model:</strong> ${vehicle.model}<br>
                <strong>Length:</strong> ${vehicle.length}
            `;
            card.innerHTML = info;
            container.appendChild(card);
        });
    }

    function displayCargoCapacity(vehicles) {
        container.innerHTML = ''; // Clear previous content

        vehicles
            .filter(vehicle => parseInt(vehicle.cargo_capacity, 10) > 100)
            .forEach(vehicle => {
                const card = document.createElement('div');
                card.className = 'info-card';
                const info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Cargo Capacity:</strong> ${vehicle.cargo_capacity}
                `;
                card.innerHTML = info;
                container.appendChild(card);
            });
    }

    function displayCostInCredits(vehicles) {
        container.innerHTML = ''; // Clear previous content

        vehicles
            .filter(vehicle => parseInt(vehicle.cost_in_credits, 10) > 2000)
            .forEach(vehicle => {
                const card = document.createElement('div');
                card.className = 'info-card';
                const info = `
                    <strong>Name:</strong> ${vehicle.name}<br>
                    <strong>Model:</strong> ${vehicle.model}<br>
                    <strong>Cost in Credits:</strong> ${vehicle.cost_in_credits}
                `;
                card.innerHTML = info;
                container.appendChild(card);
            });
    }
});
