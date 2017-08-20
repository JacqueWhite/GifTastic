// event listener for all button elements
$("button").on("click", function() {
	var subject = $(this).attr("data-subject");

// make the URL
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=dc6zaTOxFJmzC&limit=10";

// AJAX request

	$.ajax({
		url: queryURL,
		method: "GET"
	})


// when data comes back from API
	.done(function(response) {

		// store an array of results in the results variable
		var results = response.data;


		// looping over every result item
		for (var i = 0; i < results.length; i++) {
			
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

			// storing the result item's rating
			var rating = results[i].rating;

			var p = $("<p>").text("Rating: " + rating);
			// creating an image tag
			var subjectImage = $("<img>");

			// giving the image tag a src attribute of a property pulled off the result item
			subjectImage.attr("src", results[i].images.fixed_height.url);

			// appending the paragraph and subjectImage created to the gifDiv created
			gifDiv.append(p);
			gifDiv.append(subjectImage);

			// prepending the gifDiv to the gifs-appear-here div in html
			$("#gifs-appear-here").prepend(gifDiv);
		}

			$("item").append('<img class="item" src="' + response.data[i].images.fixed_height_still.url + '">');
	  }
	 });


	 

	
});




