let team = [];
let history = [];

function searchPokemon() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
        .then(response => response.json())
        .then(data => {
            const { name, sprites } = data;
            const pc = Math.floor(Math.random() * 100) + 1; 
            displayPokemon(name, pc, sprites.front_default);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayPokemon(name, pc, imageUrl) {
    const teamContainer = document.querySelector('.team-container');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <h3>${name}</h3>
        <p>PC: ${pc}</p>
        <img src="${imageUrl}" alt="${name}">
    `;
    teamContainer.appendChild(pokemonCard);
    team.push({ name, pc, imageUrl });
    if (team.length >= 6) {
        document.querySelector('button:nth-of-type(1)').disabled = true; 
    }
}

function addPokemon() {
    if (team.length < 6) {
        alert('Please search and add Pokemon to complete your team.');
    } else {
        const currentTeam = [...team];
        history.push(currentTeam);
        alert('Team added successfully!');
    }
}

function resetTeam() {
    team = [];
    document.querySelector('.team-container').innerHTML = '';
    document.querySelector('button:nth-of-type(1)').disabled = false; 
}

function createTeamElement(teamData, teamIndex) {
    const teamElement = document.createElement('div');
    teamElement.classList.add('team');
    

    const teamName = document.createElement('h2');
    teamName.textContent = `Team ${teamIndex + 1}`;
    teamElement.appendChild(teamName);
    

    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon-container');
    

    teamData.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');
        pokemonCard.innerHTML = `
            <h3>${pokemon.name}</h3>
            <p>PC: ${pokemon.pc}</p>
            <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
        `;
        pokemonContainer.appendChild(pokemonCard);
    });

    teamElement.appendChild(pokemonContainer);

    return teamElement;
}

function showHistory() {
    const historyModal = document.getElementById('historyModal');
    const historyContent = document.getElementById('historyContent');

    historyContent.innerHTML = '';

    if (history.length === 0) {
        historyContent.innerText = 'No history available.';
    } else {

        history.forEach((teamData, index) => {
            const teamElement = createTeamElement(teamData, index);
            historyContent.appendChild(teamElement);
        });
    }

    historyModal.style.display = 'block';
}

function closeModal() {
    const historyModal = document.getElementById('historyModal');
    historyModal.style.display = 'none';
}
