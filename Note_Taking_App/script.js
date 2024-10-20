//? variables
const addBtn = document.querySelector(".addBtn");
const container = document.querySelector(".container");



//?save functionality in local storage
const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(note => {
        data.push(note.value)

    })
    if (data.length === 0) {
        localStorage.removeItem("notes");
    }
    else {

        localStorage.setItem("notes", JSON.stringify(data))
    }

}



//? add note 
addBtn.addEventListener(
    "click",
    () => {
        addNote()
    })



const addNote = (text = "") => {
    const note = document.createElement("div");
    note.className = "note";
    note.innerHTML = `
    <div class="top">
    <button class= "saveBtn">Save</button>
    <button class="deleteBtn">Delete</button>
    </div>
    <textarea >${text}</textarea>
    `;
    note.querySelector(".deleteBtn").addEventListener(
        "click",
        () => {
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".saveBtn").addEventListener(
        "click",
        () => {
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener("focusout", () => {
        saveNotes()
    })
    container.appendChild(note);
    saveNotes()
}



//? immidiately invoked function to get data from local storage and display it
(() => {
    const lsnotes = JSON.parse(localStorage.getItem("notes"));
    if (lsnotes === null) {
        addNote()
    } else {
        lsnotes.forEach((note) => {
            addNote(note)
        })
    }



})()