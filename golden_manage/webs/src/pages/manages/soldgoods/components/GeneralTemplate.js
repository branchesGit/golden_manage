import React from 'react'
import { Table } from 'antd'
import { generalTemplateCols } from './TemplateColumnUtil'
const MAX_ROW_LEN = 9;

class GeneralTemplate extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {};
    }

    getInitDatas()
    {
        var source = [];
        
        for( var i = 0; i < MAX_ROW_LEN; i++ )
        {
            source.push({});
        }

        return source;
    }

    componentWillMount()
    {
        var source = this.getInitDatas();
        this.setState({source})
    }

    getHeader()
    {
        
    }

    getTbody()
    {

    }

    render()
    {
        var { source } = this.state;

        return (
            <div className="general-template">
               <div className="head">
                   <h3></h3>
                   <span></span>
               </div>
               <table className="sold-table">
               {

               }
               </table>
            </div>  
        )
    }
}

module.exports = GeneralTemplate;