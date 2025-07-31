// script.js
const songs = [
    {
      title: "First Song",
      artist: "Artist One",
      src: "songs/song1.mp3"
    },
    {
      title: "Second Track",
      artist: "Artist Two",
      src: "songs/song2.mp3"
    },
    {
      title: "Third Tune",
      artist: "Artist Three",
      src: "songs/song3.mp3"
    }
  ];
  
  let currentSongIndex = 0;
  
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const progress = document.getElementById('progress');
  const currentTime = document.getElementById('current-time');
  const duration = document.getElementById('duration');
  const volume = document.getElementById('volume');
  const playlistEl = document.getElementById('playlist');
  
  function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    updatePlaylistHighlight();
  }
  
  function playSong() {
    audio.play();
    playBtn.textContent = '⏸️';
  }
  
  function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶️';
  }
  
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });
  
  prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSong();
  });
  
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
  }
  
  audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;
  
    currentTime.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  });
  
  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
  
  volume.addEventListener('input', () => {
    audio.volume = volume.value;
  });
  
  audio.addEventListener('ended', () => {
    nextSong(); // autoplay
  });
  
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
  
  function updatePlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = `${song.title} - ${song.artist}`;
      li.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(index);
        playSong();
      });
      playlistEl.appendChild(li);
    });
  }
  
  function updatePlaylistHighlight() {
    const items = playlistEl.querySelectorAll('li');
    items.forEach((li, idx) => {
      li.classList.toggle('active', idx === currentSongIndex);
    });
  }
  
  // Initial load
  loadSong(currentSongIndex);
  updatePlaylist();
  