function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
const btn = document.querySelector('button');

let timeID = null;

let isActive = false;

startBtn.addEventListener('click', onStartSwitchColor);
stopBtn.addEventListener('click', onStopSwitchColor);

function onStartSwitchColor() {
  if (isActive) {
    return;
  }

  isActive = true;
  if (
    (timeID = setInterval(() => {
      bodyRef.style.background = getRandomHexColor();
      console.log(`Switch color`, timeID);
    }, 1000))
  ) {
    startBtn.toggleAttribute('disabled');
  }
}

function onStopSwitchColor() {
  clearInterval(timeID);
  console.log(`Stop switch color`, timeID);
  isActive = false;
  if (startBtn.hasAttribute('disabled')) {
    startBtn.removeAttribute('disabled');
  }
}

// --- second solution --- //

// const changeBgColor = el => (el.style.backgroundColor = getRandomHexColor());
// const toggleDisabled = (...elems) =>
//   elems.forEach(el => el.toggleAttribute('disabled'));

// const startSwichColor = btn => {
//   if (btn === startBtn) {
//     changeBgColor(bodyRef);
//     timeID = setInterval(() => changeBgColor(bodyRef), 1000);
//   }
//   if (btn === stopBtn) clearInterval(timeID);
// };

// const onBtnClick = ({ target }) => {
//   if (!btn || btn.hasAttribute('disabled')) return;

//   toggleDisabled(startBtn, stopBtn);
//   startSwichColor(btn);
// };

// bodyRef.addEventListener('click', onBtnClick);
