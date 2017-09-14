import React from 'react';
import { render } from 'react-dom';
import './styles/index.less';
import TableComponent from './table-component.jsx';

export default class Datatable {
  constructor(config) {
    this.config = Object.assign({ $el: 'body', data: [], header: [] }, config);
    this.el = document.querySelector(this.config.$el);
  }

  static fetchData(urlOrArray) {
    if (typeof urlOrArray === 'string') return fetch(urlOrArray).then(res => res.json());
    return Promise.resolve(urlOrArray);
  }

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
      if (!row.key) headerValid = false;
      if (!row.name) this.config.header[index].name = row.key;
      if (!fields[row.key]) headerValid = false;
    });

    if (!headerValid) return this.renderError(new Error('Header contains rows not described in dataset'));
    return this.renderTable(data);
  }

  renderError(error) {
    return render(<div className="data-table data-table-error">Data by url {this.config.data} cant be loaded. Error: {error.toString()}</div>, this.el);
  }

  renderTable(data) {
    return render(<TableComponent data={data} header={this.config.header} />, this.el);
  }

  render() {
    Datatable.fetchData(this.config.data)
      .then(data => this.prepareData(data))
      .catch(err => this.renderError(err));
  }
}
