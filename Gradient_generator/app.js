const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2");
let rgb1 = '#444';
let rgb2 = '#333';
let str = "1234567890abcdef";
//gradient 1
const getGradientColor = () => {
    rgb1 = '#';
    for (let i = 0; i < 6; i++) {
        rgb1 += str[Math.floor(Math.random() * 16)];

    }

    document.body.style.background = `linear-gradient(120deg,${rgb1},${rgb2})`;

    copyCode.innerHTML = `background:linear-gradient(135deg,${rgb1} ${rgb2});`

}
//gradient 2
const getGradientColor2 = () => {
    rgb2 = '#';
    for (let i = 0; i < 6; i++) {
        rgb2 += str[Math.floor(Math.random() * 16)];

    }

    document.body.style.background = `linear-gradient(120deg,${rgb1},${rgb2})`;


    copyCode.innerHTML = `background:linear-gradient(135deg,${rgb1} ${rgb2});`
}
btn1.addEventListener(
    "click",
    getGradientColor
)
btn2.addEventListener(
    "click",
    getGradientColor2
)
//copy functionality
const copyCode = document.querySelector(".copy-code p");
document.querySelector(".copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(copyCode.innerText);
    document.querySelector(".copy-btn").innerText = "copied"
})
