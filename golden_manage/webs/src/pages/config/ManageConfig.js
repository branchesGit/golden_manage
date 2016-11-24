
const ModulesInfo = {
	menus: [
		{
			menuName: '库存管理',
			//linkTo: 'manages/goldenManagement',
			moduleID: "manage-goods",
			subMenu: [
				{
					menuName: '查询商品',
					linkTo: 'manages/goodsstore/goodsmanage/goodsStoreOverview',
					moduleID: "goods-store-overview",
				},
				{
					menuName: '商品类型',
					linkTo: 'manages/goodsstore/goodstypesmanage/goodsTypesManagement',
					moduleID: 'goods-types-management'
				}
			]
		},

		{
			menuName: '销售商品',
			linkTo: 'mananges/soldGoods',
			moduleID: 'sold-goods'
		}
	]
}


const GoodsTypesInfo = [
	{
		name: '大类别',
		typeID: '1'
	},
	{
		name: '小类别',
		typeID: '2'
	}
];

module.exports = {
	ModulesInfo,
	GoodsTypesInfo
}