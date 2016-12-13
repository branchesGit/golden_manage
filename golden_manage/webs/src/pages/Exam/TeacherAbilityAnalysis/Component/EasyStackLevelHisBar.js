import React from 'react'
import { handleStackLevelMap, handleStackLevelTooltipMap } from './EasyStackLevelHisBarUtil'
import deepAssign from 'deep-assign';

class EasyStackLevelHisBar extends React.Component
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

		this.renderEasyStackHis( this.props );
	}

	componentWillReceiveProps( newProps )
	{
		this.renderEasyStackHis( newProps );
	}

	renderEasyStackHis( props )
	{
		var { data, config } = props;
		var handleDataName = config["handleData"];
		var func = handleStackLevelMap[handleDataName];

		var barLevelData = func( data, config );

		if( !barLevelData ){
			return ;
		}

		/*
			levels： 表示每个层次的数组集合，
			names: xAxis的文本集合，
			levelsName: 层次的名称集合：
			barsData: 每条堆砌图的数据集合
		*/
		var { levels, names, levelsName, barsData } = barLevelData;

		var option = deepAssign( {}, config.option );
		
		config.tooltipHandler && ( option["tooltip"]["formatter"] = function( params ){
			return handleStackLevelTooltipMap[config.tooltipHandler]( params, levelsName, barsData );
		});

		option["xAxis"]["data"] = names;
		option.legend = option.legend || {};
		option.legend["data"] = levelsName;

		var series = ( option["series"] = [] );

		var barsLen = barsData && barsData.length || 0;

		var getPoints = function( barIdx, levelIdx ){
			if( barIdx < ( barsLen - 1 ) ){
				var startBar = barsData[ barIdx ];
				var endBar = barsData[ barIdx + 1 ];

				var startCount = 0, endCount = 0;
				
				startBar.map(function(value,idx){
					if( levelIdx <= idx ){
						startCount += value;
					}
				});

				endBar.map(function(value,idx){
					if( levelIdx <= idx ){
						endCount += value;
					}
				});

				return [
					{
		    			value: ' ', xAxis: barIdx, yAxis: startCount
		    		},
		    		{
		    			xAxis: barIdx + 1, yAxis: endCount
		    		}
				]
			}
			
		}

		levels.map(function(level,levelIdx){
			var markLineArray = [];

			level.map(function(item,barIdx){
            	var points = getPoints(barIdx,levelIdx);
            	points && ( markLineArray.push(points) );
            });


			series.push({
				name: levelsName[levelIdx],
				type:'bar',
				stack: 'level',
				data: level,
				label: {
					normal: {
						show: true
					}
				},
				markLine:{
                    symbolSize:[0,0],
                    lineStyle: {
                        normal: {
                            color: ['#169FF4'],
                            type: 'dashed'
                        }
                    },
                    label:{
                    	normal:{
                    		show: false,
                    	}
                    },
                    data: markLineArray
                }
			});
		});

		this.echarts.setOption( option );
		this.echarts.resize();

	}

	render()
	{
		return <div ref="root"></div>
	}
}

module.exports = EasyStackLevelHisBar;