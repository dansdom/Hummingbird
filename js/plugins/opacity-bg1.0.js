/*
	jQuery Opacity BG Plugin 1.0
	Copyright (c) 2011 Daniel Thomson
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php
*/
//
// settings:
// opacity - sets the opacity of the targeted div. range: 0 - 1
// pngFix  - allows integration with DD_BelatedPNG hack
// pngClass - can set the class of the pngfix so that it doesn't clash with any other png fix classes in the document

(function($){

	$.fn.Opacity = function(config)
	{
		// config - default settings
		var settings = {
                              'opacity': 0.5,
                              'pngFix' : false,
                              'pngClass': 'pngbg'
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
			var myBox = $(this);
			$.fn.Opacity.createBackground(myBox,opts);



			// end of plugin stuff
		});

		// return jQuery object
		return this;
	};

	$.fn.Opacity.createBackground = function(box,opts)
	{
         // get the style from the original box
         var boxHeight = box.innerHeight(),
             boxWidth = box.innerWidth(),
             boxBgColor = box.css("background-color"),
             boxBgImage = box.css("background-image"),
             boxBgPosition = box.css("background-position"),
             boxBgPositionX = box.css("background-position-x"),
             boxBgPositionY = box.css("background-position-y");
             boxBgRepeat = box.css("background-repeat"),
             IEopacity = opts.opacity * 100;
             //console.log(boxBgImage);
             //alert(boxBgPositionY);
         // if it is not positioned then set to position relative
         if (box.css("position") != "absolute" && box.css("position") != "relative")
         {
             // do I need this if statement?
             //if (box.css("position") != "absolute")
             //{
                 box.css({"position":"relative","background":"none"});
             //}
         }
         // create the ned container for the content
         box.wrapInner("<div style='height:100%;width:100%;z-index:2;position:relative'></div>");
         // add a new background to the box
         box.prepend("<div class="+opts.pngClass+" style='height:"+boxHeight+"px;width:"+boxWidth+"px;background-color:"+boxBgColor+";background-image:"+boxBgImage+";background-position:"+boxBgPosition+";background-position-x:"+boxBgPositionX+";background-position-y:"+boxBgPositionY+";background-repeat:"+boxBgRepeat+";opacity:"+opts.opacity+";filter: alpha(opacity = "+IEopacity+");position:absolute;top:0;left:0;z-index:1'></div>");

         // if browser is ie6 and pngFix is set to true then run DD_BelatedPNG script
         if($.browser.msie && $.browser.version == "6.0" && opts.pngFix === true)
         {
             if (window.DD_belatedPNG)
             {
                 DD_belatedPNG.fix("."+opts.pngClass);
             }
         }
	};


	// end of module
})(jQuery);