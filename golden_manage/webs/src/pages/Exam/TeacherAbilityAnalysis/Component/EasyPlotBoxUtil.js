export var handlePlotBoxMap = {
	"handlePlotBoxData": function( boxes, config ){
		var {boxFields, itemName, xAxisName, boxName, outliersName, outlierName } = config;

		var len = boxes && boxes.length || 0;

		if( len ){
			var xAxisNames = [];
			//异常数据：
			var scatters = [];
			//盒子数据长度为5的数组：
			var plotBoxes = [];

			boxes.map(function(box,boxIdx){
				xAxisNames[ boxIdx ] = box[ xAxisName ];
				var itemDetails = box[ itemName ];

				plotBoxes[boxIdx] = [];
				boxFields.map(function(boxField,idx){
					plotBoxes[ boxIdx ][idx] = itemDetails[ boxName ][ boxField ];
				});

				var outliers = itemDetails[ outliersName ];
				outliers && outliers.map(function(outlier,outlierIdx){
					scatters.push([boxIdx, outlier[outlierName] ] );
				})

			});

			return {
				xAxisNames,
				scatters,
				plotBoxes
			}
		}

		return null;
	},
}


export var boxFormatterMap = {
	"common": function( param ){
        return [
            param.name + ': ',
            '最高: ' + param.data[4],
            '上四分之一位: ' + param.data[3],
            '中位数: ' + param.data[2],
            '下四分之一位: ' + param.data[1],
            '最低: ' + param.data[0]
        ].join('<br/>')
	}
}

export var scatterFormatterMap = {
	"common": function( param ){
		return [
			'异常值：',
			'分数：' + param.value[1]
		].join('<br/>');		
	}
}