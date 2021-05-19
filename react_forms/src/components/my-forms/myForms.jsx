import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import FormsTable from './myFormsTable'

const MyForms = () => {
  return (
    <div>
      <h1> My Forms Page</h1>
      <FormsTable/>
    </div>
  );
}

export default MyForms