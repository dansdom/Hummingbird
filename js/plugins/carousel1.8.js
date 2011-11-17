/*
	jQuery Carousel Plugin
	Copyright (c) 2011 Daniel Thomson
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php
*/

// version 1.1 - just a bit of optimisation of the code here, no functional changes
// version 1.2 - added new option to start at a nominated position
// version 1.3 - added option to declare a css selector for the scroll pane this will enable the HTML structure to be more flexible. If this value is false then HTML structure has to be precise
// version 1.4 - modified the extend method to create a new object 'opts' that doesn't destroy the settings object. I will think about creating an 'opts' method so that the settings can be modified outside of the script
// version 1.5 - bug fixing and JSLint, optimised code and compacted all function 'var' statements
// version 1.6 - added options to have the carousel on a continual rotation (either forward or backward - forward by default) -  I have made it to work only if circular = true
// version 1.7 - added functionality to show a representation of the active elements in the carousel
// version 1.8 - fixed bug when controlPane is set to false, next/prev button not showing correct postion when control list has been defined. Took out the controlPane option altogether
//				 the javascript runs fine whether its set or not

// User Instructions:
//
// The carousel is set up as an unordered list inside of the plugin container. However, the setting - scrollPane allows the ability to specify a different container to allow flexibility in implementation.
// The list items will have a specified height and width, and SHOULD NOT HAVE PADDING OR MARGINS on them. If this is required then children elements should carry this layout style.
// The carousel will stop at each end of the list unless "circular" is set to true, then the carousel will scroll infinately
// There are two control structures. 
// 1. a "previous" and "next" button (in the form a jQuery selector) that will scroll the amount of items set by the scrollNum option. You can scroll less than or more than the total amount visible in the carousel (scrollVisible)
// 2. a "controllList" can be specified (anywhere in the document) that will allow the user to jump to anywhere in the carousel. When the scrollSpeed is set to 0, then this list acts like a tabbing navigation.
// The number of items visible, and therefore the width of the carousel is set by "scrollVisible", the number of items the previous and next buttons scroll is set by "scrollNum"
// The carousel can be set to vertical by setting "vertical" to true. The starting point of the carousel set with "startPoint"
// If you want continuous rotation of the carousel then set "rotating" to true. There are 3 other variable you can set here. 
// 1. The speed of the auto-rotation animation - rotatingSpeed
// 2. the direction of the auto-rotation - rotatingDirection
// 3. the pause between each auto-rotation - rotatingPause
//
// Calling the carousel with javascript is like most jQuery plugins:
//   $(document).ready(function(){
//        $(element).carousel({
//            settings:here
//        });
//   });

