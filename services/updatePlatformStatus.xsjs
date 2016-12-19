$.response.contentType = "json";
try{
var df = "";
var val = "";

var conn=$.db.getConnection(); 
df = $.request.parameters.get('dfid');
val = $.request.parameters.get('val');

var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET "STATUS_NAME" = ? WHERE "DF_ID" = ?';
var cstmt = conn.prepareStatement(sql);
cstmt.setString(2,df);
cstmt.setString(1,val);

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