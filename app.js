let h3 = document.getElementById('titleh3');
let ansSeq = [];
let level = 0;
let start = false;
let score = document.getElementById('score');
let highScore = document.getElementById('highscore');
let highScoreNum = 0;

//game start/reset
//start = true only by pressing any key / mid 'start' button
document.addEventListener('keydown', game);
document.getElementById('mid').addEventListener('click', game);
function gameReset() {
    score.innerText = 'Score: 0';
    start = false;
    h3.innerText = 'Press the center or any key to start the game!';
}
function game() {
    if (start) {//if start already made true (achieved by page-reload/gameReset) then don't do this again
        return;
    }
    start = true;
    level = 0;
    levelUp();
}

function randomBtn() {//generates random btn as in html id and returns id string
    const btns = ['one', 'two', 'three', 'four'];
    let theBtn =  Math.floor(Math.random()*4);
    return btns[theBtn];
}
function btnShine() {//shines a randomly generated btn
    let randBtn = randomBtn();
    document.getElementById(randBtn).classList.add('shine');//btn via string id and adding shine class
    setTimeout(() => {
        document.getElementById(randBtn).classList.remove('shine');//just for 100ms
    }, 100);
    return randBtn;//that random button string (id) returned
}
function bgFlash() {//on incorrect button clicked
    document.querySelector('body').classList.add('bgFlash');
    document.getElementById('incorrect').style.display = 'block';
    setTimeout(() => {
        document.querySelector('body').classList.remove('bgFlash');
        document.getElementById('incorrect').style.display = 'none';
    }, 200);
}
function userClick(btn) {//to flash the button user clicks for 1ms
    btn.classList.add('userClick');
    setTimeout(() => {
        btn.classList.remove('userClick');
    }, 75);
}

let idx = 0;//to track the buttons clicked by user to match real ansSeq
function levelUp() {
    ansSeq.splice(0, ansSeq.length);//new sequence of answers will be made
    level++;//new level
    h3.innerText = `Level ${level}`;
    if (level != 1) {//flash a LEVEL UP! sign when its not the first level
        document.getElementById('levelUp').style.display = 'block';
        setTimeout(() => {
            document.getElementById('levelUp').style.display = 'none';
        }, 250);
        highScoreNum = Math.max(highScoreNum, level);
        score.innerText = `Score: ${level-1}`;
        highScore.innerText = `High Score: ${highScoreNum-1}`;
    }
    let i = 0;
    let totalShines = setInterval(() => {//shines = levels at gaps of 100ms as individual btn shine for 100ms also
        let btnShined = btnShine();
        ansSeq.push(btnShined);
        i++;
        if (i == level) clearInterval(totalShines);
    }, 200);
    idx = 0;//match button id strings by user with the ones in array beginning now as all buttons flashed
}

//user actions governing everything
let allBtns = document.querySelectorAll('.btn');
allBtns.forEach(btn => {//applies on all 4 buttons
    btn.addEventListener('click', function btnClick() {//whenever clicked, 
        if (start) {//start button functionalities only when any-key/start is pressed and start = true
            if (ansSeq[idx] !== this.id) {//from idx = 0, if anywhere the btn id string & ansSeq don't match
                bgFlash();//trigger incorrect flash
                setTimeout(() => {//incorrect flashes and gameReset called after 400ms 
                    gameReset();
                }, 400);
            } 
            else {//if the sequence is correct then flash button and update index
                userClick(this);//trigger flash for correct button in sequence pressed by the user
                idx++;
                if (idx == level) {//arr index start = 0, hits level after ++ -> (0 -> level-1 = level number done)
                    setTimeout(() => {
                        levelUp();//if all correct btns clicked, in end idx == level so update level after 500ms
                    }, 400);
                }
            }
        }
    });
});




