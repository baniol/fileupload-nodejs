# jQuery fileupload with Node.js

This is an example of node.js implementation of the [fileupload jquery plugin](http://blueimp.github.io/jQuery-File-Upload/) using [jquery fileupload middleware](https://github.com/aguidrevitch/jquery-file-upload-middleware).


### Notes

* Your server has to have ImageMagick installed.
* If imagemagic is not returning, place callback in uploadhandler.js in line 126. 

  For me (CentOS 5.10) it was: `{ [Error: Command failed: convert: unrecognized image filter 'Lagrange'.] timedOut: false, killed: false, code: 1, signal: null }.`

  Adding `filter: false` option fixed the issue.

* If you are going to use Nginx for reverse proxy, don't forget to set `client_max_body_size 10M`, otherwise you'll get `Request Entity Too Large error`.