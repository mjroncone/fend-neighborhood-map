/* Declaring our map, markerList, and targetLoc up top makes them global variables
    so that they can be accessed directly from the ViewModel when invoking functions. */
var map;
var markerList = ko.observableArray([]);
var targetLoc = {lat: 41.926411, lng: -87.643326};

var mapsErrorChecker = function() {
  /* The below conditional is to check whether the Google Maps API has been loaded
      correctly or not. If not, it appends an error message to the page.
      Inspired by DaveS on Stack Overflow: http://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded */
  if (typeof google != 'object' || typeof google.maps != 'object')
    {
      $('#error-box').append('<div class="maps-error"><br><br><p><strong>Oh no! Either we\'re speaking gibberish, your internet is disconnected, or the Google Maps servers are down! Please check your internet connection and try again.  </strong></p><div>');
    }
};

/* The following startApp and initialize functions are from GoogleMaps' API documentation:
    https://developers.google.com/maps/documentation/javascript/tutorial */
/* startApp and initialize contain the scripts to actually make the API request,
    which is invoked later to load G.Maps asynchronously on window load. */
function startApp() {

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-9HlnwXsPlOG1m3D6UVLNrW3O5LU7CHA' +
                  '&callback=initialize';
  document.body.appendChild(script);
}

function initialize() {
  mapsErrorChecker();

  // Creates LatLng object to feed into G.Maps API for map center position
  var mapTarget = targetLoc;

  // Sets the mapOptions that will be served in the API request
  var mapOptions = {
   center : mapTarget,
   zoom : ($(window).width() <= 400 ? 15 : 16),
   disableDefaultUI: true
  };

  // Creates a new G.Maps object and fixed it to the element with id 'map-area'
  map = new google.maps.Map(document.getElementById('map-area'),
    mapOptions);
}

/* closeVenues closes any open Google Maps info windows and stops the marker's animation
    whenever invoked */
function closeVenues() {
  markerList().forEach(function(mrkr) {
    if (mrkr.animation !== null) {
      mrkr.setAnimation(null);
      mrkr.infowindow.close(map, mrkr);
    }
  });
}

/* fourSquareAjaxConstructor pieces together the Four Square API request URL and
    returns it to the invoking function. */
function fourSquareAjaxConstructor(lat, lng) {
  var fourSqBaseRequest = 'https://api.foursquare.com/v2/venues/search?intent=browse';
  var target = '&ll=' + lat + ',' + lng;
  var radius = '&radius=' + 800;
  var limit = '&limit=' + 100;
  var categoryIds = ['4bf58dd8d48988d1e0931735','4d4b7105d754a06374d81259'];
  var categories = '&categoryId=' + categoryIds.reduce(function(previousValue, currentValue){
      return previousValue + ',' + currentValue;});
  var client_id = '&client_id=' + 'E2KGUFUAJOBTFYJLJT1NT50XKR3IDGYMFMOLG2G3GNXXUHB5';
  var client_secret= '&client_secret=' + '5ABPBLHRJNIRA5ROV0OMTNQGL3A5YMPNUPMY0J4UYOZONN5V';
  var version = '&v=' + '20150101';

  var ajaxUrl = fourSqBaseRequest + target + radius + limit + categories + client_id + client_secret + version;

  return ajaxUrl;
}

/* makeLocationsObject takes in the object from the API request and extracts only
    the information we need, placing it into locationsObject and feeding that
    to the addMapsMarkers function. */

function makeLocationsObject(data) {
  var locationsObject = {};

  var venueData = data;
  venueData.forEach( function(venue) {
    locationsObject[venue.name] = venue;
  });
  addMapsMarkers(locationsObject);
}

/* addMapsMarkers takes our locationsObject and creates Google Maps-readable marker
    objects. It reads the relevant details from each location, constructs an infowindow
    that can be added to the DOM on command, adds an event listener to each marker,
    and packages all these markers up into a list which is returned to the invoking function. */

