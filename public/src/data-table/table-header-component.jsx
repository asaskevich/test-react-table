import React from 'react';
import PropTypes from 'prop-types';

/**
 * This filter is used to display header with sorting ability
 */
class TableHeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      key: null,
      asc: 0,
    };

    this.onSort = this.onSort.bind(this);
  }

  /**
   * Triggered when one of columns is selected to sort
   * @param {String} [key] column name to sort
   * @returns {function()}
   */
  onSort(key) {
    return () => {
      if (this.state.key === key) {
        this.state.asc = (this.state.asc + 1) % 3;
      } else {
        this.state.asc = 1;
        this.state.key = key;
      }
      this.setState(this.state);
      return this.props.onSort(this.state);
    };
  }

  render() {
    const sortClass = (key) => {
      if (this.state.asc > 0 && this.state.key === key) {
        if (this.state.asc === 1) {
          return 'data-sort-asc';
        }
        return 'data-sort-desc';
      }
      return '';
    };

    return (
      <thead className="data-table-header">
        <tr className="data-table-row">
          {
            this.props.header.map(item => <th className={`data-table-col ${sortClass(item.key)}`} onClick={this.onSort(item.key)} key={item.key}>{item.name}</th>)
          }
        </tr>
      </thead>
    );
  }
}

TableHeaderComponent.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
};

export default TableHeaderComponent;
