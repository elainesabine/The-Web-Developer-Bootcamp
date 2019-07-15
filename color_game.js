var resetButton = document.querySelector("#reset"); // select reset button
var squares = document.querySelectorAll(".square"); // select all the squares

var colors = generateRandomColors(6);
var pickedColor = pickColor();
document.querySelector("#colorDisplay").textContent = pickedColor; // set rgb word in header to the picked color


resetButton.addEventListener("click", function(){
    colors = generateRandomColors(6);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors"; //set button back to New Colors
    document.querySelector("#colorDisplay").textContent = pickedColor; // set rgb word in header to the picked color
    document.querySelector("h1").style.backgroundColor = "#232323"; // change header background back to original
    for (var i = 0; i < squares.length; i++){ //for each square
        squares[i].style.backgroundColor = colors[i]; // change the background color of the square to its corresponding color in colors array
    };
    console.log(pickedColor)
})


for (var i = 0; i < squares.length; i++){ //for each square
    squares[i].style.backgroundColor = colors[i]; // change the background color of the square to its corresponding color in colors array
    squares[i].addEventListener("click", function(){ // add event listener to each square
        if (this.style.backgroundColor === pickedColor){ // if the square clicked matches pickedColor
            changeColors(pickedColor); // change color of all the squares to pickedColor
            document.querySelector("h1").style.backgroundColor = pickedColor; // change header background to pickedColor
            document.querySelector("#message").textContent = "Correct!"; // change message to correct!
            resetButton.textContent = "Play Again?"; //set 'new colors' button to 'play again?'
        } else { //if the square clicked does not match pickedColor
            this.style.backgroundColor = "#232323"; // change color of square to the background color to make it disappear
            document.querySelector("#message").textContent = "Try Again"; // change message to try again
        
        }
        console.log(this.style.backgroundColor)
    });
}


function changeColors(color){ // function to change all of the squares to the same color
    for (var i = 0; i < squares.length; i ++){ // for each square
        squares[i].style.backgroundColor = color; //change the background color to that color variable
    }
}


function generateRandomColors(num){ // function to generate Colors array with num colors in the array
    var arr = []; // make array
    for(var i = 0; i < num; i++){ // counter to loop num times
        arr.push(randomColor()) // add random color to array
    }
    return arr; // return array
}


function randomColor(){ // function to generate ONE random rgb(#, #, #) color
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function pickColor(){ // function to select a random color from Colors array
    var random = Math.floor(Math.random() * colors.length); // get random color from 0 to length of colors array
    return colors[random]; // return the color from that index
}