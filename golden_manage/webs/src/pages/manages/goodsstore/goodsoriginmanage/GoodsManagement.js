import React from 'react'
import { Button } from 'antd'
import UploadFile from '../../../../components/UploadFile'

//导入原始数据库存管理信息：
class GoodsManagment extends React.Component
{
	constructor( props )
	{
		super( props );

	}

	render()
	{
		return (
			<div className="brh-goods-wrapper">
				<UploadFile config={{uploadText:'导入原始数据', uploadWarning: ''}}/>

			</div>
		)
	}
}

module.exports = GoodsManagment;