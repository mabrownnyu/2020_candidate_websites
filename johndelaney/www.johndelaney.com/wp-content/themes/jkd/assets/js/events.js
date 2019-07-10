function disableMap() {
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
  if (map.tap) map.tap.disable();
  document.getElementById('map').style.cursor='default';
}

var map = L.map('map', {
  center: [40, -85],
  zoom: 5
});

var tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3JlZ2hhdWVuc3RlaW4iLCJhIjoiY2pmdmFxZ3ltNGpwNjJ3cG9mdDAwMDJjbyJ9.9MWksaEuE2ti4Pn973PhTQ', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
})

tileLayer.addTo(map);

var myIcon = L.icon({
  iconUrl: '/wp-content/themes/jkd/assets/images/marker-icon-logo.png',
  shadowUrl: '/wp-content/themes/jkd/assets/images/marker-shadow.png',
  iconSize: [25, 40],
  iconAnchor: [12.5, 32]
});

var eventsData = 'https://s3.amazonaws.com/bsd-events-json/eventsdata.json';
var eventsList = [];
var markerArray = [];

$.getJSON(eventsData, function(data){  
  if ( data.length ) {

    for ( var i = 0; i < data.length; i++) {

      var event = data[i],
          category = event.event_type.split(' ').join('-').toLowerCase();
          lat = event.lat,
          lon = event.lng,
          st  = event.venue_state,
          d = moment(event.start_time).format('dddd, MMMM Do @ h:mm a'),
          link = event.url;

      var popupText = '<h4><a href="' + link + '">' + event.title + '</a></h4><p class="date">' + d + '</p><p><strong>' + event.venue_name + '</strong><br />' + event.venue_addr1 + '<br />' + event.venue_city + ', ' + st + ' ' + event.venue_zip + ' &middot; <a href="' + link + '"><strong>RSVP</strong></a></p>';

      var markerLocation = new L.LatLng(lat, lon);

      var marker = new L.Marker(markerLocation, {
        icon: myIcon
      });
      marker.bindPopup(popupText);

      if ( category == 'office-opening' ||
           category == 'meet-and-greet' ||
           category == 'town-hall'      ||
           category == 'watch-party'    ||
           category == 'phone-bank' ) {
        map.addLayer(marker);
        markerArray.push(L.marker([lat, lon]));
        eventsList.push( '<li class="' + category + '"><a href="' + link + '"><h3 class="h6 mb-2">' + event.title + '</h3><p class="date mb-0">' + event.venue_addr1 + ', ' + event.venue_city + ', ' + st + '<br />' + d + '</p></a></li>' );
      }
      $('#list').html(eventsList);

    } // End for
    $('#content').prepend('<h2>Upcoming Events</h2>');
  }  // End if

  if ( eventsList.length == 0 ) {
    $('#list').html('<h2 class="h4 mt-3 mb-5">No upcoming events.</h4>');
    disableMap();
    $('#map').css('opacity', '0.5');
  } else {

    var group = L.featureGroup(markerArray);
    map.fitBounds(group.getBounds(), {padding: [100, 100], maxZoom: 9, minZoom: 6});

  }

  var mapHeight = $('#map').height();
  var contentHeight = $('#main').height();

  if (contentHeight > mapHeight) {
    $('#map').css('height', contentHeight);
    map.invalidateSize();
    map.fitBounds(group.getBounds(), {padding: [100, 100], maxZoom: 9, minZoom: 6});
  }

});