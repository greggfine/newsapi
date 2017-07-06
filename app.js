var express = require('express'),
	app = express(),
	request = require('request');



app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));





app.get('/', function(req,res){
	res.redirect('/search');
})


app.get('/search', function(req,res){
	res.render('search');
})


app.get('/results', function(req,res){
	var search = req.query.search;
	request('https://newsapi.org/v1/articles?source=' + search + '&apiKey=512dc40db2ff4890bca99b3599312990', function(error, response,body){
		if(!error && response.statusCode == 200){;
			var parsedData = JSON.parse(body);
			res.render('results', {data: parsedData});
		}
	})
})










app.listen(app.get('port'), function(){
	console.log("Server is running!");
})