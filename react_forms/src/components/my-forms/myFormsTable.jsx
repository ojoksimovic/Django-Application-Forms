import React, { useState, useContext, useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import {useHistory} from 'react-router-dom';
import "../app/style.css";
import { Context, withContext } from "../app/context";
import Moment from "react-moment";
import ROUTE from "../app/route";
import { Button } from "@material-ui/core";

export default function FormsTable() {
  const { userInfo, rows, setRows, convertDate } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [formInfo, setFormInfo] = useState();
const history = useHistory();

  useEffect(() => {
    if (!loaded) {
      setFormInfo(null);
      createRows();
      setLoaded(true);
    }
  });

  const createRows = () => {
    setRows([]);
    for (let i = 0; i < userInfo?.payment_activation.length; i++) {
      setRows((rows) => [
        ...rows,
        {
          id: i + 1,
          collection: "Payment Activation Form",
          type:
            userInfo?.payment_activation[i].award +
            " " +
            userInfo?.payment_activation[i].award_duration,
          initiator: userInfo?.last_name + ", " + userInfo?.first_name,
          academicYear:
            userInfo?.payment_activation[i].award_start_session == "May 2021" ||
            "Fall 2021" ||
            "Winter 2022"
              ? "2021-2022"
              : null,
          lastModified: convertDate(
            userInfo?.payment_activation[i].modified_at
          ),
          submitted: userInfo?.payment_activation[i].submitted
            ? convertDate(userInfo?.payment_activation[i].modified_at)
            : null,
          progress: userInfo?.payment_activation[i].submitted
            ? "Submitted"
            : "Draft",
          status: null,
          actions: null,
          confirmationNumber: userInfo?.payment_activation[i].confirmation_number
        },
      ]);
    }
  };

  const columns = [
    { field: "collection", headerName: "Collection", width: 200 },
    { field: "type", headerName: "Type", width: 160 },
    { field: "initiator", headerName: "Initiator", width: 160 },
    { field: "academicYear", headerName: "Academic Year", width: 120 },
    { field: "lastModified", type: 'date', headerName: "Last Modified", width: 175 },
    { field: "submitted", type: 'date', headerName: "Submitted", width: 175 },
    { field: "progress", headerName: "Progress", width: 120 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "actions", type: "string", headerName: "Actions", flex: 1 },
  ];

  return (
    <div style={{ height: 700, width: "100%", marginTop: 50, cursor: 'pointer' }}>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        sortModel={[
          {
            field: "lastModified",
            sort: "desc",
          },
        ]}
        rows={rows}
        columns={columns}
        pageSize={10}
        onRowClick={(e) => history.push(ROUTE.MY_FORMS+'/'+e.row.confirmationNumber)}
        // autoHeight='true'
        // autoPageSize='true'
        checkboxSelection
        // onRowSelected={(e) => console.log(e.data)}

      />
    </div>
  );
}
