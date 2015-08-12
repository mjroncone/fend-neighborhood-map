var map;

// Following functions are from GoogleMaps' API documentation:
//  https://developers.google.com/maps/documentation/javascript/tutorial

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

function initialize() {
  // Creates LatLng object to feed into G.Maps API for map center position
  var lincolnParkChicago = {lat: 41.926411, lng: -87.643326};

  // Sets the mapOptions that will be served in the API request
  var mapOptions = {
   center : lincolnParkChicago,
   zoom : 16
  }

  // Creates a new G.Maps object and fixed it to the element with id 'map-area'
  map = new google.maps.Map(document.getElementById('map-area'),
    mapOptions);

  updateMarkers();
};

function updateMarkers() {
  var markerObject = {
    starbucks: {
      position: {lat: 41.928640 , lng: -87.642064},
      title: 'Starbucks',
      infoWindow: new google.maps.InfoWindow({
        content: '<div>Starbucks!</div>'
      }),
    },
    standardMarket: {
      position: {lat: 41.925894, lng: -87.641075},
      title: 'Standard Market',
      infoWindow: new google.maps.InfoWindow({
        content: '<div>Standard Market!</div>'
      }),
    }
  }
  google.maps.event.addListener(map, 'tilesloaded', addMapsMarkers(markerObject));
};

function addMapsMarkers(markerObject) {

  var markerList = [];

  for (var business in markerObject){
    var marker = new google.maps.Marker({
      position: markerObject[business].position,
      title: markerObject[business].title,
      infowindow: markerObject[business].infoWindow,
      animation: google.maps.Animation.DROP,
      map: map
    });

    marker.toggleBounce = function() {
      if (this.getAnimation() != null) {
        this.setAnimation(null);
      } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    };

    google.maps.event.addListener(marker, 'click', function() {
      markerList.forEach(function(mrkr) {
        if (mrkr.animation != null) {
          mrkr.setAnimation(null);
        }
      });
      this.infowindow.open(map, this);
      this.toggleBounce();
    });

    markerList.push(marker);
  }
};
