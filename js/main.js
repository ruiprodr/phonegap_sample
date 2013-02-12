var app = {
	renderHomeView: function() {
		$('body').html(this.homeTpl());
		$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

	showAlert: function (message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	},

	findByName: function() {
		var self = this;
		this.store.findByName($('.search-key').val(), function(employees) {
			$('.employee-list').html(self.employeeLiTpl(employees));
		});
	},
    
	initialize: function() {
	    var self = this;
	    this.store = new MemoryStore(function() {
	        $('body').html(new HomeView(self.store).render().el);
	    });
	}

};

app.initialize();