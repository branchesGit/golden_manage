import React from 'react'
import SubjTeacherWeightCard from './Component/SubjTeacherWeightCard'


import { teacherWeightInfos } from '../../../AjaxData/Exam/TeacherAbilityAjaxData'


class IncrementAnalysis extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};
	}

	componentWillMount()
	{

		this.queryTeacherWeightAvgInfos();

	}

	queryTeacherWeightAvgInfos()
	{
		var susHandler = function( data ){
			var { teachersWeightInfos } = data.result;

			this.setState({teachersWeightInfos});
		},
		fail = function( err ){

		};

		susHandler = susHandler.bind( this );
		fail = fail.bind( this );

		susHandler( teacherWeightInfos );
	}

	render()
	{
		var { teachersWeightInfos } = this.state;

		return (
			<div>
				
				<SubjTeacherWeightCard {...{teachersWeightInfos}}/>
			</div>
		)
	}
}

module.exports = IncrementAnalysis;