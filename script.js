let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let newGameBtn = document.querySelector('#new');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');

let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
]

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add('hide');
    newGameBtn.classList.add('hide');
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if(turn0) {
            box.innerText = 'O';
            turn0 = false;
        } else {
            box.innerText = 'X';
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = CheckWinner();

        if(count === 9 && !isWinner) {
            msg.innerText = 'It\'s a tie!';
            msgContainer.classList.remove('hide');
            newGameBtn.classList.remove('hide');
            disableBoxes();
        }
    })
})

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}
const showWinner = (winner) => {
    msg.innerText = `${winner} wins!`;
    newGameBtn.classList.remove('hide');
    msgContainer.classList.remove('hide');
    disableBoxes();
}
const CheckWinner = () => { 
    for( let i of winPatterns) {
        let pos1val = boxes[i[0]].innerText;
        let pos2val = boxes[i[1]].innerText;
        let pos3val = boxes[i[2]].innerText;

        if(pos1val !== '' && pos2val !== '' && pos3val !== '') {
            if(pos1val === pos2val && pos2val === pos3val) {
                console.log(`Congrats ${pos1val} wins!`);
                showWinner(pos1val);
            }
        }
    }
}
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);




