// const http = require("http")
// let fs = require('fs')
// let path = require("path")

window.onload = fetchBooks();

async function fetchBooks() {
  const books = await (await fetch("http://localhost:6600/books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })).json();
  const booklist = document.getElementById("book-list");
  books.forEach(book => {
    attachBook(booklist, book);
  });
}

//add new book button is cliicked
function redirect() {
  window.location.href = "addnewbook.html";
  document.getElementById("alert-success").style.display = "block"
  }

//add new book button is clicked
document.getElementById("submit").addEventListener("click", ((e) => {
  e.preventDefault();
  addBook();
}));

function addBook() {
  // document.getElementById("alert-success").style.display = "none"
  html = `visibility: visible`
  document.getElementById("alert-success").style = html;
  fetch("http://localhost:6600/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      isbn: document.getElementById("isbn").value,
      overdueFee: document.getElementById("overdueFee").value,
      publisher: document.getElementById("publisher").value,
      publishDate: document.getElementById("publishDate").value
    })
  })
    .then(data =>
       document.getElementById("alert-success").style.display = "block"
      )
      .catch(e => console.log(e));
}

function attachBook(element, book) {
  const tr = document.createElement("tr");
  // const id = document.createElement("td");
  // id.textContent = book._id;
  // tr.appendChild(id)
  const titleId = document.createElement("td");
  titleId.textContent = book.title;
  tr.appendChild(titleId);
  const isbnId = document.createElement("td");
  isbnId.textContent = book.isbn;
  tr.appendChild(isbnId);
  const overdueFeeId = document.createElement("td");
  overdueFeeId.textContent = book.overdueFee;
  tr.appendChild(overdueFeeId);
  const publisherId = document.createElement("td");
  publisherId.textContent = book.publisher;
  tr.appendChild(publisherId);
  const publishDate = document.createElement("td");
  let parsedDate = book.publishDate.split("-");
  parsedDate = parsedDate[1] + " " + parsedDate[0];
  publishDate.textContent = parsedDate;
  // checkBox.dataset.id = book._id
  tr.appendChild(publishDate);
  element.appendChild(tr);
}
