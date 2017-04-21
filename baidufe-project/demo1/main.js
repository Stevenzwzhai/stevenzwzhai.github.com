/**
 * Created by Administrator on 2017/4/20.
 */
const punchEle = document.getElementById('punch');
const page1Ele = document.getElementById('page1');
const page2Ele = document.getElementById('page2');
let userPunchType = "";
let computerPunchType = "";
const boxTypes = {
    rock:"石头",
    scissors:'剪刀',
    paper:'布'
};
const boxResult = {
    user:'你赢了！',
    computer:'你输了！',
    none:'居然平手'
}
let computerPunch = () => {
    let computerPunchType = "";
    switch(parseInt(Math.random()*2+1)){
        case 1:computerPunchType = "rock";
            break;
        case 2:computerPunchType = "scissors";
            break;
        case 3:computerPunchType = "paper";
            break;
        default :computerPunchType = "rock";
    }
    return computerPunchType;
}

let computed = (user, computer) => {
    let winner = "";
    let state1 = ['rock', 'scissors'];
    let state2 = ['paper', 'rock'];
    let state3 = ['paper', 'scissors'];
    let currentState = [user, computer].sort();
    console.log(currentState);
    switch(currentState.join()){
        case state1.join():winner = user == 'rock' ? 'user' : 'computer';
            break;
        case state2.join():winner = user == 'paper' ? 'user' : 'computer';
            break;
        case state3.join():winner = user == 'scissors' ? 'user' : 'computer';
            break;
        default: winner = 'none';
    }
    return winner;
}
punchEle.addEventListener('click', (e) => {
    userPunchType = e.target.getAttribute('data-type');
    computerPunchType = computerPunch();
    let result = computed(userPunchType, computerPunchType);
    console.log(userPunchType, computerPunchType);
    console.log(result);
    page2Ele.innerHTML = `<div class="header">
                <span id="again">再来一次</span>
                <span></span>
            </div>
            <div id="punch" class="content">
                <span>你：${boxTypes[userPunchType]}</span>
                <span>结果:${boxResult[result]}</span>
                <span>电脑：${boxTypes[computerPunchType]}</span>
            </div>`;
    let againEle = document.getElementById('again');
    againEle.addEventListener('click', () => {
        page1Ele.style.display = "block";
        page2Ele.style.display = "none";
    })
    page1Ele.style.display = "none";
    page2Ele.style.display = "block";
})

