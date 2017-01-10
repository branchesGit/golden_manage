import React from 'react'
import classNames from 'classnames'

class ScoreTypeFilter extends React.Component
{
	constructor( props )
	{
		super( props );

		this.state = {};
		this.initCallback = true;

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

 	componentWillMount()
 	{
 		var { _props } = this.props;
 		var { types } = _props;
 		var len = types && types.length || 0;

 		if( len )
 		{
 			var type = types[ 0 ];
 			var { scoreMapTypeID } = type;

 			this.setState( {types,scoreMapTypeID} );
 		}
 	}

 	handleInitCallback()
 	{
 		var { ScoreTypesInitCallback } = this.props;

 		if( this.initCallback )
 		{
 			ScoreTypesInitCallback && ScoreTypesInitCallback();
 			this.initCallback = false;
 		}

 	}

 	componentDidMount()
 	{
 		this.handleInitCallback();
 	}

 	componentDiUpdate()
 	{
 		if( !this.initCallback )
 		{
 			var { handleScoreTypesCallback } = this.props;

 			handleScoreTypesCallback && handleScoreTypesCallback();
 		}
 		else
 		{
 			this.handleInitCallback();
 		}
 	}

 	handleTypeClick( typeID )
 	{
 		this.setState({scoreMapTypeID: typeID});
 	}

	render()
	{
		var klaset = this.handleCompClassInfo();
		var { _props } = this.props;
		var { types, scoreMapTypeID } = this.state;
		var this_ = this;

		return ( 
			<div className={classNames(klaset)}>
				<span>{_props.name || "计算方法："}</span>
				{
					types && types.length ?
					<ul className="brh-score-type">
					{
						types.map(function(typeInfo,idx){
							var klas = {"selected": typeInfo.scoreMapTypeID === scoreMapTypeID};
							return <li key={idx} className={classNames(klas)} onClick={this_.handleTypeClick.bind(this_,typeInfo.scoreMapTypeID)}>{typeInfo.scoreMapTypeName}</li>
						})
					}
					</ul> : ""
				}
			</div>
		);
	}
}

module.exports = ScoreTypeFilter;