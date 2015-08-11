// Following functions are from GoogleMaps' API documentation:
//  https://developers.google.com/maps/documentation/javascript/tutorial
function initialize() {
  // Creates LatLng object to feed into G.Maps API for map center position
  var lincolnParkChicago = {lat: 41.926411, lng: -87.643326};

  // Sets the mapOptions that will be served in the API request
  var mapOptions = {
   center : lincolnParkChicago,
   zoom : 16
  }

  // Creates a new G.Maps object and fixed it to the element with id 'map-area'
  var map = new google.maps.Map(document.getElementById('map-area'),
      mapOptions);

  var marker = new google.maps.Marker({
    position: {lat: 41.928640 , lng: -87.642064},
    title: 'Starbucks',
    map: map
  });
}

// Contains the script to actually make the API request, putting it here and
// invoking it later allows us to load G.Maps asynchronously on window load.
function startApp() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-9HlnwXsPlOG1m3D6UVLNrW3O5LU7CHA' +
                  '&signed_in=true&callback=initialize';
  document.body.appendChild(script);

}

window.onload = startApp;
