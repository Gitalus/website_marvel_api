import React from "react";
import reactDom from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Home } from "./Home";


reactDom.render(<Home />, document.querySelector('#root'));