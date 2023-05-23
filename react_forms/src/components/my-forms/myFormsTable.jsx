import React, { useState, useContext, useEffect } from "react";
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import "../app/style.css";
import { Context, withContext } from "../app/context";
import Moment from "react-moment";
import ROUTE from "../app/route";
import axios from 'axios';
import axiosInstance from '../app/api';
import { Paper, Typography, Button, FormControl, InputLabel, Select, CircularProgress } from "@material-ui/core";
import { CodeSharp } from "@material-ui/icons";

export default function FormsTable() {
  const { role, setRole, userInfo, setUserInfo, getUserInfo, rows, setRows, convertDate, isMobile } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const [formInfo, setFormInfo] = useState();
  const [PAFForms, setPAFForms] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const history = useHistory();

  function CustomToolbar() {

    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      getPaymentActivationForm();
      setFormInfo(null);

    }
  });

  const getPaymentActivationForm = () => {
    axiosInstance
    .get(
      '/api/payment-activation/'
    )
    .then(response => { setPAFForms(response.data)
      createRows(response.data);
  })
    .catch(error => {console.log(error.response)})

  }


  const handleRoleChange = (e) => {
setRole(e);
let department;
if (e == 'administrator'){
  department = 'Computer Science'
}
let data = {username: userInfo.username, department: department, role: e}

axiosInstance
.patch(
  '/users/user/edit/', data
)
.then(response => {getPaymentActivationForm();
  getUserInfo();
// setLoaded(false)
})
.catch(error => {console.log(error.response)})
}


  const createRows = (formData) => {
    setRows([]);
    for (let i = 0; i < formData.length; i++) {
      if (formData[i].submitted || !formData[i].submitted && formData[i].user == userInfo.username){
      
      setRows((rows) => [
        ...rows,
        {
          id: i + 1, 
          username: formData[i].user,
          collection: "Payment Activation Form",
          type:
          formData[i].award +
            " " +
            formData[i].award_duration,
          initiator: formData[i].last_name + ", " + formData[i].first_name,
          academicYear:
          formData[i].award_start_session == "May 2021" ||
            "Fall 2021" ||
            "Winter 2022"
              ? "2021-2022"
              : null,
          progress: formData[i].submitted
            ? "Submitted"
            : "Draft",
          status: formData[i].submitted
            ? formData[i].admin_submitted
              ? "Complete"
              : "Recieved"
            : "Incomplete",
          actions: null,
          created_at: formData[i].created_at,
          student_number: formData[i].student_number,
          faculty: formData[i].faculty,
          graduate_unit: formData[i].graduate_unit,
          program: formData[i].program,
          degree_start_date: formData[i].degree_start_date,
          award: formData[i].award,
          award_duration: formData[i].award_duration,
          type_payment_request:
          formData[i].type_payment_request,
          award_start_session:
            formData[i].award_start_session,
          submitted: formData[i].submitted,
          submitted_at: formData[i].submitted_at,
          modified_at: formData[i].modified_at,
          confirmation_number:
            formData[i].confirmation_number,
          admin_research_requirement:
            formData[i].admin_research_requirement,
          admin_matching_portion:
            formData[i].admin_matching_portion,
          admin_utf: formData[i].admin_utf,
          admin_departmental_award:
            formData[i].admin_departmental_award,
          admin_ta: formData[i].admin_ta,
          admin_ra: formData[i].admin_ra,
          admin_other_source:
            formData[i].admin_other_source,
          admin_payment_notes:
            formData[i].admin_payment_notes,
          admin_submitted: formData[i].admin_submitted,
          admin_submitted_at:
            formData[i].admin_submitted_at,
          admin_confirmation_number:
            formData[i].admin_confirmation_number,
        },
      ]);
    }}
  };

  const columns = [
    {
      field: 'confirmation_number',
      headerName: 'Applicant Form',
      width: 150,
      align: 'left',
      renderCell: (params: GridRowParams) => (
        <strong>
          {params.row.submitted?
          <Button
            variant="contained"
            color="primary"
            size="small"
            className = 'login-button'
            style={{backgroundColor: params.row.submitted?"#002a5c":"#337AB7"}}
            onClick={(e) =>
              history.push(
                ROUTE.MY_FORMS + "/" + params.row.confirmation_number
              )
            }
          >View Form
          </Button>: 
                    <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className = 'login-button'
                    style={{backgroundColor: params.row.submitted?"#002a5c":"#337AB7"}}
                    onClick={(e) =>
                      history.push(
                        ROUTE.MY_FORMS + "/" + params.row.confirmation_number
                      )
                    }
                  >Complete Form
                  </Button>}
        </strong>
      ),
    },
    {
      field: 'admin_confirmation_number',
      headerName: 'Admin Form',
      width: 150,
      align: 'left',
      hide: userInfo.role != 'administrator' && userInfo.role != 'super administrator',
      renderCell: (params: GridRowParams) => (
        <strong>
          {params.row.submitted?
          <Button
            variant="contained"
            color="primary"
            size="small"
            className = 'login-button'
              style={{ backgroundColor: params.row.admin_submitted?"#002a5c":"#337AB7", color: "white" }}
            onClick={(e) =>
              history.push(
                ROUTE.MY_FORMS + "/" + params.row.admin_confirmation_number
              )
            }
          >
            {params.row.admin_submitted
              ? "View Form"
              : "Complete Form"}
          </Button>:null}
        </strong>
      ),
    },
    { field: "collection", headerName: "Collection", width: 200 },
    { field: "type", headerName: "Type", width: 160 },
    { field: "initiator", headerName: "Initiator", width: 160 },
    { field: "academicYear", headerName: "Academic Year", width: 120 },
    {
      field: "modified_at",
      valueFormatter: (params) => {
        return convertDate(params.value);
      },
      type: "date",
      headerName: "Last Modified",
      width: 175,
    },
    {
      field: "submitted_at",
      valueFormatter: (params) => {
        return convertDate(params.value);
      },
      type: "date",
      headerName: "Submitted",
      width: 175,
    },
    { field: "progress", headerName: "Progress", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      hide: "true",
      type: "string",
      headerName: "Actions",
      flex: 1,
    },
  ];

  return (
    <div>
             <div className = 'row'>
        <div className = 'col-8 offset-4 text-end'>
            <FormControl variant = 'filled' size = 'small' >
              <InputLabel htmlFor="outlined-degree-native-simple">
                Role
              </InputLabel>
              <Select
                onChange={((e) =>
                  handleRoleChange(e.target.value))}
                native
                value={userInfo.role}
                label="Degree Program"
                inputProps={{
                  name: "degree program",
                  id: "outlined-degree-native-simple",
                }}
              >
                <option aria-label="None" value="" />

                <option value='student'>Student</option>
                <option value='administrator'>Administrator - Department of Computer Science</option>
                <option value='super administrator'>Super Administrator - All Departments</option>
              </Select>
            </FormControl>
        </div>
    </div>
    {PAFForms?
    <div style={{ width: "100%", marginTop: 50, cursor: 'context-menu' }}>
      <DataGrid
        components={{
          Toolbar: isMobile? CustomToolbar : GridToolbar,
        }}
        sortModel={[
          {
            field: "modified_at",
            sort: "desc",
          },
        ]}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
        onRowClick={(e) => setSelectedRow(e.row)}
        autoHeight="true"
        checkboxSelection
        // onRowSelected={(e) => console.log(e.data)}
      />
      {/* {selectedRow ? (
        <>
          <Button
            variant="contained"
            className="form-button"
            style={{ margin: 10 }}
            onClick={(e) =>
              history.push(
                ROUTE.MY_FORMS + "/" + selectedRow.confirmation_number
              )
            }
          >
            {selectedRow.submitted
              ? "View Applicant Form"
              : "Complete Applicant Form"}
          </Button>
          {selectedRow.submitted ? (
            <Button
              variant="contained"
              className="form-button"
              style={{ margin: 10 }}
              onClick={(e) =>
                history.push(
                  ROUTE.MY_FORMS + "/" + selectedRow.admin_confirmation_number
                )
              }
            >
              {selectedRow.admin_submitted
                ? "View Administrator Form"
                : "Complete Administrator Form"}
            </Button>
          ) : null}
        </>
      ) : null} */}
    </div>:
    <div style = {{padding: "50px"}}>
<Typography variant = "h6" component = "h2">
Loading forms... please wait
</Typography>
<CircularProgress  style = {{margin: "20px 0px 0px 0px"}}/>
    </div>}
    </div>
  );
}
