import React from 'react'
import EasyHisBar from '../../Component/EasyHisBar'
import { TEACHER_ABILITY_AVG_BAR } from '../../../config/ExamEchartsConfig'

class SubjsTeachersAvgCard extends React.Component
{
	constructor( props )
	{
		super( props );

	}

	render()
	{
		var { subjsTeachersAvg } = this.props;
		
		return (
			<div className="brh-card">
				<h3>学科教师平均分对比</h3>
				<EasyHisBar {...{data:subjsTeachersAvg , config: TEACHER_ABILITY_AVG_BAR }} />
			</div>
		)
	}
}

module.exports = SubjsTeachersAvgCard;