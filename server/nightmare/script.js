var Nightmare = require('nightmare');

//var url = require('');
//var width = require('');
//var height = require('');


//var randomName = 

new Nightmare()
 //.viewport(900, 900)
 .goto('http://www.yahoo.com')
 .screenshot('./yahoo.png')
 .title(function(str) {
   console.log(str);
 })
 .run(function(err, nightmare) {
   console.log("DOne!!!")
 })