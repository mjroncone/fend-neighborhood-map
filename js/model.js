function MapMarkerViewModel() {
  var self = this;

  self.filter = ko.observable('');

  self.visibleMarkers = ko.observableArray([]);

  $.when($.getJSON(fourSquareAjaxConstructor(targetLoc.lat, targetLoc.lng), function( data ) {
    makeLocationsObject(data.response.venues)})).then( function() {

      self.visibleMarkers(updateMarkers(self.filter()));

    });

  self.update = ko.computed( function() {
      closeVenues();
      self.visibleMarkers(updateMarkers(self.filter()));
    });

  self.listClick = function() {
    closeVenues();
    this.infowindow.open(map, this);
    this.toggleBounce();
  };


  window.onload = startApp;

};

ko.applyBindings(new MapMarkerViewModel());
