var path = require('path');

module.exports = function router(app) {
	app.get('/',function (req,res) {
		res.sendFile(path.join(__dirname,'/public/index.html'));
	});
}