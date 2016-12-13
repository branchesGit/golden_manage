import React from 'react'
import EasyStackLevelHisBar from '../../Component/EasyStackLevelHisBar'
import { TEACHER_LEVEL_BAR } from '../../../config/ExamEchartsConfig'

class SubjsTeachersLevelCard extends React.Component
{
	constructor( props )
	{
		super( props );

	}

	render()
	{
		var { scoreRankLevelInfo } = this.props;

		return (
			<div className="brh-card">
				<EasyStackLevelHisBar {...{data: scoreRankLevelInfo, config: TEACHER_LEVEL_BAR }}  />
			</div>
		)
	}
}

module.exports = SubjsTeachersLevelCard;