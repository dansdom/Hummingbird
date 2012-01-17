// custom javascript functions

// this object to be called whatever the project name is
Project = {
	init : function()
	{
		if ($.backstretch)
		{
			this.backgroundStretch();
		}
		
		if ($("#landingForm").length > 0)
		{
			this.validateLanding();
		}
	},
	backgroundStretch : function()
	{
		var img1 = "img/landing1.jpg",
			img2 = "img/landing2.jpg",
			img3 = "img/landing3.jpg";
			
		if ($("body").hasClass("landing-1"))
		{
			$.backstretch("img/landing1.jpg");
		}
		if ($("body").hasClass("landing-2"))
		{
			$.backstretch("img/landing2.jpg");
		}
		if ($("body").hasClass("landing-3"))
		{
			$.backstretch("img/landing3.jpg");
		}
		
	},
	validateLanding : function()
	{
		$("#landingForm").validator({
			inputTypes:{
				usernameInput: {
					inputName: 'username',
					rules: {min:2,max:20},
					error: 'min 2, max 20 chars allowed',
					valid: 'this field is ok'
				},
				emailInput: {
					inputName: 'email',
					rules: {validEmail:true},
					error: 'email not valid',
					valid: 'this field is ok'
				}
			},
			formClasses : { validClass : "help" },
			onChangeValidation: false
		});
	}
};


$(document).ready(function()
{
	// initialise the Project object
	Project.init();
	// call plugins from here
});























