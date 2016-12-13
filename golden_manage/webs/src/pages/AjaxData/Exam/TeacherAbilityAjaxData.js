

//学科教师平均分对比
export var subjTeachAvgScore = {
	status: 'success',
	result: {
		avgScores: [
			{
				teacherName: '张三',
				score: 90
			},
			{
				teacherName: '张三',
				score: 90
			}
		]
	}

}


//教师盒须图 (箱线图)
export const teacherScoreBoxPlotResponse = {
	status:"success",
	result:{
		teacherScoreBoxPlot:[
			{
				teacherID:"1",
				teacherName:"一班",
				scoreInfo:{
					outliers:[
						{
							score:80
						}
					],
					box:{
						upper:90,
						Q3:85,
						median:80,
						Q1:73,
						lower:60
					}
				}
			},
			{
				teacherID:"2",
				teacherName:"2班",
				scoreInfo:{
					outliers:[
						{
							score:30
						},
                        {
                            score:20
                        }
					],
					box:{
						upper:90,
						Q3:75,
						median:80,
						Q1:93,
						lower:64
					}
				}
			}
		]
	}
};


//班级各层次学生数量对比 从最高传到最低
export const scoreLevelCountResponse = {
	status:"success",
	result:{
		scoreRankLevelInfo:[
			{
				teacherID:"1",
				teacherName:"一班",
				levelInfo:[
					{
						levelID:6,
						scoreBucket:{
							max:100,
							min:95
						},
						count:32
					},
					{
						levelID:5,
						scoreBucket:{
							max:95,
							min:85
						},
						count:24
					},
					{
						levelID:4,
						scoreBucket:{
							max:85,
							min:50
						},
						count:50
					},
					{
						levelID:3,
						scoreBucket:{
							max:50,
							min:15
						},
						count:43
					},
					{
						levelID:2,
						scoreBucket:{
							max:15,
							min:5
						},
						count:29
					},
					{
						levelID:1,
						scoreBucket:{
							max:5,
							min:0
						},
						count:16
					},
				]
			},

			{
				teacherID:"2",
				teacherName:"2班",
				levelInfo:[
					{
						levelID:6,
						scoreBucket:{
							max:100,
							min:95
						},
						count:43
					},
					{
						levelID:5,
						scoreBucket:{
							max:95,
							min:85
						},
						count:23
					},
					{
						levelID:4,
						scoreBucket:{
							max:85,
							min:50
						},
						count:4
					},
					{
						levelID:3,
						scoreBucket:{
							max:50,
							min:15
						},
						count:12
					},
					{
						levelID:2,
						scoreBucket:{
							max:15,
							min:5
						},
						count:20
					},
					{
						levelID:1,
						scoreBucket:{
							max:5,
							min:0
						},
						count:16
					},
				]
			}
		],


	}
};



//教师增量分析：

export var teacherWeightInfos = {
	status: 'success',
	result: {
		teachersWeightInfos: [
			{
				teacherID: '1',
				teacherName: '一',
				score: 0.01
			},

			{
				teacherID: '1',
				teacherName: '二',
				score: 0.5
			},
			{
				teacherID: '1',
				teacherName: '三',
				score: 0.5
			},

			{
				teacherID: '1',
				teacherName: '四',
				score: 0.5
			},
			{
				teacherID: '1',
				teacherName: '五',
				score:  5
			},

			{
				teacherID: '1',
				teacherName: '六',
				score: 0.5
			},
			{
				teacherID: '1',
				teacherName: '七',
				score: 0.5
			},

			{
				teacherID: '1',
				teacherName: '八',
				score: -0.5
			}
		]
	}
}