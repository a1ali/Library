const title = document.getElementById('title');
//const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const date = document.getElementById('date');
const read = document.getElementById('read');
const form = document.getElementById('form');
const modal = document.getElementById('modal-bg');
const closeBtn = document.getElementById('closeBtn');
const newBookBtn = document.getElementById('new');
const submit = document.getElementById('submitButton');

const bookCards = document.getElementById('book-cards');

//array to hold book objects
const  myLibrary = [];


//new book button is pressed turn on the modal 
newBookBtn.addEventListener('click', () => {

    if (modal.style.display === "none") {
        modal.style.display = "flex";
      }
       else {
        modal.style.display = "flex";
      }
})

// close the modal 
closeBtn.addEventListener('click', () => {
    
    modal.style.display = "none";
})

submit.addEventListener('click', () => {

    if (title.value !== '' && author.value !== '' && pages.value !== '' && date.value !==''){
        let newBook = new book(title.value, author.value, pages.value, date.value, read.checked);
        addBookToLibrary(newBook);
    }

})

//book constructor
function book(title, author, page, date, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.date = date;
    this.read = read;
    
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    createCard(book.title, book.author, book.page, book.date, book.read, myLibrary.length - 1);
}

function createCard(title, author, pages, date, read, index) {

    //parent div 
    let div = document.createElement("div");
    div.id = `card${index}`;
    div.className = `card${index} card`;

    //div for the button within parent div
    let buttondiv = document.createElement("div");
    buttondiv.className = "closeCard";

    //anchor tag within button div
    var a = document.createElement('a');
    a.id = `closeCardBtn${index}`;
    a.innerText = '+';
    buttondiv.appendChild(a);
    div.appendChild(buttondiv);

    //text div within parent div
    let textdiv = document.createElement("div");
    textdiv.className = "text";
    textdiv.innerHTML = `<b>Title: ${title} <br>
                     Author: ${author} <br>
                     Pages: ${pages} <br>
                     Date: ${date} <br>
                     Already Read? ${read} </b>`

    div.appendChild(textdiv);

    //add parent div to the main div that holds that cards
    bookCards.appendChild(div);


    //dyncamically create an event handler for the new button created to delete the card. 
    let element = document.getElementById(`closeCardBtn${index}`);
    element.addEventListener('click', (e) => {
        let className = e.target.offsetParent.parentNode.className //the className is made as 'card{index} card'
 
        let arrClassName = className.split(" "); //return [card{index}, card]

        let newelem = document.getElementById(arrClassName[0]); //get the element with the id card{index}
        let getIndex = arrClassName[0].split(''); //return [c, a, r, d, {index}]
        let index = parseInt(getIndex[getIndex.length - 1]) //index of that card which is the last element in array

        //remove that card
        newelem.remove(); 

        //remove that element from the myLibrary array
        myLibrary.splice(parseInt(index), 1);
        
        //correct the index of all the cards that come after the removed card
        while(document.getElementById(`card${index + 1}`) !== null) {
            let element =  document.getElementById(`card${index + 1}`)
            element.id = `card${index}`;
            element.className = `card${index} card`
            index++;
        }

      })
}

//create an example card
let hobbit = new book ('The Hobbit', 'J. R. R. Tolkien', '310', "2021-05-05", true)
addBookToLibrary(hobbit);

