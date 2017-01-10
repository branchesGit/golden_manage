import React from 'react'
import { GRADE_EXAM_FILTER_MAP, SUBJECTS_FILTER_MAP } from '../Config/ScoreAnalysisFilterConfig'
import ScoreTypeFilter from './ScoreTypeFilter'
import SubjectsFilter from './SubjectsFilter'

//这里组织筛选组件的入口：
class ScoreAnalysisFilter extends React.Component
{
	constructor( props )
	{
		super( props );

		this.GradeExamFilterInitCallback = this.GradeExamFilterInitCallback.bind( this );
		this.handleCabllbakcGradeExamFilter = this.handleCabllbakcGradeExamFilter.bind( this );

		this.ScoreTypesInitCallback = this.ScoreTypesInitCallback.bind( this );
		this.handleScoreTypesCallback = this.handleScoreTypesCallback.bind( this );

		this.SubjectsFilterInitCallback = this.SubjectsFilterInitCallback.bind( this );
		this.handleSubjsCallback = this.handleSubjsCallback.bind( this );


		this.state = {};
		
		this.initCallbackCount = 0;
	}	

	//注册设置了首次完成initState的回调，为了查询。
	GradeExamFilterInitCallback( examFilterState )
	{
		var { subjectInfo } = examFilterState;

		this.setState({subjectInfo});
		

		this.initCallbackCount--;
		if( this.initCallbackCount === 0 )
		{
			//启动查询功能：
			console.log('query result by filter object ~');
		}
	}

	//注册年级，班级，班级类型，考试，改变的回调函数：
	//为了回调遮罩层的逻辑处理
	handleCabllbakcGradeExamFilter( examFilterState )
	{
		var { subjectInfo } = examFilterState;
		this.setState({subjectInfo});
		this.props.handleMarkLaer( true );
	}

	getGradeExamFilter()
	{
		var { config, finishedChooseSubjs } = this.props;
		var { gradeExam } = config;

		var gradeExamFilterName = gradeExam["gradeExamFilter"];
		var GradeExamFilter = GRADE_EXAM_FILTER_MAP[gradeExamFilterName];
		var handleCabllbakcGradeExamFilter = this.handleCabllbakcGradeExamFilter;
		var GradeExamFilterInitCallback = this.GradeExamFilterInitCallback;

		var initProps = {
			_props:gradeExam["_props"], 
			GradeExamFilterInitCallback, 
			handleCabllbakcGradeExamFilter, 
			finishedChooseSubjs,
			ref: 'gradeExam'
		};

		this.initCallbackCount++;

		return <GradeExamFilter {...initProps} />
	}


	ScoreTypesInitCallback()
	{
		this.initCallbackCount--;

		if( this.initCallbackCount === 0 )
		{
			//启动查询功能：
			console.log('query result by filter object ~');
		}
	}

	//注册计算方式状态改变：
	handleScoreTypesCallback()
	{

	}

	getScoreTypeFilter()
	{
		var { config } = this.props;
		var { scoreType } = config;

		if( scoreType )
		{
			var ScoreTypesInitCallback = this.ScoreTypesInitCallback;
			var handleScoreTypesCallback = this.handleScoreTypesCallback;

			var initProps = {
				_props: scoreType,
				ScoreTypesInitCallback,
				handleScoreTypesCallback,
				ref: 'scoreTypes'
			};

			this.initCallbackCount++;

			return <ScoreTypeFilter {...initProps} />
		}
	}


	SubjectsFilterInitCallback()
	{
		this.initCallbackCount--;

		if( this.initCallbackCount === 0 )
		{
			//查询功能：
			console.log('query result by filter object ~');
		}
	}

	handleSubjsCallback()
	{

	}

	getSubjectsFilter()
	{
		var { config } = this.props;
		var { subjects } = config;

		var { subjectInfo } = this.state;

		if( subjects && subjectInfo )
		{

			console.log(subjectInfo );
			this.initCallbackCount++;
			var SubjectsFilterInitCallback = this.SubjectsFilterInitCallback;
			var handleSubjsCallback = this.handleSubjsCallback;

			var initProps = {
				_props:subjects._props,
				subjects:  subjectInfo.subjects || [],
				multiChooseable: subjectInfo.multiChooseable,
				ref: 'subjectsFilter',
				SubjectsFilterInitCallback,
				handleSubjsCallback
			};

			var SubjsFilterName = subjects["subjectsFilter"]
			var SubjectsFilter = SUBJECTS_FILTER_MAP[SubjsFilterName];

			return <SubjectsFilter {...initProps}  />
		}
	}

	getQueryData()
	{
		var query = {};
		var refs = this.refs;

		var { gradeExam, scoreTypes, subjectsFilter } = refs;
		var data;
		
		var extendQuery = function( source, target ){
			if( source ){
				target = target || {};

				for( var name in source ){
					target[ name ] = source[ name ];
				}
			}
		};
		//这里查询的数据，如何子类来提供：
		if( gradeExam )
		{
			extendQuery( gradeExam.getQueryData(), query );
		}

		if( scoreTypes )
		{
			extendQuery( gradeExam.getQueryData(), query );
		}

		if( subjectsFilter )
		{
			extendQuery( gradeExam.getQueryData(), query );
		}

		return query;

	}

	render()
	{	
		//每次render应该把它重置为初始值；
		this.initCallbackCount = 0;

		return (
			<div className="score-analysis-filter">
			{
				this.getGradeExamFilter()
			}
			{
				this.getScoreTypeFilter()
			}	
			{
				this.getSubjectsFilter()
			}
			</div>
		);
	}
}

module.exports = ScoreAnalysisFilter;