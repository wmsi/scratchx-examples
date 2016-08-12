// hat-block.js
// An example ScratchX extension demonstrating hat block functionality
// Based off the ScratchX documentation: https://github.com/LLK/scratchx/wiki

(function(ext) {
    // Interval ID for every_interval block
    intervalID = null;
    
    // Variable to set true once hat should activate
    activateHat = false;
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
    // Function called for the "every n secs do" block
    // The first argument is the number entered in the block's input field
    ext.every_interval = function() {
      // Run the hat block if we've hit an interval
      if (activateHat) {
        activateHat = false;
        return true;
      } else {
        return false;
      }
    }
    
    // Function called for the "start repeating" block
    ext.stop_interval = function() {
      clearInterval(intervalID);
    }
    
    // Function called for the "stop repeating" block
    ext.start_interval = function(interval) {
        clearInterval(intervalID);
        intervalID = setInterval(function() {
          activateHat = true;
        }, interval*1000);
        console.log("started");
    }
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, [default parameter]
            ["h", "On repeat", "every_interval"],
            // The "%n" represents a number input field in the block
            // The fourth argument in this array is the default value in that input field
            [" ", "start repeating every %n secs", "start_interval", "5"],
            [" ", "stop repeating", "stop_interval"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Interval Blocks', descriptor, ext);
})({});
