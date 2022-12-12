"use strict"

let trackImg = document.querySelector(".track-img")
let trackName = document.querySelector(".track-name")
let trackArtist = document.querySelector(".track-artist")

//btn
let prevTrack = document.querySelector(".prev-track")
let pause = document.querySelector(".pause")
let nextTrack = document.querySelector(".next-track")



//time
let currentTime =  document.querySelector(".current-time")
let totalTime =  document.querySelector(".total-time")
let seekSlider =  document.querySelector(".seek-slider")

//volume
let volumeSlider =  document.querySelector(".volume-slider")


let isPlaying = false;
let updateTimer;
let trackIndex = 0
let currentTack = document.createElement('audio');


let trackList = [
      {
        name: "The Joker And The Queen",
        artist: "Ed Sheeran",
        image: "./media/Ed_Sheeran_-_The_Joker_and_the_Queen.png",
        path: "/home/eavgrey/Рабочий стол/Programm (little dog)/Spotify/media/02.mp3"
      },
      {
        name: "Maybe I Maybe You",
        artist: "Scorpions",
        image: "/media/scorpions.jpg",
        path: "/media/Maybe I Maybe You.aac"
      },
      {
        name: "I Will Find You",
        artist: "Audiomachine",
        image: "/media/03.jpg",
        path: "/media/Audiomachine-I Will Find You-kissvk.com.mp3"
      },
      {
        name: "Difficult",
        artist: "Eminem",
        image: "/media/04.jpg",
        path: "/media/Eminem - Difficult.mp3"
      },
      {
        name: "Enemy",
        artist: "Imagine Dragons",
        image: "/media/05.jpg",
        path: "media/imagine-dragons_-_enemy.mp3"
      },
      {
        name: "Diamonds",
        artist: "Sam Smith",
        image: "/media/06.jpeg",
        path: "/media/Sam Smith-Diamonds.mp3 "
      },
      {
        name: "Shape of my heart",
        artist: "Sting",
        image: "/media/07.jpg",
        path: "/media/sting_-_shape-of-my-heart.mp3"
      },

   
      
]

function loadTrack(trackIndex) {
  clearInterval(updateTimer);

    resetValues();
   
    currentTack.src = trackList[trackIndex].path;
   currentTack.load();
   
    // Update details of the track
    trackImg.style.backgroundImage =
       "url(" + trackList[trackIndex].image + ")";
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
   
  
    // Set an interval of 1000 milliseconds for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
  
    currentTack.addEventListener("ended", next_track);
   
   
    random_bg_color();
  }
   

  function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    document.body.style.background = bgColor;
  }
   

  function resetValues() {
    currentTime.textContent = "00:00";
    totalTime.textContent = "00:00";
    seekSlider.value = 0;
  }


  function playpauseTrack() {
   
    if (!isPlaying) playTrack();
    else pauseTrack();
    }
    
    function playTrack() {
      currentTack.play();
      isPlaying = true;
      pause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    
    function pauseTrack() {
    currentTack.pause();
    isPlaying = false;
    pause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    
    let randomIcon = document.querySelector(".random")
 

function random(){
  randomIcon.classList.toggle('active')
 

}

let repeatIcon = document.querySelector(".repeat")

function repeat(){
  if (currentTack.loop == true) {
    currentTack.loop = false
    repeatIcon.classList.toggle('active')
}
else {
  currentTack.loop = true
  repeatIcon.classList.toggle('active')
}

}

    function next_track() {
      if(  randomIcon.classList.contains('active')
      ){
        trackIndex = Math.floor(Math.random()*trackList.length)
        loadTrack(trackIndex);
        playTrack();
      } else if (trackIndex < trackList.length - 1)
      trackIndex += 1;
    else trackIndex = 0;
    loadTrack(trackIndex);
    playTrack();
    }
    
    function prev_track() {
      if(  randomIcon.classList.contains('active')
      ){
        trackIndex = Math.floor(Math.random()*trackList.length)
        loadTrack(trackIndex);
        playTrack();
      }
    if (trackIndex > 0)
    trackIndex -= 1;
    else trackIndex = trackList.length - 1;
    
    loadTrack(trackIndex);
    playTrack();
    }

    //this is not me :(
    function seekTo() {
     let seekto = currentTack.duration * (seekSlider.value / 100);
      currentTack.currentTime = seekto;
    }
    
    function setVolume() {
      currentTack.volume = volumeSlider.value / 100;
    }
    
    function seekUpdate() {
      let seekPosition = 0;
    
      // Check if the current track duration is a legible number
      if (!isNaN(currentTack.duration)) {
        seekPosition = currentTack.currentTime * (100 / currentTack.duration);
        seekSlider.value = seekPosition;
    
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(currentTack.currentTime / 60);
        let currentSeconds = Math.floor(currentTack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentTack.duration / 60);
        let durationSeconds = Math.floor(currentTack.duration - durationMinutes * 60);
    
        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalTime.textContent = durationMinutes + ":" + durationSeconds;
      }
    }
    
  loadTrack(0);