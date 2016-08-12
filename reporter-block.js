// reporter-block.js
// An example ScratchX extension demonstrating returning reporter block functionality
// Based off the ScratchX documentation: https://github.com/LLK/scratchx/wiki

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
    // Function called for "title case of" block
    // The first argument is the string entered in the block's input field
    ext.title_case = function(text) {
      words = text.split(" ");
      result = "";
      for (var i in words) {
        result += words[i].charAt(0).toUpperCase() + words[i].slice(1) + " ";
      }
      // remove trailing space
      return result.trim();
    }
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name, default parameter
          // The "%s" represents a string input field in the block
          // The fourth argument in this array is the default value in that input field
          ["w", "title case of %s", "title_case", "hello, world"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Wait for Confirm', descriptor, ext);
})({});
