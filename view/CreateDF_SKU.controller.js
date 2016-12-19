sap.ui.controller("view.CreateDF_SKU", {

	onInit: function() {
		var oModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		this.getView().setModel(oModel, "df_request_model");
		
	},
	onSelectCE_SKU: function() {

		this.getView().byId("sku_database").addStyleClass("hideClass");
		this.getView().byId("sku_database").removeStyleClass("showClass");
		this.getView().byId("sku_data_table").addStyleClass("showClass");
		this.getView().byId("sku_data_table").removeStyleClass("hideClass");
		this.createSKUTable();
	//	this.refreshSKUTable();
		var that = this;
		var model = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model.read("/sku_detail", null, null, true, sSKU, fSKU);
		function sSKU(data) {
			console.log("in SKU Disp");
			if (data.results.length > 0) {
				console.log(data);
				console.log(data.results[0].DATE);
				that.getView().byId("last_upload_sku").setValue(data.results[0].DATE);
				that.getView().byId("last_upload_user_sku").setValue(data.results[0].USER);
			}
		}
		function fSKU() {}
	},
	createSKUTable: function() {
        
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
	 					if (filterProperty === "SAP_CODE") {
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
	 					if (filterProperty === "BAP_CODE") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(BAP_CODE)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[1].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[1].setFiltered(true);
	 							}
	 						}
	 					}

	 					if (filterProperty === "COUNTRY") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(COUNTRY)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[2].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[2].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "DESC") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(DESC)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[3].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[3].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "FLAVOUR") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(FLAVOUR)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[4].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[4].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CONTAINER") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CONTAINER)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[5].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[5].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "PACK") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(PACK)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[6].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[6].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "PACKAGE") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(PACKAGE)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[7].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[7].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CPP_RAW") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CPP_RAW)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[8].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[8].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CPP_UNIT") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CPP_UNIT)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[10].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[10].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CPP_CCE") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CPP_CCE)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[9].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[9].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "EAN") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(EAN)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[11].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[11].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "ZCU") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(ZCU)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[12].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[12].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "CS") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(CS)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[13].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[13].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "PAL") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(PAL)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() + "'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[14].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[14].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "SHELF") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SHELF)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[15].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[15].setFiltered(true);
	 							}
	 						}
	 					}
	 					if (filterProperty === "SITES") {
	 						for (var i = 0; i < filterVals.length; i++) {
	 							oFilter = new sap.ui.model.Filter("tolower(SITES)", sap.ui.model.FilterOperator.Contains, "'" + filterVals[i].toLowerCase() +
	 								"'");
	 							finalFilter.push(oFilter);
	 							if (filterValue === "") {
	 								oTable.getColumns()[16].setFiltered(false);
	 							} else {
	 								oTable.getColumns()[16].setFiltered(true);
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
	 		
		var oTable = new sap.ui.table.Table({
			//title: "",
			visibleRowCount: 5,
			navigationMode : sap.ui.table.NavigationMode.Paginator
		});
		/*oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SAP_CODE"),
			sortProperty: "SAP_CODE",
			filterProperty: "SAP_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "BAP Code",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BAP_CODE"),
			sortProperty: "BAP_CODE",
			filterProperty: "BAP_CODE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "SAP Country",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY"),
			sortProperty: "COUNTRY",
			filterProperty: "COUNTRY",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Description",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DESC"),
			sortProperty: "DESC",
			filterProperty: "DESC",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Flavour",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "FLAVOUR"),
			sortProperty: "FLAVOUR",
			filterProperty: "FLAVOUR",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Container Size",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CONTAINER"),
			sortProperty: "CONTAINER",
			filterProperty: "CONTAINER",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Product Pack",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PACK"),
			sortProperty: "PACK",
			filterProperty: "PACK",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Package Type",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PACKAGE"),
			sortProperty: "PACKAGE",
			filterProperty: "PACKAGE",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CPP (Raw Cases)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CPP_RAW"),
			sortProperty: "CPP_RAW",
			filterProperty: "CPP_RAW",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CPP (CCE Cases)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CPP_CCE"),
			sortProperty: "CPP_CCE",
			filterProperty: "CPP_CCE",
			width: "100px"
		}));
			oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "CPP (Unit Cases)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CPP_UNIT"),
			sortProperty: "CPP_UNIT",
			filterProperty: "CPP_UNIT",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "EAN (EA)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "EAN"),
			sortProperty: "EAN",
			filterProperty: "EAN",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "EAN PAC (ZCU)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ZCU"),
			sortProperty: "ZCU",
			filterProperty: "ZCU",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ITF Case (CS)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CS"),
			sortProperty: "CS",
			filterProperty: "CS",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "ITF Pallet (PAL)",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PAL"),
			sortProperty: "PAL",
			filterProperty: "PAL",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: " Shelf-Life",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SHELF"),
			sortProperty: "SHELF",
			filterProperty: "SHELF",
			width: "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({
				text: "Producing Sites and Lines",
				wrapping: true
			}),
			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SITES"),
			sortProperty: "SITES",
			filterProperty: "SITES",
			width: "100px"
		}));
		*/
		var c1 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "SAP Code",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SAP_CODE"),
	 			sortProperty: "SAP_CODE",
	 			filterProperty: "SAP_CODE",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c1);
	 		addColumnSorterAndFilter1(c1, compare1);
	 		var c2 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "BAP Code",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "BAP_CODE"),
	 			sortProperty: "BAP_CODE",
	 			filterProperty: "BAP_CODE",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c2);
	 		addColumnSorterAndFilter1(c2, compare1);
	 		var c3 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "SAP Country",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "COUNTRY"),
	 			sortProperty: "COUNTRY",
	 			filterProperty: "COUNTRY",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c3);
	 		addColumnSorterAndFilter1(c3, compare1);
	 		var c4 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "Product Description",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "DESC"),
	 			sortProperty: "DESC",
	 			filterProperty: "DESC",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c4);
	 		addColumnSorterAndFilter1(c4, compare1);
	 		var c5 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "Flavour",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "FLAVOUR"),
	 			sortProperty: "FLAVOUR",
	 			filterProperty: "FLAVOUR",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c5);
	 		addColumnSorterAndFilter1(c5, compare1);
	 		var c6 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "Container Size",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CONTAINER"),
	 			sortProperty: "CONTAINER",
	 			filterProperty: "CONTAINER",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c6);
	 		addColumnSorterAndFilter1(c6, compare1);
	 		var c7 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "Product Pack",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PACK"),
	 			sortProperty: "PACK",
	 			filterProperty: "PACK",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c7);
	 		addColumnSorterAndFilter1(c7, compare1);
	 		var c8 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "Package Type",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PACKAGE"),
	 			sortProperty: "PACKAGE",
	 			filterProperty: "PACKAGE",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c8);
	 		addColumnSorterAndFilter1(c8, compare1);
	 		var c9 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "CPP (Raw Cases)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CPP_RAW"),
	 			sortProperty: "CPP_RAW",
	 			filterProperty: "CPP_RAW",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c9);
	 		addColumnSorterAndFilter1(c9, compare1);
	 		var c10 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "CPP (CCE Cases)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CPP_CCE"),
	 			sortProperty: "CPP_CCE",
	 			filterProperty: "CPP_CCE",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c10);
	 		addColumnSorterAndFilter1(c10, compare1);
	 		var c11 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "CPP (Unit Cases)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CPP_UNIT"),
	 			sortProperty: "CPP_UNIT",
	 			filterProperty: "CPP_UNIT",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c11);
	 		addColumnSorterAndFilter1(c11, compare1);
	 		var c12 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "EAN (EA)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "EAN"),
	 			sortProperty: "EAN",
	 			filterProperty: "EAN",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c12);
	 		addColumnSorterAndFilter1(c12, compare1);
	 		var c13 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "EAN PAC (ZCU)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "ZCU"),
	 			sortProperty: "ZCU",
	 			filterProperty: "ZCU",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c13);
	 		addColumnSorterAndFilter1(c13, compare1);
	 		var c14 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "ITF Case (CS)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "CS"),
	 			sortProperty: "CS",
	 			filterProperty: "CS",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c14);
	 		addColumnSorterAndFilter1(c14, compare1);
	 		var c15 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "ITF Pallet (PAL)",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "PAL"),
	 			sortProperty: "PAL",
	 			filterProperty: "PAL",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c15);
	 		addColumnSorterAndFilter1(c15, compare1);
	 		var c16 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: " Shelf-Life",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SHELF"),
	 			sortProperty: "SHELF",
	 			filterProperty: "SHELF",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c16);
	 		addColumnSorterAndFilter1(c16, compare1);
	 		var c17 = new sap.ui.table.Column({
	 			label: new sap.ui.commons.Label({
	 				text: "Producing Sites and Lines",
	 				wrapping: true
	 			}),
	 			template: new sap.ui.commons.TextView().addStyleClass("wordBreak").bindProperty("text", "SITES"),
	 			sortProperty: "SITES",
	 			filterProperty: "SITES",
	 			width: "100px"
	 		});
	 		oTable.addColumn(c17);
	 		addColumnSorterAndFilter1(c17, compare1);


		/*var jsonParams = {
			"allSKU": []
		};
		var jsonModel = new sap.ui.model.json.JSONModel(jsonParams);
		oTable.setModel(jsonModel);

		oTable.bindRows("/allSKU");*/
		var jsonModel = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		oTable.setModel(jsonModel);
		oTable.bindRows("/sku_database");
		this.getView().byId("sku_tab2").destroyContent();
		this.getView().byId("sku_tab2").addContent(oTable);
	},
 
