var DF_IND;
var SKU_IND;
var RM_IND;
var bck_ref_num;
var modified_by;
var modified;
var displaykey;
var oTable;
sap.ui.controller("view.CreateDF_platform", {
	logOff: function() {
		logOffFunction();
	},
	onInit: function() {
		//   alert("HERE");

		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		this.getView().setModel(oModel, "df_request_model");
		var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
		userModel.attachRequestCompleted(function() {
			var user_department = JSON.parse(userModel.getJSON()).department;
			modified_by = JSON.parse(userModel.getJSON()).username;
		});
		displaykey = "Activity_Tracker";
	/*	this.getView().byId("activity_form").destroyContent();
		this._createActivityTable();*/
		
		var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updatePlatform.xsjs";
		$.ajax({
			url: url,
			success: function(msg) {},
			error: function(xhr, textStatus, error) {}
		});

	},
	onBeforeRendering: function() {
        DF_IND = "Y";
		SKU_IND = "N";
		PCB_ind = "Y";
		//this.refreshAllRequests();
	},
	_updateActivityTable: function(that, oTable) {
		sap.ui.core.BusyIndicator.show(0);
		//console.log(path);
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		console.log(selectedIndex1);
		console.log(selectedIndex);
		console.log(oTable.getContextByIndex(selectedIndex).getProperty("DF_ID"));
		console.log(oTable.getContextByIndex(selectedIndex).getProperty("PSEUDO_REF_NUM"));
		console.log(oTable.getRows()[selectedIndex].getCells()[0].getValue());
		console.log(oTable.getRows()[selectedIndex].getCells()[1].getValue());

		var modified1 = new Date();
		var month_mod = modified1.getMonth() + 1;
		modified = modified1.getDate() + "/" + month_mod + "/" + modified1.getFullYear() + " " + modified1.getHours() + ":" + modified1.getMinutes();
		console.log(modified + modified_by);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var dataModel = this.getView().getModel("df_request_model");

		dataModel.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success1, failed1);

		function success1(data) {
			console.log(data);
			console.log(data.results[0].REF_NUMBER);
			var ref_number = data.results[0].REF_NUMBER;

			var update_data = data.results[0];
			//var update_data = {};
			console.log(update_data);
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() !== "Generate New Artwork Number") {
				var new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getValue();
			}
			console.log(new_value);

			update_data.MOD_DATE = modified;
			update_data.MOD_USER = modified_by;
			var col = "";

			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Request Number") {
				update_data.DF_ID = new_value;
				col = "DF_ID";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Hierarchy") {
				update_data.HIERARCHY = new_value;
				col = "HIERARCHY";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Request Status") {
				update_data.STATUS_NAME = new_value;
				col = "STATUS_NAME";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Initiator Name") {
				update_data.INITIATOR = new_value;
				col = "INITIATOR";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "NIM") {
				update_data.NIM1 = new_value;
				col = "NIM1";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "FR Category") {
				update_data.FR_CATEGORY = new_value;
				col = "FR_CATEGORY";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Generate New Artwork Number") {
				console.log(oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getChecked());
				if (oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getChecked() === true) {
					new_value = true;
				} else {
					new_value = false;
				}
				console.log(new_value);
				update_data.NEWART = new_value;
				col = "NEWART";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Markem") {
				update_data.MARKEM = new_value;
				col = "MARKEM";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Title of Project") {
				update_data.TITLE = new_value;
				col = "TITLE";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Group") {
				update_data.PROJECT_GROUP = new_value;
				col = "PROJECT_GROUP";
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Promotion Type") {
				col = "THEME_TYPE";
				//new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedKeys();
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				console.log(new_value);
				update_data.THEME_TYPE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Theme End Date (CCEP Warehouse availability)") {
				col = "THEME_END_DATE";
				update_data.THEME_END_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Initiator Department") {
				col = "INITIATOR_DEPT";
				update_data.INITIATOR_DEPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SNPPL02") {
				col = "SNPPL02";
				update_data.SNPPL02 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Brand Owner Email") {
				col = "BRAND_OWNER_EMAIL";
				update_data.BRAND_OWNER_EMAIL = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Destination Market") {
				col = "SELLING_COUNTRY";
				/*for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				console.log(new_value);*/
				update_data.SELLING_COUNTRY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Date of First/Last Despatches from CCE Warehouses") {
				col = "FIRST_LAST_DISPATCH_DATE";
				update_data.FIRST_LAST_DISPATCH_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP Country") {
				col = "COUNTRY";
				update_data.COUNTRY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Product Description") {
				col = "DESC";
				update_data.DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Brand") {
				col = "BRAND";
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				update_data.BRAND = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Flavour") {
				col = "FLAVOUR";
				update_data.FLAVOUR = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Container Size") {
				col = "CONTAINER";
				update_data.CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Product Pack") {
				col = "PACK";
				update_data.PACK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Package Type") {
				col = "PACKAGE";
				update_data.PACKAGE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "EAN (EA)") {
				col = "EAN";
				update_data.EAN = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "EAN PAC (ZCU)") {
				col = "ZCU";
				update_data.ZCU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "ITF Case (CS)") {
				col = "CS";
				update_data.CS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Shelf-life (in days)") {
				col = "SHELF";
				update_data.SHELF = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP Producing Sites") {
				col = "SITES";
				update_data.SITES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P1") {
				col = "PERIOD1";
				update_data.PERIOD1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P2") {
				col = "PERIOD2";
				update_data.PERIOD2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P3") {
				col = "PERIOD3";
				update_data.PERIOD3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P4") {
				col = "PERIOD4";
				update_data.PERIOD4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P5") {
				col = "PERIOD5";
				update_data.PERIOD5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P6") {
				col = "PERIOD6";
				update_data.PERIOD6 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P7") {
				col = "PERIOD7";
				update_data.PERIOD7 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P8") {
				col = "PERIOD8";
				update_data.PERIOD8 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P9") {
				col = "PERIOD9";
				update_data.PERIOD9 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P10") {
				col = "PERIOD10";
				update_data.PERIOD10 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P11") {
				col = "PERIOD11";
				update_data.PERIOD11 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "P12") {
				col = "PERIOD12";
				update_data.PERIOD12 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "TOTAL") {
				col = "TOTAL";
				update_data.TOTAL = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Incremental Volumes details") {
				col = "INCREMENTAL_VOLUME1";
				update_data.INCREMENTAL_VOLUME1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Please select all Materials which are impacted") {
				col = "MATERIAL_CHANGE";
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				console.log(new_value);
				update_data.MATERIAL_CHANGE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Promotional Mechanic") {
				col = "PROMOTIONAL_MECHANIC";
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				console.log(new_value);
				update_data.PROMOTIONAL_MECHANIC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Type NEBU") {
				col = "PROJTYPNEBU";
				update_data.PROJTYPNEBU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "NIM Led or CM Led") {
				col = "NIM_CM";
				update_data.NIM_CM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Assignment Delay") {
				col = "ASSIGNMENT_DELAY";
				update_data.ASSIGNMENT_DELAY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Type") {
				col = "PROJECT_TYPE";
				update_data.PROJECT_TYPE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Description") {
				col = "PROJECT_DESCRIPTION";
				update_data.PROJECT_DESCRIPTION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Manufacturing Source") {
				col = "MFG_SOURCE";
				update_data.MFG_SOURCE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Producing Site(s)") {
				col = "PROD_SITES";
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				console.log(new_value);
				update_data.PROD_SITES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Repacking Required") {
				col = "REPACKING";
				update_data.REPACKING = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "If Repack: input SAP code and % Split") {
				col = "BASE_INPUT";
				update_data.BASE_INPUT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Number of SKU's") {
				col = "NUM_SKU";
				update_data.NUM_SKU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Number of Artworks") {
				col = "NUM_ARTWORKS";
				update_data.NUM_ARTWORKS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Gate 1") {
				col = "GATE1";
				update_data.GATE1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Gate 2") {
				col = "GATE2";
				update_data.GATE2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Start Date") {
				col = "START_DATE";
				update_data.START_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Planned MAPC Approved") {
				col = "MAPC";
				update_data.MAPC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Planned MAPX DF Go") {
				col = "MAPX";
				update_data.MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Trial Earliest Date") {
				col = "TRIAL_E";
				update_data.TRIAL_E = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Trial Latest Date") {
				col = "TRIAL_L";
				update_data.TRIAL_L = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BAM Design to Schawk") {
				col = "BAM";
				update_data.BAM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Date of Forecast Required") {
				col = "FORECAST_REQ";
				update_data.FORECAST_REQ = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "First Despatches") {
				col = "FIRST_DESP";
				update_data.FIRST_DESP = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Forecast Date") {
				col = "FORECAST_DATE";
				update_data.FORECAST_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PSS Number") {
				col = "PSS_REQ_INPT";
				update_data.PSS_REQ_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PSS Planned Completion Date") {
				col = "PSS_AVIAL_INPT";
				update_data.PSS_AVIAL_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Freight Cost") {
				col = "FREIGHT_COST";
				update_data.FREIGHT_COST = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() ===
				"Quarantine period for finished product on first production required?") {
				col = "QUANRANTINE_INPT";
				update_data.QUANRANTINE_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() ===
				"Quarantine period for finished product on ongoing production required?") {
				col = "ONGOING";
				update_data.ONGOING = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Master Data Project Manager") {
				col = "MANAGER";
				update_data.MANAGER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Supplier") {
				col = "SUPPLIER";
				update_data.SUPPLIER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Raw Material Write-Off Assessment") {
				col = "RAW";
				update_data.RAW = new_value;
			}
			/*else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Minimum Order Quantity") {
				update_data.ORDER = new_value;
			}*/
			else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Material Supply General Comments") {
				col = "MATERIAL_LEAD_INPT";
				update_data.MATERIAL_LEAD_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "RMWO Budget") {
				col = "SUPPLIER_NEW_INPT";
				update_data.SUPPLIER_NEW_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "RMWO Currency") {
				col = "ARTWORK_REPO_INPT";
				update_data.ARTWORK_REPO_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Estimation of Residual Risk") {
				col = "RISK";
				update_data.RISK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Risk") {
				col = "RISK_MAPX";
				update_data.RISK_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "First estimate Production week to hit required first Despatch") {
				col = "EST_PROD_WEEK_INPT";
				update_data.EST_PROD_WEEK_INPT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Production Site & Line") {
				col = "S1";
				update_data.S1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Repacker") {
				col = "REPACKER";
				update_data.REPACKER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Repack Costs") {
				col = "COST";
				update_data.COST = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "New Full Code") {
				col = "NEW_FULL_CODE";
				update_data.NEW_FULL_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "New Full Code Description") {
				col = "NEW_FULL_CODE_DESC";
				update_data.NEW_FULL_CODE_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Category") {
				col = "PROJECT_CATEGORY";
				update_data.PROJECT_CATEGORY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Palletisation Specification") {
				col = "PALLET_SPECIFIC";
				update_data.PALLET_SPECIFIC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Project Phase") {
				col = "PROJECT_PHASE";
				update_data.PROJECT_PHASE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Comments") {
				col = "COMMENTS";
				update_data.COMMENTS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Received") {
				col = "DF_RECEIVED";
				update_data.DF_RECEIVED = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Workflow Circulation Started") {
				col = "DF_CIRCULATION_STARTED";
				update_data.DF_CIRCULATION_STARTED = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Planned Final PSS Completion (+14 days)") {
				col = "PLANNED_FINAL_PSS_COMPLETION";
				update_data.PLANNED_FINAL_PSS_COMPLETION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Final PSS Completion") {
				col = "FINAL_PSS_COMPLETION";
				update_data.FINAL_PSS_COMPLETION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "DF Feedback sent to Stakeholder") {
				col = "FEEDBACK_TO_STAKEHOLDER";
				update_data.FEEDBACK_TO_STAKEHOLDER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Gate 3") {
				col = "GATE_3";
				update_data.GATE_3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BBN/ ISSCOM Created") {
				col = "ISSCOM_CREATED";
				update_data.ISSCOM_CREATED = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PAR Approved (Plan)") {
				col = "PAR_APPROVED_PLAN";
				update_data.PAR_APPROVED_PLAN = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PAR Approved (Actual)") {
				col = "PAR_APPROVED_ACTUAL";
				update_data.PAR_APPROVED_ACTUAL = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "TCCC Pricing Per Part (Letter)") {
				col = "TCCC_PRICING";
				update_data.TCCC_PRICING = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SKU Creation (Start)") {
				col = "SKU_CREATION_START";
				update_data.SKU_CREATION_START = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SKU Creation (Completed)") {
				col = "SKU_CREATION_COMPLETE";
				update_data.SKU_CREATION_COMPLETE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MAPX Permission to Produce") {
				col = "MAPX_PERMISSION";
				update_data.MAPX_PERMISSION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Gate 4") {
				col = "GATE_4";
				update_data.GATE_4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Actual First Despatch") {
				col = "ACTUAL_FIRST_DESPATCH";
				update_data.ACTUAL_FIRST_DESPATCH = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Actual Project Completion Date") {
				col = "ACTUAL_COMPLETION_DESPATCH";
				update_data.ACTUAL_COMPLETION_DESPATCH = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Lead Market") {
				col = "LEAD_MARKET";
				update_data.LEAD_MARKET = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Design Message") {
				col = "DESIGN_MESSAGE";
				update_data.DESIGN_MESSAGE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CCEP Artwork Number") {
				col = "CCE_ARTWORK_NUMBER";
				update_data.CCE_ARTWORK_NUMBER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Optional Additional Code Material") {
				col = "OPTIONAL_ADDITIONAL_CODE";
				update_data.OPTIONAL_ADDITIONAL_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Artwork Barcode (EAN/ ITF)") {
				col = "ARTWORK_BARCODE";
				update_data.ARTWORK_BARCODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Grid Reference") {
				col = "GRID_REF";
				update_data.GRID_REF = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Material Substrate") {
				col = "MATERAL_SUBSTRATE";
				update_data.MATERAL_SUBSTRATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Print Process") {
				col = "PRINT_PROCESS";
				update_data.PRINT_PROCESS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Lead of Artwork Development") {
				col = "LEAD_ARTWORK_DEVELOPMENT";
				update_data.LEAD_ARTWORK_DEVELOPMENT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Required PCB FTP Date") {
				col = "REQ_PCB_FTP_DATE";
				update_data.REQ_PCB_FTP_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PCB to Schawk Date") {
				col = "PCB_TO_SCHAWK";
				update_data.PCB_TO_SCHAWK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Revised PCB FTP Date") {
				col = "PCB_FTP_DATE";
				update_data.PCB_FTP_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Actual PCB FTP Date") {
				col = "ACTUAL_PCB_FTP_DATE";
				update_data.ACTUAL_PCB_FTP_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Schawk Artwork Status") {
				col = "SCHAWK_ARTWORK_STATUS";
				update_data.SCHAWK_ARTWORK_STATUS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Number of Colour Layers") {
				col = "NUMBER_COLOR_LAYERS";
				update_data.NUMBER_COLOR_LAYERS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Additional Printing Features") {
				col = "ADDITONAL_PRINT_FEATURES";
				update_data.ADDITONAL_PRINT_FEATURES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Indication Last Bottling Production") {
				col = "LAST_BOTTLING_PRODUCTION";
				update_data.LAST_BOTTLING_PRODUCTION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Bottle Shape") {
				col = "BOTTLE_SHAPE";
				update_data.BOTTLE_SHAPE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Part Cancelled/ Obsolete") {
				col = "PART_CANCELLED";
				update_data.PART_CANCELLED = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Unique Pack") {
				col = "UNIQUE_PACK";
				update_data.UNIQUE_PACK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Approved by Customer Logistics") {
				col = "CUSTOMER_LOGISTICS";
				update_data.CUSTOMER_LOGISTICS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Same as current (from the Volumes)") {
				col = "SAME_AS_CURR";
				update_data.SAME_AS_CURR = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Child Material Reference") {
				col = "CHLD_REF";
				update_data.CHLD_REF = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Brand or Colour (E.g. Closure Colour)") {
				col = "BRAND_COLOR";
				update_data.BRAND_COLOR = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BAP/SKU Change?") {
				col = "BAP_SKU_CHANGE";
				update_data.BAP_SKU_CHANGE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Type of change") {
				col = "TYPE_OF_CHANGE";
				update_data.TYPE_OF_CHANGE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CINCOM Old Part Number") {
				col = "CINCOM_OLD_PART_NUMBER";
				update_data.CINCOM_OLD_PART_NUMBER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CINCOM New Part Number") {
				col = "CINCOM_NEW_PART_NUMBER";
				update_data.CINCOM_NEW_PART_NUMBER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Old SAP Raw Material Number") {
				col = "OLD_SAP_RAW_MATERIAL_NUMBER";
				update_data.OLD_SAP_RAW_MATERIAL_NUMBER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "New SAP Raw Material Number") {
				col = "UNIT5";
				update_data.UNIT5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "New SAP Raw Material Description") {
				col = "NEW_SAP_RAW_MATERIAL_DESCRIPTION";
				update_data.NEW_SAP_RAW_MATERIAL_DESCRIPTION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CINCOM Contracts Updated Date") {
				col = "CINCOM_CONTRACTS";
				update_data.CINCOM_CONTRACTS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP Contracts Updated Date") {
				col = "SAP_CONTRACTS_UPDATED_DATE";
				update_data.SAP_CONTRACTS_UPDATED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP SKU Code") {
				col = "SAP_SKU_CODE";
				update_data.SAP_SKU_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BAP/ BASIS Code") {
				col = "BAP_BASIS_CODE";
				update_data.BAP_BASIS_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Production End Date") {
				col = "PRODUCTION_END_DATE";
				update_data.PRODUCTION_END_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Item flag for the Traders Report") {
				col = "ITEM_FLAG_TRADERS_REPORT";
				update_data.ITEM_FLAG_TRADERS_REPORT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Contingency Site and Line") {
				col = "CONTIGENCY_SITE_LINE";
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				update_data.CONTIGENCY_SITE_LINE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BASE SAP/APO code") {
				col = "BASE_SAP_APO_CODE";
				update_data.BASE_SAP_APO_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sweetener Data") {
				col = "SWEETNER_DATA";
				update_data.SWEETNER_DATA = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "On-going Quarantine Required?") {
				col = "QUARANTINE_BAP_CODE";
				update_data.QUARANTINE_BAP_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Cliche/Plate Costs") {
				col = "CLICHE_PLATE_COSTS";
				update_data.CLICHE_PLATE_COSTS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PO Number") {
				col = "PO_NUMBER";
				update_data.PO_NUMBER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MMD Code Extended Planned Date") {
				col = "MMD_CODE_EXTENDED_PLANNED_DATE";
				update_data.MMD_CODE_EXTENDED_PLANNED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MMD Code Extended Actual Date") {
				col = "MMD_CODE_EXTENDED_ACTUAL_DATE";
				update_data.MMD_CODE_EXTENDED_ACTUAL_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "T-Lanes and Forecast Split Planned Date") {
				col = "T_LANES_FORCAST_PLANNED_DATE";
				update_data.T_LANES_FORCAST_PLANNED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "T-Lanes and Forecast Split Completed Date") {
				col = "T_LANES_FORCAST_COMPLETED_DATE";
				update_data.T_LANES_FORCAST_COMPLETED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Product Database Planned Date") {
				col = "PRODUCT_DATABASE_PLANNED_DATE";
				update_data.PRODUCT_DATABASE_PLANNED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Product Database Updated Date") {
				col = "DB_UPDATED_DATE";
				update_data.DB_UPDATED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BOM Notification Form (BNF) Required By") {
				col = "BNF_NEEDBY_DATE";
				update_data.BNF_NEEDBY_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BOM Notification Form (BNF) Date Issued") {
				col = "BNF_ACTUAL_DATE";
				update_data.BNF_ACTUAL_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP SKU Code Ready for Planning (Required) Date") {
				col = "SAP_SKU_PLANNING_REQ_DATE";
				update_data.SAP_SKU_PLANNING_REQ_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP SKU Code Ready for Planning (Planned) Date") {
				col = "SAP_SKU_PLANNING_PLANNED_DATE";
				update_data.SAP_SKU_PLANNING_PLANNED_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP SKU Code Ready for Planning (Actual) Date") {
				col = "SAP_SKU_PLANNING_ACTUAL_DATE";
				update_data.SAP_SKU_PLANNING_ACTUAL_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MMI/ Concentrate BOM/ Pack Size Configuration") {
				col = "CONCENTRATE_BOM";
				update_data.CONCENTRATE_BOM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Date Format on Packaging") {
				col = "PACKAGING_DATE_FORMAT";
				update_data.PACKAGING_DATE_FORMAT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BBN Code") {
				col = "BBN_CODE";
				update_data.BBN_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "ISSCOM Code") {
				col = "ISSCOM_CODE";
				update_data.ISSCOM_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Kit Size") {
				col = "KIT_SIZE";
				update_data.KIT_SIZE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Product Density") {
				col = "PRODUCT_DENSITY";
				update_data.PRODUCT_DENSITY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Forecast/ Fixed Quantities") {
				col = "FIXED_QUANTITIES";
				update_data.FIXED_QUANTITIES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Planner (input SKU)") {
				col = "PLANNER";
				update_data.PLANNER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Repack Description Input SKU") {
				col = "REPACK_DESCRIPTION";
				update_data.REPACK_DESCRIPTION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "First Production Input SKU") {
				col = "FIRST_PRODUCTION_INPT_SKU";
				update_data.FIRST_PRODUCTION_INPT_SKU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Last Production Input SKU") {
				col = "LAST_PRODUCTION_INPT_SKU";
				update_data.LAST_PRODUCTION_INPT_SKU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Quantity Input SKU") {
				col = "QUANTITIES_SKU";
				update_data.QUANTITIES_SKU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PCB Initiator") {
				col = "PCB_INITIATOR_NAME";
				update_data.PCB_INITIATOR_NAME = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Revision Number") {
				col = "REVISION_NUMBER";
				update_data.REVISION_NUMBER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Ad Hoc Artwork Reviewer") {
				col = "ART_REVIEWER";
				update_data.ART_REVIEWER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Alternative Printer Email") {
				col = "PRINTER_EMAIL";
				update_data.PRINTER_EMAIL = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BAM/ Instructions to Schawk on Change Requirements") {
				col = "BAM_INSTRUCTIONS";
				update_data.BAM_INSTRUCTIONS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "NIM/ Instructions to Schawk on Change Requirements") {
				col = "NIM_INSTRUCTIONS";
				update_data.NIM_INSTRUCTIONS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Based on Reference (BAM)") {
				col = "BAM_REFERENCE";
				update_data.BAM_REFERENCE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Material Type") {
				col = "MAT_TYPE";
				update_data.MAT_TYPE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PCB Promotion Type") {
				col = "PCB_PROMOTION_TYPE";
				update_data.PCB_PROMOTION_TYPE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "PCB NIM Comments or priority") {
				col = "PCB_NIM_COMMENTS";
				update_data.PCB_NIM_COMMENTS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Modified Date") {
				col = "MOD_DATE";
				update_data.MOD_DATE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Modified User") {
				col = "MOD_USER";
				update_data.MOD_USER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Tonica Meeting Minutes") {
				col = "TONICA_MEET_MINS";
				update_data.TONICA_MEET_MINS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status DF") {
				col = "STATUS_DF";
				update_data.STATUS_DF = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status Project") {
				col = "STATUS_PROJECT";
				update_data.STATUS_PROJECT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Trial Request Needed?") {
				col = "TRIAL_REQ_NEEDED";
				update_data.TRIAL_REQ_NEEDED = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status SAP Code") {
				col = "STATUS_SAP_CODE";
				update_data.STATUS_SAP_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Other Codes") {
				col = "OTH_CODE";
				update_data.OTH_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Unknown SKU Description") {
				col = "UNKNOWN_SKU";
				update_data.UNKNOWN_SKU = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Input SKU's that are used for the new pallet") {
				col = "INPUT_SKU_PALLET";
				update_data.INPUT_SKU_PALLET = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status First Production") {
				col = "STATUS_FIRST_PRODUCTION";
				update_data.STATUS_FIRST_PRODUCTION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status Last Production") {
				col = "STATUS_LAST_PRODUCTION";
				update_data.STATUS_LAST_PRODUCTION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status First Despatch") {
				col = "STATUS_FIRST_DESPATCH";
				update_data.STATUS_FIRST_DESPATCH = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Last Despatch Week") {
				col = "LAST_DESPATCH_WEEK";
				update_data.LAST_DESPATCH_WEEK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Status Comments") {
				col = "STATUS_COMMENTS";
				update_data.STATUS_COMMENTS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Raw Material Indication of Run-out Rules?") {
				col = "IND_RUN_OUT_RULES";
				update_data.IND_RUN_OUT_RULES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sales or WIP") {
				col = "SALE_OR_QUARANTINE";
				update_data.SALE_OR_QUARANTINE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MAPX Decision Required") {
				col = "MAPX_DECISION_REQ";
				update_data.MAPX_DECISION_REQ = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MAPX Pre-Read/ Agenda") {
				col = "MAPX_PREREAD_NAME";
				update_data.MAPX_PREREAD_NAME = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP SKU Code Selling Country") {
				col = "SAP_SKU_SELLING";
				update_data.SAP_SKU_SELLING = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CPP (Raw Cases) per full pallet") {
				col = "CPP_RAW";
				update_data.CPP_RAW = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CPP (CCE Cases)") {
				col = "CPP_CCE";
				update_data.CPP_CCE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "CPP (Unit Cases) per full pallet") {
				col = "CPP_UNIT";
				update_data.CPP_UNIT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP Producing Sites and Lines") {
				col = "SAP_SITE_LINES";
				update_data.SAP_SITE_LINES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Product Split if Mixed") {
				col = "PRODUCT_SPLIT";
				update_data.PRODUCT_SPLIT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Technical file/ Trade Registration/ Line Forms Date") {
				col = "TRADE_REGISTRATION";
				update_data.TRADE_REGISTRATION = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Trade Window to follow") {
				col = "TRADE_WINDOW";
				update_data.TRADE_WINDOW = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Print Supplier") {
				col = "PRINT_SUPPLIER";
				update_data.PRINT_SUPPLIER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "First Possible Bottling Production Date") {
				col = "BOTTLING_FIRST";
				update_data.BOTTLING_FIRST = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Indication Last Bottling Production Date") {
				col = "BOTTLING_LAST";
				update_data.BOTTLING_LAST = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Artwork Check Occurrence") {
				col = "ARTWORK_CHECK";
				update_data.ARTWORK_CHECK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Old SAP Raw Material Description") {
				col = "RAW_MAT_DESC";
				update_data.RAW_MAT_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "BASIS per Country") {
				col = "BASIS_PER_COUNTRY";
				update_data.BASIS_PER_COUNTRY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "SAP R/3 Variant Code") {
				col = "SAP_R3_CODE";
				update_data.SAP_R3_CODE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Variant Code") {
				col = "VARIANT_CD";
				update_data.VARIANT_CD = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Variant Description") {
				col = "VARIANT_DESCRPTN";
				update_data.VARIANT_DESCRPTN = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5100 Dunkirk: Full Container") {
				col = "DUNKIRK_FULL_CONTAINER";
				update_data.DUNKIRK_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5100 Dunkirk: Full Container Description") {
				col = "DUNKIRK_FULL_CONTAINER_DESC";
				update_data.DUNKIRK_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5100 Dunkirk: Printed film or cluster (if any)") {
				col = "DUNKIRK_PRINTED_FILM";
				update_data.DUNKIRK_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5100 Dunkirk: Printed film or cluster description") {
				col = "DUNKIRK_PRINTED_FILM_DESC";
				update_data.DUNKIRK_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5100 Dunkirk: BOM Creation or ECM") {
				col = "DUNKIRK_BOM_ECM";
				update_data.DUNKIRK_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5103 Toulouse: Full Container") {
				col = "TOULOUSE_FULL_CONTAINER";
				update_data.TOULOUSE_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5103 Toulouse: Full Container Description") {
				col = "TOULOUSE_FULL_CONTAINER_DESC";
				update_data.TOULOUSE_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5103 Toulouse: Printed film or cluster (if any)") {
				col = "TOULOUSE_PRINTED_FILM";
				update_data.TOULOUSE_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5103 Toulouse: Printed film or cluster description") {
				col = "TOULOUSE_PRINTED_FILM_DESC";
				update_data.TOULOUSE_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5103 Toulouse: BOM Creation or ECM") {
				col = "TOULOUSE_BOM_ECM";
				update_data.TOULOUSE_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5104 Clamart: Full Container") {
				col = "CLAMART_FULL_CONTAINER";
				update_data.CLAMART_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5104 Clamart: Full Container Description") {
				col = "CLAMART_FULL_CONTAINER_DESC";
				update_data.CLAMART_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5104 Clamart: Printed film or cluster (if any)") {
				col = "CLAMART_PRINTED_FILM";
				update_data.CLAMART_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5104 Clamart: Printed film or cluster description") {
				col = "CLAMART_PRINTED_FILM_DESC";
				update_data.CLAMART_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5104 Clamart: BOM Creation or ECM") {
				col = "CLAMART_BOM_ECM";
				update_data.CLAMART_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5105 Grigny: Full Container") {
				col = "GRIGNY_FULL_CONTAINER";
				update_data.GRIGNY_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5105 Grigny: Full Container Description") {
				col = "GRIGNY_FULL_CONTAINER_DESC";
				update_data.GRIGNY_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5105 Grigny: Printed film or cluster (if any)") {
				col = "GRIGNY_PRINTED_FILM";
				update_data.GRIGNY_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5105 Grigny: Printed film or cluster description") {
				col = "GRIGNY_PRINTED_FILM_DESC";
				update_data.GRIGNY_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5105 Grigny: BOM Creation or ECM") {
				col = "GRIGNY_BOM_ECM";
				update_data.GRIGNY_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5106 Marseille: Full Container") {
				col = "MARSEILLE_FULL_CONTAINER";
				update_data.MARSEILLE_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5106 Marseille: Full Container Description") {
				col = "MARSEILLE_FULL_CONTAINER_DESC";
				update_data.MARSEILLE_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5106 Marseille: Printed film or cluster (if any)") {
				col = "MARSEILLE_PRINTED_FILM";
				update_data.MARSEILLE_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5106 Marseille: Printed film or cluster description") {
				col = "MARSEILLE_PRINTED_FILM_DESC";
				update_data.MARSEILLE_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5106 Marseille: BOM Creation or ECM") {
				col = "MARSEILLE_BOM_ECM";
				update_data.MARSEILLE_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5300 Antwerp: Full Container") {
				col = "ANTWERP_FULL_CONTAINER";
				update_data.ANTWERP_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5300 Antwerp: Full Container Description") {
				col = "ANTWERP_FULL_CONTAINER_DESC";
				update_data.ANTWERP_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5300 Antwerp: Printed film or cluster (if any)") {
				col = "ANTWERP_PRINTED_FILM";
				update_data.ANTWERP_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5300 Antwerp: Printed film or cluster description") {
				col = "ANTWERP_PRINTED_FILM_DESC";
				update_data.ANTWERP_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5300 Antwerp: BOM Creation or ECM") {
				col = "ANTWERP_BOM_ECM";
				update_data.ANTWERP_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5301 Ghent: Full Container") {
				col = "GHENT_FULL_CONTAINER";
				update_data.GHENT_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5301 Ghent: Full Container Description") {
				col = "GHENT_FULL_CONTAINER_DESC";
				update_data.GHENT_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5301 Ghent: Printed film or cluster description") {
				col = "GHENT_PRINTED_FILM_DESC";
				update_data.GHENT_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5301 Ghent: Printed film or cluster (if any)") {
				col = "GHENT_PRINTED_FILM";
				update_data.GHENT_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5301 Ghent: BOM Creation or ECM") {
				col = "GHENT_BOM_ECM";
				update_data.GHENT_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5307 Chaudfontaine: Full Container") {
				col = "CHAUDFONTAINE_FULL_CONTAINER";
				update_data.CHAUDFONTAINE_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5307 Chaudfontaine: Full Container Description") {
				col = "CHAUDFONTAINE_FULL_CONTAINER_DESC";
				update_data.CHAUDFONTAINE_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5307 Chaudfontaine: Printed film or cluster (if any)") {
				col = "CHAUDFONTAINE_PRINTED_FILM";
				update_data.CHAUDFONTAINE_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5307 Chaudfontaine: Printed film or cluster description") {
				col = "CHAUDFONTAINE_PRINTED_FILM_DESC";
				update_data.CHAUDFONTAINE_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5307 Chaudfontaine: BOM Creation or ECM") {
				col = "CHAUDFONTAINE_BOM_ECM";
				update_data.CHAUDFONTAINE_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5400 Dongen: Full Container") {
				col = "DONGEN_FULL_CONTAINER";
				update_data.DONGEN_FULL_CONTAINER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5400 Dongen: Full Container Description") {
				col = "DONGEN_FULL_CONTAINER_DESC";
				update_data.DONGEN_FULL_CONTAINER_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5400 Dongen: Printed film or cluster (if any)") {
				col = "DONGEN_PRINTED_FILM";
				update_data.DONGEN_PRINTED_FILM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5400 Dongen: Printed film or cluster description") {
				col = "DONGEN_PRINTED_FILM_DESC";
				update_data.DONGEN_PRINTED_FILM_DESC = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "5400 Dongen: BOM Creation or ECM") {
				col = "DONGEN_BOM_ECM";
				update_data.DONGEN_BOM_ECM = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Barcode Type for Container") {
				col = "BARCODE_TYPE";
				update_data.BARCODE_TYPE = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Barcode Type for Multipack") {
				col = "BARCODE_TYPE_MULTI";
				update_data.BARCODE_TYPE_MULTI = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Barcode Type for Despatch Unit") {
				col = "BARCODE_TYPE_DEPATCH";
				update_data.BARCODE_TYPE_DEPATCH = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Type of Drink") {
				col = "TYPE_DRINK";
				update_data.TYPE_DRINK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Antwerp: 5300") {
				col = "ANTWERP_5300";
				update_data.ANTWERP_5300 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Chaudfontaine: 5307") {
				col = "CHAUFONTAINE_5307";
				update_data.CHAUFONTAINE_5307 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Ghent: 5301") {
				col = "GHENT_5301";
				update_data.GHENT_5301 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Dongen: 5400") {
				col = "DONGEN_5400";
				update_data.DONGEN_5400 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Clamart: 5104") {
				col = "CLAMART_5104";
				update_data.CLAMART_5104 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Dunkirk: 5100") {
				col = "DUNKRIK_5100";
				update_data.DUNKRIK_5100 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Grigny: 5105") {
				col = "GRIGNY_5105";
				update_data.GRIGNY_5105 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Grigny Self-Manufacturing: 5116") {
				col = "GRIGNY_SELF_MANUFACTURING_5116";
				update_data.GRIGNY_SELF_MANUFACTURING_5116 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Marseille: 5106") {
				col = "MARSEILLE_5106";
				update_data.MARSEILLE_5106 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Toulouse: 5103") {
				col = "TOULOUSE_5103";
				update_data.TOULOUSE_5103 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Jordbro: 2001") {
				col = "JORDBRO_2001";
				update_data.JORDBRO_2001 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Robsrud: 2003") {
				col = "ROBSRUD_2003";
				update_data.ROBSRUD_2003 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Mack") {
				col = "MD_MACK";
				update_data.MD_MACK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD 3rd party (Name)") {
				col = "THIRD_PARTY";
				update_data.THIRD_PARTY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Release 3rd party") {
				col = "RELEASE_3RD_PARTY";
				update_data.RELEASE_3RD_PARTY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Antwerp: 5300") {
				col = "MS_ANTWERP_5300";
				update_data.MS_ANTWERP_5300 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Chaudfontaine: 5307") {
				col = "MS_CHAUFONTAINE_5307";
				update_data.MS_CHAUFONTAINE_5307 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Ghent: 5301") {
				col = "MS_GHENT_5301";
				update_data.MS_GHENT_5301 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Dongen: 5400") {
				col = "MS_DONGEN_5400";
				update_data.MS_DONGEN_5400 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Clamart: 5104") {
				col = "MS_CLAMART_5104";
				update_data.MS_CLAMART_5104 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Dunkirk: 5100") {
				col = "MS_DUNKRIK_5100";
				update_data.MS_DUNKRIK_5100 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Grigny: 5105") {
				col = "MS_GRIGNY_5105";
				update_data.MS_GRIGNY_5105 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Grigny Self-Manufacturing: 5116") {
				col = "MS_GRIGNY_SELF_MANUFACTURING_5116";
				update_data.MS_GRIGNY_SELF_MANUFACTURING_5116 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Marseille: 5106") {
				col = "MS_MARSEILLE_5106";
				update_data.MS_MARSEILLE_5106 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Toulouse: 5103") {
				col = "MS_TOULOUSE_5103";
				update_data.MS_TOULOUSE_5103 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Jordbro: 2001") {
				col = "MS_JORDBRO_2001";
				update_data.MS_JORDBRO_2001 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Robsrud: 2003") {
				col = "MS_ROBSRUD_2003";
				update_data.MS_ROBSRUD_2003 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Mack") {
				col = "MS_MACK";
				update_data.MS_MACK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS 3rd party (Name)") {
				col = "MS_3RD_PARTY";
				update_data.MS_3RD_PARTY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Release 3rd party") {
				col = "MS_RELEASE_3RD_PARTY";
				update_data.MS_RELEASE_3RD_PARTY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD1") {
				col = "SIDCUP_5501_SD1";
				update_data.SIDCUP_5501_SD1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD2") {
				col = "SIDCUP_5501_SD2";
				update_data.SIDCUP_5501_SD2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD3") {
				col = "SIDCUP_5501_SD3";
				update_data.SIDCUP_5501_SD3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD4") {
				col = "SIDCUP_5501_SD4";
				update_data.SIDCUP_5501_SD4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD5") {
				col = "SIDCUP_5501_SD5";
				update_data.SIDCUP_5501_SD5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD6") {
				col = "SIDCUP_5501_SD6";
				update_data.SIDCUP_5501_SD6 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD7") {
				col = "SIDCUP_5501_SD7";
				update_data.SIDCUP_5501_SD7 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: 5501 SD8") {
				col = "SIDCUP_5501_SD8";
				update_data.SIDCUP_5501_SD8 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: 5506 ED1") {
				col = "EDMONTON_5506_ED1";
				update_data.EDMONTON_5506_ED1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: 5506 ED2") {
				col = "EDMONTON_5506_ED2";
				update_data.EDMONTON_5506_ED2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: 5506 ED3") {
				col = "EDMONTON_5506_ED3";
				update_data.EDMONTON_5506_ED3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: 5506 ED4") {
				col = "EDMONTON_5506_ED4";
				update_data.EDMONTON_5506_ED4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: 5506 ED5") {
				col = "EDMONTON_5506_ED5";
				update_data.EDMONTON_5506_ED5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: 5506 ED6") {
				col = "EDMONTON_5506_ED6";
				update_data.EDMONTON_5506_ED6 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK1") {
				col = "MILTON_KEYNES_5504_MK1";
				update_data.MILTON_KEYNES_5504_MK1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK2") {
				col = "MILTON_KEYNES_5504_MK2";
				update_data.MILTON_KEYNES_5504_MK2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK3") {
				col = "MILTON_KEYNES_5504_MK3";
				update_data.MILTON_KEYNES_5504_MK3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK4") {
				col = "MILTON_KEYNES_5504_MK4";
				update_data.MILTON_KEYNES_5504_MK4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK5") {
				col = "MILTON_KEYNES_5504_MK5";
				update_data.MILTON_KEYNES_5504_MK5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK6&7") {
				col = "MILTON_KEYNES_5504_MK67";
				update_data.MILTON_KEYNES_5504_MK67 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: 5504 MK8&9") {
				col = "MILTON_KEYNES_5504_MK89";
				update_data.MILTON_KEYNES_5504_MK89 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK1") {
				col = "WAKEFIELD_5502_WK1";
				update_data.WAKEFIELD_5502_WK1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK2") {
				col = "WAKEFIELD_5502_WK2";
				update_data.WAKEFIELD_5502_WK2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK3") {
				col = "WAKEFIELD_5502_WK3";
				update_data.WAKEFIELD_5502_WK3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK4") {
				col = "WAKEFIELD_5502_WK4";
				update_data.WAKEFIELD_5502_WK4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK5") {
				col = "WAKEFIELD_5502_WK5";
				update_data.WAKEFIELD_5502_WK5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK6") {
				col = "WAKEFIELD_5502_WK6";
				update_data.WAKEFIELD_5502_WK6 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK7") {
				col = "WAKEFIELD_5502_WK7";
				update_data.WAKEFIELD_5502_WK7 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK8") {
				col = "WAKEFIELD_5502_WK8";
				update_data.WAKEFIELD_5502_WK8 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK9") {
				col = "WAKEFIELD_5502_WK9";
				update_data.WAKEFIELD_5502_WK9 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK11") {
				col = "WAKEFIELD_5502_WK11";
				update_data.WAKEFIELD_5502_WK11 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: 5502 WK17") {
				col = "WAKEFIELD_5502_WK17";
				update_data.WAKEFIELD_5502_WK17 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK1") {
				col = "EAST_KILBRIDE_5503_EK1";
				update_data.EAST_KILBRIDE_5503_EK1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK2") {
				col = "EAST_KILBRIDE_5503_EK2";
				update_data.EAST_KILBRIDE_5503_EK2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK3") {
				col = "EAST_KILBRIDE_5503_EK3";
				update_data.EAST_KILBRIDE_5503_EK3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK4") {
				col = "EAST_KILBRIDE_5503_EK4";
				update_data.EAST_KILBRIDE_5503_EK4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK5") {
				col = "EAST_KILBRIDE_5503_EK5";
				update_data.EAST_KILBRIDE_5503_EK5 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK6") {
				col = "EAST_KILBRIDE_5503_EK6";
				update_data.EAST_KILBRIDE_5503_EK6 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK7") {
				col = "EAST_KILBRIDE_5503_EK7";
				update_data.EAST_KILBRIDE_5503_EK7 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Kilbride: 5503 EK11") {
				col = "EAST_KILBRIDE_5503_EK11";
				update_data.EAST_KILBRIDE_5503_EK11 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Morpeth: 5546 AW1") {
				col = "MORPETH_5546_AW1";
				update_data.MORPETH_5546_AW1 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Morpeth: 5546 AW2") {
				col = "MORPETH_5546_AW2";
				update_data.MORPETH_5546_AW2 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Morpeth: 5546 AW3") {
				col = "MORPETH_5546_AW3";
				update_data.MORPETH_5546_AW3 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Morpeth: 5546 AW4") {
				col = "MORPETH_5546_AW4";
				update_data.MORPETH_5546_AW4 = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "3rd party (Name) & PSS Number") {
				col = "THIRD_PARTY_NAME_PSS";
				update_data.THIRD_PARTY_NAME_PSS = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Antwerp: Minimum Production Run") {
				col = "ANTWERP_MAPX";
				update_data.ANTWERP_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Chaudfontaine: Minimum Production Run") {
				col = "CHAUDFONTAINE_MAPX";
				update_data.CHAUDFONTAINE_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Gent: Minimum Production Run") {
				col = "GENT_MAPX";
				update_data.GENT_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Clamart: Minimum Production Run") {
				col = "CLAMART_MAPX";
				update_data.CLAMART_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Dunkirk: Minimum Production Run") {
				col = "DUNKIRK_MAPX";
				update_data.DUNKIRK_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Grigny: Minimum Production Run") {
				col = "GRIGNY_MAPX";
				update_data.GRIGNY_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Marseille: Minimum Production Run") {
				col = "MARSEILLE_MAPX";
				update_data.MARSEILLE_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Tolouse: Minimum Production Run") {
				col = "TOLOUSE_MAPX";
				update_data.TOLOUSE_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Killbride: Minimum Production Run") {
				col = "KILLBRIDE_MAPX";
				update_data.KILLBRIDE_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: Minimum Production Run") {
				col = "EDMONTON_MAPX";
				update_data.EDMONTON_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: Minimum Production Run") {
				col = "KEYNES_MAPX";
				update_data.KEYNES_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Morpeth: Minimum Production Run") {
				col = "MORPETH_MAPX";
				update_data.MORPETH_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: Minimum Production Run") {
				col = "SIDCUP_MAPX";
				update_data.SIDCUP_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: Minimum Production Run") {
				col = "WAKEFIELD_MAPX";
				update_data.WAKEFIELD_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Dongen: Minimum Production Run") {
				col = "DONGEN_MAPX";
				update_data.DONGEN_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Lorenskog: Minimum Production Run") {
				col = "LORENSKOG_MAPX";
				update_data.LORENSKOG_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Mack: Minimum Production Run") {
				col = "MACK_MAPX";
				update_data.MACK_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Jordbro: Minimum Production Run") {
				col = "JORDBRO_MAPX";
				update_data.JORDBRO_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Minimum Order Quantity") {
				col = "MINORDER_MAPX";
				update_data.MINORDER_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Units of Concentrate") {
				col = "UNIT_CONCENTRATE_MAPX";
				update_data.UNIT_CONCENTRATE_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Case Volume") {
				col = "CASEVOL_MAPX";
				update_data.CASEVOL_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Antwerp: Reduced Line Utilisation (LU) %") {
				col = "ANTWERP2_MAPX";
				update_data.ANTWERP2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Chaudfontaine: Reduced Line Utilisation (LU) %") {
				col = "CHAUDFONTAINE2_MAPX";
				update_data.CHAUDFONTAINE2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Gent: Reduced Line Utilisation (LU) %") {
				col = "GENT2_MAPX";
				update_data.GENT2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Clamart: Reduced Line Utilisation (LU) %") {
				col = "CLAMART2_MAPX";
				update_data.CLAMART2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Dunkirk: Reduced Line Utilisation (LU) %") {
				col = "DUNKIRK2_MAPX";
				update_data.DUNKIRK2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Grigny: Reduced Line Utilisation (LU) %") {
				col = "GRIGNY2_MAPX";
				update_data.GRIGNY2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Marseille: Reduced Line Utilisation (LU) %") {
				col = "MARSEILLE2_MAPX";
				update_data.MARSEILLE2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Tolouse: Reduced Line Utilisation (LU) %") {
				col = "TOLOUSE2_MAPX";
				update_data.TOLOUSE2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "East Killbride: Reduced Line Utilisation (LU) %") {
				col = "KILLBRIDE2_MAPX";
				update_data.KILLBRIDE2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Edmonton: Reduced Line Utilisation (LU) %") {
				col = "EDMONTON2_MAPX";
				update_data.EDMONTON2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Milton Keynes: Reduced Line Utilisation (LU) %") {
				col = "KEYNES2_MAPX";
				update_data.KEYNES2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Morpeth: Reduced Line Utilisation (LU) %") {
				col = "MORPETH2_MAPX";
				update_data.MORPETH2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Sidcup: Reduced Line Utilisation (LU) %") {
				col = "SIDCUP2_MAPX";
				update_data.SIDCUP2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Wakefield: Reduced Line Utilisation (LU) %") {
				col = "WAKEFIELD2_MAPX";
				update_data.WAKEFIELD2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Dongen: Reduced Line Utilisation (LU) %") {
				col = "DONGEN2_MAPX";
				update_data.DONGEN2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Lorenskog: Reduced Line Utilisation (LU) %") {
				col = "LORENSKOG2_MAPX";
				update_data.LORENSKOG2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Mack: Reduced Line Utilisation (LU) %") {
				col = "MACK2_MAPX";
				update_data.MACK2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Jordbro: Reduced Line Utilisation (LU) %") {
				col = "JORDBRO2_MAPX";
				update_data.JORDBRO2_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Additional Costs") {
				col = "ADDTCOST_MAPX";
				update_data.ADDTCOST_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Other considerations") {
				col = "OTHERCONSIDERATION_MAPX";
				update_data.OTHERCONSIDERATION_MAPX = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Brand Owner Name") {
				col = "BRANDOWNER_NAME";
				update_data.BRANDOWNER_NAME = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Producing Country") {
				col = "PROD_COUNTRY";
				update_data.PROD_COUNTRY = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Code/Material Status") {
				col = "CODE_MAT";
				update_data.CODE_MAT = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "RM Suppressed") {
				col = "RM_SUP";
				update_data.RM_SUP = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Commodities") {
				col = "COMMODITIES";
				for (var i = 0; i < oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems().length; i++) {
					if (i === 0 && oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText() !== "") {
						new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[0].getText();
					} else {
						if (new_value === "") {
							new_value = oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						} else {
							new_value = new_value + "," + oTable.getRows()[selectedIndex].getCells()[selectedIndex1].getSelectedItems()[i].getText();
						}
					}
				}
				console.log(new_value);
				update_data.COMMODITIES = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS NOK") {
				col = "MS_NOK";
				update_data.MS_NOK = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "Brand Owner") {
				col = "BRAND_OWNER";
				update_data.BRAND_OWNER = new_value;
			} else if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MS Mack") {
				col = "MS_MACK";
				update_data.MS_MACK = new_value;
			}
			console.log("here");
			/*	dataModel.update("/DF_DB('" + ref_number + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("status update success");
				that1.refreshAllRequests();
				sap.ui.getCore().byId("common_data").getModel().refresh();
			}

			function updateFailed(error) {
				console.log("error in df");
			}*/
			/*			var data1 = {
				"col": col,
				"val": new_value,
				"ref_number": ref_number
			};
			var datavalue = JSON.stringify(data1);
			console.log(datavalue);*/
			var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updatePlatform.xsjs?col=" + col + "&val=" + new_value +
				"&ref_number=" + ref_number;
			console.log(url);
			$.ajax({
				url: url,
				success: function(msg) {
					that1.refreshAllRequests();
					sap.ui.getCore().byId("common_data").getModel().refresh();
					console.log("Data Saved: " + msg);
				},
				error: function(xhr, textStatus, error) {
					console.log(xhr.statusText);
					console.log(textStatus);
					console.log(error);
				}
			});

			sap.ui.getCore().byId("common_data").getModel().refresh();
			that1.refreshAllRequests();

			/*$.ajax({
				type: "POST",
				url: url,
				contentType: "application/json",
				data: datavalue,
				dataType: "text/json",
    			success: function(result) {
					console.log(result);
				},

				error: function() {
					console.log("Error while calling the server!");
				}
			});*/

			/* that1.getView().getModel().setProperty("/DF_DB('" + ref_number + "')/TITLE",new_value);
            that1.getView().getModel().submitChanges({
                success: function(){
                    console.log("here");
                    console.log(new_value);
                    that1.getView().getModel().refresh();
                }.bind(that1.getView().getModel())
            })*/
			//console.log(update_data);
		}

		function failed1() {}
		setTimeout(function() {
			sap.ui.core.BusyIndicator.hide();
		}, 1);
	},

	_createActivityTable: function() {
		var that = this;
		var cpy_data;
		PCB_ind = "N";
		//	    this._refreshAllRequests();
		//	$("#content_app").css("height","100%");
		DF_IND = "N";
		SKU_IND = "N";
		RM_IND = "N";
	
		oTable = new sap.ui.table.Table("common_data", {
			visibleRowCount: 8,
			//firstVisibleRow: 8,
			selectionMode: sap.ui.table.SelectionMode.Single,
		   	enableColumnFreeze: true, 
		   	//enableCustomFilter: true,
			fixedColumnCount: 1,
			toolbar: new sap.ui.commons.Toolbar({
				rightItems: [new sap.ui.commons.Label({
						text: "Data Views:"
					})

									 , new sap.ui.commons.DropdownBox({
						items: [new sap.ui.core.ListItem({
								text: "Activity Tracker",
								key: "Activity_Tracker"

							}),
										new sap.ui.core.ListItem({
								text: "BNL-SKU",
								key: "BNL_SKU"
							})
										,
										new sap.ui.core.ListItem({
								text: "FR-SKU",
								key: "FR_SKU"
							}),
										new sap.ui.core.ListItem({
								text: "FR-RM",
								key: "FR_RM"
							}),
										new sap.ui.core.ListItem({
								text: "GB-SKU",
								key: "GB_SKU"
							}),
										new sap.ui.core.ListItem({
								text: "GB-RM",
								key: "GB_RM"
							}),
										new sap.ui.core.ListItem({
								text: "MAPX",
								key: "MAPX"
							}),
										new sap.ui.core.ListItem({
								text: "NOSE-SKU",
								key: "NOSE_SKU"
							}),


										new sap.ui.core.ListItem({
								text: "NEBU-RM",
								key: "NEBU_RM"
							}),
										new sap.ui.core.ListItem({
								text: "PCB",
								key: "PCB"

							})],
						change: function(oEvent) {
							//	var displaykey;
							console.log(oEvent.oSource.getSelectedKey());
							displaykey = oEvent.oSource.getSelectedKey();

							if (displaykey === "Activity_Tracker") {
								sap.ui.core.BusyIndicator.show(0);
								DF_IND = "Y";
								SKU_IND = "N";
								PCB_ind = "Y";
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}

								oTable.removeAllColumns();
								//	oTable.setFixedColumnCount(1);

								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oStatus);
								oTable.addColumn(oNIM);
								oTable.addColumn(oNIMCM);

								oTable.addColumn(oInitName);
								oTable.addColumn(oInitDept);
								oTable.addColumn(oAssgDelay);
								oTable.addColumn(oProjPhase);
								oTable.addColumn(oComments);
								oTable.addColumn(oIncVolDet);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oProjTyp);
								oTable.addColumn(oGate1);
								oTable.addColumn(oProjStartDt);
								oTable.addColumn(oGate2);
								oTable.addColumn(oDFReceived);
								oTable.addColumn(oDFWorkflow);
								oTable.addColumn(oPlannedPSS);
								oTable.addColumn(oFinalPSS);
								oTable.addColumn(oMAPCApprv);
								oTable.addColumn(oMAPXDFGo);
								oTable.addColumn(oDFfeedbk);
								oTable.addColumn(oGate3);
								oTable.addColumn(oSchawkDt);
								oTable.addColumn(oPCBFTPDt);
								oTable.addColumn(oBBNISSCOM);
								oTable.addColumn(oPARApproved);
								oTable.addColumn(oPARApprovedActl);
								oTable.addColumn(oTCCC);
								oTable.addColumn(oSKUCrtStart);
								oTable.addColumn(oSKUCrtComp);
								oTable.addColumn(oMAPXpermission);
								oTable.addColumn(oGate4);
								oTable.addColumn(oProdWeek);
								oTable.addColumn(oQuarantine);
								oTable.addColumn(oQrntineongoing);
								oTable.addColumn(oFirstLastDt);
								oTable.addColumn(oActualFirst);
								oTable.addColumn(oActualCompDt);
								oTable.addColumn(oBrand);
								oTable.addColumn(oBrnd_ownr);
								oTable.addColumn(oBrandOwner);

								oTable.addColumn(oSKUNo);
								oTable.addColumn(oArtworkNo);
								oTable.addColumn(oManuSrc);
								oTable.addColumn(oFRCategory);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								console.log("refresh");
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);
							};
							if (displaykey === "PCB") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside PCB");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								DF_IND = "N";
								SKU_IND = "N";
								RM_IND = "Y";
								PCB_ind = "Y";

								oTable.removeAllColumns();

								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oPCBInitiator);
								oTable.addColumn(oSchawkDt);
								oTable.addColumn(oRevisionNumber);
								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oNIM);

								oTable.addColumn(oBrandOwnEmail);
								oTable.addColumn(oArtreviewer);
								oTable.addColumn(oAltPrinter);
								oTable.addColumn(oBAMinstructions);
								oTable.addColumn(oNIMinstructions);
								oTable.addColumn(oBAMReference);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								//oTable.addColumn(oMattype);
								oTable.addColumn(oCommodities);
								oTable.addColumn(oContSize);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oPCBPromoType);
								oTable.addColumn(oDesignMessage);
								oTable.addColumn(oCCEArtworkNum);
								oTable.addColumn(oOptCodeMat);
								oTable.addColumn(oArtworkBarcode);
								oTable.addColumn(oLeadMarket);
								oTable.addColumn(oGridreference);
								oTable.addColumn(oSupplier);
								oTable.addColumn(oMatSubstrate);
								oTable.addColumn(oPrintProcess);
								oTable.addColumn(oLeadArtwork);
								oTable.addColumn(oReqPCBFTP);
								oTable.addColumn(oPCBNIMComments);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);
							};
							if (displaykey === "BNL_SKU") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								SKU_IND = "Y";
								DF_IND = "N";
								RM_IND = "N";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								//	oTable.setFixedColumnCount(1);
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oTonicaMeetMins);
								//oTable.addColumn(oStatusDF);
								oTable.addColumn(oCodeMat);
								oTable.addColumn(oReqNum);
								oTable.addColumn(oNIM);
								oTable.addColumn(oDestmarket)
								//oTable.addColumn(oMAPXDecisionreq);;
								//oTable.addColumn(oProjPhase);
								oTable.addColumn(oMAPXDFGo);
								oTable.addColumn(oStatusProj);
								oTable.addColumn(oTitle);
								oTable.addColumn(oPrjTypnebu);
								oTable.addColumn(oTrialReqNeed);

								oTable.addColumn(oSAPSKUCode);
								//oTable.addColumn(oStatusSAPCode);
								oTable.addColumn(oBAPBASISCode);
								oTable.addColumn(oOthCodes);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oUnknownSKU);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								//oTable.addColumn(oSAPProdSite);
								oTable.addColumn(oProducingSites);
								oTable.addColumn(oProdCountry);
								oTable.addColumn(oInptSKUPallet);
								//oTable.addColumn(oRepackingReq);
								//oTable.addColumn(oBaseInput);
								//oTable.addColumn(DateFormatPack);
								oTable.addColumn(oProdWeek);
								//oTable.addColumn(oStatusFirstProd);
								oTable.addColumn(oThemeEndDate);
								oTable.addColumn(oProdEnddate);
								//oTable.addColumn(oStatusLastProd);
								oTable.addColumn(oFirstLastDt);
								//oTable.addColumn(oFirstDespatch);
								//oTable.addColumn(oStatusFirstDespatch);
								oTable.addColumn(oLastDespatchWeek);
								oTable.addColumn(oComments);
								//oTable.addColumn(oStatusComments);
								oTable.addColumn(oISSCOM);
								oTable.addColumn(oBBNCode);
								oTable.addColumn(oMMI);
								oTable.addColumn(oKitSize);
								oTable.addColumn(oProdDensity);
								oTable.addColumn(oPSSNumber);
								oTable.addColumn(oShelflife);
								oTable.addColumn(oQuarantine);
								oTable.addColumn(oQrntineongoing);
								oTable.addColumn(oIndrunout);
								oTable.addColumn(oForecast);
								oTable.addColumn(oPromoMechanic);
								oTable.addColumn(oMaterialimpt);
								oTable.addColumn(oSNPPL02);
								oTable.addColumn(oPlanner);
								oTable.addColumn(oRepack);
								oTable.addColumn(oFrstProdInpSKU);
								oTable.addColumn(oLstProdInpSKU);
								oTable.addColumn(oQntyInpSKU);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);
							};
							if (displaykey === "GB_SKU") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								SKU_IND = "Y";
								DF_IND = "N";
								RM_IND = "N";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oCodeMat);
								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oNIM);
								oTable.addColumn(oMAPXDFGo);
								oTable.addColumn(oProjPhase);
								oTable.addColumn(oStatus);
								oTable.addColumn(oPromoTyp);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oProdWeek);
								oTable.addColumn(oProdEnddate);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								oTable.addColumn(oBBNCode);
								oTable.addColumn(oShelflife);
								oTable.addColumn(oEAN_EA);
								oTable.addColumn(oEAN_PAC);
								oTable.addColumn(oITF_Case);
								oTable.addColumn(oMarkem);
								oTable.addColumn(oSweetnerData);

								oTable.addColumn(oRepackingReq);
								oTable.addColumn(oBaseInput);
								oTable.addColumn(oBASESAPAPO);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oBAPBASISCode);
								oTable.addColumn(oQuarantineBAP);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oBNF_NeedBy);
								oTable.addColumn(oBNF_ActualDt);
								oTable.addColumn(oMasterDataPM);
								oTable.addColumn(oMMDCode);
								oTable.addColumn(oMMDCodeActual);
								oTable.addColumn(oTLanes);
								oTable.addColumn(oTLanesCmpltd);
								oTable.addColumn(ProdDatabase);
								oTable.addColumn(ProdDBUpdated);
								oTable.addColumn(oSAPSKUPlan_Req);
								oTable.addColumn(oSAPSKU_Planned);
								oTable.addColumn(oSAPSKU_Actual);
								oTable.addColumn(oSaleQuanrantine);

								oTable.addColumn(oItemFlag);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oContSize);
								oTable.addColumn(oPackageType);
								oTable.addColumn(oCPP_Raw);
								//	oTable.addColumn(oCPP_CCE);
								oTable.addColumn(oCPP_Unit);
								oTable.addColumn(oProducingSites);
								oTable.addColumn(oProdCountry);

								oTable.addColumn(oContingency);
								oTable.addColumn(Sidcup_5501_SD1);
								oTable.addColumn(Sidcup_5501_SD2);
								oTable.addColumn(Sidcup_5501_SD3);
								oTable.addColumn(Sidcup_5501_SD4);
								oTable.addColumn(Sidcup_5501_SD5);
								oTable.addColumn(Sidcup_5501_SD6);
								oTable.addColumn(Sidcup_5501_SD7);
								oTable.addColumn(Sidcup_5501_SD8);
								oTable.addColumn(Edmonton_5506_ED1);
								oTable.addColumn(Edmonton_5506_ED2);
								oTable.addColumn(Edmonton_5506_ED3);
								oTable.addColumn(Edmonton_5506_ED4);
								oTable.addColumn(Edmonton_5506_ED5);
								oTable.addColumn(Edmonton_5506_ED6);
								oTable.addColumn(Milton_Keynes_5504_MK1);
								oTable.addColumn(Milton_Keynes_5504_MK2);
								oTable.addColumn(Milton_Keynes_5504_MK3);
								oTable.addColumn(Milton_Keynes_5504_MK4);
								oTable.addColumn(Milton_Keynes_5504_MK5);
								oTable.addColumn(Milton_Keynes_5504_MK67);
								oTable.addColumn(Milton_Keynes_5504_MK89);
								oTable.addColumn(Wakefield_5502_WK1);
								oTable.addColumn(Wakefield_5502_WK2);
								oTable.addColumn(Wakefield_5502_WK3);
								oTable.addColumn(Wakefield_5502_WK4);
								oTable.addColumn(Wakefield_5502_WK5);
								oTable.addColumn(Wakefield_5502_WK6);
								oTable.addColumn(Wakefield_5502_WK7);
								oTable.addColumn(Wakefield_5502_WK8);
								oTable.addColumn(Wakefield_5502_WK9);
								oTable.addColumn(Wakefield_5502_WK11);
								oTable.addColumn(Wakefield_5502_WK17);
								oTable.addColumn(East_Kilbride_5503_EK1);
								oTable.addColumn(East_Kilbride_5503_EK2);
								oTable.addColumn(East_Kilbride_5503_EK3);
								oTable.addColumn(East_Kilbride_5503_EK4);
								oTable.addColumn(East_Kilbride_5503_EK5);
								oTable.addColumn(East_Kilbride_5503_EK6);
								oTable.addColumn(East_Kilbride_5503_EK7);
								oTable.addColumn(East_Kilbride_5503_EK11);
								oTable.addColumn(Morpeth_5546_AW1);
								oTable.addColumn(Morpeth_5546_AW2);
								oTable.addColumn(Morpeth_5546_AW3);
								oTable.addColumn(Morpeth_5546_AW4);
								oTable.addColumn(Third_party_name_pss);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();

								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);

							};
							if (displaykey === "FR_SKU") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								SKU_IND = "Y";
								DF_IND = "N";
								RM_IND = "N";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oBAPBASISCode);
								oTable.addColumn(oBASISpercntry);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oSAPR3);
								oTable.addColumn(oVariantCd);
								oTable.addColumn(oVariantDescrptn);
								oTable.addColumn(oSAPCntry);

								oTable.addColumn(oProducingSites);
								oTable.addColumn(oProdCountry);
								oTable.addColumn(oContingency);
								oTable.addColumn(antwerp_5300);
								oTable.addColumn(MS_Chaudfontaine_5307);
								oTable.addColumn(Ghent_5301);
								oTable.addColumn(Dongen_5400);
								oTable.addColumn(Clamart_5104);
								oTable.addColumn(Dunkirk_5100);
								oTable.addColumn(Grigny_5105);
								oTable.addColumn(Marseille_5106);
								oTable.addColumn(Toulouse_5103);
								oTable.addColumn(third_party);
								oTable.addColumn(release_3rd_party);
								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oNIM);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oFlavour);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oContSize);
								oTable.addColumn(oPackageType);
								oTable.addColumn(oPromoTyp);
								oTable.addColumn(oProdWeek);
								oTable.addColumn(oQuarantine);
								oTable.addColumn(oQrntineongoing);
								oTable.addColumn(oProdEnddate);
								oTable.addColumn(oDun_Full_Container);
								oTable.addColumn(oDun_Full_Container_desc);
								oTable.addColumn(oDun_Printed_Film);
								oTable.addColumn(oDun_Printed_Film_Desc);
								oTable.addColumn(oDun_BOM_ECM);
								oTable.addColumn(oTou_Full_Container);
								oTable.addColumn(oTou_Full_Container_desc);
								oTable.addColumn(oTou_Printed_Film);
								oTable.addColumn(oTou_Printed_Film_Desc);
								oTable.addColumn(oTou_BOM_ECM);
								oTable.addColumn(oCla_Full_Container);
								oTable.addColumn(oCla_Full_Container_desc);
								oTable.addColumn(oCla_Printed_Film);
								oTable.addColumn(oCla_Printed_Film_Desc);
								oTable.addColumn(oCla_BOM_ECM);
								oTable.addColumn(oGri_Full_Container);
								oTable.addColumn(oGri_Full_Container_desc);
								oTable.addColumn(oGri_Printed_Film);
								oTable.addColumn(oGri_Printed_Film_Desc);
								oTable.addColumn(oGri_BOM_ECM);
								oTable.addColumn(oMar_Full_Container);
								oTable.addColumn(oMar_Full_Container_desc);
								oTable.addColumn(oMar_Printed_Film);
								oTable.addColumn(oMar_Printed_Film_Desc);
								oTable.addColumn(oMar_BOM_ECM);
								oTable.addColumn(oAnt_Full_Container);
								oTable.addColumn(oAnt_Full_Container_desc);
								oTable.addColumn(oAnt_Printed_Film);
								oTable.addColumn(oAnt_Printed_Film_Desc);
								oTable.addColumn(oAnt_BOM_ECM);
								oTable.addColumn(oGhe_Full_Container);
								oTable.addColumn(oGhe_Full_Container_desc);
								oTable.addColumn(oGhe_Printed_Film);
								oTable.addColumn(oGhe_Printed_Film_Desc);
								oTable.addColumn(oGhe_BOM_ECM);
								oTable.addColumn(oCha_Full_Container);
								oTable.addColumn(oCha_Full_Container_desc);
								oTable.addColumn(oCha_Printed_Film);
								oTable.addColumn(oCha_Printed_Film_Desc);
								oTable.addColumn(oCha_BOM_ECM);
								oTable.addColumn(oDon_Full_Container);
								oTable.addColumn(oDon_Full_Container_desc);
								oTable.addColumn(oDon_Printed_Film);
								oTable.addColumn(oDon_Printed_Film_Desc);
								oTable.addColumn(oDon_BOM_ECM);
								oTable.addColumn(oPSSNumber);
								oTable.addColumn(oMMI);
								oTable.addColumn(oBBNCode);
								oTable.addColumn(oISSCOM);
								oTable.addColumn(oPalletSpecific);
								oTable.addColumn(oPartCancelled);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);
							};
							if (displaykey === "NOSE_SKU") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								SKU_IND = "Y";
								DF_IND = "N";
								RM_IND = "N";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oTonicaMeetMins);
								//oTable.addColumn(oStatusDF);
								oTable.addColumn(oCodeMat);
								oTable.addColumn(oReqNum);
								oTable.addColumn(oNIM);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oMAPXDecisionreq);
								oTable.addColumn(oMAPXDFGo);
								oTable.addColumn(oTitle);
								oTable.addColumn(oPrjTypnebu);
								oTable.addColumn(oTrialReqNeed);
								oTable.addColumn(oTrailEarliest);
								oTable.addColumn(oTrailLatest);
								oTable.addColumn(oBAPBASISCode);
								//oTable.addColumn(oStatusSAPCode);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oSAPSKUSelling);

								oTable.addColumn(oOthCodes);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oUnknownSKU);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								oTable.addColumn(oInptSKUPallet);
								oTable.addColumn(oProductSplit);

								oTable.addColumn(oProducingSites);
								oTable.addColumn(oProdCountry);
								oTable.addColumn(oProdWeek);
								oTable.addColumn(oFirstLastDt);

								oTable.addColumn(oLastDespatchWeek);
								oTable.addColumn(oTradeRegistration);
								oTable.addColumn(oTradeWindow);
								oTable.addColumn(oComments);
								oTable.addColumn(oISSCOM);
								oTable.addColumn(oBBNCode);
								oTable.addColumn(oPSSNumber);
								oTable.addColumn(oProdDensity);
								oTable.addColumn(DateFormatPack);
								oTable.addColumn(oBarcode_Type);
								oTable.addColumn(oBarcode_Type_Multi);
								oTable.addColumn(oBarcode_Type_Despatch);
								oTable.addColumn(oShelflife);
								oTable.addColumn(oContSize);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oIndrunout);
								oTable.addColumn(oBrnd_ownr);
								oTable.addColumn(oMaterialimpt);

								oTable.addColumn(Type_Drink);
								oTable.addColumn(oSweetnerData);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);
							};
							if (displaykey === "FR_RM") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								DF_IND = "N";
								SKU_IND = "N";
								RM_IND = "Y";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oNIM);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								oTable.addColumn(oCommodities);

								oTable.addColumn(oContSize);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oPromoTyp);
								oTable.addColumn(oDesignMessage);
								oTable.addColumn(oNewArtNum);
								oTable.addColumn(oCCEArtworkNum);
								oTable.addColumn(oOptCodeMat);
								oTable.addColumn(oArtworkBarcode);
								oTable.addColumn(oLeadMarket);
								oTable.addColumn(oGridreference);
								oTable.addColumn(oSupplier);
								oTable.addColumn(oMatSubstrate);
								oTable.addColumn(oPrintProcess);
								oTable.addColumn(oLeadArtwork);
								oTable.addColumn(oSchawkDt);
								oTable.addColumn(oReqPCBFTP);
								oTable.addColumn(oRevPCB);
								oTable.addColumn(oPCBFTPDt);
								oTable.addColumn(oSchawkArtwork);
								oTable.addColumn(oBottlingProddt);
								oTable.addColumn(oBottlingProddtLst);
								oTable.addColumn(oIndrunout);
								//oTable.addColumn(oRawMatdesc);
								oTable.addColumn(oBottleshape);
								oTable.addColumn(oArtwrkCheck);
								oTable.addColumn(oContingency);
								oTable.addColumn(antwerp_5300);
								oTable.addColumn(MS_Chaudfontaine_5307);
								oTable.addColumn(Ghent_5301);
								oTable.addColumn(Dongen_5400);
								oTable.addColumn(Clamart_5104);
								oTable.addColumn(Dunkirk_5100);
								oTable.addColumn(Grigny_5105);
								oTable.addColumn(Grigny_Self_Manufacturing_5116);
								oTable.addColumn(Marseille_5106);
								oTable.addColumn(Toulouse_5103);
								oTable.addColumn(Jordbro_2001);
								oTable.addColumn(Robsrud_2003);
								oTable.addColumn(MD_Mack);
								oTable.addColumn(third_party);
								oTable.addColumn(release_3rd_party);
								oTable.addColumn(oOldRawMat);
								oTable.addColumn(oRawMatdesc);
								oTable.addColumn(oNewRawMat);
								oTable.addColumn(Full_code);
								oTable.addColumn(Full_code_desc);
								oTable.addColumn(oRawMat);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oNoColorLayers);
								oTable.addColumn(oAddtnlPrinting);
								oTable.addColumn(MS_antwerp_5300);
								oTable.addColumn(Chaudfontaine_5307);
								oTable.addColumn(MS_Ghent_5301);
								oTable.addColumn(MS_Dongen_5400);
								oTable.addColumn(MS_Clamart_5104);
								oTable.addColumn(MS_Dunkirk_5100);
								oTable.addColumn(MS_Grigny_5105);
								oTable.addColumn(MS_Grigny_Self_Manufacturing_5116);
								oTable.addColumn(MS_Marseille_5106);
								oTable.addColumn(MS_Toulouse_5103);
								oTable.addColumn(MS_Jordbro_2001);
								oTable.addColumn(MS_Robsrud_2003);
								oTable.addColumn(MS_Mack);
								oTable.addColumn(ms_3rd_party);
								oTable.addColumn(ms_release_3rd_party);
								oTable.addColumn(oMatsuppcom);
								oTable.addColumn(msnok);
								oTable.addColumn(oPartCancelled);
								oTable.addColumn(oRMSup);
								oTable.addColumn(oCliche);
								oTable.addColumn(oponumber);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);

							};
							if (displaykey === "GB_RM") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								DF_IND = "N";
								SKU_IND = "N";
								RM_IND = "Y";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oCodeMat);
								oTable.addColumn(oReqNum);

								oTable.addColumn(oPrjCat);
								oTable.addColumn(oTitle);
								oTable.addColumn(oNIM);
								oTable.addColumn(oProjPhase);
								oTable.addColumn(oStatus);
								oTable.addColumn(oMAPXDFGo);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								oTable.addColumn(oCommodities);

								oTable.addColumn(oContSize);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oPromoTyp);
								oTable.addColumn(oDesignMessage);
								oTable.addColumn(oNewArtNum);
								oTable.addColumn(oCCEArtworkNum);
								oTable.addColumn(oOptCodeMat);
								oTable.addColumn(oArtworkBarcode);
								oTable.addColumn(oLeadMarket);
								oTable.addColumn(oGridreference);

								oTable.addColumn(oSupplier);
								oTable.addColumn(oMatSubstrate);
								oTable.addColumn(oPrintProcess);
								oTable.addColumn(oLeadArtwork);
								oTable.addColumn(oSchawkDt);
								oTable.addColumn(oReqPCBFTP);
								oTable.addColumn(oRevPCB);
								oTable.addColumn(oPCBFTPDt);
								oTable.addColumn(oNoColorLayers);
								oTable.addColumn(oAddtnlPrinting);
								oTable.addColumn(oRawMat);
								oTable.addColumn(oCINCOM);
								oTable.addColumn(oOldRawMat);
								oTable.addColumn(oRawMatdesc);
								oTable.addColumn(oCINCOM_new);
								oTable.addColumn(oNewRawMat);
								oTable.addColumn(Full_code);
								oTable.addColumn(Full_code_desc);
								oTable.addColumn(oPartCancelled);
								oTable.addColumn(oRMSup);
								oTable.addColumn(oChildMat);
								oTable.addColumn(oBrndColor);

								oTable.addColumn(oCINCOMUpdate);
								oTable.addColumn(oSAPCntrctUpd);
								oTable.addColumn(BAPSKUChng);
								oTable.addColumn(Chngtyp);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oBAPBASISCode);
								oTable.addColumn(oProdWeek);
								//	oTable.addColumn(oContingency);
								oTable.addColumn(Sidcup_5501_SD1);
								oTable.addColumn(Sidcup_5501_SD2);
								oTable.addColumn(Sidcup_5501_SD3);
								oTable.addColumn(Sidcup_5501_SD4);
								oTable.addColumn(Sidcup_5501_SD5);
								oTable.addColumn(Sidcup_5501_SD6);
								oTable.addColumn(Sidcup_5501_SD7);
								oTable.addColumn(Sidcup_5501_SD8);
								oTable.addColumn(Edmonton_5506_ED1);
								oTable.addColumn(Edmonton_5506_ED2);
								oTable.addColumn(Edmonton_5506_ED3);
								oTable.addColumn(Edmonton_5506_ED4);
								oTable.addColumn(Edmonton_5506_ED5);
								oTable.addColumn(Edmonton_5506_ED6);
								oTable.addColumn(Milton_Keynes_5504_MK1);
								oTable.addColumn(Milton_Keynes_5504_MK2);
								oTable.addColumn(Milton_Keynes_5504_MK3);
								oTable.addColumn(Milton_Keynes_5504_MK4);
								oTable.addColumn(Milton_Keynes_5504_MK5);
								oTable.addColumn(Milton_Keynes_5504_MK67);
								oTable.addColumn(Milton_Keynes_5504_MK89);
								oTable.addColumn(Wakefield_5502_WK1);
								oTable.addColumn(Wakefield_5502_WK2);
								oTable.addColumn(Wakefield_5502_WK3);
								oTable.addColumn(Wakefield_5502_WK4);
								oTable.addColumn(Wakefield_5502_WK5);
								oTable.addColumn(Wakefield_5502_WK6);
								oTable.addColumn(Wakefield_5502_WK7);
								oTable.addColumn(Wakefield_5502_WK8);
								oTable.addColumn(Wakefield_5502_WK9);
								oTable.addColumn(Wakefield_5502_WK11);
								oTable.addColumn(Wakefield_5502_WK17);
								oTable.addColumn(East_Kilbride_5503_EK1);
								oTable.addColumn(East_Kilbride_5503_EK2);
								oTable.addColumn(East_Kilbride_5503_EK3);
								oTable.addColumn(East_Kilbride_5503_EK4);
								oTable.addColumn(East_Kilbride_5503_EK5);
								oTable.addColumn(East_Kilbride_5503_EK6);
								oTable.addColumn(East_Kilbride_5503_EK7);
								oTable.addColumn(East_Kilbride_5503_EK11);
								oTable.addColumn(Morpeth_5546_AW1);
								oTable.addColumn(Morpeth_5546_AW2);
								oTable.addColumn(Morpeth_5546_AW3);
								oTable.addColumn(Morpeth_5546_AW4);
								oTable.addColumn(Third_party_name_pss);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);

							};
							if (displaykey === "MAPX") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								DF_IND = "N";
								SKU_IND = "Y";
								RM_IND = "Y";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oProjGrp);
								oTable.addColumn(oStatus);
								oTable.addColumn(oGate1);
								oTable.addColumn(oGate2);
								oTable.addColumn(oGate3);
								oTable.addColumn(oGate4);
								oTable.addColumn(oNIM);
								oTable.addColumn(oNIMCM);
								oTable.addColumn(oProjDescription);
								oTable.addColumn(oMAPXDecisionreq);
								oTable.addColumn(oMAPXPreRead);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oBAPBASISCode);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oOldRawMat);
								oTable.addColumn(oRawMatdesc);
								oTable.addColumn(oCommodities);
								oTable.addColumn(oProducingSites);
								oTable.addColumn(sameascurr);
								oTable.addColumn(oP1);
								oTable.addColumn(oP2);
								oTable.addColumn(oP3);
								oTable.addColumn(oP4);
								oTable.addColumn(oP5);
								oTable.addColumn(oP6);
								oTable.addColumn(oP7);
								oTable.addColumn(oP8);
								oTable.addColumn(oP9);
								oTable.addColumn(oP10);
								oTable.addColumn(oP11);
								oTable.addColumn(oP12);
								oTable.addColumn(ototal);
								oTable.addColumn(oSKUCrtComp);
								oTable.addColumn(oBAMDesign);
								oTable.addColumn(oForecastreq);
								oTable.addColumn(oForecastDate);
								oTable.addColumn(oProdWeek);
								oTable.addColumn(oQuarantine);
								oTable.addColumn(oFirstLastDt);
								oTable.addColumn(oShelflife);
								oTable.addColumn(oContSize);
								oTable.addColumn(oAntwerpmapx);
								oTable.addColumn(oChaudfontainemapx);
								oTable.addColumn(oGentmapx);
								oTable.addColumn(oClamartmapx);
								oTable.addColumn(oDunkirkmapx);
								oTable.addColumn(oGrignymapx);
								oTable.addColumn(oMarseillemapx);
								oTable.addColumn(oTolousemapx);
								oTable.addColumn(oKillbridemapx);
								oTable.addColumn(oEdmontonmapx);
								oTable.addColumn(oKeynesmapx);
								oTable.addColumn(oMorpethmapx);
								oTable.addColumn(oSidcupmapx);
								oTable.addColumn(oWakefieldmapx);
								oTable.addColumn(oDongenmapx);
								oTable.addColumn(oLorenskogmapx);
								oTable.addColumn(oMackmapx);
								oTable.addColumn(oJordbromapx);
								oTable.addColumn(ominordermapx);
								oTable.addColumn(ounitconcentratemapx);
								oTable.addColumn(ocasevolmapx);
								oTable.addColumn(oRawMatmapx);
								oTable.addColumn(oEstResidual);
								oTable.addColumn(oRiskmapx);
								oTable.addColumn(oAntwerp2mapx);
								oTable.addColumn(oChaudfontaine2mapx);
								oTable.addColumn(oGent2mapx);
								oTable.addColumn(oClamart2mapx);
								oTable.addColumn(oDunkirk2mapx);
								oTable.addColumn(oGrigny2mapx);
								oTable.addColumn(oMarseille2mapx);
								oTable.addColumn(oTolouse2mapx);
								oTable.addColumn(oKillbride2mapx);
								oTable.addColumn(oEdmonton2mapx);
								oTable.addColumn(oKeynes2mapx);
								oTable.addColumn(oMorpeth2mapx);
								oTable.addColumn(oSidcup2mapx);
								oTable.addColumn(oWakefield2mapx);
								oTable.addColumn(oDongen2mapx);
								oTable.addColumn(oLorenskog2mapx);
								oTable.addColumn(oMack2mapx);
								oTable.addColumn(oJordbro2mapx);
								oTable.addColumn(oaddtcostmapx);
								oTable.addColumn(oothconsiderationsmapx);
								oTable.addColumn(Repackcosts);
								oTable.addColumn(Freightcost);
								oTable.addColumn(oPromoMechanic);
								oTable.addColumn(oThemeEndDate);
								oTable.addColumn(ouniquepack);
								oTable.addColumn(oCustomerlogistics);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();

								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);

							};
							if (displaykey === "NEBU_RM") {
								sap.ui.core.BusyIndicator.show(0);
								console.log("Comes inside BNL SKU");
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);
								}
								DF_IND = "N";
								SKU_IND = "N";
								RM_IND = "Y";
								PCB_ind = "Y";

								oTable.removeAllColumns();
								oTable.addColumn(oRefnum);
								oTable.addColumn(oHierarchy);

								oTable.addColumn(oCodeMat);
								oTable.addColumn(oReqNum);
								oTable.addColumn(oTitle);
								oTable.addColumn(oNIM);
								//oTable.addColumn(oRawMatdesc);
								oTable.addColumn(oDestmarket);
								oTable.addColumn(oBrand);
								oTable.addColumn(oFlavour);
								oTable.addColumn(oCommodities);

								oTable.addColumn(oContSize);
								oTable.addColumn(oProdPack);
								oTable.addColumn(oPromoTyp);
								oTable.addColumn(oDesignMessage);
								oTable.addColumn(oNewArtNum);
								oTable.addColumn(oCCEArtworkNum);
								oTable.addColumn(oOptCodeMat);
								oTable.addColumn(oArtworkBarcode);
								oTable.addColumn(oLeadMarket);
								oTable.addColumn(oGridreference);
								oTable.addColumn(oSupplier);
								oTable.addColumn(oMatSubstrate);
								oTable.addColumn(oPrintProcess);
								oTable.addColumn(oLeadArtwork);
								oTable.addColumn(oSchawkDt);
								oTable.addColumn(oReqPCBFTP);
								oTable.addColumn(oRevPCB);
								oTable.addColumn(oPCBFTPDt);
								oTable.addColumn(oSchawkArtwork);
								oTable.addColumn(oBottlingProddt);
								oTable.addColumn(oBottlingProddtLst);
								oTable.addColumn(oNoColorLayers);
								oTable.addColumn(oIndrunout);
								oTable.addColumn(oBottleshape);
								oTable.addColumn(oArtwrkCheck);
								oTable.addColumn(oContingency);
								oTable.addColumn(antwerp_5300);
								oTable.addColumn(MS_Chaudfontaine_5307);
								oTable.addColumn(Ghent_5301);
								oTable.addColumn(Dongen_5400);
								oTable.addColumn(Clamart_5104);
								oTable.addColumn(Dunkirk_5100);
								oTable.addColumn(Grigny_5105);
								oTable.addColumn(Grigny_Self_Manufacturing_5116);
								oTable.addColumn(Marseille_5106);
								oTable.addColumn(Toulouse_5103);
								oTable.addColumn(Jordbro_2001);
								oTable.addColumn(Robsrud_2003);
								oTable.addColumn(MD_Mack);
								oTable.addColumn(third_party);
								oTable.addColumn(release_3rd_party);
								oTable.addColumn(oOldRawMat);
								oTable.addColumn(oRawMatdesc);
								oTable.addColumn(oNewRawMat);
								oTable.addColumn(Full_code);
								oTable.addColumn(Full_code_desc);
								oTable.addColumn(oRawMat);
								oTable.addColumn(oSAPSKUCode);
								oTable.addColumn(oProdDescription);
								oTable.addColumn(oAddtnlPrinting);
								oTable.addColumn(MS_antwerp_5300);
								oTable.addColumn(Chaudfontaine_5307);
								oTable.addColumn(MS_Ghent_5301);
								oTable.addColumn(MS_Dongen_5400);
								oTable.addColumn(MS_Clamart_5104);
								oTable.addColumn(MS_Dunkirk_5100);
								oTable.addColumn(MS_Grigny_5105);
								oTable.addColumn(MS_Grigny_Self_Manufacturing_5116);
								oTable.addColumn(MS_Marseille_5106);
								oTable.addColumn(MS_Toulouse_5103);
								oTable.addColumn(MS_Jordbro_2001);
								oTable.addColumn(MS_Robsrud_2003);
								oTable.addColumn(MS_Mack);
								oTable.addColumn(ms_3rd_party);
								oTable.addColumn(ms_release_3rd_party);

								oTable.addColumn(oMatsuppcom);
								oTable.addColumn(msnok);
								oTable.addColumn(oPartCancelled);
								oTable.addColumn(oRMSup);
								oTable.addColumn(oModDate);
								oTable.addColumn(oModUser);
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);

							};
							/*	if (displaykey === "Complete") {
								sap.ui.core.BusyIndicator.show(0);
								DF_IND = "N";
								SKU_IND = "N";
								RM_IND = "N";
								for (var i = 0; i < oTable.getColumns().length; i++) {
									oTable.getColumns()[i].setVisible(true);

									console.log(oTable.getColumns()[i].getLabel().getText());
								}
								that.refreshAllRequests();
								setTimeout(function() {

									sap.ui.core.BusyIndicator.hide();
								}, 2000);
							}; */
						}

					})],
				items: [
										 /*  new sap.ui.commons.Button({
						icon: "sap-icon://action-settings",
						press: function() {
							//[EE] - I added this if statement so the view isnt re-created and the previous selections remain present
							if (that._oDialog === undefined) {
								that._oDialog = sap.ui.xmlfragment("view.Dialog4", that.getView().getController());
								//that._oDialog.setRememberSelections(true);
								console.log(that._oDialog._table.getColumns());
								// Multi-select if required
								//	var bMultiSelect = !! oEvent.getSource().data("multi");
								//		that._oDialog.setMultiSelect(bMultiSelect);

								that.getView().addDependent(that._oDialog);
								var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
								that.getView().setModel(oModel);
							}
							that._oDialog.open();

						}
					}),*/
						new sap.ui.commons.Button({
						text: "Un-filter All",
						press: function() {
						    var oListBinding = oTable.getBinding();
oListBinding.aFilters = null;
for (var i = 0; i < oTable.getColumns().length; i++){
oTable.getColumns()[i].setFiltered(false);}
oTable.getModel().refresh(true);
						}}),
										new sap.ui.commons.Button({
						text: "Export Table",
						press: function() {
							/*console.log("PCB_ind");
							console.log(PCB_ind);
							var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
							if (PCB_ind === "N") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "", true, oTable);
							} else {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "PCB", true, oTable);
							}*/
							console.log(displaykey);
							if (displaykey === "Activity_Tracker") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "Activity_Tracker", true, oTable);
							} else if (displaykey === "BNL_SKU") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "BNL_SKU", true, oTable);
							} else if (displaykey === "FR_SKU") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "FR_SKU", true, oTable);
							} else if (displaykey === "FR_RM") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "FR_RM", true, oTable);
							} else if (displaykey === "GB_SKU") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "GB_SKU", true, oTable);
							} else if (displaykey === "GB_RM") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "GB_RM", true, oTable);
							} else if (displaykey === "MAPX") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "MAPX", true, oTable);
							} else if (displaykey === "NOSE_SKU") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "NOSE_SKU", true, oTable);
							} else if (displaykey === "NEBU_RM") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "NEBU_RM", true, oTable);
							} else if (displaykey === "PCB") {
								that.JSONToCSVConvertor(oTable.getBinding().getModel().getData().allRequests, "PCB", true, oTable);
							}
							//  model.read(oTable.getBinding().getDownloadUrl().substr(19), null, null, true, fSuccess, fError);
						}
					}),

										new sap.ui.commons.Button({
						icon: "sap-icon://create",
						tooltip: "Create",
						//	text: "Insert Record",
						press: function() {
							sap.ui.core.BusyIndicator.show(0);

							setTimeout(function() {
								var selectedIndex_df_id = 0;
								var selectedIndex_ref_num = 0;
								var number_ref1 = 0;
								var number_ref1_p = 0;
								that.getView().getModel("df_request_model").read("/DF_DB", null, null, false, success1aa, failed1aa);

								function success1aa(data) {
									var ref_num = [];
									var psuedo_ref_num = [];
									for (var i = 0; i < data.results.length; i++) {
										if (!isNaN(data.results[i].REF_NUMBER)) {
											ref_num.push(data.results[i].REF_NUMBER);
										}
										if (!isNaN(data.results[i].PSEUDO_REF_NUM)) {
											psuedo_ref_num.push(data.results[i].PSEUDO_REF_NUM);
										}
									}
									number_ref1 = Math.max.apply(Math, ref_num);
									number_ref1_p = Math.max.apply(Math, psuedo_ref_num);

									number_ref1 = number_ref1 + 1;
									number_ref1_p = number_ref1_p + 1;
								}

								function failed1aa() {}

								selectedIndex_common = oTable.getSelectedIndex();
								if (selectedIndex_common === -1) {
									selectedIndex_common = 0;
								}
								console.log(selectedIndex_common);
								console.log(oTable.getContextByIndex(selectedIndex_common).getProperty("DF_ID"))
								var selected_dfid_common = oTable.getContextByIndex(selectedIndex_common).getProperty("DF_ID");
								var selected_hierarchy = oTable.getContextByIndex(selectedIndex_common).getProperty("HIERARCHY");
								//var selected_ref_num_common = oTable.getRows()[selectedIndex_common].getCells()[0].getValue();
								console.log(selected_dfid_common);
								//console.log(selected_ref_num_common);

								var new_row_data = {
									"REF_NUMBER": number_ref1,
									"DF_ID": selected_dfid_common,
									"PSEUDO_REF_NUM": number_ref1_p,
									"HIERARCHY": selected_hierarchy
								};
								that.getView().getModel("df_request_model").create("/DF_DB", new_row_data, null, createSuccess, createFailed);

								function createSuccess() {
									that.refreshAllRequests();
								}

								function createFailed(error) {
									console.log(error);
									console.log("error in df");
								}
								sap.ui.core.BusyIndicator.hide();
							}, 1000);
						}
					}),

										new sap.ui.commons.Button({
						icon: "sap-icon://delete",
						tooltip: "Delete",
						//	text: "Delete Record",
						press: function() {

							sap.ui.core.BusyIndicator.show(0);

							setTimeout(function() {
								selectedIndex_del = oTable.getSelectedIndex();

								var common_platform_del = oTable.getContextByIndex(selectedIndex_del).getProperty("PSEUDO_REF_NUM");
								console.log(common_platform_del);
								var selected_ref_num_del = " ";
								that.getView().getModel('df_request_model').read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + common_platform_del + "'", null, null,
									false, success, failed);

								function success(data) {
									console.log(data);
									selected_ref_num_del = data.results[0].REF_NUMBER;
								}

								function failed() {
									console.log("read unsuccessful");
								}
								console.log(selected_ref_num_del);
								that.getView().getModel('df_request_model').remove("/DF_DB('" + selected_ref_num_del + "')", null, createSuccess,
									createFailed);

								function createSuccess() {
									var message = new sap.ui.commons.MessageBox.alert("Record deleted successfully");
									sap.ui.getCore().byId("common_data").getModel().getData().allRequests = [];
									that.getView().getModel('df_request_model').read("/DF_DB", null, null, false, success, failed);

									function success(data) {

										for (var i = 0; i < data.results.length; i++) {
											//sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
											if (DF_IND === "Y") {
												if (data.results[i].HIERARCHY === "DF") {
													sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
												}
											} else if (SKU_IND === "Y" && RM_IND === "N") {
												if (data.results[i].HIERARCHY === "SKU") {
													sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
												}
											} else if (RM_IND === "Y" && SKU_IND === "N") {
												if (data.results[i].HIERARCHY === "RM") {
													sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
												}
											} else if (RM_IND === "Y" && SKU_IND === "Y") {
												if (data.results[i].HIERARCHY !== "DF") {
													sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
												}
											} else {
												sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
											}

										}
										sap.ui.getCore().byId("common_data").getModel().setData(sap.ui.getCore().byId("common_data").getModel().getData());

									}

									function failed(error) {}

								}

								function createFailed(error) {
									console.log("error");
								}

								sap.ui.core.BusyIndicator.hide();
							}, 2000);
						}
					}),

									new sap.ui.commons.Button({
						icon: "sap-icon://document",
						tooltip: "Copy",
						//	text: "Copy Record",
						press: function() {
							cpy_data = "";
							sap.ui.core.BusyIndicator.show(0);

							setTimeout(function() {
								selectedIndex_del = oTable.getSelectedIndex();
								console.log(oTable.getContextByIndex(selectedIndex_del).getProperty("PSEUDO_REF_NUM"));
								copy_PSEUDO_REF_NUM = oTable.getContextByIndex(selectedIndex_del).getProperty("PSEUDO_REF_NUM");

								that.getView().getModel('df_request_model').read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + copy_PSEUDO_REF_NUM + "'", null, null,
									false, success, failed);

								function success(data) {
									selected_ref_num_del = data.results[0].REF_NUMBER;
									that.getView().getModel('df_request_model').read("/DF_DB('" + selected_ref_num_del + "')", null, null, false, s1, f1);

									function s1(d) {
										console.log(d);
										cpy_data = d;
										console.log(cpy_data);
									}

									function f1() {}
								}

								function failed() {}
								sap.ui.core.BusyIndicator.hide();
							}, 2000);
						}
					}),
									new sap.ui.commons.Button({
						icon: "sap-icon://documents",
						tooltip: "Paste",
						//	text: "Paste Record",
						press: function() {
							sap.ui.core.BusyIndicator.show(0);
							var ref_number_array = [];

							setTimeout(function() {
								console.log(cpy_data);
								var number_ref1 = 0;
								var number_ref1_p = 0;
								var ref_num = [];
								var psuedo_ref_num = [];
								that.getView().getModel("df_request_model").read("/DF_DB", null, null, false, success1aa, failed1aa);

								function success1aa(data) {
									for (var i = 0; i < data.results.length; i++) {
										if (!isNaN(data.results[i].REF_NUMBER)) {
											ref_num.push(data.results[i].REF_NUMBER);
										}
										if (!isNaN(data.results[i].PSEUDO_REF_NUM)) {
											psuedo_ref_num.push(data.results[i].PSEUDO_REF_NUM);
										}
									}
									number_ref1 = Math.max.apply(Math, ref_num);
									number_ref1_p = Math.max.apply(Math, psuedo_ref_num);

									number_ref1 = number_ref1 + 1;
									number_ref1_p = number_ref1_p + 1;

									console.log(number_ref1 + "," + number_ref1_p);

									cpy_data.REF_NUMBER = number_ref1;
									cpy_data.PSEUDO_REF_NUM = number_ref1_p;
									console.log(cpy_data);

									that.getView().getModel("df_request_model").create("/DF_DB", cpy_data, null, createSuccess, createFailed);

									function createSuccess() {
										sap.ui.getCore().byId("common_data").getModel().getData().allRequests = [];
										that.getView().getModel('df_request_model').read("/DF_DB", null, null, false, success, failed);

										function success(data) {

											for (var i = 0; i < data.results.length; i++) {
												//sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
												if (DF_IND === "Y") {
													if (data.results[i].HIERARCHY === "DF") {
														sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
													}
												} else if (SKU_IND === "Y" && RM_IND === "N") {
													if (data.results[i].HIERARCHY === "SKU") {
														sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
													}
												} else if (RM_IND === "Y" && SKU_IND === "N") {
													if (data.results[i].HIERARCHY === "RM") {
														sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
													}
												} else if (RM_IND === "Y" && SKU_IND === "Y") {
													if (data.results[i].HIERARCHY !== "DF") {
														sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
													}
												} else {
													sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
												}

											}
											sap.ui.getCore().byId("common_data").getModel().setData(sap.ui.getCore().byId("common_data").getModel().getData());
										}

										function failed(error) {}

									}

									function createFailed(error) {}
								}

								function failed1aa() {}
								sap.ui.core.BusyIndicator.hide();
							}, 2000);
						}
					})

									 ]

			}),
			cellClick: function(oEvent) {
				if (oEvent.getParameters().columnIndex === "1") { //DF_ID is in column 1 
					var currentrowIndex = (oEvent.getParameters().rowIndex);
					var seldata = oTable.getRows()[1].getCells()[1].toString();
				}
			}

		});
        
		var oRefnum = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({

				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "PSEUDO_REF_NUM"),
			sortProperty: "PSEUDO_REF_NUM",
			filterProperty: "PSEUDO_REF_NUM",
			width: "0px"
		});
		oTable.addColumn(oRefnum);
		var oReqNum = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Request Number",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "DF_ID"),
			sortProperty: "DF_ID",
			filterProperty: "DF_ID",
			width: "100px"
		});
		oTable.addColumn(oReqNum);
		var oHierarchy = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Hierarchy",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.DropdownBox({
				items: {
					path: "/allHierarchy",
					template: new sap.ui.core.ListItem({
						key: {
							path: "HIERARCHY_NAME"
						},
						text: {
							path: "HIERARCHY_NAME"
						}
					})
				},
				selectedKey: {
					path: "HIERARCHY",
					formatter: function(value) {
						if (value === null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak"),
			sortProperty: "HIERARCHY",
			filterProperty: "HIERARCHY",
			width: "100px"
		});
		oTable.addColumn(oHierarchy);
		/*	oTable.addColumn(new sap.ui.table.Column({
									label: new sap.ui.commons.Label({
										text: "Status Color",
										wrapping: true
									}),
									template: new sap.ui.commons.TextView().bindProperty("text", "STATUS_COLOR",
									function(cellValue) {  
                                       // remove styles else it will overwrite   
                                        this.removeStyleClass("redcolor");  
                                        this.removeStyleClass("yellowcolor");  
                                       
                                        if (cellValue === "RED") {  
                                           this.addStyleClass("redcolor");   
                                        } else if(cellValue === "YELLOW") {  
                                            this.addStyleClass("yellowcolor");  
                                        } 
                                        return cellValue;  
                                    }
										).addStyleClass("wordBreak"),
									sortProperty: "STATUS_COLOR",
									filterProperty: "STATUS_COLOR",
									width: "100px"
								})); */

		var oStatus = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Request Status",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allRequestStatus",
					template: new sap.ui.core.ListItem({
						key: {
							path: "STATUS_NAME"
						},
						text: {
							path: "STATUS_NAME"
						}
					})
				},
				selectedKey: {
					path: "STATUS_NAME",
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					//var path = e.getSource().getBindingContext().getPath();
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "STATUS_NAME");
				},
				width: "100%"
			}).addStyleClass("wordBreak").addStyleClass("grey"),
			sortProperty: "STATUS_NAME",
			filterProperty: "STATUS_NAME",
			width: "200px"
		});
		oTable.addColumn(oStatus);
		var oInitName = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Initiator Name",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "INITIATOR");
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "INITIATOR").addStyleClass("grey"),
			sortProperty: "INITIATOR",
			filterProperty: "INITIATOR",
			width: "100px"
		});
		oTable.addColumn(oInitName);
		var oNIM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM",
				wrapping: true
			}).addStyleClass("blue"),
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
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "NIM1");
				},
				width: "100%"
			}).addStyleClass("wordBreak").addStyleClass("grey"),
			sortProperty: "NIM1",
			filterProperty: "NIM1",
			width: "200px"
		});
		oTable.addColumn(oNIM);
		var oTitle = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Title of Project",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "TITLE");
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TITLE").addStyleClass("grey"),
			sortProperty: "TITLE",
			filterProperty: "TITLE",
			width: "300px"
		});
		oTable.addColumn(oTitle);

		var oPromoTyp = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Promotion Type",
				wrapping: true

			}).addStyleClass("blue"),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allThemes",
					template: new sap.ui.core.ListItem({
						key: {
							path: "THEME_NAME"
						},
						text: {
							path: "THEME_NAME"
						}
					})
				},
				selectedKeys: {
					path: 'THEME_TYPE',
					formatter: function(value) {
						if (value) {
							/*console.log("convert");
							console.log(value);*/
							value = value.split(",");
							/*console.log(value);*/
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "THEME_TYPE",
			filterProperty: "THEME_TYPE",
			width: "200px"
		});
		oTable.addColumn(oPromoTyp);

		var oThemeEndDate = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Theme End Date (CCEP Warehouse availability)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
			    valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "THEME_END_DATE"),
			sortProperty: "THEME_END_DATE",
			filterProperty: "THEME_END_DATE",
			width: "200px"
		});
		oTable.addColumn(oThemeEndDate);
		var oInitDept = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Initiator Department",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allInitDept",
					template: new sap.ui.core.ListItem({
						key: {
							path: "DEPT_NAME"
						},
						text: {
							path: "DEPT_NAME"
						}
					})
				},
				selectedKey: {
					path: "INITIATOR_DEPT",
					formatter: function(value) {
						if (value === null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "INITIATOR_DEPT",
			filterProperty: "INITIATOR_DEPT",
			width: "300px"
		});
		oTable.addColumn(oInitDept);
		var oSNPPL02 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SNPPL02",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allSNPPL02",
					template: new sap.ui.core.ListItem({
						key: {
							path: "SNPPL_NAME"
						},
						text: {
							path: "SNPPL_NAME"
						}
					})
				},
				selectedKey: {
					path: 'SNPPL02',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "SNPPL02",
			filterProperty: "SNPPL02",
			width: "200px"
		});
		oTable.addColumn(oSNPPL02);

		var oBrandOwnEmail = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Brand Owner Email",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BRAND_OWNER_EMAIL"),
			sortProperty: "BRAND_OWNER_EMAIL",
			filterProperty: "BRAND_OWNER_EMAIL",
			width: "100px"
		});
		oTable.addColumn(oBrandOwnEmail);
		var oDestmarket = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Destination Market",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allCountries",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COUNTRY_CODE"
						},
						text: {
							path: "COUNTRY_CODE"
						}
					})
				},
				selectedKey: {
					path: "SELLING_COUNTRY",
					formatter: function(value) {
						if (value === null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "SELLING_COUNTRY");
				},
				width: "100%"
			}).addStyleClass("grey"),
			sortProperty: "SELLING_COUNTRY",
			filterProperty: "SELLING_COUNTRY",
			width: "170px"
		});
		oTable.addColumn(oDestmarket);
		var oFirstLastDt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Date of First/Last Despatches from CCE Warehouses",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIRST_LAST_DISPATCH_DATE"),
			sortProperty: "FIRST_LAST_DISPATCH_DATE",
			filterProperty: "FIRST_LAST_DISPATCH_DATE",
			width: "200px"
		});
		oTable.addColumn(oFirstLastDt);

		var oSAPCntry = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP Country",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "COUNTRY"),
			sortProperty: "COUNTRY",
			filterProperty: "COUNTRY",
			width: "100px"
		});
		oTable.addColumn(oSAPCntry);
		var oProdDescription = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Description",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "DESC"),
			sortProperty: "DESC",
			filterProperty: "DESC",
			width: "100px"
		});
		oTable.addColumn(oProdDescription);
		var oBrand = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Brand",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allbrand",

					template: new sap.ui.core.ListItem({
						key: {
							path: "BRAND_NAME"
						},
						text: {
							path: "BRAND_NAME"
						}
					})
				},
				selectedKeys: {
					path: 'BRAND',
					formatter: function(value) {
						if (value) {
							/*	console.log("convert");
							console.log(value);*/
							value = value.split(",");
							/*console.log(value);*/
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "BRAND",
			filterProperty: "BRAND",
			width: "200px"
		});
		oTable.addColumn(oBrand);

		var oFlavour = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Flavour",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allflavour",

					template: new sap.ui.core.ListItem({
						key: {
							path: "FLAVOUR_NAME"
						},
						text: {
							path: "FLAVOUR_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "FLAVOUR"),
			sortProperty: "FLAVOUR",
			filterProperty: "FLAVOUR",
			width: "300px"
		});
		oTable.addColumn(oFlavour);

		/*	var oFlavour = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Flavour",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "FLAVOUR"),
			sortProperty: "FLAVOUR",
			filterProperty: "FLAVOUR",
			width: "100px"
		});
		oTable.addColumn(oFlavour); */
		var oContSize = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Container Size",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcontainer",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SIZE_NAME"
						},
						text: {
							path: "SIZE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "CONTAINER"),
			sortProperty: "CONTAINER",
			filterProperty: "CONTAINER",
			width: "200px"
		});
		oTable.addColumn(oContSize);
		/*	var oContSize = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Container Size",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CONTAINER"),
			sortProperty: "CONTAINER",
			filterProperty: "CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oContSize); */
		var oProdPack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Pack",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allpropack",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SIZE_NAME"
						},
						text: {
							path: "SIZE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PACK"),
			sortProperty: "PACK",
			filterProperty: "PACK",
			width: "200px"
		});
		oTable.addColumn(oProdPack);
		/*	var oProdPack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Pack",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PACK"),
			sortProperty: "PACK",
			filterProperty: "PACK",
			width: "100px"
		});
		oTable.addColumn(oProdPack); */
		var oPackageType = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Package Type",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allpacktype",

					template: new sap.ui.core.ListItem({
						key: {
							path: "PACKAGE_NAME"
						},
						text: {
							path: "PACKAGE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PACKAGE"),
			sortProperty: "PACKAGE",
			filterProperty: "PACKAGE",
			width: "200px"
		});
		oTable.addColumn(oPackageType);
		/*	var oPackageType = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Package Type",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PACKAGE"),
			sortProperty: "PACKAGE",
			filterProperty: "PACKAGE",
			width: "100px"
		});
		oTable.addColumn(oPackageType); */

		var oEAN_EA = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "EAN (EA)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "EAN"),
			sortProperty: "EAN",
			filterProperty: "EAN",
			width: "100px"
		});
		oTable.addColumn(oEAN_EA);
		var oEAN_PAC = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "EAN PAC (ZCU)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "ZCU"),
			sortProperty: "ZCU",
			filterProperty: "ZCU",
			width: "100px"
		});
		oTable.addColumn(oEAN_PAC);
		var oITF_Case = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ITF Case (CS)",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CS"),
			sortProperty: "CS",
			filterProperty: "CS",
			width: "100px"
		});
		oTable.addColumn(oITF_Case);

		var oShelflife = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Shelf-life (in days)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "SHELF"),
			sortProperty: "SHELF",
			filterProperty: "SHELF",
			width: "100px"
		});
		oTable.addColumn(oShelflife);
		var oSAPProdSite = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP Producing Sites",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "SITES"),
			sortProperty: "SITES",
			filterProperty: "SITES",
			width: "100px"
		});
		oTable.addColumn(oSAPProdSite);

		var oP1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P1",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD1"),
			sortProperty: "PERIOD1",
			filterProperty: "PERIOD1",
			width: "100px"
		});
		oTable.addColumn(oP1);
		var oP2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P2",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD2"),
			sortProperty: "PERIOD2",
			filterProperty: "PERIOD2",
			width: "100px"
		});
		oTable.addColumn(oP2);
		var oP3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P3",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD3"),
			sortProperty: "PERIOD3",
			filterProperty: "PERIOD3",
			width: "100px"
		});
		oTable.addColumn(oP3);
		var oP4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P4",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD4"),
			sortProperty: "PERIOD4",
			filterProperty: "PERIOD4",
			width: "100px"
		});
		oTable.addColumn(oP4);
		var oP5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P5",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD5"),
			sortProperty: "PERIOD5",
			filterProperty: "PERIOD5",
			width: "100px"
		});
		oTable.addColumn(oP5);
		var oP6 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P6",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD6"),
			sortProperty: "PERIOD6",
			filterProperty: "PERIOD6",
			width: "100px"
		});
		oTable.addColumn(oP6);
		var oP7 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P7",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD7"),
			sortProperty: "PERIOD7",
			filterProperty: "PERIOD7",
			width: "100px"
		});
		oTable.addColumn(oP7);
		var oP8 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P8",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD8"),
			sortProperty: "PERIOD8",
			filterProperty: "PERIOD8",
			width: "100px"
		});
		oTable.addColumn(oP8);
		var oP9 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P9",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD9"),
			sortProperty: "PERIOD9",
			filterProperty: "PERIOD9",
			width: "100px"
		});
		oTable.addColumn(oP9);
		var oP10 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P10",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD10"),
			sortProperty: "PERIOD10",
			filterProperty: "PERIOD10",
			width: "100px"
		});
		oTable.addColumn(oP10);
		var oP11 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P11",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD11"),
			sortProperty: "PERIOD11",
			filterProperty: "PERIOD11",
			width: "100px"
		});
		oTable.addColumn(oP11);
		var oP12 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "P12",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "PERIOD12"),
			sortProperty: "PERIOD12",
			filterProperty: "PERIOD12",
			width: "100px"
		});
		oTable.addColumn(oP12);
		var ototal = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TOTAL",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "TOTAL"),
			sortProperty: "TOTAL",
			filterProperty: "TOTAL",
			width: "100px"
		});
		oTable.addColumn(ototal);
		var oIncVolDet = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Incremental Volumes details",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "INCREMENTAL_VOLUME1"),
			sortProperty: "INCREMENTAL_VOLUME1",
			filterProperty: "INCREMENTAL_VOLUME1",
			width: "100px"
		});
		oTable.addColumn(oIncVolDet);
		var oMaterialimpt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Please select all Materials which are impacted",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allmatchange",

					template: new sap.ui.core.ListItem({
						key: {
							path: "MATERIAL"
						},
						text: {
							path: "MATERIAL"
						}
					})
				},
				selectedKeys: {
					path: 'MATERIAL_CHANGE',
					formatter: function(value) {
						if (value) {
							/*	console.log("convert");
							console.log(value);*/
							value = value.split(",");
							/*console.log(value);*/
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}),
			sortProperty: "MATERIAL_CHANGE",
			filterProperty: "MATERIAL_CHANGE",
			width: "170px"
		});
		oTable.addColumn(oMaterialimpt);

		var oPromoMechanic = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Promotional Mechanic",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allpromomech",

					template: new sap.ui.core.ListItem({
						key: {
							path: "PROMOTIONAL"
						},
						text: {
							path: "PROMOTIONAL"
						}
					})
				},
				selectedKeys: {
					path: 'PROMOTIONAL_MECHANIC',
					formatter: function(value) {
						if (value) {
							console.log("convert");
							console.log(value);
							value = value.split(",");
							console.log(value);
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}),
			sortProperty: "PROMOTIONAL_MECHANIC",
			filterProperty: "PROMOTIONAL_MECHANIC",
			width: "170px"
		});
		oTable.addColumn(oPromoMechanic);
		var oPrjTypnebu = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Type NEBU",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allnebu",

					template: new sap.ui.core.ListItem({
						key: {
							path: "PROJTYPNEBU_NAME"
						},
						text: {
							path: "PROJTYPNEBU_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PROJTYPNEBU"),
			sortProperty: "PROJTYPNEBU",
			filterProperty: "PROJTYPNEBU",
			width: "170px"
		});
		oTable.addColumn(oPrjTypnebu);

		var oNIMCM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM Led or CM Led",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allnimcm",

					template: new sap.ui.core.ListItem({
						key: {
							path: "NIM_CM"
						},
						text: {
							path: "NIM_CM"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "NIM_CM"),
			sortProperty: "NIM_CM",
			filterProperty: "NIM_CM",
			width: "170px"
		});
		oTable.addColumn(oNIMCM);
		var oAssgDelay = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Assignment Delay",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allDelay",

					template: new sap.ui.core.ListItem({
						key: {
							path: "ASSIGNMENT_NAME"
						},
						text: {
							path: "ASSIGNMENT_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "ASSIGNMENT_DELAY"),
			sortProperty: "ASSIGNMENT_DELAY",
			filterProperty: "ASSIGNMENT_DELAY",
			width: "200px"
		});
		oTable.addColumn(oAssgDelay);
		var oProjGrp = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Group",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allGroups",

					template: new sap.ui.core.ListItem({
						key: {
							path: "GROUP_NAME"
						},
						text: {
							path: "GROUP_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PROJECT_GROUP"),
			sortProperty: "PROJECT_GROUP",
			filterProperty: "PROJECT_GROUP",
			width: "250px"
		});
		oTable.addColumn(oProjGrp);
		var oProjTyp = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Type",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allProjectTypes",

					template: new sap.ui.core.ListItem({
						key: {
							path: "TYPE_NAME"
						},
						text: {
							path: "TYPE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PROJECT_TYPE"),
			sortProperty: "PROJECT_TYPE",
			filterProperty: "PROJECT_TYPE",
			width: "250px"
		});
		oTable.addColumn(oProjTyp);
		var oProjDescription = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Description",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PROJECT_DESCRIPTION"),
			sortProperty: "PROJECT_DESCRIPTION",
			filterProperty: "PROJECT_DESCRIPTION",
			width: "100px"
		});
		oTable.addColumn(oProjDescription);

		var oManuSrc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Manufacturing Source",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allmfgsource",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SOURCE_NAME"
						},
						text: {
							path: "SOURCE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.changeFRSKU(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "MFG_SOURCE"),
			sortProperty: "MFG_SOURCE",
			filterProperty: "MFG_SOURCE",
			width: "250px"
		});
		oTable.addColumn(oManuSrc);
		var oProducingSites = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Site(s)",
				wrapping: true
			}).addStyleClass("blue"),
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
							/*	console.log("convert");
							console.log(value);*/
							value = value.split(",");
							/*console.log(value);*/
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
					that.checkProdCountry(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "PROD_SITES",
			filterProperty: "PROD_SITES",
			width: "300px"
		});
		oTable.addColumn(oProducingSites);
		var oProdCountry = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Country",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: false
			}).addStyleClass("wordBreak").bindProperty("value", "PROD_COUNTRY"),
			sortProperty: "PROD_COUNTRY",
			filterProperty: "PROD_COUNTRY",
			width: "100px"
		});
		oTable.addColumn(oProdCountry);
		var oRepackingReq = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Repacking Required",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "REPACKING"),
			sortProperty: "REPACKING",
			filterProperty: "REPACKING",
			width: "200px"
		});
		oTable.addColumn(oRepackingReq);

		var oBaseInput = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "If Repack: input SAP code and % Split",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "BASE_INPUT"),
			sortProperty: "BASE_INPUT",
			filterProperty: "BASE_INPUT",
			width: "100px"
		});
		oTable.addColumn(oBaseInput);
		var oSKUNo = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Number of SKU's",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "NUM_SKU").attachLiveChange(function(e) {
	 								if (e.getParameters().liveValue * 0 !== 0) {
	 									e.getSource().setValue("")
	 								} else {}
	 							}),
			sortProperty: "NUM_SKU",
			filterProperty: "NUM_SKU",
			width: "100px"
		});
		oTable.addColumn(oSKUNo);
		var oArtworkNo = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Number of Artworks",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "NUM_ARTWORKS").attachLiveChange(function(e) {
	 								if (e.getParameters().liveValue * 0 !== 0) {
	 									e.getSource().setValue("")
	 								} else {}
	 							}),
			sortProperty: "NUM_ARTWORKS",
			filterProperty: "NUM_ARTWORKS",
			width: "100px"
		});
		oTable.addColumn(oArtworkNo);

		var oGate1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gate 1",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GATE1"),
			sortProperty: "GATE1",
			filterProperty: "GATE1",
			width: "200px"
		});
		oTable.addColumn(oGate1);
		var oGate2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gate 2",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GATE2"),
			sortProperty: "GATE2",
			filterProperty: "GATE2",
			width: "200px"
		});
		oTable.addColumn(oGate2);
		var oProjStartDt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Start Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "START_DATE"),
			sortProperty: "START_DATE",
			filterProperty: "START_DATE",
			width: "200px"
		});
		oTable.addColumn(oProjStartDt);

		var oMAPCApprv = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Planned MAPC Approved",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MAPC"),
			sortProperty: "MAPC",
			filterProperty: "MAPC",
			width: "200px"
		});
		oTable.addColumn(oMAPCApprv);
		var oMAPXDFGo = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Planned MAPX DF Go",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "MAPX");
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MAPX").addStyleClass("grey"),
			sortProperty: "MAPX",
			filterProperty: "MAPX",
			width: "200px"
		});
		oTable.addColumn(oMAPXDFGo);

		var oTrailEarliest = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Trial Earliest Date",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TRIAL_E"),
			sortProperty: "TRIAL_E",
			filterProperty: "TRIAL_E",
			width: "200px"
		});
		oTable.addColumn(oTrailEarliest);
		var oTrailLatest = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Trial Latest Date",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TRIAL_L"),
			sortProperty: "TRIAL_L",
			filterProperty: "TRIAL_L",
			width: "200px"
		});
		oTable.addColumn(oTrailLatest);
		var oBAMDesign = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAM Design to Schawk",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAM"),
			sortProperty: "BAM",
			filterProperty: "BAM",
			width: "200px"
		});
		oTable.addColumn(oBAMDesign);
		var oForecastreq = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Date of Forecast Required",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FORECAST_REQ"),
			sortProperty: "FORECAST_REQ",
			filterProperty: "FORECAST_REQ",
			width: "200px"
		});
		oTable.addColumn(oForecastreq);

		var oFirstDespatch = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First Despatches",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIRST_DESP"),
			sortProperty: "FIRST_DESP",
			filterProperty: "FIRST_DESP",
			width: "200px"
		});
		oTable.addColumn(oFirstDespatch);
		var oForecastDate = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Forecast Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FORECAST_DATE"),
			sortProperty: "FORECAST_DATE",
			filterProperty: "FORECAST_DATE",
			width: "200px"
		});
		oTable.addColumn(oForecastDate);
		var oPSSNumber = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PSS Number",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PSS_REQ_INPT"),
			sortProperty: "PSS_REQ_INPT",
			filterProperty: "PSS_REQ_INPT",
			width: "100px"
		});
		oTable.addColumn(oPSSNumber);
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PSS Planned Completion Date",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PSS_AVIAL_INPT"),
			sortProperty: "PSS_AVIAL_INPT",
			filterProperty: "PSS_AVIAL_INPT",
			width: "200px"
		}));
		var Freightcost = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Freight Cost",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FREIGHT_COST"),
			sortProperty: "FREIGHT_COST",
			filterProperty: "FREIGHT_COST",
			width: "100px"
		});
		oTable.addColumn(Freightcost);
		var oQuarantine = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quarantine period for finished product on first production required?",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "QUANRANTINE_INPT"),
			sortProperty: "QUANRANTINE_INPT",
			filterProperty: "QUANRANTINE_INPT",
			width: "200px"
		});
		oTable.addColumn(oQuarantine);
		var oQrntineongoing = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quarantine period for finished product on ongoing production required?",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ONGOING"),
			sortProperty: "ONGOING",
			filterProperty: "ONGOING",
			width: "200px"
		});
		oTable.addColumn(oQrntineongoing);

		var oMasterDataPM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Master Data Project Manager",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MANAGER"),
			sortProperty: "MANAGER",
			filterProperty: "MANAGER",
			width: "100px"
		});
		oTable.addColumn(oMasterDataPM);

		var oSupplier = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Supplier",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allSupplierfb",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SUPPLIER_NAME"
						},
						text: {
							path: "SUPPLIER_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "SUPPLIER"),
			sortProperty: "SUPPLIER",
			filterProperty: "SUPPLIER",
			width: "200px"
		});
		oTable.addColumn(oSupplier);
		var oRawMatmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Raw Material Write-Off Assessment",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "RAW"),
			sortProperty: "RAW",
			filterProperty: "RAW",
			width: "100px"
		});
		oTable.addColumn(oRawMatmapx);
		/*oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Minimum Order Quantity",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ORDER"),
			sortProperty: "ORDER",
			filterProperty: "ORDER",
			width: "100px"
		}));*/

		var oMatsuppcom = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Material Supply General Comments",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MATERIAL_LEAD_INPT"),
			sortProperty: "MATERIAL_LEAD_INPT",
			filterProperty: "MATERIAL_LEAD_INPT",
			width: "100px"
		});
		oTable.addColumn(oMatsuppcom);
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "RMWO Budget",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: {
					path: "/yes_no_tbd",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SELECT"
						},
						text: {
							path: "SELECT"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "SUPPLIER_NEW_INPT"),
			sortProperty: "SUPPLIER_NEW_INPT",
			filterProperty: "SUPPLIER_NEW_INPT",
			width: "170px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "RMWO Currency",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: {
					path: "/allCurrency",

					template: new sap.ui.core.ListItem({
						key: {
							path: "CURRENCY"
						},
						text: {
							path: "CURRENCY"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "ARTWORK_REPO_INPT"),
			sortProperty: "ARTWORK_REPO_INPT",
			filterProperty: "ARTWORK_REPO_INPT",
			width: "250px"
		}));

		var oEstResidual = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Estimation of Residual Risk",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "RISK"),
			sortProperty: "RISK",
			filterProperty: "RISK",
			width: "100px"
		});
		oTable.addColumn(oEstResidual);
		var oRiskmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Risk",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "RISK_MAPX"),
			sortProperty: "RISK_MAPX",
			filterProperty: "RISK_MAPX",
			width: "100px"
		});
		oTable.addColumn(oRiskmapx);
		var oProdWeek = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First estimate Production week to hit required first Despatch",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "EST_PROD_WEEK_INPT");
					that.changeFirstDate(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EST_PROD_WEEK_INPT").addStyleClass("grey"),
			sortProperty: "EST_PROD_WEEK_INPT",
			filterProperty: "EST_PROD_WEEK_INPT",
			width: "200px"
		});
		oTable.addColumn(oProdWeek);
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Production Site & Line",
				wrapping: true
			}),
			template: new sap.m.ComboBox({
				items: {
					path: "/allSiteLine",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SITE"
						},
						text: {
							path: "SITE"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "S1"),
			sortProperty: "S1",
			filterProperty: "S1",
			width: "170px"
		}));

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Repacker",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "REPACKER"),
			sortProperty: "REPACKER",
			filterProperty: "REPACKER",
			width: "100px"
		}));
		var Repackcosts = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Repack Costs",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "COST"),
			sortProperty: "COST",
			filterProperty: "COST",
			width: "100px"
		});
		oTable.addColumn(Repackcosts);
		var Full_code = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "New Full Code",
				wrapping: true
			}).addStyleClass("pinkgreen"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NEW_FULL_CODE"),
			sortProperty: "NEW_FULL_CODE",
			filterProperty: "NEW_FULL_CODE",
			width: "100px"
		});
		oTable.addColumn(Full_code);
		var Full_code_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "New Full Code Description",
				wrapping: true
			}).addStyleClass("pinkgreen"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NEW_FULL_CODE_DESC"),
			sortProperty: "NEW_FULL_CODE_DESC",
			filterProperty: "NEW_FULL_CODE_DESC",
			width: "100px"
		});
		oTable.addColumn(Full_code_desc);
		var oPrjCat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Category",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PROJECT_CATEGORY"),
			sortProperty: "PROJECT_CATEGORY",
			filterProperty: "PROJECT_CATEGORY",
			width: "100px"
		});
		oTable.addColumn(oPrjCat);
		var oPalletSpecific = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Palletisation Specification",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PALLET_SPECIFIC"),
			sortProperty: "PALLET_SPECIFIC",
			filterProperty: "PALLET_SPECIFIC",
			width: "100px"
		});
		oTable.addColumn(oPalletSpecific);

		var oProjPhase = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Project Phase",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allProjectPhase",

					template: new sap.ui.core.ListItem({
						key: {
							path: "PROJECT_PHASE"
						},
						text: {
							path: "PROJECT_PHASE"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "PROJECT_PHASE")
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PROJECT_PHASE").addStyleClass("grey"),
			sortProperty: "PROJECT_PHASE",
			filterProperty: "PROJECT_PHASE",
			width: "250px"
		});
		oTable.addColumn(oProjPhase);
		var oCommodities = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Commodities",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allCommodities",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COMMODITIES_NAME"
						},
						text: {
							path: "COMMODITIES_NAME"
						}
					})
				},
				selectedKeys: {
					path: 'COMMODITIES',
					formatter: function(value) {
						if (value) {
							value = value.split(",");
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "COMMODITIES",
			filterProperty: "COMMODITIES",
			width: "250px"
		});
		oTable.addColumn(oCommodities);
		var oComments = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Comments",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextArea({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "COMMENTS"),
			sortProperty: "COMMENTS",
			filterProperty: "COMMENTS",
			width: "450px"
		});
		oTable.addColumn(oComments);
		var oDFReceived = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Received",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DF_RECEIVED"),
			sortProperty: "DF_RECEIVED",
			filterProperty: "DF_RECEIVED",
			width: "200px"
		});
		oTable.addColumn(oDFReceived);

		var oDFWorkflow = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Workflow Circulation Started",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
					that._updatePlanned(this,oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DF_CIRCULATION_STARTED"),
			sortProperty: "DF_CIRCULATION_STARTED",
			filterProperty: "DF_CIRCULATION_STARTED",
			width: "200px"
		});
		oTable.addColumn(oDFWorkflow);
		var oPlannedPSS = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Planned Final PSS Completion (+14 days)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PLANNED_FINAL_PSS_COMPLETION"),
			sortProperty: "PLANNED_FINAL_PSS_COMPLETION",
			filterProperty: "PLANNED_FINAL_PSS_COMPLETION",
			width: "200px"
		});
		oTable.addColumn(oPlannedPSS);
		var oFinalPSS = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Final PSS Completion",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FINAL_PSS_COMPLETION"),
			sortProperty: "FINAL_PSS_COMPLETION",
			filterProperty: "FINAL_PSS_COMPLETION",
			width: "200px"
		});
		oTable.addColumn(oFinalPSS);
		var oDFfeedbk = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "DF Feedback sent to Stakeholder",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FEEDBACK_TO_STAKEHOLDER"),
			sortProperty: "FEEDBACK_TO_STAKEHOLDER",
			filterProperty: "FEEDBACK_TO_STAKEHOLDER",
			width: "200px"
		});
		oTable.addColumn(oDFfeedbk);
		var oGate3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gate 3",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GATE_3"),
			sortProperty: "GATE_3",
			filterProperty: "GATE_3",
			width: "200px"
		});
		oTable.addColumn(oGate3);
		var oBBNISSCOM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BBN/ ISSCOM Created",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ISSCOM_CREATED"),
			sortProperty: "ISSCOM_CREATED",
			filterProperty: "ISSCOM_CREATED",
			width: "200px"
		});
		oTable.addColumn(oBBNISSCOM);
		var oPARApproved = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PAR Approved (Plan)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PAR_APPROVED_PLAN"),
			sortProperty: "PAR_APPROVED_PLAN",
			filterProperty: "PAR_APPROVED_PLAN",
			width: "200px"
		});
		oTable.addColumn(oPARApproved);
		var oPARApprovedActl = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PAR Approved (Actual)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PAR_APPROVED_ACTUAL"),
			sortProperty: "PAR_APPROVED_ACTUAL",
			filterProperty: "PAR_APPROVED_ACTUAL",
			width: "200px"
		});
		oTable.addColumn(oPARApprovedActl);
		var oTCCC = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "TCCC Pricing Per Part (Letter)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TCCC_PRICING"),
			sortProperty: "TCCC_PRICING",
			filterProperty: "TCCC_PRICING",
			width: "200px"
		});
		oTable.addColumn(oTCCC);
		var oSKUCrtStart = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SKU Creation (Start)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SKU_CREATION_START"),
			sortProperty: "SKU_CREATION_START",
			filterProperty: "SKU_CREATION_START",
			width: "200px"
		});
		oTable.addColumn(oSKUCrtStart);
		var oSKUCrtComp = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SKU Creation (Completed)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SKU_CREATION_COMPLETE"),
			sortProperty: "SKU_CREATION_COMPLETE",
			filterProperty: "SKU_CREATION_COMPLETE",
			width: "200px"
		});
		oTable.addColumn(oSKUCrtComp);
		var oMAPXpermission = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MAPX Permission to Produce",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MAPX_PERMISSION"),
			sortProperty: "MAPX_PERMISSION",
			filterProperty: "MAPX_PERMISSION",
			width: "200px"
		});
		oTable.addColumn(oMAPXpermission);
		var oGate4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gate 4",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GATE_4"),
			sortProperty: "GATE_4",
			filterProperty: "GATE_4",
			width: "200px"
		});
		oTable.addColumn(oGate4);
		var oActualFirst = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Actual First Despatch",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
					that.changeFirstDespatchDate(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ACTUAL_FIRST_DESPATCH"),
			sortProperty: "ACTUAL_FIRST_DESPATCH",
			filterProperty: "ACTUAL_FIRST_DESPATCH",
			width: "200px"
		});
		oTable.addColumn(oActualFirst);
		var oActualCompDt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Actual Project Completion Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ACTUAL_COMPLETION_DESPATCH"),
			sortProperty: "ACTUAL_COMPLETION_DESPATCH",
			filterProperty: "ACTUAL_COMPLETION_DESPATCH",
			width: "200px"
		});
		oTable.addColumn(oActualCompDt);
		var oLeadMarket = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Lead Market",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allLeadMarket",

					template: new sap.ui.core.ListItem({
						key: {
							path: "LEAD_NAME"
						},
						text: {
							path: "LEAD_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "LEAD_MARKET"),
			sortProperty: "LEAD_MARKET",
			filterProperty: "LEAD_MARKET",
			width: "200px"
		});
		oTable.addColumn(oLeadMarket);
		var oDesignMessage = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Design Message",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allDesignMessage",

					template: new sap.ui.core.ListItem({
						key: {
							path: "MESSAGE"
						},
						text: {
							path: "MESSAGE"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "DESIGN_MESSAGE"),
			sortProperty: "DESIGN_MESSAGE",
			filterProperty: "DESIGN_MESSAGE",
			width: "200px"
		});
		oTable.addColumn(oDesignMessage);
		var oCCEArtworkNum = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CCEP Artwork Number",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CCE_ARTWORK_NUMBER"),
			sortProperty: "CCE_ARTWORK_NUMBER",
			filterProperty: "CCE_ARTWORK_NUMBER",
			width: "100px"
		});
		oTable.addColumn(oCCEArtworkNum);
		var oOptCodeMat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Optional Additional Code Material",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "OPTIONAL_ADDITIONAL_CODE"),
			sortProperty: "OPTIONAL_ADDITIONAL_CODE",
			filterProperty: "OPTIONAL_ADDITIONAL_CODE",
			width: "100px"
		});
		oTable.addColumn(oOptCodeMat);
		var oArtworkBarcode = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Artwork Barcode (EAN/ ITF)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ARTWORK_BARCODE"),
			sortProperty: "ARTWORK_BARCODE",
			filterProperty: "ARTWORK_BARCODE",
			width: "100px"
		});
		oTable.addColumn(oArtworkBarcode);
		var oGridreference = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Grid Reference",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRID_REF"),
			sortProperty: "GRID_REF",
			filterProperty: "GRID_REF",
			width: "100px"
		});
		oTable.addColumn(oGridreference);
		var oMatSubstrate = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Material Substrate",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allMaterialSubstrate",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SUBSTRATE_NAME"
						},
						text: {
							path: "SUBSTRATE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "MATERAL_SUBSTRATE"),
			sortProperty: "MATERAL_SUBSTRATE",
			filterProperty: "MATERAL_SUBSTRATE",
			width: "210px"
		});
		oTable.addColumn(oMatSubstrate);
		var oPrintProcess = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Print Process",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allPrintProcess",

					template: new sap.ui.core.ListItem({
						key: {
							path: "PRINT_PROCESS"
						},
						text: {
							path: "PRINT_PROCESS"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PRINT_PROCESS"),
			sortProperty: "PRINT_PROCESS",
			filterProperty: "PRINT_PROCESS",
			width: "210px"
		});
		oTable.addColumn(oPrintProcess);
		var oLeadArtwork = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Lead of Artwork Development",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allLeadArtwork",

					template: new sap.ui.core.ListItem({
						key: {
							path: "LEAD_NAME"
						},
						text: {
							path: "LEAD_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "LEAD_ARTWORK_DEVELOPMENT"),
			sortProperty: "LEAD_ARTWORK_DEVELOPMENT",
			filterProperty: "LEAD_ARTWORK_DEVELOPMENT",
			width: "210px"
		});
		oTable.addColumn(oLeadArtwork);
		var oReqPCBFTP = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Required PCB FTP Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "REQ_PCB_FTP_DATE"),
			sortProperty: "REQ_PCB_FTP_DATE",
			filterProperty: "REQ_PCB_FTP_DATE",
			width: "200px"
		});
		oTable.addColumn(oReqPCBFTP);
		var oSchawkDt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PCB to Schawk Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "PCB_TO_SCHAWK");
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PCB_TO_SCHAWK").addStyleClass("grey"),
			sortProperty: "PCB_TO_SCHAWK",
			filterProperty: "PCB_TO_SCHAWK",
			width: "200px"
		});
		oTable.addColumn(oSchawkDt);
		var oRevPCB = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Revised PCB FTP Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PCB_FTP_DATE"),
			sortProperty: "PCB_FTP_DATE",
			filterProperty: "PCB_FTP_DATE",
			width: "200px"
		});
		oTable.addColumn(oRevPCB);
		var oPCBFTPDt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Actual PCB FTP Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				valueFormat: "yyyy-MM-dd",
				change: function() {
					that._updateActivityTable(this, oTable);
					that.updateAllHierarchy(this, oTable, "ACTUAL_PCB_FTP_DATE");
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ACTUAL_PCB_FTP_DATE").addStyleClass("grey"),
			sortProperty: "ACTUAL_PCB_FTP_DATE",
			filterProperty: "ACTUAL_PCB_FTP_DATE",
			width: "200px"
		});
		oTable.addColumn(oPCBFTPDt);
		var oSchawkArtwork = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Schawk Artwork Status",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SCHAWK_ARTWORK_STATUS"),
			sortProperty: "SCHAWK_ARTWORK_STATUS",
			filterProperty: "SCHAWK_ARTWORK_STATUS",
			width: "100px"
		});
		oTable.addColumn(oSchawkArtwork);
		var oNoColorLayers = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Number of Colour Layers",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NUMBER_COLOR_LAYERS"),
			sortProperty: "NUMBER_COLOR_LAYERS",
			filterProperty: "NUMBER_COLOR_LAYERS",
			width: "100px"
		});
		oTable.addColumn(oNoColorLayers);
		var oAddtnlPrinting = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Additional Printing Features",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ADDITONAL_PRINT_FEATURES"),
			sortProperty: "ADDITONAL_PRINT_FEATURES",
			filterProperty: "ADDITONAL_PRINT_FEATURES",
			width: "100px"
		});
		oTable.addColumn(oAddtnlPrinting);

		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Indication Last Bottling Production",
				wrapping: true
			}),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "LAST_BOTTLING_PRODUCTION"),
			sortProperty: "LAST_BOTTLING_PRODUCTION",
			filterProperty: "LAST_BOTTLING_PRODUCTION",
			width: "200px"
		}));

		var oBottleshape = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Bottle Shape",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BOTTLE_SHAPE"),
			sortProperty: "BOTTLE_SHAPE",
			filterProperty: "BOTTLE_SHAPE",
			width: "100px"
		});
		oTable.addColumn(oBottleshape)

		var oPartCancelled = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Part Cancelled/ Obsolete",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				selectedKey: {
					path: "PART_CANCELLED",
					formatter: function(value) {
					    console.log(value);
						
						if (value === "YES") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.addStyleClass("grey");
						}
						else if (value=== "NO"){
							this.removeStyleClass("grey");
							this.addStyleClass("white1");
						}
						else{
							value = "";
							this.removeStyleClass("grey");
							this.addStyleClass("white1");
						}
					   
						return value;
					}
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "PART_CANCELLED",
			filterProperty: "PART_CANCELLED",
			width: "170px"
		});
		oTable.addColumn(oPartCancelled);
		var ouniquepack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Unique Pack",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "UNIQUE_PACK"),
			sortProperty: "UNIQUE_PACK",
			filterProperty: "UNIQUE_PACK",
			width: "170px"
		});
		oTable.addColumn(ouniquepack);
		var oCustomerlogistics = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Approved by Customer Logistics",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "CUSTOMER_LOGISTICS"),
			sortProperty: "CUSTOMER_LOGISTICS",
			filterProperty: "CUSTOMER_LOGISTICS",
			width: "170px"
		});
		oTable.addColumn(oCustomerlogistics);
		var sameascurr = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Same as current (from the Volumes)",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "SAME_AS_CURR"),
			sortProperty: "SAME_AS_CURR",
			filterProperty: "SAME_AS_CURR",
			width: "170px"
		});
		oTable.addColumn(sameascurr);

		var oChildMat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Child Material Reference",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHLD_REF"),
			sortProperty: "CHLD_REF",
			filterProperty: "CHLD_REF",
			width: "100px"
		});
		oTable.addColumn(oChildMat);
		var oBrndColor = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Brand or Colour (E.g. Closure Colour)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BRAND_COLOR"),
			sortProperty: "BRAND_COLOR",
			filterProperty: "BRAND_COLOR",
			width: "100px"
		});
		oTable.addColumn(oBrndColor);
		var BAPSKUChng = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP/SKU Change?",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "BAP_SKU_CHANGE"),
			sortProperty: "BAP_SKU_CHANGE",
			filterProperty: "BAP_SKU_CHANGE",
			width: "170px"
		});
		oTable.addColumn(BAPSKUChng);
		var Chngtyp = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Type of change",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allTypeChange",

					template: new sap.ui.core.ListItem({
						key: {
							path: "TYPE_NAME"
						},
						text: {
							path: "TYPE_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "TYPE_OF_CHANGE"),
			sortProperty: "TYPE_OF_CHANGE",
			filterProperty: "TYPE_OF_CHANGE",
			width: "210px"
		});
		oTable.addColumn(Chngtyp);
		var oCINCOM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CINCOM Old Part Number",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CINCOM_OLD_PART_NUMBER"),
			sortProperty: "CINCOM_OLD_PART_NUMBER",
			filterProperty: "CINCOM_OLD_PART_NUMBER",
			width: "100px"
		});
		oTable.addColumn(oCINCOM);
		var oCINCOM_new = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CINCOM New Part Number",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CINCOM_NEW_PART_NUMBER"),
			sortProperty: "CINCOM_NEW_PART_NUMBER",
			filterProperty: "CINCOM_NEW_PART_NUMBER",
			width: "100px"
		});
		oTable.addColumn(oCINCOM_new);
		var oOldRawMat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Old SAP Raw Material Number",
				wrapping: true
			}).addStyleClass("greenblue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "OLD_SAP_RAW_MATERIAL_NUMBER"),
			sortProperty: "OLD_SAP_RAW_MATERIAL_NUMBER",
			filterProperty: "OLD_SAP_RAW_MATERIAL_NUMBER",
			width: "100px"
		});
		oTable.addColumn(oOldRawMat);
		var oNewRawMat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "New SAP Raw Material Number",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "UNIT5"),
			sortProperty: "UNIT5",
			filterProperty: "UNIT5",
			width: "100px"
		});
		oTable.addColumn(oNewRawMat);
		var oRawMat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "New SAP Raw Material Description",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NEW_SAP_RAW_MATERIAL_DESCRIPTION"),
			sortProperty: "NEW_SAP_RAW_MATERIAL_DESCRIPTION",
			filterProperty: "NEW_SAP_RAW_MATERIAL_DESCRIPTION",
			width: "100px"
		});
		oTable.addColumn(oRawMat);
		var oCINCOMUpdate = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CINCOM Contracts Updated Date",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CINCOM_CONTRACTS"),
			sortProperty: "CINCOM_CONTRACTS",
			filterProperty: "CINCOM_CONTRACTS",
			width: "200px"
		});
		oTable.addColumn(oCINCOMUpdate);
		var oSAPCntrctUpd = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP Contracts Updated Date",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_CONTRACTS_UPDATED_DATE"),
			sortProperty: "SAP_CONTRACTS_UPDATED_DATE",
			filterProperty: "SAP_CONTRACTS_UPDATED_DATE",
			width: "200px"
		});
		oTable.addColumn(oSAPCntrctUpd);

		var oSAPSKUCode = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_CODE"),
			sortProperty: "SAP_SKU_CODE",
			filterProperty: "SAP_SKU_CODE",
			width: "100px"
		});
		oTable.addColumn(oSAPSKUCode);
		var oBAPBASISCode = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP/ BASIS Code",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAP_BASIS_CODE"),
			sortProperty: "BAP_BASIS_CODE",
			filterProperty: "BAP_BASIS_CODE",
			width: "100px"
		});
		oTable.addColumn(oBAPBASISCode);

		var oProdEnddate = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Production End Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRODUCTION_END_DATE"),
			sortProperty: "PRODUCTION_END_DATE",
			filterProperty: "PRODUCTION_END_DATE",
			width: "200px"
		});
		oTable.addColumn(oProdEnddate);
		var oItemFlag = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Item flag for the Traders Report",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "ITEM_FLAG_TRADERS_REPORT"),
			sortProperty: "ITEM_FLAG_TRADERS_REPORT",
			filterProperty: "ITEM_FLAG_TRADERS_REPORT",
			width: "170px"
		});
		oTable.addColumn(oItemFlag);
		var oContingency = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Contingency Site and Line",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.MultiComboBox({
				items: {
					path: "/allContSiteLine",
					template: new sap.ui.core.ListItem({
						key: {
							path: "NAME"
						},
						text: {
							path: "NAME"
						}
					})
				},
				selectedKeys: {
					path: 'CONTIGENCY_SITE_LINE',
					formatter: function(value) {
						if (value) {
							value = value.split(",");
							return value;
						}
					}
				},
				selectionFinish: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "CONTIGENCY_SITE_LINE",
			filterProperty: "CONTIGENCY_SITE_LINE",
			width: "250px"
		});
		oTable.addColumn(oContingency);

		var oBASESAPAPO = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BASE SAP/APO code",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BASE_SAP_APO_CODE"),
			sortProperty: "BASE_SAP_APO_CODE",
			filterProperty: "BASE_SAP_APO_CODE",
			width: "100px"
		});
		oTable.addColumn(oBASESAPAPO);
		var oSweetnerData = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sweetener Data",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allSweetnerData",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SWEETNER_NAME"
						},
						text: {
							path: "SWEETNER_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "SWEETNER_DATA"),
			sortProperty: "SWEETNER_DATA",
			filterProperty: "SWEETNER_DATA",
			width: "250px"
		});
		oTable.addColumn(oSweetnerData);
		var oQuarantineBAP = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "On-going Quarantine Required?",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "QUARANTINE_BAP_CODE"),
			sortProperty: "QUARANTINE_BAP_CODE",
			filterProperty: "QUARANTINE_BAP_CODE",
			width: "100px"
		});
		oTable.addColumn(oQuarantineBAP);

		var oCliche = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Cliche/Plate Costs",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLICHE_PLATE_COSTS"),
			sortProperty: "CLICHE_PLATE_COSTS",
			filterProperty: "CLICHE_PLATE_COSTS",
			width: "100px"
		});
		oTable.addColumn(oCliche);
		var oponumber = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PO Number",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PO_NUMBER"),
			sortProperty: "PO_NUMBER",
			filterProperty: "PO_NUMBER",
			width: "100px"
		});
		oTable.addColumn(oponumber);
		var oMMDCode = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MMD Code Extended Planned Date",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MMD_CODE_EXTENDED_PLANNED_DATE"),
			sortProperty: "MMD_CODE_EXTENDED_PLANNED_DATE",
			filterProperty: "MMD_CODE_EXTENDED_PLANNED_DATE",
			width: "200px"
		});
		oTable.addColumn(oMMDCode);
		var oMMDCodeActual = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MMD Code Extended Actual Date",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MMD_CODE_EXTENDED_ACTUAL_DATE"),
			sortProperty: "MMD_CODE_EXTENDED_ACTUAL_DATE",
			filterProperty: "MMD_CODE_EXTENDED_ACTUAL_DATE",
			width: "200px"
		});
		oTable.addColumn(oMMDCodeActual);
		var oTLanes = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "T-Lanes and Forecast Split Planned Date",
				wrapping: true
			}).addStyleClass("grey"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "T_LANES_FORCAST_PLANNED_DATE"),
			sortProperty: "T_LANES_FORCAST_PLANNED_DATE",
			filterProperty: "T_LANES_FORCAST_PLANNED_DATE",
			width: "200px"
		});
		oTable.addColumn(oTLanes);
		var oTLanesCmpltd = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "T-Lanes and Forecast Split Completed Date",
				wrapping: true
			}).addStyleClass("grey"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "T_LANES_FORCAST_COMPLETED_DATE"),
			sortProperty: "T_LANES_FORCAST_COMPLETED_DATE",
			filterProperty: "T_LANES_FORCAST_COMPLETED_DATE",
			width: "200px"
		});
		oTable.addColumn(oTLanesCmpltd);
		var ProdDatabase = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Database Planned Date",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRODUCT_DATABASE_PLANNED_DATE"),
			sortProperty: "PRODUCT_DATABASE_PLANNED_DATE",
			filterProperty: "PRODUCT_DATABASE_PLANNED_DATE",
			width: "200px"
		});
		oTable.addColumn(ProdDatabase);
		var ProdDBUpdated = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Database Updated Date",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DB_UPDATED_DATE"),
			sortProperty: "DB_UPDATED_DATE",
			filterProperty: "DB_UPDATED_DATE",
			width: "200px"
		});
		oTable.addColumn(ProdDBUpdated);
		var oBNF_NeedBy = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BOM Notification Form (BNF) Required By",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BNF_NEEDBY_DATE"),
			sortProperty: "BNF_NEEDBY_DATE",
			filterProperty: "BNF_NEEDBY_DATE",
			width: "200px"
		});
		oTable.addColumn(oBNF_NeedBy);
		var oBNF_ActualDt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BOM Notification Form (BNF) Date Issued",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BNF_ACTUAL_DATE"),
			sortProperty: "BNF_ACTUAL_DATE",
			filterProperty: "BNF_ACTUAL_DATE",
			width: "200px"
		});
		oTable.addColumn(oBNF_ActualDt);
		var oSAPSKUPlan_Req = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code Ready for Planning (Required) Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_PLANNING_REQ_DATE"),
			sortProperty: "SAP_SKU_PLANNING_REQ_DATE",
			filterProperty: "SAP_SKU_PLANNING_REQ_DATE",
			width: "200px"
		});
		oTable.addColumn(oSAPSKUPlan_Req);
		var oSAPSKU_Planned = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code Ready for Planning (Planned) Date",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_PLANNING_PLANNED_DATE"),
			sortProperty: "SAP_SKU_PLANNING_PLANNED_DATE",
			filterProperty: "SAP_SKU_PLANNING_PLANNED_DATE",
			width: "200px"
		});
		oTable.addColumn(oSAPSKU_Planned);
		var oSAPSKU_Actual = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code Ready for Planning (Actual) Date",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_PLANNING_ACTUAL_DATE"),
			sortProperty: "SAP_SKU_PLANNING_ACTUAL_DATE",
			filterProperty: "SAP_SKU_PLANNING_ACTUAL_DATE",
			width: "200px"
		});
		oTable.addColumn(oSAPSKU_Actual);
		var oMMI = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MMI/ Concentrate BOM/ Pack Size Configuration",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CONCENTRATE_BOM"),
			sortProperty: "CONCENTRATE_BOM",
			filterProperty: "CONCENTRATE_BOM",
			width: "100px"
		});
		oTable.addColumn(oMMI);

		var DateFormatPack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Date Format on Packaging",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PACKAGING_DATE_FORMAT"),
			sortProperty: "PACKAGING_DATE_FORMAT",
			filterProperty: "PACKAGING_DATE_FORMAT",
			width: "100px"
		});
		oTable.addColumn(DateFormatPack);
		var oBBNCode = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BBN Code",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BBN_CODE"),
			sortProperty: "BBN_CODE",
			filterProperty: "BBN_CODE",
			width: "100px"
		});
		oTable.addColumn(oBBNCode);
		var oISSCOM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ISSCOM Code",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ISSCOM_CODE"),
			sortProperty: "ISSCOM_CODE",
			filterProperty: "ISSCOM_CODE",
			width: "100px"
		});
		oTable.addColumn(oISSCOM);
		var oKitSize = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Kit Size",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "KIT_SIZE"),
			sortProperty: "KIT_SIZE",
			filterProperty: "KIT_SIZE",
			width: "100px"
		});
		oTable.addColumn(oKitSize);
		var oProdDensity = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Density",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRODUCT_DENSITY"),
			sortProperty: "PRODUCT_DENSITY",
			filterProperty: "PRODUCT_DENSITY",
			width: "100px"
		});
		oTable.addColumn(oProdDensity);
		var oForecast = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Forecast/ Fixed Quantities",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIXED_QUANTITIES"),
			sortProperty: "FIXED_QUANTITIES",
			filterProperty: "FIXED_QUANTITIES",
			width: "100px"
		});
		oTable.addColumn(oForecast);
		/*		var oSNPPL02 = new sap.ui.table.Column({
											label: new sap.ui.commons.Label({
												text:"SNPPL02",
												wrapping: true
											}),
									template: new sap.ui.commons.TextField({
												change: function() {
													that._updateActivityTable(this, oTable);
												}
									}).addStyleClass("wordBreak").bindProperty("value", "SNPPL02"),
											sortProperty: "SNPPL02",
											filterProperty: "SNPPL02",
											width: "100px"
								});
								oTable.addColumn(oSNPPL02);	*/

		/*	var oSNPPL02 = new sap.ui.table.Column({
									label: new sap.ui.commons.Label({
											text:"SNPPL02",
										wrapping: true
									}),
									template: new sap.ui.commons.DropdownBox({
										items: {
											path: "/allSNPPL02",
											template: new sap.ui.core.ListItem({
												key: {
													path: "COLUMN_1"
												},
												text: {
													path: "COLUMN_1"
												}
											})
										},
										selectedKey: {
											path: "SNPPL02"
										},
										change: function() {
											that._updateActivityTable(this, oTable);
										}
										}).addStyleClass("wordBreak"),
									sortProperty: "SNPPL02",
									filterProperty: "SNPPL02",
									width: "100px"
								});
								oTable.addColumn(oSNPPL02); */

		var oPlanner = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Planner (input SKU)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PLANNER"),
			sortProperty: "PLANNER",
			filterProperty: "PLANNER",
			width: "100px"
		});
		oTable.addColumn(oPlanner);
		var oRepack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Repack Description Input SKU",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "REPACK_DESCRIPTION"),
			sortProperty: "REPACK_DESCRIPTION",
			filterProperty: "REPACK_DESCRIPTION",
			width: "100px"
		});
		oTable.addColumn(oRepack);
		var oFrstProdInpSKU = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First Production Input SKU",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "FIRST_PRODUCTION_INPT_SKU"),
			sortProperty: "FIRST_PRODUCTION_INPT_SKU",
			filterProperty: "FIRST_PRODUCTION_INPT_SKU",
			width: "200px"
		});
		oTable.addColumn(oFrstProdInpSKU);
		var oLstProdInpSKU = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Last Production Input SKU",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "LAST_PRODUCTION_INPT_SKU"),
			sortProperty: "LAST_PRODUCTION_INPT_SKU",
			filterProperty: "LAST_PRODUCTION_INPT_SKU",
			width: "200px"
		});
		oTable.addColumn(oLstProdInpSKU);
		var oQntyInpSKU = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quantity Input SKU",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "QUANTITIES_SKU"),
			sortProperty: "QUANTITIES_SKU",
			filterProperty: "QUANTITIES_SKU",
			width: "100px"
		});
		oTable.addColumn(oQntyInpSKU);

		var oPCBInitiator = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PCB Initiator",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allPCBInitiator",
					template: new sap.ui.core.ListItem({
						key: {
							path: "PCB_INITIATOR_NAME"
						},
						text: {
							path: "PCB_INITIATOR_NAME"
						}
					})
				},
				selectedKey: {
					path: "PCB_INITIATOR_NAME",
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "PCB_INITIATOR_NAME",
			filterProperty: "PCB_INITIATOR_NAME",
			width: "200px"
		});
		oTable.addColumn(oPCBInitiator);
		var oRevisionNumber = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Revision Number",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "REVISION_NUMBER"),
			sortProperty: "REVISION_NUMBER",
			filterProperty: "REVISION_NUMBER",
			width: "100px"
		});
		oTable.addColumn(oRevisionNumber);

		var oArtreviewer = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Ad Hoc Artwork Reviewer",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ART_REVIEWER"),
			sortProperty: "ART_REVIEWER",
			filterProperty: "ART_REVIEWER",
			width: "100px"
		});
		oTable.addColumn(oArtreviewer);
		var oAltPrinter = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Alternative Printer Email",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRINTER_EMAIL"),
			sortProperty: "PRINTER_EMAIL",
			filterProperty: "PRINTER_EMAIL",
			width: "100px"
		});
		oTable.addColumn(oAltPrinter);
		var oBAMinstructions = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAM/ Instructions to Schawk on Change Requirements",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAM_INSTRUCTIONS"),
			sortProperty: "BAM_INSTRUCTIONS",
			filterProperty: "BAM_INSTRUCTIONS",
			width: "100px"
		});
		oTable.addColumn(oBAMinstructions);
		var oNIMinstructions = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "NIM/ Instructions to Schawk on Change Requirements",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "NIM_INSTRUCTIONS"),
			sortProperty: "NIM_INSTRUCTIONS",
			filterProperty: "NIM_INSTRUCTIONS",
			width: "100px"
		});
		oTable.addColumn(oNIMinstructions);
		var oBAMReference = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Based on Reference (BAM)",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BAM_REFERENCE"),
			sortProperty: "BAM_REFERENCE",
			filterProperty: "BAM_REFERENCE",
			width: "100px"
		});
		oTable.addColumn(oBAMReference);
		var oMattype = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Material Type",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MAT_TYPE"),
			sortProperty: "MAT_TYPE",
			filterProperty: "MAT_TYPE",
			width: "100px"
		});
		oTable.addColumn(oMattype);
		var oPCBPromoType = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PCB Promotion Type",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allPCBPromo",
					template: new sap.ui.core.ListItem({
						key: {
							path: "PCB_PROMOTION_TYPE"
						},
						text: {
							path: "PCB_PROMOTION_TYPE"
						}
					})
				},
				selectedKey: {
					path: "PCB_PROMOTION_TYPE",
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "PCB_PROMOTION_TYPE",
			filterProperty: "PCB_PROMOTION_TYPE",
			width: "200px"
		});
		oTable.addColumn(oPCBPromoType);
		var oPCBNIMComments = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "PCB NIM Comments or priority",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PCB_NIM_COMMENTS"),
			sortProperty: "PCB_NIM_COMMENTS",
			filterProperty: "PCB_NIM_COMMENTS",
			width: "100px"
		});
		oTable.addColumn(oPCBNIMComments);
		var oModDate = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Modified Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				editable: false,
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MOD_DATE"),
			sortProperty: "MOD_DATE",
			filterProperty: "MOD_DATE",
			width: "200px"
		});
		oTable.addColumn(oModDate);
		var oModUser = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Modified User",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				editable: false,
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MOD_USER"),
			sortProperty: "MOD_USER",
			filterProperty: "MOD_USER",
			width: "200px"
		});
		oTable.addColumn(oModUser);

		var oTonicaMeetMins = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tonica Meeting Minutes",
				wrapping: true
			}).addStyleClass("blue"),
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
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "TONICA_MEET_MINS",
			filterProperty: "TONICA_MEET_MINS",
			width: "100px"
		});
		oTable.addColumn(oTonicaMeetMins);
		var oStatusDF = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status DF",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcolor",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COLOR_NAME"
						},
						text: {
							path: "COLOR_NAME"
						}
					})
				},
				selectedKey: {
					path: 'STATUS_DF',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "STATUS_DF",
			filterProperty: "STATUS_DF",
			width: "100px"
		});
		oTable.addColumn(oStatusDF);
		var oStatusProj = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status Project",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Cancelled"
					}),
		              new sap.ui.core.ListItem({
						text: "Go"
					}), new sap.ui.core.ListItem({
						text: "Go TBC"
					}), new sap.ui.core.ListItem({
						text: "On Hold"
					})],
				/*selectedKey: {
					path: 'STATUS_PROJECT',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},*/
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "STATUS_PROJECT"),
			sortProperty: "STATUS_PROJECT",
			filterProperty: "STATUS_PROJECT",
			width: "200px"
		});
		oTable.addColumn(oStatusProj);
		var oTrialReqNeed = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Trial Request Needed?",
				wrapping: true
			}).addStyleClass("blue"),
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
					path: 'TRIAL_REQ_NEEDED',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "TRIAL_REQ_NEEDED",
			filterProperty: "TRIAL_REQ_NEEDED",
			width: "100px"
		});
		oTable.addColumn(oTrialReqNeed);
		var oStatusSAPCode = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status SAP Code",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcolor",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COLOR_NAME"
						},
						text: {
							path: "COLOR_NAME"
						}
					})
				},
				selectedKey: {
					path: 'STATUS_SAP_CODE',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "STATUS_SAP_CODE",
			filterProperty: "STATUS_SAP_CODE",
			width: "200px"
		});
		oTable.addColumn(oStatusSAPCode);
		var oOthCodes = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Other Codes",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "OTH_CODE"),
			sortProperty: "OTH_CODE",
			filterProperty: "OTH_CODE",
			width: "100px"
		});
		oTable.addColumn(oOthCodes);
		var oUnknownSKU = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Unknown SKU Description",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "UNKNOWN_SKU"),
			sortProperty: "UNKNOWN_SKU",
			filterProperty: "UNKNOWN_SKU",
			width: "100px"
		});
		oTable.addColumn(oUnknownSKU);
		var oInptSKUPallet = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Input SKU's that are used for the new pallet",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "INPUT_SKU_PALLET"),
			sortProperty: "INPUT_SKU_PALLET",
			filterProperty: "INPUT_SKU_PALLET",
			width: "100px"
		});
		oTable.addColumn(oInptSKUPallet);

		var oStatusFirstProd = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status First Production",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcolor",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COLOR_NAME"
						},
						text: {
							path: "COLOR_NAME"
						}
					})
				},
				selectedKey: {
					path: 'STATUS_FIRST_PRODUCTION',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "STATUS_FIRST_PRODUCTION",
			filterProperty: "STATUS_FIRST_PRODUCTION",
			width: "200px"
		});
		oTable.addColumn(oStatusFirstProd);
		var oStatusLastProd = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status Last Production",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcolor",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COLOR_NAME"
						},
						text: {
							path: "COLOR_NAME"
						}
					})
				},
				selectedKey: {
					path: 'STATUS_LAST_PRODUCTION',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "STATUS_LAST_PRODUCTION",
			filterProperty: "STATUS_LAST_PRODUCTION",
			width: "100px"
		});
		oTable.addColumn(oStatusLastProd);
		var oStatusFirstDespatch = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status First Despatch",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcolor",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COLOR_NAME"
						},
						text: {
							path: "COLOR_NAME"
						}
					})
				},
				selectedKey: {
					path: 'STATUS_FIRST_DESPATCH',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "STATUS_FIRST_DESPATCH",
			filterProperty: "STATUS_FIRST_DESPATCH",
			width: "100px"
		});
		oTable.addColumn(oStatusFirstDespatch);

		var oLastDespatchWeek = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Last Despatch Week",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "LAST_DESPATCH_WEEK"),
			sortProperty: "LAST_DESPATCH_WEEK",
			filterProperty: "LAST_DESPATCH_WEEK",
			width: "200px"
		});
		oTable.addColumn(oLastDespatchWeek);
		var oStatusComments = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Status Comments",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allcolor",

					template: new sap.ui.core.ListItem({
						key: {
							path: "COLOR_NAME"
						},
						text: {
							path: "COLOR_NAME"
						}
					})
				},
				selectedKey: {
					path: 'STATUS_COMMENTS',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "STATUS_COMMENTS",
			filterProperty: "STATUS_COMMENTS",
			width: "100px"
		});
		oTable.addColumn(oStatusComments);
		var oIndrunout = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Raw Material Indication of Run-out Rules?",
				wrapping: true
			}).addStyleClass("blue"),
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
					path: 'IND_RUN_OUT_RULES',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak"),
			sortProperty: "IND_RUN_OUT_RULES",
			filterProperty: "IND_RUN_OUT_RULES",
			width: "200px"
		});
		oTable.addColumn(oIndrunout);

		var oSaleQuanrantine = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sales or WIP",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Sales"
					}),
		              new sap.ui.core.ListItem({
						text: "WIP"
					})],
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "SALE_OR_QUARANTINE"),
			sortProperty: "SALE_OR_QUARANTINE",
			filterProperty: "SALE_OR_QUARANTINE",
			width: "100px"
		});
		oTable.addColumn(oSaleQuanrantine);
		var oCodeMat = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Code/Material Status",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Cancelled"
					}),
		              new sap.ui.core.ListItem({
						text: "Completed"
					}), new sap.ui.core.ListItem({
						text: "Live (In progress)"
					})],
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "CODE_MAT"),
			sortProperty: "CODE_MAT",
			filterProperty: "CODE_MAT",
			width: "200px"
		});
		oTable.addColumn(oCodeMat);
		var oMAPXDecisionreq = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MAPX Decision Required",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allMapxdecision",

					template: new sap.ui.core.ListItem({
						key: {
							path: "MAPX_NAME"
						},
						text: {
							path: "MAPX_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "MAPX_DECISION_REQ"),
			sortProperty: "MAPX_DECISION_REQ",
			filterProperty: "MAPX_DECISION_REQ",
			width: "170px"
		});
		oTable.addColumn(oMAPXDecisionreq);

		var oMAPXPreRead = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MAPX Pre-Read/ Agenda",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MAPX_PREREAD_NAME"),
			sortProperty: "MAPX_PREREAD_NAME",
			filterProperty: "MAPX_PREREAD_NAME",
			width: "100px"
		});
		oTable.addColumn(oMAPXPreRead);

		var oSAPSKUSelling = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP SKU Code Selling Country",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SKU_SELLING"),
			sortProperty: "SAP_SKU_SELLING",
			filterProperty: "SAP_SKU_SELLING",
			width: "100px"
		});
		oTable.addColumn(oSAPSKUSelling);
		var oRMSup = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "RM Suppressed",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "RM_SUP"),
			sortProperty: "RM_SUP",
			filterProperty: "RM_SUP",
			width: "100px"
		});
		oTable.addColumn(oRMSup);

		var oCPP_Raw = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CPP (Raw Cases) per full pallet",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CPP_RAW"),
			sortProperty: "CPP_RAW",
			filterProperty: "CPP_RAW",
			width: "100px"
		});
		oTable.addColumn(oCPP_Raw);
		var oCPP_CCE = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CPP (CCE Cases)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CPP_CCE"),
			sortProperty: "CPP_CCE",
			filterProperty: "CPP_CCE",
			width: "100px"
		});
		oTable.addColumn(oCPP_CCE);

		var oCPP_Unit = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CPP (Unit Cases) per full pallet",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CPP_UNIT"),
			sortProperty: "CPP_UNIT",
			filterProperty: "CPP_UNIT",
			width: "100px"
		});
		oTable.addColumn(oCPP_Unit);
		var oSAP_Sites_Lines = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP Producing Sites and Lines",
				wrapping: true
			}),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_SITE_LINES"),
			sortProperty: "SAP_SITE_LINES",
			filterProperty: "SAP_SITE_LINES",
			width: "100px"
		});
		oTable.addColumn(oSAP_Sites_Lines);
		var oProductSplit = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Split if Mixed",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "PRODUCT_SPLIT"),
			sortProperty: "PRODUCT_SPLIT",
			filterProperty: "PRODUCT_SPLIT",
			width: "200px"
		});
		oTable.addColumn(oProductSplit);

		var oTradeRegistration = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Technical file/ Trade Registration/ Line Forms Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TRADE_REGISTRATION"),
			sortProperty: "TRADE_REGISTRATION",
			filterProperty: "TRADE_REGISTRATION",
			width: "200px"
		});
		oTable.addColumn(oTradeRegistration);
		var oTradeWindow = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Trade Window to follow",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TRADE_WINDOW"),
			sortProperty: "TRADE_WINDOW",
			filterProperty: "TRADE_WINDOW",
			width: "200px"
		});
		oTable.addColumn(oTradeWindow);
		var oPrintSupplier = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Print Supplier",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: {
					path: "/allprintsupplier",

					template: new sap.ui.core.ListItem({
						key: {
							path: "SUPPLIER_NAME"
						},
						text: {
							path: "SUPPLIER_NAME"
						}
					})
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "PRINT_SUPPLIER"),
			sortProperty: "PRINT_SUPPLIER",
			filterProperty: "PRINT_SUPPLIER",
			width: "170px"
		});
		oTable.addColumn(oPrintSupplier);
		var oBottlingProddt = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "First Possible Bottling Production Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BOTTLING_FIRST"),
			sortProperty: "BOTTLING_FIRST",
			filterProperty: "BOTTLING_FIRST",
			width: "200px"
		});
		oTable.addColumn(oBottlingProddt);
		var oBottlingProddtLst = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Indication Last Bottling Production Date",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.DatePicker({
				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BOTTLING_LAST"),
			sortProperty: "BOTTLING_LAST",
			filterProperty: "BOTTLING_LAST",
			width: "200px"
		});
		oTable.addColumn(oBottlingProddtLst);

		var oArtwrkCheck = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Artwork Check Occurrence",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ARTWORK_CHECK"),
			sortProperty: "ARTWORK_CHECK",
			filterProperty: "ARTWORK_CHECK",
			width: "100px"
		});
		oTable.addColumn(oArtwrkCheck);

		var oRawMatdesc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Old SAP Raw Material Description",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "RAW_MAT_DESC"),
			sortProperty: "RAW_MAT_DESC",
			filterProperty: "RAW_MAT_DESC",
			width: "100px"
		});
		oTable.addColumn(oRawMatdesc);
		var oBASISpercntry = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BASIS per Country",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BASIS_PER_COUNTRY"),
			sortProperty: "BASIS_PER_COUNTRY",
			filterProperty: "BASIS_PER_COUNTRY",
			width: "100px"
		});
		oTable.addColumn(oBASISpercntry);
		var oSAPR3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP R/3 Variant Code",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SAP_R3_CODE"),
			sortProperty: "SAP_R3_CODE",
			filterProperty: "SAP_R3_CODE",
			width: "100px"
		});
		oTable.addColumn(oSAPR3);
		var oVariantCd = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Variant Code",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "VARIANT_CD"),
			sortProperty: "VARIANT_CD",
			filterProperty: "VARIANT_CD",
			width: "100px"
		});
		oTable.addColumn(oVariantCd);
		var oVariantDescrptn = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Variant Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "VARIANT_DESCRPTN"),
			sortProperty: "VARIANT_DESCRPTN",
			filterProperty: "VARIANT_DESCRPTN",
			width: "100px"
		});
		oTable.addColumn(oVariantDescrptn);
		var oDun_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5100 Dunkirk: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK_FULL_CONTAINER"),
			sortProperty: "DUNKIRK_FULL_CONTAINER",
			filterProperty: "DUNKIRK_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oDun_Full_Container);
		var oDun_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5100 Dunkirk: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK_FULL_CONTAINER_DESC"),
			sortProperty: "DUNKIRK_FULL_CONTAINER_DESC",
			filterProperty: "DUNKIRK_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oDun_Full_Container_desc);
		var oDun_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5100 Dunkirk: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK_PRINTED_FILM"),
			sortProperty: "DUNKIRK_PRINTED_FILM",
			filterProperty: "DUNKIRK_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oDun_Printed_Film);
		var oDun_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5100 Dunkirk: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK_PRINTED_FILM_DESC"),
			sortProperty: "DUNKIRK_PRINTED_FILM_DESC",
			filterProperty: "DUNKIRK_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oDun_Printed_Film_Desc);
		var oDun_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5100 Dunkirk: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK_BOM_ECM"),
			sortProperty: "DUNKIRK_BOM_ECM",
			filterProperty: "DUNKIRK_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oDun_BOM_ECM);
		var oTou_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5103 Toulouse: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TOULOUSE_FULL_CONTAINER"),
			sortProperty: "TOULOUSE_FULL_CONTAINER",
			filterProperty: "TOULOUSE_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oTou_Full_Container);
		var oTou_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5103 Toulouse: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TOULOUSE_FULL_CONTAINER_DESC"),
			sortProperty: "TOULOUSE_FULL_CONTAINER_DESC",
			filterProperty: "TOULOUSE_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oTou_Full_Container_desc);
		var oTou_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5103 Toulouse: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TOULOUSE_PRINTED_FILM"),
			sortProperty: "TOULOUSE_PRINTED_FILM",
			filterProperty: "TOULOUSE_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oTou_Printed_Film);
		var oTou_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5103 Toulouse: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TOULOUSE_PRINTED_FILM_DESC"),
			sortProperty: "TOULOUSE_PRINTED_FILM_DESC",
			filterProperty: "TOULOUSE_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oTou_Printed_Film_Desc);
		var oTou_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5103 Toulouse: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TOULOUSE_BOM_ECM"),
			sortProperty: "TOULOUSE_BOM_ECM",
			filterProperty: "TOULOUSE_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oTou_BOM_ECM);
		var oCla_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5104 Clamart: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_FULL_CONTAINER"),
			sortProperty: "CLAMART_FULL_CONTAINER",
			filterProperty: "CLAMART_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oCla_Full_Container);
		var oCla_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5104 Clamart: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_FULL_CONTAINER_DESC"),
			sortProperty: "CLAMART_FULL_CONTAINER_DESC",
			filterProperty: "CLAMART_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oCla_Full_Container_desc);
		var oCla_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5104 Clamart: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_PRINTED_FILM"),
			sortProperty: "CLAMART_PRINTED_FILM",
			filterProperty: "CLAMART_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oCla_Printed_Film);
		var oCla_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5104 Clamart: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_PRINTED_FILM_DESC"),
			sortProperty: "CLAMART_PRINTED_FILM_DESC",
			filterProperty: "CLAMART_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oCla_Printed_Film_Desc);
		var oCla_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5104 Clamart: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_BOM_ECM"),
			sortProperty: "CLAMART_BOM_ECM",
			filterProperty: "CLAMART_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oCla_BOM_ECM);
		var oGri_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5105 Grigny: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_FULL_CONTAINER"),
			sortProperty: "GRIGNY_FULL_CONTAINER",
			filterProperty: "GRIGNY_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oGri_Full_Container);
		var oGri_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5105 Grigny: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_FULL_CONTAINER_DESC"),
			sortProperty: "GRIGNY_FULL_CONTAINER_DESC",
			filterProperty: "GRIGNY_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oGri_Full_Container_desc);
		var oGri_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5105 Grigny: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_PRINTED_FILM"),
			sortProperty: "GRIGNY_PRINTED_FILM",
			filterProperty: "GRIGNY_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oGri_Printed_Film);

		var oGri_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5105 Grigny: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_PRINTED_FILM_DESC"),
			sortProperty: "GRIGNY_PRINTED_FILM_DESC",
			filterProperty: "GRIGNY_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oGri_Printed_Film_Desc);
		var oGri_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5105 Grigny: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_BOM_ECM"),
			sortProperty: "GRIGNY_BOM_ECM",
			filterProperty: "GRIGNY_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oGri_BOM_ECM);
		var oMar_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5106 Marseille: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_FULL_CONTAINER"),
			sortProperty: "MARSEILLE_FULL_CONTAINER",
			filterProperty: "MARSEILLE_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oMar_Full_Container);
		var oMar_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5106 Marseille: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_FULL_CONTAINER_DESC"),
			sortProperty: "MARSEILLE_FULL_CONTAINER_DESC",
			filterProperty: "MARSEILLE_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oMar_Full_Container_desc);
		var oMar_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5106 Marseille: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_PRINTED_FILM"),
			sortProperty: "MARSEILLE_PRINTED_FILM",
			filterProperty: "MARSEILLE_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oMar_Printed_Film);
		var oMar_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5106 Marseille: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_PRINTED_FILM_DESC"),
			sortProperty: "MARSEILLE_PRINTED_FILM_DESC",
			filterProperty: "MARSEILLE_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oMar_Printed_Film_Desc);
		var oMar_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5106 Marseille: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_BOM_ECM"),
			sortProperty: "MARSEILLE_BOM_ECM",
			filterProperty: "MARSEILLE_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oMar_BOM_ECM);
		var oAnt_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5300 Antwerp: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_FULL_CONTAINER"),
			sortProperty: "ANTWERP_FULL_CONTAINER",
			filterProperty: "ANTWERP_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oAnt_Full_Container);
		var oAnt_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5300 Antwerp: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_FULL_CONTAINER_DESC"),
			sortProperty: "ANTWERP_FULL_CONTAINER_DESC",
			filterProperty: "ANTWERP_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oAnt_Full_Container_desc);
		var oAnt_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5300 Antwerp: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_PRINTED_FILM"),
			sortProperty: "ANTWERP_PRINTED_FILM",
			filterProperty: "ANTWERP_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oAnt_Printed_Film);
		var oAnt_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5300 Antwerp: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_PRINTED_FILM_DESC"),
			sortProperty: "ANTWERP_PRINTED_FILM_DESC",
			filterProperty: "ANTWERP_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oAnt_Printed_Film_Desc);
		var oAnt_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5300 Antwerp: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_BOM_ECM"),
			sortProperty: "ANTWERP_BOM_ECM",
			filterProperty: "ANTWERP_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oAnt_BOM_ECM);
		var oGhe_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5301 Ghent: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GHENT_FULL_CONTAINER"),
			sortProperty: "GHENT_FULL_CONTAINER",
			filterProperty: "GHENT_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oGhe_Full_Container);
		var oGhe_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5301 Ghent: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GHENT_FULL_CONTAINER_DESC"),
			sortProperty: "GHENT_FULL_CONTAINER_DESC",
			filterProperty: "GHENT_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oGhe_Full_Container_desc);
		var oGhe_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5301 Ghent: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GHENT_PRINTED_FILM"),
			sortProperty: "GHENT_PRINTED_FILM",
			filterProperty: "GHENT_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oGhe_Printed_Film);
		var oGhe_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5301 Ghent: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GHENT_PRINTED_FILM_DESC"),
			sortProperty: "GHENT_PRINTED_FILM_DESC",
			filterProperty: "GHENT_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oGhe_Printed_Film_Desc);
		var oGhe_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5301 Ghent: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GHENT_BOM_ECM"),
			sortProperty: "GHENT_BOM_ECM",
			filterProperty: "GHENT_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oGhe_BOM_ECM);
		var oCha_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5307 Chaudfontaine: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE_FULL_CONTAINER"),
			sortProperty: "CHAUDFONTAINE_FULL_CONTAINER",
			filterProperty: "CHAUDFONTAINE_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oCha_Full_Container);
		var oCha_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5307 Chaudfontaine: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE_FULL_CONTAINER_DESC"),
			sortProperty: "CHAUDFONTAINE_FULL_CONTAINER_DESC",
			filterProperty: "CHAUDFONTAINE_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oCha_Full_Container_desc);
		var oCha_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5307 Chaudfontaine: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE_PRINTED_FILM"),
			sortProperty: "CHAUDFONTAINE_PRINTED_FILM",
			filterProperty: "CHAUDFONTAINE_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oCha_Printed_Film);
		var oCha_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5307 Chaudfontaine: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE_PRINTED_FILM_DESC"),
			sortProperty: "CHAUDFONTAINE_PRINTED_FILM_DESC",
			filterProperty: "CHAUDFONTAINE_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oCha_Printed_Film_Desc);
		var oCha_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5307 Chaudfontaine: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE_BOM_ECM"),
			sortProperty: "CHAUDFONTAINE_BOM_ECM",
			filterProperty: "CHAUDFONTAINE_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oCha_BOM_ECM);
		var oDon_Full_Container = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5400 Dongen: Full Container",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_FULL_CONTAINER"),
			sortProperty: "DONGEN_FULL_CONTAINER",
			filterProperty: "DONGEN_FULL_CONTAINER",
			width: "100px"
		});
		oTable.addColumn(oDon_Full_Container);
		var oDon_Full_Container_desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5400 Dongen: Full Container Description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_FULL_CONTAINER_DESC"),
			sortProperty: "DONGEN_FULL_CONTAINER_DESC",
			filterProperty: "DONGEN_FULL_CONTAINER_DESC",
			width: "100px"
		});
		oTable.addColumn(oDon_Full_Container_desc);
		var oDon_Printed_Film = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5400 Dongen: Printed film or cluster (if any)",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_PRINTED_FILM"),
			sortProperty: "DONGEN_PRINTED_FILM",
			filterProperty: "DONGEN_PRINTED_FILM",
			width: "100px"
		});
		oTable.addColumn(oDon_Printed_Film);
		var oDon_Printed_Film_Desc = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5400 Dongen: Printed film or cluster description",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_PRINTED_FILM_DESC"),
			sortProperty: "DONGEN_PRINTED_FILM_DESC",
			filterProperty: "DONGEN_PRINTED_FILM_DESC",
			width: "100px"
		});
		oTable.addColumn(oDon_Printed_Film_Desc);
		var oDon_BOM_ECM = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "5400 Dongen: BOM Creation or ECM",
				wrapping: true
			}).addStyleClass("pink"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_BOM_ECM"),
			sortProperty: "DONGEN_BOM_ECM",
			filterProperty: "DONGEN_BOM_ECM",
			width: "100px"
		});
		oTable.addColumn(oDon_BOM_ECM);

		var oBarcode_Type = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Barcode Type for Container",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BARCODE_TYPE"),
			sortProperty: "BARCODE_TYPE",
			filterProperty: "BARCODE_TYPE",
			width: "100px"
		});
		oTable.addColumn(oBarcode_Type);
		var oBarcode_Type_Multi = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Barcode Type for Multipack",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BARCODE_TYPE_MULTI"),
			sortProperty: "BARCODE_TYPE_MULTI",
			filterProperty: "BARCODE_TYPE_MULTI",
			width: "100px"
		});
		oTable.addColumn(oBarcode_Type_Multi);
		var oBarcode_Type_Despatch = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Barcode Type for Despatch Unit",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "BARCODE_TYPE_DEPATCH"),
			sortProperty: "BARCODE_TYPE_DEPATCH",
			filterProperty: "BARCODE_TYPE_DEPATCH",
			width: "100px"
		});
		oTable.addColumn(oBarcode_Type_Despatch);

		var Type_Drink = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Type of Drink",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TYPE_DRINK"),
			sortProperty: "TYPE_DRINK",
			filterProperty: "TYPE_DRINK",
			width: "100px"
		});
		oTable.addColumn(Type_Drink);
		/*var cellColor = new sap.ui.commons.TextField().bindProperty("value","ANTWERP_5300", function(cellValue){ 
     cellId = this.getId();   
     $("#"+cellId).parent().parent().css("background-color",'#0d233a');  
     return cellValue;    
});  */
		var antwerp_5300 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Antwerp: 5300",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_5300", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "ANTWERP_5300",
			filterProperty: "ANTWERP_5300",
			width: "100px"
		});
		oTable.addColumn(antwerp_5300);
		var Chaudfontaine_5307 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Chaudfontaine: 5307",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUFONTAINE_5307"),
			sortProperty: "CHAUFONTAINE_5307",
			filterProperty: "CHAUFONTAINE_5307",
			width: "100px"
		});
		oTable.addColumn(Chaudfontaine_5307);
		var Ghent_5301 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Ghent: 5301",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GHENT_5301", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "GHENT_5301",
			filterProperty: "GHENT_5301",
			width: "100px"
		});
		oTable.addColumn(Ghent_5301);
		var Dongen_5400 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Dongen: 5400",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_5400", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "DONGEN_5400",
			filterProperty: "DONGEN_5400",
			width: "100px"
		});
		oTable.addColumn(Dongen_5400);
		var Clamart_5104 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Clamart: 5104",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_5104", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "CLAMART_5104",
			filterProperty: "CLAMART_5104",
			width: "100px"
		});
		oTable.addColumn(Clamart_5104);
		var Dunkirk_5100 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Dunkirk: 5100",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKRIK_5100", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "DUNKRIK_5100",
			filterProperty: "DUNKRIK_5100",
			width: "100px"
		});
		oTable.addColumn(Dunkirk_5100);
		var Grigny_5105 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Grigny: 5105",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_5105", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "GRIGNY_5105",
			filterProperty: "GRIGNY_5105",
			width: "100px"
		});
		oTable.addColumn(Grigny_5105);
		var Grigny_Self_Manufacturing_5116 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Grigny Self-Manufacturing: 5116",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_SELF_MANUFACTURING_5116", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "GRIGNY_SELF_MANUFACTURING_5116",
			filterProperty: "GRIGNY_SELF_MANUFACTURING_5116",
			width: "100px"
		});
		oTable.addColumn(Grigny_Self_Manufacturing_5116);
		var Marseille_5106 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Marseille: 5106",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_5106", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "MARSEILLE_5106",
			filterProperty: "MARSEILLE_5106",
			width: "100px"
		});
		oTable.addColumn(Marseille_5106);
		var Toulouse_5103 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Toulouse: 5103",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "TOULOUSE_5103", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "TOULOUSE_5103",
			filterProperty: "TOULOUSE_5103",
			width: "100px"
		});
		oTable.addColumn(Toulouse_5103);
		var Jordbro_2001 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Jordbro: 2001",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "JORDBRO_2001", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "JORDBRO_2001",
			filterProperty: "JORDBRO_2001",
			width: "100px"
		});
		oTable.addColumn(Jordbro_2001);
		var Robsrud_2003 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Robsrud: 2003",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "ROBSRUD_2003", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "ROBSRUD_2003",
			filterProperty: "ROBSRUD_2003",
			width: "100px"
		});
		oTable.addColumn(Robsrud_2003);
		var MD_Mack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Mack",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MD_MACK", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "MD_MACK",
			filterProperty: "MD_MACK",
			width: "100px"
		});
		oTable.addColumn(MD_Mack);
		var third_party = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD 3rd party (Name)",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "THIRD_PARTY", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "THIRD_PARTY",
			filterProperty: "THIRD_PARTY",
			width: "100px"
		});
		oTable.addColumn(third_party);
		var release_3rd_party = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Release 3rd party",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "RELEASE_3RD_PARTY", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "RELEASE_3RD_PARTY",
			filterProperty: "RELEASE_3RD_PARTY",
			width: "100px"
		});
		oTable.addColumn(release_3rd_party);
		var MS_antwerp_5300 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Antwerp: 5300",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);

				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_ANTWERP_5300"),
			sortProperty: "MS_ANTWERP_5300",
			filterProperty: "MS_ANTWERP_5300",
			width: "100px"
		});
		oTable.addColumn(MS_antwerp_5300);
		var MS_Chaudfontaine_5307 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MD Chaudfontaine: 5307",
				wrapping: true
			}).addStyleClass("pinkblue"),
			template: new sap.ui.commons.TextField({
				value: {
					formatter: function(val) {
						console.log(val);
						if (val === "N") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("yellow11");
							this.removeStyleClass("white1");
							this.addStyleClass("red1");
						} else if (val === "P") {
							cellId = this.getId();
							console.log(cellId);
							this.removeStyleClass("white1");
							this.removeStyleClass("red1");
							this.addStyleClass("yellow11");
						} else {
							this.removeStyleClass("yellow11");
							this.removeStyleClass("red1");
							this.addStyleClass("white1");
						}

						sap.ui.getCore().byId("common_data").getModel().refresh();
						return val;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
					that.mDChange(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_CHAUFONTAINE_5307", function(val) {
				console.log(val);
				if (val === "N") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("yellow11");
					this.removeStyleClass("white1");
					this.addStyleClass("red1");
				} else if (val === "P") {
					cellId = this.getId();
					console.log(cellId);
					this.removeStyleClass("white1");
					this.removeStyleClass("red1");
					this.addStyleClass("yellow11");
				} else {
					this.removeStyleClass("yellow11");
					this.removeStyleClass("red1");
					this.addStyleClass("white1");
				}

				sap.ui.getCore().byId("common_data").getModel().refresh();
				return val;
			}),
			sortProperty: "MS_CHAUFONTAINE_5307",
			filterProperty: "MS_CHAUFONTAINE_5307",
			width: "100px"
		});
		oTable.addColumn(MS_Chaudfontaine_5307);
		var MS_Ghent_5301 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Ghent: 5301",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_GHENT_5301"),
			sortProperty: "MS_GHENT_5301",
			filterProperty: "MS_GHENT_5301",
			width: "100px"
		});
		oTable.addColumn(MS_Ghent_5301);
		var MS_Dongen_5400 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Dongen: 5400",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_DONGEN_5400"),
			sortProperty: "MS_DONGEN_5400",
			filterProperty: "MS_DONGEN_5400",
			width: "100px"
		});
		oTable.addColumn(MS_Dongen_5400);
		var MS_Clamart_5104 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Clamart: 5104",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_CLAMART_5104"),
			sortProperty: "MS_CLAMART_5104",
			filterProperty: "MS_CLAMART_5104",
			width: "100px"
		});
		oTable.addColumn(MS_Clamart_5104);
		var MS_Dunkirk_5100 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Dunkirk: 5100",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_DUNKRIK_5100"),
			sortProperty: "MS_DUNKRIK_5100",
			filterProperty: "MS_DUNKRIK_5100",
			width: "100px"
		});
		oTable.addColumn(MS_Dunkirk_5100);
		var MS_Grigny_5105 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Grigny: 5105",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_GRIGNY_5105"),
			sortProperty: "MS_GRIGNY_5105",
			filterProperty: "MS_GRIGNY_5105",
			width: "100px"
		});
		oTable.addColumn(MS_Grigny_5105);
		var MS_Grigny_Self_Manufacturing_5116 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Grigny Self-Manufacturing: 5116",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_GRIGNY_SELF_MANUFACTURING_5116"),
			sortProperty: "MS_GRIGNY_SELF_MANUFACTURING_5116",
			filterProperty: "MS_GRIGNY_SELF_MANUFACTURING_5116",
			width: "100px"
		});
		oTable.addColumn(MS_Grigny_Self_Manufacturing_5116);
		var MS_Marseille_5106 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Marseille: 5106",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_MARSEILLE_5106"),
			sortProperty: "MS_MARSEILLE_5106",
			filterProperty: "MS_MARSEILLE_5106",
			width: "100px"
		});
		oTable.addColumn(MS_Marseille_5106);
		var MS_Toulouse_5103 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Toulouse: 5103",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_TOULOUSE_5103"),
			sortProperty: "MS_TOULOUSE_5103",
			filterProperty: "MS_TOULOUSE_5103",
			width: "100px"
		});
		oTable.addColumn(MS_Toulouse_5103);
		var MS_Jordbro_2001 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Jordbro: 2001",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_JORDBRO_2001"),
			sortProperty: "MS_JORDBRO_2001",
			filterProperty: "MS_JORDBRO_2001",
			width: "100px"
		});
		oTable.addColumn(MS_Jordbro_2001);
		var MS_Robsrud_2003 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Robsrud: 2003",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_ROBSRUD_2003"),
			sortProperty: "MS_ROBSRUD_2003",
			filterProperty: "MS_ROBSRUD_2003",
			width: "100px"
		});
		oTable.addColumn(MS_Robsrud_2003);
		var MS_Mack = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Mack",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_MACK"),
			sortProperty: "MS_MACK",
			filterProperty: "MS_MACK",
			width: "100px"
		});
		oTable.addColumn(MD_Mack);
		var ms_3rd_party = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS 3rd party (Name)",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_3RD_PARTY"),
			sortProperty: "MS_3RD_PARTY",
			filterProperty: "MS_3RD_PARTY",
			width: "100px"
		});
		oTable.addColumn(ms_3rd_party);
		var ms_release_3rd_party = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS Release 3rd party",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MS_RELEASE_3RD_PARTY"),
			sortProperty: "MS_RELEASE_3RD_PARTY",
			filterProperty: "MS_RELEASE_3RD_PARTY",
			width: "100px"
		});
		oTable.addColumn(ms_release_3rd_party);
		var Sidcup_5501_SD1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD1",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD1"),
			sortProperty: "SIDCUP_5501_SD1",
			filterProperty: "SIDCUP_5501_SD1",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD1);
		var Sidcup_5501_SD2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD2",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD2"),
			sortProperty: "SIDCUP_5501_SD2",
			filterProperty: "SIDCUP_5501_SD2",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD2);
		var Sidcup_5501_SD3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD3",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD3"),
			sortProperty: "SIDCUP_5501_SD3",
			filterProperty: "SIDCUP_5501_SD3",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD3);
		var Sidcup_5501_SD4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD4",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD4"),
			sortProperty: "SIDCUP_5501_SD4",
			filterProperty: "SIDCUP_5501_SD4",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD4);
		var Sidcup_5501_SD5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD5",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD5"),
			sortProperty: "SIDCUP_5501_SD5",
			filterProperty: "SIDCUP_5501_SD5",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD5);
		var Sidcup_5501_SD6 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD6",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD6"),
			sortProperty: "SIDCUP_5501_SD6",
			filterProperty: "SIDCUP_5501_SD6",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD6);
		var Sidcup_5501_SD7 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD7",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD7"),
			sortProperty: "SIDCUP_5501_SD7",
			filterProperty: "SIDCUP_5501_SD7",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD7);
		var Sidcup_5501_SD8 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: 5501 SD8",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_5501_SD8"),
			sortProperty: "SIDCUP_5501_SD8",
			filterProperty: "SIDCUP_5501_SD8",
			width: "100px"
		});
		oTable.addColumn(Sidcup_5501_SD8);
		var Edmonton_5506_ED1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: 5506 ED1",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_5506_ED1"),
			sortProperty: "EDMONTON_5506_ED1",
			filterProperty: "EDMONTON_5506_ED1",
			width: "100px"
		});
		oTable.addColumn(Edmonton_5506_ED1);
		var Edmonton_5506_ED2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: 5506 ED2",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_5506_ED2"),
			sortProperty: "EDMONTON_5506_ED2",
			filterProperty: "EDMONTON_5506_ED2",
			width: "100px"
		});
		oTable.addColumn(Edmonton_5506_ED2);
		var Edmonton_5506_ED3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: 5506 ED3",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_5506_ED3"),
			sortProperty: "EDMONTON_5506_ED3",
			filterProperty: "EDMONTON_5506_ED3",
			width: "100px"
		});
		oTable.addColumn(Edmonton_5506_ED3);
		var Edmonton_5506_ED4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: 5506 ED4",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_5506_ED4"),
			sortProperty: "EDMONTON_5506_ED4",
			filterProperty: "EDMONTON_5506_ED4",
			width: "100px"
		});
		oTable.addColumn(Edmonton_5506_ED4);
		var Edmonton_5506_ED5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: 5506 ED5",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_5506_ED5"),
			sortProperty: "EDMONTON_5506_ED5",
			filterProperty: "EDMONTON_5506_ED5",
			width: "100px"
		});
		oTable.addColumn(Edmonton_5506_ED5);
		var Edmonton_5506_ED6 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: 5506 ED6",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_5506_ED6"),
			sortProperty: "EDMONTON_5506_ED6",
			filterProperty: "EDMONTON_5506_ED6",
			width: "100px"
		});
		oTable.addColumn(Edmonton_5506_ED6);
		var Milton_Keynes_5504_MK1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK1",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK1"),
			sortProperty: "MILTON_KEYNES_5504_MK1",
			filterProperty: "MILTON_KEYNES_5504_MK1",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK1);
		var Milton_Keynes_5504_MK2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK2",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK2"),
			sortProperty: "MILTON_KEYNES_5504_MK2",
			filterProperty: "MILTON_KEYNES_5504_MK2",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK2);
		var Milton_Keynes_5504_MK3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK3",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK3"),
			sortProperty: "MILTON_KEYNES_5504_MK3",
			filterProperty: "MILTON_KEYNES_5504_MK3",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK3);
		var Milton_Keynes_5504_MK4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK4",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK4"),
			sortProperty: "MILTON_KEYNES_5504_MK4",
			filterProperty: "MILTON_KEYNES_5504_MK4",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK4);
		var Milton_Keynes_5504_MK5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK5",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK5"),
			sortProperty: "MILTON_KEYNES_5504_MK5",
			filterProperty: "MILTON_KEYNES_5504_MK5",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK5);
		var Milton_Keynes_5504_MK67 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK6&7",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK67"),
			sortProperty: "MILTON_KEYNES_5504_MK67",
			filterProperty: "MILTON_KEYNES_5504_MK67",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK67);
		var Milton_Keynes_5504_MK89 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: 5504 MK8&9",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MILTON_KEYNES_5504_MK89"),
			sortProperty: "MILTON_KEYNES_5504_MK89",
			filterProperty: "MILTON_KEYNES_5504_MK89",
			width: "100px"
		});
		oTable.addColumn(Milton_Keynes_5504_MK89);
		var Wakefield_5502_WK1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK1",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK1"),
			sortProperty: "WAKEFIELD_5502_WK1",
			filterProperty: "WAKEFIELD_5502_WK1",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK1);
		var Wakefield_5502_WK2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK2",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK2"),
			sortProperty: "WAKEFIELD_5502_WK2",
			filterProperty: "WAKEFIELD_5502_WK2",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK2);
		var Wakefield_5502_WK3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK3",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK3"),
			sortProperty: "WAKEFIELD_5502_WK3",
			filterProperty: "WAKEFIELD_5502_WK3",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK3);
		var Wakefield_5502_WK4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK4",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK4"),
			sortProperty: "WAKEFIELD_5502_WK4",
			filterProperty: "WAKEFIELD_5502_WK4",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK4);
		var Wakefield_5502_WK5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK5",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK5"),
			sortProperty: "WAKEFIELD_5502_WK5",
			filterProperty: "WAKEFIELD_5502_WK5",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK5);
		var Wakefield_5502_WK6 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK6",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK6"),
			sortProperty: "WAKEFIELD_5502_WK6",
			filterProperty: "WAKEFIELD_5502_WK6",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK6);
		var Wakefield_5502_WK7 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK7",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK7"),
			sortProperty: "WAKEFIELD_5502_WK7",
			filterProperty: "WAKEFIELD_5502_WK7",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK7);
		var Wakefield_5502_WK8 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK8",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK8"),
			sortProperty: "WAKEFIELD_5502_WK8",
			filterProperty: "WAKEFIELD_5502_WK8",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK8);
		var Wakefield_5502_WK9 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK9",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK9"),
			sortProperty: "WAKEFIELD_5502_WK9",
			filterProperty: "WAKEFIELD_5502_WK9",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK9);
		var Wakefield_5502_WK11 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK11",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK11"),
			sortProperty: "WAKEFIELD_5502_WK11",
			filterProperty: "WAKEFIELD_5502_WK11",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK11);
		var Wakefield_5502_WK17 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: 5502 WK17",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_5502_WK17"),
			sortProperty: "WAKEFIELD_5502_WK17",
			filterProperty: "WAKEFIELD_5502_WK17",
			width: "100px"
		});
		oTable.addColumn(Wakefield_5502_WK17);
		var East_Kilbride_5503_EK1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK1",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK1"),
			sortProperty: "EAST_KILBRIDE_5503_EK1",
			filterProperty: "EAST_KILBRIDE_5503_EK1",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK1);
		var East_Kilbride_5503_EK2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK2",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK2"),
			sortProperty: "EAST_KILBRIDE_5503_EK2",
			filterProperty: "EAST_KILBRIDE_5503_EK2",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK2);
		var East_Kilbride_5503_EK3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK3",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK3"),
			sortProperty: "EAST_KILBRIDE_5503_EK3",
			filterProperty: "EAST_KILBRIDE_5503_EK3",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK3);
		var East_Kilbride_5503_EK4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK4",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK4"),
			sortProperty: "EAST_KILBRIDE_5503_EK4",
			filterProperty: "EAST_KILBRIDE_5503_EK4",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK4);
		var East_Kilbride_5503_EK5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK5",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK5"),
			sortProperty: "EAST_KILBRIDE_5503_EK5",
			filterProperty: "EAST_KILBRIDE_5503_EK5",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK5);
		var East_Kilbride_5503_EK6 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK6",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK6"),
			sortProperty: "EAST_KILBRIDE_5503_EK6",
			filterProperty: "EAST_KILBRIDE_5503_EK6",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK6);
		var East_Kilbride_5503_EK7 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK7",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK7"),
			sortProperty: "EAST_KILBRIDE_5503_EK7",
			filterProperty: "EAST_KILBRIDE_5503_EK7",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK7);
		var East_Kilbride_5503_EK11 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Kilbride: 5503 EK11",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "EAST_KILBRIDE_5503_EK11"),
			sortProperty: "EAST_KILBRIDE_5503_EK11",
			filterProperty: "EAST_KILBRIDE_5503_EK11",
			width: "100px"
		});
		oTable.addColumn(East_Kilbride_5503_EK11);
		var Morpeth_5546_AW1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth: 5546 AW1",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MORPETH_5546_AW1"),
			sortProperty: "MORPETH_5546_AW1",
			filterProperty: "MORPETH_5546_AW1",
			width: "100px"
		});
		oTable.addColumn(Morpeth_5546_AW1);
		var Morpeth_5546_AW2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth: 5546 AW2",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MORPETH_5546_AW2"),
			sortProperty: "MORPETH_5546_AW2",
			filterProperty: "MORPETH_5546_AW2",
			width: "100px"
		});
		oTable.addColumn(Morpeth_5546_AW2);
		var Morpeth_5546_AW3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth: 5546 AW3",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MORPETH_5546_AW3"),
			sortProperty: "MORPETH_5546_AW3",
			filterProperty: "MORPETH_5546_AW3",
			width: "100px"
		});
		oTable.addColumn(Morpeth_5546_AW3);
		var Morpeth_5546_AW4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth: 5546 AW4",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "MORPETH_5546_AW4"),
			sortProperty: "MORPETH_5546_AW4",
			filterProperty: "MORPETH_5546_AW4",
			width: "100px"
		});
		oTable.addColumn(Morpeth_5546_AW4);
		var Third_party_name_pss = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "3rd party (Name) & PSS Number",
				wrapping: true
			}).addStyleClass("yellow"),
			template: new sap.ui.commons.TextField({

				change: function() {
					that._updateActivityTable(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("value", "THIRD_PARTY_NAME_PSS"),
			sortProperty: "THIRD_PARTY_NAME_PSS",
			filterProperty: "THIRD_PARTY_NAME_PSS",
			width: "100px"
		});
		oTable.addColumn(Third_party_name_pss);
		var oAntwerpmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Antwerp: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP_MAPX"),
			sortProperty: "ANTWERP_MAPX",
			filterProperty: "ANTWERP_MAPX",
			width: "100px"
		});
		oTable.addColumn(oAntwerpmapx);

		var oChaudfontainemapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Chaudfontaine: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE_MAPX"),
			sortProperty: "CHAUDFONTAINE_MAPX",
			filterProperty: "CHAUDFONTAINE_MAPX",
			width: "100px"
		});
		oTable.addColumn(oChaudfontainemapx);
		var oGentmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gent: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "GENT_MAPX"),
			sortProperty: "GENT_MAPX",
			filterProperty: "GENT_MAPX",
			width: "100px"
		});
		oTable.addColumn(oGentmapx);
		var oClamartmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Clamart: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART_MAPX"),
			sortProperty: "CLAMART_MAPX",
			filterProperty: "CLAMART_MAPX",
			width: "100px"
		});
		oTable.addColumn(oClamartmapx);
		var oDunkirkmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Dunkirk: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK_MAPX"),
			sortProperty: "DUNKIRK_MAPX",
			filterProperty: "DUNKIRK_MAPX",
			width: "100px"
		});
		oTable.addColumn(oDunkirkmapx);
		var oGrignymapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Grigny: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY_MAPX"),
			sortProperty: "GRIGNY_MAPX",
			filterProperty: "GRIGNY_MAPX",
			width: "100px"
		});
		oTable.addColumn(oGrignymapx);
		var oMarseillemapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Marseille: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE_MAPX"),
			sortProperty: "MARSEILLE_MAPX",
			filterProperty: "MARSEILLE_MAPX",
			width: "100px"
		});
		oTable.addColumn(oMarseillemapx);
		var oTolousemapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tolouse: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "TOLOUSE_MAPX"),
			sortProperty: "TOLOUSE_MAPX",
			filterProperty: "TOLOUSE_MAPX",
			width: "100px"
		});
		oTable.addColumn(oTolousemapx);
		var oKillbridemapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Killbride: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "KILLBRIDE_MAPX"),
			sortProperty: "KILLBRIDE_MAPX",
			filterProperty: "KILLBRIDE_MAPX",
			width: "100px"
		});
		oTable.addColumn(oKillbridemapx);
		var oEdmontonmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON_MAPX"),
			sortProperty: "EDMONTON_MAPX",
			filterProperty: "EDMONTON_MAPX",
			width: "100px"
		});
		oTable.addColumn(oEdmontonmapx);
		var oKeynesmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "KEYNES_MAPX"),
			sortProperty: "KEYNES_MAPX",
			filterProperty: "KEYNES_MAPX",
			width: "100px"
		});
		oTable.addColumn(oKeynesmapx);
		var oMorpethmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MORPETH_MAPX"),
			sortProperty: "MORPETH_MAPX",
			filterProperty: "MORPETH_MAPX",
			width: "100px"
		});
		oTable.addColumn(oMorpethmapx);
		var oSidcupmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP_MAPX"),
			sortProperty: "SIDCUP_MAPX",
			filterProperty: "SIDCUP_MAPX",
			width: "100px"
		});
		oTable.addColumn(oSidcupmapx);
		var oWakefieldmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD_MAPX"),
			sortProperty: "WAKEFIELD_MAPX",
			filterProperty: "WAKEFIELD_MAPX",
			width: "100px"
		});
		oTable.addColumn(oWakefieldmapx);
		var oDongenmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Dongen: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN_MAPX"),
			sortProperty: "DONGEN_MAPX",
			filterProperty: "DONGEN_MAPX",
			width: "100px"
		});
		oTable.addColumn(oDongenmapx);
		var oLorenskogmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Lorenskog: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "LORENSKOG_MAPX"),
			sortProperty: "LORENSKOG_MAPX",
			filterProperty: "LORENSKOG_MAPX",
			width: "100px"
		});
		oTable.addColumn(oLorenskogmapx);
		var oMackmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Mack: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MACK_MAPX"),
			sortProperty: "MACK_MAPX",
			filterProperty: "MACK_MAPX",
			width: "100px"
		});
		oTable.addColumn(oMackmapx);
		var oJordbromapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Jordbro: Minimum Production Run",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "JORDBRO_MAPX"),
			sortProperty: "JORDBRO_MAPX",
			filterProperty: "JORDBRO_MAPX",
			width: "100px"
		});
		oTable.addColumn(oJordbromapx);
		var ominordermapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Minimum Order Quantity",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MINORDER_MAPX"),
			sortProperty: "MINORDER_MAPX",
			filterProperty: "MINORDER_MAPX",
			width: "100px"
		});
		oTable.addColumn(ominordermapx);
		var ounitconcentratemapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Units of Concentrate",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "UNIT_CONCENTRATE_MAPX"),
			sortProperty: "UNIT_CONCENTRATE_MAPX",
			filterProperty: "UNIT_CONCENTRATE_MAPX",
			width: "100px"
		});
		oTable.addColumn(ounitconcentratemapx);
		var ocasevolmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Case Volume",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CASEVOL_MAPX"),
			sortProperty: "CASEVOL_MAPX",
			filterProperty: "CASEVOL_MAPX",
			width: "100px"
		});
		oTable.addColumn(ocasevolmapx);
		var oAntwerp2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Antwerp: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "ANTWERP2_MAPX"),
			sortProperty: "ANTWERP2_MAPX",
			filterProperty: "ANTWERP2_MAPX",
			width: "100px"
		});

		var oChaudfontaine2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Chaudfontaine: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CHAUDFONTAINE2_MAPX"),
			sortProperty: "CHAUDFONTAINE2_MAPX",
			filterProperty: "CHAUDFONTAINE2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oChaudfontaine2mapx);
		var oGent2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Gent: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "GENT2_MAPX"),
			sortProperty: "GENT2_MAPX",
			filterProperty: "GENT2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oGent2mapx);

		var oClamart2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Clamart: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "CLAMART2_MAPX"),
			sortProperty: "CLAMART2_MAPX",
			filterProperty: "CLAMART2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oClamart2mapx);
		var oDunkirk2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Dunkirk: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "DUNKIRK2_MAPX"),
			sortProperty: "DUNKIRK2_MAPX",
			filterProperty: "DUNKIRK2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oDunkirk2mapx);
		var oGrigny2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Grigny: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "GRIGNY2_MAPX"),
			sortProperty: "GRIGNY2_MAPX",
			filterProperty: "GRIGNY2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oGrigny2mapx);
		var oMarseille2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Marseille: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MARSEILLE2_MAPX"),
			sortProperty: "MARSEILLE2_MAPX",
			filterProperty: "MARSEILLE2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oMarseille2mapx);
		var oTolouse2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Tolouse: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "TOLOUSE2_MAPX"),
			sortProperty: "TOLOUSE2_MAPX",
			filterProperty: "TOLOUSE2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oTolouse2mapx);
		var oKillbride2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "East Killbride: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "KILLBRIDE2_MAPX"),
			sortProperty: "KILLBRIDE2_MAPX",
			filterProperty: "KILLBRIDE2_MAPX",
			width: "200px"
		});
		oTable.addColumn(oKillbride2mapx);
		var oEdmonton2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Edmonton: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "EDMONTON2_MAPX"),
			sortProperty: "EDMONTON2_MAPX",
			filterProperty: "EDMONTON2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oEdmonton2mapx);
		var oKeynes2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Milton Keynes: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "KEYNES2_MAPX"),
			sortProperty: "KEYNES2_MAPX",
			filterProperty: "KEYNES2_MAPX",
			width: "200px"
		});
		oTable.addColumn(oKeynes2mapx);
		var oMorpeth2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Morpeth: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MORPETH2_MAPX"),
			sortProperty: "MORPETH2_MAPX",
			filterProperty: "MORPETH2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oMorpeth2mapx);
		var oSidcup2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Sidcup: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "SIDCUP2_MAPX"),
			sortProperty: "SIDCUP2_MAPX",
			filterProperty: "SIDCUP2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oSidcup2mapx);
		var oWakefield2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Wakefield: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "WAKEFIELD2_MAPX"),
			sortProperty: "WAKEFIELD2_MAPX",
			filterProperty: "WAKEFIELD2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oWakefield2mapx);
		var oDongen2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Dongen: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "DONGEN2_MAPX"),
			sortProperty: "DONGEN2_MAPX",
			filterProperty: "DONGEN2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oDongen2mapx);
		var oLorenskog2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Lorenskog: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "LORENSKOG2_MAPX"),
			sortProperty: "LORENSKOG2_MAPX",
			filterProperty: "LORENSKOG2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oLorenskog2mapx);
		var oMack2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Mack: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MACK2_MAPX"),
			sortProperty: "MACK2_MAPX",
			filterProperty: "MACK2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oMack2mapx);
		var oJordbro2mapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Jordbro: Reduced Line Utilisation (LU) %",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "JORDBRO2_MAPX"),
			sortProperty: "JORDBRO2_MAPX",
			filterProperty: "JORDBRO2_MAPX",
			width: "100px"
		});
		oTable.addColumn(oJordbro2mapx);
		var oaddtcostmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Additional Costs",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "ADDTCOST_MAPX"),
			sortProperty: "ADDTCOST_MAPX",
			filterProperty: "ADDTCOST_MAPX",
			width: "100px"
		});
		oTable.addColumn(oaddtcostmapx);
		var msnok = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MS NOK",
				wrapping: true
			}).addStyleClass("green"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "MS_NOK"),
			sortProperty: "MS_NOK",
			filterProperty: "MS_NOK",
			width: "100px"
		});
		oTable.addColumn(msnok);
		var oothconsiderationsmapx = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Other considerations",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "OTHERCONSIDERATION_MAPX"),
			sortProperty: "OTHERCONSIDERATION_MAPX",
			filterProperty: "OTHERCONSIDERATION_MAPX",
			width: "100px"
		});
		oTable.addColumn(oothconsiderationsmapx);
		var oBrnd_ownr = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Brand Owner Name",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.TextField({
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				editable: true
			}).addStyleClass("wordBreak").bindProperty("value", "BRANDOWNER_NAME"),
			sortProperty: "BRANDOWNER_NAME",
			filterProperty: "BRANDOWNER_NAME",
			width: "200px"
		});
		oTable.addColumn(oBrnd_ownr);
		var oBrandOwner = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Brand Owner",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "KO"
					}),
		              new sap.ui.core.ListItem({
						text: "Non-KO"
					})],
				selectedKey: {
					path: 'BRAND_OWNER',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "BRAND_OWNER"),
			sortProperty: "	BRAND_OWNER",
			filterProperty: "BRAND_OWNER",
			width: "200px"
		});
		oTable.addColumn(oBrandOwner);
		var oFRCategory = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "FR Category",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "All except PET (CAN, BIB, NRG, GB productions, …)"
					}),
		              new sap.ui.core.ListItem({
						text: "Co-Fill"
					}), new sap.ui.core.ListItem({
						text: "Multipack"
					}), new sap.ui.core.ListItem({
						text: "PET"
					}), new sap.ui.core.ListItem({
						text: "Repacking"
					})],
				/*selectedKey: {
					path: 'FR_CATEGORY',
					formatter: function(value) {
						if (value == null) {
							value = "";
						}
						return value;
					}
				},*/
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "FR_CATEGORY"),
			sortProperty: "FR_CATEGORY",
			filterProperty: "FR_CATEGORY",
			width: "200px"
		});
		oTable.addColumn(oFRCategory);

		var oMarkem = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Markem",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.m.ComboBox({
				items: [new sap.ui.core.ListItem({
						text: ""
					}),
					new sap.ui.core.ListItem({
						text: "Completed"
					}),
		              new sap.ui.core.ListItem({
						text: "N/A"
					}), new sap.ui.core.ListItem({
						text: "Required"
					})],
				change: function() {
					that._updateActivityTable(this, oTable);
				},
				width: "100%"
			}).addStyleClass("wordBreak").bindProperty("value", "MARKEM"),
			sortProperty: "MARKEM",
			filterProperty: "MARKEM",
			width: "200px"
		});
		oTable.addColumn(oMarkem);

		var oNewArtNum = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Generate New Artwork Number",
				wrapping: true
			}).addStyleClass("blue"),
			template: new sap.ui.commons.CheckBox({

				change: function() {
					that._updateActivityTable(this, oTable);
					that.generateArtwork(this, oTable);
				}
			}).addStyleClass("wordBreak").bindProperty("checked", "NEWART"),
			sortProperty: "NEWART",
			filterProperty: "NEWART",
			width: "200px"
		});
		oTable.addColumn(oNewArtNum);

		console.log(oTable.getColumns()[0]);
		oTable.sort(oTable.getColumns()[0]);
	
		var jsonParams = {

			"allRequests": [],
			"allContSiteLine": [],
			"allNIMs": [],
			"allGroups": [],
			"allThemes": [],
			"allPromotionalType": [],
			"allInitDept": [],
			"allCountries": [],
			"allmatchange": [],
			"allpromomech": [],
			"allartwork": [],
			"allSuppliers": [],
			"yes_no": [],
			"allSites": [],
			"allnimcm": [],
			"allDelay": [],
			"allProjectTypes": [],
			"allmfgsource": [],
			"allSiteLine": [],
			"allCurrency": [],
			"yes_no_tbd": [],
			"allSupplierfb": [],
			"allCommodities": [],
			//"allProjectPhase": [],
			"allDesignMessage": [],
			"allLeadMarket": [],
			"allMaterialSubstrate": [],
			"allPrintProcess": [],
			"allLeadArtwork": [],
			"allTypeChange": [],
			"allContingency": [],
			"allTonica": [],
			"allLogistics": [],
			"allZMMATAPO": [],
			"allContingency": [],
			"allSweetnerData": [],
			"allTrail": [],
			"allTypeChange": [],
			"allDesignMessage": [],
			"allLeadMarket": [],
			"allMaterialSubstrate": [],
			"allProjectPhase": [],
			"allPCBInitiator": [],
			"allPCBPromo": [],
			"allcolor": [],
			"allbrand": [],
			"allflavour": [],
			"allcontainer": [],
			"allpropack": [],
			"allpacktype": [],
			"allprintsupplier": [],
			"allrules": [],
			"allHierarchy": [],
			"allRequestStatus": [],
			"allMapxdecision": [],
			"allMapxpreread": [],
			"allbrandowner": [],
			"allSNPPL02": [],
			"allnebu": []

		};

		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams);
		oTable.setModel(jsonModel);
		
		//				this.refreshAllRequests();

		//					jsonModel.setProperty("/oRows", jsonParams.allRequests.slice(0, 20));
		//  oTable.bindRows("/oRows");

		oTable.bindRows("/allRequests");

		if (displaykey === "Activity_Tracker") {

			oTable.removeAllColumns();
			//	oTable.setFixedColumnCount(1);
			oTable.addColumn(oRefnum);
			oTable.addColumn(oHierarchy);

			oTable.addColumn(oReqNum);
			oTable.addColumn(oTitle);
			oTable.addColumn(oStatus);
			oTable.addColumn(oNIM);
			oTable.addColumn(oNIMCM);

			oTable.addColumn(oInitName);
			oTable.addColumn(oInitDept);
			oTable.addColumn(oAssgDelay);
			oTable.addColumn(oProjPhase);
			oTable.addColumn(oComments);
			oTable.addColumn(oIncVolDet);
			oTable.addColumn(oDestmarket);
			oTable.addColumn(oProjTyp);
			oTable.addColumn(oGate1);
			oTable.addColumn(oProjStartDt);
			oTable.addColumn(oGate2);
			oTable.addColumn(oDFReceived);
			oTable.addColumn(oDFWorkflow);
			oTable.addColumn(oPlannedPSS);
			oTable.addColumn(oFinalPSS);
			oTable.addColumn(oMAPCApprv);
			oTable.addColumn(oMAPXDFGo);
			oTable.addColumn(oDFfeedbk);
			oTable.addColumn(oGate3);
			oTable.addColumn(oSchawkDt);
			oTable.addColumn(oPCBFTPDt);
			oTable.addColumn(oBBNISSCOM);
			oTable.addColumn(oPARApproved);
			oTable.addColumn(oPARApprovedActl);
			oTable.addColumn(oTCCC);
			oTable.addColumn(oSKUCrtStart);
			oTable.addColumn(oSKUCrtComp);
			oTable.addColumn(oMAPXpermission);
			oTable.addColumn(oGate4);
			oTable.addColumn(oProdWeek);
			oTable.addColumn(oQuarantine);
			oTable.addColumn(oQrntineongoing);
			oTable.addColumn(oFirstLastDt);
			oTable.addColumn(oActualFirst);
			oTable.addColumn(oActualCompDt);
			oTable.addColumn(oBrand);
			oTable.addColumn(oBrnd_ownr);
			oTable.addColumn(oBrandOwner);

			oTable.addColumn(oSKUNo);
			oTable.addColumn(oArtworkNo);
			oTable.addColumn(oManuSrc);
			oTable.addColumn(oFRCategory);
			oTable.addColumn(oModDate);
			oTable.addColumn(oModUser);

		}
this.getView().byId("activity_form").addContent(oTable); 
	//	this.getView().byId("activity_form").addContent(oFacetFilterList); //add the layout to the activity form
		//oTable.getColumns()[0].setVisible(false);
		//oTable.sort(oTable.getColumns()[1], sap.ui.table.SortOrder.Ascending);
		for (var i = 0; i < oTable.getColumns().length; i++) {
			if (oTable.getColumns()[i].getLabel().getText() === "DF Request Number") {
				oTable.sort(oTable.getColumns()[i], sap.ui.table.SortOrder.Ascending);
			}

		}
		//	this._refreshAllRequests(); */

		this.getView().getModel("df_request_model").read("/promotional_mech", null, null, false, success8, failed8);

		function success8(data) {
			jsonParams.allpromomech.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oType = {
					PROMOTIONAL: data.results[i].PROMOTIONAL
				};
				jsonParams.allpromomech.push(oType);
			}
			jsonModel.setData(jsonParams);
		}

		function failed8() {}
		this.getView().getModel("df_request_model").read("/proj_typ_nebu", null, null, false, success8a, failed8a);

		function success8a(data) {
			jsonParams.allnebu.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oNebu = {
					PROJTYPNEBU_NAME: data.results[i].PROJTYPNEBU_NAME
				};
				jsonParams.allnebu.push(oNebu);
			}
			jsonModel.setData(jsonParams);
		}

		function failed8a() {}

		this.getView().getModel("df_request_model").read("/nim", null, null, false, success19, failed19);

		function success19(data) {
			jsonParams.allNIMs.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					NIM_NAME: data.results[i].NIM_NAME
				};
				jsonParams.allNIMs.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed19() {}

		this.getView().getModel("df_request_model").read("/df_theme", null, null, false, success21, failed21)

		function success21(data) {
			jsonParams.allThemes.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					THEME_NAME: data.results[i].THEME_NAME
				};
				jsonParams.allThemes.push(oMessage);
			}
			jsonModel.setData(jsonParams);
		}

		function failed21() {}
		this.getView().getModel("df_request_model").read("/initiator_dept", null, null, false, success22, failed22)

		function success22(data) {
			jsonParams.allInitDept.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					DEPT_NAME: data.results[i].DEPT_NAME
				};
				jsonParams.allInitDept.push(oMessage);
			}
			jsonModel.setData(jsonParams);
		}

		function failed22() {}
		this.getView().getModel("df_request_model").read("/mapx_pre_read", null, null, false, success22a, failed22a)

		function success22a(data) {
			jsonParams.allMapxpreread.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					MAPX_PREREAD_NAME: data.results[i].MAPX_PREREAD_NAME
				};
				jsonParams.allMapxpreread.push(oMessage);
			}
			jsonModel.setData(jsonParams);
		}

		function failed22a() {}

		this.getView().getModel("df_request_model").read("/request_status", null, null, false, success22a, failed22a)

		function success22a(data) {
			//jsonParams.allRequestStatus.push("");
			jsonParams.allRequestStatus = [];
			jsonParams.allRequestStatus.push("");
			console.log(jsonParams.allRequestStatus)
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					STATUS_NAME: data.results[i].STATUS_NAME
				};
				jsonParams.allRequestStatus.push(oMessage);
			}
			console.log(jsonParams.allRequestStatus)
			jsonModel.setData(jsonParams);
		}

		function failed22a() {}

		this.getView().getModel("df_request_model").read("/cont_site", null, null, false, successc, failedc)

		function successc(data) {
			//jsonParams.allRequestStatus.push("");
			jsonParams.allContSiteLine = [];
			jsonParams.allContSiteLine.push("");
			console.log(jsonParams.allContSiteLine)
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					NAME: data.results[i].NAME
				};
				jsonParams.allContSiteLine.push(oMessage);
			}
			console.log(jsonParams.allContSiteLine)
			jsonModel.setData(jsonParams);
		}

		function failedc() {}
		this.getView().getModel("df_request_model").read("/df_country", null, null, false, success23, failed23)

		function success23(data) {
			jsonParams.allCountries.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					COUNTRY_CODE: data.results[i].COUNTRY_CODE
				};
				jsonParams.allCountries.push(oMessage);
			}
			jsonModel.setData(jsonParams);
		}

		function failed23() {}

		this.getView().getModel("df_request_model").read("/suppliers", null, null, false, success32, failed32)

		function success32(data) {

			jsonParams.allSuppliers.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SUPPLIER_NAME: data.results[i].SUPPLIER_NAME
				};
				jsonParams.allSuppliers.push(oMessage);
			}
			jsonModel.setData(jsonParams);

		};

		function failed32() {}
		this.getView().getModel("df_request_model").read("/hierarchy", null, null, false, success32a, failed32a)

		function success32a(data) {

			jsonParams.allHierarchy.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					HIERARCHY_NAME: data.results[i].HIERARCHY_NAME
				};
				jsonParams.allHierarchy.push(oMessage);
			}
			jsonModel.setData(jsonParams);

		};

		function failed32a() {}

		this.getView().getModel("df_request_model").read("/project_group", null, null, false, success34, failed34)

		function success34(data) {

			jsonParams.allGroups.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					GROUP_NAME: data.results[i].GROUP_NAME
				};
				jsonParams.allGroups.push(oMessage);
			}
			jsonModel.setData(jsonParams);

		};

		function failed34() {}

		this.getView().getModel("df_request_model").read("/material_change", null, null, false, success36, failed36)

		function success36(data) {

			jsonParams.allmatchange.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					MATERIAL: data.results[i].MATERIAL
				};
				jsonParams.allmatchange.push(oMessage);
			}
			jsonModel.setData(jsonParams);

		};

		function failed36() {}
		this.getView().getModel("df_request_model").read("/artwork_changes", null, null, false, success37, failed37)

		function success37(data) {

			jsonParams.allartwork.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					ARTWORK_NAME: data.results[i].ARTWORK_NAME
				};
				jsonParams.allartwork.push(oMessage);
			}
			jsonModel.setData(jsonParams);

		};

		function failed37() {}
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
					SITE_NAME: data.results[i].SITE_NAME
				};
				jsonParams.allSites.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17b() {}
		this.getView().getModel("df_request_model").read("/nim_cm", null, null, false, success17c, failed17c);

		function success17c(data) {
			jsonParams.allnimcm.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					NIM_CM: data.results[i].NIM_CM
				};
				jsonParams.allnimcm.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17c() {}
		this.getView().getModel("df_request_model").read("/delay", null, null, false, success17d, failed17d);

		function success17d(data) {
			jsonParams.allDelay.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					ASSIGNMENT_NAME: data.results[i].ASSIGNMENT_NAME
				};
				jsonParams.allDelay.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17d() {}
		this.getView().getModel("df_request_model").read("/df_project_type", null, null, false, success17e, failed17e);

		function success17e(data) {
			jsonParams.allProjectTypes.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					TYPE_NAME: data.results[i].TYPE_NAME
				};
				jsonParams.allProjectTypes.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17e() {}
		this.getView().getModel("df_request_model").read("/mfgsource", null, null, false, success17f, failed17f);

		function success17f(data) {
			jsonParams.allmfgsource.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SOURCE_NAME: data.results[i].SOURCE_NAME
				};
				jsonParams.allmfgsource.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17f() {}
		this.getView().getModel("df_request_model").read("/site_line", null, null, false, success17g, failed17g);

		function success17g(data) {
			jsonParams.allSiteLine.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SITE: data.results[i].SITE
				};
				jsonParams.allSiteLine.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17g() {}
		this.getView().getModel("df_request_model").read("/select1", null, null, false, success17h, failed17h);

		function success17h(data) {
			jsonParams.yes_no_tbd.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SELECT: data.results[i].SELECT
				};
				jsonParams.yes_no_tbd.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17h() {}
		this.getView().getModel("df_request_model").read("/supplier_fb", null, null, false, success17i, failed17i);

		function success17i(data) {
			jsonParams.allSupplierfb.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SUPPLIER_NAME: data.results[i].SUPPLIER_NAME
				};
				jsonParams.allSupplierfb.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17i() {}
		this.getView().getModel("df_request_model").read("/commodities", null, null, false, success17j, failed17j);

		function success17j(data) {
			jsonParams.allCommodities.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					COMMODITIES_NAME: data.results[i].COMMODITIES_NAME
				};
				jsonParams.allCommodities.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17j() {}
		this.getView().getModel("df_request_model").read("/tonica_category", null, null, false, success17k, failed17k);

		function success17k(data) {
			jsonParams.allTonica.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					TONICA_NAME: data.results[i].TONICA_NAME
				};
				jsonParams.allTonica.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17k() {}
		this.getView().getModel("df_request_model").read("/logistics_variant", null, null, false, success17l, failed17l);

		function success17l(data) {
			jsonParams.allLogistics.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					LOGISTICS_NAME: data.results[i].LOGISTICS_NAME
				};
				jsonParams.allLogistics.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17l() {}
		this.getView().getModel("df_request_model").read("/logistics_variant", null, null, false, success17m, failed17m);

		function success17m(data) {
			jsonParams.allZMMATAPO.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					ZMMATAPO_NAME: data.results[i].ZMMATAPO_NAME
				};
				jsonParams.allZMMATAPO.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17m() {}
		this.getView().getModel("df_request_model").read("/contingency_dropdown", null, null, false, success17n, failed17n);

		function success17n(data) {
			jsonParams.allContingency.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					CONTINGENCY_NAME: data.results[i].CONTINGENCY_NAME
				};
				jsonParams.allContingency.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17n() {}
		this.getView().getModel("df_request_model").read("/sweetner_dropdown", null, null, false, success17o, failed17o);

		function success17o(data) {
			jsonParams.allSweetnerData.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SWEETNER_NAME: data.results[i].SWEETNER_NAME
				};
				jsonParams.allSweetnerData.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17o() {}
		this.getView().getModel("df_request_model").read("/trails", null, null, false, success17p, failed17p);

		function success17p(data) {
			jsonParams.allTrail.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					TRIALS_NAME: data.results[i].TRIALS_NAME
				};
				jsonParams.allTrail.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17p() {}
		this.getView().getModel("df_request_model").read("/lead_atwork_dropdown", null, null, false, success17q, failed17q);

		function success17q(data) {
			jsonParams.allLeadArtwork.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					LEAD_NAME: data.results[i].LEAD_NAME
				};
				jsonParams.allLeadArtwork.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17q() {}

		this.getView().getModel("df_request_model").read("/type_change", null, null, false, success17r, failed17r);

		function success17r(data) {
			jsonParams.allTypeChange.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					TYPE_NAME: data.results[i].TYPE_NAME
				};
				jsonParams.allTypeChange.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17r() {}
		this.getView().getModel("df_request_model").read("/design_message", null, null, false, success17s, failed17s);

		function success17s(data) {
			jsonParams.allDesignMessage.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					MESSAGE: data.results[i].MESSAGE
				};
				jsonParams.allDesignMessage.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17s() {}
		this.getView().getModel("df_request_model").read("/lead_market_dropdown", null, null, false, success17u, failed17u);

		function success17u(data) {
			jsonParams.allLeadMarket.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					LEAD_NAME: data.results[i].LEAD_NAME
				};
				jsonParams.allLeadMarket.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17u() {}
		this.getView().getModel("df_request_model").read("/contingency_site", null, null, false, success17w, failed17w);

		function success17w(data) {
			jsonParams.allContingency.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					CONTINGENCY_SITE: data.results[i].CONTINGENCY_SITE
				};
				jsonParams.allContingency.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17w() {}
		this.getView().getModel("df_request_model").read("/material_substrate", null, null, false, success17v, failed17v);

		function success17v(data) {
			jsonParams.allMaterialSubstrate.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SUBSTRATE_NAME: data.results[i].SUBSTRATE_NAME
				};
				jsonParams.allMaterialSubstrate.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17v() {}
		this.getView().getModel("df_request_model").read("/print_process", null, null, false, success17v1, failed17v1);

		function success17v1(data) {
			jsonParams.allPrintProcess.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					PRINT_PROCESS: data.results[i].PRINT_PROCESS
				};
				jsonParams.allPrintProcess.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17v1() {}
		this.getView().getModel("df_request_model").read("/project_phase", null, null, false, success17x, failed17x);

		function success17x(data) {
			jsonParams.allProjectPhase.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					PROJECT_PHASE: data.results[i].PROJECT_PHASE
				};
				jsonParams.allProjectPhase.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17x() {}
		this.getView().getModel("df_request_model").read("/pcb_initiator", null, null, false, success17y, failed17y);

		function success17y(data) {
			jsonParams.allPCBInitiator.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					PCB_INITIATOR_NAME: data.results[i].PCB_INITIATOR_NAME
				};
				jsonParams.allPCBInitiator.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17y() {}
		this.getView().getModel("df_request_model").read("/pcb_promo_type", null, null, false, success17z, failed17z);

		function success17z(data) {
			jsonParams.allPCBPromo.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					PCB_PROMOTION_TYPE: data.results[i].PCB_PROMOTION_TYPE
				};
				jsonParams.allPCBPromo.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z() {}
		this.getView().getModel("df_request_model").read("/brand_dropdown", null, null, false, success16z0, failed16z0);

		function success16z0(data) {
			jsonParams.allbrand.push("");
			var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			model_req.setSizeLimit(500);
			jsonModel.setSizeLimit(500);
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					BRAND_NAME: data.results[i].BRAND_NAME
				};
				jsonParams.allbrand.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed16z0() {}
		this.getView().getModel("df_request_model").read("/flavour_dropdown", null, null, false, success16z1, failed16z1);

		function success16z1(data) {
			jsonParams.allflavour.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					FLAVOUR_NAME: data.results[i].FLAVOUR_NAME
				};
				jsonParams.allflavour.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed16z1() {}
		this.getView().getModel("df_request_model").read("/size_dp", null, null, false, success16z2, failed16z2);

		function success16z2(data) {
			jsonParams.allcontainer.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SIZE_NAME: data.results[i].SIZE
				};
				jsonParams.allcontainer.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed16z2() {}
		this.getView().getModel("df_request_model").read("/size", null, null, false, success16z3, failed16z3);

		function success16z3(data) {
			jsonParams.allpropack.push("");
			var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			model_req.setSizeLimit(500);
			jsonModel.setSizeLimit(500);
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SIZE_NAME: data.results[i].SIZE_NAME
				};
				jsonParams.allpropack.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed16z3() {}
		this.getView().getModel("df_request_model").read("/package", null, null, false, success16z4, failed16z4);

		function success16z4(data) {
			jsonParams.allpacktype.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					PACKAGE_NAME: data.results[i].PACKAGE_NAME
				};
				jsonParams.allpacktype.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed16z4() {}
		this.getView().getModel("df_request_model").read("/print_supplier", null, null, false, success17z0, failed17z0);

		function success17z0(data) {
			jsonParams.allprintsupplier.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SUPPLIER_NAME: data.results[i].SUPPLIER_NAME
				};
				jsonParams.allprintsupplier.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z0() {}
		this.getView().getModel("df_request_model").read("/colors", null, null, false, success17z1, failed17z1);

		function success17z1(data) {
			jsonParams.allcolor.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					COLOR_NAME: data.results[i].COLOR_NAME
				};
				jsonParams.allcolor.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z1() {}
		this.getView().getModel("df_request_model").read("/snppl1", null, null, false, success17z11, failed17z11);

		function success17z11(data) {
			jsonParams.allSNPPL02.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					SNPPL_NAME: data.results[i].SNPPL_NAME
				};
				jsonParams.allSNPPL02.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z11() {}
		this.getView().getModel("df_request_model").read("/brandowner", null, null, false, success17z2, failed17z2);

		function success17z2(data) {
			jsonParams.allbrandowner.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					BRANDOWNER_NAME: data.results[i].BRANDOWNER_NAME
				};
				jsonParams.allbrandowner.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z2() {}

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
		this.getView().getModel("df_request_model").read("/mapx_decision", null, null, false, success17z4, failed17z4);

		function success17z4(data) {
			jsonParams.allMapxdecision.push("");
			for (var i = 0; i < data.results.length; i++) {
				var oMessage = {
					MAPX_NAME: data.results[i].MAPX_NAME
				};
				jsonParams.allMapxdecision.push(oMessage);
				//   console.log(data.results[i].SUPPLIER_NAME)
			}
			jsonModel.setData(jsonParams);
		}

		function failed17z4() {}
	},
	refreshAllRequests: function() {
		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		sap.ui.getCore().byId("common_data").getModel().getData().allRequests = [];

		if (DF_IND === "Y") {
			model_req.read(
				"/DF_DB?$filter=HIERARCHY eq 'DF' &$select=FR_CATEGORY,UNIT5,PSEUDO_REF_NUM,QUANRANTINE_INPT,HIERARCHY,MOD_DATE,MOD_USER,DF_ID,TITLE,STATUS_NAME,NIM1,NIM_CM,INITIATOR,INITIATOR_DEPT,ASSIGNMENT_DELAY,PROJECT_PHASE,COMMENTS,INCREMENTAL_VOLUME1,SELLING_COUNTRY,PROJECT_TYPE,GATE1,START_DATE,GATE2,DF_RECEIVED,DF_CIRCULATION_STARTED,PLANNED_FINAL_PSS_COMPLETION,FINAL_PSS_COMPLETION,MAPC,MAPX,FEEDBACK_TO_STAKEHOLDER,GATE_3,PCB_TO_SCHAWK,ACTUAL_PCB_FTP_DATE,ISSCOM_CREATED,PAR_APPROVED_PLAN,PAR_APPROVED_ACTUAL,TCCC_PRICING,SKU_CREATION_START,SKU_CREATION_COMPLETE,MAPX_PERMISSION,GATE_4,EST_PROD_WEEK_INPT,QUARANTINE_BAP_CODE,ONGOING,FIRST_LAST_DISPATCH_DATE,ACTUAL_FIRST_DESPATCH,ACTUAL_COMPLETION_DESPATCH,BRAND,BRANDOWNER_NAME,NUM_SKU,NUM_ARTWORKS,MFG_SOURCE,BRAND_OWNER",
				null, null, false, success, failed);

			function success(data) {
				console.log(data);
				for (var i = 0; i < data.results.length; i++) {
					sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
				}
			}

			function failed() {}
		} else if (SKU_IND === "Y" && RM_IND === "N") {
			console.log(displaykey);
			if (displaykey === "BNL_SKU") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'SKU' &$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,TONICA_MEET_MINS,STATUS_DF,CODE_MAT,DF_ID,NIM1,SELLING_COUNTRY,MAPX,STATUS_PROJECT,TITLE,PROJTYPNEBU,TRIAL_REQ_NEEDED,SAP_SKU_CODE,STATUS_SAP_CODE,BAP_BASIS_CODE,OTH_CODE,DESC,UNKNOWN_SKU,BRAND,FLAVOUR,PROD_SITES,PROD_COUNTRY,INPUT_SKU_PALLET,EST_PROD_WEEK_INPT,STATUS_FIRST_PRODUCTION,THEME_END_DATE,PRODUCTION_END_DATE,STATUS_LAST_PRODUCTION,FIRST_LAST_DISPATCH_DATE,STATUS_FIRST_DESPATCH,LAST_DESPATCH_WEEK,COMMENTS,STATUS_COMMENTS,ISSCOM_CODE,BBN_CODE,CONCENTRATE_BOM,KIT_SIZE,PRODUCT_DENSITY,PSS_REQ_INPT,SHELF,QUANRANTINE_INPT,ONGOING,IND_RUN_OUT_RULES,FIXED_QUANTITIES,PROMOTIONAL_MECHANIC,MATERIAL_CHANGE,SNPPL02,PLANNER,REPACK_DESCRIPTION,FIRST_PRODUCTION_INPT_SKU,LAST_PRODUCTION_INPT_SKU,QUANTITIES_SKU",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else if (displaykey === "FR_SKU") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'SKU' &$select=PART_CANCELLED,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,BAP_BASIS_CODE,BASIS_PER_COUNTRY,SAP_SKU_CODE,SAP_R3_CODE,VARIANT_CD,VARIANT_DESCRPTN,COUNTRY,PROD_SITES,PROD_COUNTRY,CONTIGENCY_SITE_LINE,ANTWERP_5300,MS_CHAUFONTAINE_5307,GHENT_5301,DONGEN_5400,CLAMART_5104,DUNKRIK_5100,GRIGNY_5105,MARSEILLE_5106,TOULOUSE_5103,THIRD_PARTY,RELEASE_3RD_PARTY,DF_ID,TITLE,NIM1,DESC,FLAVOUR,PACK,CONTAINER,PACKAGE,THEME_TYPE,EST_PROD_WEEK_INPT,QUANRANTINE_INPT,ONGOING,PRODUCTION_END_DATE,DUNKIRK_FULL_CONTAINER,DUNKIRK_FULL_CONTAINER_DESC,DUNKIRK_PRINTED_FILM,DUNKIRK_PRINTED_FILM_DESC,DUNKIRK_BOM_ECM,TOULOUSE_FULL_CONTAINER,TOULOUSE_FULL_CONTAINER_DESC,TOULOUSE_PRINTED_FILM,TOULOUSE_PRINTED_FILM_DESC,TOULOUSE_BOM_ECM,CLAMART_FULL_CONTAINER,CLAMART_FULL_CONTAINER_DESC,CLAMART_PRINTED_FILM,CLAMART_PRINTED_FILM_DESC,CLAMART_BOM_ECM,GRIGNY_FULL_CONTAINER,GRIGNY_FULL_CONTAINER_DESC,GRIGNY_PRINTED_FILM,GRIGNY_PRINTED_FILM_DESC,GRIGNY_BOM_ECM,MARSEILLE_FULL_CONTAINER,MARSEILLE_FULL_CONTAINER_DESC,MARSEILLE_PRINTED_FILM,MARSEILLE_PRINTED_FILM_DESC,MARSEILLE_BOM_ECM,ANTWERP_FULL_CONTAINER,ANTWERP_FULL_CONTAINER_DESC,ANTWERP_PRINTED_FILM,ANTWERP_PRINTED_FILM_DESC,ANTWERP_BOM_ECM,GHENT_FULL_CONTAINER,GHENT_FULL_CONTAINER_DESC,GHENT_PRINTED_FILM,GHENT_PRINTED_FILM_DESC,GHENT_BOM_ECM,CHAUDFONTAINE_FULL_CONTAINER,CHAUDFONTAINE_FULL_CONTAINER_DESC,CHAUDFONTAINE_PRINTED_FILM,CHAUDFONTAINE_PRINTED_FILM_DESC,CHAUDFONTAINE_BOM_ECM,DONGEN_FULL_CONTAINER,DONGEN_FULL_CONTAINER_DESC,DONGEN_PRINTED_FILM,DONGEN_PRINTED_FILM_DESC,DONGEN_BOM_ECM,PSS_REQ_INPT,CONCENTRATE_BOM,BBN_CODE,ISSCOM_CODE,PALLET_SPECIFIC",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else if (displaykey === "GB_SKU") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'SKU' &$select=MARKEM,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,CODE_MAT,DF_ID,TITLE,NIM1,MAPX,PROJECT_PHASE,STATUS_NAME,THEME_TYPE,SELLING_COUNTRY,EST_PROD_WEEK_INPT,PRODUCTION_END_DATE,BRAND,FLAVOUR,BBN_CODE,SHELF,EAN,ZCU,CS,SWEETNER_DATA,BASE_SAP_APO_CODE,REPACKING,BASE_INPUT,SAP_SKU_CODE,BAP_BASIS_CODE,QUARANTINE_BAP_CODE,DESC,BNF_NEEDBY_DATE,BNF_ACTUAL_DATE,MANAGER,MMD_CODE_EXTENDED_PLANNED_DATE,MMD_CODE_EXTENDED_ACTUAL_DATE,T_LANES_FORCAST_PLANNED_DATE,T_LANES_FORCAST_COMPLETED_DATE,PRODUCT_DATABASE_PLANNED_DATE,DB_UPDATED_DATE,SAP_SKU_PLANNING_REQ_DATE,SAP_SKU_PLANNING_PLANNED_DATE,SAP_SKU_PLANNING_ACTUAL_DATE,SALE_OR_QUARANTINE,ITEM_FLAG_TRADERS_REPORT,PACK,CONTAINER,PACKAGE,CPP_RAW,CPP_UNIT,PROD_SITES,PROD_COUNTRY,CONTIGENCY_SITE_LINE,SIDCUP_5501_SD1,SIDCUP_5501_SD2,SIDCUP_5501_SD3,SIDCUP_5501_SD4,SIDCUP_5501_SD5,SIDCUP_5501_SD6,SIDCUP_5501_SD7,SIDCUP_5501_SD8,EDMONTON_5506_ED1,EDMONTON_5506_ED2,EDMONTON_5506_ED3,EDMONTON_5506_ED4,EDMONTON_5506_ED5,EDMONTON_5506_ED6,MILTON_KEYNES_5504_MK1,MILTON_KEYNES_5504_MK2,MILTON_KEYNES_5504_MK3,MILTON_KEYNES_5504_MK4,MILTON_KEYNES_5504_MK5,MILTON_KEYNES_5504_MK67,MILTON_KEYNES_5504_MK89,WAKEFIELD_5502_WK1,WAKEFIELD_5502_WK2,WAKEFIELD_5502_WK3,WAKEFIELD_5502_WK4,WAKEFIELD_5502_WK5,WAKEFIELD_5502_WK6,WAKEFIELD_5502_WK7,WAKEFIELD_5502_WK8,WAKEFIELD_5502_WK9,WAKEFIELD_5502_WK11,WAKEFIELD_5502_WK17,EAST_KILBRIDE_5503_EK1,EAST_KILBRIDE_5503_EK2,EAST_KILBRIDE_5503_EK3,EAST_KILBRIDE_5503_EK4,EAST_KILBRIDE_5503_EK5,EAST_KILBRIDE_5503_EK6,EAST_KILBRIDE_5503_EK7,EAST_KILBRIDE_5503_EK11,MORPETH_5546_AW1,MORPETH_5546_AW2,MORPETH_5546_AW3,MORPETH_5546_AW4,THIRD_PARTY_NAME_PSS",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else if (displaykey === "NOSE_SKU") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'SKU' &$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,TONICA_MEET_MINS,STATUS_DF,CODE_MAT,DF_ID,NIM1,SELLING_COUNTRY,MAPX_DECISION_REQ,MAPX,TITLE,PROJTYPNEBU,TRIAL_REQ_NEEDED,TRIAL_E,TRIAL_L,BAP_BASIS_CODE,STATUS_SAP_CODE,SAP_SKU_CODE,SAP_SKU_SELLING,OTH_CODE,DESC,UNKNOWN_SKU,BRAND,FLAVOUR,INPUT_SKU_PALLET,PRODUCT_SPLIT,PROD_SITES,PROD_COUNTRY,EST_PROD_WEEK_INPT,FIRST_LAST_DISPATCH_DATE,LAST_DESPATCH_WEEK,TRADE_REGISTRATION,TRADE_WINDOW,COMMENTS,ISSCOM_CODE,BBN_CODE,PSS_REQ_INPT,PRODUCT_DENSITY,PACKAGING_DATE_FORMAT,BARCODE_TYPE,BARCODE_TYPE_MULTI,BARCODE_TYPE_DEPATCH,SHELF,CONTAINER,PACK,IND_RUN_OUT_RULES,BRANDOWNER_NAME,MATERIAL_CHANGE,TYPE_DRINK,SWEETNER_DATA",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else {
				model_req.read("/DF_DB?$filter=HIERARCHY eq 'SKU'", null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			}
		} else if (RM_IND === "Y" && SKU_IND === "N") {

			if (displaykey === "FR_RM") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'RM' &$select=NEWART,UNIT5,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,DF_ID,TITLE,NIM1,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,SUPPLIER,MATERAL_SUBSTRATE,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,PCB_TO_SCHAWK,REQ_PCB_FTP_DATE,PCB_FTP_DATE,ACTUAL_PCB_FTP_DATE,SCHAWK_ARTWORK_STATUS,BOTTLING_FIRST,BOTTLING_LAST,IND_RUN_OUT_RULES,RAW_MAT_DESC,BOTTLE_SHAPE,ARTWORK_CHECK,CONTIGENCY_SITE_LINE,ANTWERP_5300,MS_CHAUFONTAINE_5307,GHENT_5301,DONGEN_5400,CLAMART_5104,DUNKRIK_5100,GRIGNY_5105,GRIGNY_SELF_MANUFACTURING_5116,MARSEILLE_5106,TOULOUSE_5103,JORDBRO_2001,ROBSRUD_2003,MD_MACK,THIRD_PARTY,RELEASE_3RD_PARTY,OLD_SAP_RAW_MATERIAL_NUMBER,DF_CIRCULATION_STARTED,NEW_FULL_CODE,NEW_FULL_CODE_DESC,NEW_SAP_RAW_MATERIAL_DESCRIPTION,SAP_SKU_CODE,DESC,NUMBER_COLOR_LAYERS,ADDITONAL_PRINT_FEATURES,MS_ANTWERP_5300,CHAUFONTAINE_5307,MS_GHENT_5301,MS_DONGEN_5400,MS_CLAMART_5104,MS_DUNKRIK_5100,MS_GRIGNY_5105,MS_GRIGNY_SELF_MANUFACTURING_5116,MS_MARSEILLE_5106,MS_TOULOUSE_5103,MS_JORDBRO_2001,MS_ROBSRUD_2003,MS_MACK,MS_3RD_PARTY,MS_RELEASE_3RD_PARTY,MATERIAL_LEAD_INPT,MS_NOK,PART_CANCELLED,RM_SUP,CLICHE_PLATE_COSTS,PO_NUMBER",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						if (data.results[i].NEWART === "true") {
							data.results[i].NEWART = true;
						} else {
							data.results[i].NEWART = false;
						}
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else if (displaykey === "GB_RM") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'RM' &$select=NEWART,SAP_SKU_CODE,UNIT5,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,CODE_MAT,DF_ID,PROJECT_CATEGORY,TITLE,NIM1,PROJECT_PHASE,STATUS_NAME,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,MATERAL_SUBSTRATE,SUPPLIER,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,PCB_TO_SCHAWK,REQ_PCB_FTP_DATE,PCB_FTP_DATE,ACTUAL_PCB_FTP_DATE,NUMBER_COLOR_LAYERS,ADDITONAL_PRINT_FEATURES,NEW_SAP_RAW_MATERIAL_DESCRIPTION,CINCOM_OLD_PART_NUMBER,OLD_SAP_RAW_MATERIAL_NUMBER,CINCOM_NEW_PART_NUMBER,DF_CIRCULATION_STARTED,NEW_FULL_CODE,NEW_FULL_CODE_DESC,PART_CANCELLED,RM_SUP,CHLD_REF,BRAND_COLOR,CINCOM_CONTRACTS,SAP_CONTRACTS_UPDATED_DATE,BAP_SKU_CHANGE,TYPE_OF_CHANGE,BAP_BASIS_CODE,EST_PROD_WEEK_INPT,SIDCUP_5501_SD1,SIDCUP_5501_SD2,SIDCUP_5501_SD3,SIDCUP_5501_SD4,SIDCUP_5501_SD5,SIDCUP_5501_SD6,SIDCUP_5501_SD7,SIDCUP_5501_SD8,EDMONTON_5506_ED1,EDMONTON_5506_ED2,EDMONTON_5506_ED3,EDMONTON_5506_ED4,EDMONTON_5506_ED5,EDMONTON_5506_ED6,MILTON_KEYNES_5504_MK1,MILTON_KEYNES_5504_MK2,MILTON_KEYNES_5504_MK3,MILTON_KEYNES_5504_MK4,MILTON_KEYNES_5504_MK5,MILTON_KEYNES_5504_MK67,MILTON_KEYNES_5504_MK89,WAKEFIELD_5502_WK1,WAKEFIELD_5502_WK2,WAKEFIELD_5502_WK3,WAKEFIELD_5502_WK4,WAKEFIELD_5502_WK5,WAKEFIELD_5502_WK6,WAKEFIELD_5502_WK7,WAKEFIELD_5502_WK8,WAKEFIELD_5502_WK9,WAKEFIELD_5502_WK11,WAKEFIELD_5502_WK17,EAST_KILBRIDE_5503_EK1,EAST_KILBRIDE_5503_EK2,EAST_KILBRIDE_5503_EK3,EAST_KILBRIDE_5503_EK4,EAST_KILBRIDE_5503_EK5,EAST_KILBRIDE_5503_EK6,EAST_KILBRIDE_5503_EK7,EAST_KILBRIDE_5503_EK11,MORPETH_5546_AW1,MORPETH_5546_AW2,MORPETH_5546_AW3,MORPETH_5546_AW4,THIRD_PARTY_NAME_PSS",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						if (data.results[i].NEWART === "true") {
							data.results[i].NEWART = true;
						} else {
							data.results[i].NEWART = false;
						}
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else if (displaykey === "NEBU_RM") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY eq 'RM' &$select=NEWART,UNIT5,MS_NOK,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,CODE_MAT,DF_ID,TITLE,NIM1,RAW_MAT_DESC,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,SUPPLIER,MATERAL_SUBSTRATE,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,PCB_TO_SCHAWK,REQ_PCB_FTP_DATE,PCB_FTP_DATE,ACTUAL_PCB_FTP_DATE,SCHAWK_ARTWORK_STATUS,BOTTLING_FIRST,BOTTLING_LAST,NUMBER_COLOR_LAYERS,IND_RUN_OUT_RULES,BOTTLE_SHAPE,ARTWORK_CHECK,CONTIGENCY_SITE_LINE,ANTWERP_5300,MS_CHAUFONTAINE_5307,GHENT_5301,DONGEN_5400,CLAMART_5104,DUNKRIK_5100,GRIGNY_5105,GRIGNY_SELF_MANUFACTURING_5116,MARSEILLE_5106,TOULOUSE_5103,JORDBRO_2001,ROBSRUD_2003,MD_MACK,THIRD_PARTY,RELEASE_3RD_PARTY,OLD_SAP_RAW_MATERIAL_NUMBER,DF_CIRCULATION_STARTED,NEW_FULL_CODE,NEW_FULL_CODE_DESC,NEW_SAP_RAW_MATERIAL_DESCRIPTION,SAP_SKU_CODE,DESC,ADDITONAL_PRINT_FEATURES,MS_ANTWERP_5300,CHAUFONTAINE_5307,MS_GHENT_5301,MS_DONGEN_5400,MS_CLAMART_5104,MS_DUNKRIK_5100,MS_GRIGNY_5105,MS_GRIGNY_SELF_MANUFACTURING_5116,MS_MARSEILLE_5106,MS_TOULOUSE_5103,MS_JORDBRO_2001,MS_ROBSRUD_2003,MS_MACK,MS_3RD_PARTY,MS_RELEASE_3RD_PARTY,MATERIAL_LEAD_INPT,PART_CANCELLED,RM_SUP",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						if (data.results[i].NEWART === "true") {
							data.results[i].NEWART = true;
						} else {
							data.results[i].NEWART = false;
						}
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else {
				model_req.read("/DF_DB?$filter=HIERARCHY eq 'RM'", null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			}
		} else if (RM_IND === "Y" && SKU_IND === "Y") {

			if (displaykey === "MAPX") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY ne 'DF' &$select=DESC,SAP_SKU_CODE,BAP_BASIS_CODE,OLD_SAP_RAW_MATERIAL_NUMBER,RAW_MAT_DESC,COMMODITIES,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,DF_ID,TITLE,PROJECT_GROUP,STATUS_NAME,GATE1,GATE2,GATE_3,GATE_4,NIM1,NIM_CM,PROJECT_DESCRIPTION,MAPX_DECISION_REQ,MAPX_PREREAD_NAME,PROD_SITES,SAME_AS_CURR,PERIOD1,PERIOD2,PERIOD3,PERIOD4,PERIOD5,PERIOD6,PERIOD7,PERIOD8,PERIOD9,PERIOD10,PERIOD11,PERIOD12,TOTAL,SKU_CREATION_COMPLETE,BAM,FORECAST_REQ,FORECAST_DATE,EST_PROD_WEEK_INPT,QUANRANTINE_INPT,FIRST_LAST_DISPATCH_DATE,SHELF,CONTAINER,ANTWERP_MAPX,CHAUDFONTAINE_MAPX,GENT_MAPX,CLAMART_MAPX,DUNKIRK_MAPX,GRIGNY_MAPX,MARSEILLE_MAPX,TOLOUSE_MAPX,KILLBRIDE_MAPX,EDMONTON_MAPX,KEYNES_MAPX,MORPETH_MAPX,SIDCUP_MAPX,WAKEFIELD_MAPX,DONGEN_MAPX,LORENSKOG_MAPX,MACK_MAPX,JORDBRO_MAPX,MINORDER_MAPX,UNIT_CONCENTRATE_MAPX,CASEVOL_MAPX,RAW,RISK,RISK_MAPX,ANTWERP2_MAPX,CHAUDFONTAINE2_MAPX,GENT2_MAPX,CLAMART2_MAPX,DUNKIRK2_MAPX,GRIGNY2_MAPX,MARSEILLE2_MAPX,TOLOUSE2_MAPX,KILLBRIDE2_MAPX,EDMONTON2_MAPX,KEYNES2_MAPX,MORPETH2_MAPX,SIDCUP2_MAPX,WAKEFIELD2_MAPX,DONGEN2_MAPX,LORENSKOG2_MAPX,MACK2_MAPX,JORDBRO2_MAPX,ADDTCOST_MAPX,OTHERCONSIDERATION_MAPX,COST,FREIGHT_COST,PROMOTIONAL_MECHANIC,THEME_END_DATE,UNIQUE_PACK,CUSTOMER_LOGISTICS",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else if (displaykey === "PCB") {
				model_req.read(
					"/DF_DB?$filter=HIERARCHY ne 'DF' &$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,PCB_INITIATOR_NAME,PCB_TO_SCHAWK,REVISION_NUMBER,DF_ID,TITLE,NIM1,BRAND_OWNER_EMAIL,ART_REVIEWER,PRINTER_EMAIL,BAM_INSTRUCTIONS,NIM_INSTRUCTIONS,BAM_REFERENCE,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,SUPPLIER,MATERAL_SUBSTRATE,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,REQ_PCB_FTP_DATE,PCB_NIM_COMMENTS",
					null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			} else {
				model_req.read("/DF_DB?$filter=HIERARCHY ne 'DF'", null, null, false, success, failed);

				function success(data) {
					for (var i = 0; i < data.results.length; i++) {
						sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
					}
				}

				function failed() {}
			}
		} else {
			model_req.read("/DF_DB", null, null, false, success, failed);

			function success(data) {
				for (var i = 0; i < data.results.length; i++) {
					sap.ui.getCore().byId("common_data").getModel().getData().allRequests.push(data.results[i]);
				}
			}

			function failed() {}
		}
		sap.ui.getCore().byId("common_data").getModel().setData(sap.ui.getCore().byId("common_data").getModel().getData());
		sap.ui.getCore().byId("common_data").getModel().refresh();

	},

	_refreshDPnumber: function() {
		var oModel = this.getView().getModel('df_request_model');
		var that = this;
		oModel.read("/DF_DB", null, null, false, success, failed);

		function success(data) {
			var new_pseudo_ref_num = 0;
			for (var i = 0; i < data.results.length; i++) {

				var new_pseudo_ref_num = parseInt(new_pseudo_ref_num) + 1;

				var ref_num_key = data.results[i].REF_NUMBER;
				modified = new Date();
				var upd_data = {
					"DF_ID": data.results[i].DF_ID,
					"STATUS": data.results[i].STATUS,
					"INITIATOR": data.results[i].INITIATOR,
					"NIM1": data.results[i].NIM1,
					"TITLE": data.results[i].TITLE,
					"PROJECT_GROUP": data.results[i].PROJECT_GROUP,
					"THEME_TYPE": data.results[i].THEME_TYPE,
					"THEME_START_DATE": data.results[i].THEME_START_DATE,
					"THEME_END_DATE": data.results[i].THEME_END_DATE,
					"INITIATOR_DEPT": data.results[i].INITIATOR_DEPT,
					"BRANDOWNER_NAME": data.results[i].BRANDOWNER_NAME,
					"BRAND_OWNER_EMAIL": data.results[i].BRAND_OWNER_EMAIL,
					"SELLING_COUNTRY": data.results[i].SELLING_COUNTRY,
					"FIRST_LAST_DISPATCH_DATE": data.results[i].FIRST_LAST_DISPATCH_DATE,
					"SAP_CODE": data.results[i].SAP_CODE,
					"BAP_CODE": data.results[i].BAP_CODE,
					"COUNTRY": data.results[i].COUNTRY,
					"DESC": data.results[i].DESC,
					"BRAND": data.results[i].BRAND,
					"FLAVOUR": data.results[i].FLAVOUR,
					"CONTAINER": data.results[i].CONTAINER,
					"PACK": data.results[i].PACK,
					"PACKAGE": data.results[i].PACKAGE,
					"PALLET": data.results[i].PALLET,
					"CPP": data.results[i].CPP,
					"EAN": data.results[i].EAN,
					"ZCU": data.results[i].ZCU,
					"CS": data.results[i].CS,
					"PAL": data.results[i].PAL,
					"SHELF": data.results[i].SHELF,
					"SITES": data.results[i].SITES,
					"LINES": data.results[i].LINES,
					"SAP_SKU_CODE": data.results[i].SAP_SKU_CODE,
					"PERIOD1": data.results[i].PERIOD1,
					"PERIOD2": data.results[i].PERIOD2,
					"PERIOD3": data.results[i].PERIOD3,
					"PERIOD4": data.results[i].PERIOD4,
					"PERIOD5": data.results[i].PERIOD5,
					"PERIOD6": data.results[i].PERIOD6,
					"PERIOD7": data.results[i].PERIOD7,
					"PERIOD8": data.results[i].PERIOD8,
					"PERIOD9": data.results[i].PERIOD9,
					"PERIOD10": data.results[i].PERIOD10,
					"PERIOD11": data.results[i].PERIOD11,
					"PERIOD12": data.results[i].PERIOD12,
					"TOTAL": data.results[i].TOTAL,
					"INCREMENTAL_VOLUME1": data.results[i].INCREMENTAL_VOLUME1,
					"MATERIAL_CHANGE": data.results[i].MATERIAL_CHANGE,
					"MATERIAL_CHANGE_OTHER": data.results[i].MATERIAL_CHANGE_OTHER,
					"PROMOTIONAL_MECHANIC": data.results[i].PROMOTIONAL_MECHANIC,
					"ARTWORK_CHANGES": data.results[i].ARTWORK_CHANGES,
					"ARTWORK_OTHER": data.results[i].ARTWORK_OTHER,
					"SUPPLIER_NAME": data.results[i].SUPPLIER_NAME,
					"SUPPLIER_OTHER": data.results[i].SUPPLIER_OTHER,
					"PSEUDO_REF_NUM": new_pseudo_ref_num,
					"DUMMY_REF_NUM": 0,
					"MOD_USER": modified_by,
					"MOD_DATE": modified

				};
				that.getView().getModel('df_request_model').update("/DF_DB('" + ref_num_key + "')", upd_data, null, updateSuccess, updateFailed);

				function updateSuccess() {
					console.log("update successful");
				}

				function updateFailed() {
					console.log("update unsuccessful");
				}

			}
		}

		function failed() {
			console.log("read failed");
		}
	},
	JSONToCSVConvertor: function(JSONData, ReportTitle, ShowLabel, oTable) {
		var arrData;
		var ifnull = function(v, o) {
			if (v == null) {
				v = o || "";
			}
			return v;
		};

		console.log(oTable); console.log(oTable.mBindingInfos.rows.binding.aFilters);

		if (oTable._aSortedColumns.length === 0) {
			var sort_ord = "asc";
			var sort_col = "DF_ID";
		} else {
			console.log(oTable._aSortedColumns[0]._oSorter.sPath);
			console.log(oTable._aSortedColumns[0]._oSorter.bDescending);
			var sort_col = oTable._aSortedColumns[0]._oSorter.sPath;
			if (oTable._aSortedColumns[0]._oSorter.bDescending === true) {
				var sort_ord = "desc";
			} else {
				var sort_ord = "asc";
			}
		}
		console.log(oTable.getBinding().getModel().getData());
		var filter_str = "";
		var filter = oTable.mBindingInfos.rows.binding.aFilters;
				console.log(filter);
				for(var i = 0; i<filter.length;i++){
				    console.log(filter[i]);
				    var spath = filter[i].sPath;
				    var value = filter[i].oValue1;
				    if(filter_str === ""){
				        filter_str = "and substringof(tolower('" + value +"'),tolower(" +spath + "))";
				    }
				    else{
				        filter_str = filter_str + " and substringof(tolower('" + value +"'),tolower(" +spath + "))";
				    }
				}
				console.log(filter_str);

		if (displaykey === "Activity_Tracker") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'DF' "+ filter_str + "&$select=FR_CATEGORY,UNIT5,PSEUDO_REF_NUM,QUANRANTINE_INPT,HIERARCHY,MOD_DATE,MOD_USER,DF_ID,TITLE,STATUS_NAME,NIM1,NIM_CM,INITIATOR,INITIATOR_DEPT,ASSIGNMENT_DELAY,PROJECT_PHASE,COMMENTS,INCREMENTAL_VOLUME1,SELLING_COUNTRY,PROJECT_TYPE,GATE1,START_DATE,GATE2,DF_RECEIVED,DF_CIRCULATION_STARTED,PLANNED_FINAL_PSS_COMPLETION,FINAL_PSS_COMPLETION,MAPC,MAPX,FEEDBACK_TO_STAKEHOLDER,GATE_3,PCB_TO_SCHAWK,ACTUAL_PCB_FTP_DATE,ISSCOM_CREATED,PAR_APPROVED_PLAN,PAR_APPROVED_ACTUAL,TCCC_PRICING,SKU_CREATION_START,SKU_CREATION_COMPLETE,MAPX_PERMISSION,GATE_4,EST_PROD_WEEK_INPT,QUARANTINE_BAP_CODE,ONGOING,FIRST_LAST_DISPATCH_DATE,ACTUAL_FIRST_DESPATCH,ACTUAL_COMPLETION_DESPATCH,BRAND,BRANDOWNER_NAME,NUM_SKU,NUM_ARTWORKS,MFG_SOURCE,BRAND_OWNER&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
				
			}

			function failed() {}
		} else if (displaykey === "BNL_SKU") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'SKU' "+ filter_str + "&$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,TONICA_MEET_MINS,STATUS_DF,CODE_MAT,DF_ID,NIM1,SELLING_COUNTRY,MAPX,STATUS_PROJECT,TITLE,PROJTYPNEBU,TRIAL_REQ_NEEDED,SAP_SKU_CODE,STATUS_SAP_CODE,BAP_BASIS_CODE,OTH_CODE,DESC,UNKNOWN_SKU,BRAND,FLAVOUR,PROD_SITES,PROD_COUNTRY,INPUT_SKU_PALLET,EST_PROD_WEEK_INPT,STATUS_FIRST_PRODUCTION,THEME_END_DATE,PRODUCTION_END_DATE,STATUS_LAST_PRODUCTION,FIRST_LAST_DISPATCH_DATE,STATUS_FIRST_DESPATCH,LAST_DESPATCH_WEEK,COMMENTS,STATUS_COMMENTS,ISSCOM_CODE,BBN_CODE,CONCENTRATE_BOM,KIT_SIZE,PRODUCT_DENSITY,PSS_REQ_INPT,SHELF,QUANRANTINE_INPT,ONGOING,IND_RUN_OUT_RULES,FIXED_QUANTITIES,PROMOTIONAL_MECHANIC,MATERIAL_CHANGE,SNPPL02,PLANNER,REPACK_DESCRIPTION,FIRST_PRODUCTION_INPT_SKU,LAST_PRODUCTION_INPT_SKU,QUANTITIES_SKU&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "FR_SKU") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'SKU' "+ filter_str + "&$select=PART_CANCELLED,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,BAP_BASIS_CODE,BASIS_PER_COUNTRY,SAP_SKU_CODE,SAP_R3_CODE,VARIANT_CD,VARIANT_DESCRPTN,COUNTRY,PROD_SITES,PROD_COUNTRY,CONTIGENCY_SITE_LINE,ANTWERP_5300,MS_CHAUFONTAINE_5307,GHENT_5301,DONGEN_5400,CLAMART_5104,DUNKRIK_5100,GRIGNY_5105,MARSEILLE_5106,TOULOUSE_5103,THIRD_PARTY,RELEASE_3RD_PARTY,DF_ID,TITLE,NIM1,DESC,FLAVOUR,PACK,CONTAINER,PACKAGE,THEME_TYPE,EST_PROD_WEEK_INPT,QUANRANTINE_INPT,ONGOING,PRODUCTION_END_DATE,DUNKIRK_FULL_CONTAINER,DUNKIRK_FULL_CONTAINER_DESC,DUNKIRK_PRINTED_FILM,DUNKIRK_PRINTED_FILM_DESC,DUNKIRK_BOM_ECM,TOULOUSE_FULL_CONTAINER,TOULOUSE_FULL_CONTAINER_DESC,TOULOUSE_PRINTED_FILM,TOULOUSE_PRINTED_FILM_DESC,TOULOUSE_BOM_ECM,CLAMART_FULL_CONTAINER,CLAMART_FULL_CONTAINER_DESC,CLAMART_PRINTED_FILM,CLAMART_PRINTED_FILM_DESC,CLAMART_BOM_ECM,GRIGNY_FULL_CONTAINER,GRIGNY_FULL_CONTAINER_DESC,GRIGNY_PRINTED_FILM,GRIGNY_PRINTED_FILM_DESC,GRIGNY_BOM_ECM,MARSEILLE_FULL_CONTAINER,MARSEILLE_FULL_CONTAINER_DESC,MARSEILLE_PRINTED_FILM,MARSEILLE_PRINTED_FILM_DESC,MARSEILLE_BOM_ECM,ANTWERP_FULL_CONTAINER,ANTWERP_FULL_CONTAINER_DESC,ANTWERP_PRINTED_FILM,ANTWERP_PRINTED_FILM_DESC,ANTWERP_BOM_ECM,GHENT_FULL_CONTAINER,GHENT_FULL_CONTAINER_DESC,GHENT_PRINTED_FILM,GHENT_PRINTED_FILM_DESC,GHENT_BOM_ECM,CHAUDFONTAINE_FULL_CONTAINER,CHAUDFONTAINE_FULL_CONTAINER_DESC,CHAUDFONTAINE_PRINTED_FILM,CHAUDFONTAINE_PRINTED_FILM_DESC,CHAUDFONTAINE_BOM_ECM,DONGEN_FULL_CONTAINER,DONGEN_FULL_CONTAINER_DESC,DONGEN_PRINTED_FILM,DONGEN_PRINTED_FILM_DESC,DONGEN_BOM_ECM,PSS_REQ_INPT,CONCENTRATE_BOM,BBN_CODE,ISSCOM_CODE,PALLET_SPECIFIC&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "FR_RM") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'RM' "+ filter_str + "&$select=NEWART,UNIT5,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,DF_ID,TITLE,NIM1,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,SUPPLIER,MATERAL_SUBSTRATE,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,PCB_TO_SCHAWK,REQ_PCB_FTP_DATE,PCB_FTP_DATE,ACTUAL_PCB_FTP_DATE,SCHAWK_ARTWORK_STATUS,BOTTLING_FIRST,BOTTLING_LAST,IND_RUN_OUT_RULES,RAW_MAT_DESC,BOTTLE_SHAPE,ARTWORK_CHECK,CONTIGENCY_SITE_LINE,ANTWERP_5300,MS_CHAUFONTAINE_5307,GHENT_5301,DONGEN_5400,CLAMART_5104,DUNKRIK_5100,GRIGNY_5105,GRIGNY_SELF_MANUFACTURING_5116,MARSEILLE_5106,TOULOUSE_5103,JORDBRO_2001,ROBSRUD_2003,MD_MACK,THIRD_PARTY,RELEASE_3RD_PARTY,OLD_SAP_RAW_MATERIAL_NUMBER,DF_CIRCULATION_STARTED,NEW_FULL_CODE,NEW_FULL_CODE_DESC,NEW_SAP_RAW_MATERIAL_DESCRIPTION,SAP_SKU_CODE,DESC,NUMBER_COLOR_LAYERS,ADDITONAL_PRINT_FEATURES,MS_ANTWERP_5300,CHAUFONTAINE_5307,MS_GHENT_5301,MS_DONGEN_5400,MS_CLAMART_5104,MS_DUNKRIK_5100,MS_GRIGNY_5105,MS_GRIGNY_SELF_MANUFACTURING_5116,MS_MARSEILLE_5106,MS_TOULOUSE_5103,MS_JORDBRO_2001,MS_ROBSRUD_2003,MS_MACK,MS_3RD_PARTY,MS_RELEASE_3RD_PARTY,MATERIAL_LEAD_INPT,MS_NOK,PART_CANCELLED,RM_SUP,CLICHE_PLATE_COSTS,PO_NUMBER&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "GB_SKU") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'SKU' "+ filter_str + "&$select=MARKEM,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,CODE_MAT,DF_ID,TITLE,NIM1,MAPX,PROJECT_PHASE,STATUS_NAME,THEME_TYPE,SELLING_COUNTRY,EST_PROD_WEEK_INPT,PRODUCTION_END_DATE,BRAND,FLAVOUR,BBN_CODE,SHELF,EAN,ZCU,CS,SWEETNER_DATA,BASE_SAP_APO_CODE,REPACKING,BASE_INPUT,SAP_SKU_CODE,BAP_BASIS_CODE,QUARANTINE_BAP_CODE,DESC,BNF_NEEDBY_DATE,BNF_ACTUAL_DATE,MANAGER,MMD_CODE_EXTENDED_PLANNED_DATE,MMD_CODE_EXTENDED_ACTUAL_DATE,T_LANES_FORCAST_PLANNED_DATE,T_LANES_FORCAST_COMPLETED_DATE,PRODUCT_DATABASE_PLANNED_DATE,DB_UPDATED_DATE,SAP_SKU_PLANNING_REQ_DATE,SAP_SKU_PLANNING_PLANNED_DATE,SAP_SKU_PLANNING_ACTUAL_DATE,SALE_OR_QUARANTINE,ITEM_FLAG_TRADERS_REPORT,PACK,CONTAINER,PACKAGE,CPP_RAW,CPP_UNIT,PROD_SITES,PROD_COUNTRY,CONTIGENCY_SITE_LINE,SIDCUP_5501_SD1,SIDCUP_5501_SD2,SIDCUP_5501_SD3,SIDCUP_5501_SD4,SIDCUP_5501_SD5,SIDCUP_5501_SD6,SIDCUP_5501_SD7,SIDCUP_5501_SD8,EDMONTON_5506_ED1,EDMONTON_5506_ED2,EDMONTON_5506_ED3,EDMONTON_5506_ED4,EDMONTON_5506_ED5,EDMONTON_5506_ED6,MILTON_KEYNES_5504_MK1,MILTON_KEYNES_5504_MK2,MILTON_KEYNES_5504_MK3,MILTON_KEYNES_5504_MK4,MILTON_KEYNES_5504_MK5,MILTON_KEYNES_5504_MK67,MILTON_KEYNES_5504_MK89,WAKEFIELD_5502_WK1,WAKEFIELD_5502_WK2,WAKEFIELD_5502_WK3,WAKEFIELD_5502_WK4,WAKEFIELD_5502_WK5,WAKEFIELD_5502_WK6,WAKEFIELD_5502_WK7,WAKEFIELD_5502_WK8,WAKEFIELD_5502_WK9,WAKEFIELD_5502_WK11,WAKEFIELD_5502_WK17,EAST_KILBRIDE_5503_EK1,EAST_KILBRIDE_5503_EK2,EAST_KILBRIDE_5503_EK3,EAST_KILBRIDE_5503_EK4,EAST_KILBRIDE_5503_EK5,EAST_KILBRIDE_5503_EK6,EAST_KILBRIDE_5503_EK7,EAST_KILBRIDE_5503_EK11,MORPETH_5546_AW1,MORPETH_5546_AW2,MORPETH_5546_AW3,MORPETH_5546_AW4,THIRD_PARTY_NAME_PSS&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "GB_RM") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'RM' "+ filter_str + "&$select=NEWART,SAP_SKU_CODE,UNIT5,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,CODE_MAT,DF_ID,PROJECT_CATEGORY,TITLE,NIM1,PROJECT_PHASE,STATUS_NAME,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,MATERAL_SUBSTRATE,SUPPLIER,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,PCB_TO_SCHAWK,REQ_PCB_FTP_DATE,PCB_FTP_DATE,ACTUAL_PCB_FTP_DATE,NUMBER_COLOR_LAYERS,ADDITONAL_PRINT_FEATURES,NEW_SAP_RAW_MATERIAL_DESCRIPTION,CINCOM_OLD_PART_NUMBER,OLD_SAP_RAW_MATERIAL_NUMBER,CINCOM_NEW_PART_NUMBER,DF_CIRCULATION_STARTED,NEW_FULL_CODE,NEW_FULL_CODE_DESC,PART_CANCELLED,RM_SUP,CHLD_REF,BRAND_COLOR,CINCOM_CONTRACTS,SAP_CONTRACTS_UPDATED_DATE,BAP_SKU_CHANGE,TYPE_OF_CHANGE,BAP_BASIS_CODE,EST_PROD_WEEK_INPT,SIDCUP_5501_SD1,SIDCUP_5501_SD2,SIDCUP_5501_SD3,SIDCUP_5501_SD4,SIDCUP_5501_SD5,SIDCUP_5501_SD6,SIDCUP_5501_SD7,SIDCUP_5501_SD8,EDMONTON_5506_ED1,EDMONTON_5506_ED2,EDMONTON_5506_ED3,EDMONTON_5506_ED4,EDMONTON_5506_ED5,EDMONTON_5506_ED6,MILTON_KEYNES_5504_MK1,MILTON_KEYNES_5504_MK2,MILTON_KEYNES_5504_MK3,MILTON_KEYNES_5504_MK4,MILTON_KEYNES_5504_MK5,MILTON_KEYNES_5504_MK67,MILTON_KEYNES_5504_MK89,WAKEFIELD_5502_WK1,WAKEFIELD_5502_WK2,WAKEFIELD_5502_WK3,WAKEFIELD_5502_WK4,WAKEFIELD_5502_WK5,WAKEFIELD_5502_WK6,WAKEFIELD_5502_WK7,WAKEFIELD_5502_WK8,WAKEFIELD_5502_WK9,WAKEFIELD_5502_WK11,WAKEFIELD_5502_WK17,EAST_KILBRIDE_5503_EK1,EAST_KILBRIDE_5503_EK2,EAST_KILBRIDE_5503_EK3,EAST_KILBRIDE_5503_EK4,EAST_KILBRIDE_5503_EK5,EAST_KILBRIDE_5503_EK6,EAST_KILBRIDE_5503_EK7,EAST_KILBRIDE_5503_EK11,MORPETH_5546_AW1,MORPETH_5546_AW2,MORPETH_5546_AW3,MORPETH_5546_AW4,THIRD_PARTY_NAME_PSS&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "MAPX") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY ne 'DF' "+ filter_str + "&$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,DF_ID,TITLE,PROJECT_GROUP,STATUS_NAME,GATE1,GATE2,GATE_3,GATE_4,NIM1,NIM_CM,PROJECT_DESCRIPTION,MAPX_DECISION_REQ,MAPX_PREREAD_NAME,SAP_SKU_CODE,BAP_BASIS_CODE,OLD_SAP_RAW_MATERIAL_NUMBER,RAW_MAT_DESC,COMMODITIES,DESC,PROD_SITES,SAME_AS_CURR,PERIOD1,PERIOD2,PERIOD3,PERIOD4,PERIOD5,PERIOD6,PERIOD7,PERIOD8,PERIOD9,PERIOD10,PERIOD11,PERIOD12,TOTAL,SKU_CREATION_COMPLETE,BAM,FORECAST_REQ,FORECAST_DATE,EST_PROD_WEEK_INPT,QUANRANTINE_INPT,FIRST_LAST_DISPATCH_DATE,SHELF,CONTAINER,ANTWERP_MAPX,CHAUDFONTAINE_MAPX,GENT_MAPX,CLAMART_MAPX,DUNKIRK_MAPX,GRIGNY_MAPX,MARSEILLE_MAPX,TOLOUSE_MAPX,KILLBRIDE_MAPX,EDMONTON_MAPX,KEYNES_MAPX,MORPETH_MAPX,SIDCUP_MAPX,WAKEFIELD_MAPX,DONGEN_MAPX,LORENSKOG_MAPX,MACK_MAPX,JORDBRO_MAPX,MINORDER_MAPX,UNIT_CONCENTRATE_MAPX,CASEVOL_MAPX,RAW,RISK,RISK_MAPX,ANTWERP2_MAPX,CHAUDFONTAINE2_MAPX,GENT2_MAPX,CLAMART2_MAPX,DUNKIRK2_MAPX,GRIGNY2_MAPX,MARSEILLE2_MAPX,TOLOUSE2_MAPX,KILLBRIDE2_MAPX,EDMONTON2_MAPX,KEYNES2_MAPX,MORPETH2_MAPX,SIDCUP2_MAPX,WAKEFIELD2_MAPX,DONGEN2_MAPX,LORENSKOG2_MAPX,MACK2_MAPX,JORDBRO2_MAPX,ADDTCOST_MAPX,OTHERCONSIDERATION_MAPX,COST,FREIGHT_COST,PROMOTIONAL_MECHANIC,THEME_END_DATE,UNIQUE_PACK,CUSTOMER_LOGISTICS&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "NOSE_SKU") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'SKU' "+ filter_str + "&$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,TONICA_MEET_MINS,STATUS_DF,CODE_MAT,DF_ID,NIM1,SELLING_COUNTRY,MAPX_DECISION_REQ,MAPX,TITLE,PROJTYPNEBU,TRIAL_REQ_NEEDED,TRIAL_E,TRIAL_L,BAP_BASIS_CODE,STATUS_SAP_CODE,SAP_SKU_CODE,SAP_SKU_SELLING,OTH_CODE,DESC,UNKNOWN_SKU,BRAND,FLAVOUR,INPUT_SKU_PALLET,PRODUCT_SPLIT,PROD_SITES,PROD_COUNTRY,EST_PROD_WEEK_INPT,FIRST_LAST_DISPATCH_DATE,LAST_DESPATCH_WEEK,TRADE_REGISTRATION,TRADE_WINDOW,COMMENTS,ISSCOM_CODE,BBN_CODE,PSS_REQ_INPT,PRODUCT_DENSITY,PACKAGING_DATE_FORMAT,BARCODE_TYPE,BARCODE_TYPE_MULTI,BARCODE_TYPE_DEPATCH,SHELF,CONTAINER,PACK,IND_RUN_OUT_RULES,BRANDOWNER_NAME,MATERIAL_CHANGE,TYPE_DRINK,SWEETNER_DATA&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "NEBU_RM") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY eq 'RM' "+ filter_str + "&$select=NEWART,UNIT5,MS_NOK,PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,CODE_MAT,DF_ID,TITLE,NIM1,RAW_MAT_DESC,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,SUPPLIER,MATERAL_SUBSTRATE,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,PCB_TO_SCHAWK,REQ_PCB_FTP_DATE,PCB_FTP_DATE,ACTUAL_PCB_FTP_DATE,SCHAWK_ARTWORK_STATUS,BOTTLING_FIRST,BOTTLING_LAST,NUMBER_COLOR_LAYERS,IND_RUN_OUT_RULES,BOTTLE_SHAPE,ARTWORK_CHECK,CONTIGENCY_SITE_LINE,ANTWERP_5300,MS_CHAUFONTAINE_5307,GHENT_5301,DONGEN_5400,CLAMART_5104,DUNKRIK_5100,GRIGNY_5105,GRIGNY_SELF_MANUFACTURING_5116,MARSEILLE_5106,TOULOUSE_5103,JORDBRO_2001,ROBSRUD_2003,MD_MACK,THIRD_PARTY,RELEASE_3RD_PARTY,OLD_SAP_RAW_MATERIAL_NUMBER,DF_CIRCULATION_STARTED,NEW_FULL_CODE,NEW_FULL_CODE_DESC,NEW_SAP_RAW_MATERIAL_DESCRIPTION,SAP_SKU_CODE,DESC,ADDITONAL_PRINT_FEATURES,MS_ANTWERP_5300,CHAUFONTAINE_5307,MS_GHENT_5301,MS_DONGEN_5400,MS_CLAMART_5104,MS_DUNKRIK_5100,MS_GRIGNY_5105,MS_GRIGNY_SELF_MANUFACTURING_5116,MS_MARSEILLE_5106,MS_TOULOUSE_5103,MS_JORDBRO_2001,MS_ROBSRUD_2003,MS_MACK,MS_3RD_PARTY,MS_RELEASE_3RD_PARTY,MATERIAL_LEAD_INPT,PART_CANCELLED,RM_SUP&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		} else if (displaykey === "PCB") {
			var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
			oModel.read(
				"/DF_DB?$filter=HIERARCHY ne 'DF' "+ filter_str + "&$select=PSEUDO_REF_NUM,HIERARCHY,MOD_DATE,MOD_USER,PCB_INITIATOR_NAME,PCB_TO_SCHAWK,REVISION_NUMBER,DF_ID,TITLE,NIM1,BRAND_OWNER_EMAIL,ART_REVIEWER,PRINTER_EMAIL,BAM_INSTRUCTIONS,NIM_INSTRUCTIONS,BAM_REFERENCE,SELLING_COUNTRY,BRAND,FLAVOUR,COMMODITIES,CONTAINER,PACK,THEME_TYPE,DESIGN_MESSAGE,CCE_ARTWORK_NUMBER,OPTIONAL_ADDITIONAL_CODE,ARTWORK_BARCODE,LEAD_MARKET,GRID_REF,SUPPLIER,MATERAL_SUBSTRATE,PRINT_PROCESS,LEAD_ARTWORK_DEVELOPMENT,REQ_PCB_FTP_DATE,PCB_NIM_COMMENTS&$orderby=" +
				sort_col + " " + sort_ord,
				null, null, false, success, failed);

			function success(data) {
				console.log(data.results);
				arrData = data.results;
			}

			function failed() {}
		}
		//var arrData = JSONData; //JSON.parse(JSONData);//typeof JSONData.countries!= 'object' ?JSON.parse(JSONData.countries) : JSONData.countries;
		var CSV = '';
		// Set Report title in first row or line
		CSV += ReportTitle + '\r\n\n';

		if (ShowLabel) {

			var row = "";
			row = row.slice(0, -1);

			CSV += row + '\r\n';

		}

		var headers = [];

		// loop is to extract each row

		if (ReportTitle === "Activity_Tracker") {
			console.log("Here for the Export array2");
			console.log(arrData);
			headers[0] = "Hierarchy";
			headers[1] = "DF Request Number";
			headers[2] = "Title of Project";
			headers[3] = "DF Request Status";
			headers[4] = "NIM";
			headers[5] = "NIM Led or CM Led";
			headers[6] = "DF Initiator Name";
			headers[7] = "DF Initiator Department";
			headers[8] = "Assignment Delay";
			headers[9] = "Project Phase";
			headers[10] = "Comments";
			headers[11] = "Incremental Volume Details";
			headers[12] = "Destination Market";
			headers[13] = "Project Type";
			headers[14] = "Gate1";
			headers[15] = "Project Start Date";
			headers[16] = "Gate 2";
			headers[17] = "DF Received";
			headers[18] = "DF Workflow Circulation Started";
			headers[19] = "Planned Final PSS Completion(+14 Days)";
			headers[20] = "Final PSS Completion";
			headers[21] = "Planned MAPC Approved";
			headers[22] = "Planned MAPX DF Go";
			headers[23] = "DF Feedback sent to Stakeholder";
			headers[24] = "Gate 3";
			headers[25] = "PCB to Schawk Date";
			headers[26] = "Actual PCB FTP Date";
			headers[27] = "BBN/ISSCOM created";
			headers[28] = "PAR Approved(Plan)";
			headers[29] = "PAR Approved(Actual)";
			headers[30] = "TCCC pricing per Part(Letter)";
			headers[31] = "SKU Creation(Start)";
			headers[32] = "SKU Creation(Completed)";
			headers[33] = "MAPX Permission to Produce";
			headers[34] = "Gate4";
			headers[35] = "First estimate Production week to hit required first despatch";
			headers[36] = "Quarantine period for finished product on first production required?";
			headers[37] = "Quarantine period for finished product on ongoing production required?";
			headers[38] = "Date of First/Last Despatches from CCE warehouse";
			headers[39] = "Actual First Despatch";
			headers[40] = "Actual Project Completion Date";
			headers[41] = "Brand";
			headers[42] = "Brand Owner Name";
			headers[43] = "Brand Owner";
			headers[44] = "Number of SKU's";
			headers[45] = "Number of Artworks";
			headers[46] = "Manufacturing Source";
			headers[47] = "FR Category";
			headers[48] = "Modified Date";
			headers[49] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";
				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].DF_ID + '","' + arrData[i].TITLE + '","' + arrData[i].STATUS_NAME + '","' +
					arrData[i].NIM1 + '","' +
					arrData[i].NIM_CM + '","' + arrData[i].INITIATOR + '","' + arrData[i].INITIATOR_DEPT + '","' + arrData[i].ASSIGNMENT_DELAY + '","' +
					arrData[i].PROJECT_PHASE + '","' + arrData[i].COMMENTS + '","' + arrData[i].INCREMENTAL_VOLUME1 + '","' + arrData[i].SELLING_COUNTRY +
					'","' +
					arrData[i].PROJECT_TYPE + '","' + arrData[i].GATE1 + '","' + arrData[i].START_DATE + '","' + arrData[i].GATE2 + '","' +
					arrData[i].DF_RECEIVED + '","' + arrData[i].DF_CIRCULATION_STARTED + '","' + arrData[i].PLANNED_FINAL_PSS_COMPLETION + '","' +
					arrData[i].FINAL_PSS_COMPLETION + '","' +
					arrData[i].MAPC + '","' + arrData[i].MAPX + '","' + arrData[i].FEEDBACK_TO_STAKEHOLDER + '","' + arrData[i].GATE_3 + '","' +
					arrData[i].PCB_TO_SCHAWK + '","' + arrData[i].ACTUAL_PCB_FTP_DATE + '","' + arrData[i].ISSCOM_CREATED + '","' + arrData[i].PAR_APPROVED_PLAN +
					'","' +
					arrData[i].PAR_APPROVED_ACTUAL + '","' + arrData[i].TCCC_PRICING + '","' + arrData[i].SKU_CREATION_START + '","' + arrData[i].SKU_CREATION_COMPLETE +
					'","' +
					arrData[i].MAPX_PERMISSION + '","' + arrData[i].GATE_4 + '","' + arrData[i].EST_PROD_WEEK_INPT + '","' + arrData[i].QUANRANTINE_INPT +
					'","' +
					arrData[i].ONGOING + '","' + arrData[i].FIRST_LAST_DISPATCH_DATE + '","' + arrData[i].ACTUAL_FIRST_DESPATCH + '","' + arrData[i].ACTUAL_COMPLETION_DESPATCH +
					'","' + arrData[i].BRAND + '","' +
					arrData[i].BRANDOWNER_NAME + '","' + arrData[i].BRAND_OWNER + '","' + arrData[i].NUM_SKU + '","' + arrData[i].NUM_ARTWORKS + '","' +
					arrData[i].MFG_SOURCE + '","' + arrData[i].FR_CATEGORY + '","' + arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';
				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "BNL_SKU") {
			headers[0] = "Hierarchy";
			headers[1] = "Tonica Meeting Minutes";
			headers[2] = "Code/Material Status";
			headers[3] = "DF Request Number";
			headers[4] = "NIM";
			headers[5] = "Destination Market";
			headers[6] = "Planned MAPX DF Go";
			headers[7] = "Status Project";
			headers[8] = "Title of Project";
			headers[9] = "Project Type NEBU";
			headers[10] = "Trial Request Needed?";
			headers[11] = "SAP SKU Code";
			headers[12] = "BAP/Basis Code";
			headers[13] = "Other Codes";
			headers[14] = "Product Description";
			headers[15] = "Unknown SKU Description";
			headers[16] = "Brand";
			headers[17] = "Flavour";
			headers[18] = "Producing Site(s)";
			headers[19] = "Producing Country";
			headers[20] = "Input SKU's that are used for the new pallet";
			headers[21] = "First estimate Production week to hit required first despatch";
			headers[22] = "Theme End Date(CCEP Warehouse availability)";
			headers[23] = "Production End Date";
			headers[24] = "Date of First/Last Despatches from CCE warehouse";
			headers[25] = "Last Despatch Week";
			headers[26] = "Comments";
			headers[27] = "ISSCOM code";
			headers[28] = "BBN code";
			headers[29] = "MMI/Concentrate BOM/Pack Size Configuration";
			headers[30] = "Kit Size";
			headers[31] = "Product Density";
			headers[32] = "PSS Number";
			headers[33] = "Shelf-life (in days)";
			headers[34] = "Quarantine period for finished product on first production required?";
			headers[35] = "Quarantine period for finished product on ongoing production required?";
			headers[36] = "Raw Material Indication of run-out rules?";
			headers[37] = "Forecast/ Fixed Quantities";
			headers[38] = "Promotional Mechanic";
			headers[39] = "Please select all Materials which are impacted";
			headers[40] = "SNPPL02";
			headers[41] = "Planner (input SKU)";
			headers[42] = "Repack Description Input SKU";
			headers[43] = "First production Input SKU";
			headers[44] = "Last Production Input SKU";
			headers[45] = "Quantity/Input SKU";
			headers[46] = "Modified Date";
			headers[47] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";
				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].TONICA_MEET_MINS + '","' + arrData[i].CODE_MAT + '","' + arrData[i].DF_ID +
					'","' +
					arrData[i].NIM1 + '","' +
					arrData[i].SELLING_COUNTRY + '","' + arrData[i].MAPX + '","' + arrData[i].STATUS_PROJECT + '","' +
					arrData[i].TITLE + '","' +
					arrData[i].PROJTYPNEBU + '","' + arrData[i].TRIAL_REQ_NEEDED + '","' + arrData[i].SAP_SKU_CODE + '","' +
					arrData[i].BAP_BASIS_CODE + '","' +
					arrData[i].OTH_CODE + '","' + arrData[i].DESC + '","' + arrData[i].UNKNOWN_SKU + '","' +
					arrData[i].BRAND + '","' +
					arrData[i].FLAVOUR + '","' + arrData[i].PROD_SITES + '","' + arrData[i].PROD_COUNTRY + '","' +
					arrData[i].INPUT_SKU_PALLET + '","' +
					arrData[i].EST_PROD_WEEK_INPT + '","' + arrData[i].THEME_END_DATE + '","' + arrData[i].PRODUCTION_END_DATE + '","' +
					arrData[i].FIRST_LAST_DISPATCH_DATE + '","' +
					arrData[i].LAST_DESPATCH_WEEK + '","' + arrData[i].COMMENTS + '","' + arrData[i].ISSCOM_CODE + '","' +
					arrData[i].BBN_CODE + '","' +
					arrData[i].CONCENTRATE_BOM + '","' + arrData[i].KIT_SIZE + '","' + arrData[i].PRODUCT_DENSITY + '","' +
					arrData[i].PSS_REQ_INPT + '","' +
					arrData[i].SHELF + '","' + arrData[i].QUANRANTINE_INPT + '","' + arrData[i].ONGOING + '","' +
					arrData[i].IND_RUN_OUT_RULES + '","' +
					arrData[i].FIXED_QUANTITIES + '","' + arrData[i].PROMOTIONAL_MECHANIC + '","' + arrData[i].MATERIAL_CHANGE + '","' +
					arrData[i].SNPPL02 + '","' + arrData[i].PLANNER + '","' +
					arrData[i].REPACK_DESCRIPTION + '","' + arrData[i].FIRST_PRODUCTION_INPT_SKU + '","' + arrData[i].LAST_PRODUCTION_INPT_SKU + '","' +
					arrData[i].QUANTITIES_SKU + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';
				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "FR_SKU") {
			headers[0] = "Hierarchy";
			headers[1] = "BAP/Basis Code";
			headers[2] = "Basis Per Country";
			headers[3] = "SAP SKU Code";
			headers[4] = "SAP R/3 Variant Code";
			headers[5] = "Variant Code";
			headers[6] = "Variant Description";
			headers[7] = "SAP Country";
			headers[8] = "Producing Site(s)";
			headers[9] = "Producing Country";
			headers[10] = "Contingency Site and Line";
			headers[11] = "MD Antwerp:5300";
			headers[12] = "MD Chaudfontaine: 5307";
			headers[13] = "MD Ghent: 5301";
			headers[14] = "MD Dongen : 5400";
			headers[15] = "MD Clamart: 5104";
			headers[16] = "MD Dunkirk: 5100";
			headers[17] = "MD Grigny: 5105";
			headers[18] = "MD Marseille: 5106";
			headers[19] = "MD Toulouse: 5103";
			headers[20] = "MD 3rd part(Name)";
			headers[21] = "MD Release 3rd party";
			headers[22] = "DF Request Number";
			headers[23] = "Title of Project";
			headers[24] = "NIM";
			headers[25] = "Product Description";
			headers[26] = "Flavour";
			headers[27] = "Product Pack";
			headers[28] = "Container Size";
			headers[29] = "Package Type";
			headers[30] = "Promotion Type";
			headers[31] = "First estimate production week to hit required first despatch";
			headers[32] = "Quarantine period for finished product on first production required?";
			headers[33] = "Quarantine period for finished product on ongoing production required?";
			headers[34] = "Production end date";
			headers[35] = "5100 Dunkirk: Full Container";
			headers[36] = "5100 Dunkirk: Full Container Description";
			headers[37] = "5100 Dunkirk: Printed Film or cluster(if any)";
			headers[38] = "5100 Dunkirk: Printed film or cluster description";
			headers[39] = "5100 Dunkirk: BOM creation or ECM";
			headers[40] = "5103 Toulouse: Full Container";
			headers[41] = "5103 Toulouse: Full Container Description";
			headers[42] = "5103 Toulouse: Printed Film or cluster(if any)";
			headers[43] = "5103 Toulouse: Printed film or cluster description";
			headers[44] = "5103 Toulouse: BOM creation or ECM";
			headers[45] = "5104 Clamart: Full Container";
			headers[46] = "5104 Clamart: Full Container Description";
			headers[47] = "5104 Clamart: Printed Film or cluster(if any)";
			headers[48] = "5104 Clamart: Printed film or cluster description";
			headers[49] = "5104 Clamart: BOM creation or ECM";
			headers[50] = "5105 Grigny: Full Container";
			headers[51] = "5105 Grigny: Full Container Description";
			headers[52] = "5105 Grigny: Printed Film or cluster(if any)";
			headers[53] = "5105 Grigny: Printed film or cluster description";
			headers[54] = "5105 Grigny: BOM creation or ECM";
			headers[55] = "5106 Marseille: Full Container";
			headers[56] = "5106 Marseille: Full Container Description";
			headers[57] = "5106 Marseille: Printed Film or cluster(if any)";
			headers[58] = "5106 Marseille: Printed film or cluster description";
			headers[59] = "5106 Marseille: BOM creation or ECM";
			headers[60] = "5300 Antwerp: Full Container";
			headers[61] = "5300 Antwerp: Full Container Description";
			headers[62] = "5300 Antwerp: Printed Film or cluster(if any)";
			headers[63] = "5300 Antwerp: Printed film or cluster description";
			headers[64] = "5300 Antwerp: BOM creation or ECM";
			headers[65] = "5301 Ghent: Full Container";
			headers[66] = "5301 Ghent: Full Container Description";
			headers[67] = "5301 Ghent: Printed Film or cluster(if any)";
			headers[68] = "5301 Ghent: Printed film or cluster description";
			headers[69] = "5301 Ghent: BOM creation or ECM";
			headers[70] = "5307 Chaudfontaine: Full Container";
			headers[71] = "5307 Chaudfontaine: Full Container Description";
			headers[72] = "5307 Chaudfontaine: Printed Film or cluster(if any)";
			headers[73] = "5307 Chaudfontaine: Printed film or cluster description";
			headers[74] = "5307 Chaudfontaine: BOM creation or ECM";
			headers[75] = "5400 Dongen: Full Container";
			headers[76] = "5400 Dongen: Full Container Description";
			headers[77] = "5400 Dongen: Printed Film or cluster(if any)";
			headers[78] = "5400 Dongen: Printed film or cluster description";
			headers[79] = "5400 Dongen: BOM creation or ECM";
			headers[80] = "PSS Number";
			headers[81] = "MMI/ Concentrate BOM/Pack size configuration";
			headers[82] = "BBN Code";
			headers[83] = "ISSCOM Code";
			headers[84] = "Palletisation specification";
			headers[85] = "Part Cancelled/ Obsolete";
			headers[86] = "Modified Date";
			headers[87] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";
				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].BAP_BASIS_CODE + '","' + arrData[i].BASIS_PER_COUNTRY + '","' + arrData[i].SAP_SKU_CODE +
					'","' +
					arrData[i].SAP_R3_CODE + '","' +
					arrData[i].VARIANT_CD + '","' + arrData[i].VARIANT_DESCRPTN + '","' + arrData[i].COUNTRY + '","' +
					arrData[i].PROD_SITES + '","' +
					arrData[i].PROD_COUNTRY + '","' + arrData[i].CONTIGENCY_SITE_LINE + '","' + arrData[i].ANTWERP_5300 + '","' +
					arrData[i].MS_CHAUFONTAINE_5307 + '","' +
					arrData[i].GHENT_5301 + '","' + arrData[i].DONGEN_5400 + '","' + arrData[i].CLAMART_5104 + '","' +
					arrData[i].DUNKRIK_5100 + '","' +
					arrData[i].GRIGNY_5105 + '","' + arrData[i].MARSEILLE_5106 + '","' + arrData[i].TOULOUSE_5103 + '","' +
					arrData[i].THIRD_PARTY + '","' +
					arrData[i].RELEASE_3RD_PARTY + '","' + arrData[i].DF_ID + '","' + arrData[i].TITLE + '","' +
					arrData[i].NIM1 + '","' +
					arrData[i].DESC + '","' + arrData[i].FLAVOUR + '","' + arrData[i].PACK + '","' +
					arrData[i].CONTAINER + '","' +
					arrData[i].PACKAGE + '","' + arrData[i].THEME_TYPE + '","' + arrData[i].EST_PROD_WEEK_INPT + '","' +
					arrData[i].QUANRANTINE_INPT + '","' +
					arrData[i].ONGOING + '","' + arrData[i].PRODUCTION_END_DATE + '","' + arrData[i].DUNKIRK_FULL_CONTAINER + '","' +
					arrData[i].DUNKIRK_FULL_CONTAINER_DESC + '","' +
					arrData[i].DUNKIRK_PRINTED_FILM + '","' + arrData[i].DUNKIRK_PRINTED_FILM_DESC + '","' + arrData[i].DUNKIRK_BOM_ECM + '","' +
					arrData[i].TOULOUSE_FULL_CONTAINER + '","' + arrData[i].TOULOUSE_FULL_CONTAINER_DESC + '","' +
					arrData[i].TOULOUSE_PRINTED_FILM + '","' + arrData[i].TOULOUSE_PRINTED_FILM_DESC + '","' + arrData[i].TOULOUSE_BOM_ECM + '","' +
					arrData[i].CLAMART_FULL_CONTAINER + '","' +
					arrData[i].CLAMART_FULL_CONTAINER_DESC + '","' + arrData[i].CLAMART_PRINTED_FILM + '","' + arrData[i].CLAMART_PRINTED_FILM_DESC +
					'","' +
					arrData[i].CLAMART_BOM_ECM + '","' + arrData[i].GRIGNY_FULL_CONTAINER + '","' + arrData[i].GRIGNY_FULL_CONTAINER_DESC +
					'","' +
					arrData[i].GRIGNY_PRINTED_FILM + '","' +
					arrData[i].GRIGNY_PRINTED_FILM_DESC + '","' + arrData[i].GRIGNY_BOM_ECM + '","' + arrData[i].MARSEILLE_FULL_CONTAINER + '","' +
					arrData[i].MARSEILLE_FULL_CONTAINER_DESC + '","' +
					arrData[i].MARSEILLE_PRINTED_FILM + '","' + arrData[i].MARSEILLE_PRINTED_FILM_DESC + '","' + arrData[i].MARSEILLE_BOM_ECM + '","' +
					arrData[i].MS_CHAUFONTAINE_5307 + '","' +
					arrData[i].ANTWERP_FULL_CONTAINER + '","' + arrData[i].ANTWERP_FULL_CONTAINER_DESC + '","' + arrData[i].ANTWERP_PRINTED_FILM + '","' +
					arrData[i].ANTWERP_PRINTED_FILM_DESC + '","' +
					arrData[i].ANTWERP_BOM_ECM + '","' + arrData[i].GHENT_FULL_CONTAINER + '","' + arrData[i].GHENT_FULL_CONTAINER_DESC + '","' +
					arrData[i].GHENT_PRINTED_FILM_DESC + '","' +
					arrData[i].GHENT_PRINTED_FILM + '","' + arrData[i].GHENT_BOM_ECM + '","' + arrData[i].CHAUDFONTAINE_FULL_CONTAINER + '","' +
					arrData[i].CHAUDFONTAINE_FULL_CONTAINER_DESC + '","' +
					arrData[i].CHAUDFONTAINE_PRINTED_FILM + '","' + arrData[i].CHAUDFONTAINE_PRINTED_FILM_DESC + '","' + arrData[i].CHAUDFONTAINE_BOM_ECM +
					'","' +
					arrData[i].DONGEN_FULL_CONTAINER + '","' +
					arrData[i].DONGEN_FULL_CONTAINER_DESC + '","' + arrData[i].DONGEN_PRINTED_FILM + '","' + arrData[i].DONGEN_PRINTED_FILM_DESC + '","' +
					arrData[i].DONGEN_BOM_ECM + '","' +
					arrData[i].PSS_REQ_INPT + '","' + arrData[i].CONCENTRATE_BOM + '","' + arrData[i].BBN_CODE + '","' +
					arrData[i].ISSCOM_CODE + '","' +
					arrData[i].PALLET_SPECIFIC + '","' + arrData[i].PART_CANCELLED + '","' + arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';
				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "FR_RM") {
			headers[0] = "Hierarchy";
			headers[1] = "DF Request Number";
			headers[2] = "Title of Project";
			headers[3] = "NIM";
			headers[4] = "Destination Market";
			headers[5] = "Brand";
			headers[6] = "Flavour";
			headers[7] = "Commodities";
			headers[8] = "Container Size";
			headers[9] = "Product Pack";
			headers[10] = "Promotion Type";
			headers[11] = "Design Message";
			headers[12] = "Generate New Artwork Number";
			headers[13] = "CCEP Artwork Number";
			headers[14] = "Optional Additional Code Material";
			headers[15] = "Artwork Barcode(EAN/ITF)";
			headers[16] = "Lead Market";
			headers[17] = "Grid Reference";
			headers[18] = "Supplier";
			headers[19] = "Material Substrate";
			headers[20] = "Print Process";
			headers[21] = "Lead of Artwork Development";
			headers[22] = "PCB to Schawk Date";
			headers[23] = "Required PCB FTP Date";
			headers[24] = "Revised PCB FTP Date";
			headers[25] = "Actual PCB FTP Date";
			headers[26] = "Schawk Artwok Status";
			headers[27] = "First possible Bottling Production Date";
			headers[28] = "Indication last bottling production date";
			headers[29] = "Raw Material Indication of run-out rules";
			headers[30] = "Bottle Shape";
			headers[31] = "Artwork Check Occurence";
			headers[32] = "Contingency Site and Line";
			headers[33] = "MD Antwerp:5300";
			headers[34] = "MD Chaudfontaine: 5307";
			headers[35] = "MD Ghent: 5301";
			headers[36] = "MD Dongen : 5400";
			headers[37] = "MD Clamart: 5104";
			headers[38] = "MD Dunkirk: 5100";
			headers[39] = "MD Grigny: 5105";
			headers[40] = "MD Grigny: Self-Manufacturing 5116";
			headers[41] = "MD Marseille: 5106";
			headers[42] = "MD Toulouse: 5103";
			headers[43] = "MD Jordbro: 2001";
			headers[44] = "MD Robsrud: 2003";
			headers[45] = "MD Mack";
			headers[46] = "MD 3rd part(Name)";
			headers[47] = "MD Release 3rd party";
			headers[48] = "Old SAP Raw Material Number";
			headers[49] = "Old SAP Raw Material Description";
			headers[50] = "New SAP Raw Material Number";
			headers[51] = "New Full Code";
			headers[52] = "New Full Code Description";
			headers[53] = "New SAP Raw Material Description";
			headers[54] = "SAP SKU Code";
			headers[55] = "Product Description";
			headers[56] = "Number of Color Layers";
			headers[57] = "Additional Printing Features";
			headers[58] = "MS Antwerp:5300";
			headers[59] = "MS Chaudfontaine: 5307";
			headers[60] = "MS Ghent: 5301";
			headers[61] = "MS Dongen : 5400";
			headers[62] = "MS Clamart: 5104";
			headers[63] = "MS Dunkirk: 5100";
			headers[64] = "MS Grigny: 5105";
			headers[65] = "MS Grigny: Self-Manufacturing 5116";
			headers[66] = "MS Marseille: 5106";
			headers[67] = "MS Toulouse: 5103";
			headers[68] = "MS Jordbro: 2001";
			headers[69] = "MS Robsrud: 2003";
			headers[70] = "MS Mack";
			headers[71] = "MS 3rd party (Name)";
			headers[72] = "MS Release 3rd party";
			headers[73] = "Material Supply General Comments";
			headers[74] = "MS NOK";
			headers[75] = "Part Cancelled/Obsolete";
			headers[76] = "RM Suppressed";
			headers[77] = "Cliche/Plate Cost";
			headers[78] = "PO Number";
			headers[79] = "Modified Date";
			headers[80] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].DF_ID + '","' + arrData[i].TITLE + '","' + arrData[i].NIM1 +
					'","' +
					arrData[i].SELLING_COUNTRY + '","' +
					arrData[i].BRAND + '","' + arrData[i].FLAVOUR + '","' + arrData[i].COMMODITIES + '","' +
					arrData[i].CONTAINER + '","' +
					arrData[i].PACK + '","' + arrData[i].THEME_TYPE + '","' + arrData[i].DESIGN_MESSAGE + '","' +
					arrData[i].NEWART + '","' +
					arrData[i].CCE_ARTWORK_NUMBER + '","' + arrData[i].OPTIONAL_ADDITIONAL_CODE + '","' + arrData[i].ARTWORK_BARCODE + '","' +
					arrData[i].LEAD_MARKET + '","' +
					arrData[i].GRID_REF + '","' + arrData[i].SUPPLIER + '","' + arrData[i].MATERAL_SUBSTRATE + '","' +
					arrData[i].PRINT_PROCESS + '","' +
					arrData[i].LEAD_ARTWORK_DEVELOPMENT + '","' + arrData[i].PCB_TO_SCHAWK + '","' + arrData[i].REQ_PCB_FTP_DATE + '","' +
					arrData[i].PCB_FTP_DATE + '","' +
					arrData[i].ACTUAL_PCB_FTP_DATE + '","' + arrData[i].SCHAWK_ARTWORK_STATUS + '","' + arrData[i].BOTTLING_FIRST + '","' +
					arrData[i].BOTTLING_LAST + '","' +
					arrData[i].IND_RUN_OUT_RULES + '","' + arrData[i].BOTTLE_SHAPE + '","' +
					arrData[i].ARTWORK_CHECK + '","' +
					arrData[i].CONTIGENCY_SITE_LINE + '","' + arrData[i].ANTWERP_5300 + '","' + arrData[i].MS_CHAUFONTAINE_5307 + '","' +
					arrData[i].GHENT_5301 + '","' +
					arrData[i].DONGEN_5400 + '","' + arrData[i].CLAMART_5104 + '","' + arrData[i].DUNKRIK_5100 + '","' +
					arrData[i].GRIGNY_5105 + '","' + arrData[i].GRIGNY_SELF_MANUFACTURING_5116 + '","' +
					arrData[i].MARSEILLE_5106 + '","' + arrData[i].TOULOUSE_5103 + '","' + arrData[i].JORDBRO_2001 + '","' +
					arrData[i].ROBSRUD_2003 + '","' +
					arrData[i].MD_MACK + '","' + arrData[i].THIRD_PARTY + '","' + arrData[i].RELEASE_3RD_PARTY + '","' +
					arrData[i].OLD_SAP_RAW_MATERIAL_NUMBER + '","' + arrData[i].RAW_MAT_DESC + '","' + arrData[i].UNIT5 +
					'","' +
					arrData[i].NEW_FULL_CODE + '","' +
					arrData[i].NEW_FULL_CODE_DESC + '","' + arrData[i].NEW_SAP_RAW_MATERIAL_DESCRIPTION + '","' + arrData[i].SAP_SKU_CODE + '","' +
					arrData[i].DESC + '","' +
					arrData[i].NUMBER_COLOR_LAYERS + '","' + arrData[i].ADDITONAL_PRINT_FEATURES + '","' + arrData[i].MS_ANTWERP_5300 + '","' +
					arrData[i].CHAUFONTAINE_5307 + '","' +
					arrData[i].MS_GHENT_5301 + '","' + arrData[i].MS_DONGEN_5400 + '","' + arrData[i].MS_CLAMART_5104 + '","' +
					arrData[i].MS_DUNKRIK_5100 + '","' +
					arrData[i].MS_GRIGNY_5105 + '","' + arrData[i].MS_GRIGNY_SELF_MANUFACTURING_5116 + '","' + arrData[i].MS_MARSEILLE_5106 + '","' +
					arrData[i].MS_TOULOUSE_5103 + '","' +
					arrData[i].MS_JORDBRO_2001 + '","' + arrData[i].MS_ROBSRUD_2003 + '","' + arrData[i].MS_MACK + '","' +
					arrData[i].MS_3RD_PARTY + '","' +
					arrData[i].MS_RELEASE_3RD_PARTY + '","' + arrData[i].MATERIAL_LEAD_INPT + '","' + arrData[i].MS_NOK + '","' +
					arrData[i].PART_CANCELLED + '","' +
					arrData[i].RM_SUP + '","' + arrData[i].CLICHE_PLATE_COSTS + '","' + arrData[i].PO_NUMBER + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';
				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "GB_SKU") {
			headers[0] = "Hierarchy";
			headers[1] = "Code/Material Status";
			headers[2] = "DF Request Number";
			headers[3] = "Title of Project";
			headers[4] = "NIM";
			headers[5] = "Planned MAPX DF Go";
			headers[6] = "Project Phase";
			headers[7] = "DF Request Status";
			headers[8] = "Promotion Type";
			headers[9] = "Destination Market";
			headers[10] = "First estimate Production week to hit required first despatch";
			headers[11] = "Production End Date";
			headers[12] = "Brand";
			headers[13] = "Flavour";
			headers[14] = "BBN Code";
			headers[15] = "Shelf-life (in days)";
			headers[16] = "EAN (EA)";
			headers[17] = "EAN PAC(ZCU)";
			headers[18] = "ITF Case(CS)";
			headers[19] = "Markem";
			headers[20] = "Sweetener Data";
			headers[21] = "Repacking Required";
			headers[22] = "If Repack: input SAP code and % Split";
			headers[23] = "Base SAP/APO Code";
			headers[24] = "SAP SKU Code";
			headers[25] = "BAP/ Basis Code";
			headers[26] = "On-going quarantine required?";
			headers[27] = "Product Description";
			headers[28] = "BOM Notification form(BNF) Required by";
			headers[29] = "BOM Notification form(BNF) Date Issued";
			headers[30] = "Master Data Project manager";
			headers[31] = "MMD Code Extended Plan Date";
			headers[32] = "MMD Code Extended Actual date";
			headers[33] = "T-Lanes and Forecast Split Planned Date";
			headers[34] = "T-Lanes and Forecast Split Completed Date";
			headers[35] = "Product database Planned Date";
			headers[36] = "Product Database Updated Date";
			headers[37] = "SAP SKU Code Ready for Planning(Required) Date";
			headers[38] = "SAP SKU Code Ready for Planning(Planned) Date";
			headers[39] = "SAP SKU Code Ready for Planning(Actual) Date";
			headers[40] = "Sales or WIP";
			headers[41] = "Item flag for traders report";
			headers[42] = "Product Pack";
			headers[43] = "Container Size";
			headers[44] = "Package Type";
			headers[45] = "CPP(Raw Cases) per full pallet";
			headers[46] = "CPP(Unit Cases) per full pallet";
			headers[47] = "Producing Site(s)";
			headers[48] = "Producing Country";
			headers[49] = "Contingency Site and Line";
			headers[50] = "Sidcup: 5501 SD1";
			headers[51] = "Sidcup: 5501 SD2";
			headers[52] = "Sidcup: 5501 SD3";
			headers[53] = "Sidcup: 5501 SD4";
			headers[54] = "Sidcup: 5501 SD5";
			headers[55] = "Sidcup: 5501 SD6";
			headers[56] = "Sidcup: 5501 SD7";
			headers[57] = "Sidcup: 5501 SD8";
			headers[58] = "Edmonton: 5506 ED1";
			headers[59] = "Edmonton: 5506 ED2";
			headers[60] = "Edmonton: 5506 ED3";
			headers[61] = "Edmonton: 5506 ED4";
			headers[62] = "Edmonton: 5506 ED5";
			headers[63] = "Edmonton: 5506 ED6";
			headers[64] = "Milton Keynes: 5504 MK1";
			headers[65] = "Milton Keynes: 5504 MK2";
			headers[66] = "Milton Keynes: 5504 MK3";
			headers[67] = "Milton Keynes: 5504 MK4";
			headers[68] = "Milton Keynes: 5504 MK5";
			headers[69] = "Milton Keynes: 5504 MK6&7";
			headers[70] = "Milton Keynes: 5504 MK8&9";
			headers[71] = "Wakefield: 5502 WK1";
			headers[72] = "Wakefield: 5502 WK2";
			headers[73] = "Wakefield: 5502 WK3";
			headers[74] = "Wakefield: 5502 WK4";
			headers[75] = "Wakefield: 5502 WK5";
			headers[76] = "Wakefield: 5502 WK6";
			headers[77] = "Wakefield: 5502 WK7";
			headers[78] = "Wakefield: 5502 WK8";
			headers[79] = "Wakefield: 5502 WK9";
			headers[80] = "Wakefield: 5502 WK11";
			headers[81] = "Wakefield: 5502 WK17";
			headers[82] = "East Kilbride:5503 EK1";
			headers[83] = "East Kilbride:5503 EK2";
			headers[84] = "East Kilbride:5503 EK3";
			headers[85] = "East Kilbride:5503 EK4";
			headers[86] = "East Kilbride:5503 EK5";
			headers[87] = "East Kilbride:5503 EK6";
			headers[88] = "East Kilbride:5503 EK7";
			headers[89] = "East Kilbride:5503 EK11";
			headers[90] = "Morpeth: 5546 AW1";
			headers[91] = "Morpeth: 5546 AW2";
			headers[92] = "Morpeth: 5546 AW3";
			headers[93] = "Morpeth: 5546 AW4";
			headers[94] = "3rd party (Name) & PSS Number";
			headers[95] = "Modified Date";
			headers[96] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].CODE_MAT + '","' + arrData[i].DF_ID + '","' + arrData[i].TITLE + '","' +
					arrData[i].NIM1 +
					'","' +
					arrData[i].MAPX + '","' +
					arrData[i].PROJECT_PHASE + '","' + arrData[i].STATUS_NAME + '","' + arrData[i].THEME_TYPE + '","' +
					arrData[i].SELLING_COUNTRY + '","' +
					arrData[i].EST_PROD_WEEK_INPT + '","' + arrData[i].PRODUCTION_END_DATE + '","' + arrData[i].BRAND + '","' +
					arrData[i].FLAVOUR + '","' +
					arrData[i].BBN_CODE + '","' + arrData[i].SHELF + '","' + arrData[i].EAN + '","' +
					arrData[i].ZCU + '","' +
					arrData[i].CS + '","' + arrData[i].MARKEM + '","' + arrData[i].SWEETNER_DATA + '","' +
					arrData[i].REPACKING + '","' +
					arrData[i].BASE_INPUT + '","' + arrData[i].BASE_SAP_APO_CODE + '","' + arrData[i].SAP_SKU_CODE + '","' +
					arrData[i].BAP_BASIS_CODE + '","' +
					arrData[i].QUARANTINE_BAP_CODE + '","' + arrData[i].DESC + '","' + arrData[i].BNF_NEEDBY_DATE + '","' +
					arrData[i].BNF_ACTUAL_DATE + '","' +
					arrData[i].MANAGER + '","' + arrData[i].MMD_CODE_EXTENDED_PLANNED_DATE + '","' +
					arrData[i].MMD_CODE_EXTENDED_ACTUAL_DATE + '","' +
					arrData[i].T_LANES_FORCAST_PLANNED_DATE + '","' + arrData[i].T_LANES_FORCAST_COMPLETED_DATE + '","' + arrData[i].PRODUCT_DATABASE_PLANNED_DATE +
					'","' +
					arrData[i].DB_UPDATED_DATE + '","' +
					arrData[i].SAP_SKU_PLANNING_REQ_DATE + '","' + arrData[i].SAP_SKU_PLANNING_PLANNED_DATE + '","' + arrData[i].SAP_SKU_PLANNING_ACTUAL_DATE +
					'","' +
					arrData[i].SALE_OR_QUARANTINE + '","' + arrData[i].ITEM_FLAG_TRADERS_REPORT + '","' +
					arrData[i].PACK + '","' + arrData[i].CONTAINER + '","' + arrData[i].PACKAGE + '","' +
					arrData[i].CPP_RAW + '","' +
					arrData[i].CPP_UNIT + '","' + arrData[i].PROD_SITES + '","' + arrData[i].PROD_COUNTRY + '","' +
					arrData[i].CONTIGENCY_SITE_LINE + '","' + arrData[i].SIDCUP_5501_SD1 + '","' + arrData[i].SIDCUP_5501_SD2 +
					'","' +
					arrData[i].SIDCUP_5501_SD3 + '","' +
					arrData[i].SIDCUP_5501_SD4 + '","' + arrData[i].SIDCUP_5501_SD5 + '","' + arrData[i].SIDCUP_5501_SD6 + '","' +
					arrData[i].SIDCUP_5501_SD7 + '","' +
					arrData[i].SIDCUP_5501_SD8 + '","' + arrData[i].EDMONTON_5506_ED1 + '","' + arrData[i].EDMONTON_5506_ED2 + '","' +
					arrData[i].EDMONTON_5506_ED3 + '","' +
					arrData[i].EDMONTON_5506_ED4 + '","' + arrData[i].EDMONTON_5506_ED5 + '","' + arrData[i].EDMONTON_5506_ED6 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK1 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK2 + '","' + arrData[i].MILTON_KEYNES_5504_MK3 + '","' + arrData[i].MILTON_KEYNES_5504_MK4 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK5 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK67 + '","' + arrData[i].MILTON_KEYNES_5504_MK89 + '","' + arrData[i].WAKEFIELD_5502_WK1 + '","' +
					arrData[i].WAKEFIELD_5502_WK2 + '","' +
					arrData[i].WAKEFIELD_5502_WK3 + '","' + arrData[i].WAKEFIELD_5502_WK4 + '","' + arrData[i].WAKEFIELD_5502_WK5 + '","' +
					arrData[i].WAKEFIELD_5502_WK6 + '","' +
					arrData[i].WAKEFIELD_5502_WK7 + '","' + arrData[i].WAKEFIELD_5502_WK8 + '","' + arrData[i].WAKEFIELD_5502_WK9 + '","' +
					arrData[i].WAKEFIELD_5502_WK11 + '","' +
					arrData[i].WAKEFIELD_5502_WK17 + '","' + arrData[i].EAST_KILBRIDE_5503_EK1 + '","' + arrData[i].EAST_KILBRIDE_5503_EK2 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK3 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK4 + '","' + arrData[i].EAST_KILBRIDE_5503_EK5 + '","' + arrData[i].EAST_KILBRIDE_5503_EK6 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK7 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK11 + '","' + arrData[i].MORPETH_5546_AW1 + '","' + arrData[i].MORPETH_5546_AW2 + '","' +
					arrData[i].MORPETH_5546_AW3 + '","' +
					arrData[i].MORPETH_5546_AW4 + '","' + arrData[i].THIRD_PARTY_NAME_PSS + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';

				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "GB_RM") {
			headers[0] = "Hierarchy";
			headers[1] = "Code/Material Status";
			headers[2] = "DF Request Number";
			headers[3] = "Project Category";
			headers[4] = "Title of Project";
			headers[5] = "NIM";
			headers[6] = "Project Phase";
			headers[7] = "DF Request Status";
			headers[8] = "Planned MAPX DF Go";
			headers[9] = "Destination Market";
			headers[10] = "Brand";
			headers[11] = "Flavour";
			headers[12] = "Commodities";
			headers[13] = "Container Size";
			headers[14] = "Product Pack";
			headers[15] = "Promotion Type";
			headers[16] = "Design Message";
			headers[17] = "Generate New Artwork Number";
			headers[18] = "CCEP Artwork Number";
			headers[19] = "Optional Additional Code Material";
			headers[20] = "Artwork Barcode (EAN/ITF)";
			headers[21] = "Lead Market";
			headers[22] = "Grid Reference";
			headers[23] = "Supplier";
			headers[24] = "Material Substrate";
			headers[25] = "Print Process";
			headers[26] = "Lead of Artwork Development";
			headers[27] = "PCB to Schawk Date";
			headers[28] = "Required PCB FTP Date";
			headers[29] = "Revised PCB FTP Date";
			headers[30] = "Actual PCB FTP Date";
			headers[31] = "Number of Color Layers";
			headers[32] = "Additional Printing Features";
			headers[33] = "New SAP Raw Material Description";
			headers[34] = "CINCOM Old Part Number";
			headers[35] = "Old SAP Raw Material Number";
			headers[36] = "Old SAP Raw Material Description";
			headers[37] = "CINCOM New Part Number";
			headers[38] = "New SAP Raw Material Number";
			headers[39] = "New Full Code";
			headers[40] = "New Full Code Description";
			headers[41] = "Part Cancelled/Obsolete";
			headers[42] = "RM Suppressed";
			headers[43] = "Child Material refrence";
			headers[44] = "Brand or Color (eg. Closure color)";
			headers[45] = "CINCOM Contracts Updated date";
			headers[46] = "SAP Contracts Updated Date";
			headers[47] = "BAP/ SKU Change";
			headers[48] = "Type of Change";
			headers[49] = "SAP SKU Code";
			headers[50] = "BAP/ Basis Code";
			headers[51] = "First estomate Production week to hit required first despatch";
			headers[52] = "Sidcup: 5501 SD1";
			headers[53] = "Sidcup: 5501 SD2";
			headers[54] = "Sidcup: 5501 SD3";
			headers[55] = "Sidcup: 5501 SD4";
			headers[56] = "Sidcup: 5501 SD5";
			headers[57] = "Sidcup: 5501 SD6";
			headers[58] = "Sidcup: 5501 SD7";
			headers[59] = "Sidcup: 5501 SD8";
			headers[60] = "Edmonton: 5506 ED1";
			headers[61] = "Edmonton: 5506 ED2";
			headers[62] = "Edmonton: 5506 ED3";
			headers[63] = "Edmonton: 5506 ED4";
			headers[64] = "Edmonton: 5506 ED5";
			headers[65] = "Edmonton: 5506 ED6";
			headers[66] = "Milton Keynes: 5504 MK1";
			headers[67] = "Milton Keynes: 5504 MK2";
			headers[68] = "Milton Keynes: 5504 MK3";
			headers[69] = "Milton Keynes: 5504 MK4";
			headers[70] = "Milton Keynes: 5504 MK5";
			headers[71] = "Milton Keynes: 5504 MK6&7";
			headers[72] = "Milton Keynes: 5504 MK8&9";
			headers[73] = "Wakefield: 5502 WK1";
			headers[74] = "Wakefield: 5502 WK2";
			headers[75] = "Wakefield: 5502 WK3";
			headers[76] = "Wakefield: 5502 WK4";
			headers[77] = "Wakefield: 5502 WK5";
			headers[78] = "Wakefield: 5502 WK6";
			headers[79] = "Wakefield: 5502 WK7";
			headers[80] = "Wakefield: 5502 WK8";
			headers[81] = "Wakefield: 5502 WK9";
			headers[82] = "Wakefield: 5502 WK11";
			headers[83] = "Wakefield: 5502 WK17";
			headers[84] = "East Kilbride:5503 EK1";
			headers[85] = "East Kilbride:5503 EK2";
			headers[86] = "East Kilbride:5503 EK3";
			headers[87] = "East Kilbride:5503 EK4";
			headers[88] = "East Kilbride:5503 EK5";
			headers[89] = "East Kilbride:5503 EK6";
			headers[90] = "East Kilbride:5503 EK7";
			headers[91] = "East Kilbride:5503 EK11";
			headers[92] = "Morpeth: 5546 AW1";
			headers[93] = "Morpeth: 5546 AW2";
			headers[94] = "Morpeth: 5546 AW3";
			headers[95] = "Morpeth: 5546 AW4";
			headers[96] = "3rd party (Name) & PSS Number";
			headers[97] = "Modified Date";
			headers[98] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].CODE_MAT + '","' + arrData[i].DF_ID + '","' + arrData[i].PROJECT_CATEGORY +
					'","' +
					arrData[i].TITLE + '","' + arrData[i].NIM1 +
					'","' +
					arrData[i].PROJECT_PHASE + '","' + arrData[i].STATUS_NAME + '","' + arrData[i].MAPX + '","' +
					arrData[i].SELLING_COUNTRY + '","' + arrData[i].BRAND + '","' +
					arrData[i].FLAVOUR + '","' +
					arrData[i].COMMODITIES + '","' + arrData[i].CONTAINER + '","' + arrData[i].PACK + '","' +
					arrData[i].THEME_TYPE + '","' +
					arrData[i].DESIGN_MESSAGE + '","' + arrData[i].NEWART + '","' + arrData[i].CCE_ARTWORK_NUMBER + '","' +
					arrData[i].OPTIONAL_ADDITIONAL_CODE + '","' +
					arrData[i].ARTWORK_BARCODE + '","' + arrData[i].LEAD_MARKET + '","' + arrData[i].GRID_REF + '","' +
					arrData[i].SUPPLIER + '","' +
					arrData[i].MATERAL_SUBSTRATE + '","' + arrData[i].PRINT_PROCESS + '","' + arrData[i].LEAD_ARTWORK_DEVELOPMENT + '","' +
					arrData[i].PCB_TO_SCHAWK + '","' +
					arrData[i].REQ_PCB_FTP_DATE + '","' + arrData[i].PCB_FTP_DATE + '","' +
					arrData[i].ACTUAL_PCB_FTP_DATE + '","' +
					arrData[i].NUMBER_COLOR_LAYERS + '","' + arrData[i].ADDITONAL_PRINT_FEATURES + '","' + arrData[i].NEW_SAP_RAW_MATERIAL_DESCRIPTION +
					'","' +
					arrData[i].CINCOM_OLD_PART_NUMBER + '","' +
					arrData[i].OLD_SAP_RAW_MATERIAL_NUMBER + '","' + arrData[i].RAW_MAT_DESC + '","' + arrData[i].CINCOM_NEW_PART_NUMBER + '","' +
					arrData[i].UNIT5 + '","' + arrData[i].NEW_FULL_CODE + '","' +
					arrData[i].NEW_FULL_CODE_DESC + '","' + arrData[i].PART_CANCELLED + '","' + arrData[i].RM_SUP + '","' +
					arrData[i].CHLD_REF + '","' +
					arrData[i].BRAND_COLOR + '","' + arrData[i].CINCOM_CONTRACTS + '","' + arrData[i].SAP_CONTRACTS_UPDATED_DATE + '","' +
					arrData[i].BAP_SKU_CHANGE + '","' + arrData[i].TYPE_OF_CHANGE + '","' + arrData[i].SAP_SKU_CODE + '","' + arrData[i].BAP_BASIS_CODE +
					'","' +
					arrData[i].EST_PROD_WEEK_INPT + '","' +
					arrData[i].SIDCUP_5501_SD1 + '","' + arrData[i].SIDCUP_5501_SD2 +
					'","' +
					arrData[i].SIDCUP_5501_SD3 + '","' +
					arrData[i].SIDCUP_5501_SD4 + '","' + arrData[i].SIDCUP_5501_SD5 + '","' + arrData[i].SIDCUP_5501_SD6 + '","' +
					arrData[i].SIDCUP_5501_SD7 + '","' +
					arrData[i].SIDCUP_5501_SD8 + '","' + arrData[i].EDMONTON_5506_ED1 + '","' + arrData[i].EDMONTON_5506_ED2 + '","' +
					arrData[i].EDMONTON_5506_ED3 + '","' +
					arrData[i].EDMONTON_5506_ED4 + '","' + arrData[i].EDMONTON_5506_ED5 + '","' + arrData[i].EDMONTON_5506_ED6 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK1 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK2 + '","' + arrData[i].MILTON_KEYNES_5504_MK3 + '","' + arrData[i].MILTON_KEYNES_5504_MK4 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK5 + '","' +
					arrData[i].MILTON_KEYNES_5504_MK67 + '","' + arrData[i].MILTON_KEYNES_5504_MK89 + '","' + arrData[i].WAKEFIELD_5502_WK1 + '","' +
					arrData[i].WAKEFIELD_5502_WK2 + '","' +
					arrData[i].WAKEFIELD_5502_WK3 + '","' + arrData[i].WAKEFIELD_5502_WK4 + '","' + arrData[i].WAKEFIELD_5502_WK5 + '","' +
					arrData[i].WAKEFIELD_5502_WK6 + '","' +
					arrData[i].WAKEFIELD_5502_WK7 + '","' + arrData[i].WAKEFIELD_5502_WK8 + '","' + arrData[i].WAKEFIELD_5502_WK9 + '","' +
					arrData[i].WAKEFIELD_5502_WK11 + '","' +
					arrData[i].WAKEFIELD_5502_WK17 + '","' + arrData[i].EAST_KILBRIDE_5503_EK1 + '","' + arrData[i].EAST_KILBRIDE_5503_EK2 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK3 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK4 + '","' + arrData[i].EAST_KILBRIDE_5503_EK5 + '","' + arrData[i].EAST_KILBRIDE_5503_EK6 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK7 + '","' +
					arrData[i].EAST_KILBRIDE_5503_EK11 + '","' + arrData[i].MORPETH_5546_AW1 + '","' + arrData[i].MORPETH_5546_AW2 + '","' +
					arrData[i].MORPETH_5546_AW3 + '","' +
					arrData[i].MORPETH_5546_AW4 + '","' + arrData[i].THIRD_PARTY_NAME_PSS + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';

				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "MAPX") {
			headers[0] = "Hierarchy";
			headers[1] = "DF Request Number";
			headers[2] = "Title of Project";
			headers[3] = "Project Group";
			headers[4] = "DF Request Status";
			headers[5] = "Gate 1";
			headers[6] = "Gate 2";
			headers[7] = "Gate 3";
			headers[8] = "Gate 4";
			headers[9] = "NIM";
			headers[10] = "NIM led or CM led";
			headers[11] = "Project Description";
			headers[12] = "MAPX Decision Required";
			headers[13] = "MAPX Pre Read/Agenda";
			headers[14] = "SAP SKU Code";
			headers[15] = "BAP/ Basis Code";
			headers[16] = "Product Description";
			headers[17] = "Old SAP raw Material Number";
			headers[18] = "Old SAP Raw Material Description";
			headers[19] = "Commodities";
			headers[20] = "Producing Site(s)";
			headers[21] = "Same as current (from the volumes)";
			headers[22] = "P1";
			headers[23] = "P2";
			headers[24] = "P3";
			headers[25] = "P4";
			headers[26] = "P5";
			headers[27] = "P6";
			headers[28] = "P7";
			headers[29] = "P8";
			headers[30] = "P9";
			headers[31] = "P10";
			headers[32] = "P11";
			headers[33] = "P12";
			headers[34] = "Total";
			headers[35] = "SKU Creation(Completed)";
			headers[36] = "BAM Design to Schawk";
			headers[37] = "Date of Forecast Required";
			headers[38] = "Forecast Date";
			headers[39] = "First estimate Production week to hit required first despatch";
			headers[40] = "Quarantine period for finished product on first production required?";
			headers[41] = "Date of First/Last despatches from CCE Warehouse";
			headers[42] = "Shelf-life (in days)";
			headers[43] = "Container size";
			headers[44] = "Antwerp: Minimum Production Run";
			headers[45] = "Chaudfontaine: Minimum Production Run";
			headers[46] = "Gent: Minimum Production Run";
			headers[47] = "Clamart: Minimum Production Run";
			headers[48] = "Dunkirk: Minimum Production Run";
			headers[49] = "Grigny: Minimum Production Run";
			headers[50] = "Marseille: Minimum Production Run";
			headers[51] = "Toulouse: Minimum Production Run";
			headers[52] = "East Kilbride: Minimum Production Run";
			headers[53] = "Edmonton: Minimum Production Run";
			headers[54] = "Milton Keynes: Minimum Production Run";
			headers[55] = "Morpeth: Minimum Production Run";
			headers[56] = "Sidcup: Minimum Production Run";
			headers[57] = "Wakefield: Minimum Production Run";
			headers[58] = "Dongen: Minimum Production Run";
			headers[59] = "Lorenskog: Minimum Production Run";
			headers[60] = "Mack: Minimum Production Run";
			headers[61] = "Jordbro: Minimum Production Run";
			headers[62] = "Minimum Order Quantity";
			headers[63] = "Units of Concentrate";
			headers[64] = "Case Volume";
			headers[65] = "Raw material write-off assessment";
			headers[66] = "Estimation of residual risk";
			headers[67] = "Risk";
			headers[68] = "Antwerp: Reduced Line Utilisation (LU)%";
			headers[69] = "Chaudfontaine: Reduced Line Utilisation (LU)%";
			headers[70] = "Gent: Reduced Line Utilisation (LU)%";
			headers[71] = "Clamart: Reduced Line Utilisation (LU)%";
			headers[72] = "Dunkirk: Reduced Line Utilisation (LU)%";
			headers[73] = "Grigny: Reduced Line Utilisation (LU)%";
			headers[74] = "Marseille: Reduced Line Utilisation (LU)%";
			headers[75] = "Toulouse: Reduced Line Utilisation (LU)%";
			headers[76] = "East Kilbride: Reduced Line Utilisation (LU)%";
			headers[77] = "Edmonton: Reduced Line Utilisation (LU)%";
			headers[78] = "Milton Keynes: Reduced Line Utilisation (LU)%";
			headers[79] = "Morpeth: Reduced Line Utilisation (LU)%";
			headers[80] = "Sidcup: Reduced Line Utilisation (LU)%";
			headers[81] = "Wakefield: Reduced Line Utilisation (LU)%";
			headers[82] = "Dongen: Reduced Line Utilisation (LU)%";
			headers[83] = "Lorenskog: Reduced Line Utilisation (LU)%";
			headers[84] = "Mack: Reduced Line Utilisation (LU)%";
			headers[85] = "Jordbro: Reduced Line Utilisation (LU)%";
			headers[86] = "Additional Costs";
			headers[87] = "Other consideration";
			headers[88] = "Repack costs";
			headers[89] = "Freight cost";
			headers[90] = "Promotional Mechanic";
			headers[91] = "Theme End Date (CCEP Warehouse availability)";
			headers[92] = "Unique Pack";
			headers[93] = "Approved by customer Logistics";
			headers[94] = "Modified Date";
			headers[95] = "Modified User";

			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].DF_ID + '","' + arrData[i].TITLE + '","' + arrData[i].PROJECT_GROUP + '","' +
					arrData[i].STATUS_NAME + '","' + arrData[i].GATE1 +
					'","' +
					arrData[i].GATE2 + '","' + arrData[i].GATE_3 + '","' + arrData[i].GATE_4 + '","' +
					arrData[i].NIM1 + '","' + arrData[i].NIM_CM + '","' +
					arrData[i].PROJECT_DESCRIPTION + '","' +
					arrData[i].MAPX_DECISION_REQ + '","' + arrData[i].MAPX_PREREAD_NAME + '","' + arrData[i].SAP_SKU_CODE + '","' +
					arrData[i].BAP_BASIS_CODE + '","' +
					arrData[i].DESC + '","' + arrData[i].OLD_SAP_RAW_MATERIAL_NUMBER + '","' + arrData[i].RAW_MAT_DESC + '","' +
					arrData[i].COMMODITIES + '","' +
					arrData[i].PROD_SITES + '","' + arrData[i].SAME_AS_CURR + '","' + arrData[i].PERIOD1 + '","' +
					arrData[i].PERIOD2 + '","' +
					arrData[i].PERIOD3 + '","' + arrData[i].PERIOD4 + '","' + arrData[i].PERIOD5 + '","' +
					arrData[i].PERIOD6 + '","' +
					arrData[i].PERIOD7 + '","' + arrData[i].PERIOD8 + '","' +
					arrData[i].PERIOD9 + '","' +
					arrData[i].PERIOD10 + '","' + arrData[i].PERIOD11 + '","' + arrData[i].PERIOD12 +
					'","' +
					arrData[i].TOTAL + '","' +
					arrData[i].SKU_CREATION_COMPLETE + '","' + arrData[i].BAM + '","' + arrData[i].FORECAST_REQ + '","' +
					arrData[i].FORECAST_DATE + '","' + arrData[i].EST_PROD_WEEK_INPT + '","' +
					arrData[i].QUANRANTINE_INPT + '","' + arrData[i].FIRST_LAST_DISPATCH_DATE + '","' + arrData[i].SHELF + '","' +
					arrData[i].CONTAINER + '","' +
					arrData[i].ANTWERP_MAPX + '","' + arrData[i].CHAUDFONTAINE_MAPX + '","' + arrData[i].GENT_MAPX + '","' +
					arrData[i].CLAMART_MAPX + '","' + arrData[i].DUNKIRK_MAPX + '","' + arrData[i].GRIGNY_MAPX + '","' + arrData[i].MARSEILLE_MAPX +
					'","' +
					arrData[i].TOLOUSE_MAPX + '","' +
					arrData[i].KILLBRIDE_MAPX + '","' + arrData[i].EDMONTON_MAPX +
					'","' +
					arrData[i].KEYNES_MAPX + '","' +
					arrData[i].MORPETH_MAPX + '","' + arrData[i].SIDCUP_MAPX + '","' + arrData[i].WAKEFIELD_MAPX + '","' +
					arrData[i].DONGEN_MAPX + '","' +
					arrData[i].LORENSKOG_MAPX + '","' + arrData[i].MACK_MAPX + '","' + arrData[i].JORDBRO_MAPX + '","' +
					arrData[i].MINORDER_MAPX + '","' +
					arrData[i].UNIT_CONCENTRATE_MAPX + '","' + arrData[i].CASEVOL_MAPX + '","' + arrData[i].RAW + '","' +
					arrData[i].RISK + '","' +
					arrData[i].RISK_MAPX + '","' + arrData[i].ANTWERP2_MAPX + '","' + arrData[i].CHAUDFONTAINE2_MAPX + '","' +
					arrData[i].GENT2_MAPX + '","' +
					arrData[i].CLAMART2_MAPX + '","' + arrData[i].DUNKIRK2_MAPX + '","' + arrData[i].GRIGNY2_MAPX + '","' +
					arrData[i].MARSEILLE2_MAPX + '","' +
					arrData[i].TOLOUSE2_MAPX + '","' + arrData[i].KILLBRIDE2_MAPX + '","' + arrData[i].EDMONTON2_MAPX + '","' +
					arrData[i].KEYNES2_MAPX + '","' +
					arrData[i].MORPETH2_MAPX + '","' + arrData[i].SIDCUP2_MAPX + '","' + arrData[i].WAKEFIELD2_MAPX + '","' +
					arrData[i].DONGEN2_MAPX + '","' +
					arrData[i].LORENSKOG2_MAPX + '","' + arrData[i].MACK2_MAPX + '","' + arrData[i].JORDBRO2_MAPX + '","' +
					arrData[i].ADDTCOST_MAPX + '","' +
					arrData[i].OTHERCONSIDERATION_MAPX + '","' + arrData[i].COST + '","' + arrData[i].FREIGHT_COST + '","' +
					arrData[i].PROMOTIONAL_MECHANIC + '","' +
					arrData[i].THEME_END_DATE + '","' + arrData[i].UNIQUE_PACK + '","' + arrData[i].CUSTOMER_LOGISTICS + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';

				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "NOSE_SKU") {
			headers[0] = "Hierarchy";
			headers[1] = "Tonica Meeting Minutes";
			headers[2] = "Code/Material Status";
			headers[3] = "DF Request Number";
			headers[4] = "NIM";
			headers[5] = "Destination Market";
			headers[6] = "MAPX Decision Required";
			headers[7] = "Planned MAPX DF Go";
			headers[8] = "Title of Project";
			headers[9] = "Project Type NEBU";
			headers[10] = "Trial Request Needed";
			headers[11] = "Trial Earliest Date";
			headers[12] = "Trial Latest Date";
			headers[13] = "BAP/ Basis Code";
			headers[14] = "SAP SKU Code";
			headers[15] = "SAP SKU Code Selling Country";
			headers[16] = "Product Description";
			headers[17] = "Unknown SKU Description";
			headers[18] = "Brand";
			headers[19] = "Flavour";
			headers[20] = "Input SKU's used for the new pallet";
			headers[21] = "Product Split if mixed";
			headers[22] = "Producing Site(s)";
			headers[23] = "Producing Country";
			headers[24] = "First estimate production week to hit first required despatch";
			headers[25] = "Date of First/Last Despatches from CCEP Warehouses";
			headers[26] = "Last Despatch Week";
			headers[27] = "Technical File/Trade Registration/ Line Form Date";
			headers[28] = "Trade Window to follow";
			headers[29] = "Comments";
			headers[30] = "ISSCOM Code";
			headers[31] = "BBN Code";
			headers[32] = "PSS Number";
			headers[33] = "Product Density";
			headers[34] = "Date Format on Packaging";
			headers[35] = "Barcode Type fro Container";
			headers[36] = "Barcode Type for Multipack";
			headers[37] = "Barcode Type for Despatch Unit";
			headers[38] = "Shelf-life(in days)";
			headers[39] = "Container size";
			headers[40] = "Product Pack";
			headers[41] = "Raw material Indication of Run-out rules?";
			headers[42] = "Brand Owner Name";
			headers[43] = "Please select all Materials which are impacted";
			headers[44] = "Type of drink";
			headers[45] = "Sweetener Data";
			headers[46] = "Modified Date";
			headers[47] = "Modified User";

			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].TONICA_MEET_MINS + '","' + arrData[i].CODE_MAT + '","' + arrData[i].DF_ID +
					'","' +
					arrData[i].NIM1 + '","' + arrData[i].SELLING_COUNTRY +
					'","' +
					arrData[i].MAPX_DECISION_REQ + '","' + arrData[i].MAPX + '","' + arrData[i].TITLE + '","' +
					arrData[i].PROJTYPNEBU + '","' + arrData[i].TRIAL_REQ_NEEDED + '","' +
					arrData[i].TRIAL_E + '","' +
					arrData[i].TRIAL_L + '","' + arrData[i].BAP_BASIS_CODE + '","' + arrData[i].SAP_SKU_CODE + '","' +
					arrData[i].SAP_SKU_SELLING + '","' +
					arrData[i].OTH_CODE + '","' + arrData[i].DESC + '","' + arrData[i].UNKNOWN_SKU + '","' +
					arrData[i].BRAND + '","' +
					arrData[i].FLAVOUR + '","' + arrData[i].INPUT_SKU_PALLET + '","' + arrData[i].PRODUCT_SPLIT + '","' +
					arrData[i].PROD_SITES + '","' +
					arrData[i].PROD_COUNTRY + '","' + arrData[i].EST_PROD_WEEK_INPT + '","' + arrData[i].FIRST_LAST_DISPATCH_DATE + '","' +
					arrData[i].LAST_DESPATCH_WEEK + '","' +
					arrData[i].TRADE_REGISTRATION + '","' + arrData[i].TRADE_WINDOW + '","' +
					arrData[i].COMMENTS + '","' +
					arrData[i].ISSCOM_CODE + '","' + arrData[i].BBN_CODE + '","' + arrData[i].PSS_REQ_INPT +
					'","' +
					arrData[i].PRODUCT_DENSITY + '","' +
					arrData[i].PACKAGING_DATE_FORMAT + '","' + arrData[i].BARCODE_TYPE + '","' + arrData[i].BARCODE_TYPE_MULTI + '","' +
					arrData[i].BARCODE_TYPE_DEPATCH + '","' + arrData[i].SHELF + '","' +
					arrData[i].CONTAINER + '","' + arrData[i].PACK + '","' + arrData[i].IND_RUN_OUT_RULES + '","' +
					arrData[i].BRANDOWNER_NAME + '","' +
					arrData[i].MATERIAL_CHANGE + '","' + arrData[i].TYPE_DRINK + '","' + arrData[i].SWEETNER_DATA + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';

				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		} else if (ReportTitle === "NEBU_RM") {
			headers[0] = "Hierarchy";
			headers[1] = "Code/Material Status";
			headers[2] = "DF Request Number";
			headers[3] = "Title of Project";
			headers[4] = "NIM";
			headers[5] = "Destination Market";
			headers[6] = "Brand";
			headers[7] = "Flavour";
			headers[8] = "Commodities";
			headers[9] = "Container size";
			headers[10] = "Product Pack";
			headers[11] = "Promotion Type";
			headers[12] = "Design Message";
			headers[13] = "Generate New Artwork Number";
			headers[14] = "CCEP Artwork Number";
			headers[15] = "Optional Additional Code Material";
			headers[16] = "Artwork Barcode (EAN/ITF)";
			headers[17] = "Lead Market";
			headers[18] = "Grid Reference";
			headers[19] = "Supplier";
			headers[20] = "Material Substrate";
			headers[21] = "Print Process";
			headers[22] = "Lead of Artwork Development";
			headers[23] = "PCB to Schawk Date";
			headers[24] = "Required PCB FTP Date";
			headers[25] = "Revised PCB FTP Date";
			headers[26] = "Actual PCB FTP Date";
			headers[27] = "Schawk Artwork Status";
			headers[28] = "First possible Bottling Production Date";
			headers[29] = "Indication last bottling production date";
			headers[30] = "Number of Color Layers";
			headers[31] = "Raw Material Indication of run-out rules";
			headers[32] = "Bottle Shape";
			headers[33] = "Artwork Check Occurence";
			headers[34] = "Contingency Site and Line";
			headers[35] = "MD Antwerp:5300";
			headers[36] = "MD Chaudfontaine: 5307";
			headers[37] = "MD Ghent: 5301";
			headers[38] = "MD Dongen : 5400";
			headers[39] = "MD Clamart: 5104";
			headers[40] = "MD Dunkirk: 5100";
			headers[41] = "MD Grigny: 5105";
			headers[42] = "MD Grigny: Self-Manufacturing 5116";
			headers[43] = "MD Marseille: 5106";
			headers[44] = "MD Toulouse: 5103";
			headers[45] = "MD Jordbro: 2001";
			headers[46] = "MD Robsrud: 2003";
			headers[47] = "MD Mack";
			headers[48] = "MD 3rd part(Name)";
			headers[49] = "MD Release 3rd party";
			headers[50] = "Old SAP Raw Material Number";
			headers[51] = "Old SAP Raw Material Description";
			headers[52] = "New SAP Raw Material Number";
			headers[53] = "New Full Code";
			headers[54] = "New Full Code Description";
			headers[55] = "New SAP Raw Material Description";
			headers[56] = "SAP SKU Code";
			headers[57] = "Product Description";
			headers[58] = "Additional Printing Features";
			headers[59] = "MS Antwerp:5300";
			headers[60] = "MS Chaudfontaine: 5307";
			headers[61] = "MS Ghent: 5301";
			headers[62] = "MS Dongen : 5400";
			headers[63] = "MS Clamart: 5104";
			headers[64] = "MS Dunkirk: 5100";
			headers[65] = "MS Grigny: 5105";
			headers[66] = "MS Grigny: Self-Manufacturing 5116";
			headers[67] = "MS Marseille: 5106";
			headers[68] = "MS Toulouse: 5103";
			headers[69] = "MS Jordbro: 2001";
			headers[70] = "MS Robsrud: 2003";
			headers[71] = "MS Mack";
			headers[72] = "MS 3rd party (Name)";
			headers[73] = "MS Release 3rd party";
			headers[74] = "Material Supply General Comments";
			headers[75] = "MS NOK";
			headers[76] = "Part Cancelled/Obsolete";
			headers[77] = "RM Suppressed";
			headers[78] = "Modified Date";
			headers[79] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

				row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].CODE_MAT + '","' + arrData[i].DF_ID + '","' +
					arrData[i].TITLE + '","' + arrData[i].NIM1 +
					'","' + arrData[i].SELLING_COUNTRY + '","' + arrData[i].BRAND + '","' +
					arrData[i].FLAVOUR + '","' +
					arrData[i].COMMODITIES + '","' + arrData[i].CONTAINER + '","' + arrData[i].PACK + '","' +
					arrData[i].THEME_TYPE + '","' +
					arrData[i].DESIGN_MESSAGE + '","' + arrData[i].NEWART + '","' + arrData[i].CCE_ARTWORK_NUMBER + '","' +
					arrData[i].OPTIONAL_ADDITIONAL_CODE + '","' +
					arrData[i].ARTWORK_BARCODE + '","' + arrData[i].LEAD_MARKET + '","' + arrData[i].GRID_REF + '","' +
					arrData[i].SUPPLIER + '","' +
					arrData[i].MATERAL_SUBSTRATE + '","' + arrData[i].PRINT_PROCESS + '","' + arrData[i].LEAD_ARTWORK_DEVELOPMENT + '","' +
					arrData[i].PCB_TO_SCHAWK + '","' +
					arrData[i].REQ_PCB_FTP_DATE + '","' + arrData[i].PCB_FTP_DATE + '","' +
					arrData[i].ACTUAL_PCB_FTP_DATE + '","' + arrData[i].SCHAWK_ARTWORK_STATUS + '","' + arrData[i].BOTTLING_FIRST + '","' +
					arrData[i].BOTTLING_LAST + '","' + arrData[i].NUMBER_COLOR_LAYERS + '","' + arrData[i].IND_RUN_OUT_RULES + '","' +
					arrData[i].BOTTLE_SHAPE + '","' +
					arrData[i].ARTWORK_CHECK + '","' +
					arrData[i].CONTIGENCY_SITE_LINE + '","' + arrData[i].ANTWERP_5300 + '","' + arrData[i].MS_CHAUFONTAINE_5307 + '","' +
					arrData[i].GHENT_5301 + '","' +
					arrData[i].DONGEN_5400 + '","' + arrData[i].CLAMART_5104 + '","' + arrData[i].DUNKRIK_5100 + '","' +
					arrData[i].GRIGNY_5105 + '","' + arrData[i].GRIGNY_SELF_MANUFACTURING_5116 + '","' +
					arrData[i].MARSEILLE_5106 + '","' + arrData[i].TOULOUSE_5103 + '","' + arrData[i].JORDBRO_2001 + '","' +
					arrData[i].ROBSRUD_2003 + '","' +
					arrData[i].MD_MACK + '","' + arrData[i].THIRD_PARTY + '","' + arrData[i].RELEASE_3RD_PARTY + '","' +
					arrData[i].OLD_SAP_RAW_MATERIAL_NUMBER + '","' + arrData[i].RAW_MAT_DESC + '","' + arrData[i].UNIT5 +
					'","' +
					arrData[i].NEW_FULL_CODE + '","' +
					arrData[i].NEW_FULL_CODE_DESC + '","' + arrData[i].NEW_SAP_RAW_MATERIAL_DESCRIPTION + '","' + arrData[i].SAP_SKU_CODE + '","' +
					arrData[i].DESC + '","' + arrData[i].ADDITONAL_PRINT_FEATURES + '","' + arrData[i].MS_ANTWERP_5300 + '","' +
					arrData[i].CHAUFONTAINE_5307 + '","' +
					arrData[i].MS_GHENT_5301 + '","' + arrData[i].MS_DONGEN_5400 + '","' + arrData[i].MS_CLAMART_5104 + '","' +
					arrData[i].MS_DUNKRIK_5100 + '","' +
					arrData[i].MS_GRIGNY_5105 + '","' + arrData[i].MS_GRIGNY_SELF_MANUFACTURING_5116 + '","' + arrData[i].MS_MARSEILLE_5106 + '","' +
					arrData[i].MS_TOULOUSE_5103 + '","' +
					arrData[i].MS_JORDBRO_2001 + '","' + arrData[i].MS_ROBSRUD_2003 + '","' + arrData[i].MS_MACK + '","' +
					arrData[i].MS_3RD_PARTY + '","' +
					arrData[i].MS_RELEASE_3RD_PARTY + '","' + arrData[i].MATERIAL_LEAD_INPT + '","' + arrData[i].MS_NOK + '","' +
					arrData[i].PART_CANCELLED + '","' +
					arrData[i].RM_SUP + '","' + arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';

				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		}
		else if (ReportTitle === "PCB") {
			headers[0] = "Hierarchy";
			headers[1] = "PCB Initiator";
			headers[2] = "PCB to Schawk date";
			headers[3] = "Revision Number";
			headers[4] = "DF Request Number";
			headers[5] = "Title of Project";
			headers[6] = "NIM";
			headers[7] = "Brand Owner Email";
			headers[8] = "Ad Hoc Artwork Reviewer";
			headers[9] = "Alternative Printer Email";
			headers[10] = "BAM/ Instructions on Schawk on Change Requirements";
			headers[11] = "NIM/ Instructions on Schawk on Change Requirements";
			headers[12] = "Based on Reference(BAM)";
			headers[13] = "Destination Market";
			headers[14] = "Brand";
			headers[15] = "Flavour";
			headers[16] = "Commodities";
			headers[17] = "Container Size";
			headers[18] = "Product pack";
			headers[19] = "PCB Promotion Type";
			headers[20] = "Design Message";
			headers[21] = "CCEP Artwork Number";
			headers[22] = "Optional Additional Code Material";
			headers[23] = "Artwork Barcode (EAN/ITF)";
			headers[24] = "Lead Market";
			headers[25] = "Grid Reference";
			headers[26] = "Supplier";
			headers[27] = "Material Substrate";
			headers[28] = "Print Process";
			headers[29] = "Lead of Artwork Development";
			headers[30] = "Required PCB FTP Date";
			headers[31] = "PCB NIM Comments or priority";
			headers[32] = "Modified Date";
			headers[33] = "Modified User";
			CSV += headers + '\r\n';

			for (var i = 0; i < arrData.length; i++) {
				var row = "";

			    row += '"' + arrData[i].HIERARCHY + '","' + arrData[i].PCB_INITIATOR_NAME + '","' + arrData[i].PCB_TO_SCHAWK + '","' +
					arrData[i].REVISION_NUMBER + '","' + arrData[i].DF_ID +
					'","' + arrData[i].TITLE + '","' + arrData[i].NIM1 + '","' +
					arrData[i].BRAND_OWNER_EMAIL + '","' +
					arrData[i].ART_REVIEWER + '","' + arrData[i].PRINTER_EMAIL + '","' + arrData[i].BAM_INSTRUCTIONS + '","' +
					arrData[i].NIM_INSTRUCTIONS + '","' +
					arrData[i].BAM_REFERENCE + '","' + arrData[i].SELLING_COUNTRY + '","' + arrData[i].BRAND + '","' +
					arrData[i].FLAVOUR + '","' +
					arrData[i].COMMODITIES + '","' + arrData[i].CONTAINER + '","' + arrData[i].PACK + '","' +
					arrData[i].THEME_TYPE + '","' +
					arrData[i].DESIGN_MESSAGE + '","' + arrData[i].CCE_ARTWORK_NUMBER + '","' + arrData[i].OPTIONAL_ADDITIONAL_CODE + '","' +
					arrData[i].ARTWORK_BARCODE + '","' +
					arrData[i].LEAD_MARKET + '","' + arrData[i].GRID_REF + '","' +
					arrData[i].SUPPLIER + '","' + arrData[i].MATERAL_SUBSTRATE + '","' + arrData[i].PRINT_PROCESS + '","' +
					arrData[i].LEAD_ARTWORK_DEVELOPMENT + '","' + arrData[i].REQ_PCB_FTP_DATE + '","' + arrData[i].PCB_NIM_COMMENTS + '","' +
					arrData[i].MOD_DATE + '","' + arrData[i].MOD_USER + '",';

				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}
		}
		//	} // end row loop

		if (CSV == '') {
			alert("Invalid data");
			return;
		}
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "dd-MMM-yyyy HH:mm"
		});
		//		download(CSV, "Payroll Analysis Tool.download." + oDateFormat.format(new Date()) + ".csv", "text/xls");
		// Generate a file name
		var fileName = "Report_";
		fileName += ReportTitle.replace(/ /g, "_");
		jQuery.sap.log.info("incoming");
		jQuery.sap.log.info(CSV);
		// Initialize file format you want csv or xls
		var uri = 'data:text/xls;charset=utf-8,' + escape(CSV);
		// Now the little tricky part.
		// you can use either>> window.open(uri);
		// but this will not work in some browsers
		// or you will not get the correct file extension
		// this trick will generate a temp <a /> tag
		var link = document.createElement("a");
		link.href = uri;
		// set the visibility hidden so it will not effect on your web layout
		link.style = "visibility:hidden";
		link.download = fileName + ".csv";
		// this part will append the anchor tag and remove it after automatic
		// click
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	},
	changeFirstDate: function(that, oTable) {

		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success, failed);

		function success(data) {
			console.log(data.results[0].EST_PROD_WEEK_INPT);
			var first = new Date(data.results[0].EST_PROD_WEEK_INPT);
			var bom_date = new Date(first.getFullYear(), first.getMonth(), first.getDate() - 70);
			console.log(bom_date);
			var bom_date_dp = bom_date.getFullYear() + "-" + (bom_date.getMonth() + 1) + "-" + bom_date.getDate();
			console.log(bom_date_dp);
			var sap_date = new Date(first.getFullYear(), first.getMonth(), first.getDate() - 56);
			console.log(sap_date);
			var sap_date_dp = sap_date.getFullYear() + "-" + (sap_date.getMonth() + 1) + "-" + sap_date.getDate();
			console.log(sap_date_dp);
			console.log(first);
			var ref_number = data.results[0].REF_NUMBER;
			var update_data = data.results[0];
			update_data.BNF_NEEDBY_DATE = bom_date_dp;
			update_data.SAP_SKU_PLANNING_REQ_DATE = sap_date_dp;
			model_req.update("/DF_DB('" + ref_number + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update");
				that1.refreshAllRequests();
				sap.ui.getCore().byId("common_data").getModel().refresh();
			}

			function updateFailed(error) {
				console.log(error);
				console.log("error in df");
			}
		}

		function failed() {}
	},
	changeFirstDespatchDate: function(that, oTable) {

		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success, failed);

		function success(data) {
			console.log(data.results[0].ACTUAL_FIRST_DESPATCH);
			var first_desp = new Date(data.results[0].ACTUAL_FIRST_DESPATCH);
			var comp_date = new Date(first_desp.getFullYear(), first_desp.getMonth(), first_desp.getDate() + 7);
			console.log(comp_date);
			var comp_date_dp = comp_date.getFullYear() + "-" + (comp_date.getMonth() + 1) + "-" + comp_date.getDate();
			console.log(comp_date_dp);
			var ref_number = data.results[0].REF_NUMBER;
			var update_data = data.results[0];
			update_data.ACTUAL_COMPLETION_DESPATCH = comp_date_dp;
			model_req.update("/DF_DB('" + ref_number + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update");
				that1.refreshAllRequests();
				sap.ui.getCore().byId("common_data").getModel().refresh();
			}

			function updateFailed(error) {
				console.log(error);
				console.log("error in df");
			}
		}

		function failed() {}
	},
	mDChange: function(that, oTable) {
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);
		var md_data = "";
		var ref_number = "";
		var update_data = "";

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success, failed);

		function success(data) {
			ref_number = data.results[0].REF_NUMBER;
			update_data = data.results[0];
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Antwerp: 5300") {
				md_data = data.results[0].ANTWERP_5300;
				update_data.MS_ANTWERP_5300 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Chaudfontaine: 5307") {
				md_data = data.results[0].MS_CHAUFONTAINE_5307;
				update_data.CHAUFONTAINE_5307 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Ghent: 5301") {
				md_data = data.results[0].GHENT_5301;
				update_data.MS_GHENT_5301 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Dongen: 5400") {
				md_data = data.results[0].DONGEN_5400;
				update_data.MS_DONGEN_5400 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Clamart: 5104") {
				md_data = data.results[0].CLAMART_5104;
				update_data.MS_CLAMART_5104 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Dunkirk: 5100") {
				md_data = data.results[0].DUNKRIK_5100;
				update_data.MS_DUNKRIK_5100 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Grigny: 5105") {
				md_data = data.results[0].GRIGNY_5105;
				update_data.MS_GRIGNY_5105 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Grigny Self-Manufacturing: 5116") {
				md_data = data.results[0].GRIGNY_SELF_MANUFACTURING_5116;
				update_data.MS_GRIGNY_SELF_MANUFACTURING_5116 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Marseille: 5106") {
				md_data = data.results[0].MARSEILLE_5106;
				update_data.MS_MARSEILLE_5106 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Toulouse: 5103") {
				md_data = data.results[0].TOULOUSE_5103;
				update_data.MS_TOULOUSE_5103 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Jordbro: 2001") {
				md_data = data.results[0].JORDBRO_2001;
				update_data.MS_JORDBRO_2001 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Mack") {
				md_data = data.results[0].MD_MACK;
				update_data.MS_MACK = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Robsrud: 2003") {
				md_data = data.results[0].ROBSRUD_2003;
				update_data.MS_ROBSRUD_2003 = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD 3rd party (Name)") {
				md_data = data.results[0].THIRD_PARTY;
				update_data.MS_3RD_PARTY = "NOK";
			}
			if (oTable.getColumns()[selectedIndex1].getLabel().getText() === "MD Release 3rd party") {
				md_data = data.results[0].RELEASE_3RD_PARTY;
				update_data.MS_RELEASE_3RD_PARTY = "NOK";
			}
			console.log(md_data);
			if (md_data === "N") {
				model_req.update("/DF_DB('" + ref_number + "')", update_data, null, updateSuccess, updateFailed);

				function updateSuccess() {
					console.log("update");
					that1.msnokChange(that, oTable);
					that1.refreshAllRequests();
					sap.ui.getCore().byId("common_data").getModel().refresh();
				}

				function updateFailed(error) {
					console.log(error);
					console.log("error in df");
				}
			}
		}

		function failed() {}
	},
	msnokChange: function(that, oTable) {
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success, failed);

		function success(data) {
			var ref = "";
			ref_number = data.results[0].REF_NUMBER;
			update_data = data.results[0];

			if (update_data.MS_ANTWERP_5300 === "NOK" || update_data.CHAUFONTAINE_5307 === "NOK" || update_data.MS_GHENT_5301 === "NOK" ||
				update_data.MS_DONGEN_5400 === "NOK" || update_data.MS_CLAMART_5104 === "NOK" || update_data.MS_DUNKRIK_5100 === "NOK" ||
				update_data.MS_GRIGNY_5105 === "NOK" || update_data.MS_GRIGNY_SELF_MANUFACTURING_5116 === "NOK" || update_data.MS_MARSEILLE_5106 ===
				"NOK" ||
				update_data.MS_TOULOUSE_5103 === "NOK" || update_data.MS_JORDBRO_2001 === "NOK" || update_data.MS_MACK === "NOK" ||
				update_data.MS_ROBSRUD_2003 === "NOK" || update_data.MS_3RD_PARTY === "NOK" || update_data.MS_RELEASE_3RD_PARTY === "NOK") {
				update_data.MS_NOK = "NOK";
				model_req.update("/DF_DB('" + ref_number + "')", update_data, null, updateSuccess, updateFailed);

				function updateSuccess() {
					console.log("update");
					/*that1.refreshAllRequests();
				sap.ui.getCore().byId("common_data").getModel().refresh();*/
				}

				function updateFailed(error) {
					console.log(error);
					console.log("error in df");
				}
			}
		}

		function failed() {}
	},
	checkProdCountry: function(that, oTable) {
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success, failed);

		function success(data) {
			var ref = "";
			ref_number = data.results[0].REF_NUMBER;
			update_data = data.results[0];

			console.log(update_data.PROD_SITES);
			var prod_sites_inpt = update_data.PROD_SITES;
			var sites = prod_sites_inpt.split(",");
			for (var x = 0; x < sites.length; x++) {
				var site_split = [];
				site_split = sites[x].split(" ");
				console.log(site_split);
				if (site_split[0] === "CCE") {
					site_split1 = sites[x].split(": ");
					console.log(site_split1);

					if (psite === "") {
						psite = site_split1[1];
					} else {
						psite = psite + "," + site_split1[1];
					}
				}
			}
			console.log(psite);
			var psite1 = [];
			psite1 = psite.split(",");
			console.log(psite1);
			var pcountry = "";
			for (var w = 0; w < psite1.length; w++) {
				model_req.read("/loc('" + psite1[w] + "')", null, null, false, floc, eloc);

				function floc(data) {
					console.log(data.COUNTRY);
					if (pcountry === "") {
						pcountry = data.COUNTRY;
					} else {
						pcountry = pcountry + "," + data.COUNTRY;
					}
				}

				function eloc() {}
			}
			console.log(pcountry);
			var pcountry1 = pcountry.split(",");
			var uniq_pcountry = [];
			$.each(pcountry1, function(i, el) {
				if ($.inArray(el, uniq_pcountry) === -1) uniq_pcountry.push(el);
			});
			console.log(uniq_pcountry);
			var final_country = "";
			for (var v = 0; v < uniq_pcountry.length; v++) {
				if (final_country === "") {
					final_country = uniq_pcountry[v];
				} else {
					final_country = final_country + "," + uniq_pcountry[v];
				}
			}
			console.log(final_country);
			update_data.PROD_COUNTRY = final_country;
			model_req.update("/DF_DB('" + ref_number + "')", update_data, null, updateSuccess, updateFailed);

			function updateSuccess() {
				console.log("update");
				that1.refreshAllRequests();
				sap.ui.getCore().byId("common_data").getModel().refresh();
			}

			function updateFailed(error) {
				console.log(error);
				console.log("error in df");
			}
		}

		function failed() {}

	},
	updateAllHierarchy: function(that, oTable, col) {
		console.log(col);
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'", null, null, false, success, failed);

		function success(data) {
			var ref = "";
			ref_number = data.results[0].REF_NUMBER;
			update_data = data.results[0];

			console.log(update_data.DF_ID);
			console.log(update_data.HIERARCHY);

			if (col === "TITLE") {
				var new_value = update_data.TITLE;
			} else if (col === "STATUS_NAME") {
				var new_value = update_data.STATUS_NAME;
			} else if (col === "NIM1") {
				var new_value = update_data.NIM1;
			} else if (col === "INITIATOR") {
				var new_value = update_data.INITIATOR;
			} else if (col === "PROJECT_PHASE") {
				var new_value = update_data.PROJECT_PHASE;
			} else if (col === "SELLING_COUNTRY") {
				var new_value = update_data.SELLING_COUNTRY;
			} else if (col === "MAPX") {
				var new_value = update_data.MAPX;
			} else if (col === "PCB_TO_SCHAWK") {
				var new_value = update_data.PCB_TO_SCHAWK;
			} else if (col === "ACTUAL_PCB_FTP_DATE") {
				var new_value = update_data.ACTUAL_PCB_FTP_DATE;
			} else if (col === "EST_PROD_WEEK_INPT") {
				var new_value = update_data.EST_PROD_WEEK_INPT;
			}
			console.log(new_value);

			if (update_data.HIERARCHY === "DF") {
				console.log("in DF");
				var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updateAllHierarchy.xsjs?col=" + col + "&val=" + new_value +
					"&dfid=" + update_data.DF_ID;
				console.log(url);
				$.ajax({

					url: url,
					success: function(msg) {
						that1.refreshAllRequests();
						sap.ui.getCore().byId("common_data").getModel().refresh();
						console.log("Data Saved: " + msg);
					},
					error: function(xhr, textStatus, error) {
						/*	console.log(xhr.statusText);
					console.log(textStatus);
					console.log(error);*/
					}
				});
			} else if (update_data.HIERARCHY !== "DF") {
				console.log("in SKU or RM");
				if (col === "TITLE" || col === "NIM1" || col === "PROJECT_PHASE" || col === "MAPX") {
					var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updateAllHierarchy.xsjs?col=" + col + "&val=" + new_value +
						"&dfid=" + update_data.DF_ID;
					console.log(url);
					$.ajax({

						url: url,
						success: function(msg) {
							that1.refreshAllRequests();
							sap.ui.getCore().byId("common_data").getModel().refresh();
							console.log("Data Saved: " + msg);
						},
						error: function(xhr, textStatus, error) {
							/*	console.log(xhr.statusText);
					console.log(textStatus);
					console.log(error);*/
						}
					});
				}
			}
			that1.refreshAllRequests();
			sap.ui.getCore().byId("common_data").getModel().refresh();
		}

		function failed() {}
	},
	changeFRSKU: function(that, oTable) {
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'&select=MFG_SOURCE", null, null, false, success, failed);

		function success(data) {
			console.log(data);
			var ref_number = data.results[0].REF_NUMBER;

			var col = "FR_CATEGORY";
			if (data.results[0].MFG_SOURCE === "Co-Fill") {
				var val = "Co-Fill";
				var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updatePlatform.xsjs?col=" + col + "&val=" + val +
					"&ref_number=" + ref_number;
				console.log(url);
				$.ajax({
					url: url,
					success: function(msg) {
						that1.refreshAllRequests();
						sap.ui.getCore().byId("common_data").getModel().refresh();
						console.log("Data Saved: " + msg);
					},
					error: function(xhr, textStatus, error) {
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
				});
			} else if (data.results[0].MFG_SOURCE === "Repacking") {
				var val = "Repacking";
				var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updatePlatform.xsjs?col=" + col + "&val=" + val +
					"&ref_number=" + ref_number;
				console.log(url);
				$.ajax({
					url: url,
					success: function(msg) {
						that1.refreshAllRequests();
						sap.ui.getCore().byId("common_data").getModel().refresh();
						console.log("Data Saved: " + msg);
					},
					error: function(xhr, textStatus, error) {
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
				});
			}

			sap.ui.getCore().byId("common_data").getModel().refresh();
			that1.refreshAllRequests();
		}

		function failed() {}
	},
	_updatePlanned: function(that, oTable){
	    var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);
		var ref_number;

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		
		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'&select=REF_NUMBER,SELLING_COUNTRY,NEWART", null, null, false,
			success, failed);

		function success(data) {
			console.log(data);
			ref_number = data.results[0].REF_NUMBER;
			var update_data = data.results[0];
			var date_wrkflw = new Date(update_data.DF_CIRCULATION_STARTED);
			console.log(date_wrkflw);
			var val1 = new Date(date_wrkflw.getFullYear(), date_wrkflw.getMonth(), date_wrkflw.getDate() + 14);
			console.log(val1);
			var val = val1.getFullYear() + "-" + (val1.getMonth() + 1) + "-" + val1.getDate();
			console.log(val);
			var col = "PLANNED_FINAL_PSS_COMPLETION";
			var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updatePlatform.xsjs?col=" + col + "&val=" + val +
					"&ref_number=" + ref_number;
				console.log(url);
				$.ajax({
					url: url,
					success: function(msg) {
						that1.refreshAllRequests();
						sap.ui.getCore().byId("common_data").getModel().refresh();
						console.log("Data Saved: " + msg);
					},
					error: function(xhr, textStatus, error) {
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
				});
		}
		function failed(){}
	},
	generateArtwork: function(that, oTable) {
		var that1 = this;
		var selectedIndex = "";
		var selectedIndex1 = "";
		var field = [];
		field = that.sId.split("-");
		console.log(field);
		selectedIndex = field[2].substr(3);
		selectedIndex1 = field[1].substr(3);
		var ref_number;

		var PSEUDO_REF_NUM = oTable.getRows()[selectedIndex].getCells()[0].getValue();
		var dest;

		var model_req = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model_req.read("/DF_DB?$filter=PSEUDO_REF_NUM eq '" + PSEUDO_REF_NUM + "'&select=REF_NUMBER,SELLING_COUNTRY,NEWART", null, null, false,
			success, failed);

		function success(data) {
			console.log(data);
			ref_number = data.results[0].REF_NUMBER;
			dest = data.results[0].SELLING_COUNTRY;

			if (data.results[0].NEWART === "true") {
				model_req.read("/seq", null, null, false, s1, f1);

				function s1(data) {
					console.log(data);
					var seq;
					if (data.results.length === 0) {
						var input = {
							"NUM": "1"
						}
						model_req.create("/seq", input, null, s2, f2);

						function s2() {
							console.log("add");
						}

						function f2() {
							console.log("error")
						}
					} else {
						var old = data.results[0].NUM;
						seq = Number(data.results[0].NUM) + 1;
						var input = {
							"NUM": seq
						}
						model_req.remove("/seq('" + old + "')", null, s3, f3);

						function s3() {
							console.log("remove");
						}

						function f3() {
							console.log("error")
						}
						model_req.create("/seq", input, null, s2, f2);

						function s2() {
							console.log("add");
						}

						function f2() {
							console.log("error")
						}
					}
				}

				function f1() {}

				var date = new Date();
				var yr = date.getFullYear();
				console.log(yr);
				console.log(yr.toString().substr(2, 2));
				var yr_last = yr.toString().substr(2, 2);

				var seq_num;
				model_req.read("/seq", null, null, false, s11, f11);

				function s11(data) {
					var s = data.results[0].NUM;
					if (s.length === 1) {
						seq_num = "000" + s.toString();
					} else if (s.length === 2) {
						seq_num = "00" + s.toString();
					} else if (s.length === 3) {
						seq_num = "0" + s.toString();
					} else {
						seq_num = s.toString();
					}
				}

				function f11() {}

				var val = yr_last + "-" + seq_num + "-" + dest;
				console.log(val);

				var col = "CCE_ARTWORK_NUMBER";
				var url = "https://irya4fd950c0.hana.ondemand.com/dfrequest3/services/updatePlatform.xsjs?col=" + col + "&val=" + val +
					"&ref_number=" + ref_number;
				console.log(url);
				$.ajax({
					url: url,
					success: function(msg) {
						that1.refreshAllRequests();
						sap.ui.getCore().byId("common_data").getModel().refresh();
						console.log("Data Saved: " + msg);
					},
					error: function(xhr, textStatus, error) {
						console.log(xhr.statusText);
						console.log(textStatus);
						console.log(error);
					}
				});

			}

		}

		function failed() {}

	},
	onAfterRendering: function() {
		app.setBusy(false);
		app2.setBusy(false);
		//this._createActivityTable();
		this.getView().byId("activity_form").destroyContent();
		displaykey = "Activity_Tracker";
		this._createActivityTable();
		DF_IND = "Y";
		SKU_IND = "N";
		PCB_ind = "Y";

		this.refreshAllRequests();

	}
});