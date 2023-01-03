const express = require('express');
const router = express.Router();

const cheerio = require('cheerio');

/* GET users listing. */
router.post('/', function(req, res, next) {
  const getChilds = (childs) => {
    const data = [];
    childs.each((indx, el) => {
      const element = $(el).attr();
      const textContent = $(el).text().trim();
      if (textContent.length)
        element.text = $(el).text();
      const children = $(el).children();
      if (children.length)
        element.children = getChilds(children);
      if ( !element.id ) {
        element.id = `${el.name}-${indx}`
      }
      data.push(element);
    })
    return data;
  }
  //const jsonData = {name: "Mustafa YAKUT"}
  const $ = cheerio.load(`<div id="wrapper">${req.body.htmldata}</div>`)
  const children = $('#wrapper').children();
  const jsonData = getChilds(children);
  res.render('index', { title: 'HTML TO JSON', output: JSON.stringify(jsonData, null, 4), htmlData: req.body.htmldata });
});

module.exports = router;
