// console.log("hello wolves  ...also, world");

var domready = require('domready'); // same as document.ready(function(){})
var MainView = require('./views/main');
var Router = require('./router');
var Howls = require('./models/howls');
var Me = require('./models/me');

window.app = {
	init: function(){
	//	console.log("in init");
		var self = this;
		this.router = new Router();

		this.howls = new Howls();
		this.me = window.me = new Me(); // this.me = new Me();


		// this.howl.fetch();
	// 	console.log(document.body);  // Will not register without document will not be ready
		domready(function(){
			console.log("this is here");
			self.view = new MainView({
				el: document.body // DOM element to set at root
			});
			self.router.history.start({
				pushState: true // not uses hash changes but use a unique router
			})

		});
	
	}
};

window.app.init();  // entrypoint
