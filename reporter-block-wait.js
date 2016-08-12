// reporter-block-wait.js
// An example ScratchX extension demonstrating synchronous reporter block functionality
// Based off the ScratchX documentation: https://github.com/LLK/scratchx/wiki

(function(ext) {
    // API Key for Google Maps Elevation API - https://developers.google.com/maps/documentation/geocoding/start#get-a-key
    apiKey = "AIzaSyBEvrUM6Tj2kK70aVWC_qntJa8WecBcIqQ";
  
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
    // Function called for "elevation at %s" block
    // The first argument is the string entered in the block's input field
    // The last argument is the callback to be called once the wait is over
    ext.elevation_at = function(address, callback) {
      // Make an AJAX call to the Google Maps Geocoding API to get LAT/LONG - https://developers.google.com/maps/documentation/geocoding/start
      $.ajax({
            url: " https://maps.googleapis.com/maps/api/geocode/json?address=" + address.replace(" ", "+") + "&key=" + apiKey,
            dataType: 'json',
            success: function( lat_long_data ) {
              // Parse data for lat/long
              var lat = lat_long_data["results"][0]["geometry"]["location"]["lat"];
              var lng = lat_long_data["results"][0]["geometry"]["location"]["lng"];
            
              // call a helper method to get the elevation and send it to the callback (we pass the function through)
              get_elevation(lat, lng, callback);
            }
      });
    }
    
    // Function called for "elevation here" block
    // The last argument is the callback to be called once the wait is over
    ext.elevation_here = function(callback) {
      // get user location (adapted from http://www.w3schools.com/html/html5_geolocation.asp)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          // call a helper method to get the elevation using this users' location, and send it to the callback
          get_elevation(position.coords.latitude, position.coords.longitude, callback);
        });
      } else {
        alert("Getting your location is not supported or was disabled... remove the 'elevation here' block");
      }
    }
    
    // Function called for "elevation here" block
    // The last argument is the callback to be called once the wait is over
    ext.elevation_at_lat_lng = function(lat, lng, callback) {
      get_elevation(lat, lng, callback);
    }
    
    // Helper function to get elevation from lat/long
    // Elevation is returned by being passed as an argument to the given callback function (this is how ScratchX does it)
    get_elevation = function(lat, lng, callback) {
      // Make a call to the Google Maps Elevation API - https://developers.google.com/maps/documentation/elevation/start
      $.ajax({
            url: "https://maps.googleapis.com/maps/api/elevation/json?locations=" + lat + "," + lng + "&key=" + apiKey,
            dataType: 'json',
            success: function( elevation_data ) {
                // After getting the data, parse and return it
                var elevation = elevation_data["results"][0]["elevation"];
                callback(elevation);
            }
      });
    }
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name, default parameter
          // The "%s" represents a string input field in the block
          // The fourth argument in this array is the default value in that input field
          ["R", "elevation here", "elevation_here"],
          ["R", "elevation at %s", "elevation_at", "Boston, MA"],
          ["R", "elevation at %n , %n", "elevation_at_lat_lng", "42.3600825", "-71.0588801"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Wait for Confirm', descriptor, ext);
})({});
