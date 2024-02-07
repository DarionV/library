const libraryContainer = document.querySelector('.js-grid-container');

const MAX_RATING = 5;


const myLibrary = [];

function Book() {
    this.title = "Frankenstein";
    this.author = "Mary Shelley";
    this.rating = 3;
    this.read = false;
    this.info = function () {
        let readStatus = "";
        this.read ? readStatus = ", read." : readStatus = ", not yet read.";
        return this.title + " by " + this.author + readStatus;
    };
}

const myBook = new Book();
renderBook(myBook);


function renderBook(book){
    const card = document.createElement('div');
    card.classList.add('card');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('bold');
    titleDiv.textContent = book.title;

    const checkMark = document.createElement('img');
    checkMark.src = "images/check-circle.svg"
    checkMark.width = 32;
    checkMark.height = 32;
    checkMark.classList.add('check-mark');
    titleDiv.appendChild(checkMark);

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('font-size-small', 'faded');
    authorDiv.textContent = book.author;

    card.appendChild(titleDiv);
    card.appendChild(authorDiv);

    //render stars
    const starDiv = document.createElement('div');
    for(let i = 0; i < MAX_RATING; i++){
        const star = document.createElement('img');
        star.src = "images/star.svg";
        star.width = 24;
        star.height = 24;
        starDiv.appendChild(star);
    }
    card.appendChild(starDiv);

    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('font-size-small', 'faded');
    deleteDiv.textContent = 'Delete'
    card.appendChild(deleteDiv);

    libraryContainer.appendChild(card);
}