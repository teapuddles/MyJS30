// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions
function togglePlay() {
    if(video.paused){
        video.play()
    } else {
        video.pause()   
    }
    // there is no play property 
    // on video, only pause/paused
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';  
    toggle.textContent = icon 
}

function skip() {
    console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip)
    // with our data tag in our html file, we named it "skip"
    // now our dataset holds the value of whatever is in our data-skip tag
    // that number, which we wrote as a string, is assigned the videos current time
    // that string is turned into a number with parseFloat 
    // that number, now being our current time, is how many seconds are skipped.
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value)
    console.log(this.name)
    // here this.name is showing our volume and playbackRate sliders
    // the values of those sliders are this.value
    // because video has properites called volumer and playbackRate
    // they can be updated this way in a single line. WOAH!
    // for that, there are eventListeners called 'timeupdate' and 'progress'

}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
    // the html/css of the progress bar has a property called flex-basis
    // this is shown as a percent, and when 100%, the progress is complete
    // instead of having this constantly update with an interval or timeout
    // the best plan is to have it listen for something the video is doing
}

// scrub feature
function scrub(e) {
    console.log(e)
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // listen for a click on the progress bar
    // the event tells us where on the progress bar we clicked
    // from there, we can use the X Axis value stored in that click
    // that's what offsetX is, memba? 
    // the progress.offsetWidth is the whole width of the bar
}

// hook up event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

skipButtons.forEach(button => button.addEventListener('click', skip))

toggle.addEventListener('click', togglePlay)

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
// && is being used here because if mousemove is set to true it goes to scrub
// if its false, it just returns false and you don't scrub
// its like a fun lil ternary for our event listeners
// we still need the event because our scrub fucntion needs the event to work. 
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)



