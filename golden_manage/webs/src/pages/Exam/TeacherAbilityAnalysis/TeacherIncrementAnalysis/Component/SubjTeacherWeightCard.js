import React from 'react'
import EasyHisImgBar from '../../Component/EasyHisImgBar'
import { TEACHER_WEIGHT_BAR } from '../../../Config/ExamEchartsConfig' 

class SubjTeacherWeightCard extends React.Component
{
	constructor( props )
	{
		super( props );

	}


	render()
	{

		var { teachersWeightInfos } = this.props;
 
		return (
			<div className="brh-card">	
			{
				teachersWeightInfos && 
				<EasyHisImgBar {...{data: teachersWeightInfos}} />|| "暂无数据~"
			}
			</div>
		)
	}
}

module.exports = SubjTeacherWeightCard;