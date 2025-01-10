import flatpickr from "flatpickr";

import iziToast from "izitoast";

let userSelectedDate = null;
let countdownInterval = null;

const startButton = document.querySelector('.button-start');

const timerDisplay = {
    days: document.querySelector('.days'),
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds'),
};
startButton.disabled = true;
flatpickr("#datetime-picker", {  
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();

      if (userSelectedDate < currentDate) { 
         showAlert("Please choose a date in the future");
          startButton.disabled = true;
      } else { startButton.disabled = false; };
},
});

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    document.querySelector('#datetime-picker').disabled = true;
    startCountdown(userSelectedDate);
});

function startCountdown(targetDate) { 
    clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        const currentDate = new Date();
        const ms = targetDate - currentDate;
        if (ms <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.days.textContent = '00';
            timerDisplay.hours.textContent = '00';
            timerDisplay.minutes.textContent = '00';
            timerDisplay.seconds.textContent = '00';
            document.getElementById('datetime-picker').disabled = false;
            return;
        }

        const timeComponents = convertMs(ms);
        timerDisplay.days.textContent = String(timeComponents.days).padStart(2, '0');
        timerDisplay.hours.textContent = String(timeComponents.hours).padStart(2, '0');
        timerDisplay.minutes.textContent = String(timeComponents.minutes).padStart(2, '0');
        timerDisplay.seconds.textContent = String(timeComponents.seconds).padStart(2, '0');
    }, 1000);
 
};
function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
 
  const hours = Math.floor((ms % day) / hour);
 
  const minutes = Math.floor(((ms % day) % hour) / minute);
 
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
 function showAlert(message) {
    iziToast.show({
        title: "",
        message: message,
        position: 'topCenter',
        timeout: 4000,
    });
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
