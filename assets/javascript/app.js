

//Javascript code for the gif app page

//Variable Section

var topicArray = ['Cats', 'Daily Show', 'David Letterman'];
var APIkey = 'tpOBhMb9bMKdBzmRRjzV11nmEBK126qW';

//Document Ready
$(document).ready(function () {
    createButtons();

//Clicked functions section
//========================

    //Function to add a button
    $("#new-category-button").on('click', function () {
        //event.preventDefault();
        var newCategory = $('#input-line').val();
        if (newCategory == "") {
            alert('You must input a new topic');
        } else {
            topicArray.push(newCategory);
            createButtons();
        }
    });

    //Function to add GIFs to gif-box
    $(document).on('click', '.topicButton', function() {
        var giphTopic = $(this).val();
        giphTopic = giphTopic.replace(" ", "+");
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + giphTopic + '&api_key=tpOBhMb9bMKdBzmRRjzV11nmEBK126qW&limit=10'
        console.log(queryURL);

        //AJAX call to GIPHY API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(updatePage);
    });


    //Function to Start/Stop GIFs
    $(document).on('click', '.gif', function() {

        if ($(this).attr('data-state') == 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        };
    });


//Called functions section
//========================

    //Function to create buttons
    function createButtons() {
        $('#buttons-area').empty();
        for (i = 0; i < topicArray.length; i++) {
            var newButton = $('<button class="btn btn-secondary topicButton m-1">');
            newButton.attr('value', topicArray[i]);
            newButton.text(topicArray[i]);
            $('#buttons-area').append(newButton);

        }
    };

    function updatePage(response) {
        console.log(response);
        //change results to array to minimize typing
        var dataArray = response.data;

        //Loop to display all gifs returned in the data array

        for (i = 0; i < dataArray.length; i++) {

        //Create Image for new GIF
        var newGIPH = $('<img>');
        newGIPH.attr('src', dataArray[i].images.fixed_height_still.url);
        console.log(dataArray[i].images.fixed_height_still.url);
        newGIPH.attr('data-animate', dataArray[i].images.fixed_height.url);
        newGIPH.attr('data-still', dataArray[i].images.fixed_height_still.url);
        newGIPH.attr('data-state', 'still');
        newGIPH.addClass('gif');

        //Create a paragraph to house the GIF rating
        newGIPHrating = $('<p class="gif-rating">');
        newGIPHrating.text(dataArray[i].rating);


        //Create box to house the new GIF and rating
        var newGIPHbox = $('<div class="div-GIPH-box">')
        newGIPHbox.append(newGIPH);
        newGIPHbox.append(newGIPHrating);
       $('#giph-box').prepend(newGIPHbox);
    };
}; //Close loop that creates the correct number of GIFs from dataArray 


});//Close document.ready function