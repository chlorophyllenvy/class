var View = require('ampersand-view');
var PageSwitcher = require('ampersand-view-switcher');
var templates = require('../templates');


module.exports = View.extend({
	template: templates.body,  // can be a string of HTML, a function that calls HTML,  or a function that returns an instantiated DOM element
	autoRender: true,
	events: {
		'click a[href]' : 'handleLinkClick'
	},
	initialize: function() {
		this.listenTo(app.router, 'page', this.handleNewPage);
	},
	render: function() {
		this.renderWithTemplate(this);
		this.pages = new PageSwitcher(this.queryByHook('page-container'));
	},
	handleNewPage: function(page) {
		this.pages.set(page);
	},
	handleLinkClick: function(e) {
		// debugger;
		var aTag = e.target;
		var isLocal = aTag.host === window.location.host;
		if(isLocal && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
			// debugger;
			// console.log(aTag.pathname);
			e.preventDefault();
			app.router.history.navigate(aTag.pathname, {trigger:true});
		}
	}
});