 const stations = [
            {
                id: 1,
                name: "Chillhop Radio",
                genre: "Lo-fi, Chillhop",
                frequency: "101.5 FM",
                streamUrl: "https://live.sgpc.net:8442/; nocache=889869",
                color: "#4cc9f0",
                icon: "fas fa-headphones"
            },
            {
                id: 2,
                name: "Rock Classics",
                genre: "Classic Rock",
                frequency: "98.7 FM",
                streamUrl: "https://icecast.rockradio.com/rockradio",
                color: "#f72585",
                icon: "fas fa-guitar"
            },
            {
                id: 3,
                name: "Jazz Vibes",
                genre: "Smooth Jazz",
                frequency: "91.2 FM",
                streamUrl: "https://jazz.stream.publicradio.org/jazz.mp3",
                color: "#7209b7",
                icon: "fas fa-music"
            },
            {
                id: 4,
                name: "Electronic Beats",
                genre: "Electronic, EDM",
                frequency: "104.3 FM",
                streamUrl: "https://stream.edmradio.com/edm",
                color: "#4361ee",
                icon: "fas fa-compact-disc"
            },
            {
                id: 5,
                name: "Classical Masterpieces",
                genre: "Classical",
                frequency: "99.9 FM",
                streamUrl: "https://stream.classicalradio.com/classical",
                color: "#4a4e69",
                icon: "fas fa-violin"
            },
            {
                id: 6,
                name: "Indie Mix",
                genre: "Indie, Alternative",
                frequency: "96.5 FM",
                streamUrl: "https://stream.indieradio.com/indie",
                color: "#38b000",
                icon: "fas fa-microphone-alt"
            }
        ];

        // Audio player
        let currentStationIndex = 0;
        let isPlaying = false;
        let audio = null;
        let visualizerBars = [];
        let volume = 70;

        // DOM Elements
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const volumeSlider = document.getElementById('volume-slider');
        const stationsContainer = document.getElementById('stations-container');
        const currentStationEl = document.getElementById('current-station');
        const currentTrackEl = document.getElementById('current-track');
        const currentArtistEl = document.getElementById('current-artist');
        const visualizerEl = document.getElementById('visualizer');
        const nowPlayingFooter = document.getElementById('now-playing-footer');

        // Initialize the app
        function init() {
            createVisualizer();
            renderStations();
            loadStation(currentStationIndex);
            updatePlayerDisplay();
            
            // Set initial volume
            if (audio) {
                audio.volume = volume / 100;
            }
            
            // Event listeners
            playBtn.addEventListener('click', togglePlay);
            prevBtn.addEventListener('click', playPrevStation);
            nextBtn.addEventListener('click', playNextStation);
            volumeSlider.addEventListener('input', updateVolume);
            
            // Auto-update track info (simulated)
            setInterval(updateTrackInfo, 10000);
            
            // Animate visualizer when playing
            setInterval(animateVisualizer, 200);
        }

        // Create visualizer bars
        function createVisualizer() {
            visualizerEl.innerHTML = '';
            for (let i = 0; i < 40; i++) {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = '10px';
                visualizerEl.appendChild(bar);
                visualizerBars.push(bar);
            }
        }

        // Animate visualizer bars
        function animateVisualizer() {
            if (!isPlaying) return;
            
            visualizerBars.forEach(bar => {
                const randomHeight = Math.floor(Math.random() * 80) + 10;
                bar.style.height = `${randomHeight}px`;
                bar.style.opacity = Math.random() * 0.5 + 0.5;
            });
        }

        // Render stations to the grid
        function renderStations() {
            stationsContainer.innerHTML = '';
            
            stations.forEach((station, index) => {
                const stationCard = document.createElement('div');
                stationCard.className = `station-card ${index === currentStationIndex ? 'active' : ''}`;
                stationCard.innerHTML = `
                    <div class="station-icon" style="background: linear-gradient(135deg, ${station.color}, #3a0ca3);">
                        <i class="${station.icon}"></i>
                    </div>
                    <h3 class="station-name-card">${station.name}</h3>
                    <p class="station-genre">${station.genre}</p>
                    <p class="station-frequency">${station.frequency}</p>
                `;
                
                stationCard.addEventListener('click', () => selectStation(index));
                stationsContainer.appendChild(stationCard);
            });
        }

        // Load a station
        function loadStation(index) {
            // Stop current audio if playing
            if (audio) {
                audio.pause();
                isPlaying = false;
                playIcon.className = 'fas fa-play';
            }
            
            // Update current station index
            currentStationIndex = index;
            
            // In a real app, we would load the actual stream URL
            // For demo purposes, we'll simulate loading
            console.log(`Loading station: ${stations[index].name} - ${stations[index].streamUrl}`);
            
            // Update UI
            updatePlayerDisplay();
            renderStations();
            nowPlayingFooter.textContent = stations[index].name;
            
            // If was playing before, start new station
            if (isPlaying) {
                // In a real app, we would create a new Audio object with the stream URL
                // For demo, we'll simulate playing
                playIcon.className = 'fas fa-pause';
                
                // Simulate audio context for demo
                if (!audio) {
                    audio = {
                        volume: volume / 100,
                        pause: () => {},
                        play: () => {}
                    };
                }
            }
        }

        // Toggle play/pause
        function togglePlay() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playIcon.className = 'fas fa-pause';
                console.log('Playing station:', stations[currentStationIndex].name);
                
                // In a real app, we would start the audio stream
                // audio = new Audio(stations[currentStationIndex].streamUrl);
                // audio.volume = volume / 100;
                // audio.play();
                
                // For demo, simulate playing
                if (!audio) {
                    audio = {
                        volume: volume / 100,
                        pause: () => {},
                        play: () => {}
                    };
                }
            } else {
                playIcon.className = 'fas fa-play';
                console.log('Paused station');
                
                // In a real app: audio.pause();
            }
        }

        // Play previous station
        function playPrevStation() {
            let newIndex = currentStationIndex - 1;
            if (newIndex < 0) newIndex = stations.length - 1;
            loadStation(newIndex);
            
            // If was playing, continue playing
            if (isPlaying) {
                playIcon.className = 'fas fa-pause';
            }
        }

        // Play next station
        function playNextStation() {
            let newIndex = currentStationIndex + 1;
            if (newIndex >= stations.length) newIndex = 0;
            loadStation(newIndex);
            
            // If was playing, continue playing
            if (isPlaying) {
                playIcon.className = 'fas fa-pause';
            }
        }

        // Select a station from the grid
        function selectStation(index) {
            loadStation(index);
            
            // Start playing if not already playing
            if (!isPlaying) {
                togglePlay();
            }
        }

        // Update volume
        function updateVolume() {
            volume = volumeSlider.value;
            if (audio) {
                audio.volume = volume / 100;
            }
        }

        // Update player display with current station info
        function updatePlayerDisplay() {
            const station = stations[currentStationIndex];
            currentStationEl.textContent = station.name;
            currentTrackEl.textContent = getRandomTrack(station.genre);
            currentArtistEl.textContent = getRandomArtist(station.genre);
        }

        // Update track info (simulated)
        function updateTrackInfo() {
            if (!isPlaying) return;
            
            const station = stations[currentStationIndex];
            currentTrackEl.textContent = getRandomTrack(station.genre);
            currentArtistEl.textContent = getRandomArtist(station.genre);
        }

        // Helper functions for demo track/artist names
        function getRandomTrack(genre) {
            const tracks = {
                "Lo-fi, Chillhop": ["Study Session", "Rainy Day Vibes", "Coffee Shop Sounds", "Midnight Coding", "Chill Beats"],
                "Classic Rock": ["Hotel California", "Stairway to Heaven", "Bohemian Rhapsody", "Sweet Child O' Mine", "Back in Black"],
                "Smooth Jazz": ["Night Smooth", "City Lights", "Saxophone Dreams", "Midnight Blue", "Jazz Cafe"],
                "Electronic, EDM": ["Neon Lights", "Club Beat", "Digital Dreams", "Energy Pulse", "Dance Floor"],
                "Classical": ["Moonlight Sonata", "Four Seasons", "Symphony No. 5", "Canon in D", "Clair de Lune"],
                "Indie, Alternative": ["Indie Dreams", "Alternative Reality", "Urban Echoes", "Modern Melancholy", "Underground Sound"]
            };
            
            const genreTracks = tracks[genre] || ["Unknown Track"];
            return genreTracks[Math.floor(Math.random() * genreTracks.length)];
        }

        function getRandomArtist(genre) {
            const artists = {
                "Lo-fi, Chillhop": ["Chillhop Music", "Lofi Girl", "Jazz Hop Cafe", "Ambient Relaxation", "Study Beats"],
                "Classic Rock": ["Eagles", "Led Zeppelin", "Queen", "Guns N' Roses", "AC/DC"],
                "Smooth Jazz": ["Kenny G", "Dave Koz", "Boney James", "Fourplay", "Chris Botti"],
                "Electronic, EDM": ["Avicii", "Calvin Harris", "David Guetta", "Swedish House Mafia", "Marshmello"],
                "Classical": ["Beethoven", "Mozart", "Bach", "Vivaldi", "Chopin"],
                "Indie, Alternative": ["Arctic Monkeys", "The Strokes", "Tame Impala", "Vampire Weekend", "Florence + The Machine"]
            };
            
            const genreArtists = artists[genre] || ["Various Artists"];
            return genreArtists[Math.floor(Math.random() * genreArtists.length)];
        }

        // Initialize when page loads

        window.addEventListener('DOMContentLoaded', init);



