if(!localStorage.getItem('token')){
  $('#after-login').hide()
  $('#before-login').show()
}else{
  $('#after-login').show()
  $('#before-login').hide()
}

const NASA_API_KEY = "4JrKq7hhcwlzRCAvCzp63veGMEF8Fe5GO2kWlnwW";

function getNasaData(e) {
  e.preventDefault();
  // $("#nasa-image").css("display", "none");
    $("#nasa-image").fadeIn();


  $(".input-date-button").toggle();
  const selectedDate = $("#input-date").val();
  $.ajax({
    method: "POST",
    data: {
      date: selectedDate
    },
    url: `http://35.198.237.181/nasa`,
  })
    .done(({data}) => {
      $(".card").show()
      $("#started").hide()
      $(".input-date-button").toggle();
      $("#nasa-title").text(data.title);
      $("#nasa-description").text(data.explanation);
      $("#nasa-image").attr("src", data.url);
      $("#nasa-image").fadeIn("slow");
      for (tag of data.tags) {
      $("#list-tag").append(`
        <span type="button" class="get-youtube" data-toggle="modal" data-target="#youtubeModal" name="${tag}">${tag}</span>`)
      }
      // $("#nasa-image").attr("src", response.hdurl)
    })
    .fail((jqXHR, textStatus) => {
      console.log(textStatus);
      swal("Failed to get image. Try again later", "", "error");
      $(".input-date-button").toggle();
    })
}

$(document).ready(function() {
  console.log("ready!");
  
  
  $("#input-date").datepicker();
  $("#input-date").datepicker("option", "dateFormat", "yy-mm-dd");
  
  $('#login').hover(
    function(){ $(this).addClass('animated heartBeat') },
    function(){ $(this).removeClass('animated heartBeat') }
  )

  $("#input-date-form").submit(getNasaData);

  $(".card").hide()
  $("#started").show() 
})
