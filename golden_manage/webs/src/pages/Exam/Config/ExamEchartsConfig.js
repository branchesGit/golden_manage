
export const MAIN_SUBJS_SCORES = {
	title: '各班语数英科目对比',
	colors: ["#BCBCBC", "#169BD5"],
	legend: ['3+5满分','语数英'],
	detailsInfo: {
		color: ["#169BD5", "#FF9933","#339966"],
		tip: '基础科目成绩详情'
	},
	fields: ["mainSubjsScore", "totalScore"],
	onClickHandler: 'handleMainSubjsScores',
	formateHandler: 'reduceMainSubjs',
	name: 'className'
};

export const STU_SCORES_TOP_THREE = {
	title: '各班个人前三人数及平均分对比',
	colors: ["#BCBCBC", "#169BD5", "#FF6600"],
	legend: ['语数英', '中考规则3+3', '3+5满分'],
	fields: ["mainSubjsScore","entranceScore", "totalScore"],
	detailsInfo: {
		color: ["#FF6600"],
		tip: '未经过100%、80%、60%处理'
	},
	tooltip: "tre",
	name: 'className',
	formateHandler: 'reduceMainSubjs',
	onClickHandler: 'handleTop3SubsScores'
}

//学生选科科目个人前三人数分布
export const SUBJS_TOP3_SCORES = {	
	fields: ['top1','top2', 'top3'],
	handleData: 'handleSubjsTop3List',
	levelColors: [
		["#AEAEAE","#949494","#868686"],
		["#00FFFF","#00CCFF","#0099FF"]
	],
	onClickHandler: 'handleTopLevelPie',
	name: 'subjectName',
	label:"formateSubjsTop3Label",
	position: 'top'
};	

export const EAXY_MAIN_SUBJS_BAR = {
	name: 'subjectName',
	valueName: 'score',
	handleData: 'easyBarList',
}

export const EAXY_STU_RANK_BAR = {
	name: 'topName',
	valueName: 'score',
	handleData: 'easyBarList',

}

//年级学科前三
export const STU_TOP3_IN_CLASSES = {
	handleData: 'handleStuInClasses',
	name: 'className',
	valueName: 'stuCount',
}

/*

export const COMMON_PIE_CONFIG = {
	formatter: '{b}\n{c}人',
	colors: ["#DEDEDE","#D6D6D6","#939393","#5E5E5E","#434343", "#797979","#D5D5D5"],
}

*/

export const MUTABLE_PIE_CONFIG = {
	formatter: '{d}%',
	legend:["不变","变动1门","变动2门"],
	colors: ["#32CB00","#FF9900","#FF0000"],
	onMouseOverHandle: 'onMouseOverMutableHandle',
	name: 'statusName',
	valueName: 'stuCount',
	handleData: 'easyBarList',
}



//班级学科Echarts配置信息：
export const CLASS_COMPARE_CONFIG = {
	name: 'examName',
	colors: ["#169BD5","#A2A2A2"],
	tooltip: 'tooltipMainHanlder',
	legend: [ '语数英',"总分"],
	fields: ['mainSubjsScore', 'totalScore'],
	toolTip: {
		formatter: 'compTooltip'
	},
	onClickHandler: 'mainSubjsDetailInfo'
}

//科目最高，最底的配置：
export const HEIGHT_LOWER_CONFIG = {
	colors: ["#FF9933","#169BD5","#339966"],
	"handleData": "handleMainSubjsHLScores",
	fields: ["heightestScore", 'avgScore', 'lowestScore'],
	name: 'subjectName',
	legend: ["最高分","平均分", "最低分"],
}

//班级平均分对比：
export const STU_AVG_COMP_CONFIG = {
	colors: ["#169BD5","#99A0BD", "#FF9933"],
	fields: ["mainScore","entranScore","totalScore"],
	legend:["语数英",'个人前三','总分'],
	tooltip: "tooltipAvgHandler",
	onClickHandler: 'handleStuAvgRank',
};

//班级平均前三排名信息：
export const STU_AVT_RANK_TOP3 = {
	name: 'rankName',
	fields: ["score"],
	colors: ["#169BD5"],
	handleData: 'handleStuAvgRank'

}


