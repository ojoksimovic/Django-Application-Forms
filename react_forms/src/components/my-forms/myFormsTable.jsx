import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './style.css';

const columns = [
  { field: 'collection', headerName: 'Collection', width: 200 },
  { field: 'initiator', headerName: 'Initiator', width: 160 },
  { field: 'academicYear', headerName: 'Academic Year', width: 130 },
  { field: 'lastModified', headerName: 'Last Modified', width: 130 },
  { field: 'submitted', headerName: 'Submitted', width: 130 },
  { field: 'progress', headerName: 'Progress', width: 100 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'actions', headerName: 'Actions', width: 130 },
];

const rows = [
    { id: 1, collection : 'Award Payment Activation Form', initiator : 'Joksimovic, Olivera', academicYear : '2021-2022', lastModified : 'May 8, 2021, 4:48 PM', submitted : 'May 7, 2021, 3:00 PM', progress : 'Submitted', status : null, actions : null },
    { id: 2, collection : 'Award Payment Activation Form', initiator : 'Joksimovic, Olivera', academicYear : '2021-2022', lastModified : 'May 8, 2021, 4:48 PM', submitted : 'May 7, 2021, 3:00 PM', progress : 'Submitted', status : null, actions : null },
    { id: 3, collection : 'Award Payment Activation Form', initiator : 'Joksimovic, Olivera', academicYear : '2021-2022', lastModified : 'May 8, 2021, 4:48 PM', submitted : 'May 7, 2021, 3:00 PM', progress : 'Submitted', status : null, actions : null },
    { id: 4, collection : 'Award Payment Activation Form', initiator : 'Joksimovic, Olivera', academicYear : '2021-2022', lastModified : 'May 8, 2021, 4:48 PM', submitted : 'May 7, 2021, 3:00 PM', progress : 'Submitted', status : null, actions : null },
    { id: 5, collection : 'Award Payment Activation Form', initiator : 'Joksimovic, Olivera', academicYear : '2021-2022', lastModified : 'May 8, 2021, 4:48 PM', submitted : 'May 7, 2021, 3:00 PM', progress : 'Submitted', status : null, actions : null },
    { id: 6, collection : 'Award Payment Activation Form', initiator : 'Joksimovic, Olivera', academicYear : '2021-2022', lastModified : 'May 8, 2021, 4:48 PM', submitted : 'May 7, 2021, 3:00 PM', progress : 'Submitted', status : null, actions : null },

];

export default function FormsTable() {
  return (
    <div style={{ height: '400px', width: "100%", marginTop: 50 }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
