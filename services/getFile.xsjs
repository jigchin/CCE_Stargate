function escape(v1)  
{  
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');  
          return v2;  
}
$.response.contentType = "text/html";  
try  
{  
          var conn = $.db.getConnection();  
          var filename = $.request.parameters.get("file_name");  
          
          var pstmt = conn.prepareStatement( "insert into NEO_2E3DAI8G3XW9DYMWAE88WGPXG.\"EXTRACT_DB\" (SAP_CODE,COUNTRY,PRODUCT_DESCRIPTION"+
          ",CONTAINER_SIZE,CONTAINER_TYPE,FLAVOUR,GROUP_DESCRIPTION,CPP) " + "values(?,?,?,?,?,?,?,?)" );  
          if($.request.entities.length>0){  
                    var file_body = $.request.entities[0].body.asString();  
                    var allTextLines = file_body.split(/\r\n|\n/);  
                    var lines;  
                    var entries;  
                    var col;  
                    pstmt.setBatchSize(allTextLines.length-1);  
                    for (lines=0; lines<allTextLines.length; lines++)  
                    {  
                              entries = allTextLines[lines].split(',');  
                              col = entries.splice(0,8);  
                                
                                        col[0] = escape(col[0]); 
                                        pstmt.setString(1,col[0]);  
                                        pstmt.setString(2,col[1]); 
                                        pstmt.setString(3,col[2]); 
                                        pstmt.setString(4,col[3]); 
                                        pstmt.setString(5,col[4]); 
                                        pstmt.setString(6,col[5]); 
                                        pstmt.setString(7,col[6]); 
                                        pstmt.setString(8,col[7]); 
                                        pstmt.addBatch();  
                              
                    }  
                    pstmt.executeBatch();  
          }  
          else  
          {  
                    $.response.setBody("No Entries");  
          }  
          pstmt.close();  
          conn.commit();  
          conn.close();  
          $.response.setBody("[200]:Upload successful!");  
}  
catch(err)  
{  
          if (pstmt !== null)  
          {  
                    pstmt.close();  
          }  
          if (conn !== null)  
          {  
                    conn.close();  
          }  
          $.response.setBody(err.message);  
}  