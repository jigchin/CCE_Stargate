$.response.contentType = "json";
var ref_num = "";
var result = [];
var update_result = "";
var pseudo_ref_num1;
var output;
 
var conn =$.db.getConnection(); 
var pseudo_ref_num = $.request.parameters.get('pseudo_ref_num');
//pseudo_ref_num1 = $.request.parameters.get('pseudo_ref_num');
pseudo_ref_num1 = "998";
//var ref_number = $.request.parameters.get('ref_number');

 
        var selsql = 'SELECT "REF_NUMBER" FROM "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" WHERE "PSEUDO_REF_NUM" = ?';
        var ps = conn.prepareStatement(selsql); 
        ps.setString(1,"11");
      
        var execrc = ps.executeQuery(); 

    while(execrc.next()){
                output = execrc.getString(1);
                pseudo_ref_num1 = pseudo_ref_num1 + 1;
                var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET "PSEUDO_REF_NUM" = ? WHERE "REF_NUMBER" = ?';
                var cstmt = conn.prepareStatement(sql);
                cstmt.setString(2,output);
                cstmt.setString(1,pseudo_ref_num1);
                update_result = cstmt.executeUpdate();
                conn.commit();
               // result+ = '{ "username": "' + execrc.getString(1) + '"}';
                
       }
    
        ps.close(); 
        
$.response.setBody(update_result); 
$.response.status = $.net.http.OK;
        conn.close();
    



    