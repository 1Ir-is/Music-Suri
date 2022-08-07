// button
const btnHome = document.querySelector(".go-home");
const btnPlayList = document.querySelector(".play-list");
const btnPlay = document.querySelector(".play-song");
const btnBack = document.querySelector(".back");
const btnForward = document.querySelector(".forward");
//
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const playListBox = document.querySelector(".playlist-box");
const songs = document.querySelector(".list-song");
const thumbnailSong = document.querySelector(".thumbnail-song img");
const nameSong = document.querySelector(".info-song .song-name");
const author = document.querySelector(".info-song .author");
const timeSong = document.querySelector(".bar-song .duration-time");
const musicContent = document.querySelector(".music-content");
const currentTimeDisplay = document.querySelector(".current-time");

//List Music
const listMusic = [
    {song: "As If Its Your Last" , author: "BLACKPINK"},
    {song: "DDU-DU DDU-DU"       , author: "BLACKPINK"},
    {song: "How You Like That"   , author: "BLACKPINK"},
    {song: "Lovesick Girls"      , author: "BLACKPINK"},
    {song: "Bang Bang Bang"      , author: "BIG BANG"},
    {song: "Haru Haru"           , author: "BIG BANG"},
    {song: "Gee"                 , author: "Girls' Generation"},
    {song: "Latata"              , author: "(G)I-DLE"},
  ];

  class UI{
    constructor() {
        this.songIndex = 0; //This class contains a constructor 
        //                  //that holds the song position in the list as this.songIndex = 0 and it also holds all the method for the music player.
    }

     // show playlist
    showPlayListBox() {
        playListBox.classList.add('active');
    }
    // hide playlist
    hidePlayListBox() {
        playListBox.classList.remove('active');
    }

    // load detail song when page loaded
    loadSong(music) {
        audio.src = `music/${music.song}.mp3`;

        this.getDuration(audio).then((time) => {
            thumbnailSong.src = `image/${music.song}.jpg`;
            nameSong.textContent = music.song;
            author.textContent = music.author;
            timeSong.textContent = time;
            thumbnailSong.classList.add('rotate-ani');
        });
    }

    //get duration song
    getDuration(music) {
       return new Promise(function (resolve) {
            music.addEventListener('loadedmetadata', function () {
            const time = formatTime(music.duration);

            resolve(time);
        });
        });
    }

   // set list song
   async setSongs() {
        songs.innerHTML = '';

     for (let i = 0; i < listMusic.length; i++) {
      const music = new Audio(`music/${listMusic[i].song}.mp3`);
      const time = await this.getDuration(music);

      songs.insertAdjacentHTML(
        'beforeend',
        `<div class="song-info">
          <div class="left">
            <span class="name-song">${listMusic[i].song}</span>
            <span class="author">${listMusic[i].author}</span>
          </div>
          <div class="right">
            <span class="minutes">${time}</span>
          </div>
        </div>`
      );
    }
  }

    // play song
  playSong() {
    musicContent.classList.add('playing');
    thumbnailSong.style.animationPlayState = 'running';
    btnPlay.querySelector('.fas').classList.remove('fa-play');
    btnPlay.querySelector('.fas').classList.add('fa-pause');

    audio.play();
  }

  // pause song
    pauseSong() {
    musicContent.classList.remove('playing');
    thumbnailSong.style.animationPlayState = 'paused';
    btnPlay.querySelector('.fas').classList.add('fa-play');
    btnPlay.querySelector('.fas').classList.remove('fa-pause');
  
    audio.pause();
  }
  
  // next song
    nextSong() {
        this.songIndex++;
  
        if (this.songIndex > listMusic.length - 1) {
      this.songIndex = 0;
        }
  
        this.loadSong(listMusic[this.songIndex]);
    }
  // prev song
    prevSong() {
        this.songIndex--;
  
        if (this.songIndex < 0) {
      this.songIndex = listMusic.length - 1;
      }
  
        this.loadSong(listMusic[this.songIndex]);
    }

     // update progress
    updateProgress(e) {
        const { currentTime, duration } = e.srcElement;
        const percentWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${percentWidth}%`;
        const time = formatTime(currentTime);
        currentTimeDisplay.textContent = time;
    }

    // set progress
    setProgress(e) {
        const width = e.offsetX;
        const progress = e.currentTarget;
        const progressBarWidth = (width / progress.clientWidth) * 100;
        progressBar.style.width = `${progressBarWidth}%`;
        let { duration } = audio;
        audio.currentTime = (width * duration) / progress.clientWidth;
    }

    // select song in playlist
    selectSong(e) {
        const target = e.target;
        const nameSong = target.querySelector('.name-song').textContent;
        const song = listMusic.find((audio) => audio.song === nameSong);
        this.loadSong(song);
        this.playSong();
        this.hidePlayListBox();
    }
}

document.addEventListener("DOMContentLoaded", eventListeners);

function eventListeners() {
  const ui = new UI();
  // load song
  ui.loadSong(listMusic[ui.songIndex]);
  // handle set list song
  ui.setSongs();
  // handle show playlist
  btnPlayList.addEventListener("click", function () {
    ui.showPlayListBox();
  });
  // handle hide playlist
  btnHome.addEventListener("click", function () {
    ui.hidePlayListBox();
  });
  // play/pause song
  btnPlay.addEventListener("click", function () {
    if (musicContent.classList.contains("playing")) {
      ui.pauseSong();
    } else {
      ui.playSong();
    }
  });
  // update progress
  audio.addEventListener("timeupdate", function (e) {
    ui.updateProgress(e);
  });
  // set progress
  progress.addEventListener("click", function (e) {
    ui.setProgress(e);
  });
  // previous song
  btnBack.addEventListener("click", function () {
    ui.prevSong();
    ui.playSong();
  });
  // forward song
  btnForward.addEventListener("click", function () {
    ui.nextSong();
    ui.playSong();
  });
  // end song
  audio.addEventListener("ended", function () {
    ui.nextSong();
    ui.playSong();
  });
  // select song
  songs.addEventListener("click", function (e) {
    ui.selectSong(e);
  });
}

//format time
function formatTime(sec_num) {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

    hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
}