// Tabbing jQuery plugin v1.0

(function($){

	$.fn.tabs = function(config)
	{
		// config - default settings
		var settings = {
                              'tabNav': '.tabNav ul',
                              'tabContent': '.tabContent',
                              'startTab' : 1,
                              'activeClass' : 'active',
                              'fadeIn' : false,
                              'fadeSpeed' : 300                              
					 };

		// if settings have been defined then overwrite the default ones
          // comments:        true value makes the merge recursive. that is - 'deep' copy
		//				{} creates an empty object so that the second object doesn't overwrite the first object
		//				this emtpy takes object1, extends2 onto object1 and writes both to the empty object
		//				the new empty object is now stored in the var opts.
		var opts = $.extend(true, {}, settings, config);
		
		// iterate over each object that calls the plugin and do stuff
		this.each(function(){
			// do pluging stuff here
			// each box calling the plugin now has the variable name: myBox
			var tabs = $(this);
				tabs.nav = $(opts.tabNav);
				tabs.content = $(opts.tabContent);
				tabs.tabLength = tabs.content.children().length;
				tabs.index = opts.startTab;
			
			$.fn.tabs.init(tabs, opts);
			
			// do the main navigation here
			tabs.nav.children().click(function(){
				// get the index
				var thisIndex = $(this).parent().children().index(this);
				// remove active class then add it to current item
				tabs.nav.children().removeClass(opts.activeClass);
				$(this).addClass(opts.activeClass);
				// hide tab
				tabs.content.children().css("display","none");
				// if fade effect then fade it, else just display block
				if (opts.fadeIn)
				{
					tabs.content.children(":eq("+thisIndex+")").fadeIn(opts.fadeSpeed);
				}
				else
				{
					tabs.content.children(":eq("+thisIndex+")").css("display","block");
				}				
				return false;
			});			

			// end of plugin stuff
		});

		// return jQuery object
		return this;
	};

	// plugin functions go here - example of two different ways to call a function, and also two ways of using the namespace
	// note: $.fn.testPlugin.styleBox allows for this function to be extended beyond the scope of the plugin and used elsewhere, 
	// that is why it is a superior namespace. Also: anonymous function calling I think is probably better naming practise too.

	$.fn.tabs.init = function(tabs, opts)
	{
		// show the startTab.
		if (opts.startTab > tabs.tabLength)
		{
			// show the first tab
			tabs.index = 1;
		}
		// convert it into an array index
		tabs.index--;  // so the first tab is equal to 0
		// check that it isn't below 0
		if (tabs.index < 0)
		{
			tabs.index = 0;
		}
		
		// show the active tab
		tabs.content.children(":eq("+tabs.index+")").css("display","block");
		tabs.nav.children().removeClass(opts.activeClass);
		tabs.nav.children(":eq("+tabs.index+")").addClass(opts.activeClass);
	};

	// end of module
})(jQuery);