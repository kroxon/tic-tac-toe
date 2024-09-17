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
        favDialog.close();
        dialogForm.reset();
    } else {
        event.preventDefault();
    }
});

const gridBooks = document.querySelector(".books");

function showBooks() {
    myLibrary.forEach(element => {
        const cardBook = document.createElement("div");
        cardBook.classList.add('card');

        const cardTitle = document.createElement('div');
        cardTitle.textContent = "title: ";

        const title = document.createElement('div');
        cardTitle.textContent = element.name;

        const cardAuthor = document.createElement('div');
        cardAuthor.textContent = "author: ";

        const author = document.createElement('div');
        cardAuthor.textContent = element.author;

        const cardPages = document.createElement('div');
        cardPages.textContent = "pages: ";

        const pages = document.createElement('div');
        cardPages.textContent = element.pages;

        const cardRead = document.createElement('div');
        cardRead.textContent = (element.read)? "read" : "no read";

        const checkboxRead = document.createElement("input");
        checkboxRead.type = "checkbox";

        checkboxRead.checked = element.read;

        cardBook.appendChild(cardTitle);
        cardBook.appendChild(title);
        cardBook.appendChild(cardAuthor);
        cardBook.appendChild(author);
        cardBook.appendChild(cardPages);
        cardBook.appendChild(pages);
        cardBook.appendChild(cardRead);
        cardBook.appendChild(checkboxRead);
        gridBooks.appendChild(cardBook);
    });
}

let theHobbit = new Book("Hobbit", "Tolkien", 295, false);
for (i = 0; i < 10; i++) {
    myLibrary.push(theHobbit);
}

showBooks();

console.log(theHobbit.info());