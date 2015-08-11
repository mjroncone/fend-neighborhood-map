function mapMarkerViewModel() {
  var self = this;

  self.search = ko.observable('Coffee');




}

// Adds Knockout dependency tracking.
ko.applyBindings(new mapMarkerViewModel());
