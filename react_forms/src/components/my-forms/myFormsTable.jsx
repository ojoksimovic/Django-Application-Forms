import React, { useState, useContext, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../app/style.css";
import { Context, withContext } from "../app/context";
import Moment from "react-moment";

export default function FormsTable() {
  const {
    userInfo,
    setUserInfo,
    getUserInfo,
    authentication,
    setAuthentication,
    state,
    setState, rows, setRows, convertDate
  } = useContext(Context);
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    if (!loaded){
  createRows();
  setLoaded(true)}
})

  const createRows = () => {
    setRows([])
    for (let i = 0; i < userInfo?.payment_activation.length; i++) {
      setRows(rows => [...rows, {
        id: i+1,
        collection: "Award Payment Activation Form",
        initiator: userInfo?.last_name + ", " + userInfo?.first_name,
        academicYear: "2021-2022",
        lastModified: convertDate(userInfo?.payment_activation[i].modified_at),
        submitted: userInfo?.payment_activation[i].submitted
          ? convertDate(userInfo?.payment_activation[i].modified_at)
          : null,
        progress: userInfo?.payment_activation[i].submitted
          ? "Submitted"
          : "Draft",
        status: null,
        actions: null,
      }]);
    }
    console.log(rows)
  };

  const columns = [
    { field: "collection", headerName: "Collection", width: 200 },
    { field: "initiator", headerName: "Initiator", width: 160 },
    { field: "academicYear", headerName: "Academic Year", width: 120 },
    { field: "lastModified", headerName: "Last Modified", width: 220 },
    { field: "submitted", headerName: "Submitted", width: 220 },
    { field: "progress", headerName: "Progress", width: 100 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "actions", headerName: "Actions", width: 130 },
  ];

  return (
    <div style={{ height: "800px", width: "100%", marginTop: 50 }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
    </div>
  );
}
