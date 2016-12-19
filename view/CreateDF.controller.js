					  var highlightRows = [];
					  var pdf_data = [];var screen = 0;
					  var home_test;
					  var global = "";
					  var global1 = "";
					  var global2 = "";
					  var finished_data = [];
					  var residual_data = [];
					  var residual_link = [];
					  var finished_data_new = [];
					  var tech1_data = [];
					  var tech1_link = [];
					  var cannibalised_data = [];
					  var tech2_data = [];
					  var tech2_link = [];
					  var finished_site_data = [];
					  var tech3_data = [];
					  var tech3_link = [];
					  var impacted_data = [];
					  var tech4_data = [];
					  var tech4_link = [];
					  var volumes_data = [];
					  var tech5_data = [];
					  var tech5_link = [];
					  var volumes_data_no = [];
					  var ms_data = [];
					  var ms_link = [];
					  var sku_no = [];
					  var new_entry_data = [];
					  var pp_data = [];
					  var pp_link = [];
					  var sku = [];
					  var duplicateDFID;
					  var new_link_data = [];
					  var sites_data = [];
					  var producing_site = [];
					  var search = 0;
					  var myTableIDNum = 0;
					  var allTableIDNum = 0;
					  var hTableIDNum = 0;
					  var CompTableIDNum = 0;
					  var MapTableIDNum = 0;
					  var PastTableIDNum = 0;
					  var savedDFID_selected;
					  var submittedDFID_selected;
					  var rejectedDFID_selected;
					  var testDFID_selected;
					  var df_id_feedback;
					  var df_id_feedback1;
					  var df_id_feedback2;
					  var df_id_feedback3;
					  var df_id_feedback4;
					  var user_department;
					  var seldata_mapc;
					  var techni_date_new = 0;
					  var status_feedback;
					  var first_rec;
					  var refresh_done;
					  var df_id_present;
					  var techni_date_temp = 0;
					  var creation_date1;
					  var saved_date1;
					  var submit_date1;
					  var submit_approval_date1;
					  var myID;
					  var allID;
					  var myAppID;
					  var AllAppID;
					  var histID;
					  var compID;
					  var CompAppID;
					  var mapID;
					  var MapAppID;
					  var pastID;
					  var PastAppID;
					  var MyVariantAppNew;
					  var AllVariantAppNew;
					  var CompVariantAppNew;
					  var MapVariantAppNew;
					  var PastVariantAppNew;
					  var myAppTableIDNum = 0;
					  var AllAppTableIDNum = 0;
					  var AllAppIDNum = 0;
					  var CompAppTableIDNum = 0;
					  var CompAppIDNum = 0;
					  var MapAppTableIDNum = 0;
					  var MapAppIDNum = 0;
					  var PastAppTableIDNum = 0;
					  var PastAppIDNum = 0;
					  var idPersonalization;
					  var df;
					  var title;
					  var nim;
					  var st;
					  var type_tbl;
					  var theme_tbl;
					  var app_tbl;
					  var dest_tbl;
					  var prj_grp;
					  var m;
					  var mb;
					  var ini;
					  var inid;
					  var idPersonalization1;
					  var df1;
					  var title1;
					  var nim1;
					  var st1;
					  var type_tbl1;
					  var theme_tbl1;
					  var app_tbl1;
					  var dest_tbl1;
					  var prj_grp1;
					  var m1;
					  var mb1;
					  var ini1;
					  var inid1;
					  var idPersonalization2;
					  var df2;
					  var title2;
					  var nim2;
					  var st2;
					  var type_tbl2;
					  var theme_tbl2;
					  var app_tbl2;
					  var dest_tbl2;
					  var prj_grp2;
					  var ini2;
					  var inid2;
					  var idPersonalization3;
					  var df3;
					  var title3;
					  var nim3;
					  var st3;
					  var type_tbl3;
					  var theme_tbl3;
					  var app_tbl3;
					  var dest_tbl3;
					  var prj_grp3;
					  var ini3;
					  var inid3;
					  var idPersonalization5;
					  var df5;
					  var title5;
					  var nim5;
					  var st5;
					  var type_tbl5;
					  var theme_tbl5;
					  var app_tbl5;
					  var dest_tbl5;
					  var prj_grp5;
					  var idPersonalization6;
					  var df6;
					  var title6;
					  var nim6;
					  var st6;
					  var type_tbl6;
					  var theme_tbl6;
					  var app_tbl6;
					  var dest_tbl6;
					  var prj_grp6;
					  var idPersonalization7;
					  var df7;
					  var title7;
					  var nim7;
					  var st7;
					  var type_tbl7;
					  var theme_tbl7;
					  var app_tbl7;
					  var dest_tbl7;
					  var prj_grp7;
					  var ini3;
					  var inid3;
					  var idPersonalization4;
					  var dbcols;
					  var country_pie1;
					  var nim_pie1;
					  var country_pie11 = 0;
					  var nim_pie11 = 0;
					  var country_bar1;
					  var country_bar_ind;
					  var nim_bar_ind;
					  var nim_bar1;
					  var country_bar2;
					  var nim_bar_ind1;
					  var nim_bar2;
					  var week_ind;
					  var week_bar;
					  var year_bar;
					  var week_ind1;
					  var week_bar1;
					  var year_bar1;
					  var PCB_ind;
					  var from_date;
					  var from_date_ind;
					  var to_date;
					  var to_date_ind;
					  var mapc_country;
					  var mapc_country_ind;
					  var modified;
					  var modified_by;
					  var evaluation_completion_date;
					  var NIM_CM;
					  var LEAD_COUNTRY;
					  var ASSIGNMENT_DELAY;
					  var PROJECT_TYPE;
					  var MFG_SOURCE;
					  var REPACKING;
					  var FIRST_PROD;
					  var FIRST_DESP;
					  var NUM_SKU;
					  var CONTINGENCY;
					  var NUM_ARTWORKS;

					  jQuery.sap.require("sap.m.TablePersoController");
					  jQuery.sap.require("sap.m.TablePersoDialog");
					   //jQuery.sap.require("sap.ui.comp.variants");
					  jQuery(document).ajaxComplete(function(e, jqXHR) {
					  	if (jqXHR.getResponseHeader("com.sap.cloud.security.login")) {
					  		alert("Session is expired, page shall be reloaded.");
					  		window.location.reload();
					  	}

					  });
					  window.onbeforeunload = function(e) {
					  	var e = e || window.event;
					  	var msg = "Do you really want to leave this page?"
					  	if (e) {
					  		e.returnValue = msg;
					  	}
					  	return msg;
					  };
					  sap.ui.controller("view.CreateDF", {

					  	logOff: function() {
					  		logOffFunction();
					  	},

					  	onInit: function() {
					  		var that = this;
					  		this.getView().byId("text").setText(
					  			"Welcome to the Home Page of CCEP New Initiatives! Please use the menu button for further options");
					  		
					  		this.getView().byId("NIM_create_form").addStyleClass("hideClass");
					  		
					  		this.getView().byId("NIM_create_form").removeStyleClass("showClass");
					  		this.getView().byId("nim_buttons_form").addStyleClass("hideClass");
					  		this.getView().byId("nim_buttons_form").removeStyleClass("showClass");
					  		this.getView().byId("User_create_form").addStyleClass("hideClass");
					  		this.getView().byId("User_create_form").removeStyleClass("showClass");
					  		this.getView().byId("user_buttons_form").addStyleClass("hideClass");
					  		this.getView().byId("user_buttons_form").removeStyleClass("showClass");
					  		this.getView().byId("previous_buttons_form").addStyleClass("hideClass");
					  		this.getView().byId("previous_buttons_form").removeStyleClass("showClass");
					  		this.getView().byId("previous_records_mm").addStyleClass("hideClass");
					  		this.getView().byId("previous_records_mm").removeStyleClass("showClass");
					  		this.getView().byId("Userform").addStyleClass("hideClass"); //hide();
					  		
					  		this.getView().byId("Iconheader").addStyleClass("text");
					  		this.getView().byId("text").addStyleClass("text");


					  		var roleModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getUserRoles.xsjs", false);
					  		var url = "/dfrequest3/services/getUserRoles.xsjs"
					  		jQuery.ajax({
					  			url: url,
					  			method: 'GET',
					  			dataType: 'text',
					  			success: usersuccess,
					  			failed: userfailed
					  		})

					  		function usersuccess(data) {
					  			console.log(data);
					  			console.log("in user role");
					  			    
					  				sap.ui.getCore().byId("CreateDF--request_button").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_Request--create").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_Request--my").setVisible(false);
									sap.ui.getCore().byId("CreateDF_Request--all").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Request--historical").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF--workflow_button").setVisible(false);
									sap.ui.getCore().byId("CreateDF_evaluation--allwrkflw").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_evaluation--cmpltdeval").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_evaluation--mywrkflw").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_evaluation--pasteval").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_evaluation--maptable").setVisible(false);
					  				sap.ui.getCore().byId("CreateDF_evaluation--mapxtable").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--activityTracker_button").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--sku_meeting").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--forms_button").setVisible(false);
									sap.ui.getCore().byId("CreateDF_BOM--fileUploader_bom").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_BOM--upload_bom").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--KBI_Main_Page").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--Reports_button").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(false);
									sap.ui.getCore().byId("CreateDF_Admin--UserProf").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--country_sku_DB").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--admin").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--nim_admin").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--mat_sec").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--commodi").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--grp_dept").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--dept_loc").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--location").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--loc_dest").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--repack").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--stake_country").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--stake_site").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--x_border").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_Admin--cat_scat").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_SKU--fileUploader_sku").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF_SKU--upload_sku").setVisible(false);
                                    sap.ui.getCore().byId("CreateDF--SKU_database").setVisible(false);
                                
                                if (data.indexOf("dfrequest3::Admin_All") > -1){
                                    sap.ui.getCore().byId("CreateDF--request_button").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--create").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--my").setVisible(true);
									sap.ui.getCore().byId("CreateDF_Request--all").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Request--historical").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF--workflow_button").setVisible(true);
									sap.ui.getCore().byId("CreateDF_evaluation--allwrkflw").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--cmpltdeval").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--mywrkflw").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--pasteval").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--maptable").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--activityTracker_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--sku_meeting").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--forms_button").setVisible(true);
									sap.ui.getCore().byId("CreateDF_BOM--fileUploader_bom").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_BOM--upload_bom").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--KBI_Main_Page").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--Reports_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(true);
									sap.ui.getCore().byId("CreateDF_Admin--UserProf").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--country_sku_DB").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--admin").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--mat_sec").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--commodi").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--grp_dept").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--dept_loc").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--location").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--loc_dest").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--repack").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--stake_country").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--stake_site").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--x_border").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--cat_scat").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_SKU--fileUploader_sku").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_SKU--upload_sku").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--SKU_database").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_evaluation--mapxtable").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--nim_admin").setVisible(true);
                                }    
                                if (data.indexOf("dfrequest3:Initiator") > -1) {
                                    sap.ui.getCore().byId("CreateDF--request_button").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--create").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--my").setVisible(true);
					  				
                                    sap.ui.getCore().byId("CreateDF--SKU_database").setVisible(true);
					  			}
					  			if (data.indexOf("dfrequest3::STAKEHOLDER") > -1) {
                                    
                                    sap.ui.getCore().byId("CreateDF--workflow_button").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--allwrkflw").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--cmpltdeval").setVisible(true);
					  				
					  				sap.ui.getCore().byId("CreateDF--activityTracker_button").setVisible(true);
                                   
                                    sap.ui.getCore().byId("CreateDF--forms_button").setVisible(true);
                                    
                                    sap.ui.getCore().byId("CreateDF--SKU_database").setVisible(true);
                                   
					  			}
					  			if (data.indexOf("dfrequest3::NIM") > -1) {
					  				sap.ui.getCore().byId("CreateDF--request_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--workflow_button").setVisible(true);
					  				
					  				sap.ui.getCore().byId("CreateDF_evaluation--mywrkflw").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--pasteval").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_evaluation--maptable").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF--activityTracker_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--sku_meeting").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--forms_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--KBI_Main_Page").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--Reports_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_evaluation--mapxtable").setVisible(true);
                                   
                                   
                                    sap.ui.getCore().byId("CreateDF--SKU_database").setVisible(true);
                                   
					  				sap.ui.getCore().byId("CreateDF_Request--all").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--create").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--my").setVisible(true);
					  				sap.ui.getCore().byId("CreateDF_Request--historical").setVisible(true);

					  			}
					  			if (data.indexOf("dfrequest3::Admin_User_Profiles") > -1) {
					  			    
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--UserProf").setVisible(true);
                                    
					  			}
					  			if (data.indexOf("dfrequest3::Admin_SKU_Database") > -1) {
					  			    
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF--SKU_database").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--country_sku_DB").setVisible(true);
                                    
                                    sap.ui.getCore().byId("CreateDF_SKU--fileUploader_sku").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_SKU--upload_sku").setVisible(true);
					  			}
					  			if (data.indexOf("dfrequest3::Admin_BOM_Materials") > -1) {
					  			    
                                    sap.ui.getCore().byId("CreateDF--forms_button").setVisible(true);
                                    
                                    sap.ui.getCore().byId("CreateDF_BOM--fileUploader_bom").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_BOM--upload_bom").setVisible(true);
                                    
					  			}
					  			
					  			if (data.indexOf("dfrequest3::Admin_Form") > -1) {
					  			   
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--nim_admin").setVisible(true);
                                    
                                    sap.ui.getCore().byId("CreateDF_Admin--admin").setVisible(true);
                                    
					  			}
					  			if (data.indexOf("dfrequest3::Admin_Material_Supply") > -1) {
					  			    
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(true);
                                    
                                    sap.ui.getCore().byId("CreateDF_Admin--mat_sec").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--commodi").setVisible(true);
                                   
					  			}
					  			if (data.indexOf("dfrequest3::Admin_Stakeholder_Evaluation_Tool") > -1) {
					  			   
                                    sap.ui.getCore().byId("CreateDF--admin_button").setVisible(true);
                                    
                                    sap.ui.getCore().byId("CreateDF_Admin--grp_dept").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--dept_loc").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--location").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--loc_dest").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--repack").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--stake_country").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--stake_site").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--x_border").setVisible(true);
                                    sap.ui.getCore().byId("CreateDF_Admin--cat_scat").setVisible(true);
					  			}
					  		}

					  		function userfailed(data) {
					  			console.log(data);
					  			console.log("in user role fail");
					  		}
					  	},
						onSelectChanged: function(oEvent) {
					  		var key = oEvent.getParameters().key;
					  		if (key == "home_button") {
					  			this.getView().byId("nim_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("nim_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("previous_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_records_mm").addStyleClass("hideClass");
					  			this.getView().byId("previous_records_mm").removeStyleClass("showClass");
					  			this.getView().byId("NIM_create_form").addStyleClass("hideClass");
					  			this.getView().byId("NIM_create_form").removeStyleClass("showClass");
					  			this.getView().byId("User_create_form").addStyleClass("hideClass");
					  			this.getView().byId("User_create_form").removeStyleClass("showClass");
					  			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_records_mm").addStyleClass("hideClass");
					  			this.getView().byId("previous_records_mm").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage1").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage1").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage2").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage2").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage4").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage4").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage3").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage3").removeStyleClass("showClass");
					  			this.getView().byId("home_form").addStyleClass("showClass"); //hide();
					  			this.getView().byId("activity_form").addStyleClass("hideClass"); //show();
					  			this.getView().byId("kbiPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage").removeStyleClass("showClass");
					  			this.getView().byId("tonica_form").addStyleClass("hideClass"); //hide();
					  			this.getView().byId("request_form").addStyleClass("hideClass"); //hide();
					  			this.getView().byId("request_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("home_form").removeStyleClass("hideClass");
					  			this.getView().byId("request_form").removeStyleClass("showClass");
					  			this.getView().byId("activity_form").removeStyleClass("showClass"); //show();
					  			this.getView().byId("tonica_form").removeStyleClass("showClass"); //hide();
					  			this.getView().byId("request_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("dfSplit").addStyleClass("hideClass");
					  			this.getView().byId("dfSplit").removeStyleClass("showClass");
					  			this.getView().byId("adminSplit").addStyleClass("hideClass");
					  			this.getView().byId("adminSplit").removeStyleClass("showClass");
					  			this.getView().byId("kbiMainPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiMainPage").removeStyleClass("showClass");
					  			this.getView().byId("NIM_form").addStyleClass("hideClass");
					  			this.getView().byId("NIM_form").removeStyleClass("showClass");
					  			//			this.getView().byId("bom_material").addStyleClass("hideClass");
					  			//			this.getView().byId("bom_material").removeStyleClass("showClass");
					  			this.getView().byId("sku_database").addStyleClass("hideClass");
					  			this.getView().byId("sku_database").removeStyleClass("showClass");
					  			this.getView().byId("sku_data_table").addStyleClass("hideClass");
					  			this.getView().byId("sku_data_table").removeStyleClass("showClass");

					  		} else if (key == "request_button") {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			global1 = global;
					  			global = "request";
					  			this.getView().byId("home_form").setVisible(false);
					  			//.addPage(page2); // add both pages to the App
					  			app.setBusy(true);
					  			app2.setHeight('100%');
					  			app2.setBusy(true);
					  			jQuery.sap.delayedCall(10, this, function() {
					  				sap.ui.getCore().byId("CreateDF_Request").getController().onDFIconClick();
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_Request");
					  			});
					  		}
					  		else if (key == "admin_button") {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			global1 = global;
					  			global = "request";
					  			this.getView().byId("home_form").setVisible(false);
					  			//.addPage(page2); // add both pages to the App
					  			app.setBusy(true);
					  			app2.setHeight('100%');
					  			app2.setBusy(true);
					  			jQuery.sap.delayedCall(10, this, function() {
					  				//sap.ui.getCore().byId("CreateDF_Admin").getController().onDFIconClick();
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_Admin");
					  			});
					  		} 
					  		else if (key == "workflow_button") {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			global1 = global;
					  			global = "workflow"
					  			this.getView().byId("home_form").setVisible(false);
					  			//app.setBusy(true);
					  			app2.setHeight('100%');
					  			//app2.setBusy(true);
					  		/*	jQuery.sap.delayedCall(1, this, function() {*/
					  				sap.ui.getCore().byId("CreateDF_evaluation").getController().onDFEvalClick();
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_evaluation");
					  			/*});*/

					  		} else if (key == 'activityTracker_button') {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			sap.ui.core.BusyIndicator.show(0);
					  			global1 = global;
					  			global = "database"
					  			this.getView().byId("home_form").setVisible(false);
					  			app.setBusy(true);
					  			app2.setHeight('200%');
					  			app2.setBusy(true);
					  			setTimeout(function() {

					  				sap.ui.core.BusyIndicator.hide();
					  			}, 2000);
					  			jQuery.sap.delayedCall(10, this, function() {
					  				//   $.append(home_test);
					  				//   home_test.appendTo($("#bodyid"));
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_platform");
					  			});
					  		} 
					  		else if (key == "sku_meeting_button") {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			global1 = global;
					  			global = "meeting"
					  			this.getView().byId("home_form").setVisible(false);
					  			app.setBusy(true);
					  			app2.setHeight('400%');
					  			app2.setBusy(true);
					  			jQuery.sap.delayedCall(10, this, function() {
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_Meeting");
					  			});

					  		} else if (key == 'Test') {
					  			this._showCharts2();
					  			this.getView().byId("kbiPage2").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage2").removeStyleClass("showClass");
					  			this.getView().byId("nim_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("nim_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("previous_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("NIM_create_form").addStyleClass("hideClass");
					  			this.getView().byId("NIM_create_form").removeStyleClass("showClass");
					  			this.getView().byId("User_create_form").addStyleClass("hideClass");
					  			this.getView().byId("User_create_form").removeStyleClass("showClass");
					  			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_records_mm").addStyleClass("hideClass");
					  			this.getView().byId("previous_records_mm").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage4").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage4").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage3").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage3").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage1").addStyleClass("showClass");
					  			this.getView().byId("kbiPage1").removeStyleClass("hideClass");
					  			this.getView().byId("kbiPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage").removeStyleClass("showClass");
					  			this.getView().byId("home_form").addStyleClass("hideClass");
					  			this.getView().byId("activity_form").addStyleClass("hideClass"); //show();
					  			this.getView().byId("tonica_form").addStyleClass("hideClass"); //hide();
					  			this.getView().byId("request_form").addStyleClass("hideClass"); //hide();
					  			this.getView().byId("request_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("home_form").removeStyleClass("showClass");
					  			this.getView().byId("request_form").removeStyleClass("showClass");
					  			this.getView().byId("tonica_form").removeStyleClass("showClass"); //hide();
					  			this.getView().byId("activity_form").removeStyleClass("showClass"); //show();
					  			this.getView().byId("request_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("dfSplit").addStyleClass("hideClass");
					  			this.getView().byId("dfSplit").removeStyleClass("showClass");
					  			this.getView().byId("workflowSplit").removeStyleClass("showClass");
					  			this.getView().byId("workflowSplit").addStyleClass("hideClass");
					  			this.getView().byId("wrkflwmain").addStyleClass("hideClass");
					  			this.getView().byId("myAppPage").removeStyleClass("showClass");
					  			this.getView().byId("myAppPage").addStyleClass("hideClass");
					  			this.getView().byId("allAppPage").removeStyleClass("showClass");
					  			this.getView().byId("allAppPage").addStyleClass("hideClass");
					  			this.getView().byId("compAppPage").removeStyleClass("showClass");
					  			this.getView().byId("compAppPage").addStyleClass("hideClass");
					  			this.getView().byId("mapAppPage").addStyleClass("hideClass");
					  			this.getView().byId("mapAppPage").removeStyleClass("showClass");
					  			this.getView().byId("pastAppPage").addStyleClass("hideClass");
					  			this.getView().byId("pastAppPage").removeStyleClass("showClass");
					  			this.getView().byId("MAPCPage").removeStyleClass("showClass");
					  			this.getView().byId("MAPCPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiMainPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiMainPage").removeStyleClass("showClass");
					  			this.getView().byId("NIM_form").addStyleClass("hideClass");
					  			this.getView().byId("NIM_form").removeStyleClass("showClass");
					  			this.getView().byId("adminSplit").addStyleClass("hideClass");
					  			this.getView().byId("adminSplit").removeStyleClass("showClass");
					  			this.getView().byId("sku_database").addStyleClass("hideClass");
					  			this.getView().byId("sku_database").removeStyleClass("showClass");
					  		} else if (key == 'Test1') {
					  			this._showCharts1();
					  			this.getView().byId("kbiPage2").addStyleClass("showClass");
					  			this.getView().byId("kbiPage2").removeStyleClass("hideClass");
					  			this.getView().byId("nim_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("nim_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("previous_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("NIM_create_form").addStyleClass("hideClass");
					  			this.getView().byId("NIM_create_form").removeStyleClass("showClass");
					  			this.getView().byId("User_create_form").addStyleClass("hideClass");
					  			this.getView().byId("User_create_form").removeStyleClass("showClass");
					  			this.getView().byId("user_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("user_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("previous_records_mm").addStyleClass("hideClass");
					  			this.getView().byId("previous_records_mm").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage4").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage4").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage3").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage3").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage1").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage1").removeStyleClass("showClass");
					  			this.getView().byId("kbiPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiPage").removeStyleClass("showClass");
					  			this.getView().byId("home_form").addStyleClass("hideClass");
					  			this.getView().byId("activity_form").addStyleClass("hideClass"); //show();
					  			this.getView().byId("tonica_form").addStyleClass("hideClass"); //hide();
					  			this.getView().byId("request_form").addStyleClass("hideClass"); //hide();
					  			this.getView().byId("request_buttons_form").addStyleClass("hideClass");
					  			this.getView().byId("home_form").removeStyleClass("showClass");
					  			this.getView().byId("request_form").removeStyleClass("showClass");
					  			this.getView().byId("tonica_form").removeStyleClass("showClass"); //hide();
					  			this.getView().byId("activity_form").removeStyleClass("showClass"); //show();
					  			this.getView().byId("request_buttons_form").removeStyleClass("showClass");
					  			this.getView().byId("dfSplit").addStyleClass("hideClass");
					  			this.getView().byId("dfSplit").removeStyleClass("showClass");
					  			this.getView().byId("workflowSplit").removeStyleClass("showClass");
					  			this.getView().byId("workflowSplit").addStyleClass("hideClass");
					  			this.getView().byId("wrkflwmain").addStyleClass("hideClass");
					  			this.getView().byId("myAppPage").removeStyleClass("showClass");
					  			this.getView().byId("myAppPage").addStyleClass("hideClass");
					  			this.getView().byId("allAppPage").removeStyleClass("showClass");
					  			this.getView().byId("allAppPage").addStyleClass("hideClass");
					  			this.getView().byId("compAppPage").removeStyleClass("showClass");
					  			this.getView().byId("compAppPage").addStyleClass("hideClass");
					  			this.getView().byId("mapAppPage").addStyleClass("hideClass");
					  			this.getView().byId("mapAppPage").removeStyleClass("showClass");
					  			this.getView().byId("pastAppPage").addStyleClass("hideClass");
					  			this.getView().byId("pastAppPage").removeStyleClass("showClass");
					  			this.getView().byId("MAPCPage").removeStyleClass("showClass");
					  			this.getView().byId("MAPCPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiMainPage").addStyleClass("hideClass");
					  			this.getView().byId("kbiMainPage").removeStyleClass("showClass");
					  			this.getView().byId("NIM_form").addStyleClass("hideClass");
					  			this.getView().byId("NIM_form").removeStyleClass("showClass");
					  			this.getView().byId("adminSplit").addStyleClass("hideClass");
					  			this.getView().byId("adminSplit").removeStyleClass("showClass");
					  			this.getView().byId("sku_database").addStyleClass("hideClass");
					  			this.getView().byId("sku_database").removeStyleClass("showClass");
					  		} else if (key === "forms_button") {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			global1 = global;
					  			global = "bom";
					  			this.getView().byId("home_form").setVisible(false);
					  			app.setBusy(true);
					  			console.log("comes inside the BOM 1");
					  			app2.setBusy(true);
					  			app2.setHeight('180%');
					  			jQuery.sap.delayedCall(1000, this, function() {
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_BOM");
					  			});
					  		} else if (key == "sku_database_button") {
					  			var contentHeight = $(window).height() * .2;
					  			$("#content").height(contentHeight);
					  			global1 = global;
					  			global = "sku";
					  			this.getView().byId("home_form").setVisible(false);
					  			app.setBusy(true);
					  			app2.setHeight('180%');
					  			app2.setBusy(true);
					  			jQuery.sap.delayedCall(1000, this, function() {
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_SKU");
					  			});
					  			
					  		}
					  		

					  	},
					  	
					  	onCollapseExpandPress: function(oEvent) {
					  		var that = this;
					  		var oMenu11 = new sap.ui.commons.Menu({
					  			ariaDescription: "File Menu",
					  			tooltip: "Menu containing file related actions"
					  		});
					  		oMenu11.attachItemSelect(function(oEvent) {
					  			var menuId = oEvent.getParameter("item").getText();
					  			console.log(oEvent.getParameter("item").getText())
					  			console.log(menuId);
					  			if (menuId === "Admin") {
					  				that.getView().byId("home_form").setVisible(false);
					  				app.setBusy(true);

					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(1000, this, function() {
					  					app2.placeAt("content2");
					  					app2.to("CreateDF_Admin");
					  				});
					  			}
					  			if (menuId === "BOM Materials") {
					  				that.getView().byId("kbiPage1").addStyleClass("hideClass");
					  				that.getView().byId("kbiPage1").removeStyleClass("showClass");
					  				that.getView().byId("nim_buttons_form").addStyleClass("hideClass");
					  				that.getView().byId("nim_buttons_form").removeStyleClass("showClass");
					  				that.getView().byId("previous_buttons_form").addStyleClass("hideClass");
					  				that.getView().byId("previous_buttons_form").removeStyleClass("showClass");
					  				that.getView().byId("NIM_create_form").addStyleClass("hideClass");
					  				that.getView().byId("NIM_create_form").removeStyleClass("showClass");
					  				that.getView().byId("User_create_form").addStyleClass("hideClass");
					  				that.getView().byId("User_create_form").removeStyleClass("showClass");
					  				that.getView().byId("user_buttons_form").addStyleClass("hideClass");
					  				that.getView().byId("user_buttons_form").removeStyleClass("showClass");
					  				that.getView().byId("NIM_create_form").addStyleClass("hideClass");
					  				that.getView().byId("NIM_create_form").removeStyleClass("showClass");
					  				that.getView().byId("User_create_form").addStyleClass("hideClass");
					  				that.getView().byId("User_create_form").removeStyleClass("showClass");
					  				that.getView().byId("user_buttons_form").addStyleClass("hideClass");
					  				that.getView().byId("user_buttons_form").removeStyleClass("showClass");
					  				that.getView().byId("previous_records_mm").addStyleClass("hideClass");
					  				that.getView().byId("previous_records_mm").removeStyleClass("showClass");
					  				that.getView().byId("kbiPage2").addStyleClass("hideClass");
					  				that.getView().byId("kbiPage2").removeStyleClass("showClass");
					  				that.getView().byId("kbiPage4").addStyleClass("hideClass");
					  				that.getView().byId("kbiPage4").removeStyleClass("showClass");
					  				that.getView().byId("kbiPage3").addStyleClass("hideClass");
					  				that.getView().byId("kbiPage3").removeStyleClass("showClass");
					  				that.getView().byId("home_form").addStyleClass("hideClass");
					  				that.getView().byId("activity_form").addStyleClass("hideClass"); //show();
					  				that.getView().byId("tonica_form").addStyleClass("hideClass"); //hide();
					  				that.getView().byId("request_form").addStyleClass("hideClass"); //hide();
					  				that.getView().byId("request_buttons_form").addStyleClass("hideClass");
					  				that.getView().byId("home_form").removeStyleClass("showClass");
					  				that.getView().byId("request_form").removeStyleClass("showClass");
					  				that.getView().byId("activity_form").removeStyleClass("showClass"); //show();
					  				that.getView().byId("tonica_form").removeStyleClass("showClass"); //hide();
					  				that.getView().byId("request_buttons_form").removeStyleClass("showClass");
					  				that.getView().byId("dfSplit").removeStyleClass("showClass");
					  				that.getView().byId("dfSplit").addStyleClass("hideClass");
					  				that.getView().byId("adminSplit").addStyleClass("hideClass");
					  				that.getView().byId("adminSplit").removeStyleClass("showClass");
					  				that.getView().byId("main").addStyleClass("hideClass");
					  				that.getView().byId("myPage").removeStyleClass("showClass");
					  				that.getView().byId("myPage").addStyleClass("hideClass");
					  				that.getView().byId("allPage").removeStyleClass("showClass");
					  				that.getView().byId("allPage").addStyleClass("hideClass");
					  				that.getView().byId("workflowSplit").removeStyleClass("showClass");
					  				that.getView().byId("workflowSplit").addStyleClass("hideClass");
					  				that.getView().byId("wrkflwmain").addStyleClass("hideClass");
					  				that.getView().byId("myAppPage").removeStyleClass("showClass");
					  				that.getView().byId("myAppPage").addStyleClass("hideClass");
					  				that.getView().byId("allAppPage").removeStyleClass("showClass");
					  				that.getView().byId("allAppPage").addStyleClass("hideClass");
					  				that.getView().byId("compAppPage").removeStyleClass("showClass");
					  				that.getView().byId("compAppPage").addStyleClass("hideClass");
					  				that.getView().byId("mapAppPage").addStyleClass("hideClass");
					  				that.getView().byId("mapAppPage").removeStyleClass("showClass");
					  				that.getView().byId("pastAppPage").addStyleClass("hideClass");
					  				that.getView().byId("pastAppPage").removeStyleClass("showClass");
					  				that.getView().byId("MAPCPage").removeStyleClass("showClass");
					  				that.getView().byId("MAPCPage").addStyleClass("hideClass");
					  				that.getView().byId("kbiPage").addStyleClass("hideClass");
					  				that.getView().byId("kbiPage").removeStyleClass("showClass");
					  				that.getView().byId("kbiMainPage").addStyleClass("hideClass");
					  				that.getView().byId("kbiMainPage").removeStyleClass("showClass");
					  				that.getView().byId("NIM_form").addStyleClass("hideClass");
					  				that.getView().byId("NIM_form").removeStyleClass("showClass");
					  				//			that.getView().byId("bom_material").addStyleClass("showClass");
					  				//			that.getView().byId("bom_material").removeStyleClass("hideClass");
					  				that.getView().byId("sku_database").addStyleClass("hideClass");
					  				that.getView().byId("sku_database").removeStyleClass("showClass");
					  				that.getView().byId("sku_data_table").addStyleClass("hideClass");
					  				that.getView().byId("sku_data_table").removeStyleClass("showClass");
					  				that.refreshBOMTable();
					  			}
					  			if (menuId === "SKU Database") {
					  				that.getView().byId("home_form").setVisible(false);
					  				app.setBusy(true);

					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(1000, this, function() {
					  					app2.placeAt("content2");
					  					app2.to("CreateDF_SKU");
					  				});
					  				
					  			}
					  			if (menuId == "KBI") {
					  				//	that.getView().byId("home_form").setVisible(false);
					  				//.addPage(page2); // add both pages to the App
					  				app.setBusy(true);

					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(1000, this, function() {

					  					app2.placeAt("content2");
					  					app2.to("CreateDF_Home");
					  				});

					  			} else if (menuId == "DF Request") {

					  				that.getView().byId("home_form").setVisible(false);
					  				//.addPage(page2); // add both pages to the App
					  				app.setBusy(true);

					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(1000, this, function() {

					  					app2.placeAt("content2");
					  					app2.to("CreateDF_Request");
					  				});

					  			} else if (menuId == "Data Platform") {
					  				console.log("comes in for DataPlatform");
					  				that.getView().byId("home_form").setVisible(false);
					  				app.setBusy(true);
                                    app2.setHeight('200%');
					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(2000, this, function() {
					  					//   $.append(home_test);
					  					//  home_test.appendTo($("#bodyid"));
					  					app2.placeAt("content2");
					  					app2.to("CreateDF_platform");
					  				});
					  			} else if (menuId == "DF Evaluation") {
					  				that.getView().byId("home_form").setVisible(false);
					  				/*app.setBusy(true);

					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(1000, this, function() {*/
					  					app2.placeAt("content2");
					  					app2.to("CreateDF_evaluation");
					  				/*});*/
					  			}
					  			else if (menuId == "SKU Meeting") {
					  				that.getView().byId("home_form").setVisible(false);
					  				app.setBusy(true);
                                    app2.setHeight('400%');
					  				app2.setBusy(true);
					  				jQuery.sap.delayedCall(1000, this, function() {
					  					app2.placeAt("content2");
					  					app2.to("CreateDF_Meeting");
					  				});
					  			}

					  		});
                            
                            var that = this;
                            
                            var roleModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getUserRoles.xsjs", false);
					  		var url = "/dfrequest3/services/getUserRoles.xsjs"
					  		jQuery.ajax({
					  			url: url,
					  			method: 'GET',
					  			dataType: 'text',
					  			success: usersuccess,
					  			failed: userfailed
					  		})

					  		function usersuccess(data) {
					  		var oMenuItem12 = new sap.ui.commons.MenuItem({
					  			text: "DF Request"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3:Initiator") > -1) || (data.indexOf("dfrequest3::NIM") > -1)){
					  		oMenu11.addItem(oMenuItem12);}
					  		var oMenuItem13 = new sap.ui.commons.MenuItem({
					  			text: "DF Evaluation"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::STAKEHOLDER") > -1) || (data.indexOf("dfrequest3::NIM") > -1)){
					  		oMenu11.addItem(oMenuItem13);}
					  		var oMenuItem14 = new sap.ui.commons.MenuItem({
					  			text: "Data Platform"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::STAKEHOLDER") > -1) || (data.indexOf("dfrequest3::NIM") > -1)){
					  		oMenu11.addItem(oMenuItem14);}
					  		var oMenuItemSKUMeet = new sap.ui.commons.MenuItem({
					  			text: "SKU Meeting"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::NIM") > -1)){
					  		oMenu11.addItem(oMenuItemSKUMeet);}
					  		var oMenuItem15 = new sap.ui.commons.MenuItem({
					  			text: "SKU Database"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::STAKEHOLDER") > -1) || (data.indexOf("dfrequest3::NIM") > -1) || (data.indexOf("dfrequest3:Initiator") > -1) || (data.indexOf("dfrequest3::Admin_SKU_Database") > -1)){
					  		oMenu11.addItem(oMenuItem15);}
					  		var oMenuItem16 = new sap.ui.commons.MenuItem({
					  			text: "BOM Materials"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::STAKEHOLDER") > -1) || (data.indexOf("dfrequest3::NIM") > -1) || (data.indexOf("dfrequest3::Admin_BOM_Materials") > -1)){
					  		oMenu11.addItem(oMenuItem16);}
					  		/*	var oMenuItem17 = new sap.ui.commons.MenuItem({
									text: "Project Tracker "
								});
								oMenu11.addItem(oMenuItem17); */
					  		var oMenuItem18 = new sap.ui.commons.MenuItem({
					  			text: "KBI"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::NIM") > -1)){
					  		oMenu11.addItem(oMenuItem18);}
					  		var oMenuItem19 = new sap.ui.commons.MenuItem({
					  			text: "Reports"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::NIM") > -1)){
					  		oMenu11.addItem(oMenuItem19);}
					  		var oMenuItem20 = new sap.ui.commons.MenuItem({
					  			text: "To Do "
					  		});
					  		oMenu11.addItem(oMenuItem21);
					  		var oMenuItem21 = new sap.ui.commons.MenuItem({
					  			text: "Admin"
					  		});
					  		if((data.indexOf("dfrequest3::Admin_All") > -1) || (data.indexOf("dfrequest3::Admin_User_Profiles") > -1) || (data.indexOf("dfrequest3::Admin_SKU_Database") > -1) || (data.indexOf("dfrequest3::Admin_BOM_Materials") > -1) || (data.indexOf("dfrequest3::Admin_Form") > -1) || (data.indexOf("dfrequest3::Admin_Material_Supply") > -1) || (data.indexOf("dfrequest3::Admin_Stakeholder_Evaluation_Tool") > -1)){
					  		oMenu11.addItem(oMenuItem21);}

					  		var oLink1 = that.getView().byId("linktomenu");
					  		var eDock = sap.ui.core.Popup.Dock;
					  		oMenu11.open(
					  			false,
					  			oLink1.getFocusDomRef(),
					  			eDock.BeginTop,
					  			eDock.BeginBottom,
					  			oLink1.getDomRef()
					  		);
					  		}
					  		function userfailed(){}
					  	},

					  	onUserPress: function(oEvent) {
					  		var that = this;
					  		var userModel = new sap.ui.model.json.JSONModel("/dfrequest3/services/getCurrentUserdetail.xsjs", false);
					  		userModel.attachRequestCompleted(function() {
					  			var name = JSON.parse(userModel.getJSON()).username;
					  			var dept = JSON.parse(userModel.getJSON()).department;
					  			var countrybased = JSON.parse(userModel.getJSON()).countrybased;
					  			var countryhub = JSON.parse(userModel.getJSON()).countryhub;

					  			var oMenu1 = new sap.ui.commons.Menu({
					  				ariaDescription: "File Menu",
					  				tooltip: "Menu containing file related actions"
					  			});
					  			var oMenuItem1 = new sap.ui.commons.MenuItem({
					  				text: "User : " + name
					  			});
					  			oMenu1.addItem(oMenuItem1);
					  			var oMenuItem2 = new sap.ui.commons.MenuItem({
					  				text: "Dept : " + dept
					  			});
					  			oMenu1.addItem(oMenuItem2);
					  			var oMenuItem3 = new sap.ui.commons.MenuItem({
					  				text: "Country Based : " + countrybased
					  			});
					  			oMenu1.addItem(oMenuItem3);
					  			var oMenuItem4 = new sap.ui.commons.MenuItem({
					  				text: "Country Hub : " + countryhub
					  			});
					  			oMenu1.addItem(oMenuItem4);
					  			var oLink1 = that.getView().byId("user");
					  			var eDock = sap.ui.core.Popup.Dock;
					  			oMenu1.open(
					  				false,
					  				oLink1.getFocusDomRef(),
					  				eDock.BeginTop,
					  				eDock.BeginBottom,
					  				oLink1.getDomRef()
					  			);
					  		});
					  	},

					  	homePage: function() {

					  		//	that.getView().byId("home_form").setVisible(false);
					  		//.addPage(page2); // add both pages to the App
					  		global1 = global;
					  		global = "home";
					  		app.setBusy(true);

					  		app2.setBusy(true);
					  		jQuery.sap.delayedCall(1000, this, function() {

					  			app2.placeAt("content2");
					  			app2.to("CreateDF_Home");
					  		});
					  		/*			this.getView().byId("home_form").setVisible(true);
							var home_test = $("#content2");
							home_test.detach();
						sap.ui.getCore().getUIArea("content2").setVisible(false);
							sap.ui.getCore().getUIArea("content2").removeContent(this.getView());
								this.getView().byId("request_button").setVisible(false);
								  this.getView().byId("bom_material").setVisible(false);
                                 this.getView().byId("adminSplit").setVisible(false);
                                this.getView().byId("countrySKUURL").setVisible(false);
                                this.getView().byId("admin_form").setVisible(false);
                                this.getView().byId("stakeholderEval").setVisible(false);
                                this.getView().byId("stakeholderEval").setVisible(false);
                                this .getView().byId("adminmaster").setVisible(false); */
					  	},

					  	onNavBack: function() {
					  		this.getView().byId("home_form").setVisible(false);
					  		app.setBusy(true);
					  		app2.setHeight('160%');
					  		app2.setBusy(true);
					  		if (global1 === "request") {
					  			global1 = global;
					  			global = "request";
					  			jQuery.sap.delayedCall(1000, this, function() {
					  				sap.ui.getCore().byId("CreateDF_Request").getController().onDFIconClick();
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_Request");
					  			});
					  		} else if (global1 === "workflow") {
					  			global1 = global;
					  			global = "workflow";
					  		/*	jQuery.sap.delayedCall(1000, this, function() {*/
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_evaluation");
					  		/*	});*/
					  		} else if (global1 === "database") {
					  			global1 = global;
					  			global = "database";
					  			jQuery.sap.delayedCall(1000, this, function() {
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_platform");
					  			});
					  		} else if (global1 === "sku") {
					  			global1 = global;
					  			global = "sku";
					  			jQuery.sap.delayedCall(1000, this, function() {
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_SKU");
					  			});
					  		} else if (global1 === "bom") {
					  			global1 = global;
					  			global = "bom";
					  			jQuery.sap.delayedCall(1000, this, function() {
					  				app2.placeAt("content2");
					  				app2.to("CreateDF_BOM");
					  			});
					  		} else if (global1 === "home" || global1 === "") {
					  			global1 = global;
					  			global = "home";
					  			app2.placeAt("content2");
					  			app2.to("CreateDF_Home");
					  		}
					  	}

					  });