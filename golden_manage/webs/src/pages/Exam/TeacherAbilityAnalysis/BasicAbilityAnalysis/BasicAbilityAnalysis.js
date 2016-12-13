import React from 'react'
import TeacherAbilityCondCard from '../Component/TeacherAbilityCondCard'
import SubjsTeachersAvgCard from './Component/SubjsTeachersAvgCard'
import SubjsTeachersPlotCard from './Component/SubjsTeachersPlotCard'
import SubjsTeachersLevelCard from './Component/SubjsTeachersLevelCard'

import { subjTeachAvgScore, teacherScoreBoxPlotResponse, scoreLevelCountResponse } from '../../../AjaxData/Exam/TeacherAbilityAjaxData'

class BasicAbilityAnalysis extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};
	}

	componentWillMount()
	{
		this.queryTeacherAbilityAnalyssis();
	}


	queryTeacherAbilityAnalyssis( queryObj )
	{
		this.querySubjsTeachersAvg( queryObj );

		this.queryTeacherPlotBoxScores( queryObj );

		this.queryTeacherLevelScores( queryObj );
	}

	//查询学科教师的平均分对比：
	querySubjsTeachersAvg()
	{
		var susHandler = function( data ){
			this.setState({subjsTeachersAvg: data.result.avgScores});
		},
		failHandler = function( data ){

		};

		susHandler.call( this, subjTeachAvgScore );
	}

	//查询教师盒须图数据：
	queryTeacherPlotBoxScores( queryObj )
	{
		var susHandler = function( data ){
			this.setState({teacherScoreBoxPlot: data.result.teacherScoreBoxPlot});
		},
		failHandler = function( data ){

		};

		susHandler.call( this, teacherScoreBoxPlotResponse );
	}

	queryTeacherLevelScores( queryObj )
	{
		var susHandler = function( data ){
			this.setState({scoreRankLevelInfo: data.result.scoreRankLevelInfo});
		},
		failHandler = function( data ){

		};

		susHandler.call( this, scoreLevelCountResponse );
	}

	render()
	{
		var { subjsTeachersAvg,
			  teacherScoreBoxPlot,
			  scoreRankLevelInfo } = this.state;

		return (
			<div>
				<TeacherAbilityCondCard   />
				<SubjsTeachersAvgCard {...{subjsTeachersAvg}} />
				<SubjsTeachersPlotCard {...{teacherScoreBoxPlot}}/>
				<SubjsTeachersLevelCard {...{scoreRankLevelInfo}}/>
			</div>
		)
	}
}

module.exports = BasicAbilityAnalysis;