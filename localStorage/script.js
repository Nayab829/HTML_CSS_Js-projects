const form = document.querySelector("form");
const main = document.querySelector(".main");
const clearBtn= document.querySelector("#clearBtn");
const displayData = () => {
    const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];


    let finaldata = "";
    userData.forEach((elem, i) => {
        finaldata += `
        <div class="item">
        <span onclick="removeData(${i})">&times;</span>
        <strong>Name:</strong>
        <p>${elem.name}</p>
        <strong>Email:</strong>
        <p>${elem.email}</p>
        <strong>Phone:</strong>
        <p>${elem.phone}</p>
            </div>
            `
    })

    main.innerHTML = finaldata;



}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.fname.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    let checkStatus = false;
    
    const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    for (const v of userData) {
        if (v.name == name || v.email == email ) {
            checkStatus = true;
            break;
        }
    }
    console.log(checkStatus);
    if(checkStatus){
        alert("Phoneno or email already exists")
    }else{
        userData.push({
            name, email, phone
        })
        
        localStorage.setItem("userDetails", JSON.stringify(userData));
        event.target.reset();
        displayData();
    }
   


})
clearBtn.addEventListener("click", ()=>{
    localStorage.clear("userDetails");
    displayData()
})

const removeData = (index) => {
    const userData = JSON.parse(localStorage.getItem("userDetails")) ?? [];
    userData.splice(index, 1);
    localStorage.setItem("userDetails", JSON.stringify(userData));
    displayData();


}
displayData()