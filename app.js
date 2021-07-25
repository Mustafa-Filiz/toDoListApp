const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const toDoList = document.querySelector(".toDoList");
const deleteAllButton = document.querySelector(".footer button")


inputBox.onkeyup = () => {
    let userData = inputBox.value;
    if (userData.trim() != 0) {
        addButton.classList.add("active");
    }else{
        addButton.classList.remove("active");
    }
}

showTask()

addButton.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New ToDo");
    if (getLocalStorage == null) {
        listArr = [];
    }else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask();
    addButton.classList.remove("active");
}

function showTask() {
    let getLocalStorage = localStorage.getItem("New ToDo");
    if (getLocalStorage == null) {
        listArr = [];
    }else {
        listArr = JSON.parse(getLocalStorage);
    }

    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length;

    if (listArr.length > 0) {
        deleteAllButton.classList.add("active");
    }else {
        deleteAllButton.classList.remove("active");
    }

    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash-alt"></i></span></li>`
    });
    toDoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New ToDo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask();
}

deleteAllButton.onclick = () => {
    listArr = [];
    localStorage.setItem("New ToDo", JSON.stringify(listArr));
    showTask();
}