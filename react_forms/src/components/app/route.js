import ReactDOM from 'react-dom';
import React, { useState, useContext, useEffect } from "react";



const ROUTE = {
    HOST:       window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : '',
    HOME:       '/',
    REGISTER:     '/register',
    LOGIN:     '/login',
    LOGOUT:    '/logout',
    MY_FORMS:  '/my-forms',
    NEW_FORM: '/new-form',
    OGS: '/new-form/ogs',
    PAYMENT_ACTIVATION: '/new-form/payment-activation'
}

export default ROUTE;