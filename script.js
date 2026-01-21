// Audio elements for demo
const audioChannels = {
    kirtan: 'https://live.sgpc.net:8442/; nocache=889869',
    katha: 'https://usa20.fastcast4u.com:3760/;?type=http',
    history: 'https://usa3.fastcast4u.com/proxy/radiododra2?mp=/1',
    live: 'https://radio.sikhnet.com/proxy/channel1/stream_high_autodj'
};

let currentAudio = null;
let isPlaying = false;
let currentChannel = null;

// DOM Elements
const playBtn = document.getElementById('playBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const channelBtns = document.querySelectorAll('.channel-btn');
const currentTrack = document.getElementById('currentTrack');
const artistName = document.getElementById('artistName');

// Channel names in Punjabi
const channelNames = {
    kirtan: { track: 'ਸ੍ਰੀ ਹਰਮੰਦਰ ਸਾਹਿਬ', artist: 'Golden Temple Amritsar' },
    katha: { track: 'ਬ੍ਰਹਮ ਬੁੰਗਾ ਸਾਹਿਬ ਦੋਦੜਾ', artist: 'Gurduwara Brahm Bunga Sahib Dodra' },
    history: { track: 'ਵਾਹਿਗੁਰੂ', artist: 'Divine Love' },
    live: { track: 'ਆਪਸਪੀਸ', artist: 'Divine Love' }
};

// Play/Pause function
function togglePlayPause() {
    if (!currentAudio && !currentChannel) {
        playChannel('kirtan');
        return;
    }
    
    if (isPlaying) {
        currentAudio.pause();
        playIcon.className = 'fas fa-play';
        isPlaying = false;
    } else {
        currentAudio.play();
        playIcon.className = 'fas fa-pause';
        isPlaying = true;
    }
}

// Play specific channel
function playChannel(channel) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    currentChannel = channel;
    currentAudio = new Audio(audioChannels[channel]);
    currentAudio.volume = volumeSlider.value / 100;
    
    // Update display
    currentTrack.textContent = channelNames[channel].track;
    artistName.textContent = channelNames[channel].artist;
    
    // Play audio
    currentAudio.play();
    playIcon.className = 'fas fa-pause';
    isPlaying = true;
    
    // Update UI for selected channel
    updateChannelUI(channel);
}

// Update channel UI
function updateChannelUI(channel) {
    channelBtns.forEach(btn => {
        btn.parentElement.style.boxShadow = 'none';
        btn.textContent = 'ਸੁਣੋ';
    });
    
    const activeChannel = document.querySelector(`[data-channel="${channel}"]`);
    if (activeChannel) {
        activeChannel.style.boxShadow = '0 0 0 3px #FF9800';
        activeChannel.querySelector('.channel-btn').textContent = 'ਲਾਈਵ';
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    playChannel('kirtan');
});

playPauseBtn.addEventListener('click', togglePlayPause);

prevBtn.addEventListener('click', () => {
    const channels = Object.keys(audioChannels);
    const currentIndex = channels.indexOf(currentChannel);
    const prevIndex = (currentIndex - 1 + channels.length) % channels.length;
    playChannel(channels[prevIndex]);
});

nextBtn.addEventListener('click', () => {
    const channels = Object.keys(audioChannels);
    const currentIndex = channels.indexOf(currentChannel);
    const nextIndex = (currentIndex + 1) % channels.length;
    playChannel(channels[nextIndex]);
});

volumeSlider.addEventListener('input', () => {
    if (currentAudio) {
        currentAudio.volume = volumeSlider.value / 100;
    }
});

// Channel buttons
channelBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const channelCard = e.target.closest('.channel-card');
        const channel = channelCard.dataset.channel;
        playChannel(channel);
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.backgroundColor = '#FF9800';
    navLinks.style.padding = '1rem';
    navLinks.style.gap = '1rem';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize with first channel
window.addEventListener('load', () => {
    // Demo audio source - replace with your actual streaming URLs
    console.log('ਰੇਡੀਓ ਵੈਬਸਾਈਟ ਤਿਆਰ ਹੈ!');
    console.log('ਅਸਲੀ ਆਡੀਓ URL ਦੇ ਨਾਲ ਬਦਲੋ:');
    console.log('1. ਕੀਰਤਨ: ਤੁਹਾਡਾ_ਸਟ੍ਰੀਮ_URL_1');
    console.log('2. ਕਥਾ: ਤੁਹਾਡਾ_ਸਟ੍ਰੀਮ_URL_2');
    console.log('3. ਇਤਿਹਾਸ: ਤੁਹਾਡਾ_ਸਟ੍ਰੀਮ_URL_3');
    console.log('4. ਲਾਈਵ: ਤੁਹਾਡਾ_ਲਾਈਵ_ਸਟ੍ਰੀਮ_URL');
});

