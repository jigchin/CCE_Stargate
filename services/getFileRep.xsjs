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
          
          var pstmt = conn.prepareStatement( "insert into NEO_2E3DAI8G3XW9DYMWAE88WGPXG.\"REPACK\"(YES_NO,REP,LOC,TO_CC)" + 
		  "values(?,?,?,?)" );  
          if($.request.entities.length>0){  
                   // var file_body_x = $.request.entities[0].replace(/,/g," ");
                    var file_body = $.request.entities[0].body.asString();  
                    var allTextLines = file_body.split(/\r\n|\n/);  
                    var lines;  
                    var entries;  
                    var col;  
                    pstmt.setBatchSize(allTextLines.length-1);  
                    for (lines=0; lines<allTextLines.length; lines++)  
                    {  
                              entries = allTextLines[lines].split(',');  
                              col = entries.splice(0,allTextLines.length);  
                              if ( col[0].length > 0 )  
                              {  
                                        col[0] = escape(col[0]);  
                                        pstmt.setString(1,col[0]);  
                                        pstmt.setString(2,col[1]); 
                                        pstmt.setString(3,col[2]);  
                                        pstmt.setString(4,col[3]); 
                                        pstmt.addBatch();  
                              }  
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