//学科前三配置信息：（班级）
export const CLASS_SUBJS_TOP3_SCORES = {	
	fields: ["rank1","rank2","rank3"],
	levelColors: [
		["#AEAEAE","#949494","#868686"],
		["#00FFFF","#00CCFF","#0099FF"]
	],
	onClickHandler: 'handleTopLevelStuList', //
	handleData: 'handleExamTop3Data'
};	


//班级前3的变动情况：
export const CLASS_TOP3_STATUS = {
	colors: ["#33CC00","#FF9900","#FF0000"],
	title: '变动情况分布',
	legend: ["不变",'变动1门','变动2门'],
	handleData: "handleClsTop3Status",
	onClickHandler: 'handleClickClsTop3Status',
	activeColor: '#FF6600',
}



/*教师能力基本分析*/
export const TEACHER_ABILITY_AVG_BAR = {
	handleData: 'handleAbilityAvg',
	name: 'teacherName',
	valueName: 'score',
	option: {
		color: ["#169FF4"],
		xAxis: {
			axisTick:{
				show: false
			},
			type:'category',
		},
		yAxis: {
			type: 'value',
			axisTick:{
				show:false
			},
			axisLine: {
				show:false
			},
			axisLabel: {
				show: false
			}
		},
		series: [
			{
				type: 'bar',
				data: [],
				markLine:{
					label: {
						normal: {
							show:true,
							color: 'gray'
						}
					},
					data:[
						{
						    name: '平均线',
						    // 支持 'average', 'min', 'max'
						    type: 'average'
						}
					],
				},
			}
		]
	}
}

export const TEACHER_ABILITY_PLOT_BOX = {
	handleData: 'handlePlotBoxData',
	xAxisName:'teacherName',
	itemName: 'scoreInfo',
	boxName: 'box',
	boxFields: ["lower", "Q1","median", "Q3", "upper" ],
	outliersName: 'outliers',
	outlierName: 'score',

	option: {
		tooltip: {
            trigger: 'item',
            axisPointer: { type: 'shadow' }
        },

        grid: { left: '10%', right: '10%', bottom: '15%' },
        xAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: true
            },
            axisLabel:{
                show:true,
                interval:0,
                margin: 8
            }
        },
        yAxis: {
            type: 'value',
            splitArea: {
                show: true
            }
        },

        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: [],
                tooltip: {
                	/*formatter: function( params ){
                		return [
                            param.name + ': ',
                            '最高: ' + param.data[4],
                            '上四分之一位: ' + param.data[3],
                            '中位数: ' + param.data[2],
                            '下四分之一位: ' + param.data[1],
                            '最低: ' + param.data[0]
                        ].join('<br/>')
                	}*/
                },
            },
            {
                name: 'outlier',
                type: 'scatter',
                data: [], //scatterData,
                tooltip:{}
            }
        ],
	},

	boxFormatter: 'common',
	scatterFormatter: 'common'
}


export const TEACHER_LEVEL_BAR = {
	"handleData": 'teacherLevelHandleData',
	tooltipHandler: 'levelStackTooltip',
	colors: ["#A0E3E7","#59D2D4","#2CA5A7","#169FF4","#0182D3","#0361A4"],
	option: {
		legend:{
			data: [],
		},	
		color: ["#A0E3E7","#59D2D4","#2CA5A7","#169FF4","#0182D3","#0361A4"],
		tooltip: {
            trigger: 'item',
            axisPointer: { type: 'shadow' }
        },
		xAxis: {
            type: 'category',
            data: [],
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: true
            },
            axisLabel:{
                show:true,
                interval:0,
                margin: 8
            }
        },
        yAxis: {
        	"type": "value",
			"splitLine": {
				"show": false
			},
			"axisLine": {
				"show": false
			},
			"axisTick": {
				"show": false
			},
			"axisLabel": {
				"show": false
			}
        }
	}
};



export const TEACHER_WEIGHT_BAR = {
	handleData: 'handleAbilityAvg',
	name: 'teacherName',
	valueName: 'score',
	option: {
		color: ["#169FF4"],
		xAxis: {
			axisTick:{
				show: false
			},
			type:'category',
		},
		yAxis: {
			type: 'value',
			axisTick:{
				show:false
			},
			axisLine: {
				show:false
			},
			axisLabel: {
				show: false
			}
		},
		series: [
			{
				type: 'bar',
				data: [],
			}
		]
	}
}