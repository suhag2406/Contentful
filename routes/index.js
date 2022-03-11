var express = require('express');
var router = express.Router();

var contentful = require('contentful');
const res = require('express/lib/response');

var client = contentful.createClient({
    space: 'v70n7ohznxv1',
    accessToken: 'ItuAdR5ym1LKoGNE-oLZyG1cUeL05adW9u3TgkzMdOI',
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// client1.getEntry('home').then(function (entry) {
//   // logs the entry metadata
//   console.log(entry.sys);
// console.log("abc");

//   // logs the field with ID title
//   // console.log(entry.fields.productName);
// });


// function one(req,res){
//   // var a = res.items[0].fields
//   console.log(res);
//   // res.render('index', { a: a })
// }


client
  .getEntries("home")
  .then((req,res)=> {
    // console.log(req.items[0].fields)
    var a = req.items
    console.log(typeof(a));
    let b = a.Arryfilter((items)=>{
      return items.fields
    })
    // console.log(b);
    // console.log(a);
  })
  .catch(err => console.log(err));

module.exports = router;
