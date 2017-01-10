import React from 'react'
import HeadFilterCard from '../Component/HeadFilterCard'
import { basicGradeFilterConfig } from '../Config/ScoreAnalysisFilterConfig'
import SubjectComparisonBar from './SubjectComparisonBar'

class ScoreFilter extends React.Component
{
	constructor( props )
	{
		super( props );

	}

	render()
	{
		return (
			<div>
				<HeadFilterCard {...{config: basicGradeFilterConfig}}/>
				<SubjectComparisonBar />
			</div>
		)
	}
}

module.exports = ScoreFilter;