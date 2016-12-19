$.response.contentType = "text/plain";
try{
var ref_number = "";
var country = "";
var status = "";
var base = "";
var isscom = "";
var bbn = "";
var owner = "";

var conn=$.db.getConnection(); 
ref_number = $.request.parameters.get('ref_number');
country = $.request.parameters.get('prod_country');
status = $.request.parameters.get('status');
base = $.request.parameters.get('base');
isscom = $.request.parameters.get('isscom');
bbn = $.request.parameters.get('bbn');
owner = $.request.parameters.get('brand_owner');

var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET "PROD_COUNTRY" = ?,"STATUS_NAME" = ?,"BASE_INPUT" = ?,"BBN_CODE" = ?,"ISSCOM_CODE" = ?,"BRAND_OWNER" = ? WHERE "REF_NUMBER" = ?';
var cstmt = conn.prepareStatement(sql);
cstmt.setString(1,country);
cstmt.setString(2,status);
cstmt.setString(3,base);
cstmt.setString(4,isscom);
cstmt.setString(5,bbn);
cstmt.setString(6,owner);
cstmt.setString(7,ref_number);

cstmt.executeUpdate();
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