const libraryContainer = document.querySelector('.js-grid-container');
const markAsReadBox = document.querySelector('.js-mark-as-read');
const modal = document.querySelector('.js-modal');
const deleteButton = document.querySelector('.js-delete-btn');
const addBookButton = document.querySelector('.js-add-book-btn');
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const hasReadRadioButton = document.querySelector('#radio-yes');

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

const BLUE = '#7AA4CB';
const ORANGE = '#CB927A';
const YELLOW = '#CBA67A';
const GREEN = '#7ACB87';
const PURPLE = '#B17ACB';
const RED = '#CB7A7A';
let colorIndex = 0;


const myLibrary = [];
const colors = [BLUE, ORANGE, GREEN, PURPLE, YELLOW, RED];

function getColor(){
    if(colorIndex >= colors.length) colorIndex = 0;
    colorIndex ++;
    return colors[colorIndex];
}


function Book(title, author, readStatus) {
    this.title = title;
    this.author = author;
    this.rating = selectedRating;
    this.read = readStatus;
}


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

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newBook = new Book(titleInput.value, authorInput.value, hasReadRadioButton.checked);
    renderBook(newBook);
    hideModal();
});

function hideModal(){
    modal.style.visibility = 'hidden';
}

function showModal(){
    selectedRating = 0;
    authorInput.value = "";
    titleInput.value = "";
    hasReadRadioButton.checked = true;
    const stars = starContainer.childNodes;
    stars.forEach((star)=>{
        star.classList.add('no-rating');
    });
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

    const titleDiv = document.createElement('input');
    titleDiv.value = book.title;
    titleDiv.classList.add('bold', 'font-size-regular');
    titleDiv.setAttribute('onclick', 'this.select()');

    const checkMark = document.createElement('img');
    if(book.read) checkMark.src = "images/check_green.svg";
    else checkMark.src = "images/check_gray.svg";
    checkMark.width = 32;
    checkMark.height = 32;

    const checkMarkDiv = document.createElement('div');

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
    checkMarkDiv.appendChild(checkMark);
    card.appendChild(checkMarkDiv);

    const authorDiv = document.createElement('input');
    authorDiv.classList.add('font-size-small', 'faded');
    authorDiv.setAttribute('onclick', 'this.select()');
    authorDiv.value = book.author;

    card.appendChild(titleDiv);
    card.appendChild(authorDiv);


    // Generate stars in modal box
let starArray = [];
const container = document.createElement('div');
for (let i = 1; i <= MAX_RATING; i++){
    const newStar = document.createElement('img');
    newStar.src = 'images/star_gold.svg';
    newStar.height = 32;
    newStar.width = 32;

    if(i === selectedRating) newStar.classList.add('star', 'gold');
    else newStar.classList.add('star');

    if(selectedRating === 0) newStar.classList.add('no-rating');

    starArray.push(newStar);

    newStar.addEventListener('click', ()=>{
        starArray.forEach((star)=>{
            star.classList.remove('gold');
        })
        starArray.forEach((star)=>{
            star.classList.remove('no-rating');
        })
        selectedRating = i;
        newStar.classList.add('gold')
        
    });
    container.appendChild(newStar);
    card.appendChild(container);
}

    //render stars
    // const starDiv = document.createElement('div');
    // for(let i = 0; i < MAX_RATING; i++){
    //     const star = document.createElement('img');
    //     star.src = "images/star.svg";
    //     star.width = 24;
    //     star.height = 24;
    //     starDiv.appendChild(star);
    // }

    // card.appendChild(starDiv);

    // const newStarContainer = starContainer;
    // const newStarContainer = starContainer.cloneNode(deep='true');
    // card.appendChild(newStarContainer);

    // card.appendChild(newStarContainer);

    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('font-size-small', 'faded');
    deleteDiv.textContent = 'Delete'
    card.appendChild(deleteDiv);

    card.style.border = '2px solid' + getColor();

    libraryContainer.appendChild(card);

    deleteDiv.addEventListener('click', ()=>{
        libraryContainer.removeChild(card);
    })

    
}