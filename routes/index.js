var express = require('express');
var router = express.Router();
var marked = require('marked')

router.use(express.json())

var contentful = require('contentful');
const { log } = require('debug/src/browser');
const { json } = require('express/lib/response');
const Logger = require('nodemon/lib/utils/log');

var client = contentful.createClient({
  space: 'v70n7ohznxv1',
  accessToken: 'ItuAdR5ym1LKoGNE-oLZyG1cUeL05adW9u3TgkzMdOI'
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('')
  res.render('index', { title: 'Express' });
});

router.get('/list', async function (req, res, next) {
  client
    .getEntries({ content_type: 'blogPost' })
    .then((entries) => {
      let listBlog = entries.items.map((blog) => {

        return { id: blog.sys.id, title: blog.fields.title }
      })
      console.log(listBlog)
      res.render('try1', { listBlog, blog: entries.items[0].fields })
    })
    .catch(err => console.log(err))
})

router.get('/blog', function (req, res, next) {
  let blogNumber = req.query.name
  client.getEntry(blogNumber)
    .then((entry) => {
      console.log(entry.fields);
      res.render('try2', { title: entry.fields.title, blog: entry.fields.body })
    })
    .catch(err => console.log(err))
})

router.post('/getblog', function (req, res, next) {
  let searchBlog = req.body.name
  console.log(searchBlog)
  client
    .getEntries({
      'fields.title': searchBlog,
      content_type: 'blogPost',
    })
    .then((entries) => {
      console.log(entries.items[0].fields)
      res.render('try1', { blog: entries.items[0].fields })
    }).catch(err => console.log(err))

})

router.get('/filter', function (req, res, next) {


  let page = parseInt(req.query.page);
  let action = req.query.action;
  
  let limit = 2;
  let skipNmber = 0
  console.log(page, action);

  if (isNaN(page)) {
    page = 1

  }
  else if(action==="nex"){
    page = page + 1;
    skipNmber = (page - 1) * limit;
    console.log("action is "+ action);
  }else if(action==="pre"){
    page = page - 1;
    skipNmber = (page - 1) * limit;
  }


  console.log("value of skip  is " + skipNmber);

  client.getEntries({ //contant type add
    skip: skipNmber,
    limit: 2
  })
    .then(((entries) => {
      let bolgresult = entries.items.map((blog) => {

        return { id: blog.sys.id, title: blog.fields.title, blog: blog.fields.body }
      })
      // console.log(batchBlog)
      res.render('try3', { bolgresult, page })
    }))
    .catch(console.error)
})



router.get("/blogs", (req, res) => {
  // res.json(res.paginatedResults);




  client.getEntries({ content_type: 'blogPost' })
    .then((entries) => {

      let page = parseInt(req.query.page);
      if (isNaN(page)) {
        page = 2
      }
      const limit = parseInt(req.query.limit);
      console.log(page, limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      console.log(startIndex, endIndex);


      var listBlog = entries.items.map((blog) => {
        return { id: blog.sys.id, title: blog.fields.title, blog: blog.fields.body }
      })
      console.log(listBlog.length);

      const results = {};
      let bolgresult = {}
      if (endIndex < listBlog.length) {
        results.next = {
          page: page + 1,
          limit: limit
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit
        };
      }
      bolgresult = listBlog.slice(startIndex, endIndex);
      results.results = listBlog.slice(startIndex, endIndex);
      res.render('try3', { bolgresult, results })
    }).catch((error) => { console.log(error) })
})




router.get('/search', function (req, res, next) {
  client
    .getEntries({
      content_type: 'blogPost',
      'fields.body[in]': 'First ,Secound',
    })
    .then((entries) => {
      console.log(entries.items)
    }).catch(err => console.log(err))

})
module.exports = router;
