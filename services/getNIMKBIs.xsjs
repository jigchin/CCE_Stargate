$.response.contentType = "json"; 
var result = []; 
 
var conn=$.db.getConnection();  

function onesql(sql) { 
    try { 
        var ps = conn.prepareStatement(sql); 
        var execrc = ps.executeQuery(); 

        while(execrc.next()){
            
       result += '{ "NIM_INITIALS": "' + execrc.getString(1) + '","ACTUAL_COMPLETION_DATE": "' + execrc.getString(2) + '"}';
       }
    
        ps.close(); 
    }catch(e){ 
        result += sql + ":\n" + e.toString() + "\n--------\n\n"; 
    } 
} 
 
// cleanup 
onesql("select NIM_INITIALS,ACTUAL_COMPLETION_DATE from NEO_2E3DAI8G3XW9DYMWAE88WGPXG.NIM_COMPLETE, NEO_2E3DAI8G3XW9DYMWAE88WGPXG.DF_DATABASE where COUNTRY_HUB = 'GB' and NIM_NAME = NIM1");
 
$.response.setBody(result); 
$.response.status = $.net.http.OK;