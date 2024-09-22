const passBox = document.getElementById("passBox");
const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const genBtn = document.getElementById("genBtn");
const copyIcon = document.querySelector(".input span")


//showing input slide value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
})

genBtn.addEventListener("click", () => {
    passBox.value = generatePassowrd();
})
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghikjlmnopqrstuvwxyz";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

//generate password
function generatePassowrd() {
    let passwordGen = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";


    for (let i = 1; i <= inputSlider.value; i++) {
        passwordGen += allChars.charAt(Math.floor(Math.random() * allChars.length));

    }
    return passwordGen;
}
//copy functionality
copyIcon.addEventListener("click", () => {
    
    if (passBox.value !== "") {
        console.log("hello i am copy");
        navigator.clipboard.writeText(passBox.value);

        copyIcon.textContent = "✔️"
        copyIcon.title = "password copied";
        setTimeout(() => {
            copyIcon.textContent = "📑";
            copyIcon.title = "";
        }, 3000)
    }
})