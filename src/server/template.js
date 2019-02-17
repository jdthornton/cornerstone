export const renderHeader = (helmet) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link rel="icon" type="image/png" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json">
            <style>
              html, body, #root, #root {
                height: 100%
              }
              body {
                margin: 0;
              }
              ul {
                  list-style: none;
                  margin: 0;
                  padding: 0;
              }
              a {
                text-decoration: none;
              }
              a:hover {
                text-decoration: none;
              }
              input:focus {
                  outline: none;
              }
              .logo {
                z-index: 50000;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                background-color: #00a19a;
                color: #fff;
                transition: all 0.2s cubic-bezier(0.5, 0, 0, 1);
                height: 38px;
                width: 38px;
                flex: 0 0 38px;
                font-size: 6px;
              }
              #root {
                font-family: 'Roboto', sans-serif;
                color: #484848;
                background-color: #f7f7f7;
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                overflow: hidden;
              }
              h1,h2,h3,h4,h5 {
                color: #3d4542;
              }
              h1 {
                font-size: 24px;
                margin: 7px 0;
              }
              h2 {
                font-size: 24px;
                font-weight: 300;
              }
              h3 {
                font-size: 18px;
              }
              h4 {
                font-size: 15px;
              }
              h5 {
                font-size: 13.5px;
              }
              main {
                width: 100%;
                height: 100%;
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
                z-index: -2;
              }
              p {
                color: #747f7b;
                margin: 5px 0;
                font-size: 14px;
              }
              label {
                display: block;
                font-size: 10.5px;
                letter-spacing: 1px;
                font-weight: bolder;
                margin-bottom: 5px;
                text-transform: uppercase;
                color: #3d4542;
              }
              input,textarea {
                box-sizing: border-box;
                border: 2px solid #e3e3e3;
                font-family: inherit;
                font-size: 14px;
                color: #747f7b;
                border-radius: 3px;
                padding: 9px;
                width: 100%;
              }
              ::placeholder {
                color: #c3c3c3;
              }
              hr {
                height: 1px;
                border-top: 1px solid #e3e3e3;
                border-bottom: none;
                border-left: none;
                border-right: none;
                margin: 5px 0;
                overflow: visible;
              }
              header {
                position: relative;
                display: flex;
                align-items: center;
                position: relative;
                justify-content: space-between;
                background-color: #FCFCFC;
                width: 100%;
                height: 55px;
                padding: 0 8px;
                box-sizing: border-box;
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
              }

              @media (max-width: 899px) AND (orientation: landscape){
                main {
                  flex-direction: row;
                }
              }
              @media (min-width: 1025px){
                main {
                  flex-direction: row;
                }
                .logo {
                  width: 50px;
                  height: 50px;
                  font-size: 8px;
                  flex: 0 0 50px;
                }
                header {
                  height: 65px;
                  padding: 0 15px;
                }
              }
            </style>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">
`;

export const renderFooter = (loadable, preloadedState) => `
            </div>
            <script>
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script>
            (function() {
              if('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/serviceWorker.js');
              }
            })();
            </script>
            ${loadable.getScriptTags()}
            ${loadable.getStyleTags()}
            <noscript>Your browser does not support JavaScript!</noscript>
        </body>
    </html>

`;
