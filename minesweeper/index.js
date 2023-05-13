const container = document.createElement('div');
container.classList.add('container');

const grid = document.createElement('div');
grid.classList.add('grid');

const flagsLeft = document.createElement('div');
flagsLeft.textContent = 'Flags left: ';

const flagsLeftSpan = document.createElement('span');
flagsLeftSpan.id = 'flags-left';
flagsLeft.append(flagsLeftSpan);

const result = document.createElement('div');
result.id = 'result';

container.append(grid, flagsLeft, result);
document.body.append(container);

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const flagsLeft = document.querySelector('#flags-left');
  const result = document.querySelector('#result');
  let width = 10;
  let bombAmount = 3;
  let flags = 0;
  let squares = [];
  let isGameOver = false;
  let startTime = 0; // дописать функционал для отслеживания времени игры
  let moves = 0;// дописать функционал для кликов 
 



  // Create Board
  startTime = Date.now();
  function createBoard() {
    flagsLeft.innerHTML = bombAmount;

    // Get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * width - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      // Normal click
      square.addEventListener('click', function (e) {
        click(square);
        moves++;
      });

      // Ctrl and left click
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
        moves++;
      };
    }

    // Add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;
        if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;
        if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
        if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;
        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;
        if (i < 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;
        if (i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;
        if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
        squares[i].setAttribute('data', total);
      }
    }
  }
  createBoard();

  // Add Flag with right click
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && flags < bombAmount) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerHTML = ' 🚩';
        flags++;
        flagsLeft.innerHTML = bombAmount - flags;
        checkForWin();
        } else {
        square.classList.remove('flag');
        square.innerHTML = '';
        flags--;
        flagsLeft.innerHTML = bombAmount - flags;
        }
        }
        }
        
        // Click on square actions
        function click(square) {
          let currentId = square.id
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('bomb')) {
        gameOver(square);
        } else {
        let total = square.getAttribute('data');
        if (total != 0) {
        square.classList.add('checked');
        if (total == 1) square.classList.add('one');
        if (total == 2) square.classList.add('two');
        if (total == 3) square.classList.add('three');
        if (total == 4) square.classList.add('four');
        square.innerHTML = total;
        return;
        }
        checkSquare(square, currentId);
        }
        square.classList.add('checked');
        }
        
        // Check neighboring squares once square is clicked
        function checkSquare(square) {
        const currentId = parseInt(square.id);
        const isLeftEdge = currentId % width === 0;
        const isRightEdge = currentId % width === width - 1;
        setTimeout(() => {
          if (currentId > 0 && !isLeftEdge) {
            const newId = currentId - 1;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId > 9 && !isRightEdge) {
            const newId = currentId + 1 - width;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId > 10) {
            const newId = currentId - width;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId > 11 && !isLeftEdge) {
            const newId = currentId - 1 - width;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId < 98 && !isRightEdge) {
            const newId = currentId + 1;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId < 90 && !isLeftEdge) {
            const newId = currentId - 1 + width;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId < 88 && !isRightEdge) {
            const newId = currentId + 1 + width;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
          if (currentId < 89) {
            const newId = currentId + width;
            const newSquare = document.getElementById(newId);
            click(newSquare);
          }
        }, 10);}

        // Game over
        function gameOver(square) {
        result.innerHTML = 'Game Over. Try again.';
        isGameOver = true;
        // Show ALL the bombs
squares.forEach((square) => {
  if (square.classList.contains('bomb')) {
    square.innerHTML = '💣';
    square.classList.remove('bomb');
    square.classList.add('checked');
  }
});}

// Check for win
function checkForWin() {
let matches = 0;
for (let i = 0; i < squares.length; i++) {
  if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
    matches++;
    }
    }
    if (matches === bombAmount) {
      const currentTime = Date.now();
      const seconds = Math.floor((currentTime - startTime) / 1000);
      result.innerHTML = `Hooray! You found all mines in ${seconds} seconds and ${moves} moves!`;
      isGameOver = true;
    }
  }
});

