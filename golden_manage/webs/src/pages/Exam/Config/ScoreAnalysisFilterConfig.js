import React from 'react'
//年级，班级，班级类型，考试场次的学科组件：
import GradeTypeExamFilter from '../Component/GradeTypeExamFilter'


//学科筛选组件：
import JuniorSubjectsFilter from '../Component/JuniorSubjectsFilter'

import { Alert } from 'antd'

export const CLASS_TYPE_TEACHING = "2";

export const MAIN_SUBJECTS = [
	{
		subjectID: '1',
		subjectName: '语文',
	},
	{
		subjectID: '2',
		subjectName: '数学',
	},
	{
		subjectID: '3',
		subjectName: '英语',
	}
];
//额外的添加项：
export const CHOOSE_SUBJS_FINISHED_SUBJE = {
		subjectID: '-1',
		subjectName:'学生个人选考科目'
};
	

//筛选年级，班级，班级类型,考试的配置
export const GRADE_EXAM_FILTER_MAP = {
	'gradeTypeExamFilter': GradeTypeExamFilter,
};


export const SUBJECTS_FILTER_MAP = {
	'juniorSubjectsFilter': JuniorSubjectsFilter
}

export const basicGradeFilterConfig = {
	gradeExam: {
		gradeExamFilter: 'gradeTypeExamFilter',
		_props: {
			classNames: 'brh-select inline' , //配置的class
		}
	},
	scoreType:{
		name: '计算方法：',
		classNames: 'score-types inline',
	 	types: [
	 		{
		        scoreMapTypeID:"3",
		        scoreMapTypeName:"标准分"
		    },
		 	{
		        scoreMapTypeID:"1",
		        scoreMapTypeName:"原始分"
		    }
		],
		warning: <Alert message="Informational Notes" type="info" showIcon />,
	},

	subjects:{
		_props: {
			name: '选择加入分析的学科或组合：',
			classNames: 'brh-subjects-filter',
			warning: <Alert message="教学班只能选择一门学科" type="info" showIcon />,
		},

		subjectsFilter: 'juniorSubjectsFilter',
	}
}

