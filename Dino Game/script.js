score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
     
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "𝔊𝔞𝔪𝔢 𝔒𝔳𝔢𝔯 - ℜ𝔢𝔩𝔬𝔞𝔡 𝔱𝔬 𝔓𝔩𝔞𝔶 𝔄𝔤𝔞𝔦𝔫"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = " 𝒴𝑜𝓊𝓇 𝒮𝒸𝑜𝓇𝑒: " + score
}

document.addEventListener("keydown", function (event) {
    let player = document.querySelector(".dino");
    let playerPos = player.getBoundingClientRect();
    let gameContainer = document.querySelector(".gameContainer").getBoundingClientRect();

    let moveDistance = window.innerWidth < 768 ? 0.5 : 6;  

    let currentLeft = parseFloat(window.getComputedStyle(player).left) || 0;

    if (event.key === "ArrowRight" && playerPos.right < gameContainer.right) {
        player.style.left = (currentLeft + moveDistance) + "px";
    } 
    else if (event.key === "ArrowLeft" && playerPos.left > gameContainer.left) {
        player.style.left = (currentLeft - moveDistance) + "px";
    }

    event.preventDefault();  
});

function checkCollision() {
    let player = document.querySelector(".dino").getBoundingClientRect();
    let obstacle = document.querySelector(".obstacle").getBoundingClientRect();

    if (
        player.right - 5 > obstacle.left &&  
        player.left + 5 < obstacle.right &&
        player.bottom > obstacle.top &&
        player.top < obstacle.bottom
    ) {
        console.log("Collision detected! Game Over!");
        document.querySelector(".gameOver").style.display = "block";
    }
}

 
window.onload = function () {
    if (window.innerWidth < 768) {
        let obstacle = document.querySelector(".obstacle");
        if (obstacle) {
            obstacle.style.animationDuration = "4s";  
        }
    }
};

 

let lastTap = 0;  

document.addEventListener("touchstart", function (event) {
    let currentTime = new Date().getTime();
    let tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {  
        jump();
    } else {
        let touchX = event.touches[0].clientX;
        let screenWidth = window.innerWidth;

        if (touchX < screenWidth / 2) {
            moveLeft();   
        } else {
            moveRight();  
        }
    }

    lastTap = currentTime; 
});

function jump() {
    let dino = document.querySelector(".dino");
    if (!dino.classList.contains("jumping")) {
        dino.classList.add("jumping");
        setTimeout(() => {
            dino.classList.remove("jumping");
        }, 700);  
    }
}

function moveLeft() {
    let dino = document.querySelector(".dino");
    let currentLeft = parseInt(window.getComputedStyle(dino).left) || 0;
    dino.style.left = Math.max(0, currentLeft - 20) + "px";  
}

function moveRight() {
    let dino = document.querySelector(".dino");
    let currentLeft = parseInt(window.getComputedStyle(dino).left) || 0;
    let screenWidth = window.innerWidth;
    let dinoWidth = dino.offsetWidth;
    
    dino.style.left = Math.min(screenWidth - dinoWidth, currentLeft + 20) + "px"; 
}
