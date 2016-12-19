$.response.contentType = "text/plain";
try{


var conn=$.db.getConnection(); 
var ref_number = $.request.parameters.get('ref_number');
var status = $.request.parameters.get('status');
var nim_cm = $.request.parameters.get('nim_cm');
var assign = $.request.parameters.get('assign');
var prj = $.request.parameters.get('prj');
var site = $.request.parameters.get('site');
var repack = $.request.parameters.get('repack');
var sku = $.request.parameters.get('sku');
var artwork = $.request.parameters.get('artwork');
var start_date = $.request.parameters.get('start_date');
var gate1 = $.request.parameters.get('gate1');
var gate2 = $.request.parameters.get('gate2');
var mapc = $.request.parameters.get('mapc');
var mapx = $.request.parameters.get('mapx');
var bam = $.request.parameters.get('bam');
var trial_e = $.request.parameters.get('trial_e');
var trial_l = $.request.parameters.get('trial_l');
var circ = $.request.parameters.get('circ');
var pss = $.request.parameters.get('pss');
var owner = $.request.parameters.get('owner');
var mfg = $.request.parameters.get('mfg');

var sql = 'UPDATE "NEO_2E3DAI8G3XW9DYMWAE88WGPXG"."DF_DATABASE_FINAL" SET "STATUS_NAME" = ?,"NIM_CM" = ?,"ASSIGNMENT_DELAY" = ?,"PROJECT_TYPE" = ?,"PROD_SITES" = ?,"REPACKING" = ?,"NUM_SKU" = ?,"NUM_ARTWORKS" = ?,"START_DATE" = ?,"GATE1" = ?,"GATE2" = ?,"MAPC" = ?,"MAPX" = ?,"BAM" = ?,"TRIAL_E" = ?,"TRIAL_L" = ?,"DF_CIRCULATION_STARTED" = ?,"PLANNED_FINAL_PSS_COMPLETION" = ?,"BRAND_OWNER" = ?,"MFG_SOURCE" = ? WHERE "REF_NUMBER" = ?';
var cstmt = conn.prepareStatement(sql);
cstmt.setString(1,status);
cstmt.setString(2,nim_cm);
cstmt.setString(3,assign);
cstmt.setString(4,prj);
cstmt.setString(5,site);
cstmt.setString(6,repack);
cstmt.setString(7,sku);
cstmt.setString(8,artwork);
cstmt.setString(9,start_date);
cstmt.setString(10,gate1);
cstmt.setString(11,gate2);
cstmt.setString(12,mapc);
cstmt.setString(13,mapx);
cstmt.setString(14,bam);
cstmt.setString(15,trial_e);
cstmt.setString(16,trial_l);
cstmt.setString(17,circ);
cstmt.setString(18,pss);
cstmt.setString(19,owner);
cstmt.setString(20,mfg);
cstmt.setString(21,ref_number);

cstmt.executeUpdate();
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