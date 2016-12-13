
export var HandleDataMap = {
	"handleAbilityAvg": function( list, config ){
		var len = list && list.length || 0;

		var name = config.name;
		var valName = config.valueName;

		if( len ){
			var names = [], values = [];

			list.map(function(item,idx){
				names[ idx ] = item[ name ];
				values[ idx ] = item[ valName ];
			});

			return {
				names,
				values
			}
		}

		return null;
	},

};