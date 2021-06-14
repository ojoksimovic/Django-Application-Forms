import ReactDOM from 'react-dom';
import React, { useState, useContext, useEffect } from "react";



const ROUTE = {
    HOST:       window.location.hostname === 'localhost' ? 'http://127.0.0.1:8000' : 'https://api.olivera.tech',
    HOME:       '/',
    REGISTER:     '/register',
    LOGIN:     '/login',
    LOGOUT:    '/logout',
    MY_FORMS:  '/my-forms',
    FORM_VIEW:  '/my-forms/:confirmationNumber',
    NEW_FORM: '/new-form',
    PAYMENT_ACTIVATION: '/new-form/1',
    OGS: '/new-form/2',
    TRAVEL_GRANT: '/new-form/3',
    GYM_BURSARY: '/new-form/4',

}

export default ROUTE;