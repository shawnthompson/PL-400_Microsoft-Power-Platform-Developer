if (typeof(ContosoPermit) == "undefined") {
	var ContosoPermit = {
		__namespace: true
	};
}
if (typeof(ContosoPermit.Scripts) == "undefined") {
	ContosoPermit.Scripts = {
		__namespace: true
	};
}

ContosoPermit.Scripts.PermitForm = {

	handleOnLoad: function(executionContext) {
		ContosoPermit.Scripts.PermitForm._handlePermitTypeSettings(executionContext);
		console.log('on load - permit form');
	},

	handleOnChangePermitType: function(executionContext) {
		ContosoPermit.Scripts.PermitForm._handlePermitTypeSettings(executionContext);
		console.log('on change - permit type');
	},

	_handlePermitTypeSettings: function(executionContext) {
		var formContext = executionContext.getFormContext();
		var permitType = formContext.getAttribute("contoso_permittype").getValue();

		if (permitType == null) {

			formContext.ui.tabs.get("inspectionsTab").setVisible(false);
			formContext.getAttribute("contoso_newsize").setRequiredLevel("none");
			formContext.ui.controls.get("contoso_newsize").setVisible(false);
			return;

		} else {

			var permitTypeID = permitType[0].id;
			Xrm.WebApi.retrieveRecord("contoso_permittype", permitTypeID).then(function(result) {



					if (result.contoso_requireinspections) {

						formContext.ui.tabs.get("inspectionsTab").setVisible(true);

					} else {

						formContext.ui.tabs.get("inspectionsTab").setVisible(false);

					}

					if (result.contoso_requiresize) {

						formContext.ui.controls.get("contoso_newsize").setVisible(true);

						formContext.getAttribute("contoso_newsize").setRequiredLevel("required");

					} else {
						
						formContext.getAttribute("contoso_newsize").setRequiredLevel("none");

						formContext.ui.controls.get("contoso_newsize").setVisible(false);
					}
				},


				function(error) {
					alert('Error:' + error.message)
				});
		}

	},

	__namespace: true
}