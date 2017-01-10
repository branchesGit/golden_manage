import GradeExamFilter from './GradeExamFilter'
import React from 'react'
import classNames from 'classnames'
import { getTargetValue } from './ScoreAnalysisFilterUtil'
import { Select } from 'antd'
import { setGradeExamMap, getGradeExamMap } from './ScoreAnalysisFilterUtil'
import { MAIN_SUBJECTS , CHOOSE_SUBJS_FINISHED_SUBJE, CLASS_TYPE_TEACHING } from '../Config/ScoreAnalysisFilterConfig'

const Option = Select.Option;

class GradeTypeExamFilter extends GradeExamFilter
{
	constructor( props )
	{
		super( props );

		this.initResult;
		this.handleGradeChange = this.handleGradeChange.bind( this );
		this.handleClassTypeChange = this.handleClassTypeChange.bind( this );
		this.handleExamChange = this.handleExamChange.bind( this );
	}

	//年级，班级类型，考试场次的管理：
	initState( result )
	{
		this.initResult = result;
		var { grades, gradeClassTypeMap, gradeExamMap } = result;

		var gradeID = getTargetValue( grades, "grade" );
		var classTypes = gradeClassTypeMap[ gradeID ];
		var classTypeID = getTargetValue( gradeID, gradeClassTypeMap, 'classTypeID');
		var exams = gradeExamMap[ gradeID ];
		var examID = getTargetValue( gradeID, gradeExamMap, 'examID');

		var subjectInfo = this.initSubjects( examID, classTypeID );
		
		var state = {
			grades, gradeID,
			classTypes, classTypeID,
			exams, examID,
			subjectInfo
		};

		this.setState(state);
	}

	getSubjectsByExamID( examID )
	{
		var { examSubjMap } = this.initResult;

		var subjects = examSubjMap[ examID ];
		var { finishedChooseSubjs } = this.props;

		//如果配置了选科结束的话：
		if( finishedChooseSubjs )
		{
			subjects = subjects.filter(function(subject,idx){
				var subjectID = subject.subjectID;
				var idx = MAIN_SUBJECTS.findIndex(function(subj,index){
					return subj.subjectID === subjectID;
				});

				return idx !== -1;
			});

			var subjs = $.extend( true, [], subjects );
			subjs.forEach(function(subject,idx){
				subject["choose"] = true;
			});

			subjs.push($.extend(true, {}, CHOOSE_SUBJS_FINISHED_SUBJE) );

			return subjs;
		}
		else
		{
			var subjs = $.extend( true, [], subjects );
			subjs.map(function(subject){
				var index = MAIN_SUBJECTS.findIndex(function(subj,idx){
					return subj.subjectID === subject.subjectID;
				});

				if( index !== -1 ){
					subject["choose"] = true;
				}
			});

			return subjs;
		}
	}
	
	//默认选中的学科：
	initSubjects( examID, classTypeID )
	{
		var subjectInfo = {};
		var subjects = this.getSubjectsByExamID( examID );
		subjectInfo["subjects"] = subjects;
		subjectInfo["multiChooseable"] = true;
		//教学班的逻辑处理要分开：
		if( classTypeID === CLASS_TYPE_TEACHING )
		{	
			var chooseCount = 0;

			subjects.map(function(subject,idx){
				if( subject["choose"] )
				{
					var index = MAIN_SUBJECTS.findIndex(function(subj){
						return subject.subjectID === subj.subjectID;
					});

					if( index !== -1 )
					{
						if( chooseCount == 0 )
						{
							chooseCount++;
						}
						else
						{
							subject["choose"] = false;
						}
					}
				} 
			});

			subjectInfo["multiChooseable"] = false;
		}
	
		return subjectInfo
	}

	 //处理grade改变逻辑：
 	handleGradeChange( value )
 	{
 		//this.setState({stateName: vlaue});
 		var { grades, gradeClassTypeMap, gradeExamMap } = this.initResult;
 		var gradeID = value;

 		var classTypes = gradeClassTypeMap[ gradeID ];
		var classTypeID = getTargetValue( gradeID, gradeClassTypeMap, 'classTypeID');
		var exams = gradeExamMap[ gradeID ];
		var examID = getTargetValue( gradeID, gradeExamMap, 'examID');

		var state = {
			grades, gradeID,
			classTypes, classTypeID,
			exams, examID
		};

		this.setState(state);
 	}

 	//班级类型处理：如果
 	handleClassTypeChange( classTypeID )
 	{
 		var { examID } = this.state;

 		// 如果是教学班的话：
 		if( classTypeID === CLASS_TYPE_TEACHING )
 		{
 			var subjectInfo = this.initSubjects( examID,classTypeID );
 			this.setState({subjectInfo,classTypeID})
 		}
 		else
 		{
 			this.setState({classTypeID});	
 		}
 	}

 	handleExamChange(value)
 	{
 		this.setState({'examID':value});	
 	}

	render()
	{
		var klaset = this.handleCompClassInfo();
		var { grades, gradeID, classTypes, classTypeID, exams, examID } = this.state;


		return (
			<div className={classNames(klaset)}>
				{
					grades && grades.length ? 
					<div className="brh-filter-group" key="grade" >
						<span>年级：</span>
						<Select value={gradeID} onChange={this.handleGradeChange}>
						{
							grades.map(function(gradeInfo,idx){
								return <Option key={idx} value={gradeInfo.grade}>{gradeInfo.gradeName}</Option>
							})
						}
						</Select>
					</div> : ""
				}

				{
					classTypes && classTypes.length ? 
					<div className="brh-filter-group" key="class-type">
						<span>年级：</span>
						<Select value={classTypeID}  onChange={this.handleClassTypeChange}>
						{
							classTypes.map(function(classTypeInfo,idx){
								return <Option key={idx} value={classTypeInfo.classTypeID}>{classTypeInfo.classTypeName}</Option>
							})
						}
						</Select>
					</div> : ""
				}

				{
					exams && exams.length ? 
					<div className="brh-filter-group" key='exam' >
						<span>年级：</span>
						<Select value={examID}  onChange={this.handleExamChange}>
						{
							exams.map(function(examInfo,idx){
								return <Option key={idx} value={examInfo.examID}>{examInfo.examName}</Option>
							})
						}
						</Select>
					</div> : ""
				}
			</div>
		)
	}
}

module.exports = GradeTypeExamFilter;