import React from 'react'
import EasyPlotBox from '../../Component/EasyPlotBox'
import { TEACHER_ABILITY_PLOT_BOX } from '../../../config/ExamEchartsConfig'

class SubjsTeachersPlotCard extends React.Component
{
	constructor( props )
	{
		super( props  );
	}


	render()
	{

		var { teacherScoreBoxPlot } = this.props;

		return (
			<div className="brh-card">
				<EasyPlotBox  {...{data: teacherScoreBoxPlot, config: TEACHER_ABILITY_PLOT_BOX }} />
			</div>
		)
	}
}

module.exports = SubjsTeachersPlotCard;