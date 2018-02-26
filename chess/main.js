//版本类型
let versionType = 'canvas';
//游戏是否结束
let gameOver = false;
//是否是人对人
let isp2p = false;
//记录当前人和电脑的落子位置
let pOne = [];
let pTwo = [];

//是否是人下棋
let isMan = true;
//是否选择悔棋
let isBack = false;
//已经落子的位置集合
let chessArr = [];

const oBack = document.querySelector('#back');
const oReback = document.querySelector('#reback');
const oReset = document.querySelector('#reset');
const oChangeRole = document.querySelector('#changeRole');
const oChessA = document.querySelector('#c-chess');
const oCChess = document.querySelector('#c-chessA');
const canvasA = oChessA.getContext('2d');
const canvas = oCChess.getContext('2d');
const oDChess = document.querySelector('#d-chess')
const oDContainer = document.querySelector('#d-container');
const oCContainer = document.querySelector('#c-container');
let docFragment = document.createDocumentFragment();
const versionDom = document.querySelector('#version');
const modeDom = document.querySelector('#mode');

//切换版本
const oVersion = document.querySelector('#version-type')
oVersion.addEventListener('click', () => {
    oReset.click();
    if(versionType === "canvas"){
        versionType = "dom";
        oDContainer.style.display = "block";
        oCContainer.style.display = "none";
    }else{
        versionType = "canvas";
        oDContainer.style.display = "none";
        oCContainer.style.display = "block";
    }
    versionDom.innerHTML = versionType;
}, false)

//每种赢法人或者电脑落子数量，如果有别的落子则加10，表示这种赢法不可能赢
let peopleWin = [],
    computerWin = [];
//可以赢的方式
let canWin = [];
//可以赢的种类数量
let winCount = 0;
for(let i = 0; i< 15; i++){
    canWin[i] = [];
    for(let j = 0; j<15; j++){
        canWin[i][j] = [];
    }
}
//横线赢的方式
for(let i = 0; i<15;i++){
    for(let j = 0;j<11; j++){
        //连成五个子
        for(let k = 0; k<5; k++){
            canWin[i][j+k][winCount] = true;
        }
        winCount++;
    }
}
//竖线赢的方式
for(let i = 0; i<11;i++){
    for(let j = 0;j<15; j++){
        //连成五个子
        for(let k = 0; k<5; k++){
            canWin[i+k][j][winCount] = true;
        }
        winCount++;
    }
}
//正斜线赢的方式
for(let i = 0; i<11;i++){
    for(let j = 0;j<11; j++){
        //连成五个子
        for(let k = 0; k<5; k++){
            canWin[i+k][j+k][winCount] = true;
        }
        winCount++;
    }
}
//反斜线赢的方式
for(let i = 0; i<11;i++){
    for(let j = 14;j>3; j--){
        //连成五个子
        for(let k = 0; k<5; k++){
            canWin[i+k][j-k][winCount] = true;
        }
        winCount++;
    }
}


//画棋盘-canvas
const drawChessboard = () => {
    canvas.strokeStyle = "#ccc";
    for(let i = 0; i<=15; i++){
        canvasA.moveTo(20+40*i, 20);
        canvasA.lineTo(20+40*i, 620);
        canvasA.stroke();
        canvasA.moveTo(20, 20+40*i);
        canvasA.lineTo(620, 20+40*i);
        canvasA.stroke();
    }
    for(let i = 0; i<=224; i++){
        let oSpan = document.createElement('span');
        docFragment.appendChild(oSpan);
    }
    oDChess.appendChild(docFragment)
}


//画棋子
const drawChessman = (x, y, temp) => {
    if(versionType === "canvas"){
        canvas.beginPath();
        canvas.arc(20+x*40,20+y*40, 18, 0, 360);
        canvas.closePath();
        canvas.fillStyle = temp ? "#fff" : "#000";
        canvas.fill();
    }else{
        let chessMan = document.createElement('span');
        let bg = temp ? "#fff" : "#000";
        chessMan.className = "d-chessman";
        chessMan.setAttribute('id', x+''+y);
        chessMan.style.cssText = `
            top:${(y+1)*40}px;
            left:${x*40}px;
            background-color: ${bg};
        `;
        oDContainer.appendChild(chessMan);
    }
}

