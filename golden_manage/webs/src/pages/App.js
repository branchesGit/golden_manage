import React from 'react'
import Menu from './Config/Menu'
import classNames from 'classnames'

class App extends React.Component
{
	constructor( props )
	{
		super( props );


	}


	render()
	{
		return (
			<div>
				<div className={ classNames({"manage-menu":true}) }>
					<Menu  />
				</div>
				<div className={classNames({"manage-wrapper":true})}>
				{this.props.children}
				</div>
			</div>
		)	
	}
}	


module.exports = App;