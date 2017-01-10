import React from 'react'
import { isObjectValueEqual, isEmptyObj } from './ScoreAnalysisFilterUtil'
import { MAIN_SUBJECTS } from '../Config/ScoreAnalysisFilterConfig'

//学科选择器的入口：
/*
	高中的学科筛选器，头部不同：

*/
class SubjectsFilter extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};
 		//持有一个首次回调的变量：
 		this.initCallback = true;
 		this.originState = null;
	}

	handleCompClassInfo()
 	{
 		var { _props } = this.props;
 		var klaset = {};

		if( _props )
		{
			var classNames = _props["classNames"];

			if( classNames )
			{
				classNames = classNames.split(" ");	
				var i = 0, len = classNames && classNames.length || 0;

				for( ; i < len; i++ )
				{
					klaset[classNames[i]] = true;
				}
			} 
		} 

		return klaset;
 	}

 	handleInitCallback()
 	{
 		var { SubjectsFilterInitCallback } = this.props;

 		if( SubjectsFilterInitCallback )
 		{
 			if( this.initCallback ) 
	 		{	
 				SubjectsFilterInitCallback();
 		 		
 		 		this.initCallback = false;		
	 		}
 		}
 	}

 	//在完成时，触发回调：
 	componentDidMount()
 	{
 		this.handleInitCallback();
 	}

 	isStateChange()
 	{
 		console.log('sub class must be overried this method~');
 	}

 	componentDidUpdate()
 	{
 		if( !this.initCallback )
 		{
 			var { handleCabllbakcSubjectsFilter } = this.props;
 			
 			if( handleCabllbakcSubjectsFilter )
	 		{
	 			if( this.isStateChange() )
	 			{
	 				handleCabllbakcSubjectsFilter( this.state);
	 		 		this.originState = this.state;
	 			}
	 		}
 		}
 		else
 		{
 			this.handleInitCallback();
 		}
 	}

 	//将props.subjects分为mainSubjs, chooseSubjs的对象
 	handleSubjs()
 	{
 		var { subjects } = this.props;
 		var subjs;

 		if( subjects && subjects.length )
 		{
 			subjs = {};
 			var mainSubjs, chooseSubjs;

 			subjects.map(function(subject){
 				var subjectID = subject.subjectID;
 				var idx = MAIN_SUBJECTS.findIndex(function(subj){
 					return subj.subjectID === subjectID;
 				});

 				if( idx !== -1 ){
 					mainSubjs = mainSubjs || [];
 					mainSubjs.push( subject );
 				} else {
 					chooseSubjs = chooseSubjs || [];
 					chooseSubjs.push( subject );
 				}

 			});

 			mainSubjs && ( subjs["mainSubjs"] = mainSubjs );
 			chooseSubjs && ( subjs["chooseSubjs"] = chooseSubjs );
 		}

 		return subjs;
 	}

}

module.exports = SubjectsFilter;