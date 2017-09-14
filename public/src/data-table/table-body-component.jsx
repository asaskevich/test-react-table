import React from 'react';
import PropTypes from 'prop-types';
import TableRowComponent from './table-row-component.jsx';

/**
 * This component used to display full bunch of data as a table body
 */
class TableBodyComponent extends React.Component {
  render() {
    return (
      <tbody className="data-table-body">
        {
          this.props.data.map(item => <TableRowComponent className="data-table-row" row={item} header={this.props.header} key={item.id} />)
        }
      </tbody>
    );
  }
}

TableBodyComponent.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableBodyComponent;
