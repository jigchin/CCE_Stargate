$.response.contentType = "text/html";

var query = "delete from NEO_2E3DAI8G3XW9DYMWAE88WGPXG.BOM_MATERIAL1";
var conn = $.db.getConnection();
var ps = conn.prepareStatement(query);
var execrc = ps.executeQuery(); 

ps.close();  
conn.commit();  
conn.close();  
