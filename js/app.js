var map;
var markerList = ko.observableArray([]);
var targetLoc = {lat: 41.926411, lng: -87.643326};

// Following startApp and initialize functions are from GoogleMaps' API documentation:
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

function initialize() {
  // Creates LatLng object to feed into G.Maps API for map center position
  var mapTarget = targetLoc;

  // Sets the mapOptions that will be served in the API request
  var mapOptions = {
   center : mapTarget,
   zoom : 16,
   disableDefaultUI: true
  }

  // Creates a new G.Maps object and fixed it to the element with id 'map-area'
  map = new google.maps.Map(document.getElementById('map-area'),
    mapOptions);

}

function fourSquareAjaxConstructor(lat, lng) {
  var fourSqBaseRequest = 'https://api.foursquare.com/v2/venues/search?intent=browse';
  var target = '&ll=' + lat + ',' + lng;
  var radius = '&radius=' + 500;
  var categoryIds = ['4bf58dd8d48988d1e0931735','4d4b7105d754a06374d81259'];
  var categories = '&categoryId=' + categoryIds.reduce(function(previousValue, currentValue){
      return previousValue + ',' + currentValue});
  var client_id = '&client_id=' + 'E2KGUFUAJOBTFYJLJT1NT50XKR3IDGYMFMOLG2G3GNXXUHB5';
  var client_secret= '&client_secret=' + '5ABPBLHRJNIRA5ROV0OMTNQGL3A5YMPNUPMY0J4UYOZONN5V';
  var version = '&v=' + '20150101';

  var ajaxUrl = fourSqBaseRequest + target + radius + categories + client_id + client_secret + version;

  return ajaxUrl;
};

function makeLocationsObject(data) {
  var locationsObject = {};

  var venueData = data;
  venueData.forEach( function(venue) {
    locationsObject[venue.name] = venue;
  });
  addMapsMarkers(locationsObject);
  console.log(locationsObject);
};

function closeVenues() {
  markerList().forEach(function(mrkr) {
    if (mrkr.animation != null) {
      mrkr.setAnimation(null);
      mrkr.infowindow.close(map, mrkr);
    }
  });
}

function addMapsMarkers(locationsObject) {

  for (var business in locationsObject){
    currLocation = locationsObject[business];
    var marker = new google.maps.Marker({
      position: {lat: currLocation.location.lat, lng: currLocation.location.lng},
      title: currLocation.name,
      animation: google.maps.Animation.DROP,
      map: null,
      keywords: currLocation.name,
      filter: function() {}
    });

    marker.infowindow = new google.maps.InfoWindow({
      content: '<section class="infoWindow">' +
                  '<header><h1>' +
                    marker.title +
                  '</h1></header>' +
                '</section>'
    }),

    marker.toggleBounce = function() {
      if (this.getAnimation() != null) {
        this.setAnimation(null);
      } else {
        this.setAnimation(google.maps.Animation.BOUNCE);
      }
    };

    google.maps.event.addListener(marker, 'click', function() {
      closeVenues();
      this.infowindow.open(map, this);
      this.toggleBounce();
    });

    markerList().push(marker);
  };
  return markerList();
};

var updateMarkers = function(filter) {
  var wantedVenue = [];

  markerList().forEach( function(marker) {
    if (marker.keywords.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
      wantedVenue.push(marker);
    }

      if (wantedVenue.indexOf(marker) != -1) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
  });

  return wantedVenue;
};
