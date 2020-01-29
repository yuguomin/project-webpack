'use strict';

if(module.hot){
  module.hot.accept()
 }
import React from 'react';
import ReactDOM from 'react-dom';
import img from './assets/images/test.png';
import './search.less';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className="search-text">
      Search Text
      <img src={img} />
    </div>);
  }
}

ReactDOM.render(<Search />, document.querySelector('#root'));