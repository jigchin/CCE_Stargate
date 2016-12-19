$.response.contentType = "text/plain";
try{
var conn=$.db.getConnection(); 
var ref = $.request.parameters.get('ref_number');
var util = $.request.parameters.get('util');
var min = $.request.parameters.get('min');
var col1 = $.request.parameters.get('col1');
var col2 = $.request.parameters.get('col2');

var colname1 = col1;
var colname2 = col2;

var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET '+colname1+' = ?,'+colname2+' = ? WHERE "REF_NUMBER" = ?';
var cstmt = conn.prepareStatement(sql);
cstmt.setString(3,ref);
cstmt.setString(2,min);
cstmt.setString(1,util);

cstmt.execute();
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