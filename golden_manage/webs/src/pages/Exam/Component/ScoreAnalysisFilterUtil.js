var gradeExamMapInfo;

export function setGradeExamMap( gradeExamMap ){
	gradeExamMapInfo = gradeExamMap;
}

export function getGradeExamMap(){
	return gradeExamMapInfo;
}

export function getTargetValue( sourceName, source, targetName ){
	if( typeof sourceName !== 'string' ){
		targetName = source;
		source = sourceName;
		sourceName = null;
	}

	if( sourceName ){
		source = source[sourceName];
		var len = source && source.length || 0;
		if( len ){
			source = source[0];
			return source[ targetName ];
		}
	} else {
		var len = source && source.length || 0;
		if( len ){
			source = source[ 0 ];

			return source[ targetName ];
		}
	}
};


export function isObjectValueEqual(a, b) {

	if( !a || !b )
	{
		return false;
	}
	
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
 
    if (aProps.length != bProps.length) {
        return false;
    }
 
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
 	
 		if( typeof a[propName] === "object" || typeof a[propName] === 'array' )
 		{
 			if( isObjectValueEqual( a[propName], b[propName] ) )
 			{
 				continue;
 			}
 			else
 			{
 				return false;
 			}
 		}
 		else if (a[propName] !== b[propName]) 
 		{
            return false;
        }
    }

    return true;
}

export function isEmptyObj( obj ){
	
	for( var name in obj ){
		return false;
	}
	
	return true;
}