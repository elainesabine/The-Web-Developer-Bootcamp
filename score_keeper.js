var p1Button = document.getElementById("p1");
var p1Display = document.getElementById("p1Display");
var p1Score = 0;

var p2Button = document.getElementById("p2");
var p2Display = document.getElementById("p2Display");
var p2Score = 0;

var reset = document.getElementById("reset");

var input = document.querySelector("input")
var gameOver = false;
var winningScore = 5;


p1Button.addEventListener("click", function(){
    if (!gameOver){
        p1Score ++;
        p1Display.textContent = p1Score
        if (p1Score >= winningScore) {
            gameOver = true;
            p1Display.classList.add("win")
        }
    }
});

p2Button.addEventListener("click", function(){
    if (!gameOver){
        p2Score ++;
        p2Display.textContent = p2Score
        if (p2Score >= winningScore) {
            gameOver = true;
            p2Display.classList.add("win")
        }
    }
});


function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = "0"
    p2Display.textContent = "0"
    gameOver = false;
    p1Display.classList.remove("win")
    p2Display.classList.remove("win")
}
reset.addEventListener("click", function(){

});


input.addEventListener("change", function(){
    winningScore = input.value;
    document.querySelector("#winningScore").textContent = winningScore;
    reset();

})