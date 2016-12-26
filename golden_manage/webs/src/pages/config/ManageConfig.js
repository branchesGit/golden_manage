
const ModulesInfo = {
	menus: [
		/*{
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
				},
				{
					menuName: '添加商品',
					linkTo: 'manages/goodsstore/goodsoriginmanage/goodsManagement',
					moduleID: 'goods-management'
				}
			]
		},

		{
			menuName: '销售商品',
			linkTo: 'mananges/soldGoods',
			moduleID: 'sold-goods'
		},
		
		{
			menuName: '教师能力评估',
			//linkTo: 'manages/goldenManagement',
			moduleID: "teacher-ability",
			subMenu: [
				{
					menuName: '教师基本分析',
					linkTo: 'exam/teacherAbilityAnalysis/basicAbilityAnalysis',
					moduleID: "gbasicAbilityAnalysis",
				},
				{
					menuName: '教师增量分析',
					linkTo: 'exam/teacherIncrementAnalysis/incrementAnalysis',
					moduleID: 'incrementAnalysis'
				},
				
			]
		}*/

		{
			menuName: '新中考规则-选科分析',
			moduleID: 'new-senior-entrance-rule',
			subMenu: [
				{
					menuName: '新中考-年级整体分析',
					linkTo: 'exam/seniorEntranceExamRuleChooseSubject/gradeAnalysis',
					moduleID: "gradeAnalysis",
				},
				{
					menuName: '新中考-班级整体分析',
					linkTo: 'exam/seniorEntranceExamRuleChooseSubject/classAnalysis',
					moduleID: "classAnalysis",
				}
			]

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

const SUPER_TYPE_ID = '1';
const SUB_TYPE_ID = '2';

module.exports = {
	ModulesInfo,
	GoodsTypesInfo,
	SUPER_TYPE_ID,
	SUB_TYPE_ID
}