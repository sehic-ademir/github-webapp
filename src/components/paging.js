import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Paging extends Component {

    render() { 
        let page = parseInt(this.props.params.page);
        const id = this.props.params.id;
        const _component = this.props._component;
        const total_count = this.props.total_count;
        const last_page = Math.ceil(total_count / 10);
        if(page > last_page)
            page = last_page+1;
        return ( 
        <div className="mb-3">
            { total_count > 0 ?
            <nav aria-label="Navigation" className="col-lg-12 mb-4">
                <ul className="pagination justify-content-center">
                   { page !== 1 ?  <Link  to={`/${_component}/${id}/${1}`}><li><span className="page-link border-primary text-primary" >1</span></li></Link> : '' }
                    {
                        page > 3 ? <span className="mx-2 h4"  >...</span> : ''
                        
                    }
                    {
                        page > 2 ? <Link to={`/${_component}/${id}/${page - 1}`}><li ><span className="page-link text-dark text-dark" >{page - 1}</span></li></Link> : ''

                    }
                    <li className="disabled" disabled><span className="page-link bg-primary text-light" >{page}</span></li>
                    {
                        last_page - page > 0 ? <Link to={`/${_component}/${id}/${page + 1}`}><li><span className="page-link text-dark text-dark" >{page + 1}</span></li></Link> : '' }
                     {
                        last_page - page  < 1  ? '' : last_page - page - 2 < 0 ? '' : <Link to={`/${_component}/${id}/${page + 2}`}><li><span className="page-link text-dark text-dark" >{page + 2 }</span></li></Link>}

                        {
                        last_page - page > 2  ? <Link to={`/${_component}/${id}/${last_page}`}><li><span className="page-link border-primary text-primary"><i className="fas fa-angle-double-right"></i></span></li></Link> : '' }
                </ul>
            </nav> : ''}
        </div>
         );
    }
}
 
export default Paging;