/*	refreshSKUTable: function() {
		sap.ui.getCore().byId("sku_data").getModel().getData().allSKU = [];
		this.getView().getModel("df_request_model").read("/sku_database", null, null, false, success, failed);

		function success(data) {
			for (var i = 0; i < data.results.length; i++) {
				sap.ui.getCore().byId("sku_data").getModel().getData().allSKU.push(data.results[i]);
			}
			sap.ui.getCore().byId("sku_data").getModel().setData(sap.ui.getCore().byId("sku_data").getModel().getData());
		}

		function failed() {

		}
	},*/
	onSelectCountry: function(oEvent) {
		var country_sel = oEvent.getSource().getText();
		console.log("selected country");

		var model1 = new sap.ui.model.odata.ODataModel("services/dfrequest.xsodata");
		model1.read("/sku_url('" + country_sel + "')", null, null, false, cSuccess1, cFailed1);

		function cSuccess1(data) {
			var url_country = data.URL;
			console.log(url_country);
			window.open(url_country);
		}

		function cFailed1() {}
	},
	doFileLoadCompleteSKU: function(oEvent) {
		jQuery.sap.require("sap.ui.commons.MessageBox");
		var sResponse = oEvent.getParameter("response");
		console.log(sResponse);
		sap.ui.commons.MessageBox.show(sResponse, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		console.log("here in upload");
		//this.refreshSKUTable();
		this.createSKUTable();
		var user_sku;
		var date_sku;
		var date_sku1 = new Date();
		var that = this;
		var month_sku = date_sku1.getMonth() + 1;
		date_sku = date_sku1.getDate() + "/" + month_sku + "/" + date_sku1.getFullYear()
		var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
		//	user_bom = (JSON.parse(userModel.getJSON()).username);
		userModel.attachRequestCompleted(function() {
			user_sku = (JSON.parse(userModel.getJSON()).username);
			console.log(user_sku);
			var input = {
				"USER": user_sku,
				"DATE": date_sku
			};
			that.getView().byId("last_upload_user_sku").setValue(user_sku);
			var model = that.getView().getModel("df_request_model");
			model.read("/sku_detail", null, null, false, s1, f1);

			function s1(d1) {
				if (d1.results.length > 0) {
					for (var x = 0; x < d1.results.length; x++) {
						model.remove("/sku_detail(USER='" + user_sku + "')", null, delSuccess, delFailed);

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

			model.create("/sku_detail", input, null, createSuccess, createFailed);

			function createSuccess() {
				console.log("details added SKU");
			}

			function createFailed() {}
		});
		console.log(user_sku);

		that.getView().byId("last_upload_sku").setValue(date_sku);

	},
	doFileUploadSKU: function() {
		var that = this;
		console.log("upload SKU");
		var url = "/dfrequest3/services/getFileSKU.xsjs";
		var fileLoader = this.getView().byId("fileUploader_sku");

		var fileName = fileLoader.getValue();
		console.log(fileName);
		if (fileName == "") {
			jQuery.sap.require("sap.ui.commons.MessageBox");
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			var dataModel = this.getView().getModel("df_request_model");
			/*dataModel.read("/sku_database", null, null, false, delSuccess, delFailed);

			function delSuccess(data) {
				if (data.results.length > 0) {
					for (var i = 0; i < data.results.length; i++) {
						dataModel.remove("/sku_database('" + data.results[i].SAP_CODE + "')", null, s1, f1)

						function s1() {
							console.log("del success" + data.results[i].SAP_CODE);
						}

						function f1() {
							console.log("del fail");
						}
					}
				}
			}

			function delFailed() {
				console.log("del fail 1");
			}*/
            var urlSKU = "/dfrequest3/services/deleteSKU.xsjs";
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
            this.createSKUTable();
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
	onAfterRendering: function() {
		app.setBusy(false);
		app2.setBusy(false);

	}
});