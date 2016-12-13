import React from 'react'
import TeacherSelect from './TeacherSelect'
import ScoreMapTypeSelect from '../../Component/ScoreMapTypeSelect'
import { TeacherAbilityType } from '../../Config/ExamAnalysisFilterConfig'
import { Button } from 'antd'

class TeacherAbilityCondCard extends React.Component
{
	constructor( props )
	{
		super( props );
	}

	render()
	{
		return (
			<div className="brh-card">
				<div width="50%">
					<TeacherSelect />
				</div>
				<div>
					<ScoreMapTypeSelect {...{scoreMapTypes: TeacherAbilityType, scoreMapTypeID:"3" }} />
				</div>
				<Button type="primary">确定</Button>
			</div>
		)
	}
}

module.exports = TeacherAbilityCondCard;