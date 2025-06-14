import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html, body {
		width: 100%;
		height: 100%;
		background-color: #1a1d23;
		color: #e0e6ed;
		font-family: sans-serif;
	}
`;
