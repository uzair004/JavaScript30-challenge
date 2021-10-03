let player = document.querySelector('.player');
let video = player.querySelector('.viewer');
let progress = player.querySelector('.progress');
let progressBar = player.querySelector('.progress__filled');
let toggle = player.querySelector('.toggle');
let muteButton = player.querySelector('.mute');
let ranges = player.querySelectorAll('.player__slider');
let skipButtons = player.querySelectorAll('[data-skip]');
let fullscreenButton = player.querySelector('.fullscreen');
let currentPlayingMinute = player.querySelector('.current-minutes');
let currentPlayingSecond = player.querySelector('.current-seconds');
let totalVideoMinutes = player.querySelector('.total-minutes');
let totalVideoSeconds = player.querySelector('.total-seconds');

// play/pause the video

function togglePlay() {
    let run = video.paused ? 'play' : 'pause';
    video[run]();
};

function updateToggleButton() {
    let icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
};

function skipVideo() {
    video.currentTime += parseFloat(this.dataset.skip);
};

function changeSpeedOrVolume(event) {
    this.name === 'volume' ? video.volume = this.value : video.playbackRate = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

    // for current time show at left of progressbar
    let MinutesNow = Math.floor((video.currentTime / 60));
    let secondsNow = Math.floor((video.currentTime % 60));
    currentPlayingMinute.textContent = MinutesNow < 10 ? '0'+MinutesNow : MinutesNow;
    currentPlayingSecond.textContent = secondsNow < 10 ? '0'+secondsNow : secondsNow; 
};

function scrubVideo(e) {
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

function togglePlayOnSpace(event) {
    event.preventDefault(); // prevent default browser action of resizing video
    if(event.code === 'Space') {
        let run = video.paused ? 'play' : 'pause';
        video[run]();
    }
};

function toggleFullscreen() {

    isFullscreen ? closeFullscreen() : openFullscreen();
    function openFullscreen() {
        if(!isFullscreen) {
            if(player.requestFullscreen) {
                player.requestFullscreen();
            } else if(player.mozRequestFullscreen) {
                player.mozRequestFullscreen();
            } else if(player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen();
            }else if(player.msRequestFullscreen) {
                player.msRequestFullscreen();
            }
            isFullscreen = true;
         }    
    }

    function closeFullscreen() {

        if(isFullscreen) {
            if(document.exitFullscreen) {
                document.exitFullscreen();
            }else if(document.mozExitFullscreen) {
                document.mozExitFullscreen();
            }else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if(document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            isFullscreen = false;
        }
    }           
   
};

function toggleMute() {
   video.muted ? video.muted = false : video.muted = true;
   let icon = video.muted ? '🔇' : '🔉';
   muteButton.textContent = icon;
};

function totalDuration() {
    let totalminutes = Math.floor((video.duration / 60));
    let totalseconds = Math.floor((video.duration % 60));
    totalVideoMinutes.textContent = totalminutes < 10 ? '0'+totalminutes : totalminutes;
    totalVideoSeconds.textContent = totalseconds < 10 ? '0'+totalseconds : totalseconds;
};


// Event Listeners

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('play', updateToggleButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('loadedmetadata', totalDuration);

toggle.addEventListener('click', togglePlay);
document.addEventListener('keydown', togglePlayOnSpace);
skipButtons.forEach(skipBtn => skipBtn.addEventListener('click', skipVideo));
ranges.forEach(slider => slider.addEventListener('input', changeSpeedOrVolume));
muteButton.addEventListener('click', toggleMute);

let isMouseDown = false;
progress.addEventListener('click', scrubVideo)
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mousemove', (e) => isMouseDown && scrubVideo(e));
progress.addEventListener('mouseup', () => isMouseDown = false);

let isFullscreen = false;
fullscreenButton.addEventListener('click', toggleFullscreen);



