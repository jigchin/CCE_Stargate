sap.ui.controller("view.CreateDF_Home", {

	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		this.getView().setModel(oModel, "df_request_model");
		this.getView().byId("home_form1").addStyleClass("showClass");
		this.getView().byId("home_form1").removeStyleClass("hideClass");
		this.getView().byId("text1").addStyleClass("text");
		
	},
	
	onAfterRendering: function() {
		app.setBusy(false);
		app2.setBusy(false);

	}
});