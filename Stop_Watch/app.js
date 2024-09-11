//variables
const stopWatch = document.querySelector(".stopwatch");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

let msec = 00;
let sec = 00;
let min = 00;
let hrs = 00;

let timerId = null;
//start function
startBtn.addEventListener("click", () => {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10);



})
//stop function
stopBtn.addEventListener("click", () => {
    clearInterval(timerId)


})
//reset function
resetBtn.addEventListener("click", () => {
    clearInterval(timerId);
    stopWatch.innerHTML = `00 : 00 : 00 : 00`;
    msec = sec = min = hrs =00;

})

const startTimer = () => {
    msec++;
    if (msec == 100) {
        msec = 0;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
            if (min == 60) {
                min = 0;
                hrs++
            }
        }
    }
    let msecString = msec < 10 ? `0${msec} ` : msec;
    let secString = sec < 10 ? `0${sec}` : sec;
    let minString = min < 10 ? `0${min} ` : min;
    let hrsString = hrs < 10 ? `0${hrs} ` : hrs;
    stopWatch.innerHTML = `${hrsString} :${minString} :${secString}: ${msecString}`;
}
