import React from 'react';
import PropTypes from 'prop-types';

class TableRowComponent extends React.Component {
  render() {
    return (
      <tr>
        {this.props.header.map(item => <td className="data-table-col" key={item.key}>{this.props.row[item.key] || ''}</td>)}
      </tr>
    );
  }
}

TableRowComponent.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object).isRequired,
  row: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableRowComponent;
