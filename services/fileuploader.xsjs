// Extract the content from the multipart entity and return a CMIS content object
// This function reads the uploaded file content and returns the details to the calling service
function getCmisContentObject(entity) {
    var content = {};
    if (entity) {
        var j;
        content.stream = entity.body.asArrayBuffer();
        for (j = 0; j < entity.headers.length; j++) {
            if (entity.headers[j].name === "~content_filename") {
                content.filename = entity.headers[j].value;
            } else if (entity.headers[j].name === "content-type") {
                content.mimeType = entity.headers[j].value;
            }
        }
        if (!content.filename || content.filename.length === 0) {
            content.filename = "data.bin";
        }
        if (!content.mimeType || content.mimeType.length === 0) {
            content.mimeType = "application/octet-stream";
        }        
    }
    return content;
}
 
// get the mulitpart content entity with given name
function getContentEntity(fieldName) {
    var i;
    var entity = null;
    if ($.request.entities) {
        for (i = 0; i < $.request.entities.length; ++i) {
            var j;
            entity = $.request.entities[i];
            for (j = 0; j < entity.headers.length; j++) {
                if (entity.headers[j].name === "content_name" &&
                    entity.headers[j].value === encodeURIComponent(fieldName)) {
                    return entity.body.asArrayBuffer();
                }
            }
        }
    }
    return entity;
}
function getStringEntity(fieldName) {
    var i;
    var entity;
    if ($.request.entities) {
        for (i = 0; i < $.request.entities.length; ++i) {
            var j;
            entity = $.request.entities[i];
            for (j = 0; j < entity.headers.length; j++) {
                if (entity.headers[j].name === "content-disposition" &&
                    entity.headers[j].value === "form-data; name=\"" + 
                       encodeURIComponent(fieldName) + "\"")  {
                    return entity.body.asString();
                }
            }
        }
    }
    return null;
}
if($.request.method === $.net.http.POST) {
    var name;
    var mimeType;
    var content;
    var customProperty;
    var description;
    var contentIndex = -1;
    var i;
    var j;
    var id;
    var body;
    var headers;
    var message = "";
    var records = [];
    var entity = getContentEntity("datafile");
// Get document details
    content = getCmisContentObject(entity);
// Get document description
    description = getStringEntity("description");
    if (content) {
        try {
// Create Document repository session
        var docService = $.import("sap.bc.cmis", "cmis");  
        var session = docService.cmis.createHANAXSECMSession({
              destination : $.net.http.readDestination("dfrequest3","Ecm")//("acme.cmistestapp.cmisjs", "ecm")
            }, {
              repositoryName : "StargateRepository", // Provide repository name which was created earlier.
              repositoryKey : "Stargate@1" // Provide repository key which was set earlier.
        });
// Create a new document in Document repository 
              session.init().then(function(repInfo) {
                session.getRootFolder().then(function(rootFolder) {
                    rootFolder.createDocument({
                                    "cmis:name" : content.filename,
                                    "cmis:description" : description,
                                    "cmis:objectTypeId" : "cmis:document"
                                }, content).then(function(newDoc) {
                                    id = newDoc.getId();
                                    message += "Your file was archived with:\n";
                                    message += "name: " + content.filename + "\n";
                                    message += "mime type: " + content.mimeType + "\n";
                                    message += "id: " + id + "\n";
                                });
                });
            });
        } catch (error) {
            message += "Error " + error.name + ": " + error.message + "\n";
        }
    } else {
        message += "No content found in request.\n";
    }
    records.push({
        message : message,
        id      : id 
    });
    
  // send response
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify(records));
    $.response.status = $.net.http.OK;
} else {
    message = "Unexpected http method called.";
     // unsupported method
     var records = [];
      
      records.push({
        message : message,
        id      : id 
    });
   
     $.response.contentType = "application/json";
     $.response.setBody(JSON.stringify(records));
     $.response.status = $.net.http.OK;
}