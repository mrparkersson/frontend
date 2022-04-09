import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  box-sizing: border-box;
}
  body {
    background: linear-gradient(73.25deg, #000000 7.24%, #4d4b4b 108.45%);
  }

  @keyframes container {
  0% {
    left: 0px;
    top: 0px;
  }
  25% {
    left: 200px;
    top: 0px;
  }
  50% {
    left: 200px;
    top: 200px;
  }
  75% {
    left: 0px;
    top: 200px;
  }
  100% {
    left: 0px;
    top: 0px;
  }
}

@keyframes ring {
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px #e65c00;
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px #18b201;
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px #0456cb;
  }
}
`;

export default GlobalStyle;
