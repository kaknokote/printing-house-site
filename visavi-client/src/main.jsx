import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import { GlobalStyle } from './styles/reset';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<GlobalStyle />
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
