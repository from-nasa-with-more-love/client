const NASA_API_KEY = "4JrKq7hhcwlzRCAvCzp63veGMEF8Fe5GO2kWlnwW";
var YOUTUBE_API_KEY = "AIzaSyDKExSK10S6zXndFEZ86JHiNTdVPl7D0xk"

$(document).ready(function() {
  console.log("ready!");
  
  $("#input-date").datepicker();
  $("#input-date").datepicker("option", "dateFormat", "yy-mm-dd");
  
  $('#login').hover(
    function(){ $(this).addClass('animated heartBeat') },
    function(){ $(this).removeClass('animated heartBeat') }
  )

  $("#youtubeModal").on("hidden.bs.modal", function () {
    $(".modal-body").empty();
    $("#channel-name").attr("href", '');
  });

  $("#input-date-form").submit(getNasaData);

  $(".card").hide()
  $("#started").show() 
})

$(document).on("click", ".get-youtube", function() {
  event.preventDefault();
  $.ajax({
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=space%20${$(this).attr("name")}%20explanation&type=video&maxResults=1&chart=mostPopular&key=${YOUTUBE_API_KEY}`,
  })
    .done((res) => {
      console.log(res)
      $(".modal-body").html(`
      <iframe class="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/${res.items[0].id.videoId}" allowfullscreen></iframe>
      `);
      $("#youtubeModalLabel").text(`${res.items[0].snippet.title}`);
      $("#channel-name").attr("href", `https://www.youtube.com/channel/${res.items[0].snippet.channelId}`)
    })
    .fail((jqXHR, textStatus) => {
      console.log(textStatus);
    })
})

if(!localStorage.getItem('token')){
  $('#after-login').hide()
  $('#before-login').show()
}else{
  $('#after-login').show()
  $('#before-login').hide()
}

function getNasaData(e) {
  e.preventDefault();
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
      $("#list-tag").empty();
      $(".card").show()
      $("#started").hide()
      $(".input-date-button").toggle();
      $("#nasa-title").text(data.title);
      $("#desc-english").text(data.explanation);
      $("#desc-ina").text(data.translated.id);
      $("#desc-sunda").text(data.translated.su);
      $("#desc-java").text(data.translated.jv);
      $("#desc-malay").text(data.translated.ms);
      $("#nasa-image").attr("src", data.url);
      $("#nasa-image").fadeIn("slow");
      for (tag of data.tags) {
      $("#list-tag").append(`
        <span class="get-youtube btn btn-dark mx-1 my-2 py-1 px-2 text-light" data-toggle="modal" data-target="#youtubeModal" name="${tag}">${tag}</span>`)
      }
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
