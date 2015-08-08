var express = require('express');
var app = express();


app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public/'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    host = '0.0.0.0';
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

