const form = document.querySelector('.form');
const button = document.querySelector("[type ='submit']");

const delayInput = form.querySelector("[name ='delay']");
const stepInput = form.querySelector("[name ='step']");
const amountInput = form.querySelector("[name ='amount']");

button.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const form = event.target;

  const delayValue = parseInt(form.delay.value);
  const stepValue = parseInt(form.step.value);
  const amountValue = parseInt(form.amount.value);

  for (let position = 0; position < amountValue; position += 1) {
    const delay = delayValue + stepValue * position;

    createPromise({ position, delay })
      .then(({ position, delay } = {}) => {
        Notify.success(
          `&#x2705 Fulfilled promise ${position + 1} in ${delay}ms`
        );
      })
      .catch(({ position, delay } = {}) => {
        Notify.failure(
          `&#10060 Rejected promise ${position + 1} in ${delay}ms`
        );
      });
  }
}
// debugger;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = (resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  };
  const newPromise = new Promise(promise);
  return newPromise;
  // console.log(newPromise);
}
