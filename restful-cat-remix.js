(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    var formdata = new FormData();
    console.log('FormData created!');
    var request = new XMLHttpRequest();
    console.log('XMLHttpRequest created!')

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.append_formdata = function(element_name, element_value) {
        // Code that gets executed when the block is run
        formdata.append(element_name, element_value);
        console.log('Element ' + element_name + ' has been added with the value ' + element_value);
    };
    
    ext.open_request = function(method, link) {
        request.open(method, link);
        console.log('Request opened with method ' + method + ' and with the link ' + link);
    }
    
    ext.send_request = function() {
        request.send(formdata);
        console.log('Sent FormData: ' + formdata);
    }
    
    ext.add_request_header = function(header_name, header_value) {
        request.setRequestHeader(header_name, header_value)
        console.log('Added request header with a name of ' + header_name + ' and a value of ' + header_value)
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'add element %s %s', 'append_formdata', 'element name', 'element value'],
            [' ', 'open request %s %s', 'open_request', 'method', 'link'],
            [' ', 'send request', 'send_request'],
            [' ', 'add request header (beta) %s %s', 'add_request_header', 'header name', 'header value']
        ]
    };

    // Register the extension
    ScratchExtensions.register('RESTful Cat', descriptor, ext);
})({});