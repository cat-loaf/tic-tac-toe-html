let game = []
let turn = "🟢"
let t=[];
let winState = false; // for gameend
let anywon = false; // for checking draw
let buttonClickSound = new Audio('./audio/button_click.mp3');
let winSound = new Audio('./audio/win.mp3');
let drawSound = new Audio('./audio/draw.mp3');
$(function() {
    $("td").hover(function(){
        if (winState == false) {
            $(this).css("background-color","#2c313c");
        }
    },function(){
        if (winState == false) {
            $(this).css("background-color","#282c34");
        }
    });  
    $("span#move").text(`Move: ${turn}`);
    $("button#resetBtn").click(resetGame);
    $("td").click(function(){
        if (winState == false) {
            if ($(this).text() == "") {
                this.innerHTML = turn;
                if (turn=="🟢") {
                    turn = "❌";
                } else {
                    turn = "🟢";
                }
                $("span#move").text(`Move: ${turn}`);
                buttonClickSound.play();
                checkGame();
            }
        }
    });
})
function checkGame() {
    t=[];
    $("tr").each(function(){
        $(this).children().each(function(){
            if ($(this).text() == "") {
                t.push("Null");
            } else {
                t.push($(this).text());
            }
        });
    });
    // horizontal
    for (let i = 0; i<3; i++) {
        if (new Set(t.slice(0+(3*i),3+(3*i))).size==1 && t[0+(3*i)]!="Null") {
            console.log(`${t[0+(3*i)]} won horizontal`);
            ($("td")[0+(3*i)]).style.backgroundColor="#357d5c";
            ($("td")[1+(3*i)]).style.backgroundColor="#357d5c";
            ($("td")[2+(3*i)]).style.backgroundColor="#357d5c";
            wonGame(t[0+(3*i)]);
            anywon = true;
        }
    }
    // vertical
    for (let i = 0; i<3; i++) {
        // console.log(`${i}: ${0+i} ${3+i} ${6+i}`);
        if (t[0+i]!="Null" && t[0+i]==t[3+i] && t[0+i]==t[6+i]) {
            console.log(`${t[0+i]} won vertical`);
            ($("td")[0+i]).style.backgroundColor="#357d5c";
            ($("td")[3+i]).style.backgroundColor="#357d5c";
            ($("td")[6+i]).style.backgroundColor="#357d5c";
            wonGame(t[0+i]);
            anywon = true;
        }
    }
    // diagonal
    if (t[0]!="Null" && t[0]==t[4] && t[0]==t[8]) {
        console.log(`${t[0]} won diagonal`);
        ($("td")[0]).style.backgroundColor="#357d5c";
        ($("td")[4]).style.backgroundColor="#357d5c";
        ($("td")[8]).style.backgroundColor="#357d5c";
        wonGame(t[0]);
        anywon=true;
    }
    if (t[2]!="Null" && t[2]==t[4] && t[2]==t[6]) {
        console.log(`${t[2]} won diagonal 2`);
        ($("td")[2]).style.backgroundColor="#357d5c";
        ($("td")[4]).style.backgroundColor="#357d5c";
        ($("td")[6]).style.backgroundColor="#357d5c";
        wonGame(t[2]);
        anywon=true;
    }
    let isFull=0;
    t.forEach((item)=>{
        if (item!="Null") {
            isFull += 1;
        }
    });
    if (isFull==9 && winState==false) {
        wonGame("Noone 😭");
    }
    
}

function resetGame() {
    $("td").text("");
    if (turn=="🟢") {
        turn="🟢";
    } else {
        turn="❌";
    }

    $("span#move").text(`Move: ${turn}`);
    $("td").css("background-color", "#282c34");
    winState = false;
}

function wonGame(char) {
    $("span").html(`${char} has won!`);
    winState = true;
    if (char!="Noone 😭") {
        winSound.play();
        setTimeout(()=>{
            winSound.pause();
            winSound.currentTime = 0;
        },961);
    } else {
        drawSound.play();
    }
}