function addItemsAfterTextbox(obj){
		// obj should be: {
		// domObj: jQuery("#testC")[0];				
		// items:['agree','disagree'];				
		// sIndex: 2;							
		// itemKind:0;							
		// colCount:3;							
		// }
		//depend on JQuery
	var isDom = (typeof HTMLElement === 'object')?function(unKownObj){			
			return unKownObj instanceof HTMLElement;
		}:function(unKownObj){
			return unKownObj && typeof unKownObj === 'object' && unKownObj.nodeType === 1 && typeof unKownObj.nodeName === 'string';
		};
	if(!isDom(obj.domObj)){
		return (function(){
			alert('obj.domObj is not a DOM object!')
		})();
	}
	var jqObj = jQuery(obj.domObj);
	jqObj.attr('readOnly','readOnly');
	var objId = obj.domObj.id;
	var itemsCount = obj.items.length;
	var colCountPerLine = (obj.colCount==undefined)?4:obj.colCount;								
	var tdWidth = parseInt(100/colCountPerLine);
	var rowA = itemsCount/colCountPerLine;
	var rowB = parseInt(rowA);
	var rowCount = (rowB==rowA)?rowB:(rowB+1);
	var iKind = (obj.itemKind==0)?'radio':'checkbox';
	var selIndex = [0];
	if(!isNaN(obj.sIndex)){
		selIndex[0] = obj.sIndex;
	}
	else if(jQuery.isArray(obj.sIndex)){
		selIndex = obj.sIndex;
	}
	var itemsToAdd = "";
	itemsToAdd += "<table style='display:none;' id= TB_" + objId + ">"
	for(var i=0; i<itemsCount; i+=1){
		var tdId =  objId + "_" + i;
		var tdVal = obj.items[i];
		if(i%colCountPerLine==0){
			itemsToAdd += "<tr>";
		}
		itemsToAdd += "<td id='" + tdId + "' width="+ tdWidth +"%>" 
		itemsToAdd += "<input id='CB_" + tdId + "' name='CBName_" + objId + "' type='" + iKind + "' value='" + tdVal + ",'/>" + tdVal + "</td>";
		if(i%colCountPerLine==colCountPerLine-1 || (i==itemsCount-1 && i%colCountPerLine!=colCountPerLine-1)){
			itemsToAdd += "</tr>";
		}
	}
	itemsToAdd += "</tr></table>"
	jQuery(itemsToAdd).insertAfter(jqObj);
	
	jqObj.bind('click',function(){                  			
  		jQuery("#TB_"+objId).toggle();
  		var inputNameStr = "#TB_"+objId +" input:" + iKind;
  		var selText = jqObj.val();
  		if(selText==''){
  			jQuery(inputNameStr).removeAttr("checked");
  			var valToJoin = "";
  			for(var i=0;i<selIndex.length;i++){							//alert(jQuery(inputNameStr + ":eq(" + selIndex[i] + ")").val());
  				jQuery(inputNameStr + ":eq(" + selIndex[i] + ")").attr("checked","true").each(function(){		
					valToJoin += jQuery(this).val();
				});
  			}
  			jqObj.val(trimRCom(valToJoin));
  		}
  		else{
	  		jQuery(inputNameStr).each(function(){
	  			jQuery(this).removeAttr("checked");
	  			if(jQuery(this).val()==selText + ','){
	  				jQuery(this).attr("checked","checked");
	  			}
	  		})
  		}
  		//jQuery("#TB_"+objId +" input:" + iKind).find("[value='disagree,']").attr("checked");
 	})

	jQuery("#TB_"+objId +" input:" + iKind).bind('click',function(){	
	    var valToJoin = "";
		jQuery("#TB_"+objId +" input:" + iKind + ":checked").each(function(){
			valToJoin += jQuery(this).val();
		});
      	jqObj.val(trimRCom(valToJoin));
	})
}