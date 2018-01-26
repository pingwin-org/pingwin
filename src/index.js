'use strict';
const express = require('express');                                                            
const app = express();

app.get('/', function(req, res){                                                               
  res.sendFile('index.html', { root: __dirname + "/web" } );
});
   
app.use(express.static('src/web'));
    
app.listen(3000, function () {
  console.log('Listening on http://localhost:3000');
});

