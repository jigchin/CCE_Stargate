var final_item;
var df_sku = [];
var df_id = [];
var selectedIndex;
var jsonParams = {
	"allData1": [],
	"allSites": [],
	"allrules": [],
	"yes_no": []
};
var jsonParams1 = {
	"allData2": [],
	"yes_no": []
};
var jsonParams2 = {
	"allDataFR1": [],
	"allDataFR2": []
};
var jsonParams3 = {
	"allDataGB1": [],
	"allDataGB2": [],
	"allDataGB3": [],
	"allSites": [],
	"allNIMs": []
};
sap.ui.controller("view.CreateDF_Meeting", {

	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		this.getView().setModel(oModel, "df_request_model");
		
		var dropdown_material = this.getView().byId("materials_dropdown");
		dropdown_material.setModel(oModel);
		/*oModel.read("/category", null, null, true, fSuccessMat, fErrorMat)

		function fSuccessMat(data) {*/
			var dropDownData = [];
			var jsonData = new sap.ui.model.json.JSONModel();
			dropDownData.push({
				material_id: "",
				material_name: ""
			});
		/*	for (var i = 0; i < data.results.length; i++) {
			    console.log(data.results[i].ID);
				dropDownData.push({
					material_id: data.results[i].ID,
					material_name: data.results[i].CAT
				});
			}*/
			dropDownData.push({
					material_id: "CANS",
					material_name: "CANS"
				});
				dropDownData.push({
					material_id: "RGB",
					material_name: "RGB"
				});
				dropDownData.push({
					material_id: "HOTFILL",
					material_name: "HOTFILL"
				});
				dropDownData.push({
					material_id: "ASEPTIC",
					material_name: "ASEPTIC"
				});
				dropDownData.push({
					material_id: "BRICKPACK",
					material_name: "BRICKPACK"
				});
				dropDownData.push({
					material_id: "CHAUDFONTAINE",
					material_name: "CHAUDFONTAINE"
				});
				dropDownData.push({
					material_id: "PET",
					material_name: "PET"
				});
				dropDownData.push({
					material_id: "REPACKING INHOUSE",
					material_name: "REPACKING INHOUSE"
				});
				dropDownData.push({
					material_id: "BIB",
					material_name: "BIB"
				});
				dropDownData.push({
					material_id: "CROSSBORDER GB",
					material_name: "CROSSBORDER GB"
				});
				dropDownData.push({
					material_id: "COFILLING",
					material_name: "COFILLING"
				});
				dropDownData.push({
					material_id: "REPACKING EXTERN",
					material_name: "REPACKING EXTERN"
				});
			jsonData.setData(dropDownData);
			dropdown_material.setModel(jsonData);
			var oTemplate = new sap.ui.core.ListItem({
				key: "{material_id}",
				text: "{material_name}"
			});
			dropdown_material.bindItems("/", oTemplate)
		/*}

		function fErrorMat(oEvent) {}*/
		
		this.createFirstTable();
		this.createNextTable();

	},
	MaterialSelectionFinish: function(oEvent) {
		var dropDownData = [];
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		var selectedItems = oEvent.getParameter("selectedItems");
		console.log(selectedItems);
		for (var i = 0; i < selectedItems.length; i++) {
			var item = selectedItems[i].getText();
			console.log(item);

			var dropdown_snppl = this.getView().byId("snppl_dropdown");
			dropdown_snppl.setModel(oModel);
			oModel.read("/cat_scat?$filter=CAT eq '" + item + "'", null, null, true, fSuccess, fError)

			function fSuccess(data) {
				var jsonData = new sap.ui.model.json.JSONModel();
				for (var i = 0; i < data.results.length; i++) {
					dropDownData.push({
						id: data.results[i].SCAT,
						name: data.results[i].SCAT
					});
				}
				jsonData.setData(dropDownData);
				dropdown_snppl.setModel(jsonData);
				var oTemplate = new sap.ui.core.ListItem({
					key: "{id}",
					text: "{name}"
				});
				dropdown_snppl.bindItems("/", oTemplate)
			}

			function fError(oEvent) {}
		}
	},
	snpplSelectionFinish: function(oEvent) {
		final_item = "";
		var selectedItems = oEvent.getParameter("selectedItems");
		console.log(selectedItems);
		for (var i = 0; i < selectedItems.length; i++) {
			var item = selectedItems[i].getText();
			console.log(item);
			if (final_item === "") {
				final_item = item;
			} else {
				final_item = final_item + "," + item;
			}
		}
		console.log(final_item);
		this.onPressFetch();
	},
	createFirstTable: function() {
		var that = this;
		var oTable = new sap.ui.table.Table("data1", {
			visibleRowCount: 5,
			title: "Finished Goods SKU details"
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Reference",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField().addStyleClass("wordBreak").bindProperty("value", "REF_NUMBER"),
			sortProperty: "REF_NUMBER",
			filterProperty: "REF_NUMBER",
			width: "100px"
		}));
		oTable.getColumns()[0].setVisible(false);
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_CODE"),
			sortProperty: "SAP_SKU_CODE",
			filterProperty: "SAP_SKU_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP/ BASIS Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAP_BASIS_CODE"),
			sortProperty: "BAP_BASIS_CODE",
			filterProperty: "BAP_BASIS_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SKU Product Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DESC"),
			sortProperty: "DESC",
			filterProperty: "DESC",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First estimate Production week to hit required first Despatch",
				wrapping: true
			}),
			template: new sap.ui.commons.DatePicker({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EST_PROD_WEEK_INPT"),
			sortProperty: "EST_PROD_WEEK_INPT",
			filterProperty: "EST_PROD_WEEK_INPT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Production End Date",
				wrapping: true
			}),
			template: new sap.ui.commons.DatePicker({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRODUCTION_END_DATE"),
			sortProperty: "PRODUCTION_END_DATE",
			filterProperty: "PRODUCTION_END_DATE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Forecast/ Fixed Quantities",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIXED_QUANTITIES"),
			sortProperty: "FIXED_QUANTITIES",
			filterProperty: "FIXED_QUANTITIES",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Site(s)",
				wrapping: true
			}),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allSites",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SITES"
						},
						text: {
							path: "SITES"
						}
					})
				},
				selectedKeys: {
					path: 'PROD_SITES',
					formatter: function(value) {
						if (value) {
							value = value.split(",");
							return value;
						}
					}
				},
				selectionFinish: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak"),
			sortProperty: "PROD_SITES",
			filterProperty: "PROD_SITES",
			width: "250px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Indication of run-out rules",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: {
					path: "/allrules",

					template: new sap.ui.core.ListItem({
						key: {
							path: "RULES"
						},
						text: {
							path: "RULES"
						}
					})
				},
				selectedKey: {
					path: "IND_RUN_OUT_RULES",
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak"),
			sortProperty: "IND_RUN_OUT_RULES",
			filterProperty: "IND_RUN_OUT_RULES",
			width: "200px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First Despatches",
				wrapping: true
			}),
			template: new sap.ui.commons.DatePicker({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIRST_DESP"),
			sortProperty: "FIRST_DESP",
			filterProperty: "FIRST_DESP",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ISSCOM Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ISSCOM_CODE"),
			sortProperty: "ISSCOM_CODE",
			filterProperty: "ISSCOM_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quarantine period for finished product on first production required?",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "QUANRANTINE_INPT"),
			sortProperty: "QUANRANTINE_INPT",
			filterProperty: "QUANRANTINE_INPT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BBN Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BBN_CODE"),
			sortProperty: "BBN_CODE",
			filterProperty: "BBN_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MMI/ Concentrate BOM/ Pack Size Configuration",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CONCENTRATE_BOM"),
			sortProperty: "CONCENTRATE_BOM",
			filterProperty: "CONCENTRATE_BOM",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PSS Number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PSS_REQ_INPT"),
			sortProperty: "PSS_REQ_INPT",
			filterProperty: "PSS_REQ_INPT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Shelf-Life",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SHELF"),
			sortProperty: "SHELF",
			filterProperty: "SHELF",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Comments",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "COMMENTS"),
			sortProperty: "COMMENTS",
			filterProperty: "COMMENTS",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tonica Meeting Minutes",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: {
					path: "/yes_no",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SELECT"
						},
						text: {
							path: "SELECT"
						}
					})
				},
				selectedKey: {
					path: 'TONICA_MEET_MINS',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function(e) {
					that.updateTable1(e, this, oTable);
				}
			}).addStyleClass("wordBreak"),
			sortProperty: "TONICA_MEET_MINS",
			filterProperty: "TONICA_MEET_MINS",
			width: "100px"
		}));
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams);
		this.getView().getModel("df_request_model").read("/select", null, null, false, success17a, failed17a);

		function success17a(data) {
			jsonParams.yes_no.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SELECT: data.results[i].SELECT
				};
				jsonParams.yes_no.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17a() {}
		this.getView().getModel("df_request_model").read("/prod_sites", null, null, false, success17b, failed17b);

		function success17b(data) {
			jsonParams.allSites.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					//SITEID: data.results[i].SITE,
					SITES: data.results[i].SITE_NAME
				};
				jsonParams.allSites.push(oMessage);
				
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17b() {}

		this.getView().getModel("df_request_model").read("/rules", null, null, false, success17z3, failed17z3);

		function success17z3(data) {
			jsonParams.allrules.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					RULES: data.results[i].RULES
				};
				jsonParams.allrules.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z3() {}
		console.log(jsonParams);
		//jsonModel = new sap.ui.model.json.JSONModel(jsonParams);
		oTable.setModel(jsonModel);

		oTable.bindRows("/allData1");
		this.getView().byId("first_table").destroyContent();
		this.getView().byId("first_table").addContent(oTable);
	},

	createNextTable: function() {
		var that = this;
		var oTable = new sap.ui.table.Table("data2", {
			visibleRowCount: 5,
			title: "Repack SKU details only"
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Reference",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField().addStyleClass("wordBreak").bindProperty("value", "REF_NUMBER"),
			sortProperty: "REF_NUMBER",
			filterProperty: "REF_NUMBER",
			width: "100px"
		}));
		oTable.getColumns()[0].setVisible(false);
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_CODE"),
			sortProperty: "SAP_SKU_CODE",
			filterProperty: "SAP_SKU_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP/ BASIS Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAP_BASIS_CODE"),
			sortProperty: "BAP_BASIS_CODE",
			filterProperty: "BAP_BASIS_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SKU Product Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DESC"),
			sortProperty: "DESC",
			filterProperty: "DESC",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Input SKU's that are used for the new pallet",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "INPUT_SKU_PALLET"),
			sortProperty: "INPUT_SKU_PALLET",
			filterProperty: "INPUT_SKU_PALLET",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Repack Description Input SKU",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "REPACK_DESCRIPTION"),
			sortProperty: "REPACK_DESCRIPTION",
			filterProperty: "REPACK_DESCRIPTION",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First Production Input SKU",
				wrapping: true
			}),
			template: new sap.ui.commons.DatePicker({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIRST_PRODUCTION_INPT_SKU"),
			sortProperty: "FIRST_PRODUCTION_INPT_SKU",
			filterProperty: "FIRST_PRODUCTION_INPT_SKU",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Last Production Input SKU",
				wrapping: true
			}),
			template: new sap.ui.commons.DatePicker({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "LAST_PRODUCTION_INPT_SKU"),
			sortProperty: "LAST_PRODUCTION_INPT_SKU",
			filterProperty: "LAST_PRODUCTION_INPT_SKU",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quantity input sku",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "QUANTITIES_SKU"),
			sortProperty: "QUANTITIES_SKU",
			filterProperty: "QUANTITIES_SKU",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Comments",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "COMMENTS"),
			sortProperty: "COMMENTS",
			filterProperty: "COMMENTS",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tonica Meeting Minutes",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: {
					path: "/yes_no",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SELECT"
						},
						text: {
							path: "SELECT"
						}
					})
				},
				selectedKey: {
					path: 'TONICA_MEET_MINS',
					formatter: function(value) {
						if (value === null) {
							value = "";
						}
						return value;
					}
				},
				change: function(e) {
					that.updateTable2(e, this, oTable);
				}
			}).addStyleClass("wordBreak"),
			sortProperty: "TONICA_MEET_MINS",
			filterProperty: "TONICA_MEET_MINS",
			width: "100px"
		}));
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams1);
		this.getView().getModel("df_request_model").read("/select", null, null, false, success17a, failed17a);

		function success17a(data) {
			jsonParams1.yes_no.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SELECT: data.results[i].SELECT
				};
				jsonParams1.yes_no.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams1);
		}

		function failed17a() {}
		oTable.setModel(jsonModel);

		oTable.bindRows("/allData2");
		this.getView().byId("next_table").destroyContent();
		this.getView().byId("next_table").addContent(oTable);
	},
	onPressFetch: function() {
		var that = this;
		//var df_id = [];
		df_sku = [];
		df_id = [];
		console.log("in onPressFetch");
		console.log(final_item);
		var final1 = [];
		final1 = final_item.split(",");
		for (var i = 0; i < final1.length; i++) {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read("/DF_DB?$filter=SNPPL02 eq '" + final1[i] + "' and TONICA_MEET_MINS eq 'YES' and PROJECT_TYPE ne 'Delist'", null, null, true, s, f);

			function s(data) {
				console.log(data);
				for (var i = 0; i < data.results.length; i++) {
					df_id.push(data.results[i].DF_ID);
					df_sku.push({
						id: data.results[i].DF_ID,
						sku: data.results[i].SAP_SKU_CODE
					});
				}
				console.log(df_id);
				console.log(df_sku);
				var unique = [];
				$.each(df_id, function(i, el) {
					if ($.inArray(el, unique) === -1) unique.push(el);
				});
				console.log(unique);
				var dropdown = that.getView().byId("df_req");
				dropdown.setModel(oModel);
				var dropDownData = [];
				dropDownData.push({
					id: ""
				});
				for (var j = 0; j < unique.length; j++) {
					dropDownData.push({
						id: unique[j]
					});
				}
				var jsonData = new sap.ui.model.json.JSONModel();
				jsonData.setData(dropDownData);
				dropdown.setModel(jsonData);
				var oTemplate = new sap.ui.core.ListItem({
					key: "{id}",
					text: "{id}"
				});
				dropdown.bindItems("/", oTemplate);
			}

			function f() {}
		}

	},
	onSelectDF: function() {
		var that = this;
		var data1 = [];
		sap.ui.getCore().byId("data1").getModel().getData().allData1 = [];
		sap.ui.getCore().byId("data2").getModel().getData().allData2 = [];
		console.log("select DF");
		console.log(this.getView().byId("df_req").getSelectedKey());
		var selected_df = this.getView().byId("df_req").getSelectedKey();
		console.log(df_sku);
		for (var j = 0; j < df_sku.length; j++) {
			if (df_sku[j].id === selected_df) {
				console.log(df_sku[j].id + df_sku[j].sku);
				var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
				oModel.read("/DF_DB?$filter=DF_ID eq '" + df_sku[j].id + "' and SAP_SKU_CODE eq '" + df_sku[j].sku +
					"' and PROJECT_GROUP ne 'Repack Extern' and PROJECT_GROUP ne 'Repack In-house'", null, null, false, s, f);

				function s(data) {
					console.log(data);
					if (data.results.length > 0) {
						that.getView().byId("title").setValue(data.results[0].TITLE);
						that.getView().byId("nim").setValue(data.results[0].NIM1);
						that.getView().byId("market").setValue(data.results[0].SELLING_COUNTRY);
						that.getView().byId("mapx").setValue(data.results[0].MAPX_DECISION_REQ);
						that.getView().byId("type").setValue(data.results[0].PROJECT_TYPE);

						sap.ui.getCore().byId("data1").getModel().getData().allData1.push({
							REF_NUMBER: data.results[0].REF_NUMBER,
							SAP_SKU_CODE: data.results[0].SAP_SKU_CODE,
							BAP_BASIS_CODE: data.results[0].BAP_BASIS_CODE,
							DESC: data.results[0].DESC,
							EST_PROD_WEEK_INPT: data.results[0].EST_PROD_WEEK_INPT,
							PRODUCTION_END_DATE: data.results[0].PRODUCTION_END_DATE,
							FIXED_QUANTITIES: data.results[0].FIXED_QUANTITIES,
							PROD_SITES: data.results[0].PROD_SITES,
							IND_RUN_OUT_RULES: data.results[0].IND_RUN_OUT_RULES,
							FIRST_DESP: data.results[0].FIRST_DESP,
							ISSCOM_CODE: data.results[0].ISSCOM_CODE,
							QUANRANTINE_INPT: data.results[0].QUANRANTINE_INPT,
							BBN_CODE: data.results[0].BBN_CODE,
							CONCENTRATE_BOM: data.results[0].CONCENTRATE_BOM,
							PSS_REQ_INPT: data.results[0].PSS_REQ_INPT,
							SHELF: data.results[0].SHELF,
							COMMENTS: data.results[0].COMMENTS,
							INPUT_SKU_PALLET: data.results[0].INPUT_SKU_PALLET,
							REPACK_DESCRIPTION: data.results[0].REPACK_DESCRIPTION,
							FIRST_PRODUCTION_INPT_SKU: data.results[0].FIRST_PRODUCTION_INPT_SKU,
							LAST_PRODUCTION_INPT_SKU: data.results[0].LAST_PRODUCTION_INPT_SKU,
							QUANTITIES_SKU: data.results[0].QUANTITIES_SKU,
							TONICA_MEET_MINS: data.results[0].TONICA_MEET_MINS
						});
						sap.ui.getCore().byId("data1").getModel().setData(sap.ui.getCore().byId("data1").getModel().getData());

					}
				}

				function f() {}
			}
		}
		sap.ui.getCore().byId("data1").getModel().setData(sap.ui.getCore().byId("data1").getModel().getData());
		for (var j = 0; j < df_sku.length; j++) {
			if (df_sku[j].id === selected_df) {
				oModel.read("/DF_DB?$filter=DF_ID eq '" + df_sku[j].id + "' and SAP_SKU_CODE eq '" + df_sku[j].sku +
					"' and (PROJECT_GROUP eq 'Repack Extern' or PROJECT_GROUP eq 'Repack In-house')", null, null, false, s1, f1);

				function s1(data) {
					console.log(data);
					if (data.results.length > 0) {
						that.getView().byId("title").setValue(data.results[0].TITLE);
						that.getView().byId("nim").setValue(data.results[0].NIM1);
						that.getView().byId("market").setValue(data.results[0].SELLING_COUNTRY);
						that.getView().byId("mapx").setValue(data.results[0].MAPX_DECISION_REQ);
						that.getView().byId("type").setValue(data.results[0].PROJECT_TYPE);
						sap.ui.getCore().byId("data2").getModel().getData().allData2.push({
							REF_NUMBER: data.results[0].REF_NUMBER,
							SAP_SKU_CODE: data.results[0].SAP_SKU_CODE,
							BAP_BASIS_CODE: data.results[0].BAP_BASIS_CODE,
							DESC: data.results[0].DESC,
							EST_PROD_WEEK_INPT: data.results[0].EST_PROD_WEEK_INPT,
							PRODUCTION_END_DATE: data.results[0].PRODUCTION_END_DATE,
							FIXED_QUANTITIES: data.results[0].FIXED_QUANTITIES,
							PROD_SITES: data.results[0].PROD_SITES,
							IND_RUN_OUT_RULES: data.results[0].IND_RUN_OUT_RULES,
							FIRST_DESP: data.results[0].FIRST_DESP,
							ISSCOM_CODE: data.results[0].ISSCOM_CODE,
							QUANRANTINE_INPT: data.results[0].QUANRANTINE_INPT,
							BBN_CODE: data.results[0].BBN_CODE,
							CONCENTRATE_BOM: data.results[0].CONCENTRATE_BOM,
							PSS_REQ_INPT: data.results[0].PSS_REQ_INPT,
							SHELF: data.results[0].SHELF,
							COMMENTS: data.results[0].COMMENTS,
							INPUT_SKU_PALLET: data.results[0].INPUT_SKU_PALLET,
							REPACK_DESCRIPTION: data.results[0].REPACK_DESCRIPTION,
							FIRST_PRODUCTION_INPT_SKU: data.results[0].FIRST_PRODUCTION_INPT_SKU,
							LAST_PRODUCTION_INPT_SKU: data.results[0].LAST_PRODUCTION_INPT_SKU,
							QUANTITIES_SKU: data.results[0].QUANTITIES_SKU,
							TONICA_MEET_MINS: data.results[0].TONICA_MEET_MINS
						});

						//	console.log(data1);
						console.log(sap.ui.getCore().byId("data1").getModel().getData());
						sap.ui.getCore().byId("data2").getModel().setData(sap.ui.getCore().byId("data2").getModel().getData());
					}
				}

				function f1() {}
			}
		}
sap.ui.getCore().byId("data2").getModel().setData(sap.ui.getCore().byId("data2").getModel().getData());
	},
	onSelectProject: function() {
		console.log("delist selected");
		sap.ui.getCore().byId("data1").getModel().getData().allData1 = [];
		sap.ui.getCore().byId("data2").getModel().getData().allData2 = [];
		sap.ui.getCore().byId("data1").getModel().setData(sap.ui.getCore().byId("data1").getModel().getData());
		sap.ui.getCore().byId("data2").getModel().setData(sap.ui.getCore().byId("data2").getModel().getData());
		var that = this;
		that.getView().byId("title").setValue("");
		that.getView().byId("nim").setValue("");
		that.getView().byId("market").setValue("");
		that.getView().byId("mapx").setValue("");
		that.getView().byId("type").setValue("");

		that.getView().byId("materials_dropdown").setEnabled(false);
		that.getView().byId("snppl_dropdown").setEnabled(false);
		/*	var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		var dropdown_material = this.getView().byId("materials_dropdown");
		dropdown_material.setModel(oModel);
		var dropDownData = [];
		var jsonData = new sap.ui.model.json.JSONModel();
		dropDownData.push({
			material_id: "",
			material_name: ""
		});
		jsonData.setData(dropDownData);
		dropdown_material.setModel(jsonData);
		var oTemplate = new sap.ui.core.ListItem({
			key: "{material_id}",
			text: "{material_name}"
		});
		dropdown_material.bindItems("/", oTemplate);

		var dropdown_snppl = this.getView().byId("snppl_dropdown");
		dropdown_snppl.setModel(oModel);

		var jsonData = new sap.ui.model.json.JSONModel();

		jsonData.setData(dropDownData);
		dropdown_snppl.setModel(jsonData);
		var oTemplate = new sap.ui.core.ListItem({
			key: "{id}",
			text: "{name}"
		});
		dropdown_snppl.bindItems("/", oTemplate)

		var that = this;*/
		//var df_id = [];
		df_id = [];
		df_sku = [];
		console.log("in select delist");
		var prj_type = that.getView().byId("proj_type").getSelectedKey();
		if (prj_type === "") {
			that.getView().byId("materials_dropdown").setEnabled(true);
			that.getView().byId("snppl_dropdown").setEnabled(true);
		}
		console.log(prj_type);
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oModel.read("/DF_DB?$filter=PROJECT_TYPE eq '" + prj_type + "' and TONICA_MEET_MINS eq 'YES'", null, null, true, s, f);

		function s(data) {
			console.log(data);
			for (var i = 0; i < data.results.length; i++) {
				df_id.push(data.results[i].DF_ID);
				df_sku.push({
					id: data.results[i].DF_ID,
					sku: data.results[i].SAP_SKU_CODE
				});
			}
			console.log(df_id);
			console.log(df_sku);
			var unique = [];
			$.each(df_id, function(i, el) {
				if ($.inArray(el, unique) === -1) unique.push(el);
			});
			console.log(unique);
			var dropdown = that.getView().byId("df_req");
			dropdown.setModel(oModel);
			var dropDownData = [];
			dropDownData.push({
				id: ""
			});
			for (var j = 0; j < unique.length; j++) {
				dropDownData.push({
					id: unique[j]
				});
			}
			var jsonData = new sap.ui.model.json.JSONModel();
			jsonData.setData(dropDownData);
			dropdown.setModel(jsonData);
			var oTemplate = new sap.ui.core.ListItem({
				key: "{id}",
				text: "{id}"
			});
			dropdown.bindItems("/", oTemplate);
		}

		function f() {}

	},
	updateTable2: function(e, that, oTable) {
		var this1 = this;
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		console.log(that.sId.split("-"));
		var selectedIndex = "";
		var field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		console.log(oTable.getRows()[selectedIndex].getCells()[1].getValue());
		var path = e.getSource().getBindingContext().getPath();
		var selected_row1 = path.split("/")[2];
		console.log(oTable.getContextByIndex(selected_row1).getProperty("REF_NUMBER"))
		var ref = oTable.getContextByIndex(selected_row1).getProperty("REF_NUMBER");
		var sku = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var bap = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var desc = oTable.getRows()[selectedIndex].getCells()[2].getValue();
		var input = oTable.getRows()[selectedIndex].getCells()[3].getValue();
		var repack = oTable.getRows()[selectedIndex].getCells()[4].getValue();
		var first = oTable.getRows()[selectedIndex].getCells()[5].getValue();
		var last = oTable.getRows()[selectedIndex].getCells()[6].getValue();
		var quantity = oTable.getRows()[selectedIndex].getCells()[7].getValue();
		var comment = oTable.getRows()[selectedIndex].getCells()[8].getValue();
		var tonica = oTable.getRows()[selectedIndex].getCells()[9].getValue();

		oModel.read("/DF_DB('" + ref + "')", null, null, false, s1, f1);

		function s1(data) {
			console.log(data);

			var update_data = data;

			var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
			userModel.attachRequestCompleted(function() {
				var user_department = JSON.parse(userModel.getJSON()).department;
				modified_by = JSON.parse(userModel.getJSON()).username;
			});

			var modified1 = new Date();
			var month_mod = modified1.getMonth() + 1;
			var date_log = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();

			console.log(update_data);

			update_data.MOD_DATE = date_log;
			update_data.MOD_USER = modified_by;
			update_data.SAP_SKU_CODE = sku;
			update_data.BAP_BASIS_CODE = bap;
			update_data.DESC = desc;
			update_data.INPUT_SKU_PALLET = input;
			update_data.REPACK_DESCRIPTION = repack;
			update_data.FIRST_PRODUCTION_INPT_SKU = first;
			update_data.LAST_PRODUCTION_INPY_SKU = last;
			update_data.QUANTITIES_SKU = quantity;
			update_data.COMMENTS = comment;
			update_data.TONICA_MEET_MINS = tonica;

			oModel.update("/DF_DB('" + ref + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update successful");
				this1.onSelectDF();
			}

			function updateFailed() {}
		}

		function f1() {}
	},
	updateTable1: function(e, that, oTable) {
		var this1 = this;
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		console.log(that.sId.split("-"));
		var selectedIndex = "";
		var field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		console.log(oTable.getRows()[selectedIndex].getCells()[1].getValue());
		var path = e.getSource().getBindingContext().getPath();
		var selected_row1 = path.split("/")[2];
		console.log(oTable.getContextByIndex(selected_row1).getProperty("REF_NUMBER"))
		var ref = oTable.getContextByIndex(selected_row1).getProperty("REF_NUMBER");
		var sku = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var bap = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var desc = oTable.getRows()[selectedIndex].getCells()[2].getValue();
		var first = oTable.getRows()[selectedIndex].getCells()[3].getValue();
		var end = oTable.getRows()[selectedIndex].getCells()[4].getValue();
		var fixed = oTable.getRows()[selectedIndex].getCells()[5].getValue();
		var site = "";
		var site1 = oTable.getRows()[selectedIndex].getCells()[6].getSelectedItems();
		console.log(site1);
		for (var i = 0; i < site1.length; i++) {
			if (i === 0 && site1[0].getText() !== "") {
				site = site1[0].getText();
			} else {
				if (site === "") {
					site = site1[i].getText();
				} else {
					if (site1[i].getText() !== "") {
						site = site + "," + site1[i].getText();
					}
				}
			}
		}
		console.log(site1);
		console.log(site);
		var rule = oTable.getRows()[selectedIndex].getCells()[7].getValue();
		var despatch = oTable.getRows()[selectedIndex].getCells()[8].getValue();
		var isscom = oTable.getRows()[selectedIndex].getCells()[9].getValue();
		var quarantine = oTable.getRows()[selectedIndex].getCells()[10].getValue();
		var bbn = oTable.getRows()[selectedIndex].getCells()[11].getValue();
		var mmi = oTable.getRows()[selectedIndex].getCells()[12].getValue();
		var pss = oTable.getRows()[selectedIndex].getCells()[13].getValue();
		var shelf = oTable.getRows()[selectedIndex].getCells()[14].getValue();
		var comment = oTable.getRows()[selectedIndex].getCells()[15].getValue();
		var tonica = oTable.getRows()[selectedIndex].getCells()[16].getValue();

		console.log(bap);

		oModel.read("/DF_DB('" + ref + "')", null, null, false, s1, f1);

		function s1(data) {
			var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
			userModel.attachRequestCompleted(function() {
				var user_department = JSON.parse(userModel.getJSON()).department;
				modified_by = JSON.parse(userModel.getJSON()).username;
			});

			var modified1 = new Date();
			var month_mod = modified1.getMonth() + 1;
			var date_log = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();

			console.log(data);
			var update_data = data;
			console.log(update_data);

			update_data.MOD_DATE = date_log;
			update_data.MOD_USER = modified_by;
			update_data.SAP_SKU_CODE = sku;
			update_data.BAP_BASIS_CODE = bap;
			update_data.DESC = desc;
			update_data.EST_PROD_WEEK_INPT = first;
			update_data.PRODUCTION_END_DATE = end;
			update_data.FIXED_QUANTITIES = fixed;
			update_data.PROD_SITES = site;
			update_data.IND_RUN_OUT_RULES = rule;
			update_data.FIRST_DESP = despatch;
			update_data.ISSCOM_CODE = isscom;
			update_data.QUANRANTINE_INPT = quarantine;
			update_data.BBN_CODE = bbn;
			update_data.CONCENTRATE_BOM = mmi;
			update_data.PSS_REQ_INPT = pss;
			update_data.SHELF = shelf;
			update_data.COMMENTS = comment;
			update_data.TONICA_MEET_MINS = tonica;

			oModel.update("/DF_DB('" + ref + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update successful table1")
				this1.onSelectDF();
			}

			function updateFailed() {}
		}

		function f1() {}
	},
	onPressBack: function() {
		console.log(df_id);
		var unique = [];
		$.each(df_id, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		console.log(unique);
		var seq = unique.length;
		var selected_df = this.getView().byId("df_req").getSelectedKey();
		for (var i = 0; i < unique.length; i++) {
			if (unique[i] === selected_df) {
				seq = i;
			}
		}
		console.log(seq);
		var new_seq = seq - 1;
		console.log(new_seq);
		this.getView().byId("df_req").setSelectedKey(unique[new_seq]);
		this.onSelectDF();

		if (this.getView().byId("df_req").getSelectedKey() === "") {
			/*this.getView().byId("title").setValue("");
			this.getView().byId("nim").setValue("");
			this.getView().byId("market").setValue("");
			this.getView().byId("mapx").setValue("");
			this.getView().byId("type").setValue("");
			sap.ui.getCore().byId("data1").getModel().getData().allData1 = [];
			sap.ui.getCore().byId("data2").getModel().getData().allData2 = [];
			sap.ui.getCore().byId("data1").getModel().setData(sap.ui.getCore().byId("data1").getModel().getData());
			sap.ui.getCore().byId("data2").getModel().setData(sap.ui.getCore().byId("data2").getModel().getData());*/
			this.onPressBack();
		}
	},
	onPressNext: function() {
		console.log(df_id);
		var unique = [];
		$.each(df_id, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		console.log(unique);

		var seq = -1;
		var selected_df = this.getView().byId("df_req").getSelectedKey();
		for (var i = 0; i < unique.length; i++) {
			if (unique[i] === selected_df) {
				seq = i;
			}
		}
		console.log(seq);
		var new_seq = seq + 1;
		console.log(new_seq);
		this.getView().byId("df_req").setSelectedKey(unique[new_seq]);
		this.onSelectDF();

		if (this.getView().byId("df_req").getSelectedKey() === "") {
			/*this.getView().byId("title").setValue("");
			this.getView().byId("nim").setValue("");
			this.getView().byId("market").setValue("");
			this.getView().byId("mapx").setValue("");
			this.getView().byId("type").setValue("");

			sap.ui.getCore().byId("data1").getModel().getData().allData1 = [];
			sap.ui.getCore().byId("data2").getModel().getData().allData2 = [];
			sap.ui.getCore().byId("data1").getModel().setData(sap.ui.getCore().byId("data1").getModel().getData());
			sap.ui.getCore().byId("data2").getModel().setData(sap.ui.getCore().byId("data2").getModel().getData());*/
			this.onPressNext();
		}
	},
	onPressBNL: function(){
	    this.getView().byId("sku_meeting_main").removeStyleClass("showClass");
	    this.getView().byId("bnl_detail").removeStyleClass("hideClass");
	    this.getView().byId("bn_det2").removeStyleClass("hideClass");
	    this.getView().byId("bn_det3").removeStyleClass("hideClass");
	    this.getView().byId("first_table").removeStyleClass("hideClass");
	    this.getView().byId("next_table").removeStyleClass("hideClass");
	    
	    this.getView().byId("sku_meeting_main").addStyleClass("hideClass");
	    this.getView().byId("bnl_detail").addStyleClass("showClass");
	    this.getView().byId("bn_det2").addStyleClass("showClass");
	    this.getView().byId("bn_det3").addStyleClass("showClass");
	    this.getView().byId("first_table").addStyleClass("showClass");
	    this.getView().byId("next_table").addStyleClass("showClass");
	    
	    this.getView().byId("fr_detail").removeStyleClass("showClass");
	    this.getView().byId("fr_det2").removeStyleClass("showClass");
	    this.getView().byId("fr_det3").removeStyleClass("showClass");
	    this.getView().byId("fr_detail").addStyleClass("hideClass");
	    this.getView().byId("fr_det2").addStyleClass("hideClass");
	    this.getView().byId("fr_det3").addStyleClass("hideClass");
	    
	    this.getView().byId("first_table_fr").removeStyleClass("showClass");
	    this.getView().byId("next_table_fr").removeStyleClass("showClass");
	    this.getView().byId("first_table_fr").addStyleClass("hideClass");
	    this.getView().byId("next_table_fr").addStyleClass("hideClass");
	    
	    this.getView().byId("gb_det2").removeStyleClass("showClass");
	    this.getView().byId("gb_det2").addStyleClass("hideClass");
	    this.getView().byId("gb_det3").removeStyleClass("showClass");
	    this.getView().byId("gb_det3").addStyleClass("hideClass");
	    this.getView().byId("first_table_gb").removeStyleClass("showClass");
	    this.getView().byId("first_table_gb").addStyleClass("hideClass");
	    this.getView().byId("sec_table_gb").removeStyleClass("showClass");
	    this.getView().byId("sec_table_gb").addStyleClass("hideClass");
	    this.getView().byId("third_table_gb").removeStyleClass("showClass");
	    this.getView().byId("third_table_gb").addStyleClass("hideClass");
	},
	onPressFR: function(){
	    this.getView().byId("sec_table_gb").removeStyleClass("showClass");
	    this.getView().byId("sec_table_gb").addStyleClass("hideClass");
	    this.getView().byId("third_table_gb").removeStyleClass("showClass");
	    this.getView().byId("third_table_gb").addStyleClass("hideClass");
	    this.getView().byId("first_table_gb").removeStyleClass("showClass");
	    this.getView().byId("first_table_gb").addStyleClass("hideClass");
	    this.getView().byId("gb_det3").removeStyleClass("showClass");
	    this.getView().byId("gb_det3").addStyleClass("hideClass");
	    this.getView().byId("gb_det2").removeStyleClass("showClass");
	    this.getView().byId("gb_det2").addStyleClass("hideClass");
	    this.getView().byId("sku_meeting_main").removeStyleClass("showClass");
	    this.getView().byId("sku_meeting_main").addStyleClass("hideClass");
	    this.getView().byId("bnl_detail").removeStyleClass("showClass");
	    this.getView().byId("bn_det2").removeStyleClass("showClass");
	    this.getView().byId("bn_det3").removeStyleClass("showClass");
	    this.getView().byId("first_table").removeStyleClass("showClass");
	    this.getView().byId("next_table").removeStyleClass("showClass");
	   
	    this.getView().byId("bnl_detail").addStyleClass("hideClass");
	    this.getView().byId("bn_det2").addStyleClass("hideClass");
	    this.getView().byId("bn_det3").addStyleClass("hideClass");
	    this.getView().byId("first_table").addStyleClass("hideClass");
	    this.getView().byId("next_table").addStyleClass("hideClass");
	    
	    this.getView().byId("fr_detail").removeStyleClass("hideClass");
	    this.getView().byId("fr_det2").removeStyleClass("hideClass");
	    this.getView().byId("fr_det3").removeStyleClass("hideClass");
	    this.getView().byId("fr_detail").addStyleClass("showClass");
	    this.getView().byId("fr_det2").addStyleClass("showClass");
	    this.getView().byId("fr_det3").addStyleClass("showClass");
	    
	    this.getView().byId("first_table_fr").removeStyleClass("hideClass");
	    this.getView().byId("next_table_fr").removeStyleClass("hideClass");
	    this.getView().byId("first_table_fr").addStyleClass("showClass");
	    this.getView().byId("next_table_fr").addStyleClass("showClass");
	    
	    this.createDFTableFR();
	    this.createFGTableFR();
	},
	onPressGB: function(){
	    this.getView().byId("sec_table_gb").removeStyleClass("hideClass");
	    this.getView().byId("sec_table_gb").addStyleClass("showClass");
	    this.getView().byId("third_table_gb").removeStyleClass("hideClass");
	    this.getView().byId("third_table_gb").addStyleClass("showClass");
	    this.getView().byId("first_table_gb").removeStyleClass("hideClass");
	    this.getView().byId("first_table_gb").addStyleClass("showClass");
	    this.getView().byId("gb_det3").removeStyleClass("hideClass");
	    this.getView().byId("gb_det3").addStyleClass("showClass");
	    this.getView().byId("gb_det2").removeStyleClass("hideClass");
	    this.getView().byId("gb_det2").addStyleClass("showClass");
	    this.getView().byId("sku_meeting_main").removeStyleClass("showClass");
	    this.getView().byId("sku_meeting_main").addStyleClass("hideClass");
	    this.getView().byId("bnl_detail").removeStyleClass("showClass");
	    this.getView().byId("bn_det2").removeStyleClass("showClass");
	    this.getView().byId("bn_det3").removeStyleClass("showClass");
	    this.getView().byId("first_table").removeStyleClass("showClass");
	    this.getView().byId("next_table").removeStyleClass("showClass");
	   
	    this.getView().byId("bnl_detail").addStyleClass("hideClass");
	    this.getView().byId("bn_det2").addStyleClass("hideClass");
	    this.getView().byId("bn_det3").addStyleClass("hideClass");
	    this.getView().byId("first_table").addStyleClass("hideClass");
	    this.getView().byId("next_table").addStyleClass("hideClass");
	    
	    this.getView().byId("fr_detail").removeStyleClass("showClass");
	    this.getView().byId("fr_det2").removeStyleClass("showClass");
	    this.getView().byId("fr_det3").removeStyleClass("showClass");
	    this.getView().byId("fr_detail").addStyleClass("hideClass");
	    this.getView().byId("fr_det2").addStyleClass("hideClass");
	    this.getView().byId("fr_det3").addStyleClass("hideClass");
	    
	    this.getView().byId("first_table_fr").removeStyleClass("showClass");
	    this.getView().byId("next_table_fr").removeStyleClass("showClass");
	    this.getView().byId("first_table_fr").addStyleClass("hideClass");
	    this.getView().byId("next_table_fr").addStyleClass("hideClass");
	    
	    this.createDFTableGB();
	    this.createSecondTableGB();
	    this.createThirdTableGB();
	    this.onFetchDFGB();
	},
	onBeforeRendering: function(){
	    this.getView().byId("df_req_gb").setVisible(false);
	    this.getView().byId("sec_table_gb").removeStyleClass("showClass");
	    this.getView().byId("sec_table_gb").addStyleClass("hideClass");
	    this.getView().byId("third_table_gb").removeStyleClass("showClass");
	    this.getView().byId("third_table_gb").addStyleClass("hideClass");
	    this.getView().byId("first_table_gb").removeStyleClass("showClass");
	    this.getView().byId("first_table_gb").addStyleClass("hideClass");
	    this.getView().byId("gb_det3").removeStyleClass("showClass");
	    this.getView().byId("gb_det3").addStyleClass("hideClass");
	    this.getView().byId("gb_det2").removeStyleClass("showClass");
	    this.getView().byId("gb_det2").addStyleClass("hideClass");
	    this.getView().byId("sku_meeting_main").removeStyleClass("hideClass");
	    this.getView().byId("sku_meeting_main").addStyleClass("showClass");
	    this.getView().byId("bnl_detail").removeStyleClass("showClass");
	    this.getView().byId("bn_det2").removeStyleClass("showClass");
	    this.getView().byId("bn_det3").removeStyleClass("showClass");
	    this.getView().byId("first_table").removeStyleClass("showClass");
	    this.getView().byId("next_table").removeStyleClass("showClass");
	   
	    this.getView().byId("bnl_detail").addStyleClass("hideClass");
	    this.getView().byId("bn_det2").addStyleClass("hideClass");
	    this.getView().byId("bn_det3").addStyleClass("hideClass");
	    this.getView().byId("first_table").addStyleClass("hideClass");
	    this.getView().byId("next_table").addStyleClass("hideClass");
	    
	    this.getView().byId("fr_detail").removeStyleClass("showClass");
	    this.getView().byId("fr_det2").removeStyleClass("showClass");
	    this.getView().byId("fr_det3").removeStyleClass("showClass");
	    this.getView().byId("fr_detail").addStyleClass("hideClass");
	    this.getView().byId("fr_det2").addStyleClass("hideClass");
	    this.getView().byId("fr_det3").addStyleClass("hideClass");
	    
	    this.getView().byId("first_table_fr").removeStyleClass("showClass");
	    this.getView().byId("next_table_fr").removeStyleClass("showClass");
	    this.getView().byId("first_table_fr").addStyleClass("hideClass");
	    this.getView().byId("next_table_fr").addStyleClass("hideClass");
	    
	    var dropdown_group = this.getView().byId("proj_grp_fr");
	    var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	    dropdown_group.setModel(oModel);
	    
	    oModel.read("/project_group", null, null, true, fSuccess111, fError111);

	 		function fSuccess111(data) {
	 			var dropDownData = [];
	 			var jsonData = new sap.ui.model.json.JSONModel();
	 			dropDownData.push({
	 				group_id: "",
	 				group_name: ""
	 			});
	 			for (var i = 0; i < data.results.length; i++) {
	 			    var sc;
	 			    if(data.results[i].GROUP_NAME !== ""){
	 			        var splitval = data.results[i].GROUP_NAME.split(" ");
	 			        sc = splitval[0]
	 			    }
	 			    if(sc !== "SC"){
	 				dropDownData.push({
	 					group_id: data.results[i].GROUP_ID,
	 					group_name: data.results[i].GROUP_NAME
	 				});
	 			    }
	 			}
	 			jsonData.setData(dropDownData);
	 			dropdown_group.setModel(jsonData);
	 			var oTemplate = new sap.ui.core.ListItem({
	 				key: "{group_name}",
	 				text: "{group_name}"
	 			});
	 			dropdown_group.bindItems("/", oTemplate)
	 		};

	 		function fError111(oEvent) {};

	    
	}, 
	onSelectProjectGrpFR:function(){
	    var that = this;
	     var cat_sel = this.getView().byId("fr_cat").getSelectedKey();
	    var grp = this.getView().byId("proj_grp_fr").getSelectedKey();
	    console.log(grp+cat_sel);
        df_sku_fr = [];
		df_id_fr = [];
	    var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oModel.read("/DF_DB?$filter=FR_CATEGORY eq '"+cat_sel+"' and PROJECT_GROUP eq '" + grp +"' and (PROJECT_PHASE eq 'Master Data/ Artwork' or PROJECT_PHASE eq 'Supply Chain Planning' or PROJECT_PHASE eq 'Production' or PROJECT_PHASE eq 'First Despatches') and substringof('FR',SELLING_COUNTRY)", null, null, true, s, f);
		function s(data){
		    console.log(data);
		    for(var x = 0; x<data.results.length;x++){
		        console.log(data.results[x].DF_ID + data.results[x].HIERARCHY);
		        df_id_fr.push(data.results[x].DF_ID);
					df_sku_fr.push({
						id: data.results[x].DF_ID,
						sku: data.results[x].SAP_SKU_CODE
					});
		    }
		    var unique = [];
				$.each(df_id_fr, function(i, el) {
					if ($.inArray(el, unique) === -1) {unique.push(el);}
				});
				console.log(unique);
				var dropdown = that.getView().byId("df_req_fr");
				dropdown.setModel(oModel);
				var dropDownData = [];
				dropDownData.push({
					id: ""
				});
				for (var j = 0; j < unique.length; j++) {
					dropDownData.push({
						id: unique[j]
					});
				}
				var jsonData = new sap.ui.model.json.JSONModel();
				jsonData.setData(dropDownData);
				dropdown.setModel(jsonData);
				var oTemplate = new sap.ui.core.ListItem({
					key: "{id}",
					text: "{id}"
				});
				dropdown.bindItems("/", oTemplate);
		}
		function f(){}
	},
	createDFTableFR: function(){
	    var that = this;
		var oTable = new sap.ui.table.Table("data1fr", {
			visibleRowCount: 1,
			title: ""
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Request number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "DF_ID"),
			sortProperty: "DF_ID",
			filterProperty: "DF_ID",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Title of Project",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "TITLE"),
			sortProperty: "TITLE",
			filterProperty: "TITLE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "NIM1"),
			sortProperty: "NIM1",
			filterProperty: "NIM1",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Sites",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "PROD_SITES"),
			sortProperty: "PROD_SITES",
			filterProperty: "PROD_SITES",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gate 3",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "GATE3"),
			sortProperty: "GATE3",
			filterProperty: "GATE3",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Actual PCB FTP Date",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "ACTUAL_PCB_FTP_DATE"),
			sortProperty: "ACTUAL_PCB_FTP_DATE",
			filterProperty: "ACTUAL_PCB_FTP_DATE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Technical file/ Trade Registration / Line Forms Date?",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "TECH_DATE"),
			sortProperty: "TECH_DATE",
			filterProperty: "TECH_DATE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Date of forecast required?",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "FORECAST"),
			sortProperty: "FORECAST",
			filterProperty: "FORECAST",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BBN/ ISSCOM Created",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "BBN"),
			sortProperty: "BBN",
			filterProperty: "BBN",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PAR Approved (Plan)?",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "PAR"),
			sortProperty: "PAR",
			filterProperty: "PAR",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TCCC Pricing Per Plan (Letter)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "TCCC"),
			sortProperty: "TCCC",
			filterProperty: "TCCC",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Raw Material Indication of Run-Out Rules",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "RAW"),
			sortProperty: "RAW",
			filterProperty: "RAW",
			width: "100px"
		}));
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams2);
		oTable.setModel(jsonModel);
		oTable.bindRows("/allDataFR1");
		that.getView().byId("first_table_fr").destroyContent();
		that.getView().byId("first_table_fr").addContent(oTable);
	},
	createFGTableFR: function(){
	    var that = this;
		var oTable = new sap.ui.table.Table("data2fr", {
			visibleRowCount: 5,
			title: "Finished Goods SKU details"
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField().addStyleClass("wordBreak").bindProperty("value", "REF_NUMBER"),
			sortProperty: "REF_NUMBER",
			filterProperty: "REF_NUMBER",
			width: "0px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP/ Basis Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAP_BASIS_CODE"),
			sortProperty: "BAP_BASIS_CODE",
			filterProperty: "BAP_BASIS_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_CODE"),
			sortProperty: "SAP_SKU_CODE",
			filterProperty: "SAP_SKU_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DESC"),
			sortProperty: "DESC",
			filterProperty: "DESC",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First estimate production week to hit first required",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EST_PROD_WEEK_INPT"),
			sortProperty: "EST_PROD_WEEK_INPT",
			filterProperty: "EST_PROD_WEEK_INPT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First Despatches",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIRST_DESP"),
			sortProperty: "FIRST_DESP",
			filterProperty: "FIRST_DESP",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Comments",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "COMMENTS_FR"),
			sortProperty: "COMMENTS_FR",
			filterProperty: "COMMENTS_FR",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "FR-SKU Data View Updated?",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
		              new sap.ui.core.ListItem({
						text: "FG"
					}), new sap.ui.core.ListItem({
						text: "RM"
					}), new sap.ui.core.ListItem({
						text: "RM + FG"
					}),new sap.ui.core.ListItem({
						text: "Not Yet"
					})],
				selectedKey: {
					path: 'FR_SKU_UPDATE',
					formatter: function(value) {
						if (value === null) {
							value = "";
						}
						return value;
					}
				},
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","FR_SKU_UPDATE"),
			sortProperty: "FR_SKU_UPDATE",
			filterProperty: "FR_SKU_UPDATE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quarantine period for finished product on first production required?",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "QUANRANTINE_INPT"),
			sortProperty: "QUANRANTINE_INPT",
			filterProperty: "QUANRANTINE_INPT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quarantine period for finished product on ongoing production required?",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ONGOING"),
			sortProperty: "ONGOING",
			filterProperty: "ONGOING",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MMI/ Concentrate BOM/ Pack Size Configuration",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
				}).addStyleClass("wordBreak").bindProperty("value", "CONCENTRATE_BOM"),
			sortProperty: "CONCENTRATE_BOM",
			filterProperty: "CONCENTRATE_BOM",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BBN Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BBN_CODE"),
			sortProperty: "BBN_CODE",
			filterProperty: "BBN_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ISSCOM Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ISSCOM_CODE"),
			sortProperty: "ISSCOM_CODE",
			filterProperty: "ISSCOM_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PSS Number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function(e) {
					that.updateTableFR(e, this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PSS_REQ_INPT"),
			sortProperty: "PSS_REQ_INPT",
			filterProperty: "PSS_REQ_INPT",
			width: "100px"
		}));
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams2);
		oTable.setModel(jsonModel);
		oTable.bindRows("/allDataFR2");
		that.getView().byId("next_table_fr").destroyContent();
		that.getView().byId("next_table_fr").addContent(oTable);
	},
	onSelectDFFR: function(){
	    var df_sel = this.getView().byId("df_req_fr").getSelectedKey();
	    console.log(df_sel);
	    var df_det = []; var week_par; var week_bbn; var week_gate; var week_tccc; var week_act; var week_tech; var week_forecast; var raw;
	    sap.ui.getCore().byId("data1fr").getModel().getData().allDataFR1 = [];
	    sap.ui.getCore().byId("data1fr").getModel().getData().allDataFR2 = [];
	    var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	    oModel.read("/DF?$filter=DF_ID eq '"+df_sel+"'&select=TECH_DATE,FORECAST_DATE,INIDCATION_RULES", null, null, false, s1, f1);
	    function s1(data){
	        console.log(data);
	        //tech = data.results[0].TECH_DATE;
	        if(data.results.length > 0){
	        var tech2  =  new Date(data.results[0].TECH_DATE);
		    var tech = new Date(tech2.getFullYear(), 0, 1);
		    if(data.results[0].TECH_DATE !== null && data.results[0].TECH_DATE !== ""){
		    week_tech = Math.ceil( (((tech2 - tech) / 86400000) + tech.getDay() + 1) / 7 );}
		    else{
		        week_tech = "";
		    }
	        //forecast = data.results[0].FORECAST_DATE;
	        var fore2  =  new Date(data.results[0].FORECAST_DATE);
		    var fore = new Date(tech2.getFullYear(), 0, 1);
		    if(data.results[0].FORECAST_DATE !== null && data.results[0].FORECAST_DATE !== ""){
		    week_forecast = Math.ceil( (((fore2 - fore) / 86400000) + fore.getDay() + 1) / 7 );}
		    else{
		        week_forecast = "";
		    }
	        raw = data.results[0].INIDCATION_RULES;
	        }
	    }
	    function f1(){}
		oModel.read("/DF_DB?$filter=DF_ID eq '" + df_sel+ "' and  HIERARCHY eq 'DF'&$select=DF_ID,TITLE,NIM1,PROD_SITES,GATE_3,ACTUAL_PCB_FTP_DATE,ISSCOM_CREATED,PAR_APPROVED_PLAN,TCCC_PRICING", null, null, false, s, f);
		function s(data){
		    if(data.results.length > 0){
		    var par2  =  new Date(data.results[0].PAR_APPROVED_PLAN);
		    var par = new Date(par2.getFullYear(), 0, 1);
		    if(data.results[0].PAR_APPROVED_PLAN !== null && data.results[0].PAR_APPROVED_PLAN !== ""){
		    week_par = Math.ceil( (((par2 - par) / 86400000) + par.getDay() + 1) / 7 );}
		    else{
		        week_par = "";
		    }
		    
		    var gate2  =  new Date(data.results[0].GATE_3);
		    var gate = new Date(gate2.getFullYear(), 0, 1);
		    if(data.results[0].GATE_3 !== null && data.results[0].GATE_3 !== ""){
		    week_gate = Math.ceil( (((gate2 - gate) / 86400000) + gate.getDay() + 1) / 7 );}
		    else{
		        week_gate = "";
		    }
		    
		    var act2  =  new Date(data.results[0].ACTUAL_PCB_FTP_DATE);
		    var act = new Date(act2.getFullYear(), 0, 1);
		    if(data.results[0].ACTUAL_PCB_FTP_DATE !== null && data.results[0].ACTUAL_PCB_FTP_DATE !== ""){
		    week_act = Math.ceil( (((act2 - act) / 86400000) + act.getDay() + 1) / 7 );}
		    else{
		        week_act = "";
		    }
		    
		    var bbn2  =  new Date(data.results[0].ISSCOM_CREATED);
		    var bbn = new Date(bbn2.getFullYear(), 0, 1);
		    if(data.results[0].ISSCOM_CREATED !== null && data.results[0].ISSCOM_CREATED !== ""){
		    week_bbn = Math.ceil( (((bbn2 - bbn) / 86400000) + bbn.getDay() + 1) / 7 );}
		    else{
		        week_bbn = "";
		    }
		    
		    var tccc2  =  new Date(data.results[0].TCCC_PRICING);
		    var tccc = new Date(tccc2.getFullYear(), 0, 1);
		    if(data.results[0].TCCC_PRICING !== null && data.results[0].TCCC_PRICING !== ""){
		    week_tccc = Math.ceil( (((tccc2 - tccc) / 86400000) + tccc.getDay() + 1) / 7 );}
		    else{
		        week_tccc = "";
		    }
		    
		    console.log(data);console.log(week_gate);
		    sap.ui.getCore().byId("data1fr").getModel().getData().allDataFR1.push({
		        DF_ID:data.results[0].DF_ID,
		        TITLE: data.results[0].TITLE,
		        NIM1: data.results[0].NIM1,
		        PROD_SITES: data.results[0].PROD_SITES,
		        GATE3 : week_gate,
		        ACTUAL_PCB_FTP_DATE: week_act,
		        BBN: week_bbn,
		        PAR: week_par,
		        TCCC: week_tccc,
		        TECH_DATE: week_tech,
		        FORECAST: week_forecast,
		        RAW: raw
		    });
		    sap.ui.getCore().byId("data1fr").getModel().setData(sap.ui.getCore().byId("data1fr").getModel().getData());
		    }
		}
		function f(){}
		oModel.read("/DF_DB?$filter=DF_ID eq '" + df_sel+ "' and  HIERARCHY eq 'SKU'&$select=REF_NUMBER,BAP_BASIS_CODE,SAP_SKU_CODE,DESC,EST_PROD_WEEK_INPT,FIRST_DESP,COMMENTS_FR,FR_SKU_UPDATE,QUANRANTINE_INPT,ONGOING,CONCENTRATE_BOM,BBN_CODE,ISSCOM_CODE,PSS_REQ_INPT", null, null, false, s2, f2);
		function s2(data){
		    console.log(data);
		    var week_est; var week_first;
		    if(data.results.length>0){
		    for(var i =0;i<data.results.length;i++){
		    var est2  =  new Date(data.results[i].EST_PROD_WEEK_INPT);
		    var est = new Date(est2.getFullYear(), 0, 1);
		    if(data.results[i].EST_PROD_WEEK_INPT !== null && data.results[i].EST_PROD_WEEK_INPT !== ""){
		    week_est = Math.ceil( (((est2 - est) / 86400000) + est.getDay() + 1) / 7 );}
		    else{
		        week_est = "";
		    }
		    var fir2  =  new Date(data.results[i].EST_PROD_WEEK_INPT);
		    var fir = new Date(fir2.getFullYear(), 0, 1);
		    if(data.results[i].EST_PROD_WEEK_INPT !== null && data.results[i].EST_PROD_WEEK_INPT !== ""){
		    week_first = Math.ceil( (((fir2 - fir) / 86400000) + fir.getDay() + 1) / 7 );}
		    else{
		        week_first = "";
		    }
		    sap.ui.getCore().byId("data2fr").getModel().getData().allDataFR2.push({
		        REF_NUMBER: data.results[i].REF_NUMBER,
		        BAP_BASIS_CODE:data.results[i].BAP_BASIS_CODE,
		        SAP_SKU_CODE:data.results[i].SAP_SKU_CODE,
		        DESC:data.results[i].DESC,
		        EST_PROD_WEEK_INPT:data.results[i].EST_PROD_WEEK_INPT,
		        FIRST_DESP:data.results[i].FIRST_DESP,
		        COMMENTS_FR:data.results[i].COMMENTS_FR,
		        FR_SKU_UPDATE:data.results[i].FR_SKU_UPDATE,
		        QUANRANTINE_INPT:data.results[i].QUANRANTINE_INPT,
		        ONGOING:data.results[i].ONGOING,
		        CONCENTRATE_BOM:data.results[i].CONCENTRATE_BOM,
		        BBN_CODE:data.results[i].BBN_CODE,
		        ISSCOM_CODE:data.results[i].ISSCOM_CODE,
		        PSS_REQ_INPT:data.results[i].PSS_REQ_INPT
		    });
		    }
		    sap.ui.getCore().byId("data2fr").getModel().setData(sap.ui.getCore().byId("data2fr").getModel().getData());
		    }
		}
		function f2(){}
	},
	onPressBackFR: function() {
		console.log(df_id_fr);
		var unique = [];
		$.each(df_id_fr, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		console.log(unique);
		var seq = unique.length;
		var selected_df = this.getView().byId("df_req_fr").getSelectedKey();
		for (var i = 0; i < unique.length; i++) {
			if (unique[i] === selected_df) {
				seq = i;
			}
		}
		console.log(seq);
		var new_seq = seq - 1;
		console.log(new_seq);
		this.getView().byId("df_req_fr").setSelectedKey(unique[new_seq]);
		this.onSelectDFFR();

		if (this.getView().byId("df_req_fr").getSelectedKey() === "") {
			this.onPressBackFR();
		}
	},
	onPressNextFR: function() {
		console.log(df_id_fr);
		var unique = [];
		$.each(df_id_fr, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		console.log(unique);

		var seq = -1;
		var selected_df = this.getView().byId("df_req_fr").getSelectedKey();
		for (var i = 0; i < unique.length; i++) {
			if (unique[i] === selected_df) {
				seq = i;
			}
		}
		console.log(seq);
		var new_seq = seq + 1;
		console.log(new_seq);
		this.getView().byId("df_req_fr").setSelectedKey(unique[new_seq]);
		this.onSelectDFFR();

		if (this.getView().byId("df_req_fr").getSelectedKey() === "") {
			this.onPressNextFR();
		}
	},
    updateTableFR: function(e, that, oTable){
        var this1 = this;
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		console.log(that.sId.split("-"));
		var selectedIndex = "";
		var field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		var path = e.getSource().getBindingContext().getPath();
		var selected_row1 = path.split("/")[2];
		
		var ref = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var bap = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var sku = oTable.getRows()[selectedIndex].getCells()[2].getValue();
		var desc = oTable.getRows()[selectedIndex].getCells()[3].getValue();
		var est = oTable.getRows()[selectedIndex].getCells()[4].getValue();
		var desp = oTable.getRows()[selectedIndex].getCells()[5].getValue();
		var comm = oTable.getRows()[selectedIndex].getCells()[6].getValue();
		var fr_sku = oTable.getRows()[selectedIndex].getCells()[7].getValue();
		var q_fir = oTable.getRows()[selectedIndex].getCells()[8].getValue();
		var q_on = oTable.getRows()[selectedIndex].getCells()[9].getValue();
		var mmi = oTable.getRows()[selectedIndex].getCells()[10].getValue();
		var bbn = oTable.getRows()[selectedIndex].getCells()[11].getValue();
		var isscom = oTable.getRows()[selectedIndex].getCells()[12].getValue();
		var pss = oTable.getRows()[selectedIndex].getCells()[13].getValue();
		console.log(fr_sku);
		
		oModel.read("/DF_DB('" + ref + "')", null, null, false, s1, f1);

		function s1(data) {
			console.log(data);

			var update_data = data;

			var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
			userModel.attachRequestCompleted(function() {
				var user_department = JSON.parse(userModel.getJSON()).department;
				modified_by = JSON.parse(userModel.getJSON()).username;
			});

			var modified1 = new Date();
			var month_mod = modified1.getMonth() + 1;
			var date_log = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();

			console.log(update_data);

			update_data.MOD_DATE = date_log;
			update_data.MOD_USER = modified_by;
			update_data.SAP_SKU_CODE = sku;
			update_data.BAP_BASIS_CODE = bap;
			update_data.DESC = desc;
			update_data.EST_PROD_WEEK_INPT = est;
			update_data.FIRST_DESP = desp;
			update_data.COMMENTS_FR = comm;
			update_data.FR_SKU_UPDATE = fr_sku;
			update_data.QUANRANTINE_INPT = q_fir;
			update_data.ONGOING = q_on;
			update_data.CONCENTRATE_BOM = mmi;
			update_data.BBN_CODE = bbn;
			update_data.ISSCOM_CODE = isscom;
			update_data.PSS_REQ_INPT = pss;
			
			oModel.update("/DF_DB('" + ref + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update successful");
				this1.onSelectDFFR();
			}

			function updateFailed() {}
		}

		function f1() {}
			
    },
    createDFTableGB: function(){
	    var that = this;
		var oTable = new sap.ui.table.Table("data1gb", {
			visibleRowCount: 1,
			title: ""
		});
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "REF_NUMBER"),
			sortProperty: "REF_NUMBER",
			filterProperty: "REF_NUMBER",
			width: "0px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Request number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "DF_ID"),
			sortProperty: "DF_ID",
			filterProperty: "DF_ID",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Title of Project",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "TITLE"),
			sortProperty: "TITLE",
			filterProperty: "TITLE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
			    items: {
					path: "/allNIMs",
					template: new sap.ui.core.ListItem({
						key: {
							path: "NIM_NAME"
						},
						text: {
							path: "NIM_NAME"
						}
					})
				},
				selectedKey: {
					path: "NIM1",
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NIM1"),
			sortProperty: "NIM1",
			filterProperty: "NIM1",
			width: "250px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Destination Market",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "SELLING_COUNTRY"),
			sortProperty: "SELLING_COUNTRY",
			filterProperty: "SELLING_COUNTRY",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PROD_COUNTRY"),
			sortProperty: "PROD_COUNTRY",
			filterProperty: "PROD_COUNTRY",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Manufacturing Source",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MFG_SOURCE"),
			sortProperty: "MFG_SOURCE",
			filterProperty: "MFG_SOURCE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First estimate Production week to hit required first Despatch",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EST_PROD_WEEK_INPT"),
			sortProperty: "EST_PROD_WEEK_INPT",
			filterProperty: "EST_PROD_WEEK_INPT",
			width: "200px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Actual Despatch Date",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ACTUAL_FIRST_DESPATCH"),
			sortProperty: "ACTUAL_FIRST_DESPATCH",
			filterProperty: "ACTUAL_FIRST_DESPATCH",
			width: "200px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS BOM",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","MS_BOM"),
			sortProperty: "MS_BOM",
			filterProperty: "MS_BOM",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Codes Ready to Plan",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","CODES_PLAN"),
			sortProperty: "CODES_PLAN",
			filterProperty: "CODES_PLAN",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "In SAP APO",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","SAP_APO"),
			sortProperty: "SAP_APO",
			filterProperty: "SAP_APO",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Planning",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","PLANNING"),
			sortProperty: "PLANNING",
			filterProperty: "PLANNING",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MSP",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","MSP"),
			sortProperty: "MSP",
			filterProperty: "MSP",
			width: "100px"
		})); 
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Codes Active",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","CODES_ACTIVE"),
			sortProperty: "CODES_ACTIVE",
			filterProperty: "CODES_ACTIVE",
			width: "100px"
		})); 
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","SIDCUP"),
			sortProperty: "SIDCUP",
			filterProperty: "SIDCUP",
			width: "100px"
		})); 
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","EDMON"),
			sortProperty: "EDMON",
			filterProperty: "EDMON",
			width: "100px"
		})); 
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","EAST_KIL"),
			sortProperty: "EAST_KIL",
			filterProperty: "EAST_KIL",
			width: "100px"
		})); 
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","MORPETH"),
			sortProperty: "MORPETH",
			filterProperty: "MORPETH",
			width: "100px"
		})); 
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","WAKEFIELD"),
			sortProperty: "WAKEFIELD",
			filterProperty: "WAKEFIELD",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "Off Track"
					}), new sap.ui.core.ListItem({
						text: "On Track"
					})],
				
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value","MILT_KEY"),
			sortProperty: "MILT_KEY",
			filterProperty: "MILT_KEY",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Comments",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateFirstGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "COMMENTS_GB"),
			sortProperty: "COMMENTS_GB",
			filterProperty: "COMMENTS_GB",
			width: "100px"
		}));
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams3);
		oTable.setModel(jsonModel);
		oTable.bindRows("/allDataGB1");
		
		this.getView().getModel("df_request_model").read("/nim", null, null, false, success19, failed19);
		function success19(data) {
			jsonParams3.allNIMs.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					NIM_NAME: data.results[i].NIM_NAME
				};
				jsonParams3.allNIMs.push(oMessage);
			   console.log(jsonParams3)
			}
			jsonModel.setData(jsonParams3);
		}

		function failed19() {}
		that.getView().byId("first_table_gb").destroyContent();
		that.getView().byId("first_table_gb").addContent(oTable);
    },
    createSecondTableGB: function(){
        var that = this;
		var oTable = new sap.ui.table.Table("data2gb", {
			visibleRowCount: 5,
			title: "Finished Goods SKU details"
		});
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
			  editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "REF_NUMBER"),
			sortProperty: "REF_NUMBER",
			filterProperty: "REF_NUMBER",
			width: "0px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BASE SAP/APO code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateSecondGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BASE_SAP_APO_CODE"),
			sortProperty: "BASE_SAP_APO_CODE",
			filterProperty: "BASE_SAP_APO_CODE",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateSecondGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_CODE"),
			sortProperty: "SAP_SKU_CODE",
			filterProperty: "SAP_SKU_CODE",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP/Basis Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateSecondGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAP_BASIS_CODE"),
			sortProperty: "BAP_BASIS_CODE",
			filterProperty: "BAP_BASIS_CODE",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateSecondGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DESC"),
			sortProperty: "DESC",
			filterProperty: "DESC",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Production End Date",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				change: function() {
					that.updateSecondGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRODUCTION_END_DATE"),
			sortProperty: "PRODUCTION_END_DATE",
			filterProperty: "PRODUCTION_END_DATE",
			width: "200px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Site(s)",
				wrapping: true
			}),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allSites",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SITE_NAME"
						},
						text: {
							path: "SITE_NAME"
						}
					})
				},
				selectedKeys: {
					path: 'PROD_SITES',
					formatter: function(value) {
						if (value) {
							value = value.split(",");
							return value;
						}
					}
				},
				selectionFinish: function() {
					that.updateSecondGB(this, oTable);
				}
			}).addStyleClass("wordBreak"),
			sortProperty: "PROD_SITES",
			filterProperty: "PROD_SITES",
			width: "200px"
		}));
		
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams3);
		oTable.setModel(jsonModel);
		oTable.bindRows("/allDataGB2");
		
		this.getView().getModel("df_request_model").read("/prod_sites", null, null, false, success17b, failed17b);
		function success17b(data) {
			jsonParams3.allSites.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SITE_NAME: data.results[i].SITE_NAME
				};
				jsonParams3.allSites.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams3);
		}

		function failed17b() {}
		
		that.getView().byId("sec_table_gb").destroyContent();
		that.getView().byId("sec_table_gb").addContent(oTable);
    },
    createThirdTableGB: function(){
        var that = this;
		var oTable = new sap.ui.table.Table("data3gb", {
			visibleRowCount: 5,
			title: "Raw Materials BOM details"
		});
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
			    editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "REF_NUMBER"),
			sortProperty: "REF_NUMBER",
			filterProperty: "REF_NUMBER",
			width: "0px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "New SAP Raw Material Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateThirdGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NEW_SAP_RAW_MATERIAL_DESCRIPTION"),
			sortProperty: "NEW_SAP_RAW_MATERIAL_DESCRIPTION",
			filterProperty: "NEW_SAP_RAW_MATERIAL_DESCRIPTION",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "New SAP Raw Material Number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateThirdGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "UNIT5"),
			sortProperty: "UNIT5",
			filterProperty: "UNIT5",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CINCOM New Part Number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that.updateThirdGB(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CINCOM_NEW_PART_NUMBER"),
			sortProperty: "CINCOM_NEW_PART_NUMBER",
			filterProperty: "CINCOM_NEW_PART_NUMBER",
			width: "100px"
		}));
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams3);
		oTable.setModel(jsonModel);
		oTable.bindRows("/allDataGB3");
        that.getView().byId("third_table_gb").destroyContent();
		that.getView().byId("third_table_gb").addContent(oTable);
    },
    onFetchDFGB: function(){
        var that = this;
        
        		var oTable = new sap.ui.table.Table("req_data_gb",{
			visibleRowCount: 5,
			title: "DF Request Number"
		});
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Request Number",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
			    editable:false
			}).addStyleClass("wordBreak").bindProperty("value", "DF_ID"),
			sortProperty: "DF_ID",
			filterProperty: "DF_ID",
			width: "100px"
		}));
		oTable.addColumn(
		    new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Title of Project",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "TITLE"),
			sortProperty: "TITLE",
			filterProperty: "TITLE",
			width: "300px"
		}));
		
		that.getView().byId("req_table_gb").destroyContent();
		that.getView().byId("req_table_gb").addContent(oTable);
		
        dfid_gb = [];
        dfid_title_gb = [];
        var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
        oModel.read("/DF_DB?$filter=(PROJECT_PHASE eq 'DF Evaluation' or PROJECT_PHASE eq 'Master Data/ Artwork' or PROJECT_PHASE eq 'Supply Chain Planning' or PROJECT_PHASE eq 'Production' or PROJECT_PHASE eq 'First Despatches') and substringof('GB',SELLING_COUNTRY)", null, null, true, s, f);
		function s(data){
		    console.log(data);
		    for(var x = 0; x<data.results.length;x++){
		        console.log(data.results[x].DF_ID + data.results[x].HIERARCHY);
		        dfid_gb.push(data.results[x].DF_ID);
		        dfid_title_gb.push({DF_ID:data.results[x].DF_ID,
		        TITLE: data.results[x].TITLE});
		    }
		    console.log(dfid_title_gb);
		    var unique = [];
				$.each(dfid_gb, function(i, el) {
					if ($.inArray(el, unique) === -1) {unique.push(el);}
				});
				console.log(unique);
			
			var unique2 = [];	
			for(var k = 0;k<unique.length;k++){
			    for(var l = 0 ;l < dfid_title_gb.length; l++){
			        if(dfid_title_gb[l].DF_ID === unique[k]){
			            unique2.push({DF_ID:dfid_title_gb[l].DF_ID,
		                    TITLE: dfid_title_gb[l].TITLE});
		               break;
			        }
			    }
			}
			console.log(unique2);
			
	
		var jsonModel = new sap.ui.model.json.JSONModel();
		jsonModel.setData({
	 			modelData: unique2
	 		});
		oTable.setModel(jsonModel);
		oTable.bindRows("/modelData");
		
		
		console.log(oTable.getSelectedIndex());
		
		that.getView().byId("df_req_gb").setVisible(false);
				var dropdown = that.getView().byId("df_req_gb");
				dropdown.setModel(oModel);
				var dropDownData = [];
				dropDownData.push({
					id: ""
				});
				for (var j = 0; j < unique.length; j++) {
					dropDownData.push({
						id: unique[j]
					});
				}
				var jsonData = new sap.ui.model.json.JSONModel();
				jsonData.setData(dropDownData);
				dropdown.setModel(jsonData);
				var oTemplate = new sap.ui.core.ListItem({
					key: "{id}",
					text: "{id}"
				});
				dropdown.bindItems("/", oTemplate);
		}
		function f(){}
    },
    onPressBackGB: function() {
		console.log(dfid_gb);
		var unique = [];
		$.each(dfid_gb, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		console.log(unique);
		var seq = unique.length;
		var selected_df = this.getView().byId("df_req_gb").getSelectedKey();
		for (var i = 0; i < unique.length; i++) {
			if (unique[i] === selected_df) {
				seq = i;
			}
		}
		console.log(seq);
		var new_seq = seq - 1;
		console.log(new_seq);
		this.getView().byId("df_req_gb").setSelectedKey(unique[new_seq]);
		
		
	//	this.onSelectDFGB();

		if (this.getView().byId("df_req_gb").getSelectedKey() === "") {
			this.onPressBackGB();
		}
		else{
		    this.onSelectDFGB();
		    if(sap.ui.getCore().byId("req_data_gb").getSelectedIndex() === -1 || sap.ui.getCore().byId("req_data_gb").getSelectedIndex() === 0){
		    console.log(sap.ui.getCore().byId("req_data_gb").getModel().getData().modelData.length);
		    selectedIndex = sap.ui.getCore().byId("req_data_gb").getModel().getData().modelData.length - 1;
		}
		else{
		    selectedIndex = sap.ui.getCore().byId("req_data_gb").getSelectedIndex() - 1;
		}
		sap.ui.getCore().byId("req_data_gb").setSelectedIndex(selectedIndex);
		}
	},
	onPressNextGB: function() {
		console.log(dfid_gb);
		var unique = [];
		$.each(dfid_gb, function(i, el) {
			if ($.inArray(el, unique) === -1) unique.push(el);
		});
		console.log(unique);

		var seq = -1;
		var selected_df = this.getView().byId("df_req_gb").getSelectedKey();
		for (var i = 0; i < unique.length; i++) {
			if (unique[i] === selected_df) {
				seq = i;
			}
		}
		console.log(seq);
		var new_seq = seq + 1;
		console.log(new_seq);
		this.getView().byId("df_req_gb").setSelectedKey(unique[new_seq]);

		if (this.getView().byId("df_req_gb").getSelectedKey() === "") {
			this.onPressNextGB();
		}
		else{
		    if(sap.ui.getCore().byId("req_data_gb").getSelectedIndex() === -1 || sap.ui.getCore().byId("req_data_gb").getSelectedIndex() === sap.ui.getCore().byId("req_data_gb").getModel().getData().modelData.length - 1){
		    console.log(sap.ui.getCore().byId("req_data_gb").getModel().getData().modelData.length);
		    selectedIndex = 0;
		}
		else{
		    selectedIndex = sap.ui.getCore().byId("req_data_gb").getSelectedIndex() + 1;
		}
		sap.ui.getCore().byId("req_data_gb").setSelectedIndex(selectedIndex);
		    this.onSelectDFGB();
		}
	},
	onSelectDFGB: function(){
	    var df_sel = this.getView().byId("df_req_gb").getSelectedKey();
	    console.log(df_sel);
	    sap.ui.getCore().byId("data1gb").getModel().getData().allDataGB1 = [];
	    sap.ui.getCore().byId("data2gb").getModel().getData().allDataGB2 = [];
	    sap.ui.getCore().byId("data3gb").getModel().getData().allDataGB3 = [];
	    var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
	    oModel.read("/DF_DB?$filter=DF_ID eq '"+df_sel+"' and HIERARCHY eq 'DF'&$select=REF_NUMBER,MS_BOM,CODES_PLAN,SAP_APO,PLANNING,MSP,CODES_ACTIVE,SIDCUP,EDMON,EAST_KIL,MORPETH,WAKEFIELD,MILT_KEY,COMMENTS_GB,EST_PROD_WEEK_INPT,DF_ID,TITLE,NIM1,SELLING_COUNTRY,PROD_COUNTRY,MFG_SOURCE,ACTUAL_FIRST_DESPATCH", null, null, false, s1, f1);
	    function s1(data){
	        console.log(data);
	        sap.ui.getCore().byId("data1gb").getModel().getData().allDataGB1.push({
	            REF_NUMBER: data.results[0].REF_NUMBER,
		        DF_ID:data.results[0].DF_ID,
		        TITLE: data.results[0].TITLE,
		        NIM1: data.results[0].NIM1,
		        SELLING_COUNTRY: data.results[0].SELLING_COUNTRY,
		        PROD_COUNTRY: data.results[0].PROD_COUNTRY,
		        MFG_SOURCE: data.results[0].MFG_SOURCE,
		        EST_PROD_WEEK_INPT: data.results[0].EST_PROD_WEEK_INPT,
		        ACTUAL_FIRST_DESPATCH: data.results[0].ACTUAL_FIRST_DESPATCH,
		        MS_BOM: data.results[0].MS_BOM,
		        CODES_PLAN: data.results[0].CODES_PLAN,
		        SAP_APO: data.results[0].SAP_APO,
		        PLANNING: data.results[0].PLANNING,
		        MSP: data.results[0].MSP,
		        CODES_ACTIVE: data.results[0].CODES_ACTIVE,
		        SIDCUP: data.results[0].SIDCUP,
		        EDMON: data.results[0].EDMON,
		        EAST_KIL: data.results[0].EAST_KIL,
		        MORPETH: data.results[0].MORPETH,
		        WAKEFIELD: data.results[0].WAKEFIELD,
		        MILT_KEY: data.results[0].MILT_KEY,
		        COMMENTS_GB: data.results[0].COMMENTS_GB
		    });
		    sap.ui.getCore().byId("data1gb").getModel().setData(sap.ui.getCore().byId("data1gb").getModel().getData());
	    }
	    function f1(){}
	    
	    oModel.read("/DF_DB?$filter=DF_ID eq '"+df_sel+"' and HIERARCHY eq 'SKU'&$select=REF_NUMBER,BASE_SAP_APO_CODE,SAP_SKU_CODE,BAP_BASIS_CODE,DESC,PRODUCTION_END_DATE,PROD_SITES", null, null, false, s2, f2);
	
	    function s2(data){
	        console.log(data);
	        for(var i=0; i<data.results.length;i++){
	        sap.ui.getCore().byId("data2gb").getModel().getData().allDataGB2.push({
		        REF_NUMBER:data.results[i].REF_NUMBER,
		        BASE_SAP_APO_CODE: data.results[i].BASE_SAP_APO_CODE,
		        SAP_SKU_CODE: data.results[i].SAP_SKU_CODE,
		        BAP_BASIS_CODE: data.results[i].BAP_BASIS_CODE,
		        DESC: data.results[i].DESC,
		        PRODUCTION_END_DATE: data.results[i].PRODUCTION_END_DATE,
		        PROD_SITES: data.results[i].PROD_SITES
		    });
	        }
		    sap.ui.getCore().byId("data2gb").getModel().setData(sap.ui.getCore().byId("data2gb").getModel().getData());
	    }
	    function f2(){}
	    
	    oModel.read("/DF_DB?$filter=DF_ID eq '"+df_sel+"' and HIERARCHY eq 'RM'&$select=REF_NUMBER,NEW_SAP_RAW_MATERIAL_DESCRIPTION,UNIT5,CINCOM_NEW_PART_NUMBER", null, null, false, s3, f3);
	
	    function s3(data){
	        console.log(data);
	        for(var i=0; i<data.results.length;i++){
	        sap.ui.getCore().byId("data3gb").getModel().getData().allDataGB3.push({
		        REF_NUMBER:data.results[i].REF_NUMBER,
		        NEW_SAP_RAW_MATERIAL_DESCRIPTION: data.results[i].NEW_SAP_RAW_MATERIAL_DESCRIPTION,
		        UNIT5: data.results[i].UNIT5,
		        CINCOM_NEW_PART_NUMBER: data.results[i].CINCOM_NEW_PART_NUMBER
		    });
	        }
		    sap.ui.getCore().byId("data3gb").getModel().setData(sap.ui.getCore().byId("data3gb").getModel().getData());
	    }
	    function f3(){}
	},
	updateThirdGB: function(that, oTable){
	    var this1 = this;
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		console.log(that.sId.split("-"));
		var selectedIndex = "";
		var field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		var ref = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var desc = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var num = oTable.getRows()[selectedIndex].getCells()[2].getValue();
		var cincom = oTable.getRows()[selectedIndex].getCells()[3].getValue();
		
		oModel.read("/DF_DB('" + ref + "')", null, null, false, s1, f1);

		function s1(data) {
			var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
			userModel.attachRequestCompleted(function() {
				var user_department = JSON.parse(userModel.getJSON()).department;
				modified_by = JSON.parse(userModel.getJSON()).username;
			});

			var modified1 = new Date();
			var month_mod = modified1.getMonth() + 1;
			var date_log = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();

			console.log(data);
			var update_data = data;
			console.log(update_data);

			update_data.MOD_DATE = date_log;
			update_data.MOD_USER = modified_by;
			update_data.CINCOM_NEW_PART_NUMBER = cincom;
			update_data.UNIT5 = num;
			update_data.NEW_SAP_RAW_MATERIAL_DESCRIPTION = desc;

			oModel.update("/DF_DB('" + ref + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update successful table1")
				this1.onSelectDFGB();
			}

			function updateFailed() {}
		}

		function f1() {}
	},
	updateSecondGB: function(that,oTable){
	    var this1 = this;
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		console.log(that.sId.split("-"));
		var selectedIndex = "";
		var field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		var ref = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var base = oTable.getRows()[selectedIndex].getCells()[1].getValue();
		var sku = oTable.getRows()[selectedIndex].getCells()[2].getValue();
		var bap = oTable.getRows()[selectedIndex].getCells()[3].getValue();
		var desc = oTable.getRows()[selectedIndex].getCells()[4].getValue();
		var end = oTable.getRows()[selectedIndex].getCells()[5].getValue();
		var site = "";
		var site1 = oTable.getRows()[selectedIndex].getCells()[6].getSelectedItems();
		console.log(site1);
		for (var i = 0; i < site1.length; i++) {
			if (i === 0 && site1[0].getText() !== "") {
				site = site1[0].getText();
			} else {
				if (site === "") {
					site = site1[i].getText();
				} else {
					if (site1[i].getText() !== "") {
						site = site + "," + site1[i].getText();
					}
				}
			}
		}
		console.log(site1);
		console.log(site);
		
		oModel.read("/DF_DB('" + ref + "')", null, null, false, s1, f1);

		function s1(data) {
			var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
			userModel.attachRequestCompleted(function() {
				var user_department = JSON.parse(userModel.getJSON()).department;
				modified_by = JSON.parse(userModel.getJSON()).username;
			});

			var modified1 = new Date();
			var month_mod = modified1.getMonth() + 1;
			var date_log = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();

			console.log(data);
			var update_data = data;
			console.log(update_data);

			update_data.MOD_DATE = date_log;
			update_data.MOD_USER = modified_by;
			update_data.BASE_SAP_APO_CODE = base;
			update_data.SAP_SKU_CODE = sku;
			update_data.DESC = desc;
			update_data.BAP_BASIS_CODE = bap;
			update_data.PRODUCTION_END_DATE = end;
			update_data.PROD_SITES = site;

			oModel.update("/DF_DB('" + ref + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update successful table1")
				this1.onSelectDFGB();
			}

			function updateFailed() {}
		}

		function f1() {}
	},
	updateFirstGB: function(that,oTable){
	   var this1 = this;
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		console.log(that.sId.split("-"));
		var selectedIndex = "";
		var field = that.sId.split("-");
		selectedIndex = field[2].substr(3);
		console.log(selectedIndex);
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		var ref = oTable.getRows()[selectedIndex].getCells()[0].getValue(); 
		var nim = oTable.getRows()[selectedIndex].getCells()[3].getValue(); console.log(nim);
		var country = oTable.getRows()[selectedIndex].getCells()[5].getValue();
		var source = oTable.getRows()[selectedIndex].getCells()[6].getValue();
		var fir = oTable.getRows()[selectedIndex].getCells()[7].getValue();
		var act = oTable.getRows()[selectedIndex].getCells()[8].getValue(); console.log(act);
		var ms_bom = oTable.getRows()[selectedIndex].getCells()[9].getValue(); console.log(ms_bom);
		var plan = oTable.getRows()[selectedIndex].getCells()[10].getValue();
		var sap_apo = oTable.getRows()[selectedIndex].getCells()[11].getValue();
		var planning = oTable.getRows()[selectedIndex].getCells()[12].getValue();
		var msp = oTable.getRows()[selectedIndex].getCells()[13].getValue();
		var active = oTable.getRows()[selectedIndex].getCells()[14].getValue();
		var sid = oTable.getRows()[selectedIndex].getCells()[15].getValue();
		var edm = oTable.getRows()[selectedIndex].getCells()[16].getValue();
		var ek = oTable.getRows()[selectedIndex].getCells()[17].getValue();
		var morp = oTable.getRows()[selectedIndex].getCells()[18].getValue();
		var wk = oTable.getRows()[selectedIndex].getCells()[19].getValue();
		var mk = oTable.getRows()[selectedIndex].getCells()[20].getValue();
		var comm = oTable.getRows()[selectedIndex].getCells()[21].getValue();
		
		oModel.read("/DF_DB('" + ref + "')", null, null, false, s1, f1);

		function s1(data) {
			var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
			userModel.attachRequestCompleted(function() {
				var user_department = JSON.parse(userModel.getJSON()).department;
				modified_by = JSON.parse(userModel.getJSON()).username;
			});

			var modified1 = new Date();
			var month_mod = modified1.getMonth() + 1;
			var date_log = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();

			console.log(data);
			var update_data = data;
			console.log(update_data);

			update_data.MOD_DATE = date_log;
			update_data.MOD_USER = modified_by;
			update_data.NIM1 = nim;
			update_data.PROD_COUNTRY = country;
			update_data.MFG_SOURCE = source;
			update_data.EST_PROD_WEEK_INPT = fir;
			update_data.ACTUAL_FIRST_DESPATCH = act;
			update_data.MS_BOM = ms_bom;
			update_data.CODES_PLAN = plan;
			update_data.SAP_APO = sap_apo;
			update_data.PLANNING = planning;
			update_data.MSP = msp;
			update_data.CODES_ACTIVE = active;
			update_data.SIDCUP = sid;
			update_data.EDMON = edm;
			update_data.EAST_KIL = ek;
			update_data.MORPETH = morp;
			update_data.WAKEFIELD = wk;
			update_data.MILT_KEY = mk;
			update_data.COMMENTS_GB = comm;

			oModel.update("/DF_DB('" + ref + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update successful table1")
				this1.onSelectDFGB();
			}

			function updateFailed() {}
		}

		function f1() {}
	},
	onAfterRendering: function() {
		app.setBusy(false);
		app2.setBusy(false);
	}
});