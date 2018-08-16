const osmosis = require('osmosis');
const fs = require('fs')
let sleep = require('sleep')
let list = []
let max = 330
ex(1)
function ex(i) {
  if (i > max) return
  osmosis
    .get('https://stackoverflow.com/unanswered/tagged/express?page=' + i + '&tab=votes&pagesize=50')
    //.paginate('.pager fl  a[href]', 5)    
    .find('.question-summary')
    .set({
      'Q': '.summary h3 a',
      'L': '.summary .excerpt',
      'P': '.summary h3 a@href',
    })
    .data(function (data) {
      //console.log(data);
      list.push(data)
    })
    //.delay(1000)
    //.log(console.log)
    .done(function () {
      fs.appendFile('data1.json', JSON.stringify(list, null, 4), function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log('Data Saved to data.json file');
          console.log('>>>', i)
          ex(++i)
        }
      })
    });
}
