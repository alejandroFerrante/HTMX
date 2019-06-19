
		var sketcher;
		var icons = [];
		var canvasId = 'newIconCanvas';
		var minAmountOfIconContainers = 3;
		var amountOfIconContainers = 3;
		var usedIndexes;

		function initIconManagement(iconsList){
			//Init Sketcher
			sketcher = atrament('#'+canvasId, 100, 100);
			sketcher.smoothing = true;
			sketcher.opacity = 0.8;
			sketcher.adaptiveStroke = true;
			//

			icons = iconsList;
			updateUsedIndexes();
			fillItemsSectionWithCurrentIcons();
		}



		function fillItemsSection(){

			var htmlContent = '';
			htmlContent += '<div style="overflow: auto;">';
			htmlContent += '<table style="width:100%;">';
			htmlContent += '		  <tr>';
			for(var i= 0; i < amountOfIconContainers+1 ; i++){
				htmlContent += getIconDisplayHtmlFor(i);
			}
			htmlContent += '		  </tr>';
			htmlContent += '</table>';
			htmlContent += '</div>';

			$('#itemsSection')[0].innerHTML = htmlContent;


		}

		function getIconDisplayHtmlFor(index){
			var result = '';
			result += '<th>';

		    
		    result += '	<div style="width:60px;height:60px;border-style:solid;border-width:2px" ';
		    
		    if(! usedIndexes.has(index)){
				result += '  onmouseleave="hideDeleteIconFor('+index+')" onmouseenter="showDeleteIconFor('+index+')" >';
				result += '	<span align="right" id="slideRemoveIcon_'+index+'" style="cursor: pointer;display:none;color:black;" class="glyphicon glyphicon-trash" onclick="removeIcon('+index+')" ></span> ';
			}else{
				result += '>';	
			}	    

		    result += '		<img id="slideImageContainer_'+index+'" style="position:relative;height:100%;width:100%"/>';
		    

		    result += '	</div>';
		    	
		    result += '</th>';
			return result;
		}

		function fillItemsSectionWithCurrentIcons(){
			
			if(amountOfIconContainers <= icons.length){
				amountOfIconContainers = icons.length-1;
			}
			
			if(amountOfIconContainers < minAmountOfIconContainers){
				amountOfIconContainers = minAmountOfIconContainers;	
			}
			


			fillItemsSection();
			for(var i = 0; i < icons.length; i++){
				drawIntoImage('slideImageContainer_'+i , icons[i]);
			}
		}

		function fillSectionWithSelectableIcons(sectionId , objectId ){
			
			
			amountOfIconContainers = icons.length-2;
			
			
			
			
			var currentRepresentation = getRepresentationIndexFromMasterDataFor(objectId);

			var htmlContent = '';
			htmlContent += '<div style="overflow: auto;">';
			htmlContent += '<table style="width:100%;">';
			htmlContent += '		  <tr>';
			for(var i= 0; i < icons.length ; i++){
				if(i != currentRepresentation){
					htmlContent += '<th>';
			    	htmlContent += '	<div style="width:60px;height:60px;border-style:solid;border-width:2px" >';
			    	htmlContent += '		<img id="repSelectImageContainer_'+i+'" onclick="acceptRepChange('+objectId+' , '+i+' )" style="cursor:pointer;position:relative;height:100%;width:100%;background-color:white;"/>';	
			    	htmlContent += '	</div>';
			    	htmlContent += '</th>';
		    	}
			}
			htmlContent += '		  </tr>';
			htmlContent += '</table>';
			htmlContent += '</div>';

			$('#'+sectionId)[0].innerHTML = htmlContent;
			
			
			for(var i = 0; i < icons.length; i++){
				if(i != currentRepresentation){
					drawIntoImage('repSelectImageContainer_'+i , icons[i]);
				}
			}
			
		}

		function fillSectionWithAllIcons(sectionId){

			var htmlContent = '';
			htmlContent += '<div style="overflow: auto;padding-bottom:8px;">';
			htmlContent += '<table style="width:100%;">';
			htmlContent += '		  <tr>';
			for(var i= 0; i < icons.length ; i++){
				
				htmlContent += '<th>';
		    	htmlContent += '	<div style="width:60px;height:60px;border-style:solid;border-width:2px;';
		    	if(i == newObjectSelectedRepIndex){
		    		htmlContent += 'border-color:red;';
		    	}
		    	htmlContent += '" 	 >';
		    	htmlContent += '		<img id="repSelectImageContainer_'+i+'" onclick="selectNewObjRep('+i+' )" style="cursor:pointer;position:relative;height:100%;width:100%;background-color:white;"/>';	
		    	htmlContent += '	</div>';
		    	htmlContent += '</th>';
		    	
			}
			htmlContent += '		  </tr>';
			htmlContent += '</table>';
			htmlContent += '</div>';

			$('#'+sectionId)[0].innerHTML = htmlContent;
			
			
			for(var i = 0; i < icons.length; i++){
				drawIntoImage('repSelectImageContainer_'+i , icons[i]);
			}
			
		}

		function selectNewObjRep(newIndex){
			newObjectSelectedRepIndex = newIndex;
			fillSectionWithAllIcons('newObjectRepSelectionSection');
		}

		function addIcon(){
			icons.push(getCanvasBase64(canvasId));
			fillItemsSectionWithCurrentIcons();
		}

		function removeIcon(indexToRemove){
			arrangeIconIndexesForDeletion(indexToRemove);
			icons.splice(indexToRemove, 1);
			fillItemsSectionWithCurrentIcons();
		}

		function doClear(){
			sketcher.clear();
		}

		function getCanvasBase64(canvasId){
			//return $('#'+canvasId).toDataURL().substring(x.lastIndexOf('base64,')+7);
			return $('#'+canvasId)[0].toDataURL();
		}

		function drawIntoImage(imageId , base64String){

			$('#'+imageId)[0].src = base64String;
		}

		function showDeleteIconFor(index){
			if(index < icons.length){
				$('#slideRemoveIcon_'+index)[0].style.display = 'block';
			}
		}

		function hideDeleteIconFor(index){
			if(index < icons.length){
				$('#slideRemoveIcon_'+index)[0].style.display = 'none';
			}
		}

		function showEditIconsFor(index){
			$('#editRepIcon_'+index)[0].style.display = 'block';
			$('#editionIcon_'+index)[0].style.display = 'block';
		}

		function hideEditIconsFor(index){
			$('#editRepIcon_'+index)[0].style.display = 'none';
			$('#editionIcon_'+index)[0].style.display = 'none';
		}

		function getIcons(){
			return icons;
		}

		function updateUsedIndexes(){
			usedIndexes = getUsedIconIndexes();
		}

		var repEditedObjectid;
		function acceptRepChange(objectId , newindex){
			updateRepresentationForObjectFromMasterData(objectId , newindex);
			repEditedObjectid = objectId;
			$(this).trigger( "repEditFinished" );
		}

		function redrawIconsManagementSection(){
			usedIndexes = getUsedIconIndexes();
			fillItemsSectionWithCurrentIcons();		
		}