$("h1").addClass("big-title margin-50");

$("button").html("<em>hey</em>")

$("button").click(function(){
    $("h1").css("color","purple");
});

$("body").keypress(function(event){
    $("h1").html(event.key);
});