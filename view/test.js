	function logOffFunction(){ 
							var aUrl = "/sap/hana/xs/formLogin/token.xsjs";
								jQuery.ajax({ 
									url: aUrl,
									method: 'GET',
									dataType: 'text',
									beforeSend: function(jqXHR) {
										jqXHR.setRequestHeader('X-CSRF-Token', 'Fetch');
									},
									success: function(arg1, arg2, jqXHR) {

										var aUrl = "/sap/hana/xs/formLogin/logout.xscfunc";
										jQuery.ajax({
											url: aUrl,
											type: 'POST',
											dataType: 'text',
											beforeSend: function(jqXHR1, settings) {
												jqXHR1.setRequestHeader('X-CSRF-Token', jqXHR.getResponseHeader('X-CSRF-Token'));
											},
											success: function() {
												//    	jQuery.sap.log.info(jqXHR);
												location.reload();
											},
											error: function() {

											}

										})
									}
								})
						}
						
