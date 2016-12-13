import React from 'react'
import {Alert} from 'antd'
//import { getMappingScoreConfig } from '../../../common/util/ConfigUtil'
import {mappingScoreID} from "../Config/ExamAnalysisFilterConfig";

class ScoreMapTypeSelect extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	onChange(typeID) {
		this.props.onDataChange({
			scoreMapTypeID: typeID
		})
	}

	hasMappingScore(){
		var mappingScoreConfig = getMappingScoreConfig();
		var isHide = false;
		if( mappingScoreConfig ) {
			isHide = mappingScoreConfig.hide;
		}
		return isHide;
	}


	render() {
		var this_ = this;
		//var isHide = this.hasMappingScore(); //是否显示映射分析  true:隐藏  false:显示
		var isHide = false;

		var name = this.props.name || "新高考功能：";
		return (
			<div className="alert-no-back">
				<div className="am-cf">
					<div className="colorBlueMain score-round-text" >{name}</div>
					{this.props.scoreMapTypes.map(function(item, index){
						var className = this_.props.scoreMapTypeID === item.scoreMapTypeID?"score-round active":"score-round";
						var isMappingScore = item.scoreMapTypeID == mappingScoreID;//当前为映射分
						if((isHide && !isMappingScore) || !isHide){
							return (
								<div className={className} key={index}
									 onClick={ this_.onChange.bind(this_,item.scoreMapTypeID)}>
									{item.scoreMapTypeName}
								</div>
							)
						}

						}
					)}
				</div>
				{
					<Alert message="学科间成绩比较建议采用映射分" type="info" showIcon />
				}
			</div>
		)
	}
}

ScoreMapTypeSelect.defaultProps = {};
ScoreMapTypeSelect.propTypes = {
	scoreMapTypes: React.PropTypes.array.isRequired,
	scoreMapTypeID: React.PropTypes.any.isRequired
};
module.exports = ScoreMapTypeSelect;