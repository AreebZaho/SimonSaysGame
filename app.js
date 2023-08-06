let h3 = document.querySelector('h3');
let ansSeq = [];
let level = 0;
let start = false;

//game starts
function game() {
    if (!start) {
        start = true;
        levelUp();
    }
}//starts by pressing any key / mid 'start' button
document.addEventListener('keydown', game);
document.getElementById('mid').addEventListener('click', game);

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
    }, 100);
}
let idx = 0;//to track the buttons clicked by user to match real ansSeq
function levelUp() {
    ansSeq.splice(0, ansSeq.length);//new sequence of answers will be made
    level++;//new level
    h3.innerText = `Level ${level}`;
    let i = 0;
    let totalShines = setInterval(() => {//as many shines as the number of level at gaps of 200ms
        let btnShined = btnShine();
        ansSeq.push(btnShined);
        i++;
        if (i == level) clearInterval(totalShines);
    }, 200);
    idx = 0;//match button id strings by user with the ones in array beginning now as all buttons flashed
}

//user actions
let allBtns = document.querySelectorAll('.btn');
allBtns.forEach(btn => {//applies on aall 4 buttons
    btn.addEventListener('click', function btnClick() {//whenever clicked, 
        if (ansSeq[idx++] !== this.id) {//from idx = 0, if anywhere the btn id string & ansSeq don't match
            bgFlash();//trigger flash
            level = 0;//make level 0 again 
            setTimeout(() => {//call levelUp which starts level from 1 agiain after 500ms of bgFlash()
                levelUp();
            }, 500);
        } 
        if (idx == level) levelUp();//if all correct btns clicked, in end idx == level so update level
    });
});




