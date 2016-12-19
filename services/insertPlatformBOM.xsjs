$.response.contentType = "text/plain";
try{
var ref = "";
var val1 = "";var val2 = "";var val3 = "";var val4 = "";var val5 = "";var val6 = "";var val7 = "";var val8 = "";var val9 = "";var val10 = "";var val11 = "";
var val12 = "";var val13 = "";var val14 = "";var val15 = "";var val16 = "";var val17 = "";var val18 = "";var val19 = "";var val20 = "";var val21 = "";var val22 = "";
var val23 = "";var val24 = "";var val25 = "";var val26 = "";var val27 = "";var val28 = "";var val29 = "";var val30 = "";var val31 = "";var val32 = "";var val33 = "";
var val34 = "";var val35 = "";var val36 = "";var val37 = "";var val38 = "";var val39 = "";var val40 = "";var val41 = "";var val42 = "";var val43 = "";var val44 = "";
var val45 = "";var val46 = "";var val47 = "";var val48 = ""; var status = "";

var conn=$.db.getConnection(); 
ref = $.request.parameters.get('ref_number');
status = $.request.parameters.get('status');
val1 = $.request.parameters.get('val1');
val2 = $.request.parameters.get('val2');
val3 = $.request.parameters.get('val3');
val4 = $.request.parameters.get('val4');
val5 = $.request.parameters.get('val5');
val6 = $.request.parameters.get('val6');
val7 = $.request.parameters.get('val7');
val8 = $.request.parameters.get('val8');
val9 = $.request.parameters.get('val9');
val10 = $.request.parameters.get('val10');
val11 = $.request.parameters.get('val11');
val12 = $.request.parameters.get('val12');
val13 = $.request.parameters.get('val13');
val14 = $.request.parameters.get('val14');
val15 = $.request.parameters.get('val15');
val16 = $.request.parameters.get('val16');
val17 = $.request.parameters.get('val17');
val18 = $.request.parameters.get('val18');
val19 = $.request.parameters.get('val19');
val20 = $.request.parameters.get('val20');
val21 = $.request.parameters.get('val21');
val22 = $.request.parameters.get('val22');
val23 = $.request.parameters.get('val23');
val24 = $.request.parameters.get('val24');
val25 = $.request.parameters.get('val25');
val26 = $.request.parameters.get('val26');
val27 = $.request.parameters.get('val27');
val28 = $.request.parameters.get('val28');
val29 = $.request.parameters.get('val29');
val30 = $.request.parameters.get('val30');
val31 = $.request.parameters.get('val31');
val32 = $.request.parameters.get('val32');
val33 = $.request.parameters.get('val33');
val34 = $.request.parameters.get('val34');
val35 = $.request.parameters.get('val35');
val36 = $.request.parameters.get('val36');
val37 = $.request.parameters.get('val37');

conn.prepareStatement("SET SCHEMA \"NEO_2E3DAI8G3XW9DYMWAE88WGPXG\"").execute();  
var sql = "INSERT INTO \"DF_DATABASE_FINAL\" (REF_NUMBER,DF_ID,HIERARCHY,STATUS_NAME,INITIATOR,INITIATOR_DEPT,NIM1,TITLE,PROJECT_GROUP,THEME_END_DATE,PROJECT_TYPE,THEME_TYPE," +
"BRANDOWNER_NAME, BRAND_OWNER_EMAIL , SELLING_COUNTRY , FIRST_LAST_DISPATCH_DATE , INCREMENTAL_VOLUME1,"+
"MATERIAL_CHANGE , MATERIAL_CHANGE_OTHER , PROMOTIONAL_MECHANIC , MIXING_GUIDELINES , ARTWORK_CHANGES , ARTWORK_OTHER, SUPPLIER_NAME , SUPPLIER_OTHER , PSEUDO_REF_NUM ,"+
 "SAP_SKU_CODE , CONTAINER, DESC,PACKAGE , PACK , OLD_SAP_RAW_MATERIAL_NUMBER , RAW_MAT_DESC ,FORECAST_REQ ,"+
 "MOD_USER , MOD_DATE , TRADE_REGISTRATION , TRADE_WINDOW , IND_RUN_OUT_RULES ,  PROJECT_DESCRIPTION "+
 ") values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
var cstmt = conn.prepareStatement(sql);
cstmt.setString(1,ref);
cstmt.setString(2,val1);
cstmt.setString(3,"RM");
cstmt.setString(4,status);
cstmt.setString(5,val2);
cstmt.setString(6,val3);
cstmt.setString(7,val4);
cstmt.setString(8,val5);
cstmt.setString(9,val6);
cstmt.setString(10,val7);
cstmt.setString(11,val8);
cstmt.setString(12,val9);
cstmt.setString(13,val10);
cstmt.setString(14,val11);
cstmt.setString(15,val12);
cstmt.setString(16,val13);
cstmt.setString(17,val14);
cstmt.setString(18,val15);
cstmt.setString(19,val16);
cstmt.setString(20,val17);
cstmt.setString(21,val18);
cstmt.setString(22,val19);
cstmt.setString(23,val20);
cstmt.setString(24,val21);
cstmt.setString(25,val22);
cstmt.setString(26,val23);
cstmt.setString(27,val24);
cstmt.setString(28,val25);
cstmt.setString(29,val26);
cstmt.setString(30,val27);
cstmt.setString(31,val28);
cstmt.setString(32,val29);
cstmt.setString(33,val30);
cstmt.setString(34,val31);
cstmt.setString(35,val32);
cstmt.setString(36,val33);
cstmt.setString(37,val34);
cstmt.setString(38,val35);
cstmt.setString(39,val36);
cstmt.setString(40,val37);

cstmt.executeQuery();
conn.commit();
cstmt.close();
}
catch(err)  
{  
          if (cstmt !== null)  
          {  
                   cstmt.close();  
          }  
          if (conn !== null)  
          {  
                    conn.close();  
          }  
          $.response.setBody(err.message);  
}  