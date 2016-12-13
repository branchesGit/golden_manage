import React from 'react'
import { HandleDataMap } from './EasyHisBarUtil'
import deepAssign from 'deep-assign';

class EasyHisBar extends React.Component
{
	constructor( props )
	{
		super( props );
	}

	componentDidMount()
	{
		var rootElem = this.refs.root;
		var h = this.props.height || 400;
		h += 'px';
		rootElem.style.height = h;

		this.echarts = echarts.init(rootElem);

		this.renderEasyHis( this.props );
	}

	componentWillReceiveProps( newProps )
	{

		this.renderEasyHis( newProps );
	}

	renderEasyHis( props )
	{
		var { data, config } = props;
		var option = deepAssign( {}, config.option );
		var funName = config["handleData"];
		var func = HandleDataMap[ funName ];	

		var barData = func( data, config );

		if( !barData ){
			return ;
		}

		var { names, values } = barData;
		var dataZoom = names.length > 11 ? [
	            {
	                id: 'dataZoomX',
	                type: 'slider',
	                xAxisIndex: [0],
	                filterMode: 'filter',
	                start: 0,
	                end: 60
	            },
	        ] : [];
	
		option["dataZoom"] = dataZoom;
		option["xAxis"]["data"] = names;

		option["series"][0]["data"] = values;

		this.echarts.setOption( option );
		this.echarts.resize();		
	}

	render()
	{
		return <div ref="root"></div>
	}
}

module.exports = EasyHisBar;