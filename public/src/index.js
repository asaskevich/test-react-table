import DataTable from './data-table/data-table.jsx';

const config1 = {
  $el: '#table-1',
  header: [
    {
      name: 'Artist',
      key: 'artist',
    },
    {
      name: 'Album',
      key: 'album',
    },
    {
      name: 'Track',
      key: 'track',
    },
    {
      name: 'Genre',
      key: 'genre',
    },
    {
      name: 'Year',
      key: 'year',
    },
  ],
  data: '/data.json',
};
const config2 = {
  $el: '#table-2',
  data: [
    { id: 1, name: 'Aribibi', version: '1.0.0', rate: 10 },
    { id: 2, name: 'Wertana', version: '0.0.1', rate: 8 },
    { id: 3, name: 'Cuprite', version: '3.2.0', rate: 7 },
    { id: 4, name: 'Oporate', version: '0.2.3', rate: 9 },
    { id: 5, name: 'Ratylet', version: '5.0.0', rate: 8.5 },
  ],
  header: [
    { name: 'Name', key: 'name' },
    { name: 'Version', key: 'version' },
    { name: 'Rate', key: 'rate' },
  ],
};


const datatable1 = new DataTable(config1);
const datatable2 = new DataTable(config2);
datatable1.render();
datatable2.render();
