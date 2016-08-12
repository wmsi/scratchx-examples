// helloworld.js
// An example ScratchX extension demonstrating basic command block functionality
// Based off the ScratchX documentation: https://github.com/LLK/scratchx/wiki

(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
  
    // Function called for Hello World block
    ext.hello_world = function() {
      alert("Hello, world!");
    }
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
          // Block type, block name, function name
          [" ", "Hello world", "hello_world"],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Hello World', descriptor, ext);
})({});
