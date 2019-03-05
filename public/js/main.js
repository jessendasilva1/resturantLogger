$(document).ready(function () {

    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        console.log("button was clicked");
        var burgerName = {
            name: $("#burgerName").val().trim()
        };
        submitPost(burgerName);
    })

    $("button").on("click", function(event){
        event.preventDefault();
        var burgerID = event.target.id;
        console.log(burgerID);
        $.ajax({
            method: "PUT",
            url: "/devourBurger",
            data: {burgerID: burgerID},
          }).then(function(){
              location.reload();
          })
    })

    function submitPost(burgerName) {
        $.post("/newBurger", burgerName, function () {
            $("#burgerName").val("");
            location.reload();
            // update the front end
        });
    }
})