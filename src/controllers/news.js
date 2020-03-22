module.exports.index = function(application, req, res) {
  var newsModel = new application.src.models.news();
  var questionsModel = new application.src.models.questions();

  questionsModel.getQuestions(function(err, result) {
    res.render("questions/index", {news : result});
  });
}

