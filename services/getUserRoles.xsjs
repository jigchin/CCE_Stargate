$.response.contentType = "text"; 
var result = ""; 
 
var conn=$.db.getConnection();  

function onesql(sql) { 
    try { 
        var ps = conn.prepareStatement(sql); 
        var execrc = ps.executeQuery(); 

        while(execrc.next()){
            
       result +=  execrc.getString(1);
       }
    
        ps.close(); 
    }catch(e){ 
        result += sql + ":\n" + e.toString() + "\n--------\n\n"; 
    } 
} 

// cleanup 
//onesql("SELECT ROLE_NAME FROM PUBLIC.GRANTED_ROLES WHERE GRANTEE=CURRENT_USER and ROLE_NAME='dfrequest3::forms_only'");
onesql("SELECT ROLE_NAME FROM PUBLIC.GRANTED_ROLES WHERE GRANTEE=CURRENT_USER");// and ROLE_NAME='dfrequest3::tonica_only'");

$.response.setBody(result); 
$.response.status = $.net.http.OK;