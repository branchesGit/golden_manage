import React from 'react'
import RankChangeTable from '../components/RankChangeTable'
import { gradeExamMap,classRankInfos } from '../../../AjaxData/Exam/EntranceAnalysis'
import ExamFilter from '../components/ExamFilter' 
import * as SeniorExtranceUtil from '../SeniorEntranceExamUtil'

const handleRankData = SeniorExtranceUtil.handleRankData
const handleSelectChange = SeniorExtranceUtil.handleSelectChange

class GradeAnalysis extends React.Component
{
	constructor( props )
	{
		super( props );

		this.type = 'grade';
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
			if( data.status === 'success' && data.result )
			{
				if(data.result.classRankInfos)
				{
					var classRankInfos = data.result.classRankInfos&&data.result.classRankInfos;
					var classRankData = handleRankData(classRankInfos);
					this.setState({classRankData});
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

		success.call(this,classRankInfos);
		success.call(this,gradeExamMap);

		this.setState({
			computeWay:'standardScore'
		})
	}

	render()
	{
		var t = this;
		var type = t.type;
		var { classRankData,gradeExamData,computeWay } = t.state;
		var ruleTypeMap = SeniorExtranceUtil.ruleTypeMapGrade;
		
		return (
			<div>
				<ExamFilter mapData={gradeExamData} type={type} handleSelectChange={handleSelectChange.bind(t)} computeWay={computeWay}/>
				<RankChangeTable rankData={classRankData} ruleTypeMap={ruleTypeMap} type={type} />
			</div>
		)
	}
}

module.exports = GradeAnalysis;