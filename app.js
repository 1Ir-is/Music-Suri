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
    {song: "Thủy Triều (潮汐)"   , author: "Pho Mong Dong"},
    {song: "Xuất Sơn / 出山"     , author: "Hoa Chúc, Vương Thắng Nam"},
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