const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
let editTodo = null;

const addTodo = () => {
    let inputText = inputBox.value.trim();
    if (inputText === "") {
        alert("You must Write something");
        return false;
    }
    if (addBtn.value === "Save") {
        const oldText = editTodo.target.previousElementSibling.innerHTML;
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(oldText,inputText);
        addBtn.value = "Add";
        inputBox.value = '';
        
    } else {
        //create li
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        //create edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("btn", "edit");
        li.appendChild(editBtn);

        //create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("btn", "delete");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = '';
        saveLocalTodos(inputText);
    }
}

const updateTodo = (e) => {
    if (e.target.innerHTML === "Delete") {
        // deleteLocalTodos(e.target.previousElementSibling.innerHTML);
        e.target.parentElement.remove();
        deleteLocalTodos(e.target.parentElement);
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
    
        inputBox.focus();
        addBtn.value = "Save";
        editTodo = e;
    }
}

const saveLocalTodos = (todo)=>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    console.log(todos);
    
}
const getLocalTodos = () =>{
    if(localStorage.getItem("todos") === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);
    
            //create edit button
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.classList.add("btn", "edit");
            li.appendChild(editBtn);
    
            //create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.classList.add("btn", "delete");
            li.appendChild(deleteBtn);
    
            todoList.appendChild(li);
            inputBox.value = '';
        });
    }
}
const deleteLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
        todos= [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText)
    todos.splice(todoIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos))
    
}

const editLocalTodos = (oldText,newText) =>{
let todos = JSON.parse(localStorage.getItem("todos"));
let index = todos.indexOf(oldText);
if(index > -1){

    todos[index] = newText;
}
localStorage.setItem("todos",JSON.stringify(todos))
console.log(index);
console.log(todos);



}


document.addEventListener("DOMContentLoaded", getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
