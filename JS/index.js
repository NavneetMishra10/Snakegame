//game constant and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('Asset/snakefood.wav');
const gameOverSound = new Audio('Asset/snakehit.wav');
const moveSound = new Audio('Asset/sankedirection.wav');
const musicSound = new Audio('Asset/bgsound1.wav');
let lastpaintTime = 0;
let score = 0;
let speed = 5;
let snakeArr = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintTime)/1000 < 1/speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again.");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            HiscoreCard.innerHTML = "HighScore: " + hiscoreval;
        }
        scoreCard.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('shead');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

moveSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    HiscoreCard.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    }
});

// Adding touch support for mobile devices
document.getElementById('up').addEventListener('click', () => {
    inputDir = { x: 0, y: -1 };
    moveSound.play();
});
document.getElementById('down').addEventListener('click', () => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
});
document.getElementById('left').addEventListener('click', () => {
    inputDir = { x: -1, y: 0 };
    moveSound.play();
});
document.getElementById('right').addEventListener('click', () => {
    inputDir = { x: 1, y: 0 };
    moveSound.play();
});
