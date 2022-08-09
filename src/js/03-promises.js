// - import - //

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// --- promise --- //

const buttonRef = document.querySelector("[type='submit']");
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  const newPromise = (resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  };

  const promise = new Promise(newPromise);
  return promise;
}

function onFormSubmit(event) {
  event.preventDefault();
  buttonRef.disabled = true;

  const form = event.target;
  const delayValue = parseInt(form.delay.value);
  const stepValue = parseInt(form.step.value);
  const amountValue = parseInt(form.amount.value);

  setTimeout(() => {
    buttonRef.disabled = false;
  }, amountValue * stepValue + delayValue);

  for (let position = 0; position < amountValue; position += 1) {
    const delay = delayValue + stepValue * position;

    createPromise({ position, delay });
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise  ${position + 1} in ${delay}ms`);
      });
  }
}
