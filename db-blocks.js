(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    var formdata;
    var request;
    var DEFAULT_URL = 'https://wmsinh.org/scratchx';
    var data_set = 

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.append_formdata = function(element_name, element_value) {
        if(!formdata) {
            alert('You must open a request before you can add elements');
            return;
        }
        formdata.append(element_name, element_value);
        console.log('Element ' + element_name + ' has been added with the value ' + element_value);
    };
    
    ext.open_request = function(method, link) {
        request = new XMLHttpRequest();
        console.log('XMLHttpRequest created!')
        formdata = new FormData();
        console.log('FormData created!');
        request.open(method, link);
        console.log('Request opened with method ' + method + ' and with the link ' + link);
    }
    
    ext.send_request = function() {
        if(!request) {
            alert('You must open a request before you can send it');
            return;
        }
        request.send(formdata);
        console.log('Sent FormData: ' + formdata);
        formdata = null;
        request = null;
    }
    
    ext.add_request_header = function(header_name, header_value) {
        if(!request) {
            alert('You must open a request before you can add headers to it');
            return;
        }
        request.setRequestHeader(header_name, header_value)
        console.log('Added request header with a name of ' + header_name + ' and a value of ' + header_value)
    }

    ext.post_data = function(project_id, data_type, value) {
        console.log('new data post');   
        this.open_request('POST', DEFAULT_URL);
        request.setRequestHeader('Origin', 'scratchx')
        this.append_formdata('project_id', String(project_id));
        this.append_formdata('data_type', String(data_type));
        this.append_formdata('value', String(value));
        this.send_request();
    }

    ext.pull_data = function(project_id, data_type) {
        console.log('new data pull')
        var query_string = DEFAULT_URL + '?project_id=' + project_id + '&data_type=' + data_type;
        var response_string;
        // ajax for response
        $.ajax({
            url: "https://wmsi.github.io/scratchx-examples/reporter-block-wait.js",
            dataType: 'jsonp',
            success: function( data_set ) {
                response_string = JSON.stringify(data_set);
                callback(repsonse_string);
            }
        });

        // get_data(query_string, callback);
        if (!window.localStorage) {
            alert ('LocalStorage not supported by your browser!');
            return;
        }
        return localStorage.setItem(dataset, response_string)
    }

    get_data = function(query_string,callback) {

        // ajax for response
        $.ajax({
            url: "https://wmsi.github.io/scratchx-examples/reporter-block-wait.js",
            dataType: 'jsonp',
            success: function( data_set ) {
                response_string = JSON.stringify(data_set)
            }
        });
    })  

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'add element %s %s', 'append_formdata', 'element name', 'element value'],
            [' ', 'open request %m.method %s', 'open_request', 'POST', DEFAULT_URL],
            [' ', 'send request', 'send_request'],
            [' ', 'post data to project %n with data_type %s and value %n', 'post_data', '0', 'tempC', '25'],
            ['R', 'pull data from project %n with data_type %s', 'pull_data', '0', 'tempC', 'data']
            // [' ', 'add request header (beta) %s %s', 'add_request_header', 'header name', 'header value']
        ],
        menus:{
            method: ['POST', 'GET']
        }
    };

    // Register the extension
    ScratchExtensions.register('WMSI Database', descriptor, ext);
})({});