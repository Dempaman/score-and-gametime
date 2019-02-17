import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postAction';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class Posts extends Component {
    constructor(props) {
        super(props)
            this.state = {
                name: '',
                lastName: '',
                work: '',
                id: '',
            }
    }

    componentWillMount() {
        this.props.fetchPosts();

        /*fetch('/api/users')
        .then(response => response.json())
        .then(data => {console.log(data)}
    ) */

        axios({
            url: "/api/users",
            method: 'GET',
        })
        .then(res => { this.setState({
                            name: res.data[0].name,
                            lastName: res.data[0].lastName,
                            work: res.data[0].work,
                            id: res.data[0]._id,
                        })
        })
        .catch(err => {
            console.error(err);
        });

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost);
        }
    }

    render () {
        const postItems = this.props.posts.map(post => (
            <Typography variant="subtitle1" key={post.id}>
                {post.name}
            </Typography>
        ))
        return (
            <div>
                <Typography variant='h2'>Games</Typography>
                <Typography variant='h2'>{this.state.name}</Typography>
                <Typography variant='h2'>{this.state.lastName}</Typography>
                <Typography variant='h2'>{this.state.work}</Typography>
                <Typography variant='h2'>{this.state.id}</Typography>
                {postItems}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, { fetchPosts })(Posts);
