var Hapi = require('hapi');  // Server used by Walmart during Black Friday		
var server = Hapi.createServer(3000, 'localhost');
var moonboots = require('moonboots_hapi'); // manage assets for client-side app
var templatizer = require('templatizer');  // templating engine - written in jade  ; precompiles jade templates


server.pack.register({
	plugin:moonboots,
	options:{
		appPath: '/{p*}',  // server always responds with the same code - code means everything
		moonboots: {
			main: __dirname + '/client/app.js', // main entrypoint  __dirname = node way of identifying current directory
			developmentMode: true, // set to false to force minify, etc ; true doesn't cache = view source and see 'nonCache'
			stylesheets: [
				__dirname + '/styles/bootstrap.css'
			],
			beforeBuildJS: function () { // if you give this function a callback it will not fire this asynchronously until callback is referenced
				templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
			}
		}
	}
}, 
function() {
	server.start();
	console.log('server running here...');
});
