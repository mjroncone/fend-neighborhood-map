function mapMarkerViewModel() {
  var self = this;

  self.search = ko.observable('');




}

// Adds Knockout dependency tracking.
ko.applyBindings(new mapMarkerViewModel());
