$.response.contentType = "json"; 
var result = []; 
 
var conn=$.db.getConnection();  

function onesql(sql) { 
    try { 
        var ps = conn.prepareStatement(sql); 
        var execrc = ps.executeQuery(); 

        while(execrc.next()){
            
       result += '{ "username": "' + execrc.getString(1) + '","department": "' + execrc.getString(2) + '"}';
       }
    
        ps.close(); 
    }catch(e){ 
        result += sql + ":\n" + e.toString() + "\n--------\n\n"; 
    } 
} 
 
// cleanup 
onesql("SELECT USER_NAME, USER_DEPARTMENT FROM NEO_2E3DAI8G3XW9DYMWAE88WGPXG.USER_PROFILE WHERE USER_ID=CURRENT_USER");

 
$.response.setBody(result); 
$.response.status = $.net.http.OK;