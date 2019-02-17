import React from 'react';
import { connect } from 'react-redux';

import { searchListings } from '../reducers/map';
import { handleInputChange } from '../reducers/input';

class Search extends React.Component {
  constructor(props) {
   super(props);
   this.input = React.createRef();
 }
  handleSubmit = e => {
    e.preventDefault();
    this.props.searchListings(this.props.input);
    this.input.current.blur();
  }
  renderButton = () => {
    if(this.props.button){
      return React.cloneElement(this.props.button, {
        onClick: this.handleSubmit
      })
    }
  }
  handleInputChange = e => {
    this.props.handleInputChange(e.target.value)
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit} className={this.props.styles.form}>
        <input type="text" ref={this.input} value={this.props.input} onChange={this.handleInputChange} className={this.props.styles.input} placeholder={this.props.placeholder && this.props.placeholder} />
        {this.renderButton()}
      </form>
    )
  }
}

export default connect(
  ({input}) => ({input}),
  {handleInputChange, searchListings}
)(Search)