//清理棋子
const clearChessman = (x, y) => {
    if(versionType === "canvas"){
        canvas.clearRect(x*40, y*40, 40, 40);
    }else{
        oDContainer.removeChild(document.getElementById(x+''+y))
    }
}
//电脑下棋
const computerStep = () => {
    let peopleScore = [];
    let computerScore = [];
    let maxScore = 0;
    let currentX = 0;
    let currentY = 0;

    //在该坐标点落子胜利的期望值
    for(let i = 0; i<15; i++){
        peopleScore[i] = [];
        computerScore[i] = [];
        for(let j = 0; j<15; j++){
            peopleScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for(let i = 0; i<15; i++){
        for(let j = 0; j<15; j++){
            //还未落子
            if(chessArr[i][j] == 0){
                for(let k = 0;k<winCount;k++){
                    if(canWin[i][j][k]){
                        switch(peopleWin[k]){
                            case 1:peopleScore[i][j]+=100;
                                break;
                            case 2:peopleScore[i][j]+=400;
                                break;
                            case 3:peopleScore[i][j]+=800;
                                break;
                            case 4:peopleScore[i][j]+=2000;
                                break;
                        }
                        switch(computerWin[k]){
                            case 1:computerScore[i][j]+=150;
                                break;
                            case 2:computerScore[i][j]+=450;
                                break;
                            case 3:computerScore[i][j]+=850;
                                break;
                            case 4:computerScore[i][j]+=10000;
                                break;
                        }
                    }
                }
                if(peopleScore[i][j]>maxScore){
                    maxScore = peopleScore[i][j];
                    currentX = i;
                    currentY = j;
                }else if(peopleScore[i][j] == maxScore){
                    if(computerScore[i][j]>computerScore[currentX][currentY]){
                        currentX = i;
                        currentY = j;
                    }
                }
                if(computerScore[i][j]>maxScore){
                    maxScore = computerScore[i][j];
                    currentX = i;
                    currentY = j;
                }else if(computerScore[i][j] == maxScore){
                    if(peopleScore[i][j]>peopleScore[currentX][currentY]){
                        currentX = i;
                        currentY = j;
                    }
                }
            }
        }
    }
    drawChessman(currentX, currentY, false);
    // currentComputer = [currentX, currentY];
    if(!pTwo[0]){
        pTwo[0] = [];
    }
    pTwo[0].push([currentX, currentY]);
    chessArr[currentX][currentY] = 2;
    for(let i = 0; i<winCount; i++){
        if(canWin[currentX][currentY][i]){
            computerWin[i]++;
            //人不可能赢
            peopleWin[i] += 10;
            if(computerWin[i]==5){
                alert('computer win!')
                gameOver = true;
            }
        }
    }
    if(!gameOver){
        isMan = !isMan;
    }

}
//人下棋
function peopleStep(event){ 

    if(gameOver){
        return;
    }
    if(!isp2p){
        if(!isMan){
            return;
        }
    }
    if(versionType!=='canvas'){
        var x = Math.floor((event.pageX-event.offsetX)/40),
        y = Math.floor((event.pageY-event.offsetY)/40)-1;
        
    }else{
        var x = Math.floor(event.offsetX/40),
        y = Math.floor(event.offsetY/40);
    }
    if(chessArr[x][y] == 0){
        drawChessman(x, y, isMan);
        // currentPeople = [x, y];
        //只有当前是人对人而且不是第一个人下棋才赋值
        if(isp2p && !isMan){
            pTwo[0].push([x,y]);
        }else{
            pOne[0].push([x, y]);
        }
        chessArr[x][y] =  1;
        for(let i = 0; i<winCount; i++){
            if(canWin[x][y][i]){

                if(isp2p && !isMan){
                    computerWin[i]++;
                    //HOU
                    peopleWin[i] += 10;
                    if(computerWin[i]==5){
                        alert('opponent win!')
                        gameOver = true;
                    }
                }else{
                    peopleWin[i]++;
                    //电脑不可能赢
                    computerWin[i] += 10;
                    if(peopleWin[i]==5){
                        alert('you win!')
                        gameOver = true;
                    }
                }
            }

        }
        if(!gameOver){
            if(!isp2p){
                computerStep();
            }
            isMan = !isMan;
        }
    }

}
oCChess.addEventListener('click', peopleStep, false)
oDChess.addEventListener('click', peopleStep, false)

//悔棋
oBack.addEventListener('click', (event) => {
    let currentOne = [];
    let currentTwo = [];
    isBack = true;
    currentOne = pOne[0].pop();
    pOne[1].push(currentOne);
    currentTwo = pTwo[0].pop();

    pTwo[1].push(currentTwo);
    if(!currentOne){
        return;
    }
    clearChessman(currentOne[0], currentOne[1], true);
    clearChessman(currentTwo[0], currentTwo[1], true);
    chessArr[currentOne[0]][ currentOne[1]] = 0;
    chessArr[currentTwo[0]][ currentTwo[1]] = 0;
    for(let i = 0; i<winCount; i++){
        if(canWin[currentOne[0]][currentOne[1]][i]){
            peopleWin[i]--;
            computerWin[i] -= 10;
        }
    }
    for(let i = 0; i<winCount; i++){
        if(canWin[currentTwo[0]][currentTwo[1]][i]){
            computerWin[i]--;
            peopleWin[i] -= 10;
        }
    }
    gameOver = false;

})

//取消悔棋
oReback.addEventListener('click', (event) => {
    let currentOne = [];
    let currentTwo = [];

    //如果没有悔棋就没有取消悔棋
    if(!isBack){
        return;
    }
    currentOne = pOne[1].pop();
    pOne[0].push(currentOne);
    currentTwo = pTwo[1].pop();
    pTwo[0].push(currentTwo);
    console.log(pTwo)

    if(!currentOne){
        return;
    }
    //所有悔棋撤销之后再重制
    if(!pOne[1].length){
        isBack = false;
    }
    drawChessman(currentOne[0], currentOne[1], true);
    chessArr[currentOne[0]][currentOne[1]] =  1;
    for(let i = 0; i<winCount; i++){
        if(canWin[currentOne[0]][currentOne[1]][i]){
            peopleWin[i]++;
            //电脑不可能赢
            computerWin[i] = 10;
            if(peopleWin[i]==5){
                alert('you win!')
                gameOver = true;
            }
        }
    }
    if(!gameOver){
        if(!isp2p){
            //为了防止二次添加到已走位置
            drawChessman(currentTwo[0], currentTwo[1], false);
            chessArr[currentTwo[0]][currentTwo[1]] =  2;
            for(let i = 0; i<winCount; i++){
                if(canWin[currentTwo[0]][currentTwo[1]][i]){
                    computerWin[i]++;
                    //电脑
                    peopleWin[i] += 10;
                    if(computerWin[i]==5){
                        alert('computer win!')
                        gameOver = true;
                    }
                }
            }
        }else{
            drawChessman(currentTwo[0], currentTwo[1], false);
            chessArr[currentTwo[0]][currentTwo[1]] =  2;
            for(let i = 0; i<winCount; i++){
                if(canWin[currentTwo[0]][currentTwo[1]][i]){
                    computerWin[i]++;
                    //先手
                    peopleWin[i] += 10;
                    if(computerWin[i]==5){
                        alert('opponent win!')
                        gameOver = true;
                    }
                }
            }
        }
    }

})
//重制棋盘
oReset.addEventListener('click', (event) => {
    if(versionType === "canvas"){
        canvas.clearRect(0,0,640,640);
    }else{
        resetDomChess()
    }
    gameOver = false;
    isMan = true;
    for(let i = 0;i<winCount;i++){
        peopleWin[i] = 0;
        computerWin[i] = 0;
    }
    for(let i = 0;i<15;i++){
        chessArr[i] = [];
        for(let j = 0;j<15;j++){
            chessArr[i][j] = 0;
        }
    }
    for(let i = 0; i<2; i++){
        pOne[i] = [];
        pTwo[i] = [];
    }
})

function resetDomChess(){
    let childs = Array.from(oDContainer.childNodes).filter(node => node.nodeType === 3).slice(1);
    console.log('clear dom')
    childs.forEach(node => {
        oDContainer.removeChild(node)
    })
    console.log(oDContainer.children)
}

//切换角色
oChangeRole.addEventListener('click', (event) => {
    isp2p = !isp2p;
    modeDom.innerHTML = isp2p ? "人机" : "人对人";
    oReset.click();
});

// 初始化
const init = ()=>{
    drawChessboard();
    oReset.click();
}
init()
