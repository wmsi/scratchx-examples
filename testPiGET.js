// reporter-block.js
// An example ScratchX extension demonstrating returning reporter block functionality
// Based off the ScratchX documentation: https://github.com/LLK/scratchx/wiki

(function(ext) {
    
    var issData = null;
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
    function updateISSLocation() {
    $.ajax({
      type: "GET",
      dataType: "text",
      //url:
      url: "http://192.168.2.239:5000",
      success: function(data) {
        issData = data;
        console.log("Got it");
      },
      error: function(jqxhr, textStatus, error) {
        console.log("Error downloading temp data");
      }
    });
  }
    
    
    // Function called for "title case of" block
    // The first argument is the string entered in the block's input field
    ext.title_case = function(text) {
      result = "";
      result = issData
      console.log('Temp Request Sent.');  
      // remove trailing space
      return result;
    }
    
    ext._shutdown = function() {
        if (poller) {
         clearInterval(poller);
         poller = null;
    }
  };
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name, default parameter
          // The "%s" represents a string input field in the block
          // The fourth argument in this array is the default value in that input field
          ["r", "title case of %s", "title_case", "helloThere"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Title Case', descriptor, ext);
    
  updateISSLocation();
  var poller = setInterval(updateISSLocation, 2000);
    
})({});
