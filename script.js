console.log("Outsmart Your Opponent – The Game is On");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let drawSound = new Audio("draw.mp3");
let turn = "X";
let isgameover = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector(".imgbox img").style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
            gameover.play();
        }
    });

    checkDraw();
};

const checkDraw = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let isDraw = true;

    Array.from(boxtext).forEach((element) => {
        if (element.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw && !isgameover) { 
        document.querySelector(".info").innerText = "It's a Draw!";
        isgameover = true;
        drawSound.play();
    }
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (!isgameover && boxtext.innerText === "") {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    boxtexts.forEach((element) => {
        element.innerText = "";
    });

    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imgbox img").style.width = "0px";
});

