import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const datetimePicker = document.getElementById('datetime-picker');
    const startButton = document.querySelector('button[data-start]');
    const daysSpan = document.querySelector('[data-days]');
    const hoursSpan = document.querySelector('[data-hours]');
    const minutesSpan = document.querySelector('[data-minutes]');
    const secondsSpan = document.querySelector('[data-seconds]');

    let countdownInterval;
    let userSelectedDate;

    const options = {
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            if (selectedDate && selectedDate > new Date()) {
                userSelectedDate = selectedDate;
                startButton.disabled = false;
            } else {
                startButton.disabled = true;
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                });
            }
        },
    };

    flatpickr(datetimePicker, options);

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor((ms % hour) / minute);
        const seconds = Math.floor((ms % minute) / second);

        return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }

    startButton.addEventListener('click', () => {
        if (!userSelectedDate) {
            iziToast.warning({
                title: 'Warning',
                message: 'Please choose a valid date first.',
            });
            return;
        }

        startButton.disabled = true;

        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            const now = new Date();
            const timeRemaining = userSelectedDate - now;

            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                daysSpan.textContent = '00';
                hoursSpan.textContent = '00';
                minutesSpan.textContent = '00';
                secondsSpan.textContent = '00';
                iziToast.info({
                    title: 'Info',
                    message: "Time's up!",
                });
                return;
            }

            const { days, hours, minutes, seconds } = convertMs(timeRemaining);

            daysSpan.textContent = addLeadingZero(days);
            hoursSpan.textContent = addLeadingZero(hours);
            minutesSpan.textContent = addLeadingZero(minutes);
            secondsSpan.textContent = addLeadingZero(seconds);
        }, 1000);
    });
});