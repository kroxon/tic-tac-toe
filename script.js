const myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return this.name + " by " + this.author + ", " +
            this.pages + " pages, " + (this.read ? "read" : "not read");
    }
}

function addBookToLibrary() {
    // do stuff here
}

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const dialogForm = favDialog.querySelector("form");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const cancelBtn = favDialog.querySelector('button[value="false"]');
const readedCheck = favDialog.querySelector("#readed");

showButton.addEventListener("click", () => {
    favDialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
    favDialog.close();
    dialogForm.reset();
});

dialogForm.addEventListener("submit", (event) => {
    if (dialogForm.checkValidity()) {
        favDialog.close(readedCheck.value);
        dialogForm.reset();
    } else {
        event.preventDefault();
    }
});

const gridBooks = document.querySelector(".books");

function showBooks() {
    myLibrary.forEach(element => {
        const newBook = document.createElement("div");
        newBook.textContent = element.info();
        gridBooks.appendChild(newBook);
    });
}

let theHobbit = new Book("Hobbit", "Tolkien", 295, false);
for (i = 0; i < 10; i++) {
    myLibrary.push(theHobbit);
}

showBooks();

console.log(theHobbit.info());