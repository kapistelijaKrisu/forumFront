import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import forupostService from './../../services/forumpost'

export class PagingRow extends Component {
    constructor() {
        super()
        this.state = {
            indeces: [],
            limitPerPage: 10// later get from user profile when made there
        }
    }
    componentDidUpdate = async (prevProps) => {
        if (this.props.pageType !== prevProps.pageType ||
            this.props.parentId !== prevProps.parentId) {

            await this.componentWillMount();
        }
    }
    componentWillMount = async () => {
        const { pageType, parentId } = this.props
        const result = await calculateUrlByType(pageType, this.state.limitPerPage, parentId);
          console.log(result)
        this.setState({ indeces: calculateIndeces(result) });

    }

    render() {
        const { pageType, parentId } = this.props
        console.log(this.state.indeces)
        return (
            <div>
                <div style={pagingRowStyle}>
                    {this.state.indeces.map(index =>
                        <Link
                            style={pagingRowStyle}
                            key={index}
                            to={'/'+pageType+'/' + parentId + '/page/' + index + '/limit/' + this.state.limitPerPage}>{index + 1}
                        </Link>
                    )}
                </div>
            </div>)
    };
}
const calculateUrlByType = async (pageType, limit, parentId) => {
    limit = limit === 0 ? 10 : limit; 

    if (pageType === 'category') {
        return await forupostService.getForumpostCountByCategory(parentId) / limit
    } else if (pageType === 'dude') {
        return await forupostService.getForumpostCountByDude(parentId) / limit
    }
}


const calculateIndeces = (pageCount) => {
    let indeces = [];
    //add smarter one later requires knowledge of current path
    for (let i = 0; i < pageCount; i++) {
        indeces.push(i);
    }
    return indeces;
}

const pagingRowStyle = {
    textAlign: 'center',
    color: '000000',
    padding: '1em',
    fontSize: '1.2em'
}