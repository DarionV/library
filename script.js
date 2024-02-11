import { exampleLibraryArray, colors } from "./data.js";

const libraryContainer = document.querySelector('.js-grid-container');
const markAsReadBox = document.querySelector('.js-mark-as-read');
const modal = document.querySelector('.js-modal');
const deleteButton = document.querySelector('.js-delete-btn');
const addBookButton = document.querySelector('.js-add-book-btn');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const hasReadCheckbox = document.querySelector('#checkbox-has-read');
const emptyLibraryContainer = document.querySelector('.js-empty-message');
const addFirstBookButton = document.querySelector('.js-add-first-book-btn');
const exampleButton = document.querySelector('.js-example-button');
const starContainer = document.querySelector('.star-container');

const MAX_RATING = 5;
const MARK_READ_OFFSET = 32;

let selectedRating = 0;
let numberOfBooksInLibrary = 0;
let colorIndex = 0;

function Book(title, author, rating, readStatus) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.read = readStatus;
    this.color = getColor();
}

Book.prototype.render = function (){
    const card = document.createElement('div');
    card.classList.add('card');

    const titleDiv = document.createElement('div');
    titleDiv.textContent = this.title;
    titleDiv.classList.add('bold', 'font-size-regular');

    const checkMark = createCheckmark(this, 32);
    titleDiv.appendChild(checkMark);

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('font-size-small', 'faded');
    authorDiv.textContent = this.author;

    card.appendChild(titleDiv);
    card.appendChild(authorDiv);

    const container = document.createElement('div');
    generateStars(32, container);

    card.appendChild(container);

    const deleteDiv = createDeleteButton(card);
    card.appendChild(deleteDiv);

    card.style.border = '2px solid' + this.color;

    hideEmptyMessage();

    numberOfBooksInLibrary ++;
    if(numberOfBooksInLibrary === 1)  libraryContainer.appendChild(card);
    else  libraryContainer.prepend(card);
    
}

function Star(size, array){
    this.src = 'images/star_gold.svg';
    this.height = size;
    this.width = size;
    this.rating = 4;
    this.img = document.createElement('img');
    this.img.classList.add('star');

    this.turnOff = function(){
        this.img.classList.add('no-rating');
    }

    this.img.addEventListener('click', ()=>{
        updateStars(array);
        selectedRating = this.rating;
        this.img.classList.add('gold')
    });

    array.push(this.img);
}

Star.prototype.render = function(){
    this.img.src = this.src;
    this.img.width = this.width;
    this.img.height = this.height;
    return this.img;
}

function generateStars(size, container){
    const starArray = [];

    for (let i = 1; i <= MAX_RATING; i++){
        const newStar = new Star(size, starArray);

        if(i === selectedRating) newStar.img.classList.add('gold');
        if(selectedRating === 0) newStar.img.classList.add('no-rating');

        newStar.rating = i;

        container.appendChild(newStar.render());
    }
}

exampleButton.addEventListener('click', loadExampleLibrary);

deleteButton.addEventListener('click', hideModal);

addBookButton.addEventListener('click', showModal);

addFirstBookButton.addEventListener('click', showModal);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newBook = new Book(titleInput.value, authorInput.value, selectedRating, hasReadCheckbox.checked);
    newBook.render();
    hideModal();
});

function hideAddBookButton(){
    addBookButton.style.visibility = 'hidden'
}

function showAddBookButton(){
    addBookButton.style.visibility = 'visible'
}

function hideModal(){
    modal.style.visibility = 'hidden';
}

function showModal(){
    selectedRating = 0;
    authorInput.value = "";
    titleInput.value = "";
    resetModalStars();
    modal.style.visibility = 'visible';
    titleInput.focus();
    hasReadCheckbox.checked = false;
}

function resetModalStars(){
    const stars = starContainer.childNodes;
    stars.forEach((star)=>{
        star.classList.add('no-rating');
    });
}

function toggleHasReadStatus(book){
    book.read ? book.read = false : book.read = true;
}

function updateToolTipText(book){
    if(book.read) markAsReadBox.textContent = 'Mark as unread';
    else markAsReadBox.textContent = 'Mark as read';
}

function loadExampleLibrary(){
    exampleLibraryArray.forEach((book)=>{
        const newBoook = new Book(book.title, book.author, book.rating, book.read);
        newBoook.render();
    });
}

function createDeleteButton(card){
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('font-size-small', 'faded');
    deleteDiv.textContent = 'Delete'
    deleteDiv.addEventListener('click', ()=>{
        libraryContainer.removeChild(card);
        numberOfBooksInLibrary --;
        checkIfEmptyLibrary();
    })
    return deleteDiv;
}

function createCheckmark(book, size){
    const checkMark = document.createElement('img');

    if(book.read) checkMark.src = "images/check_green.svg";
    else checkMark.src = "images/check_gray.svg";

    checkMark.width = size;
    checkMark.height = size;

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

    return checkMark;
}

function getColor(){
    if(colorIndex >= colors.length) colorIndex = 0;
    colorIndex ++;
    return colors[colorIndex];
}

function checkIfEmptyLibrary(){
    if(numberOfBooksInLibrary === 0){
        showEmptyMessage();
    }
}

function showEmptyMessage(){
    emptyLibraryContainer.classList.remove('hidden');
    hideAddBookButton();
}

function hideEmptyMessage(){
    emptyLibraryContainer.classList.add('hidden');
    showAddBookButton();
}

function updateStars(array){
    array.forEach((star)=>{
        star.classList.remove('gold', 'no-rating');
    })
}

generateStars(32, starContainer);
hideModal();
checkIfEmptyLibrary();