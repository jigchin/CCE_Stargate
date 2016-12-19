$.response.contentType = "text/plain";
try{
var conn=$.db.getConnection(); 
var ref_number = $.request.parameters.get('ref_number');
var est = $.request.parameters.get('est');

var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET "EST_PROD_WEEK_INPT" = ? WHERE "REF_NUMBER" = ?';
var cstmt = conn.prepareStatement(sql);
cstmt.setString(1,est);
cstmt.setString(2,ref_number);

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