// check off todos by clicking an li
$("ul").on("click", "li", function(){
    $(this).toggleClass("done");
});

// remove todo by clicking the x
$("ul").on("click", "span", function(event){
    event.stopPropagation();
    $(this).parent().fadeOut(function(){
        $(this).remove();
    });
});

// add a new todo when typing in input and clicking enter
$("input[type='text']").on("keypress", function(event){
    console.log(event);
    if(event.which === 13){
        var todoText = $(this).val(); // getting new to do text from input box
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");// create new li and add to ul
        $(this).val("");
    }
});

$(".fa-plus").on("click", function () {
    $("input").fadeToggle();
    // $("input").toggleClass("hide");
});