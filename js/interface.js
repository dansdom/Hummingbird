// custom javascript functions

// this object to be called whatever the project name is
Project = {
	init : function()
	{
		this.backgroundStretch();
		this.validateLanding();
	},
	backgroundStretch : function()
	{
		$.backstretch("img/landing.jpg");
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























