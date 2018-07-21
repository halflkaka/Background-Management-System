import React from 'react';
import ReactDom from 'react-dom';

import 'font-awesome/css/font-awesome.min.css'
import './index.css';
import './index.scss';

ReactDom.render(
	<div>
		<i className="fa fa-pied-piper-alt"></i>
		<h1>Hello, world!</h1>,
	</div>,
	document.getElementById('app')
);