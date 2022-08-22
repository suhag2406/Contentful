var express = require('express');
var router = express.Router();

var contentful = require('contentful');

var client = contentful.createClient({
  space: 'v70n7ohznxv1',
  accessToken: 'ItuAdR5ym1LKoGNE-oLZyG1cUeL05adW9u3TgkzMdOI'
});

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

router.get('/First',function(req,res,next){
    client
    .getEntry('2rkMyoY7pRTKLJQXXlqbAM')
    .then(entry=>res.render('blog',{blog : entry.fields}))
    .catch(err => console.log(err))
})

router.get('/Third',function(req,res,next){
    client
    .getEntry('6Cgt4sZEGcVg9NihXa5rjt')
    .then(entry=>res.render('blog',{blog : entry.fields}))
    .catch(err => console.log(err))
})

router.get('/Second',function(req,res,next){
    client
    .getEntry('7hLcC73bPQXHDTQu0TQttP')
    .then(entry=>res.render('blog',{blog : entry.fields}))
    .catch(err => console.log(err))
})

router.get('/Fourth',function(req,res,next){
  client
  .getEntry('24GqunQRAgD1MrJYVS0cpP')
  .then(entry=>res.render('blog',{blog : entry.fields}))
  .catch(err => console.log(err))
})

router.get('/list', async function (req, res, next) {
    client
    .getEntries({content_type: 'blogPost'})
    .then((entries)=>{
      let a=entries.items.map((blog)=>{
        return blog.fields.title;
      })
      res.render('try1',{outPut : a , blog : entries.items[0].fields })
    })
    .catch(err => console.log(err))
  })



module.exports = router;