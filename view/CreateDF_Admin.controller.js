sap.ui.controller("view.CreateDF_Admin", {

	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		this.getView().setModel(oModel, "df_request_model");
		this.createStakeTable();
		this.getView().byId("label_dept").addStyleClass("whitespace");
		this.getView().byId("indication_rules").addStyleClass("whitespace");
		this.getView().byId("label_lead").addStyleClass("whitespace");
		this.getView().byId("label_sup").addStyleClass("whitespace");
		this.getView().byId("artworkchange").addStyleClass("whitespace");
		this.getView().byId("label_tr").addStyleClass("whitespace");
		this.getView().byId("code").addStyleClass("whitespace");
		this.getView().byId("code_user").addStyleClass("whitespace");
		this.getView().byId("label_rmwo").addStyleClass("whitespace");

	},
	createCountrySKU: function() {
		var url_data = [];
		var that = this;
		var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model.read("/sku_url", null, null, true, s1, f1);

		function s1(data) {
			for (var i = 0; i < data.results.length; i++) {
				url_data.push({
					COUNTRY: data.results[i].COUNTRY,
					URL: data.results[i].URL
				});
			}

			var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,

				selectionMode: sap.ui.table.SelectionMode.Single,
				title: "Country-Based SKU Database",
				toolbar: new sap.ui.commons.Toolbar({
					items: [new sap.ui.commons.Button({
							icon: "sap-icon://delete",
							press: function() {
								var selectedIndex = 0;

								selectedIndex = oTable.getSelectedIndex();
								var country = oTable.getContextByIndex(selectedIndex).getProperty("COUNTRY");
								//	console.log(oTable.getRows()[selectedIndex].getColumns()[0].getValue());
								console.log(country);

								that.getView().getModel('df_request_model').remove("/sku_url('" + country + "')", null, createSuccess, createFailed);

								function createSuccess() {
									var message = new sap.ui.commons.MessageBox.alert("Country " + country + " deleted successfully");
									that.createCountrySKU();
								}

								function createFailed(error) {
									console.log("error");
								}
							}
						}),
										new sap.ui.commons.Button({
							icon: "sap-icon://add",
							press: function() {

								that.getView().byId("countrySKUURL").addStyleClass("hideClass");
								that.getView().byId("countrySKUURL").removeStyleClass("showClass");

								that.getView().byId("country_url_form").addStyleClass("showClass");
								that.getView().byId("country_url_form").removeStyleClass("hideClass");
							}
						})
										]
				})
			});

			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "Country",
					wrapping: true
				}),
				template: new sap.ui.commons.TextField({
					change: function() {
						that._updateSKU(this, oTable);
					}
				}).addStyleClass("wordBreak").bindProperty("value", "COUNTRY"),
				sortProperty: "COUNTRY",
				filterProperty: "COUNTRY",
				width: "100px"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "SKU Database URL",
					wrapping: true
				}),
				template: new sap.ui.commons.TextField({
					change: function() {
						that._updateSKU(this, oTable);
					}
				}).addStyleClass("wordBreak").bindProperty("value", "URL"),
				sortProperty: "URL",
				filterProperty: "URL",
				width: "100px"
			}));

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				modelData: url_data
			});
			oTable.setModel(oModel);
			oTable.bindRows("/modelData");
			that.getView().byId("countrySKUURL").destroyContent();
			that.getView().byId("countrySKUURL").addContent(oTable);
		}

		function f1() {}
	},

	_updateSKU: function(that, oTable) {
		var selectedIndex = "";
		var field = [];
		field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		var country = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var url = oTable.getRows()[selectedIndex].getCells()[1].getValue();

		this.getView().getModel('df_request_model').read("/sku_url('" + country + "')", null, null, true, s1, f1);
		var that = this;

		function s1(d) {
			var input_data = {
				"COUNTRY": country,
				"URL": url
			};
			that.getView().getModel('df_request_model').update("/sku_url('" + country + "')", input_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				var message = new sap.ui.commons.MessageBox.alert("COUNTRY " + country + " updated successfully");
			}

			function updateFailed() {}

		}

		function f1() {}
	},

	onPressAddSKUURL: function() {
		var model = this.getView().getModel("df_request_model");
		var country_enter = this.getView().byId("countryid_input").getValue();
		var url_enter = this.getView().byId("urlid_input").getValue();

		var input_data = {
			"COUNTRY": country_enter,
			"URL": url_enter
		};
		this.getView().getModel('df_request_model').create("/sku_url", input_data, null, createSuccess, createFailed);

		function createSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Country " + country_enter + " created successfully");
		}

		function createFailed() {}
		var that = this;
		this.createCountrySKU();
		this.getView().byId("User_create_form").addStyleClass("hideClass");
		this.getView().byId("User_create_form").removeStyleClass("showClass");
		this.getView().byId("user_buttons_form").addStyleClass("hideClass");
		this.getView().byId("user_buttons_form").removeStyleClass("showClass");
		this.getView().byId("country_url_form").addStyleClass("hideClass");
		this.getView().byId("country_url_form").removeStyleClass("showClass");
		this.getView().byId("stakeholderEval").addStyleClass("hideClass");
		this.getView().byId("stakeholderEval").removeStyleClass("showClass");
		this.getView().byId("adminmain").addStyleClass("hideClass");
		this.getView().byId("adminmain").removeStyleClass("showClass");

		this.getView().byId("countrySKUURL").addStyleClass("showClass");
		this.getView().byId("countrySKUURL").removeStyleClass("hideClass");
		this.getView().byId("admin_form").addStyleClass("hideClass");
		this.getView().byId("admin_form").removeStyleClass("showClass");
		this.getView().byId("mainpage_admin").addStyleClass("hideClass");
		this.getView().byId("mainpage_admin").removeStyleClass("showClass");

		this.getView().byId("materialsupp").addStyleClass("hideClass");
		this.getView().byId("materialsupp").removeStyleClass("showClass");
	},

	onPressSplitAdmin: function(oEvent) {
		var context = oEvent.getParameter("listItem").sId;
		if (context === "CreateDF_Admin--country_sku_DB") {
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");

			this.getView().byId("countrySKUURL").addStyleClass("showClass");
			this.getView().byId("countrySKUURL").removeStyleClass("hideClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");

			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.createCountrySKU();
		}
		if (context === "CreateDF_Admin--dfr_email") {
		    this.getView().byId("dfremailtable").addStyleClass("showClass");
			this.getView().byId("dfremailtable").removeStyleClass("hideClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");

			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");

			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.createEmailTable();
		}
		if (context === "CreateDF_Admin--x_border") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");

			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");

			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("showClass");
			this.getView().byId("XBorderTable").removeStyleClass("hideClass");
			this.createXBorderTable();
		}
		if (context === "CreateDF_Admin--cat_scat") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");

			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");

			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("showClass");
			this.getView().byId("CatScatTable").removeStyleClass("hideClass");
			this.createCatScatTable();
		}
		if (context === "CreateDF_Admin--commodi") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
		    this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
		    this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");

			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");

			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("showClass");
			this.getView().byId("commodityTable").removeStyleClass("hideClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.createCommodities();
		}
		if (context === "CreateDF_Admin--UserProf") {
			this._createUsertable();
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("showClass");
			this.getView().byId("adminmain").removeStyleClass("hideClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--mat_sec") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
		    this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
		    this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("showClass");
			this.getView().byId("materialsupp").removeStyleClass("hideClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--stakeholder_eval") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
		    this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
		    this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("showClass");
			this.getView().byId("stakeholderEval").removeStyleClass("hideClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.refreshStakeTable();
		}
		if (context === "CreateDF_Admin--admin") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
		    this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("showClass");
			this.getView().byId("admin_form").removeStyleClass("hideClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--grp_dept") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
		    this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
		    this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("showClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("hideClass");
			this.createGrpDeptTable();
		}
		if (context === "CreateDF_Admin--dept_loc") {
		    this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
		    this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
		    this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			console.log("here3");
			this.createDeptLocTable();
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("showClass");
			this.getView().byId("DeptLocTable").removeStyleClass("hideClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--location") {
			console.log("here3");
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.createLocTable();
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("showClass");
			this.getView().byId("LocTable").removeStyleClass("hideClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--loc_dest") {
			console.log("here3");
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.createLocDestTable();
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("showClass");
			this.getView().byId("LocDestTable").removeStyleClass("hideClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--repack") {
			console.log("here3");
			this.createRepTable();
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("showClass");
			this.getView().byId("repTable").removeStyleClass("hideClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--stake_country") {
			console.log("here3");
			this.createSCTable();
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("showClass");
			this.getView().byId("stakeCTable").removeStyleClass("hideClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--stake_site") {
			console.log("here3");
			this.createSSTable();
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("showClass");
			this.getView().byId("stakeSTable").removeStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
		if (context === "CreateDF_Admin--nim_admin") {
			this.createNIMTable();
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("showClass");
			this.getView().byId("nimadminTable").removeStyleClass("hideClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
		}
	},
	_createUsertable: function() {
		var that = this;

		var model = this.getView().getModel('df_request_model');

		var oTable = new sap.ui.table.Table({
			visibleRowCount: 22,
			selectionMode: sap.ui.table.SelectionMode.Single,
			toolbar: new sap.ui.commons.Toolbar({
				items: [new sap.ui.commons.Button({
						icon: "sap-icon://delete",
						press: function() {
							var selectedIndex = 0;

							selectedIndex = oTable.getSelectedIndex();
							var user_id1 = oTable.getRows()[selectedIndex].getCells()[0].getValue();
							//	console.log(oTable.getRows()[selectedIndex].getColumns()[0].getValue());
							console.log(user_id1);
							var user_initials_del = oTable.getRows()[selectedIndex].getCells()[0].getValue();
							console.log(user_initials_del);
							that.getView().getModel('df_request_model').remove("/user_detail('" + user_initials_del + "')", null, createSuccess,
								createFailed);

							function createSuccess() {
								var message = new sap.ui.commons.MessageBox.alert("User " + user_initials_del + " deleted successfully");
								that._createUsertable();
							}

							function createFailed(error) {
								console.log("error");
							}
						}
					}),

										new sap.ui.commons.Button({
						icon: "sap-icon://create",
						press: function() {

							that.getView().byId("User_create_form").addStyleClass("showClass");
							that.getView().byId("User_create_form").removeStyleClass("hideClass");
							that.getView().byId("user_buttons_form").addStyleClass("showClass");
							that.getView().byId("user_buttons_form").removeStyleClass("hideClass");
							that.getView().byId("stakeholderEval").addStyleClass("hideClass");
							that.getView().byId("stakeholderEval").removeStyleClass("showClass");
							that.getView().byId("materialsupp").addStyleClass("hideClass");
							that.getView().byId("materialsupp").removeStyleClass("showClass");
							that.getView().byId("adminmain").addStyleClass("hideClass");
							that.getView().byId("adminmain").removeStyleClass("showClass");
							that.getView().byId("countrySKUURL").addStyleClass("hideClass");
							that.getView().byId("countrySKUURL").removeStyleClass("showClass");
							that.getView().byId("admin_form").addStyleClass("hideClass");
							that.getView().byId("admin_form").removeStyleClass("showClass");
							that.getView().byId("mainpage_admin").addStyleClass("hideClass");
							that.getView().byId("mainpage_admin").removeStyleClass("showClass");
							that.getView().byId("country_url_form").addStyleClass("hideClass");
							that.getView().byId("country_url_form").removeStyleClass("showClass");
							
							that.getView().byId("admuserid_input").setValue("");
							that.getView().byId("admusername_input").setValue("");
							that.getView().byId("admuseremail_input").setValue("");
							that.getView().byId("admuserdept_input").setSelectedKey("");
							that.getView().byId("admusercntry_input").setValue("");
							that.getView().byId("admusercntryhub_input").setValue("");
						}
					})
										]
			}),
			cellClick: function(oEvent) {}

		});
		var UserId = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "User Id",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateUserTable("textbox", this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "USER_ID"),
			sortProperty: "USER_ID",
			filterProperty: "USER_ID",
			width: "100px"
		});
		oTable.addColumn(UserId);
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "User Name",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateUserTable("textbox", this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "USER_NAME"),
			sortProperty: "USER_NAME",
			filterProperty: "USER_NAME",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "User Email",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateUserTable("textbox", this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "USER_EMAIL"),
			sortProperty: "USER_EMAIL",
			filterProperty: "USER_EMAIL",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "User Department",
				wrapping: true
			}),
			template: new sap.ui.commons.DropdownBox({
				items: [
			    new sap.ui.core.ListItem({
						text: ""
					}),
		        new sap.ui.core.ListItem({
						text: "Central Production Planning"
					}),
		         new sap.ui.core.ListItem({
						text: "CoFill"
					}),
		          new sap.ui.core.ListItem({
						text: "Commercialisation"
					}),
		          new sap.ui.core.ListItem({
						text: "Customer Logistics"
					}),
		          new sap.ui.core.ListItem({
						text: "Demand Planning"
					}),
		          new sap.ui.core.ListItem({
						text: "Deployment"
					}),
		           new sap.ui.core.ListItem({
						text: "E and T"
					}),
		           new sap.ui.core.ListItem({
						text: "Finance Freight/Delivery"
					}),
		            new sap.ui.core.ListItem({
						text: "Finance MD Costing"
					}),
		            	        new sap.ui.core.ListItem({
						text: "IT"
					}),
		             new sap.ui.core.ListItem({
						text: "Master Data"
					}),
		             new sap.ui.core.ListItem({
						text: "Material Supply"
					}),
		             new sap.ui.core.ListItem({
						text: "NIM"
					}),
		              new sap.ui.core.ListItem({
						text: "Procurement Cofill"
					}),
		              new sap.ui.core.ListItem({
						text: "QESH Manufacturing"
					}),
		              new sap.ui.core.ListItem({
						text: "QESH RTM"
					}),
		              new sap.ui.core.ListItem({
						text: "QESH Supplier"
					}),
		        new sap.ui.core.ListItem({
						text: "Repack"
					}),
		         new sap.ui.core.ListItem({
						text: "Residuals"
					}),
		          new sap.ui.core.ListItem({
						text: "Taxation"
					}),
		        new sap.ui.core.ListItem({
						text: "Warehouses"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist BE:Antwerp"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist BE:Chaudfontaine"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist BE:Ghent"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist FR:Clamart"
					}),
		         new sap.ui.core.ListItem({
						text: "Technologist FR:Dunkirk"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist FR:Grigny"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist FR:Marseille"
					}),

		        new sap.ui.core.ListItem({
						text: "Technologist FR:Toulouse"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist GB:East Kilbride"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist GB:Edmonton"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist GB:Milton Keynes"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist GB:Morpeth"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist GB:Sidcup"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist GB:Wakefield"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist NL:Dongen"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist NO:Lorenskog"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist NO:Mack"
					}),
		        new sap.ui.core.ListItem({
						text: "Technologist SE:Jordbro"
					})
                ],
				change: function() {
					that._updateUserTable("textbox", this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "USER_DEPARTMENT"),
			sortProperty: "USER_DEPARTMENT",
			filterProperty: "USER_DEPARTMENT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "User Country Based",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateUserTable("textbox", this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "USER_COUNTRY_BASED"),
			sortProperty: "USER_COUNTRY_BASED",
			filterProperty: "USER_COUNTRY_BASED",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "User Country HUB",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateUserTable("textbox", this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "USER_COUNTRY_HUB"),
			sortProperty: "USER_COUNTRY_HUB",
			filterProperty: "USER_COUNTRY_HUB",
			width: "100px"
		}));
		oTable.setModel(model);
		oTable.bindRows("/user_detail");
		this.getView().byId("adminmain").destroyContent();
		this.getView().byId("adminmain").addContent(oTable);

	},
	_updateUserTable: function(controlType, that, oTable) {
		console.log(that);
		var selectedIndex = "";
		var field = [];
		field = that.sId.split("-");
		if (controlType === "textbox") {
			console.log(field[2]);
			selectedIndex = field[2].substr(3);
			console.log(selectedIndex);
		}
		var user_id = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var user_name = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var user_email = oTable.getRows()[selectedIndex].getCells()[2].getValue();
		var user_department = oTable.getRows()[selectedIndex].getCells()[3].getValue();
		var user_country_based = oTable.getRows()[selectedIndex].getCells()[4].getValue();
		var user_country_hub = oTable.getRows()[selectedIndex].getCells()[5].getValue();

		this.getView().getModel('df_request_model').read("/user_detail('" + user_id + "')", null, null, true, s1, f1);
		var that = this;

		function s1(d) {
			console.log("found User");
			var input_data = {
				"USER_ID": user_id,
				"USER_NAME": user_name,
				"USER_EMAIL": user_email,
				"USER_DEPARTMENT": user_department,
				"USER_COUNTRY_BASED": user_country_based,
				"USER_COUNTRY_HUB": user_country_hub

			};
			that.getView().getModel('df_request_model').update("/user_detail('" + user_id + "')", input_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				var message = new sap.ui.commons.MessageBox.alert("USER " + user_id + " updated successfully");
			}

			function updateFailed() {}

		}

		function f1() {
			console.log("not found");
		}

	},
	addNIMCM: function() {
		var nim = this.getView().byId("add_nim_cm").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"NIM_CM_ID": nim,
			"NIM_CM": nim
		}
		dataModel.create("/nim_cm", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("NIM Led or CM Led added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeNIMCM: function() {
		var nim = this.getView().byId("add_nim_cm").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/nim_cm('" + nim + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("NIM Led or CM Led deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addTheme: function() {
		var theme = this.getView().byId("add_theme").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"THEME_ID": theme,
			"THEME_NAME": theme
		}
		dataModel.create("/df_theme", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Promotion Type added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeTheme: function() {
		var theme = this.getView().byId("add_theme").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/df_theme('" + theme + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Promotion Type deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addGroup: function() {
		var group = this.getView().byId("add_group").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"GROUP_ID": group,
			"GROUP_NAME": group
		}
		dataModel.create("/project_group", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Group updated Successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeGroup: function() {
		var group = this.getView().byId("add_group").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/project_group('" + group + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Group deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},

	addBrand: function() {
		var brand = this.getView().byId("add_brand").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"BRAND_ID": brand,
			"BRAND_NAME": brand
		}
		dataModel.create("/brand_dropdown", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Brand added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeBrand: function() {
		var brand = this.getView().byId("add_brand").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/brand_dropdown('" + brand + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Brand deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addType: function() {
		var type = this.getView().byId("add_type").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"TYPE_ID": type,
			"TYPE_NAME": type
		}
		dataModel.create("/df_project_type", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Type added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeType: function() {
		var type = this.getView().byId("add_type").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/df_project_type('" + type + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Type deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addDept: function() {
		var dept = this.getView().byId("add_dept").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"DEPT_ID": dept,
			"DEPT_NAME": dept
		}
		dataModel.create("/initiator_dept", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Initiator Department added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeDept: function() {
		var dept = this.getView().byId("add_dept").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/initiator_dept('" + dept + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Initiator Department deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addCountry: function() {
		var country = this.getView().byId("add_country").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		var data1 = {
			"COUNTRY_ID": country,
			"COUNTRY_CODE": country
		}
		dataModel.create("/df_country", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Destination Market added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeCountry: function() {
		var country = this.getView().byId("add_country").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/df_country('" + country + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Destination Market deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addFlavour: function() {
		var value = this.getView().byId("add_flavour").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"FLAVOUR_ID": value,
			"FLAVOUR_NAME": value
		}
		dataModel.create("/flavour_dropdown", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Flavour added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeFlavour: function() {
		var value = this.getView().byId("add_flavour").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/flavour_dropdown('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Flavour deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addContainer: function() {
		var value = this.getView().byId("add_cont").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CONT_ID": value,
			"CONT_NAME": value
		}
		dataModel.create("/container", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Product Container added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeContainer: function() {
		var value = this.getView().byId("add_cont").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/container('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Product Container deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPack: function() {
		var value = this.getView().byId("add_pack").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SIZE_ID": value,
			"SIZE_NAME": value
		}
		dataModel.create("/size", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Product Pack Size added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePack: function() {
		var value = this.getView().byId("add_pack").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/size('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Product Pack Size deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPackage: function() {
		var value = this.getView().byId("add_package").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PACKAGE_ID": value,
			"PACKAGE_NAME": value
		}
		dataModel.create("/package", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Package Type added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePackage: function() {
		var value = this.getView().byId("add_package").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/package('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Package Type deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPallet: function() {
		var value = this.getView().byId("add_pallet").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PALLET_ID": value,
			"PALLET_NAME": value
		}
		dataModel.create("/df_pallet", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Pallet Type added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePallet: function() {
		var value = this.getView().byId("add_pallet").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/df_pallet('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Pallet Type deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addChannel: function() {
		var value = this.getView().byId("add_channel").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CHANNEL_ID": value,
			"CHANNEL_NAME": value
		}
		dataModel.create("/channel", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Channel added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeChannel: function() {
		var value = this.getView().byId("add_channel").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/channel('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Channel deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addTrial: function() {
		var value = this.getView().byId("add_trials").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"TRIALS_ID": value,
			"TRIALS_NAME": value
		}
		dataModel.create("/trials", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Trials added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeTrial: function() {
		var value = this.getView().byId("add_trials").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/trials('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Trials deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addSupplier: function() {
		var value = this.getView().byId("add_sup").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SUPPLIER_ID": value,
			"SUPPLIER_NAME": value
		}
		dataModel.create("/suppliers", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Supplier name added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeSupplier: function() {
		var value = this.getView().byId("add_sup").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/suppliers('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Supplier name deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addSupplierMS: function() {
		var value = this.getView().byId("add_supp").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SUPPLIER": value,
			"SUPPLIER_NAME": value
		}
		dataModel.create("/supplier_fb", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Supplier added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeSupplierMS: function() {
		var value = this.getView().byId("add_supp").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/supplier_fb('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Supplier deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addSites: function() {
		var value = this.getView().byId("add_prod").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SITE": value,
			"SITE_NAME": value
		}
		dataModel.create("/prod_sites", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Producting Site added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeSites: function() {
		var value = this.getView().byId("add_prod").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/prod_sites('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Producting Site deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addCategory: function() {
		var value = this.getView().byId("add_cat").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CATEGORY_ID": value,
			"CATEGORY_NAME": value
		}
		dataModel.create("/project_category", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Category added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeCategory: function() {
		var value = this.getView().byId("add_cat").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/project_category('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Category deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addAssignment: function() {
		var value = this.getView().byId("add_assign").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"ASSIGNMENT_ID": value,
			"ASSIGNMENT_NAME": value
		}
		dataModel.create("/delay", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Assignment Delay added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeAssignment: function() {
		var value = this.getView().byId("add_assign").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/delay('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Assignment Delay deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addStatus: function() {
		var value = this.getView().byId("add_status").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PROJECT_STATUS_CODE": value,
			"PROJECT_STATUS": value
		}
		dataModel.create("/project_status", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Status added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeStatus: function() {
		var value = this.getView().byId("add_status").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/project_status('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Project Status deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addMfg: function() {
		var value = this.getView().byId("add_mfg").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SOURCE_ID": value,
			"SOURCE_NAME": value
		}
		dataModel.create("/mfgsource", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Mfg Source added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeMfg: function() {
		var value = this.getView().byId("add_mfg").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/mfgsource('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Mfg Source deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addMatDesc: function() {
		var value = this.getView().byId("add_mat").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"MATERIAL_ID": value,
			"MATERIAL_NAME": value
		}
		dataModel.create("/mat_desc", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Description added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeMatDesc: function() {
		var value = this.getView().byId("add_mat").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/mat_desc('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Description deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addSize: function() {
		var value = this.getView().byId("add_container").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SIZE_ID": value,
			"SIZE_NAME": value
		}
		dataModel.create("/container_size", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Container Size added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeSize: function() {
		var value = this.getView().byId("add_container").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/container_size('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Container Size deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPSize: function() {
		var value = this.getView().byId("add_psize").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SIZE_ID": value,
			"SIZE_NAME": value
		}
		dataModel.create("/size", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Pack Size added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePSize: function() {
		var value = this.getView().byId("add_psize").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/size('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Pack Size deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPromotional: function() {
		var value = this.getView().byId("add_prom").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"TYPE_ID": value,
			"TYPE_NAME": value
		}
		dataModel.create("/promotional", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Promotional Type added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePromotional: function() {
		var value = this.getView().byId("add_prom").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/promotional('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Promotional Type deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPromotionalMech: function() {
		var value = this.getView().byId("add_prommech").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PROMOTIONAL_ID": value,
			"PROMOTIONAL": value
		}
		dataModel.create("/promotional_mech", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Promotional Mechanic added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePromotionalMech: function() {
		var value = this.getView().byId("add_prommech").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/promotional_mech('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Promotional Mechanic deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addDesign: function() {
		var value = this.getView().byId("add_design").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"MESSAGE_ID": value,
			"MESSAGE": value
		}
		dataModel.create("/design", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Design Message added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeDesign: function() {
		var value = this.getView().byId("add_design").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/design('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Design Message deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addLead: function() {
		var value = this.getView().byId("add_lead").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"MARKET_ID": value,
			"MARKET": value
		}
		dataModel.create("/lead_market", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Lead Market added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeLead: function() {
		var value = this.getView().byId("add_lead").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/lead_market('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Lead Market deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPrint: function() {
		var value = this.getView().byId("add_print").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SUPPLIER_ID": value,
			"SUPPLIER_NAME": value
		}
		dataModel.create("/print_supplier", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Print Supplier added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePrint: function() {
		var value = this.getView().byId("add_print").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/print_supplier('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Print Supplier deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addSubstrate: function() {
		var value = this.getView().byId("add_substrate").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SUBSTRATE_ID": value,
			"SUBSTRATE_NAME": value
		}
		dataModel.create("/material_substrate", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Substrate added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeSubstrate: function() {
		var value = this.getView().byId("add_substrate").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/material_substrate('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Substrate deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addProcess: function() {
		var value = this.getView().byId("add_process").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PROCESS_ID": value,
			"PRINT_PROCESS": value
		}
		dataModel.create("/print_process", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("PrintProcess added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeProcess: function() {
		var value = this.getView().byId("add_process").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/print_process('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Print Process deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addArtwork: function() {
		var value = this.getView().byId("add_artwork").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"ARTWORK_ID": value,
			"LEAD_ARTWORK": value
		}
		dataModel.create("/lead_artwork", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Lead Artwork added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeArtwork: function() {
		var value = this.getView().byId("add_artwork").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/lead_artwork('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Lead Artwork deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addTransition: function() {
		var value = this.getView().byId("add_transition").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"TRANSITION_ID": value,
			"TRANSITION_TYPE": value
		}
		dataModel.create("/transition", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Type of Transition added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeTransition: function() {
		var value = this.getView().byId("add_transition").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/transition('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Type of Transition deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addSite: function() {
		var value = this.getView().byId("add_site").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"SITE_ID": value,
			"CONTINGENCY_SITE": value
		}
		dataModel.create("/contingency_site", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Contingency Site added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeSite: function() {
		var value = this.getView().byId("add_site").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/contingency_site('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Contingency Site deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addChange: function() {
		var value = this.getView().byId("add_change").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CHANGE_ID": value,
			"CHANGE_TYPE": value
		}
		dataModel.create("/change", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Tyoe of Change added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeChange: function() {
		var value = this.getView().byId("add_change").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/change('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Type of Change deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addMatChange: function() {
		var value = this.getView().byId("add_Matchange").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"MATERIAL_ID": value,
			"MATERIAL": value
		}
		dataModel.create("/material_change", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Modification added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeMatChange: function() {
		var value = this.getView().byId("add_Matchange").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/material_change('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Modification deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addMixChange: function() {
		var value = this.getView().byId("add_Mixchange").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"MIXING_ID": value,
			"MIXING": value
		}
		dataModel.create("/mixing", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Mixing of Packaging Guidelines added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeMixChange: function() {
		var value = this.getView().byId("add_Mixchange").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/mixing('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Mixing of Packaging Guidelines deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPalletisation: function() {
		var value = this.getView().byId("add_palletisation").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CHANGE_ID": value,
			"CHANGE": value
		}
		dataModel.create("/changepallet", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Change Palletisation added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePalletisation: function() {
		var value = this.getView().byId("add_palletisation").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/changepallet('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Change Palletisation deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addArtworkChange: function() {
		var value = this.getView().byId("add_Artwork").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"ARTWORKID": value,
			"ARTWORK_NAME": value
		}
		dataModel.create("/artwork_changes", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Artwork Changes added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeArtworkChange: function() {
		var value = this.getView().byId("add_Artwork").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/artwork_changes('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Artwork Changes deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},

	addRules: function() {
		var value = this.getView().byId("add_rules").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"RULES_ID": value,
			"RULES": value
		}
		dataModel.create("/rules", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Indication of Run-Out Rules added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeRules: function() {
		var value = this.getView().byId("add_rules").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/rules('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Indication of Run-Out Rules deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addCommodities: function() {
		var value = this.getView().byId("add_commodities").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"COMMODITIES_ID": value,
			"COMMODITIES_NAME": value
		}
		dataModel.create("/commodities", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Commodities added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeCommodities: function() {
		var value = this.getView().byId("add_commodities").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/commodities('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Commodities deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addCodes: function() {
		var value = this.getView().byId("add_codes").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CODE_ID": value,
			"STATUS_CODE": value
		}
		dataModel.create("/codes", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Status Code added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeCodes: function() {
		var value = this.getView().byId("add_codes").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/codes('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Status Code deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addCodesUser: function() {
		var value = this.getView().byId("add_codes_user").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"USER_ID": value,
			"USER_NAME": value
		}
		dataModel.create("/supply_user", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Supply User Name added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeCodesUser: function() {
		var value = this.getView().byId("add_codes_user").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/supply_user('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Material Supply User Name deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addRmwo: function() {
		var value = this.getView().byId("add_rmwo").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"CURRENCY_ID": value,
			"CURRENCY": value
		}
		dataModel.create("/currency", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("RMWO Currency added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeRmwo: function() {
		var value = this.getView().byId("add_rmwo").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/currency('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("RMWO Currency deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addpcbinit: function() {
		var value = this.getView().byId("add_pcbinit").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PCB_INIT_ID": value,
			"PCB_INITIATOR_NAME": value
		}
		dataModel.create("/pcb_initiator", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("PCB Initiator added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removepcbinit: function() {
		var value = this.getView().byId("add_pcbinit").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/pcb_initiator('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("PCB Initiator deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addPCBprm: function() {
		var value = this.getView().byId("add_pcbprm").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"PCB_PROMO_ID": value,
			"PCB_PROMOTION_TYPE": value
		}
		dataModel.create("/pcb_promo_type", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("PCB Promotion Type added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removePCBprm: function() {
		var value = this.getView().byId("add_pcbprm").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/pcb_promo_type('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("CB Promotion Type deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	addRMWODF: function() {
		var value = this.getView().byId("add_rmwoDF").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		console.log(value);
		var data1 = {
			"ID": value,
			"RMWO": value
		}
		dataModel.create("/rmwo_costs", data1, null, updateSuccess, updateFailed);

		function updateSuccess() {
			var message = new sap.ui.commons.MessageBox.alert(
				"In the event of raw material write off (RMWO), which department will cover the costs added successfully");
		}

		function updateFailed() {
			console.log("add failed");
		}
	},
	removeRMWODF: function() {
		var value = this.getView().byId("add_rmwoDF").getValue();
		var dataModel = this.getView().getModel("df_request_model");
		dataModel.remove("/rmwo_costs('" + value + "')", null, delSuccess, delFailed);

		function delSuccess() {
			var message = new sap.ui.commons.MessageBox.alert(
				"In the event of raw material write off (RMWO), which department will cover the costs deleted successfully");
		}

		function delFailed() {
			console.log("del failed");
		}
	},
	doFileLoadCompleteStake: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.refreshStakeTable();

	},
	doFileUploadStake: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileStake.xsjs";
		var fileLoader = this.getView().byId("fileUploader_stake");

		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
			dataModel.read("/stake_eval", null, null, false, delSuccess, delFailed);

			function delSuccess(data) {
				if (data.results.length > 0) {
					for (var i = 0; i < data.results.length; i++) {
						dataModel.remove("/stake_eval('" + data.results[i].SERIAL + "')", null, s1, f1)

						function s1() {
							console.log("del success" + data.results[i].SERIAL);
						}

						function f1() {
							console.log("del fail");
						}
					}
				}
			}

			function delFailed() {
				console.log("del fail 1");
			}

			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			that.refreshStakeTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	handleTypeMissmatch: function(oEvent) {
		var aFileTypes = oEvent.getSource().getFileType();
		jQuery.each(aFileTypes, function(key, value) {
			aFileTypes[key] = "*." + value
		});
		var sSupportedFileTypes = aFileTypes.join(", ");
		jQuery.sap.require("sap.ui.commons.MessageBox");

		sap.ui.commons.MessageBox.show("The file type *." + oEvent.getParameter("fileType") +
			" is not supported. Choose the following type: " +
			sSupportedFileTypes);
	},

	createStakeTable: function() {

		var oTable = new sap.ui.table.Table("stake_data", {
			//title: "",
			visibleRowCount: 5
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Type",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PROJECT_TYPE"),
			sortProperty: "PROJECT_TYPE",
			filterProperty: "PROJECT_TYPE",
			width: "15px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Selling Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SELLING_COUNTRY"),
			sortProperty: "SELLING_COUNTRY",
			filterProperty: "SELLING_COUNTRY",
			width: "15px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PRODUCING_COUNTRY"),
			sortProperty: "PRODUCING_COUNTRY",
			filterProperty: "PRODUCING_COUNTRY",
			width: "15px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Site",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PRODUCING_SITE"),
			sortProperty: "PRODUCING_SITE",
			filterProperty: "PRODUCING_SITE",
			width: "20px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Team",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TEAM"),
			sortProperty: "TEAM",
			filterProperty: "TEAM",
			width: "20px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Name",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "NAME"),
			sortProperty: "NAME",
			filterProperty: "NAME",
			width: "20px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Email",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "EMAIL"),
			sortProperty: "EMAIL",
			filterProperty: "EMAIL",
			width: "30px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Email To",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TO"),
			sortProperty: "TO",
			filterProperty: "TO",
			width: "15px",
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Email CC",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CC"),
			sortProperty: "CC",
			filterProperty: "CC",
			width: "15px",
		}));

		var jsonParams = {
			"allStake": []
		};
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams);
		oTable.setModel(jsonModel);

		oTable.bindRows("/allStake");
		this.getView().byId("stakeholderEval2").destroyContent();
		this.getView().byId("stakeholderEval2").addContent(oTable);
	},
	refreshStakeTable: function() {
		sap.ui.getCore().byId("stake_data").getModel().getData().allStake = [];
		this.getView().getModel("df_request_model").read("/stake_eval", null, null, false, success, failed);

		function success(data) {
			for (var i = 0; i < data.results.length; i++) {
				sap.ui.getCore().byId("stake_data").getModel().getData().allStake.push(data.results[i]);
			}
			sap.ui.getCore().byId("stake_data").getModel().setData(sap.ui.getCore().byId("stake_data").getModel().getData());
		}

		function failed() {

		}
	},
	onPressAdduser: function(oEvent) {
		var model = this.getView().getModel("df_request_model");
		var admuserid_input_new = this.getView().byId("admuserid_input").getValue();
		var admusername_input_new = this.getView().byId("admusername_input").getValue();
		var admuseremail_input_new = this.getView().byId("admuseremail_input").getValue();
		var admuserdept_input_new = this.getView().byId("admuserdept_input").getSelectedKey();
		var admusercntry_input_new = this.getView().byId("admusercntry_input").getValue();
		var admusercntryhub_input_new = this.getView().byId("admusercntryhub_input").getValue();

		var input_data = {
			"USER_ID": admuserid_input_new,
			"USER_NAME": admusername_input_new,
			"USER_EMAIL": admuseremail_input_new,
			"USER_DEPARTMENT": admuserdept_input_new,
			"USER_COUNTRY_BASED": admusercntry_input_new,
			"USER_COUNTRY_HUB": admusercntryhub_input_new
		};
		this.getView().getModel('df_request_model').create("/user_detail", input_data, null, createSuccess, createFailed);

		function createSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("User " + admuserid_input_new + " created successfully");
		}

		function createFailed() {}
		this._createUsertable();
		this.getView().byId("User_create_form").addStyleClass("hideClass");
		this.getView().byId("User_create_form").removeStyleClass("showClass");
		this.getView().byId("user_buttons_form").addStyleClass("hideClass");
		this.getView().byId("user_buttons_form").removeStyleClass("showClass");
		this.getView().byId("stakeholderEval").addStyleClass("hideClass");
		this.getView().byId("stakeholderEval").removeStyleClass("showClass");
		this.getView().byId("materialsupp").addStyleClass("hideClass");
		this.getView().byId("materialsupp").removeStyleClass("showClass");
		this.getView().byId("adminmain").addStyleClass("showClass");
		this.getView().byId("adminmain").removeStyleClass("hideClass");
		this.getView().byId("countrySKUURL").addStyleClass("hideClass");
		this.getView().byId("countrySKUURL").removeStyleClass("showClass");
		this.getView().byId("admin_form").addStyleClass("hideClass");
		this.getView().byId("admin_form").removeStyleClass("showClass");
		this.getView().byId("mainpage_admin").addStyleClass("hideClass");
		this.getView().byId("mainpage_admin").removeStyleClass("showClass");
		this.getView().byId("country_url_form").addStyleClass("hideClass");
		this.getView().byId("country_url_form").removeStyleClass("showClass");

	},
	onPressAddCommodity: function() {
		var model = this.getView().getModel("df_request_model");
		var mat_enter = this.getView().byId("materialgrp_input").getValue();
		var desc_enter = this.getView().byId("desc_input").getValue();
		var com_enter = this.getView().byId("commodityid_input").getValue();

		var input_data = {
			"MATERIAL": mat_enter,
			"DESC": desc_enter,
			"COMMODITIES": com_enter
		};
		this.getView().getModel('df_request_model').create("/commodity", input_data, null, createSuccess, createFailed);

		function createSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("SAP Material Group " + mat_enter + " created successfully");
		}

		function createFailed() {}
		var that = this;
		this.createCommodities();
		this.getView().byId("User_create_form").addStyleClass("hideClass");
		this.getView().byId("User_create_form").removeStyleClass("showClass");
		this.getView().byId("user_buttons_form").addStyleClass("hideClass");
		this.getView().byId("user_buttons_form").removeStyleClass("showClass");
		this.getView().byId("country_url_form").addStyleClass("hideClass");
		this.getView().byId("country_url_form").removeStyleClass("showClass");
		this.getView().byId("stakeholderEval").addStyleClass("hideClass");
		this.getView().byId("stakeholderEval").removeStyleClass("showClass");
		this.getView().byId("adminmain").addStyleClass("hideClass");
		this.getView().byId("adminmain").removeStyleClass("showClass");

		this.getView().byId("countrySKUURL").addStyleClass("hideClass");
		this.getView().byId("countrySKUURL").removeStyleClass("showClass");
		this.getView().byId("admin_form").addStyleClass("hideClass");
		this.getView().byId("admin_form").removeStyleClass("showClass");
		this.getView().byId("mainpage_admin").addStyleClass("hideClass");
		this.getView().byId("mainpage_admin").removeStyleClass("showClass");

		this.getView().byId("materialsupp").addStyleClass("hideClass");
		this.getView().byId("materialsupp").removeStyleClass("showClass");
		that.getView().byId("commodityTable").addStyleClass("showClass");
		that.getView().byId("commodityTable").removeStyleClass("hideClass");

		that.getView().byId("commodity_form").addStyleClass("hideClass");
		that.getView().byId("commodity_form").removeStyleClass("showClass");
	},
	createCommodities: function() {
		var that = this;
		var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model.read("/commodity", null, null, true, s1, f1);

		function s1(d) {
			var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,

				selectionMode: sap.ui.table.SelectionMode.Single,
				title: "Country-Based SKU Database",
				toolbar: new sap.ui.commons.Toolbar({
					items: [new sap.ui.commons.Button({
							icon: "sap-icon://delete",
							press: function() {
								var selectedIndex = 0;
								selectedIndex = oTable.getSelectedIndex();
								var material = oTable.getContextByIndex(selectedIndex).getProperty("MATERIAL");
								console.log(material);
								that.getView().getModel('df_request_model').remove("/commodity('" + material + "')", null, createSuccess, createFailed);

								function createSuccess() {
									var message = new sap.ui.commons.MessageBox.alert("SAP Material Group " + material + " deleted successfully");
									that.createCommodities();
								}

								function createFailed(error) {
									console.log("error");
								}
							}
						}),
										new sap.ui.commons.Button({
							icon: "sap-icon://add",
							press: function() {
								that.getView().byId("commodityTable").addStyleClass("hideClass");
								that.getView().byId("commodityTable").removeStyleClass("showClass");

								that.getView().byId("commodity_form").addStyleClass("showClass");
								that.getView().byId("commodity_form").removeStyleClass("hideClass");
							}
						})
										]
				})
			});

			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "SAP Material Group",
					wrapping: true
				}),
				template: new sap.ui.commons.TextField({
					/*	change: function() {
						that._updateComm(this, oTable);
					}*/
					editable: false
				}).addStyleClass("wordBreak").bindProperty("value", "MATERIAL"),
				sortProperty: "MATERIAL",
				filterProperty: "MATERIAL",
				width: "100px"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "SAP Material Group Description",
					wrapping: true
				}),
				template: new sap.ui.commons.TextField({
					change: function() {
						that._updateComm(this, oTable);
					}
				}).addStyleClass("wordBreak").bindProperty("value", "DESC"),
				sortProperty: "DESC",
				filterProperty: "DESC",
				width: "100px"
			}));
			oTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({
					text: "Commoditites",
					wrapping: true
				}),
				template: new sap.ui.commons.TextField({
					change: function() {
						that._updateComm(this, oTable);
					}
				}).addStyleClass("wordBreak").bindProperty("value", "COMMODITIES"),
				sortProperty: "COMMODITIES",
				filterProperty: "COMMODITIES",
				width: "100px"
			}));
			oTable.setModel(model);
			oTable.bindRows("/commodity");
			that.getView().byId("commodityTable").destroyContent();
			that.getView().byId("commodityTable").addContent(oTable);
		}

		function f1() {}
	},
	_updateComm: function(that, oTable) {
		var selectedIndex = "";
		var field = [];
		field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		var mat = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var desc = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var com = oTable.getRows()[selectedIndex].getCells()[2].getValue();

		this.getView().getModel('df_request_model').read("/commodity('" + mat + "')", null, null, true, s1, f1);
		var that = this;

		function s1(d) {
			var input_data = {
				"MATERIAL": mat,
				"DESC": desc,
				"COMMODITIES": com
			};
			that.getView().getModel('df_request_model').update("/commodity('" + mat + "')", input_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				var message = new sap.ui.commons.MessageBox.alert("SAP Material Group " + mat + " updated successfully");
			}

			function updateFailed() {}

		}

		function f1() {}
	},
	tableExport: function(ReportTitle, ShowLabel, oTable) {
	 		var ifnull = function(v, o) {
	 			if (v == null) {
	 				v = o || "";
	 			}
	 			return v;
	 		};

	 		var CSV = '';
	 		CSV += ReportTitle + '\r\n\n';

	 		if (ShowLabel) {

	 			var row = "";
	 			row = row.slice(0, -1);
	 			CSV += row + '\r\n';

	 		}

	 		var headers = [];

	 		if (ReportTitle === "Project Group and Department") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/grp_dept", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].PROJECT_GROUP + '","' + arrData[i].DEPT + '","' + arrData[i].TO_CC + '","' + arrData[i].IN_OUT + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		} else if (ReportTitle === "Department and Location") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/dept_loc", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].DEPT + '","' + arrData[i].LOC + '","' + arrData[i].TO_CC + '","' + arrData[i].IN_OUT + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		} else if (ReportTitle === "Locations") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/loc", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].SITE + '","' + arrData[i].COUNTRY + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		} else if (ReportTitle === "Location-Destination Market") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/loc_dest", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].ID + '","' + arrData[i].DESTINATION_MARKET + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		}
	 		else if (ReportTitle === "Repack Involvement") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/rep", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].YES_NO + '","' + arrData[i].REP + '","' + arrData[i].LOC + '","' + arrData[i].TO_CC + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		}
	 		else if (ReportTitle === "StakeHolders Country") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/stakeholder_country", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].TO_CC + '","' + arrData[i].DEPT + '","' + arrData[i].PC_DM + '","' + arrData[i].COUNTRY + '","'+ arrData[i].STAKEHOLDERS + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		}
	 		else if (ReportTitle === "Stakeholders Site") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/stakeholder_site", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].SITE + '","' + arrData[i].DEPT + '","'+ arrData[i].STAKEHOLDER + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		}
	 		else if (ReportTitle === "X-Border Combinations") {
	 			for (var i = 0; i < oTable.getColumns().length; i++) {

	 				headers[i] = oTable.getColumns()[i].getLabel().getText();
	 			}
	 			var arrData = [];
	 			var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	 			model.read("/xb", null, null, false, s, f);
	 			function s(data){
	 			    arrData = data.results;
	 			    console.log(arrData);
	 			}
	 			function f(){}
	 			CSV += headers + '\r\n';
	 			console.log("Here for the Export array1");
	 			console.log(arrData);
	 			for (var i = 0; i < arrData.length; i++) {
	 				var row = "";
	 				row += '"' + arrData[i].DEPT + '","' + arrData[i].DEST + '","'+ arrData[i].COUNTRY + '","' + arrData[i].STAKEHOLDER + '","'+ arrData[i].TO_CC + '",';
	 				row.slice(0, row.length - 1);
	 				CSV += row + '\r\n';

	 			}
	 		}
	 		if (CSV == '') {
	 			alert("Invalid data");
	 			return;
	 		}
	 		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
	 			pattern: "dd-MMM-yyyy HH:mm"
	 		});

	 		var fileName = "Report_";
	 		fileName += ReportTitle.replace(/ /g, "_");
	 		jQuery.sap.log.info("incoming");
	 		jQuery.sap.log.info(CSV);

	 		var uri = 'data:text/xls;charset=utf-8,' + escape(CSV);
	 		var link = document.createElement("a");
	 		link.href = uri;
	 		link.style = "visibility:hidden";
	 		link.download = fileName + ".csv";
	 		document.body.appendChild(link);
	 		link.click();
	 		document.body.removeChild(link);
	 	},
	createGrpDeptTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
		    var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
            that.tableExport("Project Group and Department", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Group",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PROJECT_GROUP"),
			sortProperty: "PROJECT_GROUP",
			filterProperty: "PROJECT_GROUP",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Department",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEPT"),
			sortProperty: "DEPT",
			filterProperty: "DEPT",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TO/CC",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TO_CC"),
			sortProperty: "TO_CC",
			filterProperty: "TO_CC",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "IN/OUT",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "IN_OUT"),
			sortProperty: "IN_OUT",
			filterProperty: "IN_OUT",
			width: "15px"
		}));
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/grp_dept");
		this.getView().byId("GrpDeptTable1").destroyContent();
		this.getView().byId("GrpDeptTable1").addContent(oTable);
	},
	doFileLoadCompleteGrp: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createGrpDeptTable();
	},
	doFileUploadGrp: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileGrpDept.xsjs";
		var fileLoader = this.getView().byId("fileUploader_grp");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteGrpDept.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createGrpDeptTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createDeptLocTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("Department and Location", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Department",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEPT"),
			sortProperty: "DEPT",
			filterProperty: "DEPT",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Location",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "LOC"),
			sortProperty: "LOC",
			filterProperty: "LOC",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TO/CC",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TO_CC"),
			sortProperty: "TO_CC",
			filterProperty: "TO_CC",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "IN/OUT",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "IN_OUT"),
			sortProperty: "IN_OUT",
			filterProperty: "IN_OUT",
			width: "15px"
		}));
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/dept_loc");
		this.getView().byId("DeptLocTable1").destroyContent();
		this.getView().byId("DeptLocTable1").addContent(oTable);
	},
	doFileLoadCompleteDeptLoc: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createDeptLocTable();
	},
	doFileUploadDeptLoc: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileDeptLoc.xsjs";
		var fileLoader = this.getView().byId("fileUploader_deptloc");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteDeptLoc.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createDeptLocTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createLocTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("Locations", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Site",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SITE"),
			sortProperty: "SITE",
			filterProperty: "SITE",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY"),
			sortProperty: "COUNTRY",
			filterProperty: "COUNTRY",
			width: "15px"
		}));
	
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/loc");
		this.getView().byId("LocTable1").destroyContent();
		this.getView().byId("LocTable1").addContent(oTable);
	},
	doFileLoadCompleteLoc: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createLocTable();
	},
	doFileUploadLoc: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileLoc.xsjs";
		var fileLoader = this.getView().byId("fileUploader_loc");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteLoc.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createLocTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createLocDestTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("Location-Destination Market", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Destination Market ID",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ID"),
			sortProperty: "ID",
			filterProperty: "ID",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Destination Market",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DESTINATION_MARKET"),
			sortProperty: "DESTINATION_MARKET",
			filterProperty: "DESTINATION_MARKET",
			width: "15px"
		}));
	
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/loc_dest");
		this.getView().byId("LocDestTable1").destroyContent();
		this.getView().byId("LocDestTable1").addContent(oTable);
	},
	doFileLoadCompleteLocDest: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createLocDestTable();
	},
	doFileUploadLocDest: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileLocDest.xsjs";
		var fileLoader = this.getView().byId("fileUploader_locdest");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteLocDest.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createLocDestTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createRepTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 1,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("Repack Involvement", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Yes/No",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "YES_NO"),
			sortProperty: "YES_NO",
			filterProperty: "YES_NO",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Repack",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "REP"),
			sortProperty: "REP",
			filterProperty: "REP",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Location",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "LOC"),
			sortProperty: "LOC",
			filterProperty: "LOC",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TO/CC",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TO_CC"),
			sortProperty: "TO_CC",
			filterProperty: "TO_CC",
			width: "15px"
		}));
	
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/rep");
		this.getView().byId("repTable1").destroyContent();
		this.getView().byId("repTable1").addContent(oTable);
	},
	doFileLoadCompleteRep: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createRepTable();
	},
	doFileUploadRep: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileRep.xsjs";
		var fileLoader = this.getView().byId("fileUploader_rep");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteRep.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createRepTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createSCTable: function(){
	    var that =this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("StakeHolders Country", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TO/CC",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TO_CC"),
			sortProperty: "TO_CC",
			filterProperty: "TO_CC",
			width: "5px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Department",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEPT"),
			sortProperty: "DEPT",
			filterProperty: "DEPT",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Country/Destination Market",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PC_DM"),
			sortProperty: "PC_DM",
			filterProperty: "PC_DM",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY"),
			sortProperty: "COUNTRY",
			filterProperty: "COUNTRY",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Stakeholders",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "STAKEHOLDERS"),
			sortProperty: "STAKEHOLDERS",
			filterProperty: "STAKEHOLDERS",
			width: "15px"
		}));
	
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/stakeholder_country");
		this.getView().byId("stakeCTable1").destroyContent();
		this.getView().byId("stakeCTable1").addContent(oTable);
	},
	doFileLoadCompleteCountry: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createSCTable();
	},
	doFileUploadCountry: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileSC.xsjs";
		var fileLoader = this.getView().byId("fileUploader_country");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteSC.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createSCTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createSSTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("Stakeholders Site", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Site",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SITE"),
			sortProperty: "SITE",
			filterProperty: "SITE",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Department",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEPT"),
			sortProperty: "DEPT",
			filterProperty: "DEPT",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Stakeholder",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "STAKEHOLDER"),
			sortProperty: "STAKEHOLDER",
			filterProperty: "STAKEHOLDER",
			width: "15px"
		}));
	
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/stakeholder_site");
		this.getView().byId("stakeSTable1").destroyContent();
		this.getView().byId("stakeSTable1").addContent(oTable);
	},
	doFileLoadCompleteSite: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createSSTable();
	},
	doFileUploadSite: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileSS.xsjs";
		var fileLoader = this.getView().byId("fileUploader_site");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteSS.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createSSTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
		createXBorderTable: function(){
		    var that =this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({items: [
		new sap.ui.commons.Button({text: "Export", press: function() { 
            that.tableExport("X-Border Combinations", true, oTable);
		}})
	]})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Department",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEPT"),
			sortProperty: "DEPT",
			filterProperty: "DEPT",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Destination Market",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEST"),
			sortProperty: "DEST",
			filterProperty: "DEST",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY"),
			sortProperty: "COUNTRY",
			filterProperty: "COUNTRY",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Stakeholder",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "STAKEHOLDER"),
			sortProperty: "STAKEHOLDER",
			filterProperty: "STAKEHOLDER",
			width: "15px"
		}));
			oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TO/CC",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "TO_CC"),
			sortProperty: "TO_CC",
			filterProperty: "TO_CC",
			width: "15px"
		}));
	
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/xb");
		this.getView().byId("XBorderTable1").destroyContent();
		this.getView().byId("XBorderTable1").addContent(oTable);
	},
	doFileLoadCompleteX: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createXBorderTable();
	},
	doFileUploadX: function() {
		var that = this;
		console.log("upload Stake");
		var url = "/dfrequest3/services/getFileXB.xsjs";
		var fileLoader = this.getView().byId("fileUploader_x");
		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			sap.ui.core.BusyIndicator.show(0);
			var dataModel = this.getView().getModel("df_request_model");
		    var urlSKU = "/dfrequest3/services/deleteXB.xsjs";
			jQuery.ajax({
				url: urlSKU,
				async :false,  
                TYPE: 'POST' ,  
                method: 'GET',
				success: usersuccess,
				failed: userfailed
			})

			function usersuccess() {
				console.log("data del");
			}

			function userfailed() {
				console.log("del error")
			}
			
			url = url + "?file_name=" + fileName;
			console.log(url);
			fileLoader.setUploadUrl(url);
			fileLoader.upload();
			//that.refreshSKUTable();
            this.createXBorderTable();
			sap.ui.core.BusyIndicator.hide();

		}

	},
	createCatScatTable: function(){
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Category",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CAT"),
			sortProperty: "CAT",
			filterProperty: "CAT",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sub-Category",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SCAT"),
			sortProperty: "SCAT",
			filterProperty: "SCAT",
			width: "15px"
		}));
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/cat_scat");
		this.getView().byId("CatScatTable").destroyContent();
		this.getView().byId("CatScatTable").addContent(oTable);
	},
	createNIMTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 5,
				toolbar: new sap.ui.commons.Toolbar({
					items: [new sap.ui.commons.Button({
							icon: "sap-icon://delete",
							press: function() {
								var selectedIndex = 0;
								selectedIndex = oTable.getSelectedIndex();
								var nim = oTable.getContextByIndex(selectedIndex).getProperty("NIM_INITIALS");
								console.log(nim);
								that.getView().getModel('df_request_model').remove("/nim('" + nim + "')", null, createSuccess, createFailed);

								function createSuccess() {
									var message = new sap.ui.commons.MessageBox.alert("NIM deleted successfully");
									that.createNIMTable();
								}

								function createFailed(error) {
									console.log("error");
								}
							}
						}),
							new sap.ui.commons.Button({
							icon: "sap-icon://add",
							press: function() {

								that.getView().byId("nimadminTable").addStyleClass("hideClass");
								that.getView().byId("nimadminTable").removeStyleClass("showClass");

								that.getView().byId("nim_add").addStyleClass("showClass");
								that.getView().byId("nim_add").removeStyleClass("hideClass");
								that.getView().byId("ini_input").setValue("");
								that.getView().byId("nimname_input").setValue("");
								that.getView().byId("countrybased_input").setValue("");
								that.getView().byId("countryhub_input").setValue("");
							}
						})
						]
				})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM Initials",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "NIM_INITIALS"),
			sortProperty: "NIM_INITIALS",
			filterProperty: "NIM_INITIALS",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "NIM_NAME"),
			sortProperty: "NIM_NAME",
			filterProperty: "NIM_NAME",
			width: "15px"
		}));
		oTable.getColumns()[1].setSorted(true);
		oTable.getColumns()[1].setSortOrder(sap.ui.table.SortOrder.Ascending);
		
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Country Based",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY_BASED"),
			sortProperty: "COUNTRY_BASED",
			filterProperty: "COUNTRY_BASED",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Country Hub",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY_HUB"),
			sortProperty: "COUNTRY_HUB",
			filterProperty: "COUNTRY_HUB",
			width: "15px"
		}));
		
		
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/nim");
		oTable.sort(oTable.getColumns()[1],sap.ui.table.SortOrder.Ascending);
		this.getView().byId("nimadminTable").destroyContent();
		this.getView().byId("nimadminTable").addContent(oTable);
	},
	onPressAddNIM: function(){
	    var model = this.getView().getModel("df_request_model");
		var ini = this.getView().byId("ini_input").getValue();
		var name = this.getView().byId("nimname_input").getValue();
		var base = this.getView().byId("countrybased_input").getValue();
		var hub = this.getView().byId("countryhub_input").getValue();

		var input_data = {
			"NIM_INITIALS": ini,
			"NIM_NAME": name,
			"COUNTRY_BASED": base,
			"COUNTRY_HUB": hub
		};
		this.getView().getModel('df_request_model').create("/nim", input_data, null, createSuccess, createFailed);

		function createSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("NIM " + name + " created successfully");
		}

		function createFailed() {}
		
		this.createNIMTable();
		this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("showClass");
			this.getView().byId("nimadminTable").removeStyleClass("hideClass");
			this.getView().byId("dfremailtable").addStyleClass("hideClass");
			this.getView().byId("dfremailtable").removeStyleClass("showClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
	},
	createEmailTable: function(){
	    var that = this;
	    var oTable = new sap.ui.table.Table({
				visibleRowCount: 8,
				toolbar: new sap.ui.commons.Toolbar({
					items: [new sap.ui.commons.Button({
							icon: "sap-icon://delete",
							press: function() {
								var selectedIndex = 0;
								selectedIndex = oTable.getSelectedIndex();
								var dest = oTable.getContextByIndex(selectedIndex).getProperty("DEST");
								console.log(nim);
								that.getView().getModel('df_request_model').remove("/df_email('" + dest + "')", null, createSuccess, createFailed);

								function createSuccess() {
									var message = new sap.ui.commons.MessageBox.alert("Email deleted successfully");
									that.createEmailTable();
								}

								function createFailed(error) {
									console.log("error");
								}
							}
						}),
							new sap.ui.commons.Button({
							icon: "sap-icon://add",
							press: function() {

								that.getView().byId("dfremailtable").addStyleClass("hideClass");
								that.getView().byId("dfremailtable").removeStyleClass("showClass");

								that.getView().byId("email_add").addStyleClass("showClass");
								that.getView().byId("email_add").removeStyleClass("hideClass");
								that.getView().byId("dest_input").setValue("");
								that.getView().byId("name_input").setValue("");
								that.getView().byId("email_input").setValue("");
								
							}
						})
						]
				})
	    });
	    oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Destination Market",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DEST"),
			sortProperty: "DEST",
			filterProperty: "DEST",
			width: "15px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Name",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "NAME"),
			sortProperty: "NAME",
			filterProperty: "NAME",
			width: "15px"
		}));
	
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Email",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "EMAIL"),
			sortProperty: "EMAIL",
			filterProperty: "EMAIL",
			width: "15px"
		}));
		
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/df_email");
		oTable.sort(oTable.getColumns()[1],sap.ui.table.SortOrder.Ascending);
		this.getView().byId("dfremailtable").destroyContent();
		this.getView().byId("dfremailtable").addContent(oTable);
	},
	onPressAddEmail  : function(){
	    var model = this.getView().getModel("df_request_model");
		var dest = this.getView().byId("dest_input").getValue();
		var name = this.getView().byId("name_input").getValue();
		var email = this.getView().byId("email_input").getValue();
	
		var input_data = {
			"DEST": dest,
			"NAME": name,
			"EMAIL": email
		};
		this.getView().getModel('df_request_model').create("/df_email", input_data, null, createSuccess, createFailed);

		function createSuccess() {
			var message = new sap.ui.commons.MessageBox.alert("Email created successfully");
		}

		function createFailed() {}
		
		this.createEmailTable();
		this.getView().byId("nim_add").addStyleClass("hideClass");
			this.getView().byId("nim_add").removeStyleClass("showClass");
			this.getView().byId("nimadminTable").addStyleClass("hideClass");
			this.getView().byId("nimadminTable").removeStyleClass("showClass");
			this.getView().byId("CatScatTable").addStyleClass("hideClass");
			this.getView().byId("CatScatTable").removeStyleClass("showClass");
			this.getView().byId("XBorderTable").addStyleClass("hideClass");
			this.getView().byId("XBorderTable").removeStyleClass("showClass");
			this.getView().byId("LocDestTable").addStyleClass("hideClass");
			this.getView().byId("LocDestTable").removeStyleClass("showClass");
			this.getView().byId("commodity_form").addStyleClass("hideClass");
			this.getView().byId("commodity_form").removeStyleClass("showClass");
			this.getView().byId("User_create_form").addStyleClass("hideClass");
			this.getView().byId("User_create_form").removeStyleClass("showClass");
			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
			this.getView().byId("stakeholderEval").addStyleClass("hideClass");
			this.getView().byId("stakeholderEval").removeStyleClass("showClass");
			this.getView().byId("materialsupp").addStyleClass("hideClass");
			this.getView().byId("materialsupp").removeStyleClass("showClass");
			this.getView().byId("mainpage_admin").addStyleClass("hideClass");
			this.getView().byId("mainpage_admin").removeStyleClass("showClass");
			this.getView().byId("country_url_form").addStyleClass("hideClass");
			this.getView().byId("country_url_form").removeStyleClass("showClass");
			this.getView().byId("adminmain").addStyleClass("hideClass");
			this.getView().byId("adminmain").removeStyleClass("showClass");
			this.getView().byId("countrySKUURL").addStyleClass("hideClass");
			this.getView().byId("countrySKUURL").removeStyleClass("showClass");
			this.getView().byId("admin_form").addStyleClass("hideClass");
			this.getView().byId("admin_form").removeStyleClass("showClass");
			this.getView().byId("commodityTable").addStyleClass("hideClass");
			this.getView().byId("commodityTable").removeStyleClass("showClass");
			this.getView().byId("DeptLocTable").addStyleClass("hideClass");
			this.getView().byId("DeptLocTable").removeStyleClass("showClass");
			this.getView().byId("LocTable").addStyleClass("hideClass");
			this.getView().byId("LocTable").removeStyleClass("showClass");
			this.getView().byId("repTable").addStyleClass("hideClass");
			this.getView().byId("repTable").removeStyleClass("showClass");
			this.getView().byId("stakeCTable").addStyleClass("hideClass");
			this.getView().byId("stakeCTable").removeStyleClass("showClass");
			this.getView().byId("stakeSTable").addStyleClass("hideClass");
			this.getView().byId("stakeSTable").removeStyleClass("showClass");
			this.getView().byId("GrpDeptTable").addStyleClass("hideClass");
			this.getView().byId("GrpDeptTable").removeStyleClass("showClass");
			this.getView().byId("dfremailtable").addStyleClass("showClass");
			this.getView().byId("dfremailtable").removeStyleClass("hideClass");
		    this.getView().byId("email_add").addStyleClass("hideClass");
			this.getView().byId("email_add").removeStyleClass("showClass");
	},
	onAfterRendering: function() {
		app.setBusy(false);
		app2.setBusy(false);

	}
});