import React from 'react'
import SubjectsFilter from './SubjectsFilter'
import classNames from 'classnames'
import { Radio, Checkbox } from 'antd'

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class JuniorSubjectsFilter extends SubjectsFilter
{
	constructor( props )
	{
		super( props );

	}


	isStateChange()
	{
		return true;
	}
	

	getQueryData()
	{
		
	}


	chooseAllSubjects()
	{

	}
	
	render()
	{
		var klaset = this.handleCompClassInfo();
		var { _props, subjects, multiChooseable } = this.props;
		var subjects = this.handleSubjs();
		var mainSubjOptions, mainSubjSelects,
			chooseSubjOptions, chooseSubjSelects;

		if( subjects )
		{
			var mainSubjs = subjects.mainSubjs;
			var chooseSubjs = subjects.chooseSubjs;

			if( mainSubjs )
			{	
				mainSubjOptions = [];
				mainSubjSelects = [];

				mainSubjs.map(function(subject,idx){
					mainSubjOptions[ idx ] = {
						label: subject.subjectName,
						value: subject.subjectID
					};

					if( subject.choose ){
						mainSubjSelects.push( subject.subjectID );
					}
				});
			}

			if( chooseSubjs )
			{
				chooseSubjOptions = [];
				chooseSubjSelects = [];

				chooseSubjs.map(function(subject,idx){
					chooseSubjOptions[ idx ] = {
						label: subject.subjectName,
						value: subject.subjectID
					};

					if( subject.choose ){
						chooseSubjSelects.push( subject.subjectID );
					}
				});
			}
		}

		return (
			<div className={classNames(klaset)}>
				<div className="head">
					<h3>{_props.name}</h3>
					{_props.warning || ""}
				</div>
				<RadioGroup>
					<Radio value={1} disabled={!multiChooseable} onClick={this.chooseAllSubjects}>全选</Radio>
				</RadioGroup>
				<div className="subjects-group">
				{
					mainSubjOptions ? 
					<div className={mainSubjOptions && chooseSubjOptions ? "line dashed" : ""}>
						<CheckboxGroup options={mainSubjOptions} value={mainSubjSelects} />
					</div> : "" 
				}
				
				{
					chooseSubjOptions ? <CheckboxGroup options={chooseSubjOptions} value={chooseSubjSelects} /> : "" 
				}
				</div>
			</div>
		);
	}
}

module.exports = JuniorSubjectsFilter;