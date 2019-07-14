var button = document.querySelector("button");
var isPurple = false;

// using if/else
button.addEventListener("click", function(){
    // if background is purple
    if (isPurple){
        // make it white
        document.querySelector("body").style.background = "white";
    } else { //else if background is white
        // make it purple
        document.querySelector("body").style.background = "purple";
    } 
    isPurple = !isPurple;
});
    
// using toggle
button.addEventListener("click", function(){
    document.querySelector("body").classList.toggle("purple");
});
    
