
var master;
//objectsToShow



function loadMaster(masterText){
	master = JSON.parse(masterText);
	$(this).trigger( "masterDataLoaded" );
}

function saveMaster(){
	download( JSON.stringify(master) , 'MasterData.json' , 'application/json');
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

function getPropertiesFromMasterDataFor(objectId){
	return master.objects[objectId].properties;
}

function getMethodsFromMasterDataFor(objectId){
	return master.objects[objectId].methods;
}

function getObjectNameFromMasterDataFor(objectId){
	return master.objects[objectId].name;
}