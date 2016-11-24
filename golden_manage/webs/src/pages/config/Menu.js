import React from 'react'
import { ModulesInfo } from './ManageConfig'
import { Menu } from 'antd'
import { Link } from 'react-router'

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class ManageMenu extends React.Component
{
	constructor( props )
	{
		super( props );


	}

	initMenu()
	{
		var { menus } = ModulesInfo;
		var i = 0, len = menus && menus.length || 0;

		var ary = [];

		for( ; i < len; i++ )
		{
			ary.push( this.getMenu( menus[i] ) );
		}

		return <Menu mode="inline">{ ary }</Menu>;
	}

	getMenu( menu )
	{
		var { subMenu } = menu;
		var len = subMenu && subMenu.length || 0;

		if( len )
		{
			var childMenu = [];

			for( var i = 0; i < len; i++ )
			{
				childMenu.push( this.getMenu(subMenu[i]) );
			}

			return (<SubMenu title={menu.menuName}>{childMenu}</SubMenu>
			);
		}
		else
		{
			return <Item key={menu.moduleID}><Link to={menu.linkTo} >{menu.menuName}</Link></Item>
		} 
	}

	render()
	{
		var menus = this.initMenu();

		return <div>{ menus }</div>;
	}
} 

module.exports = ManageMenu;