const audio = document.querySelector("audio");
const title = document.querySelector("h1");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current_time = document.getElementById("current_time");
const current_audio = document.getElementById("current_audio");
const progressContainer = document.querySelector(".progress_container");
const progress = document.getElementById("progress");

const songs = [
  "Pink Floyd - The Great Gig In The Sky",
  "Gustavo Cerati - Beautiful",
  "Radiohead - Karma Police",
  "Cowboy Bepop - Rain",
  "Björk - Venus As A Boy",
  "Sade - No Ordinary Love",
  "Gorillaz - On Melancholy Hill",
  "Tame Impala - Let It Happen"
];

let audioIndex = 0;

loadAudio(songs[audioIndex])

// Carga la canción con una expresión regular
function loadAudio(song) {
  title.textContent = song;
  audio.src = `Music/${song}.mp3`;

  audio.addEventListener("loadedmetadata", () => {
    timeSong(audio.duration, current_audio);
  });
}

// Reproduce la canción
function playSong() {
  play.classList.add("play");

  const icon = play.querySelector("i.fas");
  // Iconos de Font Awesome
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");

  audio.play();

}

// Pausa la canción
function pauseSong() {
  play.classList.remove("play");

  const icon = play.querySelector("i.fas");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");

  audio.pause();

}

// Reproduce la canción anterior
function prevSong() {
  audioIndex--

  if (audioIndex < 0) {
    audioIndex = songs.length - 1;
  }

  loadAudio(songs[audioIndex]);
  playSong();

}

// Reproduce la canción siguiente
function nextSong() {
  audioIndex++

  if (audioIndex > songs.length - 1) {
    audioIndex = 0
  }

  loadAudio(songs[audioIndex]);
  playSong();

}

// Actualiza la barra de progreso
function updateBarPorgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;

}

// Permite ir a un momento de la canción
function setProgress(e) {
  const width = this.clientWidth;
  const clickPosition = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickPosition / width) * duration;
}

// Calcular la duración de la canción
function timeSong(audio, element) {

  const totalSeconds = Math.round(audio);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60; 
  
  element.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
} 

// Eventos
play.addEventListener("click", () => {
  const isPlaying = play.classList.contains("play");

  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

// Escuchas
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", (e) => {
  updateBarPorgress(e)
  timeSong(audio.currentTime, current_time);
});

progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
