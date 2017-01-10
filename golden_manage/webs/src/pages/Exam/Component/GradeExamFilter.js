import React from 'react'
import { setGradeExamMap, getGradeExamMap, 
	CLASS_TYPE_TEACHING, isObjectValueEqual, isEmptyObj } from './ScoreAnalysisFilterUtil'
import { gradeClassTypeResponse } from '../../AjaxData/Exam/BasicExam'

class GradeExamFilter extends React.Component
{
 	constructor( props )
 	{
 		super( props );

 		this.state = {};
 		this.originState = null;
 		this.initState = this.initState.bind(this);
 		//持有一个首次回调的变量：
 		this.initCallback = true;
 	}

 	initState( data )
 	{
 		console.log('this method must be override');
 	}

 	//这里的处理数据的逻辑有相似处：
 	componentWillMount()
 	{
 		var gradeExamInfo = getGradeExamMap();

 		if( !gradeExamInfo )
 		{
 			gradeExamInfo = gradeClassTypeResponse.result;
 			this.initState( gradeExamInfo );
 		}
 		else
 		{	
 			this.initState( gradeExamInfo );
 		}
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
 		var { GradeExamFilterInitCallback } = this.props;

 		if( GradeExamFilterInitCallback )
 		{
 			if( this.initCallback && !isEmptyObj( this.state ) )
	 		{
 				GradeExamFilterInitCallback( this.state );
 		 		this.originState = $.extend( true, {}, this.state ); //为了取消功能：
 		 		this.initCallback = false;
	 				
	 		}
 		}
 	}

 	//在完成时，触发回调：
 	componentDidMount()
 	{
 		this.handleInitCallback();
 	}

 	componentDidUpdate()
 	{
 		if( !this.initCallback )
 		{
 			var { handleCabllbakcGradeExamFilter } = this.props;
 			
 			if( handleCabllbakcGradeExamFilter )
	 		{
	 			if( !isObjectValueEqual( this.originState, this.state) )
	 			{
	 				handleCabllbakcGradeExamFilter( this.state);
	 		 		this.originState = $.extend( true, {}, this.state ); //为了取消功能：
	 			}
	 		}
 		}
 		else
 		{
 			this.handleInitCallback();
 		}
 	}
 
}

module.exports = GradeExamFilter;