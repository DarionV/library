import { exampleLibraryArray, colors } from "./data.js";

const libraryContainer = document.querySelector('.js-grid-container');
const toolTip = document.querySelector('.js-tooltip');
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
const TOOLTIP_Y_OFFSET = 32;

let selectedRating = 0;
let numberOfBooksInLibrary = 0;
let colorIndex = 0;

function Book(title, author, rating, readStatus) {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.hasRead = readStatus;
    this.color = getColor();

    this.toggleReadStatus = function (){
        this.hasRead ? this.hasRead = false : this.hasRead = true;
    }
}

Book.prototype.render = function (){
    const card = document.createElement('div');
    card.classList.add('card');

    const titleDiv = document.createElement('div');
    titleDiv.textContent = this.title;
    titleDiv.classList.add('bold', 'font-size-regular');

    const checkmark = new Checkmark(this);
    titleDiv.appendChild(checkmark.render());

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
    else libraryContainer.prepend(card);
    
}

function Star(starSize, array){
    this.src = 'images/star_gold.svg';
    this.height = starSize;
    this.width = starSize;
    this.rating = 0;
    this.img = document.createElement('img');
    this.img.classList.add('star');

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

function generateStars(starSize, container){
    const starArray = [];

    for (let i = 1; i <= MAX_RATING; i++){
        const newStar = new Star(starSize, starArray);

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

function updateToolTipText(hasRead){
    if(hasRead) toolTip.textContent = 'Mark as unread';
    else toolTip.textContent = 'Mark as read';
}

function loadExampleLibrary(){
    exampleLibraryArray.forEach((book)=>{
        const newBook = new Book(book.title, book.author, book.rating, book.hasRead);
        selectedRating = book.rating;
        newBook.render();
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

function Checkmark(book){
    this.checkmark = document.createElement('div');
    this.checkmark.classList.add('check-mark');
    if(book.hasRead) this.checkmark.classList.add('checked');

    this.toggleCheckmark = function(){
        this.checkmark.classList.toggle('checked');
    }

    this.checkmark.addEventListener('click', ()=>{
        book.toggleReadStatus();
        this.toggleCheckmark();
        updateToolTipText(book.hasRead);
    });

    this.checkmark.addEventListener('mouseover',()=>{
        showTooltip(this.checkmark.getBoundingClientRect());
        updateToolTipText(book.hasRead);     
    })
    
    this.checkmark.addEventListener('mouseleave', hideTooltip);
}

Checkmark.prototype.render = function(){
    return this.checkmark;
}

function showTooltip(checkmarkRect){
    toolTip.style.visibility = "visible";
    const tooltipRect = toolTip.getBoundingClientRect();
    toolTip.style.left = checkmarkRect.left + checkmarkRect.width / 2 - tooltipRect.width / 2 + 'px';
    toolTip.style.top = checkmarkRect.top - TOOLTIP_Y_OFFSET  + 'px';
}

function hideTooltip(){
    toolTip.style.visibility = "hidden";
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

generateStars(42, starContainer);
hideModal();
checkIfEmptyLibrary();