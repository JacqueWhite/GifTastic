$(document).ready(function() {

    var zombies = [
        "CORAL!", "rick grimes", "carol's cookies", "look at the flowers", "daryl dixon", "the walking dead", "lori grimes", "michonne", "zombie walkers", "neegan", "lucille"
    ];

    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
        $(areaToAddTo).empty();

        for (var i = 0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }

    }

    $(document).on("click", ".zombie-button", function() {
        $("#zombies").empty();
        $(".zombie-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var zombieDiv = $("<div class=\"zombie-item\">");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var zombieImage = $("<img>");
                    zombieImage.attr("src", still);
                    zombieImage.attr("data-still", still);
                    zombieImage.attr("data-animate", animated);
                    zombieImage.attr("data-state", "still");
                    zombieImage.addClass("zombie-image");

                    zombieDiv.append(p);
                    zombieDiv.append(zombieImage);

                    $("#zombies").append(zombieDiv);
                }
            });
    });

    $(document).on("click", ".zombie-image", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#add-zombie").on("click", function(event) {
        event.preventDefault();
        var newZombie = $("input").eq(0).val();

        if (newZombie.length > 2) {
            zombies.push(newZombie);
        }

        populateButtons(zombies, "zombie-button", "#zombie-buttons");

    });

    populateButtons(zombies, "zombie-button", "#zombie-buttons");
});