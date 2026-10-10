# -yourusername.github.io
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Instant Game Search</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #121212;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
        }

        .search-container {
            width: 100%;
            max-width: 600px;
            text-align: center;
            margin-bottom: 30px;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #4f46e5;
        }

        .search-box {
            display: flex;
            width: 100%;
            background: #1e1e1e;
            border: 2px solid #333;
            border-radius: 30px;
            padding: 5px 15px;
            transition: all 0.3s ease;
        }

        .search-box:focus-within {
            border-color: #4f46e5;
            box-shadow: 0 0 10px rgba(79, 70, 229, 0.5);
        }

        .search-box input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: white;
            font-size: 1.1rem;
            padding: 10px;
        }

        .search-box button {
            background: #4f46e5;
            border: none;
            color: white;
            padding: 10px 25px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: background 0.2s;
        }

        .search-box button:hover {
            background: #4338ca;
        }

        .answer-box {
            width: 100%;
            max-width: 800px;
            background: #1e1e1e;
            border: 1px solid #2e2e2e;
            border-radius: 12px;
            padding: 25px;
            margin-top: 10px;
            display: none; /* Hidden by default */
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .answer-header {
            font-size: 0.9rem;
            color: #aaa;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }

        .game-title {
            font-size: 1.8rem;
            color: #fff;
            margin-bottom: 15px;
        }

        .game-frame-container {
            position: relative;
            width: 100%;
            padding-top: 56.25%; /* 16:9 Aspect Ratio */
            background: #000;
            border-radius: 8px;
            overflow: hidden;
        }

        .game-frame-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }

        .status-message {
            color: #ef4444;
            margin-top: 15px;
            font-size: 1.1rem;
            display: none;
        }
    </style>
</head>
<body>

    <div class="search-container">
        <h1>Arcade Search</h1>
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Type a game name (e.g., Slope, 1v1.lol)..." autocomplete="off">
            <button id="searchButton">Search</button>
        </div>
        <div id="statusMessage" class="status-message"></div>
    </div>

    <!-- Google-style Featured Snippet / Answer Box -->
    <div id="answerBox" class="answer-box">
        <div class="answer-header">Top Result Found</div>
        <div class="game-title" id="displayTitle">Game Name</div>
        <div class="game-frame-container">
            <iframe id="gameIframe" src="" allowfullscreen></iframe>
        </div>
    </div>

    <script>
        // Database of games. Expand this array to add more games to your engine.
        const gameDatabase = [
            {
                names: ["slope", "slope game", "slope unblocked"],
                title: "Slope",
                embedUrl: "https://googleusercontent.com"
            },
            {
                names: ["1v1.lol", "1v1 lol", "1v1", "one v one"],
                title: "1v1.lol",
                embedUrl: "https://1v1.lol"
            },
            {
                names: ["retro bowl", "retrobowl"],
                title: "Retro Bowl",
                embedUrl: "https://googleusercontent.com"
            }
        ];

        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const answerBox = document.getElementById('answerBox');
        const displayTitle = document.getElementById('displayTitle');
        const gameIframe = document.getElementById('gameIframe');
        const statusMessage = document.getElementById('statusMessage');

        function executeSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            // Clear prior states
            answerBox.style.display = "none";
            gameIframe.src = "";
            statusMessage.style.display = "none";

            if (query === "") {
                return;
            }

            // Find closest matching game based on array of alternate terms
            const matchedGame = gameDatabase.find(game => 
                game.names.some(name => query.includes(name) || name.includes(query))
            );

            if (matchedGame) {
                // Populate snippet display immediately like Google
                displayTitle.textContent = matchedGame.title;
                gameIframe.src = matchedGame.embedUrl;
                answerBox.style.display = "block";
            } else {
                statusMessage.textContent = "No unblocked version found for that query. Try 'Slope' or '1v1.lol'.";
                statusMessage.style.display = "block";
            }
        }

        // Listen for click or pressing the 'Enter' key
        searchButton.addEventListener('click', executeSearch);
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    </script>
</body>
</html>