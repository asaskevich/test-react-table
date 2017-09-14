import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TableHeaderComponent from './table-header-component.jsx';
import TableBodyComponent from './table-body-component.jsx';
import TableFooterComponent from './table-footer-component.jsx';
import TableFilterComponent from './table-filter-component.jsx';
import { OFFSET, LIMIT } from './table-constants.js';

/**
 * This component used to control and render full table with header/body/filters and footer
 */
class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      // Offset is the page number from which start to display information
      offset: OFFSET,
      // Limit is the number of elements displayed on one page
      limit: LIMIT,
      // Len is the full size of current collection (sorted, filtered) used to display
      len: props.data.length,
      // Current page count of table
      pageCount: Math.floor(props.data.length / LIMIT),
      pagination: {
        // Is prev button enabled
        prev: false,
        // Is next button enabled
        next: Math.floor(props.data.length / LIMIT) > 0,
      },
      // Header of the table
      header: props.header.slice(),
      // Original copy of data, used to restore data after reset filter and sorting
      originalData: props.data.slice(),
      // Current data used to display
      renderedData: props.data.slice(0, LIMIT),
      // Current active filters
      filters: props.header.map(col => ({
        name: col.name,
        key: col.key,
        values: _.uniq(_.sortBy(props.data.map(it => it[col.key]))),
      })),
      // Current active sort state
      sort: {
        key: null,
        asc: true,
      },
    };

    this.onSort = this.onSort.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  /**
   * Triggers when next-page-button is clicked
   */
  onNextPage() {
    this.state.offset = Math.min(this.state.pageCount, this.state.offset + 1);
    this.state.pagination.prev = this.state.offset > 0;
    this.state.pagination.next = this.state.pageCount > this.state.offset;
    this.onPrepareData();
  }

  /**
   * Triggers when prev-page-button is clicked;
   */
  onPrevPage() {
    this.state.offset = Math.max(0, this.state.offset - 1);
    this.state.pagination.prev = this.state.offset > 0;
    this.state.pagination.next = this.state.pageCount > 0;
    this.onPrepareData();
  }

  /**
   * Triggered when changed count of data to display
   * @param {MouseEvent} [ev]
   */
  onChangeLimit(ev) {
    this.state.limit = Math.floor(+ev.target.value || LIMIT);
    this.state.pageCount = Math.floor(this.state.len / this.state.limit);
    this.onPrepareData();
  }

  /**
   * Triggered when filter is applied to table
   * @param filter
   */
  onFilter(filter) {
    this.state.filter = filter;
    this.state.offset = 0;
    this.onPrepareData();
  }

  /**
   * Triggered when sorting filter is applied to table
   * @param query
   */
  onSort(query) {
    this.state.sort = query;
    this.state.offset = 0;
    this.onPrepareData();
  }

  /**
   * Executed when data is preparing to display (sorting, filtering, slicing)
   */
  onPrepareData() {
    let data = this.state.originalData.slice();

    // If sort filter is applied
    if (this.state.sort.asc) {
      const mod = this.state.sort.asc === 1 ? 1 : -1;

      data.sort((a, b) => {
        if (a[this.state.sort.key] > b[this.state.sort.key]) return mod;
        else if (a[this.state.sort.key] < b[this.state.sort.key]) return -mod;
        return 0;
      });
    }

    // If filter is applied
    if (this.state.filter) {
      data = data.filter((item) => {
        const keys = Object.keys(this.state.filter);
        return !keys.some(key => this.state.filter[key] && `${this.state.filter[key]}` !== `${item[key]}`);
      });
    }

    this.state.pageCount = Math.floor(data.length / this.state.limit);
    this.state.len = data.length;
    this.state.pagination = {
      prev: this.state.offset > 0,
      next: this.state.pageCount > this.state.offset,
    };

    this.setState({
      renderedData: data.slice(this.state.offset * this.state.limit, (this.state.offset + 1) * this.state.limit),
      sort: this.state.sort,
      limit: this.state.limit,
      filter: this.state.filter,
      offset: this.state.offset,
      pageCount: this.state.pageCount,
      pagination: {
        prev: this.state.pagination.prev,
        next: this.state.pagination.next,
      },
    });
  }

  render() {
    return (
      <div>
        <table className="data-table">
          <TableHeaderComponent header={this.state.header} onSort={this.onSort} />
          <TableBodyComponent data={this.state.renderedData} header={this.state.header} />
        </table>
        <TableFooterComponent onPrev={this.onPrevPage} onNext={this.onNextPage} onChangeLimit={this.onChangeLimit} limit={this.state.limit} offset={this.state.offset} pagination={this.state.pagination} len={this.state.len} />
        <TableFilterComponent onFilter={this.onFilter} filters={this.state.filters} />
      </div>
    );
  }
}

TableComponent.propTypes = {
  header: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableComponent;
