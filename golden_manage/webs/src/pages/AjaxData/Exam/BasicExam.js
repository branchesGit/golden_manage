export const gradeClassTypeResponse = {
	status:"success",
	result:{
		grades:[
			{
				grade:"1",
				gradeName:"高一（2016级）"
			},
			{
				grade:"2",
				gradeName:"高二（2016级）"
			},
		],
		gradeClassTypeMap:{
			"1":[
				{
					classTypeID:"1",
					classTypeName:"行政班"
				},
				{
					classTypeID:"2",
					classTypeName:"教学班",
				}
			],
			"2":[
				{
					classTypeID:"3",
					classTypeName:"行政班"
				},
				{
					classTypeID:"4",
					classTypeName:"教学班",
				}
			]
		},

		gradeClassesMap:{
			"1":[
				{
					className:"高一1班",
					classID:"1"
				},
				{
					className:"高一2班",
					classID:"2"
				}
			],
			"2":[
				{
					className:"高二1班",
					classID:"3"
				},
				{
					className:"高二2班",
					classID:"4"
				}
			],
		},


		gradeExamMap:{
			"1":[
				{
					examID:"1",
					examName:"高一上期中考试"
				},
				{
					examID:"2",
					examName:"高一下期中考试"
				}
			],
			"2":[
				{
					examID:"3",
					examName:"高二上期中考试"
				},
				{
					examID:"4",
					examName:"高二下期中考试"
				}
			],
		},

		examSubjMap:{
			1:[
				{
					subjectName:"语文",
					subjectID:"1"
				},
				{
					subjectName:"数学",
					subjectID:"2"
				},

				{
					subjectID: '4',
					subjectName: '物理',
				}
			],
			2:[
				{
					subjectName:"语文",
					subjectID:"1"
				},
				{
					subjectName:"数学",
					subjectID:"2"
				}
			]
		}
	}
};


export var subjectComparisonResponse = {
	status: 'success',
	result: {
		comparisonInfos: [
			{
				examName: '2015第一学期期中考试',
				bestInfo: {
					subjectScores:[
						{
							subjectName: '物理',
							subjectShortName: '物',
							score: 99,
							subjectID: 1
						},
						{
							subjectName: '化学',
							subjectShortName: '化',
							score: 80,
							subjectID: 2
						},
						{
							subjectName: '地理',
							subjectShortName: '地',
							score: 76,
							subjectID: 6
						}
					],
					rankPrecent: '0.8'
				},
				targetInfo:{
					subjectScores:[
						{
							subjectName: '物理',
							subjectShortName: '物',
							score: 99,
							subjectID: 1
						},
						{
							subjectName: '地理',
							subjectShortName: '地',
							score: 76,
							subjectID: 6
						},
						{
							subjectName: '生物',
							subjectShortName: '生',
							score: 83,
							subjectID: 3
						},
						rankPrecent: '0.78'
					]
				} 
			}
		]
	}
}


export const LEGEND_TITILE = [
	{
		title: '语数英',
		subjectID: 0,
		color: '#00CCFF'
	},
	{
		title: '物理',
		subjectID: 1,
		color: '#66CC99',
	},
	{
		title: '化学（生物）',
		subjectID: [ 2, 3, 23 ],
		color: '#FFCC99',
	},
	{
		title: '地理',
		subjectID: 6,
		color: '#66CCCC',
	},
	{
		title: '历史',
		subjectID: 5,
		color: '#9999FF',
	},
	{
		title: '政治',
		subjectID: 4,
		color: '#FF9999',
	}
]