var eventsData = 'https://s3.amazonaws.com/bsd-events-json/eventsdata.json';
var eventsList = [];

$.getJSON(eventsData, function(data){  
  if ( data.length ) {

  	for ( var i = 0; i < data.length; i++) {
  		
      var event = data[i],
          st  = event.venue_state,
          d = moment(event.start_time).format('dddd, MMMM Do, hh:mm a'),
          link = event.url;

  		if ( st == abbr ) {

				eventsList.push( '<li class="mb-4"><h3 class="h6 mb-2"><a href="' + link + '">' + event.title + '</a></h3><p class="date">' + d + '</p>' );

        $('#list').html(eventsList);

        continue;
			} 
    
    } // End for

  } else {

    $('#list').html('<li class="mt-3 mb-5">No upcoming events.</li>');

  }

  setTimeout( function() {

    var eventItems = document.getElementById("list").getElementsByTagName("li");
    
    if (eventItems.length == 0) { 
      $('#list').html('<li class="mt-3 mb-5">No upcoming events.</li>');
    }
  }, 2000);

});