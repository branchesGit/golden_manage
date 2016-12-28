import React from 'react'
import { Select,Button,Radio } from 'antd'
import classNames from 'classnames'

const Component = React.Component
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group;

class ExamFilter extends Component
{
	constructor(props)
	{
		super(props)
	}

	componentWillMount()
	{
		var mapData = this.props.mapData;
		var grade = mapData.grades&&mapData.grades[0].gradeID;

		this.setState({
			grade:grade
		})
	}

	handleSelectChange(item,value)
	{
		var val = typeof value === 'string' ? 
						value : 
						value.target.value&&value.target.value;
						
		this.props.handleSelectChange(item,val);
	}

	render()
	{
		var t = this;
		var { mapData,type } = t.props;
		var grade = t.state.grade;

		return(
			<div className="exam-filter-wrapper clearfix">
				<div className="select-exam">
					<span className="select-title">年级：</span>
					<Select onChange={t.handleSelectChange.bind(t,'grade')} defaultValue={mapData.grades[0].gradeName}>
						{
							mapData.grades&&mapData.grades.map(function(value)
							{
								return (<Option value={value.gradeID}>{value.gradeName}</Option>)
							})
						}
					</Select>
					{
						type==='class' && 
						<div className="class-select-wrapper">
							<span className="select-title">班级：</span>
							<Select onChange={t.handleSelectChange.bind(t,'class')} defaultValue={mapData.classMap[grade][0].className}>
								{
									mapData.classMap[grade]&&mapData.classMap[grade].map(function(value)
									{
										return <Option value={value.classID}>{value.className}</Option>
									})
								}		
							</Select>	
						</div>
					}					
					<span className="select-title">考试场次：</span>
					<Select onChange={t.handleSelectChange.bind(t,'exam')} defaultValue={mapData.examMap[grade][0].examName}>
						{
							mapData.examMap[grade]&&mapData.examMap[grade].map(function(value)
							{
								return <Option value={value.examID}>{value.examName}</Option>
							})
						}
						
					
					</Select>
				</div>
				<div className="compute-way">
					<span className="select-title">计算方法：</span>
					<RadioGroup onChange={t.handleSelectChange.bind(t,'computeWay')} defaultValue="standardScore">
				      <RadioButton value="standardScore">标准分</RadioButton>
				      <RadioButton value="rawScore">原始分</RadioButton>
				    </RadioGroup>
				</div>
			</div>
		)
	}
}

module.exports = ExamFilter;