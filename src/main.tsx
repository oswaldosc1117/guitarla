import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render( // NG - 1.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


/** NOTAS GENERALES
 * 
 * Assertion non null operator: El operador de aserción no nulo de TypeScript (!) se utiliza para afirmar que un valor no es nulo ni indefinido, incluso cuando
 * las comprobaciones estrictas de nulos de TypeScript están habilitadas. Este operador le dice a TypeScript que trate la expresión como si estuviera garantizado
 * que tiene un valor, eliminando las comprobaciones nulas e indefinidas en tiempo de compilación. Dado que en TypeScript hay que especificar si un valor existe o no
 * ese signo de exclamacion (assertion non null operator) le dice a TypeScript que ese valor si existe y que no es necesario realizar las comprobaciones.
*/
