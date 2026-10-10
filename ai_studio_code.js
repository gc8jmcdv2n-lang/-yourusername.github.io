document.addEventListener("DOMContentLoaded", () => {
    const gameListContainer = document.getElementById('game-list');
    const gameFrame = document.getElementById('game-frame');
    const welcomeMsg = document.getElementById('welcome-msg');

    // Fetch the game data from JSON
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            // Clear the loading message
            gameListContainer.innerHTML = '';

            // Create buttons for each game
            games.forEach(game => {
                const button = document.createElement('button');
                button.classList.add('game-btn');
                button.innerText = game.title;
                
                // Click event to load game
                button.onclick = () => {
                    welcomeMsg.style.display = 'none';
                    gameFrame.style.display = 'block';
                    gameFrame.src = game.url;
                };

                gameListContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error loading games:', error);
            gameListContainer.innerHTML = '<p style="color:red">Failed to load games.</p>';
        });
});