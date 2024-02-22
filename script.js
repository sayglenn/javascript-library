const library = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const body = document.querySelector("body");

const addBook = document.querySelector(".book-add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
let deleteBook = document.querySelectorAll(".delete");
const submit = document.querySelector(".submit")
let readChanger = document.querySelectorAll(".is-read");
const form = document.querySelector(".book-form");

function updateReadElements() {
    readChanger = document.querySelectorAll(".is-read"); 
    readChanger.forEach(button => {
        button.addEventListener("click", () => {
            if (button.id == "read") {
                button.textContent = "Unread";
                button.setAttribute("id", "unread");
            } else {
                button.textContent = "Read";
                button.setAttribute("id", "read");
            }
        })
    });
}

function updateDeleteElements() {
    deleteBook = document.querySelectorAll(".delete");
    deleteBook.forEach(button => {
        button.addEventListener("click", () => {
            button.parentElement.remove();
            const cards = document.querySelectorAll(".card-info");
            for (let i = cards.length - 1; i >= 0; i--) {
                cards[i].parentNode.removeChild(cards[i]);
            }
        })
    });
}


function checkThrough (books) {
    for (let i = 0; i < books.length; i++) {
        const newCard = document.createElement("div");
        newCard.setAttribute("class", "book-card");

        const newInfo = document.createElement("div");
        newInfo.setAttribute("class", "book-info");

        const newTitle = document.createElement("p");
        newTitle.setAttribute("class", "title");
        newTitle.textContent = books[i].title + " (" + books[i].pages + " pages)";

        const newAuthor = document.createElement("p");
        newAuthor.setAttribute("class", "author");
        newAuthor.textContent = "Written by: " + books[i].author;

        const newReadButton = document.createElement("button");
        if (books[i].read) {
            newReadButton.textContent = "Read";
            newReadButton.setAttribute("class", "read");
        } else {
            newReadButton.textContent = "Unread";
            newReadButton.setAttribute("class", "unread");
        }

        const newDeleteButton = document.createElement("button");
        newDeleteButton.setAttribute("class", "delete");
        newDeleteButton.textContent = "Delete";

        newInfo.appendChild(newTitle);
        newInfo.appendChild(newAuthor);
        newCard.appendChild(newInfo);
        newCard.appendChild(newReadButton);
        newCard.appendChild(newDeleteButton);
        body.appendChild(newCard);
    }
    readChanger = document.querySelectorAll(".is-read");
    deleteBook = document.querySelectorAll(".delete");
}

function bookAdd(book) {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "book-card");

    const newInfo = document.createElement("div");
    newInfo.setAttribute("class", "book-info");

    const newTitle = document.createElement("p");
    newTitle.setAttribute("class", "title");
    newTitle.textContent = book.title + " (" + book.pages + " pages)";

    const newAuthor = document.createElement("p");
    newAuthor.setAttribute("class", "author");
    newAuthor.textContent = "Written by: " + book.author;

    const newReadButton = document.createElement("button");
    newReadButton.setAttribute("class", "is-read");
    if (book.read) {
        newReadButton.textContent = "Read";
        newReadButton.setAttribute("id", "read");
    } else {
        newReadButton.textContent = "Unread";
        newReadButton.setAttribute("id", "unread");
    }

    const newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute("class", "delete");
    newDeleteButton.textContent = "Delete";

    newInfo.appendChild(newTitle);
    newInfo.appendChild(newAuthor);
    newCard.appendChild(newInfo);
    newCard.appendChild(newReadButton);
    newCard.appendChild(newDeleteButton);
    body.appendChild(newCard);

    updateReadElements();
    updateDeleteElements();
}

addBook.addEventListener("click", () => {
    modal.classList.add("active");
    overlay.classList.add("active");
});

readChanger.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id == "read") {
            button.textContent = "Unread";
            button.setAttribute("id", "unread");
        } else {
            button.textContent = "Read";
            button.setAttribute("id", "read");
        }
    })
});

deleteBook.forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.remove();
        const cards = document.querySelectorAll(".card-info");
        for (let i = cards.length - 1; i >= 0; i--) {
            cards[i].parentNode.removeChild(cards[i]);
        }
    })
    checkThrough(library);
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("haveRead").checked;
    const newBook = new Book(title, author, pages, isRead);
    library.push(newBook);
    bookAdd(newBook);
    form.reset();
})

submit.addEventListener("click", () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
});