import React from 'react'
import { Table,Row,Col,Switch,message,Modal,Select } from 'antd'
import { startPreChooseSubjs } from '../../../AjaxData/Exam/EntranceAnalysis'
import * as seniorUtil from '../SeniorEntranceExamUtil'
import classNames from 'classnames'

const Component = React.Component
const Option = Select.Option

class RankChangeTable extends Component
{
	constructor( props )
	{
		super( props )

		this.state = {
			isContrast:false,
			isShowAll:false
		}
	}

	handleSwitchChange( flag )
	{//点击开启预选结果对比按钮的事件
		if(flag === true)
		{//如果所有校验通过则应获取新中考数据
			var success = function(data)
			{
				if(data.status === 'success')
				{
					switch (data.code)
					{
						case 0:
						{
							this.setState({
								isContrast:true
							})
							break;
						}
						case 1:
						{
							Modal.error({
								title:'抱歉，此功能需开启“好专业选科分班系统”才能够使用，请联系好专业进行购买相关系统。'
							})
							break;
						}
						case 2:
						{
							Modal.confirm({
							    title: '抱歉，年级学生预选科结果收集不全，是否立即查看学生预选科完成结果统计？',
							    onOk() {
							      console.log('OK');
							    },
							    onCancel() {},
							  });
							break;
						}
					}
				}
			},
			fail = function()
			{
			}

			success.call(this,startPreChooseSubjs);

		}
		else if(flag === false)
		{
			this.setState({
				isContrast:false
			})
		}
	}

	showAllStudentsAnalysis()
	{//展开所有学生名单的事件  如何收起？
		var flag = this.state.isShowAll;

		this.props.onShowAllStudent&&
			this.props.onShowAllStudent(flag);
		
		this.setState({
			isShowAll:!flag
		})
	}

	render()
	{
		var t = this;
		var { type,ruleTypeMap } = t.props;
		var { columnData,totalScoreData,newEntranceScoreData,preChooseSubjsScoreData } = t.props.rankData;
		var isContrast = t.state.isContrast;

		var noteText;
		noteText = type==='class' &&
						  t.state.isShowAll ? '收起全部学生名单' : '...查看全部学生名单';		

		return(
			<div className="rank-change-wrapper">
				<div className="rank-change-header clearfix">
					{
						type==='grade'?
						<h2>新中考规则下各班成绩排名变动</h2>
						:
						<h2>新中考规则下班级学生成绩总览</h2>
					}
					<div className="turn-on-pre-choose">
						<i>开启预选结果对比</i>
						<Switch defaultChecked={false} onChange={t.handleSwitchChange.bind(t)} />
					</div>
				</div>
				
				<div className="rank-change-table">
					{
						columnData&&columnData.map(function(columnSect,idx){
							return (
								<div className="table-section">
									{
										[totalScoreData[idx],newEntranceScoreData[idx],preChooseSubjsScoreData[idx]].map(function(item,index)
										{
											if( index===2 && isContrast===false ) return;
											return (
												<table className={classNames({ isGrey: isContrast && index===0 })}>
													{
														index===0?
															<thead className="isGrey">
																<tr>
																	<th></th>
																	<th></th>
																	{
																		columnSect&&columnSect.map(function(value)
																		{
																			return <th>{value.className}</th>
																		})
																	}
																</tr>
															</thead>:''
													}													
													<tbody>
														<tr>
															<td rowSpan={2} className="isGrey score-type">{ruleTypeMap[index]}</td>												
															<td className="isGrey">排名</td>
															{
																item&&item.map(function(value){
																	return (
																		<td className={classNames({
																			"rank-change-arrow":!( index===0 || index===1&&isContrast )})}>
																			<span className="rank-data">{value.rank}</span>
																			{
																				index===0?  '':
																							<span className={classNames({
																								'change-rank-info':true,
																								'is-show-change':index===1&&isContrast})}>
																								<i className={classNames({
																									'rank-up':value.changeRank>0,
																									'rank-down':value.changeRank<0})}>
																								</i>
																								<em className={classNames({
																									'rank-up':value.changeRank>0,
																									'rank-down':value.changeRank<0})}>
																								</em>
																								{value.changeRank}
																							</span>
																			}
																		</td>
																	)
																})
															}
														</tr>
														<tr>
															<td className="isGrey">分数</td>
															{
																item&&item.map(function(value){
																	return (<td>{value.score}</td>)
																})
															}
														</tr>
													</tbody>
												</table>
											)
										})
									}								
								</div>
							)
							
						})
						
					}
				</div>
				<div className="rank-change-note">
					{
						type==='grade' ?
						<div className="change-note">
							<p><b>名词释义：</b>①总分：学生所有科目总分。</p>
							<p className="indent-para"> ②新中考总分：新中考规则下学生分数，即语数英+选考科目，经过100%、80%、60%处理。</p>
							{
								isContrast&&
								<p className="indent-para"> ③预选科总分：新中考规则下学生预选考科目，即语数英+预选科目，经过100%、80%、60%处理。</p>
							}
						</div>
						:
						<p onClick={t.showAllStudentsAnalysis.bind(t)} className="show-all-students">{noteText}</p>
					}					
				</div>
			</div>
		)

	}
}

module.exports = RankChangeTable;