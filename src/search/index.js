'use strict';

if(module.hot){
  module.hot.accept()
 }
import React from 'react';
import ReactDOM from 'react-dom';
import img from '../assets/images/test.png';
import './search.less';
import  '../../common'
import { a } from './tree-shaking';

if (false) {
  a();
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Text: null
    };
  }

  loadComponent() {
    import('./text')
    .then((Text) => {
      this.setState({
        Text: Text.default
      });
    })
  }

  render() {
    const { Text } = this.state;
    return (
    <div className="search-text">Search Text
      <img onClick={ this.loadComponent.bind(this) } src={img} />
      { Text ? <Text /> : null }
    </div>);
  }
}

ReactDOM.render(<Search />, document.querySelector('#root'));