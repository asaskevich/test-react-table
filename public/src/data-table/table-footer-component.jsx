import React from 'react';
import PropTypes from 'prop-types';

class TableFooterComponent extends React.Component {
  render() {
    return (
      <div className="data-footer">
        <div className={`data-left-button ${this.props.pagination.prev ? '' : 'disabled'}`} onClick={this.props.onPrev} onKeyUp={this.props.onPrev} role="button" tabIndex="-1">&lt;</div>
        <div className="data-current-page">{this.props.offset + 1}</div>
        <div className={`data-right-button ${this.props.pagination.next ? '' : 'disabled'}`} onClick={this.props.onNext} onKeyUp={this.props.onPrev} role="button" tabIndex="-1">&gt;</div>
        <select onChange={this.props.onChangeLimit} onBlur={this.props.onChangeLimit}>
          <option value="10">10 rows</option>
          <option value="25">25 rows</option>
          <option value="100">100 rows</option>
        </select>
        <span>Displayed {this.props.len} elements.</span>
      </div>
    );
  }
}

TableFooterComponent.propTypes = {
  pagination: PropTypes.objectOf(PropTypes.bool).isRequired,
  offset: PropTypes.number.isRequired,
  len: PropTypes.number.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default TableFooterComponent;
