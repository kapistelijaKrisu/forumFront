import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import forupostService from './../../services/forumpost'

export class PagingRow extends Component {
    constructor() {
        super()
        this.state = {
            indeces: []
        }
    }
    componentWillMount = async () => {
        const { pageType, parentId } = this.props
        const limit = 10; // later get from user profile when made there
        const result = await calculateUrlByType(pageType, limit, parentId);
        //  console.log(result)
        this.setState({ indeces: calculateIndeces(result) });

    }

    render() {
        return (
            <div>
                <div style={pagingRowStyle}>
                    {this.state.indeces.map(index =>
                        <Link
                            key={index}
                            to={'/category/' + index}>{index + 1}
                        </Link>
                    )}
                </div>
                <p style={pagingRowStyle}>aaaaaaaaaaaaaaaaaaa</p>
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
    color: '000000'
}