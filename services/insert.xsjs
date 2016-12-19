function handleGet() {
	var name  = $.request.getParameter("name");  
	var goal  = $.request.getParameter("goal");
	var type  = $.request.getParameter("type");
	var theme = $.request.getParameter("theme");

	var output = {};  
	output.data = [];  
		
	var conn = $.db.getConnection();  
	conn.prepareStatement("SET SCHEMA \"NEO_2E3DAI8G3XW9DYMWAE88WGPXG\"").execute();  
	var st = conn.prepareStatement("INSERT INTO \"DF\" values(?,?,?,?)");  
	st.setString(1,name);  
	st.setString(2,goal);
	st.setString(3,type);
	st.setString(4,theme);  
	st.execute();  
	conn.commit();  
	var record = [];  
	record.push(name);  
	record.push(goal); 
	record.push(type);
	record.push(theme); 
	output.data.push(record);  
	conn.close();  
	$.response.setContentType('text/json');  
	$.response.addBody(JSON.stringify(output));
}

handleGet();