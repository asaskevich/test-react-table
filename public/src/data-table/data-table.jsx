import React from 'react';
import { render } from 'react-dom';
import './styles/index.less';
import TableComponent from './table-component.jsx';

export default class Datatable {
  constructor(config) {
    this.config = Object.assign({ $el: 'body', data: [], header: [] }, config);
    this.el = document.querySelector(this.config.$el);
  }

  /**
   * Fetches data-set for table from url or array
   * @param {String | Array} [urlOrArray] valid url string or array of objects
   * @returns {Promise} resolved promise with ready-to-use data
   */
  static fetchData(urlOrArray) {
    if (typeof urlOrArray === 'string') return fetch(urlOrArray).then(res => res.json());
    return Promise.resolve(urlOrArray);
  }

  /**
   * Prepares data for displaying, checks common issues - no data, not an array,
   * invalid header description
   * @param {Array} [data] array of objects used to render table
   */
  prepareData(data) {
    if (!data || !(data instanceof Array)) return this.renderError(new Error('Data is null or is not an array'));
    const fields = {};
    let headerValid = true;

    data.forEach((item) => {
      if (item) {
        Object.keys(item).forEach((key) => { fields[key] = true; });
      }
    });

    this.config.header.forEach((row, index) => {
      // every header row should contain `key` field
      if (!row.key) headerValid = false;
      // if name is not provided there is possible to use key as a name
      if (!row.name) this.config.header[index].name = row.key;
      // if data-set objects have no field described in header - throw error
      if (!fields[row.key]) headerValid = false;
    });

    if (!headerValid) return this.renderError(new Error('Header contains rows not described in dataset'));
    return this.renderTable(data);
  }

  /**
   * Renders error to div-block with class "data-table data-table-error"
   * @param {Error} [error] error to display why table can't be rendered
   */
  renderError(error) {
    return render(<div className="data-table data-table-error">Data by url {this.config.data} cant be loaded. Error: {error.toString()}</div>, this.el);
  }

  /**
   * Delegates control to table component
   * @param {Array}[data] data to display
   */
  renderTable(data) {
    return render(<TableComponent data={data} header={this.config.header} />, this.el);
  }

  render() {
    Datatable.fetchData(this.config.data)
      .then(data => this.prepareData(data))
      .catch(err => this.renderError(err));
  }
}
