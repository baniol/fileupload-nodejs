$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        maxFileSize: 10000000, // 10M
        //acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp3|wmv|mp4)$/i
    });


    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: '/upload/settings',
        dataType: 'json',
    }).done(function (result) {
      //var match = url.match(new RegExp(result.acceptFileTypes.regex, 'i'));
      var regexp = new RegExp(result.acceptFileTypes, 'i');
      console.log(regexp);
      //match = regexp.exec(url);
      $('#fileupload').fileupload(
          'option',
          'maxFileSize',
          result.maxFileSize
      );
      $('#fileupload').fileupload(
          'option',
          'acceptFileTypes',
          regexp
      );
    });



    // Enable iframe cross-domain access via redirect option:
    //$('#fileupload').fileupload(
        //'option',
        //'redirect',
        //window.location.href.replace(
            ///\/[^\/]*$/,
            //'/cors/result.html?%s'
        //)
    //);

    // Load existing files:
    $('#fileupload').addClass('fileupload-processing');
    $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: '/upload/location',
        dataType: 'json',
        context: $('#fileupload')[0]
    }).always(function () {
        $(this).removeClass('fileupload-processing');
    }).done(function (result) {
        //console.log(result);
        result.files.map(function (el) {
          //@TODO move to backend
          var ext = el.name.split('.').pop();
          el.href = el.url;
          if (ext === 'mp4') {
            el.type = 'video';
            //el.thumbnailUrl = '/img/multimedia.png';
          }
          else if (ext === 'mp3') {
            el.type = 'audio';
          }
          return el;
        });
        //console.log(result);
        //fileList = result.files;
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });

});
