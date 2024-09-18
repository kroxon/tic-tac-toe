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

Book.prototype.changeStatus = function () {
    this.read = !this.read;
}

Book.prototype.removeFromLibrary = function () {
    const index = myLibrary.indexOf(this);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
};

function addBookToLibrary(name, author, pages, read) {
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
}

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const dialogForm = favDialog.querySelector("form");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const cancelBtn = favDialog.querySelector('button[value="false"]');
const readCheck = favDialog.querySelector("#read");

showButton.addEventListener("click", () => {
    favDialog.showModal();
});

cancelBtn.addEventListener("click", (e) => {
    favDialog.close();
    dialogForm.reset();
});

dialogForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (dialogForm.checkValidity()) {
        const name = dialogForm.elements['title'].value;
        const author = dialogForm.elements['author'].value;
        const pages = dialogForm.elements['pages'].value;
        const read = readCheck.checked;
        console.log(name + " " + author + " " + pages + " " + read);
        addBookToLibrary(name, author, pages, read);
        favDialog.close();
        dialogForm.reset();
        showBooks();
    }
});

const gridBooks = document.querySelector(".books");

function showBooks() {

    gridBooks.innerHTML = '';

    myLibrary.forEach(element => {
        const cardBook = document.createElement("div");
        cardBook.classList.add('card');

        const cardTitle = document.createElement('div');
        cardTitle.classList.add("prop");
        cardTitle.textContent = "title: ";

        const title = document.createElement('div');
        title.classList.add("data");
        title.textContent = element.name;

        const cardAuthor = document.createElement('div');
        cardAuthor.classList.add("prop");
        cardAuthor.textContent = "author: ";

        const author = document.createElement('div');
        author.classList.add("data");
        author.textContent = element.author;

        const cardPages = document.createElement('div');
        cardPages.classList.add("prop");
        cardPages.textContent = "pages: ";

        const pages = document.createElement('div');
        pages.classList.add("data");
        pages.textContent = element.pages;

        const cardRead = document.createElement('button');
        cardRead.classList.add("prop");
        cardRead.classList.add("readBtn");
        cardRead.textContent = (element.read) ? "read" : "no read";
        if (element.read)
            cardRead.classList.add("nRead");

        cardRead.addEventListener("click", () => {
            element.changeStatus();
            showBooks();
        });

        const bookRmvBtn = document.createElement('button');
        bookRmvBtn.classList.add("rmv");
        bookRmvBtn.textContent = "X";

        bookRmvBtn.addEventListener("click", () => {
            element.removeFromLibrary();
            showBooks();
        });

        cardBook.appendChild(cardTitle);
        cardBook.appendChild(title);
        cardBook.appendChild(cardAuthor);
        cardBook.appendChild(author);
        cardBook.appendChild(cardPages);
        cardBook.appendChild(pages);
        cardBook.appendChild(cardRead);
        cardBook.appendChild(bookRmvBtn);
        gridBooks.appendChild(cardBook);
    });
}

let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
let book2 = new Book("1984", "George Orwell", 328, false);
let book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
let book4 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
let book5 = new Book("Moby Dick", "Herman Melville", 585, true);
let book6 = new Book("Pride and Prejudice", "Jane Austen", 279, false);
let book7 = new Book("War and Peace", "Leo Tolstoy", 1225, true);
let book8 = new Book("The Catcher in the Rye", "J.D. Salinger", 214, false);
let book9 = new Book("The Odyssey", "Homer", 374, true);
let book10 = new Book("Crime and Punishment", "Fyodor Dostoevsky", 671, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);
myLibrary.push(book6);
myLibrary.push(book7);
myLibrary.push(book8);
myLibrary.push(book9);
myLibrary.push(book10);

showBooks();
