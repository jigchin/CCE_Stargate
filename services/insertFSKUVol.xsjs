$.response.contentType = "text/plain";
try{
var val1 = "";var val2 = "";var val3 = "";var val4 = "";var val5 = "";var val6 = "";var val7 = "";var val8 = "";var val9 = "";var val10 = "";var val11 = "";
var val12 = "";var val13 = "";var val14 = "";var val15 = "";var val16 = "";var val17 = "";var val18 = "";

var conn=$.db.getConnection(); 
val1 = $.request.parameters.get('val1');
val2 = $.request.parameters.get('val2');
val3 = $.request.parameters.get('val3');
val4 = $.request.parameters.get('val4');
val5 = $.request.parameters.get('val5');
val6 = $.request.parameters.get('val6');
val7 = $.request.parameters.get('val7');
val8 = $.request.parameters.get('val8');
val9 = $.request.parameters.get('val9');
val10 = $.request.parameters.get('val10');
val11 = $.request.parameters.get('val11');
val12 = $.request.parameters.get('val12');
val13 = $.request.parameters.get('val13');
val14 = $.request.parameters.get('val14');
val15 = $.request.parameters.get('val15');
val16 = $.request.parameters.get('val16');
val17 = $.request.parameters.get('val17');
val18 = $.request.parameters.get('val18');

conn.prepareStatement("SET SCHEMA \"NEO_2E3DAI8G3XW9DYMWAE88WGPXG\"").execute();  
var sql = "INSERT INTO \"SKU_NUM\" (DF_ID,SKU_NUMBER,PERIOD1,PERIOD2,PERIOD3,PERIOD4,PERIOD5,PERIOD6,PERIOD7,PERIOD8,PERIOD9,PERIOD10," +
"PERIOD11, PERIOD12 , TOTAL_VOL , CURRENT , CURRENT1,DESC) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
var cstmt = conn.prepareStatement(sql);
cstmt.setString(1,val1);
cstmt.setString(2,val2);
cstmt.setString(3,val3);
cstmt.setString(4,val4);
cstmt.setString(5,val5);
cstmt.setString(6,val6);
cstmt.setString(7,val7);
cstmt.setString(8,val8);
cstmt.setString(9,val9);
cstmt.setString(10,val10);
cstmt.setString(11,val11);
cstmt.setString(12,val12);
cstmt.setString(13,val13);
cstmt.setString(14,val14);
cstmt.setString(15,val15);
cstmt.setString(16,val16);
cstmt.setString(17,val17);
cstmt.setString(18,val18);

cstmt.executeQuery();
conn.commit();
cstmt.close();
}
catch(err)  
{  
          if (cstmt !== null)  
          {  
                   cstmt.close();  
          }  
          if (conn !== null)  
          {  
                    conn.close();  
          }  
          $.response.setBody(err.message);  
}  