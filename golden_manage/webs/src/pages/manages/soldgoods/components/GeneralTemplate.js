import React from 'react'
import { Table } from 'antd'
import { generalTemplateCols } from './TemplateColumnUtil'

class GeneralTemplate extends React.Component
{
    constructor( props )
    {
        super( props );

    }

    render()
    {
        return (
            <div className="general-template">
               <div className="head">
                   <h3></h3>
                   <span></span>
               </div>
               <Table columns={generalTemplateCols}  />
            </div>  
        )
    }
}

module.exports = GeneralTemplate;