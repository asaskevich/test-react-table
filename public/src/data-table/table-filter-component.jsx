import React from 'react';
import PropTypes from 'prop-types';

class TableFilterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    props.filters.forEach((item) => { this.state[item.key] = null; });

    this.onChange = this.onChange.bind(this);
  }

  onChange(key) {
    return (ev) => {
      this.state[key] = ev.target.value;
      this.setState(this.state);

      return this.props.onFilter(this.state);
    };
  }

  render() {
    const filterList = this.props.filters.map(item => (
      <div className="data-table-filter-field" key={item.key}>
        <label htmlFor={`data-filter-${item.key}`}>{item.name || item.key}</label>
        <select className="data-filter-item" onChange={this.onChange(item.key)} onBlur={this.onChange(item.key)} id={`data-filter-${item.key}`}>
          <option value="">Any</option>
          {
            item.values.map(val => <option value={val} key={val}>{val}</option>)
          }
        </select>
      </div>
    ));

    return (
      <div className="data-filter">
        {filterList}
      </div>
    );
  }
}

TableFilterComponent.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default TableFilterComponent;
