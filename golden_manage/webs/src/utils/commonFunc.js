import jQuery from 'jquery'

export function searchInObject( obj, searchStr, splitStr ){
	splitStr = splitStr || "|";
	var names = searchStr.split( splitStr );

	if( obj ){
		var i = 0, len = names && names.length || 0;
		
		while( i < len ){
			obj = obj[names[i]] || {};
			i++;
		}
	}

	return obj;
}


export function ajaxAsyn( url, data, method ){
	url +=  "?time=" + (+new Date);

	var promise = jQuery.ajax({
		url: url,
		method: method || 'get', 
		data: data
	});

	return promise;
}