const timer = document.getElementById('timer');
const focusBtn = document.getElementById('focus-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');
const startBtn = document.getElementById('start-btn');
const alarmSound = document.getElementById('alarm-sound');

let intervalId;
let remaining = 25 * 60;
let count = 0;

function startCountdown(seconds, nextSession = null){
    clearInterval(intervalId);
    remaining = seconds;
    updateDisplay();

    intervalId = setInterval (() => {
        remaining --;
        updateDisplay();

        if(remaining <= 0){
            clearInterval(intervalId);
            alarmSound.play();
            
        }

        if(nextSession){
            alarmSound.onended = () => {
                nextSession();
            }
        }
    }, 1000);
}
function updateDisplay(){
    const mins = Math.floor(remaining / 60);
    const sec = remaining % 60;
    timer.textContent = `${mins}:${sec.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
  startCountdown(25 * 60, () => startCountdown(5 * 60)); 
  alarmSound.pause()
});

focusBtn.addEventListener('click', () => {
  startCountdown(25 * 60, () => startCountdown(5 * 60)); 
  alarmSound.pause()
});

shortBreakBtn.addEventListener('click', () => {
  startCountdown(5 * 60, () => startCountdown(15 * 60));
  alarmSound.pause()
  
});


longBreakBtn.addEventListener('click', () => {

startCountdown(15 * 60);
alarmSound.pause();

})