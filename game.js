const nameOrSurname = "DOGA4";
let currentPlayerSequence = [];
let currentScore = 0;
let arr = []

function createCard(letter, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `<img src="image${letter}.svg" style="width: 100px; height: 100px;"/>`;
    arr.push(letter);
    return cardElement;
}
function createCard2(letter, index) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('empty');
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', () => handleCardClick(arr[index]));
    return cardElement;
}
function show_ordered(letter, index){
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `<img src="image${letter}.svg" style="width: 100px; height: 100px;"/>`;
    return cardElement;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function displayCards(faceUp = false) {

const memoryGame = document.getElementById('memoryGame');
    memoryGame.innerHTML = "";
    const shuffledLetters = shuffleArray(nameOrSurname.split(''));
    shuffledLetters.forEach((letter, index) => {
        if (faceUp) {
            const card = createCard(letter, index);
            card.classList.add('face-down');
            memoryGame.appendChild(card);
        } else {
            const card = createCard2(letter, index);
            memoryGame.appendChild(card);
        }
    });
}

function display_ordered(faceUp=true){
    const memoryGame = document.getElementById('memoryGame');
    memoryGame.innerHTML = "";

    // Create an array of ordered letters before shuffling
    const orderedLetters = nameOrSurname.split('');

    // Display ordered cards before shuffling
    orderedLetters.forEach((letter, index) => {
        const card = show_ordered(letter, index);
        card.classList.add('face-down');
        memoryGame.appendChild(card);
    });
}

function startGame() {
    currentPlayerSequence = [];
    arr = [];
    currentScore = 0;
    updateScoreDisplay();
    displayCards(true);
 
    setTimeout(() => {
        displayCards();
    }, 2000);
}

function restartGame() {
    startGame();
}

function handleCardClick(card) {
    const clickedLetter = card;

    if (
        currentPlayerSequence.length < nameOrSurname.length &&
        (clickedLetter === nameOrSurname[currentPlayerSequence.length])
    ) {
        // If the clicked card is valid:
        currentPlayerSequence.push(clickedLetter);
        currentScore += 20;
        updateScoreDisplay();
        // Check if the player has completed the entire sequence
        if (currentPlayerSequence.length === nameOrSurname.length) {
            // Check if the player's sequence matches the nameOrSurname string
            if (currentPlayerSequence.join('') === nameOrSurname) {  
              setTimeout(() => {   
                alert('Congratulations! You completed the sequence.');
                display_ordered();  
              }, 300);
            } else {
                console.log('currentPlayerSequence:', currentPlayerSequence);
                console.log('nameOrSurname:', nameOrSurname);
                // If the sequence doesn't match, show a message and start a new game
                alert('Wrong sequence! Game over.');
                display_ordered();
            }
        }
    } else {
        // If the clicked card is not valid:
        alert('Wrong sequence! Game over.');
        display_ordered();
    }
}


function updateScoreDisplay() {
    document.getElementById('score').innerText = currentScore;
}

display_ordered();  // Start the game initially
