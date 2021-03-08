import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Noto Sans JP', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  /* Chrome auto fill override */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-background-clip: text;
    -webkit-text-fill-color:  #fff !important;
  font: 16px 'Noto Sans JP', sans-serif;
  }

  input:-webkit-autofill::first-line {
    font: 16px 'Noto Sans JP', sans-serif;
  }

  /* custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #999591;
    border-radius: 16px;
  }
`;
