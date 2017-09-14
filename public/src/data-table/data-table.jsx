import React from 'react';
import { render } from 'react-dom';
import './styles/index.less';
import TableComponent from './table-component.jsx';

export default class Datatable {
  constructor(config) {
    this.config = config;
    this.el = document.querySelector(this.config.$el);
  }

  static fetchData(urlOrArray) {
    if (typeof urlOrArray === 'string') return fetch(urlOrArray).then(res => res.json());
    return Promise.resolve(urlOrArray);
  }

  renderError(error) {
    return render(<div className="data-table data-table-error">Data by url {this.config.data} cant be loaded. Error: {error.toString()}</div>, this.el);
  }

  renderTable(data) {
    return render(<TableComponent data={data} header={this.config.header} />, this.el);
  }

  render() {
    Datatable.fetchData(this.config.data)
      .then(data => this.renderTable(data))
      .catch(err => this.renderError(err));
  }
}
