import "jquery/dist/jquery";
import '@popperjs/core/dist/esm/popper';
import "bootstrap/dist/js/bootstrap.bundle";

import React from 'react';
import { createRoot } from 'react-dom/client';

import "./i18n";
import IndexApp from './containers/IndexApp';

import "bootstrap-icons/font/bootstrap-icons.min.css";

import "~/scss/main.scss";
import "~/scss/pages/index.scss";


createRoot(document.getElementById('index-app')).render(<IndexApp />);
