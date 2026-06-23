import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");

const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");


let userSelectedDate = null;
let timerId = null;



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {

      iziToast.error({
        message: "Please choose a date in the future",
      });

      startBtn.disabled = true;
      userSelectedDate = null;

      return;
    }


    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};



flatpickr("#datetime-picker", options);



startBtn.addEventListener("click", () => {

  startBtn.disabled = true;
  input.disabled = true;


  timerId = setInterval(() => {

    const currentTime = new Date();

    const deltaTime = userSelectedDate - currentTime;


    if (deltaTime <= 0) {

      clearInterval(timerId);

      updateTimer(0);

      input.disabled = false;

      return;
    }


    updateTimer(deltaTime);


  }, 1000);

});





function updateTimer(ms) {

  const { days: d, hours: h, minutes: m, seconds: s } = convertMs(ms);


  days.textContent = addLeadingZero(d);
  hours.textContent = addLeadingZero(h);
  minutes.textContent = addLeadingZero(m);
  seconds.textContent = addLeadingZero(s);

}





function addLeadingZero(value) {

  return String(value).padStart(2, "0");

}


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
