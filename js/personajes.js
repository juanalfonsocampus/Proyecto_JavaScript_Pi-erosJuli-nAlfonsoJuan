document.addEventListener('DOMContentLoaded', () => {
    const characterInfoDiv = document.getElementById('character-info');
    const toggleButton = document.getElementById('toggle-view');
    const yellowEyesButton = document.getElementById('yellow-eyes');
    const fullInfoButton = document.getElementById('full-info');
    const femaleButton = document.getElementById('female-characters');
    const lightSkinnedButton = document.getElementById('light-skinned-characters');
    const massOver60Button = document.getElementById('mass-over-60');
    const heightOver120Button = document.getElementById('height-over-120');

    let viewMode = 'full';
    let allCharacters = [];
    let yellowEyeCharacters = [];
    let femaleCharacters = [];
    let lightSkinnedCharacters = [];
    let massOver60Characters = [];
    let heightOver120Characters = [];

    const fetchData = () => {
        const fetchPage = (url) => {
            return fetch(url)
                .then(response => response.json())
                .then(data => {
                    allCharacters = allCharacters.concat(data.results);
                    if (data.next) {
                        return fetchPage(data.next);
                    } else {
                        if (viewMode === 'yellowEyes') {
                            yellowEyeCharacters = allCharacters.filter(character => character.eye_color === 'yellow');
                            displayCharacters(yellowEyeCharacters);
                        } else if (viewMode === 'female') {
                            femaleCharacters = allCharacters.filter(character => character.gender === 'female');
                            displayCharacters(femaleCharacters);
                        } else if (viewMode === 'lightSkin') {
                            lightSkinnedCharacters = allCharacters.filter(character => character.skin_color === 'light');
                            displayCharacters(lightSkinnedCharacters);
                        } else if (viewMode === 'massOver60') {
                            massOver60Characters = allCharacters.filter(character => parseFloat(character.mass) > 60);
                            displayCharacters(massOver60Characters);
                        } else if (viewMode === 'heightOver120') {
                            heightOver120Characters = allCharacters.filter(character => parseFloat(character.height) > 120);
                            displayCharacters(heightOver120Characters);
                        } else {
                            displayCharacters(allCharacters);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching character data:', error);
                });
        };

        fetchPage('https://swapi.py4e.com/api/people/?page=1');
    };

    const displayCharacters = (characters) => {
        const limitedCharacters = characters.slice(0, 20);

        if (viewMode === 'yellowEyes') {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Eye Color:</strong> ${character.eye_color}</p>
                </div>
            `).join('');
        } else if (viewMode === 'female') {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Gender:</strong> ${character.gender}</p>
                </div>
            `).join('');
        } else if (viewMode === 'lightSkin') {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Skin Color:</strong> ${character.skin_color}</p>
                </div>
            `).join('');
        } else if (viewMode === 'hairColor') {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Hair Color:</strong> ${character.hair_color}</p>
                </div>
            `).join('');
        } else if (viewMode === 'massOver60') {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Mass:</strong> ${character.mass}</p>
                </div>
            `).join('');
        } else if (viewMode === 'heightOver120') {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
                <div class="character">
                    <h2>${character.name}</h2>
                    <p><strong>Height:</strong> ${character.height}</p>
                </div>
            `).join('');
        } else {
            characterInfoDiv.innerHTML = limitedCharacters.map(character => `
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
        }
    };

    const handleToggleClick = () => {
        if (viewMode === 'full') {
            viewMode = 'hairColor';
            // toggleButton.textContent = 'Show Full Info';
        } else {
            viewMode = 'full';
            toggleButton.textContent = 'Show Hair Color';
        }   
        fetchData();
    };

    const handleYellowEyesClick = () => {
        viewMode = 'yellowEyes';
        // yellowEyesButton.textContent = 'Show All Characters';
        fetchData();
    };

    const handleFemaleClick = () => {
        viewMode = 'female';
        // femaleButton.textContent = 'Show All Characters';
        fetchData();
    };

    const handleLightSkinClick = () => {
        viewMode = 'lightSkin';
        // lightSkinnedButton.textContent = 'Show All Characters';
        fetchData();
    };

    const handleMassOver60Click = () => {
        viewMode = 'massOver60';
        // massOver60Button.textContent = 'Show All Characters';
        fetchData();
    };

    const handleHeightOver120Click = () => {
        viewMode = 'heightOver120';
        // heightOver120Button.textContent = 'Show All Characters';
        fetchData();
    };

    const handleFullInfoClick = () => {
        viewMode = 'full';
        toggleButton.textContent = 'Show Hair Color';
        yellowEyesButton.textContent = 'Characters with Yellow Eyes';
        femaleButton.textContent = 'Female Characters';
        lightSkinnedButton.textContent = 'Light-Skinned Characters';
        massOver60Button.textContent = 'Characters with Mass Over 60';
        heightOver120Button.textContent = 'Characters with Height Over 120';
        fetchData();
    };

    fullInfoButton.addEventListener('click', handleFullInfoClick);
    toggleButton.addEventListener('click', handleToggleClick);
    yellowEyesButton.addEventListener('click', handleYellowEyesClick);
    femaleButton.addEventListener('click', handleFemaleClick);
    lightSkinnedButton.addEventListener('click', handleLightSkinClick);
    massOver60Button.addEventListener('click', handleMassOver60Click);
    heightOver120Button.addEventListener('click', handleHeightOver120Click);

    fetchData();
});