(function($){

	$.fn.carousel = function(config)
	{
		// config - default settings
		var settings =	{
						'itemWidth' : 50,				// item width
						'itemHeight' : 80,				// item height
                        'scrollNext': '.next',			// class of the next button
                        'scrollPrev': '.prev',			// class of the previous button
                        'scrollPane': false,			// choose the name of the scrollPane - if false then walk the DOM
                        'scrollSpeed': '1000',			// speed at which the carousel scrolls
                    	'scrollNum': 5,					// how many items the carousel scrolls
                        'scrollVisible': 3,				// how many items are visible in the carousel
                        'circular': false,				// will carousel scroll back to the beginning of the list when it is at the end
                        'vertical': false,				// is the carousel vertical or horizontal scrolling?
                        'startPoint': 0,				// choose the scroll number which the carousel starts on, 0 is default (nothing), 1 is the first item
                        'rotating': false,				// rotates the carousel continually
                        'rotatingSpeed': 2000,			// speed at which the carousel continually rotates
                        'rotatingDirection': 'forward',	// rotation direction
                        'rotatingPause' : 5000,			// pause between rotation
                        'controlList' : '.controller'	// choose the control list selector
					 };

		// if settings have been defined then overwrite the default ones
        // comments: true value makes the merge recursive. that is - 'deep' copy
        //				{} creates an empty object so that the second object doesn't overwrite the first object
        //				this emtpy takes object1, extends2 onto object1 and writes both to the empty object
        //				the new empty object is now stored in the var opts.
		var opts = $.extend(true, {}, settings, config);

		// iterate over each object that calls the plugin and do stuff
		this.each(function(){

			// do pluging stuff here
			// *** declare object variables here: ***
			// each box calling the plugin now has the variable name: container
			var container = $(this);
			container.counter = 1;

			// allows user to set scrollPane
			if (opts.scrollPane)
			{
				container.scrollPane = $(opts.scrollPane);
			}
			else
			{
				container.scrollPane = container.children("div");
			}
			// define the list and it's size
			container.theList = container.scrollPane.children("ul");
			container.carouselSize = container.theList.children("li").size();
			// declare the control list
			container.controlList = $(opts.controlList);
			// setup carousel tail before adding style and event handling
			if (opts.circular === true)
			{
				$.fn.carousel.addTail(container, opts);
            }
            
            // define the list and container item width and height
            container.listItems = container.theList.children("li");
			container.itemWidth = opts.itemWidth;
			container.itemHeight = opts.itemHeight;
			container.scrollNum = opts.scrollNum;
			container.carouselWidth = container.carouselSize * container.itemWidth;
			container.carouselHeight = container.carouselSize * container.itemHeight;

            // set the scroll length based on height or width of list item
			if (opts.vertical === true)
			{
				container.itemDimension = container.itemHeight;
			}
			else
			{
				container.itemDimension = container.itemWidth;
			}
			container.scrollLength = container.scrollNum * container.itemDimension;

			container.scrollNext = $(opts.scrollNext);
			container.scrollPrev = $(opts.scrollPrev);
			container.scrollVisible = opts.scrollVisible;
			container.scrollPos = 0;


			//  *** stlye carousel ***
			$.fn.carousel.styleList(container, opts);

			// check start point and adjust accordingly
            $.fn.carousel.setStartPos(container, opts);
               
            //console.log(container.counter);

            // set up rotating functionality. check that all the options that are needed are in place for it
			if (opts.rotating === true && opts.circular === true)
			{
                // start the rotation
                container.rotateTimer = 0;
                $.fn.carousel.rotation(container, opts);
            }
               
            // if there is a control pane then change control pane state here
			$.fn.carousel.controlListState(container, opts);

			//  *** navigation functions here: ***
			$(opts.scrollNext).click(function()
			{
				//  *** find the left/top scroll position of the carousel ***
				$.fn.carousel.findScrollPos(container, opts, "next");

				//  *** find if at end position ***
				if (opts.circular === false)
				{
				    $.fn.carousel.findEndPos(container, opts, "next");
				}
				else
				{
					$.fn.carousel.findEndPosCircular(container, opts, "next");
				}

				// note: took out if statement to test if control pane is set, just running function and will work - no need for the option anymore
                $.fn.carousel.controlListState(container, opts);

				//  *** animate ul to correct position ***
				$.fn.carousel.animateList(container, opts);

				// find next animation stop point
				container.animationEnd = container.scrollPos;

                // if the carousel is on a timer then clear the timeout and then set it again at the end of the animation
				if (opts.rotating === true)
				{
                    clearTimeout(container.rotateTimer);
                    container.rotateTimer = setTimeout(function(){$.fn.carousel.rotation(container, opts);}, opts.rotatingPause);
                }

				return false;
			});

			$(opts.scrollPrev).click(function()
			{
				//  *** find the left/top scroll position of the carousel ***
				$.fn.carousel.findScrollPos(container, opts, "prev");

				//  *** find if at end position ***
				if (opts.circular === false)
				{
				    $.fn.carousel.findEndPos(container, opts, "prev");
				}
				else
				{
					$.fn.carousel.findEndPosCircular(container, opts, "prev");
				}

				// note: took out if statement to test if control pane is set, just running function and will work - no need for the option anymore
                $.fn.carousel.controlListState(container, opts);

				//  *** animate ul to correct position ***
				$.fn.carousel.animateList(container, opts);

				// find next animation stop point
				container.animationEnd = container.scrollPos;

                // if the carousel is on a timer then clear the timeout and then set it again at the end of the animation
				if (opts.rotating === true)
				{
                    clearTimeout(container.rotateTimer);
                    container.rotateTimer = setTimeout(function(){$.fn.carousel.rotation(container, opts);}, opts.rotatingPause);
                }

				return false;
			});

			// control list navigation functions
			container.controlList.children().click(function()
			{
                // find the index of clicked item
                var controlIndex = $(this).parent().children().index($(this)) + 1,
                    oldCount = container.counter;

                // set a new counter position
                container.counter = controlIndex;

                // if there is a control pane then change control pane state here
				$.fn.carousel.controlListState(container, opts);

				// need to animate the carousel with the new index from the control list
				// set the new scroll position and then findthe end points as per next and prev button
				$.fn.carousel.setControlMovement(container, opts, controlIndex, oldCount);

				//  *** animate ul to correct position ***
				$.fn.carousel.animateList(container, opts);
				
				// find next animation stop point
				container.animationEnd = container.scrollPos;
				
				// if the carousel is on a timer then clear the timeout and then set it again at the end of the animation
				if (opts.rotating === true)
				{
                    clearTimeout(container.rotateTimer);
                    container.rotateTimer = setTimeout(function(){$.fn.carousel.rotation(container, opts);}, opts.rotatingPause);
                }
            });

			/////////////////////////
			// end of plugin stuff //
			/////////////////////////
		});

		// return jQuery object
		return this;
	};

	/////////////////////////////////
	/////// private functions ///////
	/////////////////////////////////

	//////////////////////////////////////////////
	// set the start position of the carousel   //
	//////////////////////////////////////////////

	$.fn.carousel.setStartPos = function(container, settings)
	{
         var multiplier,
             actualStart,
             startPosition;
         if (settings.startPoint !== 0)
         {
			// see if counter is larger than carouselSize and then set the actual starting position if carousel is circular
			if (Math.abs(settings.startPoint) > container.carouselSize && settings.circular === true)
			{
				// trim startPoint
				if (settings.startPoint > 0)
				{
                    multiplier = Math.floor(settings.startPoint / container.carouselSize);
                    actualStart = settings.startPoint - (container.carouselSize * multiplier);
				}
				else
				{
                    multiplier = Math.ceil(settings.startPoint / container.carouselSize);
                    actualStart = (settings.startPoint - (container.carouselSize * multiplier)) + container.carouselSize;
				}
			}
			// if starting point is outside the range of a linear carousel
			else if ((settings.startPoint > container.carouselSize || settings.startPoint < 0) && settings.circular === false)
			{
				actualStart = 1;
				//alert("starting position is outside the carousel range. Please set /'startPoint/' ");
			}
			// if its inside the range of the carousel
			else
			{
				if (settings.startPoint > 0)
				{
					actualStart = settings.startPoint;
				}
				else
				{
					actualStart = settings.startPoint + container.carouselSize;
				}
			}

			// set new scrollPos
			container.counter = actualStart;
			// set the start position in pixels
			if (settings.circular === true)
			{
				startPosition = ((container.counter + container.scrollVisible) * container.itemDimension) - container.itemDimension;
			}
			else
			{
				if (container.counter > (container.carouselSize - container.scrollVisible))
				{
					container.counter = container.carouselSize - container.scrollVisible + 1;
					$(settings.scrollNext).addClass("disabled");
				}
				if (container.counter > 1)
				{
					$(settings.scrollPrev).removeClass("disabled");
				}
                    startPosition = (container.counter * container.itemDimension) - container.itemDimension;
			}

			// set css position of the ul
			if (settings.vertical === true)
			{
				container.theList.css("top", -startPosition + "px");
			}
			else
			{
                container.theList.css("left", -startPosition + "px");
			}
			// set position variables for the carousel
			container.scrollPos = -startPosition;
			container.animationEnd = container.scrollPos;
		}
    };

	////////////////////////////////////////////////
	// find where the carousel is scrolling to    //
	////////////////////////////////////////////////

	// find out whether carousel has reached the end
	$.fn.carousel.findEndPos = function(carousel, opts, direction)
	{
		// forward motion
		if (direction == "next")
		{
			// check to see if carousel is going to scroll to the end of the list
            if (opts.scrollVisible + carousel.counter + carousel.scrollNum > carousel.carouselSize)
			{
				if (opts.vertical === false)
				{
					carousel.theList.css("left", carousel.animationEnd);
				}
                carousel.scrollPos = (opts.scrollVisible * carousel.itemDimension) - (carousel.carouselSize * carousel.itemDimension);
                $(opts.scrollNext).addClass("disabled");
                carousel.counter = (carousel.carouselSize - opts.scrollVisible) + 1;
            }
               // otherwise just scroll to the next position
            else
            {
                carousel.counter = carousel.counter + carousel.scrollNum;
            }
            $(opts.scrollPrev).removeClass("disabled");
		}
		// backward motion
		else
		{
			// see if carousel is going to scroll past the start
			if (carousel.counter <= carousel.scrollNum)
            {
				carousel.scrollPos = 0;
                carousel.counter = 1;
             }
             // else scroll to the previous position
             else
             {
                 carousel.counter = carousel.counter - carousel.scrollNum;
             }
             $(opts.scrollNext).removeClass("disabled");
             if (carousel.counter == 1)
             {
                 $(opts.scrollPrev).addClass("disabled");
			 }
		}
	};

	// Find out if carousel movement is going into the tail if circular
	$.fn.carousel.findEndPosCircular = function(carousel, opts, direction)
	{
    	var resetPos;
		if (direction == "next")
		{
			if ((carousel.counter + carousel.scrollNum) > carousel.carouselSize)
			{
				carousel.counter = carousel.counter - carousel.carouselSize;
                resetPos = carousel.scrollPos + ((carousel.carouselSize + carousel.scrollNum) * carousel.itemDimension);
                carousel.scrollPos = resetPos - carousel.scrollLength;
                if (opts.vertical === false)
                {
					carousel.theList.css("left", resetPos);
				}
				else
				{
					carousel.theList.css("top", resetPos);
				}
			}
			carousel.counter = carousel.counter + carousel.scrollNum;
		}
		else
		{
			if (carousel.counter < 1)
			{
				carousel.counter = carousel.counter + carousel.carouselSize;
				resetPos = carousel.scrollPos - ((carousel.carouselSize + carousel.scrollNum) * carousel.itemDimension);
				carousel.scrollPos = resetPos + carousel.scrollLength;
				if (opts.vertical === false)
				{
					carousel.theList.css("left", resetPos);
				}
				else
				{
					carousel.theList.css("top", resetPos);
				}
			}
			carousel.counter = carousel.counter - carousel.scrollNum;
		}
	};

	///////////////////////////////////////////////////////////
	// find carousel current position                        //
	///////////////////////////////////////////////////////////
	$.fn.carousel.findScrollPos = function(carousel, opts, direction)
	{
		if (opts.vertical === false)
		{
			// stop previous animtation running first
			carousel.theList.stop();
			carousel.theList.css("left", carousel.animationEnd);
            var leftPos = parseInt(carousel.theList.css("left"), 10);
            if (direction == "next")
            {
		    	carousel.scrollPos = leftPos - carousel.scrollLength;
		    }
			else
			{
				carousel.scrollPos = leftPos + carousel.scrollLength;
			}
		}
		else
		{
			// stop previous animtation running first
			carousel.theList.stop();
			carousel.theList.css("top", carousel.animationEnd);
            var topPos = parseInt(carousel.theList.css("top"), 10);
            if (direction == "next")
            {
				carousel.scrollPos = topPos - carousel.scrollLength;
			}
			else
			{
				carousel.scrollPos = topPos + carousel.scrollLength;
			}
		}
	};

	/////////////////////////////////////////////////////////
	// animate carousel                                    //
	/////////////////////////////////////////////////////////
	$.fn.carousel.animateList = function(carousel, opts)
	{
		if (opts.vertical === false)
		{
		    carousel.theList.animate({left : carousel.scrollPos}, opts.scrollSpeed);
		}
		else
		{
			carousel.theList.animate({top : carousel.scrollPos}, opts.scrollSpeed);
		}
	};

     /////////////////////////////////////////////////////////////////////
	// set the movement of the carousel using the control list         //
	/////////////////////////////////////////////////////////////////////
    $.fn.carousel.setControlMovement = function(carousel, opts, newPosition, oldPosition)
    {
    	// this will set a new animation movement based on the control list
        // goal - find the carousel.scrollPos
        var itemDimension,
        	overflow;
        // find the item dimension for scrolling
        if (opts.vertical === true)
        {
            itemDimension = opts.itemHeight;
        }
        else
        {
    		itemDimension = opts.itemWidth;
        }
        /// set disabled states for non circular carousel
        if (opts.circular === false)
        {
        	if (newPosition > 1)
            {
            	$(opts.scrollPrev).removeClass("disabled");
            }
            if (newPosition <= 1)
            {
            	$(opts.scrollPrev).addClass("disabled");
            }
            if (newPosition <= (carousel.carouselSize - (carousel.scrollVisible)))
            {
            	$(opts.scrollNext).removeClass("disabled");
            }
            if (newPosition > (carousel.carouselSize - (carousel.scrollVisible)))
            {
            	$(opts.scrollNext).addClass("disabled");
            }
        }

        // if the new position is at the end of the non-circular carousel then stop at last visible place
        if (newPosition > (carousel.carouselSize - (carousel.scrollVisible - 1)) && opts.circular === false)
        {
        	newPosition = carousel.carouselSize - (carousel.scrollVisible - 1);
            carousel.counter = carousel.carouselSize - (carousel.scrollVisible - 1);
            carousel.controlList.children(":gt(" + (newPosition-2) + ")").addClass("active");
		}
		// set new scroll position
        var controlScroll = (newPosition - oldPosition) * itemDimension;
        //console.log("scroll: "+controlScroll+", scrollLength: "+itemDimension);
        carousel.scrollPos = carousel.scrollPos - controlScroll;
	};

	/////////////////////////////////////////////////////////////////////
	// auto rotate function to set continual movement of carousel      //
	/////////////////////////////////////////////////////////////////////
	$.fn.carousel.rotation = function(carousel, opts)
	{
    	carousel.rotateTimer = setTimeout(function(){$.fn.carousel.rotation(carousel, opts);}, (opts.rotatingSpeed + opts.rotatingPause));
        // set up carousel timer
        if (opts.rotatingDirection === "forward")
        {
        	$.fn.carousel.findScrollPos(carousel, opts, "next");
	        //  *** find if at end position ***
	        $.fn.carousel.findEndPosCircular(carousel, opts, "next");
	        // find next animation stop point
             carousel.animationEnd = carousel.scrollPos;
	        //  *** animate ul to correct position ***
	        if (opts.vertical === false)
            {
            	carousel.theList.animate({left : carousel.scrollPos}, opts.rotatingSpeed);
            }
            else
            {
            	carousel.theList.animate({top : carousel.scrollPos}, opts.rotatingSpeed);
            }
         }
         else if (opts.rotatingDirection === "backward")
         {
            $.fn.carousel.findScrollPos(carousel, opts, "prev");
            //  *** find if at end position ***
	        $.fn.carousel.findEndPosCircular(carousel, opts, "prev");
	        // find next animation stop point
            carousel.animationEnd = carousel.scrollPos;
	        //  *** animate ul to correct position ***
	        if (opts.vertical === false)
			{
            	carousel.theList.animate({left : carousel.scrollPos}, opts.rotatingSpeed);
            }
			else
			{
            	carousel.theList.animate({top : carousel.scrollPos}, opts.rotatingSpeed);
			}
         }
         // if there is a control pane then change control pane state here
	    $.fn.carousel.controlListState(carousel,opts);
	};

	//////////////////////////////////////////////////////////
	// if carousel is circular then add the tail to it      //
	//////////////////////////////////////////////////////////
	$.fn.carousel.addTail = function(carousel, opts)
	{
		for (var i=0; i < opts.scrollVisible; i++)
		{
			var lastIndex = "li:eq(" + (carousel.carouselSize-1) + ")",
			    firstIndex = "li:eq(" + (i*2) + ")",
			    appendage = carousel.theList.children(firstIndex).clone(),
			    prependage = carousel.theList.children(lastIndex).clone();

			appendage.appendTo(carousel.theList);
			prependage.prependTo(carousel.theList);
		}
	};

	///////////////////////////////////////////////////
	// change control list state                     //
	///////////////////////////////////////////////////
	$.fn.carousel.controlListState = function(container,opts)
     {
         //console.log(container.counter);
         var controlLength = opts.scrollVisible;
             controlItems = container.controlList.children();

         controlItems.removeClass("active");        
         //console.group("list indexes");
         for (var i = 0; i < controlLength; i++)
         {
             var nextIndex = container.counter + i - 1;
             if (nextIndex >= controlItems.length && opts.circular === true)
             {
                 nextIndex = nextIndex - controlItems.length;
             }
             if (nextIndex < 0)
             {
                 nextIndex = container.carouselSize + nextIndex;
             }
             container.controlList.children(":eq(" + nextIndex + ")").addClass("active");
             //console.log("control length: "+controlLength);
         }
     };

	///////////////////////////////////////////////////
	// add css to the carousel                       //
	///////////////////////////////////////////////////
	$.fn.carousel.styleList = function(carousel,opts)
	{
		// style elements in the carousel
		var carouselWidth;
		carousel.css({
			position	: "relative"
		});
		carousel.scrollPane.css({
			position	: "relative",
			left		: "0px",
			overflow	: "hidden",
			"z-index"	: "2"
		});
		carousel.theList.css({
			"list-style-type"	: "none",
			margin				: "0px",
			padding				: "0px",
			position			: "relative",
			"z-index"			: "1",
			height				: carousel.carouselHeight + "px",
			width				: carousel.itemWidth + "px",
			left				: "0px",
			top					: "0px"
		});
		carousel.listItems.css({
			"float"		: "left",
			overflow	: "hidden",
			display		: "block",
			height		: carousel.itemHeight + "px",
			width		: carousel.itemWidth + "px"
		});
		carouselWidth = carousel.listItems * carousel.scrollVisible;

		if (opts.vertical === true)
		{
		    // do css on carousel elements
			carousel.scrollPane.css({
				height	: carousel.itemHeight * carousel.scrollVisible + "px",
				width	: carousel.itemWidth + "px"
			});
			carousel.theList.css({
				height	: carousel.carouselHeight + "px",
				width	: carousel.itemWidth + "px"
			});
			// if circular then correct height and position for the tail
			if (opts.circular === true)
			{
				carousel.theList.css({
					top		: 0 - (carousel.scrollVisible * carousel.itemHeight) + "px",
					height	: carousel.carouselHeight + (carousel.scrollVisible * carousel.itemHeight * 2) + "px"
				});
			}
			// define the end of the animation to stop multiple animations running at once
			carousel.animationEnd = carousel.theList.css("top");
		}
		else
		{
			carousel.scrollPane.css({
				height	: carousel.itemHeight,
				width	: carousel.itemWidth * carousel.scrollVisible + "px"
			});
			carousel.theList.css({
				height	: carousel.itemHeight + "px",
				width	: carousel.carouselWidth + "px"
			});
			// if circular then correct width and position for the tail
			if (opts.circular === true)
			{
				carousel.theList.css({
					left	: 0 - (carousel.scrollVisible*carousel.itemWidth) + "px",
					width	: carousel.carouselWidth + (carousel.scrollVisible * carousel.itemWidth * 2) + "px"
				});
			}
			// define the end of the animation to stop multiple animations running at once
			carousel.animationEnd = carousel.theList.css("left");
		}
		if (opts.circular === false)
		{
			$(carousel.scrollPrev).addClass("disabled");
		}
		// carousel now styled!!!
	};

	// end of module
})(jQuery);


// call plugin when DOM is loaded - calling this from the HTML for the time being
//$(document).ready(function(){
//	$(".myCarousel").carousel({});
//});