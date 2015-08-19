function MapMarkerViewModel() {
  var self = this;

  // Our data-bound filter which will be fed intto a function in order to determine which markers are displayed.
  self.filter = ko.observable('');

  /* An observable array that only ever contains displayed markers so that
      our knockout bindings update the DOM whenever markers are added/removed. */
  self.visibleMarkers = ko.observableArray([]);

  /* Deferred jQuery JSON request which, after receiving a response from the server and
      executing a callback to make the markerList, updates the value of our observable array
      by invoking the updateMarkers function with the current filter argument. */
  $.when(
    $.getJSON( fourSquareAjaxConstructor(targetLoc.lat, targetLoc.lng), function( data ) {
          makeLocationsObject(data.response.venues) }
    ))
    .then( function() {
      self.visibleMarkers(updateMarkers(self.filter()))
    });

  /* self.update is a ko.computed because every time the filter updates, the value of
      updateMarkers must be called again utilizing the new filter, which will alter
      the displayed markers and thus the value of visibleMarkers. */
  ko.computed( function() {
      closeVenues();
      self.visibleMarkers(updateMarkers(self.filter()));
    });

  self.listClick = function() {
    closeVenues();
    // TODO: should clicking a list item open the infowindow also? They display same info.
    this.infowindow.open(map, this);
    this.toggleBounce();
  };


  window.onload = startApp;

};

ko.applyBindings(new MapMarkerViewModel());
