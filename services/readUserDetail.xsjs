$.response.contentType = "text/html";
var output;
var val = $.request.parameters.get('val');
var query = "select USER_COUNTRY_BASED from NEO_2E3DAI8G3XW9DYMWAE88WGPXG.USER_DETAIL where USER_NAME = '"+val+"'";
var conn = $.db.getConnection();
var ps = conn.prepareStatement(query);
var execrc = ps.executeQuery(); 
if (!execrc.next()) {
output = "";
}

else {
output = execrc.getString(1);
}

$.response.setBody(output);
ps.close();  
conn.commit();  
conn.close();  