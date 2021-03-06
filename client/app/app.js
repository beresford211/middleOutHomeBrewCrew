$(function() {
  $('a[rel=tipsy]').tipsy({fade: true, gravity: 'n'});
});

// ajax call to server for youtube api GET request
function youtubeSearch(searchItem) {
  $.ajax({
    'url': "/searchYoutube",
    'type': 'GET',
    'data': {'searchItem': searchItem},
  }).done( function(data) {
    $('#search-results').empty();
    $.each( data.items, function(i, item ) { 
      var vidId = item.id.videoId;
      var vidImage = item.snippet.thumbnails.medium.url; 
      var vidDescription = ''+item.snippet.description.slice(0, 30)+'..';
      appendVideoImage(vidId, vidImage, vidDescription);
    });
  });
}

// append youtube song list to left-side container 
function appendVideoImage(videoId, videoImage, vidDescription) {
  var pics = $('<p id="' + videoId + '" original-title="'+vidDescription+'"><img src="' + videoImage +'" height="70"></p>').hide().fadeIn(4000); 
  $('#search-results').append(pics); 
  $('#'+videoId).tipsy();
}

// search youtube button
$('#search-btn').on('click', function(event) {
  $('#search-results-container').show();
  var searchVal = $('#youTubeSearchInput').val();
  youtubeSearch(searchVal);
});

// show hide search results & saved results container
$('#saved-results-container').hide();
$('#show-searched-results-btn,#show-saved-results-btn').click(function(e){
    var currentId = e.target.id;
    if(currentId === 'show-searched-results-btn'){
      $('#saved-results-container').hide();
      $('#search-results-container').show();   
    } else {
      $('#saved-results-container').show();
      $('#search-results-container').hide();
    }
});

function muteVideo() {
  if(socket.player) {
    socket.player.mute();
    $('.mute').show();
  }
}

function unMuteVideo() {
  if(socket.player) {
    socket.player.unMute();
    $('.mute').hide(); 
  }
}

$('#volume').change(function() {
  var volVal = $('#volume').val();
  setVolume(volVal);
});

function setVolume(value) {
  if(socket.player) {
    socket.player.setVolume(value);
  }
}
