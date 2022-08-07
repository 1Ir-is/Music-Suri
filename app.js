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