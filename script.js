const announcement = document.querySelector(".announcement");
const winAnnouncement = document.querySelector("#para");
const startBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const boxes = document.querySelectorAll(".box");
startBtn.style.display = "None";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
];

let playerO = true;
let turns = 0;

boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (playerO) {
                box.innerText = "O";
                box.style.color = "blue";
                playerO = false;
            }
            else {
                box.innerText = "X";
                box.style.color = "red";
                playerO = true;
            };
            box.disabled = true;
            turns += 1;
            
            if (turns < 9) {
            checkWinner();
            }
            else {
                if (checkWinner() == true) {
                    checkWinner();
                }
                else {
                    isDraw();
                }
            };
        });
});

const isDraw = () => {
    winAnnouncement.textContent = "OOOOOP's the game is Draw.!";
    showPara(true);
    disbleBtnsAction(true);
    resetBtn.disabled = true;
    startBtn.style.removeProperty("display");
};

const checkWinner = () => {
    let win = false;

        for (let pattern of winPatterns) {
            let box1 = (boxes[pattern[0]]).innerText;
            let box2 = (boxes[pattern[1]]).innerText;
            let box3 = (boxes[pattern[2]]).innerText;
            
            if (box1 != "" && box2 != "" && box3 != "") {
                if (box1 === box2 && box1 == box3) {
                    winAnnouncement.textContent = "Congratulation Player " + box1 + " Won";
                    showPara(true);
                    disbleBtnsAction(true);
                    resetBtn.disabled = true;
                    startBtn.style.removeProperty("display");
                    win = true;
            };
        };
    };
    return win;
};

const showPara = (toshow) => {
    if (toshow) {
        winAnnouncement.removeAttribute("class", "hidden");
        winAnnouncement.setAttribute("class", "para");
    }
    else {
        winAnnouncement.removeAttribute("class", "para");
        winAnnouncement.setAttribute("class", "hidden");
        winAnnouncement.innerText = "";
        startBtn.style.display = "None";
    };
};

const disbleBtnsAction = (val, clearData = false) => {
    for (btn of boxes) {
        btn.disabled = val;
        if (clearData) {
            btn.innerText = "";
        };
    };
};

const restart = () => {
    disbleBtnsAction(false, true);
    playerO = true;
    resetBtn.disabled = false;
    turns = 0;
};

resetBtn.addEventListener("click", restart);
startBtn.addEventListener("click", restart);
startBtn.addEventListener("click", () => showPara(false));