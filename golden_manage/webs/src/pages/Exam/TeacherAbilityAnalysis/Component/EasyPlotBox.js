import React from 'react'
import { handlePlotBoxMap, boxFormatterMap, scatterFormatterMap} from './EasyPlotBoxUtil'
import deepAssign from 'deep-assign'

var echarts = require('echarts/lib/echarts');

require('echarts/lib/chart/boxplot');
require('echarts/lib/chart/scatter');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/dataZoom');

//盒须图 
class EasyPlotBox extends React.Component
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

		this.renderEasyPlotBox( this.props );
	}

	componentWillReceiveProps( newProps )
	{

		this.renderEasyPlotBox( newProps );
	}

	renderEasyPlotBox( props )
	{
		var { data, config } = props;
		var handleDataName = config["handleData"];
		var func = handlePlotBoxMap[ handleDataName ];
		var plotBoxData = func( data, config );

		if( !plotBoxData ){
			return;
		}

		var { xAxisNames,scatters, plotBoxes } = plotBoxData;

		var dataZoom = plotBoxes.length > 11 ? [
                {
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter',
                    start: 0,
                    end: 60
                },
            ] : [];

		var option = deepAssign( {}, config.option );
		option["dataZoom"] = dataZoom;
		option["xAxis"]["data"] = xAxisNames;
		var series = option.series;
		var boxSerie = series[ 0 ];
		var scatterSerie = series[ 1 ];
		boxSerie["data"] = plotBoxes;
		boxSerie["tooltip"]["formatter"] = boxFormatterMap[config.boxFormatter];
		scatterSerie["data"] = scatters;
		scatterSerie["tooltip"]["formatter"] = scatterFormatterMap[config.scatterFormatter];

		this.echarts.setOption( option );
		this.echarts.resize();
	}

	render()
	{
		return <div ref="root"></div>
	}
}

module.exports = EasyPlotBox;