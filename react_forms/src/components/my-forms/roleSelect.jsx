import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormsTable from './myFormsTable';
import {Typography, Paper, FormControl, InputLabel, Select} from '@material-ui/core';
import NavBar from '../app/NavBar';
import { Context, withContext } from "../app/context";



const RoleSelect = () => {
    const {
      userInfo, role, setRole
    } = useContext(Context);
  
    return (

    <div className = 'row'>
        <div className = 'col-8 offset-4 text-end'>
            <FormControl variant = 'filled' size = 'small' >
              <InputLabel htmlFor="outlined-degree-native-simple">
                Role
              </InputLabel>
              <Select
                onChange={((e) =>
                  setRole(e.target.value))}
                native
                value={role}
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

              

);
}

export default RoleSelect