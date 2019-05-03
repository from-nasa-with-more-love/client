const NASA_API_KEY = "4JrKq7hhcwlzRCAvCzp63veGMEF8Fe5GO2kWlnwW";
var YOUTUBE_API_KEY = "AIzaSyDh8civnPSFj1qs9NNQ4vE_6pP9KmksleI"

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
    // $("#nasa-image").fadeIn();
    $("#nasa-image").css("display", "none");
    $("#iframe-special").hide()
    $("#nasa-title").hide()
    $(".card").hide()
  $("#loading").show() 
  $("#started").hide()


  $("#input-date-submit").css("display", "none");
  $("#input-date-loading").css("display", "block");
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
      $("#nasa-title").show()
      $(".card").show()
      $("#loading").hide()
      $("#input-date-submit").css("display", "block");
      $("#input-date-loading").css("display", "none");
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

      $("#special-row").empty()
      if(data.special){
        $("#special-row").append(`<button class="btn btn-dark btn-sm mt-3 ml-3 mb-1" onClick="loadIframe('${data.special}')">Special</button>`)
      }
    })
    .fail((jqXHR, textStatus) => {
      console.log(textStatus);
      swal("Failed to get image. Try again later", "", "error");
      $(".input-date-button").toggle();
    })
}

function loadIframe(urlVideo){
  $("#nasa-image").hide()
  $("#iframe-special").show()
  $("#iframe-special").html(`
  <iframe class="embed-responsive-item" width="560" height="315" src="${urlVideo}" allowfullscreen></iframe>
`);
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
  $("#loading").hide() 
})
