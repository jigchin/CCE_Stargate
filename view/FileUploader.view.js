sap.ui.jsview("demofileupload.FileUpload", {  
      getControllerName : function() {  
         return "demofileupload.FileUpload";  
      },   
      createContent : function(oController) {  
                          jQuery.sap.require("jquery.sap.resources");  
                  var oPanel = new sap.ui.commons.Panel("Panel",  
                                      {text: "File Upload",  
                                       height: "750px"  
                                      });  
                  var oSplitter = new sap.ui.commons.Splitter("ScreenSplitter",  
                                      {splitterOrientation: "Horizontal"});  
                  var oVertLayout = new sap.ui.commons.layout.VerticalLayout("VertLayout");  
                  oSplitter.addFirstPaneContent(oVertLayout);  
                  oPanel.addContent(oSplitter);  
                  /************************************************************************* 
                   * File Uploader Browse 
                   *************************************************************************/  
                  var oFLTxt = new sap.ui.commons.TextView("FileLoaderText", {text:"Please choose file for upload."});  
                  oVertLayout.addContent(oFLTxt);  
                  var oFileUploader = new sap.ui.commons.FileUploader("FileLoader");  
                  oFileUploader.attachUploadComplete(oController.doFileLoadComplete);       
                  oVertLayout.addContent(oFileUploader);  
                  /************************************************************************* 
                   * Upload button 
                   *************************************************************************/  
                  var oButton = new sap.ui.commons.Button({  
                            id : this.createId("UploadButton"),  
                            text : "Upload"  
                  });  
                  oButton.attachPress(oController.doFileUpload);  
                  oVertLayout.addContent(oButton);  
                  //To address cross-site request forgery security concern  
                  var oButton2 = new sap.ui.commons.Button({  
                            id : this.createId("UploadButton2"),  
                            text : "Upload 2"  
                  });  
                  oButton2.attachPress(oController.doFileUpload2);  
                  oVertLayout.addContent(oButton2);  
                 /************************************************************************* 
                   * Batch table 
                   *************************************************************************/  
                  var oModel = new sap.ui.model.odata.ODataModel("../Services/MY_FILE_UPLOAD_TABLE.xsodata",false);  
                  var oControl;  
                  var oTable = new sap.ui.table.Table("BatchTable", {tableId: "BatchTableId",visibleRowCount: 10});  
                  oTable.setTitle("Batch file data");  
                  oControl = new sap.ui.commons.TextField().bindProperty("value","BATCH_ID");  
                oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Batch ID"}),  
                                                                      template: oControl,  
                                                                      sortProperty: "BATCH_ID",  
                                                                      filterProperty: "BATCH_ID"  
                                                                                }));  
                oControl = new sap.ui.commons.TextField().bindProperty("value","COL1");  
                  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text: "Column 1"}),  
                                                                              template: oControl,  
                                                                              sortProperty: "COL1",  
                                                                              filterProperty: "COL1"  
                                                                                }));  
                  oTable.setModel(oModel);  
                  oTable.bindRows("/FILE_UPLOAD_TABLE");  
                  oSplitter.addSecondPaneContent(oTable);  
                  return oPanel;  
        }       
});