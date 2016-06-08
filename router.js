var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var mkdirp = require('mkdirp');

module.exports = function router(app) {
	app.get('/',function (req,res) {
		res.sendFile(path.join(__dirname,'/public/index.html'));
	});
	app.post('/upload',function(req,res){
		mkdirp(path.join(__dirname,'/public/uploads'), function(err) { 
		    // path exists unless there was an error
		    var form = new formidable.IncomingForm();
		    var result = [];
		    form.multiple = true;
		    if(err) throw err;
		    form.uploadDir = path.join(__dirname,'/public/uploads');

		    form.on('file',function(field,file){
		    	console.log(file);
		    	fs.rename(file.path,path.join(form.uploadDir,file.name));
		    	result.push({
		    		filename: file.name,
		    		filesize: file.size,
		    		filesizeInMB: [Math.round((file.size/(1024*1024))*100)/100]+'MB',
		    		filetype: file.type,
		    		url: req.protocol + '://' + req.get('Host') + '/uploads/'+file.name
		    	});
		    	
		    });
		    
		    form.on('error', function(err) {
		        console.log('An error has occured: \n' + err);
		    });

		    form.on('end',function(){
		    	res.send(result);
		    });
		    form.parse(req);
		});
	});
}