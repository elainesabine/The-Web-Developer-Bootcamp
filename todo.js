var LIs = document.querySelectorAll("li");


for (var i = 0; i < LIs.length; i++){
    LIs[i].addEventListener("mouseover", function(){
        this.classList.toggle("selected");
    });
    
    LIs[i].addEventListener("mouseout", function(){
        this.classList.toggle("selected");
    });

    LIs[i].addEventListener("click", function(){
        this.classList.toggle("done");
    });
}
