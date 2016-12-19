function escape(v1)  
{  
          var v2 = v1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/,/g ," ");  
          return v2;  
}
$.response.contentType = "text/html";  
try  
{  
          var conn = $.db.getConnection();  
          var filename = $.request.parameters.get("file_name");  
          
          var pstmt = conn.prepareStatement( "insert into NEO_2E3DAI8G3XW9DYMWAE88WGPXG.\"SKU_DATABASE\" (SAP_CODE,BAP_CODE,COUNTRY"+
          ",DESC,FLAVOUR,CONTAINER,PACK,PACKAGE,CPP_RAW,CPP_CCE,CPP_UNIT,EAN,ZCU,CS,PAL"+
		  ",SHELF,SITES)" + 
		  "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" );  
          if($.request.entities.length>0){  
                   // var file_body_x = $.request.entities[0].replace(/,/g," ");
                    var file_body = $.request.entities[0].body.asString();  
                    var allTextLines = file_body.split(/\r\n|\n/);  
                    var lines;  
                    var entries;  
                    var col;  
                    pstmt.setBatchSize(allTextLines.length-1);  
                    for (lines=0; lines<allTextLines.length-1; lines++)  
                    {  
                              entries = allTextLines[lines].split(','); 
                              col = entries.splice(0,20);  
                                
                                        col[0] = escape(col[0]); 
                                        pstmt.setString(1,col[0]);  
                                        pstmt.setString(2,col[1]); 
                                        pstmt.setString(3,col[2]); 
                                        pstmt.setString(4,col[3]); 
                                        pstmt.setString(5,col[4]); 
                                        pstmt.setString(6,col[5]); 
                                        pstmt.setString(7,col[6]); 
                                        pstmt.setString(8,col[7]); 
										pstmt.setString(9,col[8]); 
										pstmt.setString(10,col[9]); 
										pstmt.setString(11,col[10]); 
										pstmt.setString(12,col[11]); 
										pstmt.setString(13,col[12]); 
										pstmt.setString(14,col[13]); 
										pstmt.setString(15,col[14]); 
										pstmt.setString(16,col[15]); 
										pstmt.setString(17,col[16]); 
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
          $.response.setBody("Upload successful!");  
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