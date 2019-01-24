import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/postAction';

// const express = require('express');
// const getUserByName = require(".././server/mongoClient.js");

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
         }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const post = {
            title: this.state.title,
            body: this.state.body
        }

        this.props.createPost(post);
    }

    render () {
        return (
            <div>
                <h1>Add Post</h1>
                <form>
                <div>
                    <label>Title: </label><br />
                    <input type="text"name="title" onChange={this.onChange} value={this.state.title} />
                </div>
                <div>
                    <label>Title: </label><br />
                    <textarea name="body" onChange={this.onChange} value={this.state.body} />
                </div>
                <br />
                <button onClick={this.onSubmit} type="submit">Submit</button>
                </form>
            </div>
        )
    }
}


export default connect(null, { createPost })(PostForm);
