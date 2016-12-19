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
          
          var pstmt = conn.prepareStatement( "insert into NEO_2E3DAI8G3XW9DYMWAE88WGPXG.\"BOM_MATERIAL1\" (SERIAL,MATERIAL,MATERIAL_DESC,SIZE"+
          ",CONTAINER,PACKAGING,SHAPE,BEVERAGE_PRODUCT,PLNT,BOMCAT,APPLIC,BOM_NO,BOM_USG,ALTERNATIVE_BOM,ALT_TEXT,BASE_QTY"+
		  ",HEADER_BASE,REQUIREMENT,REQ_UOM,REQ_QTY,LEV,ITEM,ICT,MATL_GROUP,MTYP,BOM_COMPONENT,OBJ_DESC,SIZE1,CONTAINER1,PACKAGING1" +
		  ",SHAPE1,BEV_PROD,QUANTITY,COMPONENT_UOM,QUANTITY1,CMPS_I,CHANGE_NO,VALID,VALID_TO,BY,CHANGED,BY1,CREATED,SLOC)" + 
		  "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" );  
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
                              col = entries.splice(0,50);  
                                
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
										pstmt.setString(18,col[17]); 
										pstmt.setString(19,col[18]); 
										pstmt.setString(20,col[19]); 
										pstmt.setString(21,col[20]); 
										pstmt.setString(22,col[21]); 
										pstmt.setString(23,col[22]); 
										pstmt.setString(24,col[23]); 
										pstmt.setString(25,col[24]); 
										pstmt.setString(26,col[25]); 
										pstmt.setString(27,col[26]); 
										pstmt.setString(28,col[27]); 
										pstmt.setString(29,col[28]); 
										pstmt.setString(30,col[29]);
										pstmt.setString(31,col[30]);
										pstmt.setString(32,col[31]);
										pstmt.setString(33,col[32]);
										pstmt.setString(34,col[33]);
										pstmt.setString(35,col[34]);
										pstmt.setString(36,col[35]);
										pstmt.setString(37,col[36]);
										pstmt.setString(38,col[37]);
										pstmt.setString(39,col[38]);
										pstmt.setString(40,col[39]);
										pstmt.setString(41,col[40]);
										pstmt.setString(42,col[41]);
										pstmt.setString(43,col[42]);
										pstmt.setString(44,col[43]);
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