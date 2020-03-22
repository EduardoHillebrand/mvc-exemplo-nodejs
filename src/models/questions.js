const QDir = "./data/questions/";
var fs = require('fs');


function questions() {}

questions.prototype.getQuestions = function(callback) {
  fs.readFile('./data/main.json', 'utf8', function(err, result) {
    var data = [];

    if (!err) {
      var list = JSON.parse(result);
      readBulk(list,function (err,data) {
        callback(err, data);
      })    
    }
    else
      callback(err, data);

  });
};

function readBulk(list,callback) {
    
    var promisses = groupPromisses(list);


    Promise.all(promisses).then(result => {
        
        callback(false, result);
        // do more stuff
    }).catch(erro => { 
      callback(erro.message, []);
    });;
};



function groupPromisses(list) {
  var promisses = [];
  for (var i = 0; i < list.length; i++) {
    promisses.push(readFromFile(QDir+list[i]));
  }
  return promisses;
}

function readFromFile(file) {
    return new Promise((resolve, reject) => {
      
        fs.readFile(file, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
              try{
                resolve(JSON.parse(data));
              }catch(e){
                reject(e);
              }
            }
        });
    });
}



module.exports = function(){
  return questions;
}