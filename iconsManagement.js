		
		function initIconManagement(){
			//Init Sketcher
			var icons = [];
			var canvasId = 'newIconCanvas';
			var amountOfIconContainers = 3;
			
			var sketcher = atrament('#'+canvasId, 100, 100);
			sketcher.smoothing = true;
			sketcher.opacity = 0.8;
			sketcher.adaptiveStroke = true;
			//
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

		    
		    result += '	<div style="width:50px;height:50px;border-style:solid;border-width:2px" onmouseleave="hideDeleteIconFor('+index+')" onmouseenter="showDeleteIconFor('+index+')" >';
		    
		    result += '	<span align="right" id="slideRemoveIcon_'+index+'" style="cursor: pointer;display:none;" class="glyphicon glyphicon-trash" onclick="removeIcon('+index+')" ></span> ';
		    

		    result += '		<img id="slideImageContainer_'+index+'" style="position:relative;height:100%;width:100%"/>';
		    

		    result += '	</div>';
		    	
		    result += '</th>';
			return result;
		}

		function fillItemsSectionWithCurrentIcons(){
			if(amountOfIconContainers < icons.length){
				amountOfIconContainers = icons.length-1;
			}
			fillItemsSection();
			for(var i = 0; i < icons.length; i++){
				drawIntoImage('slideImageContainer_'+i , icons[i]);
			}
		}

		function addIcon(){
			icons.push(getCanvasBase64(canvasId));
			fillItemsSectionWithCurrentIcons();
		}

		function removeIcon(indexToRemove){
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