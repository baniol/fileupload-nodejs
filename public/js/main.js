$(function () {
    'use strict';

    var fileList;


    $(document).on('click', '#files .preview', function (e) {
      var link = $(this).find('a')[0];
      var options = {index: link, event: e};
      var gallery = blueimp.Gallery(fileList, options);
    });

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        maxFileSize: 10000000, // 10M
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|mp3|wmv|mp4)$/i
    });

    // Enable iframe cross-domain access via redirect option:
    $('#fileupload').fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );

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
        result.files.map(function (el) {
          // @TODO move to backend
          var ext = el.name.split('.').pop();
          el.href = el.url;
          if (ext === 'mp4' || ext === 'mp3') {
            el.type = 'video/mp4';
            el.thumbnailUrl = '/img/multimedia.png';
          }
          return el;
        });
        fileList = result.files;
        $(this).fileupload('option', 'done')
            .call(this, $.Event('done'), {result: result});
    });

});
