document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    const albumArt = document.getElementById('album-art');
    const queueList = document.getElementById('queue-list');
    
    // Music library
    const songs = [
        {
            title: "Darbar Sahib",
            artist: "Golden Temple Amritsar",
            src: "https://live.sgpc.net:8442/; nocache=889869",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4BAvM5X9MT28cty46wI7QG6tjozAi6cobTg&s",
            duration: "3:20"
        },
        {
            title: "Brahm Bunga Dodra",
            artist: "Gurduwara Brahm Bunga Sahib Dodra",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover: "data:image/jpeg;base64,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",
            duration: "3:35"
        },
        {
            title: "Divine Love",
            artist: "Waheguru",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            cover: "https://images.unsplash.com/photo-1638347419042-40d24bb64d0d?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            duration: "3:23"
        },
        {
            title: "AKJ Kirtan",
            artist: "Akhand Kirtan Jatha",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            cover: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSI7MiYnO6SV4jXDwvHx0p-W1InbtTrknuvOatvtIJzl7FSE2ATnkS1ynjRTYLOtYYzA1vO",
            duration: "2:21"
        },
        {
            title: "Dukh Nivaran Sahib - Ludhiana ",
            artist: "",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            cover: "https://www.billboard.com/wp-content/uploads/2023/08/olivia-rodrigo-press-cr-Zamar-Velez-2023-billboard-1548.jpg",
            duration: "2:58"
        }
    ];
    
    // Player state
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;
    let originalQueue = [...songs];
    let shuffledQueue = [...songs].sort(() => Math.random() - 0.5);
    
    // Initialize player
    function initPlayer() {
        loadSong(currentSongIndex);
        renderQueue();
        updatePlayerState();
    }
    
    // Load song
    function loadSong(index) {
        const song = isShuffled ? shuffledQueue[index] : originalQueue[index];
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        albumArt.src = song.cover;
        audioPlayer.src = song.src;
        durationEl.textContent = song.duration;
        
        // Add active class to current song in queue
        const queueItems = document.querySelectorAll('.queue-item');
        queueItems.forEach(item => item.classList.remove('active'));
        if (queueItems[index]) {
            queueItems[index].classList.add('active');
        }
    }
    
    // Play song
    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
        document.querySelector('.player-container').classList.add('playing');
        updatePlayerState();
    }
    
    // Pause song
    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
        document.querySelector('.player-container').classList.remove('playing');
        updatePlayerState();
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = (isShuffled ? shuffledQueue : originalQueue).length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex >= (isShuffled ? shuffledQueue : originalQueue).length) {
            if (isRepeated) {
                currentSongIndex = 0;
            } else {
                currentSongIndex--;
                pauseSong();
                return;
            }
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.setProperty('--progress', `${progressPercent}%`);
        
        // Format time
        const formatTime = (time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
        
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Auto-play next song when current ends
        if (currentTime >= duration - 0.5 && duration > 0) {
            nextSong();
        }
    }
    
    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }
    
    // Set volume
    function setVolume() {
        audioPlayer.volume = this.value;
    }
    
    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
        
        if (isShuffled) {
            // Find current song in shuffled queue
            const currentSong = originalQueue[currentSongIndex];
            currentSongIndex = shuffledQueue.findIndex(song => song.title === currentSong.title);
        } else {
            // Find current song in original queue
            const currentSong = shuffledQueue[currentSongIndex];
            currentSongIndex = originalQueue.findIndex(song => song.title === currentSong.title);
        }
        
        updatePlayerState();
    }
    
    // Toggle repeat
    function toggleRepeat() {
        isRepeated = !isRepeated;
        repeatBtn.classList.toggle('active', isRepeated);
        updatePlayerState();
    }
    
    // Render queue
    function renderQueue() {
        queueList.innerHTML = '';
        const queue = isShuffled ? shuffledQueue : originalQueue;
        
        queue.forEach((song, index) => {
            const queueItem = document.createElement('div');
            queueItem.className = `queue-item ${index === currentSongIndex ? 'active' : ''}`;
            queueItem.innerHTML = `
                <div class="queue-item-img">
                    <img src="${song.cover}" alt="${song.title}">
                </div>
                <div class="queue-item-info">
                    <h4>${song.title}</h4>
                    <p>${song.artist}</p>
                </div>
                <div class="queue-item-duration">${song.duration}</div>
            `;
            
            queueItem.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                if (isPlaying) {
                    playSong();
                }
            });
            
            queueList.appendChild(queueItem);
        });
    }
    
    // Update player state (for UI feedback)
    function updatePlayerState() {
        // Update active song in queue
        const queueItems = document.querySelectorAll('.queue-item');
        queueItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSongIndex);
        });
        
        // Update button states
        shuffleBtn.classList.toggle('active', isShuffled);
        repeatBtn.classList.toggle('active', isRepeated);
    }
    
    // Event listeners
    playBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });
    
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    
    progressBar.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                isPlaying ? pauseSong() : playSong();
                break;
            case 'ArrowLeft':
                audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
                break;
            case 'ArrowRight':
                audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
                break;
            case 'ArrowUp':
                volumeSlider.value = Math.min(1, parseFloat(volumeSlider.value) + 0.1);
                setVolume.call(volumeSlider);
                break;
            case 'ArrowDown':
                volumeSlider.value = Math.max(0, parseFloat(volumeSlider.value) - 0.1);
                setVolume.call(volumeSlider);
                break;
        }
    });
    
    // Initialize the player
    initPlayer();
    
    // Add animation to album art on load
    albumArt.addEventListener('load', function() {
        this.style.opacity = 1;
    });
});

