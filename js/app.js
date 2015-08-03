function initialize() {
  var mapOptions = {
    center: { lat: 41.926411, lng: -87.643326},
    zoom: 16
  };
  var map = new google.maps.Map(document.getElementById('map-area'),
      mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);
