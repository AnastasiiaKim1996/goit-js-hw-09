// - import - //

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// --- Timer --- //

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const options = { once: true, passive: true };

let userChooseDate = null;

const setDisabled = (...elems) => {
  elems.forEach(el => el.setAttribute('disabled', true));
};

const setEnabled = (...elems) => {
  elems.forEach(el => el.removeAttribute('disabled'));
};

flatpickr(inputRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      userChooseDate = selectedDates[0];
      setEnabled(startBtnRef);
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateUserInterface({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function onStartButtonClick() {
  setDisabled(inputRef, startBtnRef);

  const timerId = setInterval(() => {
    let leftoverTime = userChooseDate - new Date();

    if (leftoverTime <= 0) {
      clearInterval(timerId);
      leftoverTime = 0;
    }

    const resultTime = convertMs(leftoverTime);
    updateUserInterface(resultTime);
  }, 1000);
}
startBtnRef.addEventListener('click', onStartButtonClick, options);
