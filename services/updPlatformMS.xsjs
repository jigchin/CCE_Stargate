$.response.contentType = "text/plain";
try{
var conn=$.db.getConnection(); 
var ref_number = $.request.parameters.get('ref_number');
var supplier = $.request.parameters.get('supplier');
var order = $.request.parameters.get('order');

var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET "SUPPLIER"=?,"ORDER"=? WHERE "REF_NUMBER" = ?';
var cstmt = conn.prepareStatement(sql);
cstmt.setString(1,supplier);
cstmt.setString(2,order);
cstmt.setString(3,ref_number);

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