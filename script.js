const libraryContainer = document.querySelector('.js-grid-container');
const markAsReadBox = document.querySelector('.js-mark-as-read');
const modal = document.querySelector('.js-modal');
const deleteButton = document.querySelector('.js-delete-btn');
const addBookButton = document.querySelector('.js-add-book-btn');


const star1 = document.querySelector('#star-1');
const star2 = document.querySelector('#star-2');
const star3 = document.querySelector('#star-3');
const star4 = document.querySelector('#star-4');
const star5 = document.querySelector('#star-5');
const starContainer = document.querySelector('.star-container');

const MAX_RATING = 5;
const MARK_READ_OFFSET = 32;

let selectedRating = 0;

let hasSelectedRating = false;


const myLibrary = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.rating = 3;
    this.read = false;
    this.info = function () {
        let readStatus = "";
        this.read ? readStatus = ", read." : readStatus = ", not yet read.";
        return this.title + " by " + this.author + readStatus;
    };
}

const myBook = new Book('Frankenstein', 'Mary Shelley');
const myBook2 = new Book('Dracula', 'Author name');
renderBook(myBook);
renderBook(myBook2);

function updateStars(){
    starArray.forEach((star)=>{
        star.classList.remove('gold');
    })
}

// Generate stars in modal box
let starArray = [];

for (let i = 1; i <= MAX_RATING; i++){
    const newStar = document.createElement('img');
    newStar.src = 'images/star_gold.svg';
    newStar.height = 32;
    newStar.width = 32;
    newStar.classList.add('star', 'no-rating');

    starArray.push(newStar);

    newStar.addEventListener('click', ()=>{
        updateStars();
        selectedRating = i;
        newStar.classList.add('gold')
        starArray.forEach((star)=>{
            star.classList.remove('no-rating')
        })
    });

    starContainer.appendChild(newStar);
}

updateStars();

deleteButton.addEventListener('click', hideModal);

addBookButton.addEventListener('click', showModal);

function hideModal(){
    modal.style.visibility = 'hidden';
}

function showModal(){
    modal.style.visibility = 'visible';
}


function toggleHasReadStatus(book){
    book.read ? book.read = false : book.read = true;
    console.log(book.read);
}

function updateToolTipText(book){
    if(book.read) markAsReadBox.textContent = 'Mark as unread';
    else markAsReadBox.textContent = 'Mark as read';
}

function renderBook(book){
    const card = document.createElement('div');
    card.classList.add('card');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('bold');
    titleDiv.textContent = book.title;

    const checkMark = document.createElement('img');
    checkMark.src = "images/check_gray.svg"
    checkMark.width = 32;
    checkMark.height = 32;

    checkMark.classList.add('check-mark');
    checkMark.addEventListener('click', ()=>{
        toggleHasReadStatus(book);
        if(book.read) checkMark.src = "images/check_green.svg";
        else checkMark.src = "images/check_gray.svg";
        updateToolTipText(book);
    });
    checkMark.addEventListener('mouseover',()=>{
        markAsReadBox.style.visibility = "visible";
        const rect = checkMark.getBoundingClientRect();
        const markReadRect = markAsReadBox.getBoundingClientRect();
        markAsReadBox.style.left = rect.left + rect.width / 2 - markReadRect.width / 2 + 'px';
        markAsReadBox.style.top = rect.top - MARK_READ_OFFSET  + 'px';
        updateToolTipText(book);
        
    })
    checkMark.addEventListener('mouseleave',()=>{
        markAsReadBox.style.visibility = "hidden";
    })
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

    deleteDiv.addEventListener('click', ()=>{
        libraryContainer.removeChild(card);
    })
}