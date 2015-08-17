function MapMarkerViewModel() {
  var self = this;

  self.filter = ko.observable('');

  self.update = ko.computed( function() {
    return updateMarkers(self.filter());
  }, self)


};

ko.applyBindings(new MapMarkerViewModel());
