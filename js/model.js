function mapMarkerViewModel() {
  var self = this;

  self.search = ko.observable('');

  self.locations = ko.observable([
    {
      position: {lat: 41.928640 , lng: -87.642064},
      title: "Starbucks",
    }
  ]);




}

// Adds Knockout dependency tracking.
ko.applyBindings(new mapMarkerViewModel());