function addMapsMarkers(locationsObject) {
  mapsErrorChecker();
  // If present, loops over the locations' object data and creates a new G.Maps marker for each
  if (!$.isEmptyObject(locationsObject)) {
    for (var business in locationsObject){
      if (locationsObject[business].name.length > 1){
        // Similar to declaring self = this, helps with loop readability.
        var currLocation = locationsObject[business];
        var currLocInfo = currLocation.location;
        var currCategories = currLocation.categories[0];
        // Marker construction starts here and goes until pushed onto the markerList
        var marker = new google.maps.Marker({

          title: currLocation.name,
          phone: (currLocation.contact.formattedPhone === undefined ? 'Sorry, no phone number available.' : currLocation.contact.formattedPhone),
          address: currLocInfo.address + ', ' + currLocInfo.city + ' ' + currLocInfo.state,
          position: {lat: currLocInfo.lat, lng: currLocInfo.lng},
          menu: currLocation.hasMenu === true ? currLocation.menu.url : false,
          category: 'Category: ' + currCategories.shortName,
          keywords: currLocation.name + ' ' + currCategories.name + ' ' + currCategories.pluralName + ' ' + currCategories.shortName,
          filter: function() {},
          animation: google.maps.Animation.DROP,
          map: null
        });

        /* Contains the DOM construction of our infoWindows with data from each object.
            content is also used through ko bindings for the list view*/
        marker.infowindow = new google.maps.InfoWindow({
          content: '<article class="infoWindow">' +
                      '<h1 class="location-title">' +
                        marker.title +
                      '</h1>' +
                      '<p>'+
                        marker.phone + '<br>' +
                        marker.address + '<br> ' +
                        marker.category + '<br> ' +
                        (marker.menu === false ? "Sorry, no menu available." : '<a href="' + marker.menu + '"target="blank" data-bind="click: openLink">Click to view the menu!</a>') +
                      '</p>'+

                    '</article>'
        }),

        // Starts or stops the bounce animation if a marker is clicked once or twice, respectively.
        marker.toggleBounce = function() {
          if (this.getAnimation() !== null) {
            this.setAnimation(null);
          } else {
            this.setAnimation(google.maps.Animation.BOUNCE);
          }
        };

        // Closes any previously clicked markers and initiates the newly clicked marker.
        google.maps.event.addListener(marker, 'click', function() {
          closeVenues();
          this.infowindow.open(map, this);
          this.toggleBounce();
        });

        // Each marker object is pushed onto our global array markerList for easy access anywhere.
        markerList().push(marker);
      }
    }
  }
}

/* updateMarkers determines which venues should be displayed based on the current filter,
    sets their map, and returns them as an array to the invoking ViewModel for listView. */
var updateMarkers = function(filter) {
  // Resets the markers to none and will be returned to the ViewModel in order to use ko bindings for a listView
  var wantedVenue = [];

  /* Checks each venue in the markerList to see if the current filter exists in their keywords.
      If so, it pushes that to the wantedVenue array. */
  markerList().forEach( function(marker) {
    if (marker.keywords.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
      wantedVenue.push(marker);
    }
      /* All the present markers in the wantedVenue array will then have their maps set,
          and those not present will be turned off.*/
      if (wantedVenue.indexOf(marker) != -1) {
        if (marker.setMap() != map) { marker.setMap(map); }
      } else {
        marker.setMap(null);
      }
  });

  // Returns the displayed venues to the ViewModel for use in the listView.
  return wantedVenue;
};

// toggleSlide contains the javascript to animate the entrance and exit of the listView.
function toggleSlide() {

  /* jQuery's .toggleClass() function determines whether the slide is being activated
    or deactivated automatically. */
  $('#location-list').toggleClass('has-active');

  // This conditional flips the button text from "Open" to "Close".
  if ($('#location-list').hasClass('has-active')){
    document.getElementById("locations-button").innerHTML = "Close List";
  } else {
    document.getElementById("locations-button").innerHTML = "Open List";
  }
}

// If the toggle list button is clicked, run the toggleSlide() function
document.getElementById("locations-button").addEventListener("click", toggleSlide);
