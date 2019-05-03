const NASA_API_KEY = "4JrKq7hhcwlzRCAvCzp63veGMEF8Fe5GO2kWlnwW";

function getNasaData(e) {
  e.preventDefault();
  // $("#nasa-image").css("display", "none");
  $("#nasa-image").fadeIn();


  $(".input-date-button").toggle();
  const selectedDate = $("#input-date").val();
  $.ajax({
    method: "GET",
    url: `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${selectedDate}`,
  })
    .done((response) => {
      console.log(response);

      $(".input-date-button").toggle();
      $("#nasa-title").text(response.title);
      $("#nasa-description").text(response.explanation);
      $("#nasa-image").attr("src", response.url);
      $("#nasa-image").fadeIn("slow");
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
  
  $("#input-date-form").submit(getNasaData);
})