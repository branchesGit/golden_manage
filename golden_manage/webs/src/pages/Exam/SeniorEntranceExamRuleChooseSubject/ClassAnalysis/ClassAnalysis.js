import React from 'react'
import RankChangeTable from '../components/RankChangeTable'
import ExamFilter from '../components/ExamFilter' 
import { gradeExamMap,studentsRankInfos } from '../../../AjaxData/Exam/EntranceAnalysis'
import * as SeniorExtranceUtil from '../SeniorEntranceExamUtil'

const handleRankData = SeniorExtranceUtil.handleRankData
const handleSelectChange = SeniorExtranceUtil.handleSelectChange

class ClassAnalysis extends React.Component
{
	constructor( props )
	{
		super( props );

		this.type = 'class';
	}

	componentWillMount()
	{
		this.queryData();
	}

	componentWillReceiveProps( newProps )
	{
		this.queryData();
	}

	queryData()
	{//请求相关数据
		var success = function( data )
		{
			if( data.status === 'success' )
			{
				if( data.result.studentsRankInfos )
				{
					var studentsRankInfos = data.result.studentsRankInfos&&data.result.studentsRankInfos;
					var allStudentsRankData = handleRankData( studentsRankInfos );

					this.allStudentsRankData = allStudentsRankData;
					
					var studentsRankData = {};
					$.extend(true,studentsRankData,allStudentsRankData);
					//var studentsRankData = handleRankData( studentsRankInfos );
					studentsRankData.columnData = studentsRankData&&studentsRankData.columnData.slice(0,2);

					this.studentsRankData = studentsRankData;
					this.setState({
						studentsRankData:studentsRankData,
					})
				}
				else
				{
					var gradeExamData = data.result.gradeExamMap&&data.result.gradeExamMap;
					this.setState({gradeExamData});
				}			
			}
		},
		fail = function()
		{
		}

		success.call( this,studentsRankInfos );
		success.call( this,gradeExamMap );

		this.setState({
			computeWay:'standardScore'
		})
	}

	

	onShowAllStudent(flag)
	{
		var showData;

		if(!flag)
		{
			showData = this.allStudentsRankData;			
		}
		else
		{
			showData = this.studentsRankData;
		}

		this.setState({
			studentsRankData:showData
		})
		
	}

	render()
	{
		var t = this;
		var type = t.type;
		var { studentsRankData,gradeExamData,computeWay } = t.state;
		var ruleTypeMap = SeniorExtranceUtil.ruleTypeMapClass;

		return (
			<div>
				<ExamFilter mapData={gradeExamData} type={type} handleSelectChange={handleSelectChange.bind(t)} computeWay={computeWay}/>
				<RankChangeTable rankData={studentsRankData} type={type} onShowAllStudent = {t.onShowAllStudent.bind(t)} ruleTypeMap={ruleTypeMap}/>
			</div>
		)
	}
}

module.exports = ClassAnalysis;