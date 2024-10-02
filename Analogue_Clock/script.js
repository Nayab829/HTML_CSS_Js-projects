const hr = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
function displayTime() {
    const date = new Date;
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();

    const hrRotation = 30 * hrs + mins / 2;
    const minsRotation = 6 * mins;
    const secRotation = 6 * secs;

    hr.style.transform = `rotate(${hrRotation}deg)`;
    min.style.transform = `rotate(${minsRotation}deg)`;
    sec.style.transform = `rotate(${secRotation}deg)`;

}
setInterval(displayTime, 1000)