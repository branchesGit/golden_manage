export var handleStackLevelMap = {
	"teacherLevelHandleData": function( bars, config ){
		var len = bars && bars.length || 0;

		if( len ){
			var names = [];
			var levels = [];
			var levelsName = [];
			var barsData = [];

			var levelsInfos = bars[ 0 ].levelInfo;
			var levelsLen = levelsInfos.length;

			levelsInfos.map(function(levelsInfo,idx){
				levels[ idx ] = [];
			});

			bars.forEach(function( bar, barIdx ){
				names[ barIdx ] = bar.teacherName;
				var levelsInfo = bar.levelInfo;
				barsData[ barIdx ] = []; //柱子堆砌的数组集合：

				levelsInfo.forEach(function(levelInfo, levelIdx){
					if( !barIdx ){
						levelsName[levelsLen - 1 - levelIdx] = levelInfo["scoreBucket"]["min"] + '-' + levelInfo["scoreBucket"]["max"];
					}
					levels[levelsLen - 1 - levelIdx][barIdx] = levelInfo.count;
					barsData[ barIdx ][ levelIdx ] = levelInfo.count;

				});
				
			});


			return {
				names,
				levels,
				barsData,
				levelsName
			}
		}

		return null;
	}
}

export var handleStackLevelTooltipMap = {
	"levelStackTooltip": function( params,levelsName, barsData ){
		var { dataIndex } = params;
		var levelsInfos = [];

		levelsName.map(function(levelName,idx){
			levelsInfos[ idx ] = levelName + "：" + barsData[ dataIndex ][ levelsName.length - 1 - idx];
		});

		return levelsInfos.join('<br/>');
	}
}