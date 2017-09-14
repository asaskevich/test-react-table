# React-Custom-Datatable

### What has been used?
- React (primary and required technology)
- Webpack (to keep things together)
- Lodash (some functions such as `_.uniq` and `_.sortedBy`)
- Less (to build some visual UI)
- Babel (ES6 + JSX)

Ready-to-use widgets and components weren't used.

### Which codestyle is used
Code checked with help of ESLint with config based on Airbnb configuration. See `.eslintrc` for details.

### How to run/build?
To run webpack builder simply type `npm run dev` in your terminal. To run local static server type `npm run server` and visit `http://localhost:8080`.

### How to use table?
Just create instance of `DataTable` with your config that provides such information as where to render (selector in jQuery style for `document.querySelector` function), url to load json of data by Promise-based `fetch` or ready-to-use array of objects and how to build header (list of key-value pairs).

### Architecture of datatable component
- `TableComponent` is the main part of component. It keeps state of component and renders child blocks.
- `TableHeaderComponent` is the header of datatable. It renders table header and provides sort functionality to user.
- `TableBodyComponent` just renders rows of data (filtered, sorted and sliced).
- `TableFooterComponent` keeps buttons to prev and next pages and provides selector of table size.
- `TableFilterComponent` allows user to control which data to display, bu which fields and values.

### Which data is used as sample dataset?
With help of https://www.mockaroo.com/ was generated dataset in 1000 elements.

