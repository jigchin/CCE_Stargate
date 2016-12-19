$.response.contentType = "text/html";

var query = "delete from NEO_2E3DAI8G3XW9DYMWAE88WGPXG.SKU_DATABASE";
var conn = $.db.getConnection();
var ps = conn.prepareStatement(query);
var execrc = ps.executeQuery(); 

ps.close();  
conn.commit();  
conn.close();  
