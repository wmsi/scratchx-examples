// command-block-wait.js
// An example ScratchX extension demonstrating synchronous command block functionality
// Based off the ScratchX documentation: https://github.com/LLK/scratchx/wiki

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
    // Function called for Wait for confirmation block
    // The first argument is the string entered in the block's input field
    // The last argument, used in waiting blocks, is a function that is called to signal the 
    // end of the wait.
    ext.wait_for_confirm = function(message, callback) {
      confirm(message);
      callback();
    }
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name, default parameter
          // The "%s" represents a string input field in the block
          // The fourth argument in this array is the default value in that input field
          ["w", "Wait for confirmation %s", "wait_for_confirm", "Continue?"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Wait for Confirm', descriptor, ext);
})({});
