import React, { Component } from 'react';
import axios from 'axios';
import * as Constants from '../../Constants'
import { message } from 'antd';



class Image extends Component {
  state = { source: null };

  componentDidMount() {
    axios
      .post(
        Constants.host_link + '/file/get_file',
        { filename: this.props.filename, record:this.props.student_data },
      )
      .then(response => {
        this.setState({ source: "data:;base64," + response.data.base64Data});
      });
  }

  render() {
    return (
      <div>
        <h1>{this.props.filename}</h1>
        <img alt={this.props.filename} src={this.state.source} />
      </div>
    );
  }
}

export default Image;