sap.ui.controller("view.CreateDF_BOM", {
	logOff: function() {
		logOffFunction();
	},
	onInit: function() {
		//   alert("HERE");
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		this.getView().setModel(oModel, "df_request_model");
		console.log("comes inside the BOM materials page");
	//	this.createBOMTable();
		//this.refreshBOMTable();
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
	doFileLoadCompleteBOM: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		this.createBOMTable();
		var user_bom;
		var date_bom;
		var date_bom1 = new Date();
		var that = this;
		var month_bom = date_bom1.getMonth() + 1;
		date_bom = date_bom1.getDate() + "/" + month_bom + "/" + date_bom1.getFullYear()
		var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
		user_bom = (JSON.parse(userModel.getJSON()).username);
		userModel.attachRequestCompleted(function() {
			user_bom = (JSON.parse(userModel.getJSON()).username);
			console.log(user_bom);
			var input = {
				"USER": user_bom,
				"DATE": date_bom
			};
			var model = that.getView().getModel("df_request_model");
			model.read("/bom_detail", null, null, false, s1, f1);

			function s1(d1) {
				if (d1.results.length > 0) {
					for (var x = 0; x < d1.results.length; x++) {
						model.remove("/bom_detail(USER='" + d1.results[x].USER + "')", null, delSuccess, delFailed);

						function delSuccess() {
							console.log("user deleted successfully");
						}

						function delFailed() {
							console.log("del failed");
						}
					}
				}
			}

			function f1() {}

			model.create("/bom_detail", input, null, createSuccess, createFailed);

			function createSuccess() {
				console.log("details added BOM");
				that.getView().byId("last_upload").setValue(date_bom);
				that.getView().byId("last_upload_user").setValue(user_bom);
			}

			function createFailed() {}
		});
		console.log(user_bom);

	},
	doFileUploadBOM: function() {
		var that = this;
		console.log("upload BOM");
		var url = "/dfrequest3/services/getFileBOM.xsjs";
		var fileLoader = this.getView().byId("fileUploader_bom");

		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			var dataModel = this.getView().getModel("df_request_model");
			/*dataModel.read("/bom", null, null, false, delSuccess, delFailed);

			function delSuccess(data) {
				if (data.results.length > 0) {
					for (var i = 0; i < data.results.length; i++) {
						dataModel.remove("/bom('" + data.results[i].SERIAL + "')", null, s1, f1)

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
*/

			var urlBOM = "/dfrequest3/services/deleteBOM.xsjs";
			jQuery.ajax({
				url: urlBOM,
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
	//		alert(fileLoader.getUploadUrl());
			fileLoader.upload();
		//	that.refreshBOMTable();
			 this.createBOMTable();
		}

	},
	createBOMTable: function() {
	    var that = this;
	    this.getView().getModel("df_request_model").read("/bom_detail", null, null, false, s1, f1);

		function s1(d) {
			console.log(d);
			that.getView().byId("last_upload").setValue(d.results[0].DATE);
			that.getView().byId("last_upload_user").setValue(d.results[0].USER);
		}

		function f1() {}
		console.log("comes inside the BOM materials page 3");
		
		function addColumnSorterAndFilter1(oColumn, comparator) {
	 			var oTable = oColumn.getParent();
	 			console.log(oColumn);
	 			console.log(oTable);
	 			var oCustomMenu = new sap.ui.commons.Menu();

	 			oCustomMenu.addItem(new sap.ui.commons.MenuItem({
	 				text: 'Sort ascending',
	 				icon: "sap-icon://sort-ascending",
	 				select: function() {
	 					var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);
	 					oSorter.fnCompare = comparator;
	 					oTable.getBinding("rows").sort(oSorter);

	 					for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
	 					oColumn.setSorted(true);
	 					oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);
	 				}
	 			}));
	 			oCustomMenu.addItem(new sap.ui.commons.MenuItem({
	 				text: 'Sort descending',
	 				icon: "sap-icon://sort-descending",
	 				select: function(oControlEvent) {
	 					var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);
	 					oSorter.fnCompare = comparator;
	 					oTable.getBinding("rows").sort(oSorter);
	 					for (var i = 0; i < oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
	 					oColumn.setSorted(true);
	 					oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);
	 				}
	 			}));

	 			oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({
	 				text: 'Filter',
	 				icon: 'sap-icon://filter',
	 				select: function(oControlEvent) {
	 					console.log(oControlEvent.getParameters());
	 					var filterValue = oControlEvent.getParameters().item.getValue().replace(/\s/g, "");
	 					console.log(filterValue);
	 					var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;
	 					console.log(oControlEvent.getSource().getParent().getParent());
	 					var filters = [];
	 					//	if (filterValue.trim() !== '') {
	 					var filterVals = [];
	 					//var finalFilter = [];
	 					filterVals = filterValue.split(",");
	 					for (var r = 0; r < finalFilter.length; r++) {
	 						console.log(finalFilter[r]);
	 						if (finalFilter[r].sPath === "tolower("+filterProperty+")") {
	 							finalFilter.splice(r, 1);
	 							console.log(finalFilter);
	 						}
	 					}
	 					console.log(filterProperty);
	 					if (filterProperty === "MATERIAL") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterVals[i]);
	 							if (filterValue === "") {
	 								oTable.getColumns()[0].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[0].setFiltered(true);
	 							}
	 							finalFilter.push(oFilter);
	 						}
	 					}
	 					if (filterProperty === "MATERIAL_DESC") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(MATERIAL_DESC)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[1].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[1].setFiltered(true);
	 							}
	 						}
	 					}

	 					if (filterProperty === "SIZE") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SIZE)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[2].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[2].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CONTAINER") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CONTAINER)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[3].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[3].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "PACKAGING") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(PACKAGING)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[4].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[4].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "SHAPE") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SHAPE)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[5].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[5].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BEVERAGE_PRODUCT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BEVERAGE_PRODUCT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[6].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[6].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "PLNT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(PLNT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[7].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[7].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BOMCAT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BOMCAT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[8].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[8].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "APPLIC") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(APPLIC)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[9].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[9].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BOM_NO") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BOM_NO)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[10].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[10].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BOM_USG") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BOM_USG)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[11].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[11].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "ALTERNATIVE_BOM") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(ALTERNATIVE_BOM)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[12].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[12].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "ALT_TEXT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(ALT_TEXT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[13].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[13].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BASE_QTY") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BASE_QTY)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[14].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[14].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "HEADER_BASE") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(HEADER_BASE)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[15].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[15].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "REQUIREMENT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(REQUIREMENT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[16].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[16].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "REQ_UOM") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(REQ_UOM)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[17].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[17].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "REQ_QTY") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(REQ_QTY)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[18].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[18].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "LEV") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(LEV)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[19].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[19].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "ITEM") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(ITEM)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[20].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[20].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "ICT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(ICT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[21].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[21].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "MATL_GROUP") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(MATL_GROUP)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[22].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[22].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "MTYP") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(MTYP)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[23].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[23].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BOM_COMPONENT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BOM_COMPONENT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[24].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[24].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "OBJ_DESC") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(OBJ_DESC)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[25].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[25].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "SIZE1") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SIZE1)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[26].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[26].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CONTAINER1") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CONTAINER1)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[27].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[27].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "PACKAGING1") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(PACKAGING1)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[28].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[28].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "SHAPE1") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SHAPE1)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[29].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[29].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BEV_PROD") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BEV_PROD)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[30].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[30].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "QUANTITY") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(QUANTITY)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[31].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[31].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "COMPONENT_UOM") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(COMPONENT_UOM)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[32].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[32].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "QUANTITY1") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(QUANTITY1)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[33].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[33].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CMPS_I") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CMPS_I)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[34].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[34].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CHANGE_NO") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CHANGE_NO)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[35].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[35].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "VALID") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(VALID)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[36].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[36].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "VALID_TO") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(VALID_TO)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[37].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[37].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BY") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BY)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[38].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[38].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CHANGED") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CHANGED)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[39].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[39].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "BY1") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BY1)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[40].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[40].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CREATED") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CREATED)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[41].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[41].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "SLOC") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SLOC)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[42].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[42].setFiltered(true);
	 							}
	 						}
	 					}
	 					console.log(finalFilter);
	 					//	}
	 					oTable.getBinding("rows").filter(finalFilter, sap.ui.model.FilterType.Application);
	 				}
	 			}));

	 			oColumn.setMenu(oCustomMenu);
	 			return oColumn;
	 		}

	 		function compare1(value1, value2) {
	 			if ((value1 === null || value1 === undefined || value1 === '') &&
	 				(value2 === null || value2 === undefined || value2 === '')) {
	 				return 0;
	 			}
	 			if ((value1 === null || value1 === undefined || value1 === '')) {
	 				return -1;
	 			}
	 			if ((value2 === null || value2 === undefined || value2 === '')) {
	 				return 1;
	 			}
	 			if (value1 < value2) {
	 				return -1;
	 			}
	 			if (value1 === value2) {
	 				return 0;
	 			}
	 			if (value1 > value2) {
	 				return 1;
	 			}

	 		}
	 		
	 		
		var oTable = new sap.ui.table.Table( {
			//title: "",
			visibleRowCount: 5,
			navigationMode : sap.ui.table.NavigationMode.Paginator
		});
		var c1 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Material",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "MATERIAL"),
			sortProperty: "MATERIAL",
			filterProperty: "MATERIAL",
			width: "100px"
		});
		oTable.addColumn(c1);
	 	addColumnSorterAndFilter1(c1, compare1);
		/*oTable.getColumns()[0].setSorted(true);
		oTable.getColumns()[0].setSortOrder(sap.ui.table.SortOrder.Ascending);*/
		var c2 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Material Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "MATERIAL_DESC"),
			sortProperty: "MATERIAL_DESC",
			filterProperty: "MATERIAL_DESC",
			width: "100px",
		});
		oTable.addColumn(c2);
	 	addColumnSorterAndFilter1(c2, compare1);
		var c3 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Size",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SIZE"),
			sortProperty: "SIZE",
			filterProperty: "SIZE",
			width: "100px",
		});
		oTable.addColumn(c3);
	 		addColumnSorterAndFilter1(c3, compare1);
		var c4 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Container",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CONTAINER"),
			sortProperty: "CONTAINER",
			filterProperty: "CONTAINER",
			width: "100px",
		});
		oTable.addColumn(c4);
	 		addColumnSorterAndFilter1(c4, compare1);
		var c5 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Packaging",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PACKAGING"),
			sortProperty: "PACKAGING",
			filterProperty: "PACKAGING",
			width: "100px",
		});
		oTable.addColumn(c5);
	 		addColumnSorterAndFilter1(c5, compare1);
		var c6 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Shape",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SHAPE"),
			sortProperty: "SHAPE",
			filterProperty: "SHAPE",
			width: "100px",
		});
		oTable.addColumn(c6);
	 		addColumnSorterAndFilter1(c6, compare1);
		var c7 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Beverage Product",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BEVERAGE_PRODUCT"),
			sortProperty: "BEVERAGE_PRODUCT",
			filterProperty: "BEVERAGE_PRODUCT",
			width: "100px",
		});
		oTable.addColumn(c7);
	 		addColumnSorterAndFilter1(c7, compare1);
		var c8 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Plnt",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PLNT"),
			sortProperty: "PLNT",
			filterProperty: "PLNT",
			width: "100px",
		});
		oTable.addColumn(c8);
	 		addColumnSorterAndFilter1(c8, compare1);
		var c9 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BOMcat",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BOMCAT"),
			sortProperty: "BOMCAT",
			filterProperty: "BOMCAT",
			width: "100px",
		});
		oTable.addColumn(c9);
	 		addColumnSorterAndFilter1(c9, compare1);
		var c10 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Applic.",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "APPLIC"),
			sortProperty: "APPLIC",
			filterProperty: "APPLIC",
			width: "100px",
		});
		oTable.addColumn(c10);
	 		addColumnSorterAndFilter1(c10, compare1);
		var c11 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BOM No",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BOM_NO"),
			sortProperty: "BOM_NO",
			filterProperty: "BOM_NO",
			width: "100px",
		});
		oTable.addColumn(c11);
	 		addColumnSorterAndFilter1(c11, compare1);
		var c12 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BOM Usg",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BOM_USG"),
			sortProperty: "BOM_USG",
			filterProperty: "BOM_USG",
			width: "100px",
		});
		oTable.addColumn(c12);
	 		addColumnSorterAndFilter1(c12, compare1);
		var c13 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Alternative BOM",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ALTERNATIVE_BOM"),
			sortProperty: "ALTERNATIVE_BOM",
			filterProperty: "ALTERNATIVE_BOM",
			width: "100px",
		});
		oTable.addColumn(c13);
	 		addColumnSorterAndFilter1(c13, compare1);
		var c14 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Alt Text",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ALT_TEXT"),
			sortProperty: "ALT_TEXT",
			filterProperty: "ALT_TEXT",
			width: "100px",
		});
		oTable.addColumn(c14);
	 		addColumnSorterAndFilter1(c14, compare1);
		var c15 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Base qty",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BASE_QTY"),
			sortProperty: "BASE_QTY",
			filterProperty: "BASE_QTY",
			width: "100px",
		});
		oTable.addColumn(c15);
	 		addColumnSorterAndFilter1(c15, compare1);
		var c16 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Header Base Unit",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "HEADER_BASE"),
			sortProperty: "HEADER_BASE",
			filterProperty: "HEADER_BASE",
			width: "100px",
		});
		oTable.addColumn(c16);
	 		addColumnSorterAndFilter1(c16, compare1);
		var c17 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Requirement",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "REQUIREMENT"),
			sortProperty: "REQUIREMENT",
			filterProperty: "REQUIREMENT",
			width: "100px",
		});
		oTable.addColumn(c17);
	 		addColumnSorterAndFilter1(c17, compare1);
		var c18 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Requirement UOM",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "REQ_UOM"),
			sortProperty: "REQ_UOM",
			filterProperty: "REQ_UOM",
			width: "100px",
		});
		oTable.addColumn(c18);
	 		addColumnSorterAndFilter1(c18, compare1);
		var c19 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: " Reqd Qty(B",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "REQ_QTY"),
			sortProperty: "REQ_QTY",
			filterProperty: "REQ_QTY",
			width: "100px",
		});
		oTable.addColumn(c19);
	 		addColumnSorterAndFilter1(c19, compare1);
		var c20 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Lev",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "LEV"),
			sortProperty: "LEV",
			filterProperty: "LEV",
			width: "100px",
		});
		oTable.addColumn(c20);
	 		addColumnSorterAndFilter1(c20, compare1);
		var c21 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Item",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ITEM"),
			sortProperty: "ITEM",
			filterProperty: "ITEM",
			width: "100px",
		});
		oTable.addColumn(c21);
	 		addColumnSorterAndFilter1(c21, compare1);
		var c22 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Ict",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ICT"),
			sortProperty: "ICT",
			filterProperty: "ICT",
			width: "100px",
		});
		oTable.addColumn(c22);
	 		addColumnSorterAndFilter1(c22, compare1);
		var c23 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Matl Group",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "MATL_GROUP"),
			sortProperty: "MATL_GROUP",
			filterProperty: "MATL_GROUP",
			width: "100px",
		});
		oTable.addColumn(c23);
	 		addColumnSorterAndFilter1(c23, compare1);
		var c24 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "MTyp",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "MTYP"),
			sortProperty: "MTYP",
			filterProperty: "MTYP",
			width: "100px",
		});
		oTable.addColumn(c24);
	 		addColumnSorterAndFilter1(c24, compare1);
		var c25 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BOM Component",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BOM_COMPONENT"),
			sortProperty: "BOM_COMPONENT",
			filterProperty: "BOM_COMPONENT",
			width: "100px",
		});
		oTable.addColumn(c25);
	 		addColumnSorterAndFilter1(c25, compare1);
		var c26 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Object description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "OBJ_DESC"),
			sortProperty: "OBJ_DESC",
			filterProperty: "OBJ_DESC",
			width: "100px",
		});
		oTable.addColumn(c26);
	 		addColumnSorterAndFilter1(c26, compare1);
		var c27 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Size",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SIZE1"),
			sortProperty: "SIZE1",
			filterProperty: "SIZE1",
			width: "100px",
		});
		oTable.addColumn(c27);
	 		addColumnSorterAndFilter1(c27, compare1);
		var c28 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Container",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CONTAINER1"),
			sortProperty: "CONTAINER1",
			filterProperty: "CONTAINER1",
			width: "100px",
		});
		oTable.addColumn(c28);
	 		addColumnSorterAndFilter1(c28, compare1);
		var c29 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Packaging",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PACKAGING1"),
			sortProperty: "PACKAGING1",
			filterProperty: "PACKAGING1",
			width: "100px",
		});
		oTable.addColumn(c29);
	 		addColumnSorterAndFilter1(c29, compare1);
		var c30 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Shape",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SHAPE1"),
			sortProperty: "SHAPE1",
			filterProperty: "SHAPE1",
			width: "100px",
		});
		oTable.addColumn(c30);
	 		addColumnSorterAndFilter1(c30, compare1);
		var c31 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Beverage Product",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BEV_PROD"),
			sortProperty: "BEV_PROD",
			filterProperty: "BEV_PROD",
			width: "100px",
		});
		oTable.addColumn(c31);
	 		addColumnSorterAndFilter1(c31, compare1);
		var c32 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quantity",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "QUANTITY"),
			sortProperty: "QUANTITY",
			filterProperty: "QUANTITY",
			width: "100px",
		});
		oTable.addColumn(c32);
	 		addColumnSorterAndFilter1(c32, compare1);
		var c33 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Component UOM",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COMPONENT_UOM"),
			sortProperty: "COMPONENT_UOM",
			filterProperty: "COMPONENT_UOM",
			width: "100px",
		});
		oTable.addColumn(c33);
	 		addColumnSorterAndFilter1(c33, compare1);
		var c34 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Quantity",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "QUANTITY1"),
			sortProperty: "QUANTITY1",
			filterProperty: "QUANTITY1",
			width: "100px",
		});
		oTable.addColumn(c34);
	 		addColumnSorterAndFilter1(c34, compare1);
		var c35 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CmpS_I",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CMPS_I"),
			sortProperty: "CMPS_I",
			filterProperty: "CMPS_I",
			width: "100px",
		});
		oTable.addColumn(c35);
	 		addColumnSorterAndFilter1(c35, compare1);
		var c36 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Change No.",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CHANGE_NO"),
			sortProperty: "CHANGE_NO",
			filterProperty: "CHANGE_NO",
			width: "100px",
		});
		oTable.addColumn(c36);
	 		addColumnSorterAndFilter1(c36, compare1);
		var c37 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Valid",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "VALID"),
			sortProperty: "VALID",
			filterProperty: "VALID",
			width: "100px",
		});
		oTable.addColumn(c37);
	 		addColumnSorterAndFilter1(c37, compare1);
		var c38 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Valid to",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "VALID_TO"),
			sortProperty: "VALID_TO",
			filterProperty: "VALID_TO",
			width: "100px",
		});
		oTable.addColumn(c38);
	 		addColumnSorterAndFilter1(c38, compare1);
		var c39 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "By",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BY"),
			sortProperty: "BY",
			filterProperty: "BY",
			width: "100px",
		});
		oTable.addColumn(c39);
	 		addColumnSorterAndFilter1(c39, compare1);
		var c40 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Chngd on",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CHANGED"),
			sortProperty: "CHANGED",
			filterProperty: "CHANGED",
			width: "100px",
		});
		oTable.addColumn(c40);
	 		addColumnSorterAndFilter1(c40, compare1);
		var c41 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "By",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BY1"),
			sortProperty: "BY1",
			filterProperty: "BY1",
			width: "100px",
		});
		oTable.addColumn(c41);
	 		addColumnSorterAndFilter1(c41, compare1);
		var c42 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Created",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CREATED"),
			sortProperty: "CREATED",
			filterProperty: "CREATED",
			width: "100px",
		});
		oTable.addColumn(c42);
	 		addColumnSorterAndFilter1(c42, compare1);
		var c43 = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SLoc",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SLOC"),
			sortProperty: "SLOC",
			filterProperty: "SLOC",
			width: "100px",
		});
		oTable.addColumn(c43);
	 		addColumnSorterAndFilter1(c43, compare1);
		var jsonParams = {
			"allBOM": []
		};
	/*	var jsonModel = new sap.ui.model.json.JSONModel(jsonParams);
		oTable.setModel(jsonModel);
		oTable.bindRows("/allBOM");*/
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/bom1");
		oTable.sort(oTable.getColumns()[0]);
		this.getView().byId("bom_mat1").destroyContent();
		this.getView().byId("bom_mat1").addContent(oTable);
	},

	refreshBOMTable: function() {
		var that = this;
		var skipD = 0;
		//var topD = 25000;
		var num =0;
		sap.ui.getCore().byId("bom_data").getModel().getData().allBOM = [];
	    /*this.getView().getModel("df_request_model").read("/bom1", null, null, false, success1, failed1);
	    function success1(d){
	        console.log(d.results.length);
	    }
	    function failed1(){}*/
	    /*var aUrl = "https://irzabc674c4c.hana.ondemand.com/dfrequest3/services/dfrequest.xsodata/bom/$count";
        jQuery.ajax({ 
         url: aUrl,
         method: 'GET',
         async: false,
         dataType: "text",
         beforeSend: function(jqXHR) {
          jqXHR.setRequestHeader('X-CSRF-Token', 'Fetch');
         },
success:function(response ) {
        console.log( response ); // server response
        num = response;
    },
    error: function() {

											}
});*/
console.log(sap.ui.getCore().byId("bom_data").getModel().getData().allBOM.length);
console.log(num);
/*while(sap.ui.getCore().byId("bom_data").getModel().getData().allBOM.length < num){*/
    
		this.getView().getModel("df_request_model").read("/bom1", null, null, false, success, failed);

		function success(data) {
		    skipD = skipD + 35000;
			for (var i = 0; i < data.results.length; i++) {
				sap.ui.getCore().byId("bom_data").getModel().getData().allBOM.push(data.results[i]);
			}
			sap.ui.getCore().byId("bom_data").getModel().setData(sap.ui.getCore().byId("bom_data").getModel().getData());
		}

		function failed() {}
		
//}
this.getView().getModel("df_request_model").read("/bom_detail", null, null, false, s1, f1);

		function s1(d) {
			console.log(d);
			that.getView().byId("last_upload").setValue(d.results[0].DATE);
			that.getView().byId("last_upload_user").setValue(d.results[0].USER);
		}

		function f1() {}
	},
	onAfterRendering: function() {
	    this.createBOMTable();
	  /*  var that = this;
	    sap.ui.core.BusyIndicator.show(0);
	    	this.createBOMTable();
	    
	    setTimeout(function() {
that.refreshBOMTable();
	 										sap.ui.core.BusyIndicator.hide();
	 									}, 4000);*/
		app.setBusy(false);
		app2.setBusy(false);
	}
});