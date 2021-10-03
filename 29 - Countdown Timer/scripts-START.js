let timerId;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timer
    clearInterval(timerId);

    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds); // display imediately, as setInterval takes a second to display
    displayEndTime(then);

    timerId = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if should stop
        if(secondsLeft < 0) {
            console.log('execution stop')
            clearInterval(timerId);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(millis) {
    let time = new Date(millis);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    //convert to 12 hours system & display it
    //leading 0 if minutes < 10
    endTimeDisplay.textContent = `Be back at: ${hours > 12 ? hours -= 12 : hours}:${minutes < 10 ? '0' : '' }${minutes}`;
}

// Event handlers

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
};

function startCustomTimer(e) {
    e.preventDefault();
    const minutesEntered = parseInt(this.minutes.value);
    const seconds = minutesEntered * 60;
    timer(seconds);
};

buttons.forEach(button => button.addEventListener('click', startTimer));
document.forms.customForm.addEventListener('submit', startCustomTimer);

