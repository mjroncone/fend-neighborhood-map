# Front End Neighborhood Map (P5)

## Description:

  This app was build to satisfy the requirements of Udacity's Front-End Nanodegree program. You can find those requirements towards the end of this file.

  Thanks for checking out my neighborhood map! This app was designed to give anyone a little taste of what my old neighborhood was like by centering on my old Lincoln Park Chicago address and showing a sample of the nearby restaurants and coffee shops.

  This is accomplished with the help of the Google Maps API as well as the Four Square API.

  When you visit the page, the map is initiated and a request for venues fired off to Four Square. When those venues are returned, they are formatted as markers for the Maps API and pushed into an array. That array populates the list view, and categories as well as the venue's name are used as keywords/filters for the search bar.

  The app may not look pretty, but I was focused on function rather than form. Though not necessarily easy, form is the easier piece to figure out in my opinion.

  I may or may not come back and update the app, so if it no longer functions you may safely assume I have stopped updating it. Otherwise, enjoy!

## Instructions for operation:
  1. Either download this repository and open the index.html file in your browser, or alternatively check out my gh-pages version at: [http://mjroncone.github.io/fend-neighborhood-map](http://mjroncone.github.io/fend-neighborhood-map "Mike Roncone's Neighborhood Map").
  2. Once the page has loaded, you should notice a map of the Lincoln Park neighborhood located in Chicago IL. On that map their should be a number of red map markers with dots in the middle. If not, please refresh the page and try again. Any errors that would prevent you from seeing the markers should display on the page and tell you to refresh as well.
  3. Click around on the different markers to see what business is located in that spot.
  4. Up top on the left you will see a button that says "Open List". Click that to get a tiled list of all the venues currently represented on the map by markers. Clicking on a venue in this list will also activate its marker, so you can see where they are located.
  5. Finally, next to the list open/close button is a search bar. Type in anything you'd like into the search bar to see if any locations on the map can satisfy your desires. Currently, keywords are limited to venue names, as well as the small amount of keywords provided by Four Square. This may be expanded to include more keywords for businesses over time.
  6. When you've found a location you're interested in, open up the infowindow to either give them a call, or click on the link to check out the menu!
  7. Eat, drink, be.. amazed? You know, that kind of thing. Welcome to my neighborhood! Check it out if you're ever in the city.

### Project Requirements:
The requirements to meet the specifications of the project are as follows:
  * **Interface Design:**  All application components render on-screen in a responsive manner, usable across modern desktop, tablet, and phone browsers.
  * **App Functionality:** Each of the following application components function appropriately without error as described:
    * **Search Bar:** Filters both the locations in the list view and the markers on the map.
    * **List View:** Shows locations that have bee9n searched for, additionally clicking on a location activates its associated map marker.
    * **Map:** Shows each searched location as a marker. Each marker can be clicked on and shows unique information about a location in an infoWindow when clicked. Markers animate or otherwise visibly activate when clicked on.
  * **App Architecture:** Code is properly separated based upon Knockout's best practices (following an MVVM pattern, avoiding updating the DOm manually, using observables rather than forcing refreshes manually, etc). App has at least five locations in its model.
  * **Asynchronous Data Usage:** Application utilizes Google's map API and at least one additional third-party "data API". All data requests are retrieved in an asynchronous manner. Data requests that fail are handled using common fallback techniques (i.e. AJAX error or fail methods).
  * **Geospatial / Map Functionality:** A geospatial/map representation of identified locations is provided, runs error free and is presented in a usable and responsive manner. Markers are clickable, and change styling to indicate their selected state.
  * **Location Details Functionality:** Functionality providing additional data about a location is provided, runs without errors and is presented in a usable and responsive manner.
  * **Search Functionality:** A search function is provided, runs error free and is presented in a usable and responsive manner.
  * **List View Functionality:** A "list view" or some other variation of browsing the content (beyond search/map) is provided, runs error free and is presented in a usable and responsive manner.
  * **Code Quality:** Code is ready for personal review and neatly formatted.
  * **Comments:** Comments are present and effectively explain longer code procedures.
  * **Documentation:** A README file is included detailing all steps required to successfully run the application.

### Credits! :
  * Nick Salloum: http://callmenick.com/post/slide-and-push-menus-with-css3-transitions for help with sliding menu implementation.
  * Google Maps API documentation: https://developers.google.com/maps/documentation/javascript/
  * jQuery Documentation: http://api.jquery.com/
  * FourSquare & documentation: https://developer.foursquare.com/
  * Google Maps Error Handling: DaveS on Stack Overflow for the function inspiration. http://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
  * Mozilla Developer Network: https://developer.mozilla.org/en-US/

  **I'm still looking back over my code to find more places to attribute credit. There was a lot of Google-ing for ideas, but not much code taken from others. Still, I would like to credit anyone for inspiration in how I eventually handled certain problems. If you see something that looks familiar to you, let me know!**
