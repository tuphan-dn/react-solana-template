import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import View from 'view'

import reportWebVitals from 'reportWebVitals'

import 'static/styles/index.less'

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <View />
  </BrowserRouter>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
