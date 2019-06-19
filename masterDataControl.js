
var originalMaster;
var master;
//objectsToShow



function loadMaster(masterText){
	master = JSON.parse(masterText);
    originalMaster = JSON.parse(masterText);
	$(this).trigger( "masterDataLoaded" );
}

function saveMaster(){
    var jayson = JSON.stringify(master);
	download( jayson , 'MasterData.json' , 'application/json');
    originalMaster = JSON.parse(jayson);
    master = JSON.parse(jayson);
}

function download(text, name, type) {
  var a = document.getElementById("downloadLink");
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
}

function addPropertyToMasterData(objectId , propertyType , propertyName){
    var newProp = {};
    newProp.name = propertyName;
    newProp.type = propertyType;
    master.objects[objectId].properties.push(newProp);
}

function removePropertyFromMasterData(objectId , propertyType , propertyName){
    var newPropList = [];
    for(var i = 0 ; i < master.objects[objectId].properties.length ; i++){
        if(!(master.objects[objectId].properties[i].type == propertyType && master.objects[objectId].properties[i].name == propertyName )){
            newPropList.push(master.objects[objectId].properties[i]);
        }
    }
    master.objects[objectId].properties = newPropList;
}

function updatePropertyFromMasterData(objectId , oldPropertyType , oldPropertyName , newPropertyType , newPropertyName){
    removePropertyFromMasterData(objectId , oldPropertyType , oldPropertyName);
    addPropertyToMasterData(objectId , newPropertyType , newPropertyName);
}


function addMethodToMasterData(objectId , methodName , params ){
    var newMethod = {};
    newMethod.name = methodName;
    newMethod.params = params;
    newMethod.implementation = null;
    master.objects[objectId].methods.push(newMethod);
}

function removeMethodFromMasterData(objectId , methodName ){
    var newMethodsList = [];
    for(var i = 0 ; i < master.objects[objectId].methods.length ; i++){
        if(master.objects[objectId].methods[i].name != methodName){
        	newMethodsList.push(master.objects[objectId].methods[i]);
        }
    }
    master.objects[objectId].methods = newMethodsList;
}

function updateMethodFromMasterData(objectId , oldMethodName , newMethodName , newMethodParams){
    removeMethodFromMasterData(objectId , oldMethodName);
    addMethodToMasterData(objectId , newMethodName , newMethodParams);
}

function updateObjectNameFromMasterData(objectId , newName){
    master.objects[objectId].name = newName;
}

function updateRepresentationForObjectFromMasterData(objectId , newIndex){
    master.objects[objectId].representationIndex = newIndex;
}

function insertObjectWithNameToMasterData(newName , repIndex){
    master.lastID += 1;
    var newObject = {};
    newObject.id = master.lastID;
    newObject.name = newName;
    newObject.methods = [];
    newObject.properties = [];
    newObject.representationIndex = repIndex;
    master.objects[master.lastID] = newObject;
}

function restoreObjectToOriginal(objectId){
    if(originalMaster.objects[objectId] != undefined && originalMaster.objects[objectId] != null){
        master.objects[objectId] = originalMaster.objects[objectId];
    }
}

function arrangeIconIndexesForDeletion(indexToRemove){
    
    for(var i = 0; i < master.lastID + 1 ; i++ ){
        if(master.objects[i] != undefined && master.objects[i] != null){
            if(master.objects[i].representationIndex > indexToRemove ){
                //alert(master.objects[i].representationIndex);
                master.objects[i].representationIndex -= 1;
                //alert(master.objects[i].representationIndex);
            }
        }
    }

}

function deleteObjectFromMasterData(objectId){
    delete master.objects[objectId];
}

function getRepresentationFromMasterDataFor(objectId){
    return master.representations[master.objects[objectId].representationIndex];
}

function getRepresentationIndexFromMasterDataFor(objectId){
    return master.objects[objectId].representationIndex;
}

function getPropertiesFromMasterDataFor(objectId){
	return master.objects[objectId].properties;
}

function getMethodsFromMasterDataFor(objectId){
	return master.objects[objectId].methods;
}

function getObjectNameFromMasterDataFor(objectId){
	return master.objects[objectId].name;
}

function getLastIdFromMasterData(){
    return master.lastID;
}

function getAllObjectNames(){
    var result = [];
    for(var i = 0; i < master.lastID + 1 ; i++ ){
        if(master.objects[i] != undefined && master.objects[i] != null){
            result.push(master.objects[i].name);
        }
    }
    return result;
}

function getUsedIconIndexes(){
    var result = new Set();
    for(var i = 0; i < master.lastID + 1 ; i++ ){
        if(master.objects[i] != undefined && master.objects[i] != null){
            result.add(master.objects[i].representationIndex);
        }
    }
    return result;
}

function getRepresentationsFromMasterData(){
    return master.representations;
}