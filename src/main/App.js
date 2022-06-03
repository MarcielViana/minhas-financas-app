import React from "react";
import Rotas from "./rotas";
import Navbar from "../components/navbar";

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css'
import 'toastr/build/toastr.css'


import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

class App extends React.Component {
  render() {
    return(
      <>
      <Navbar/>

      <div className="container">
        <Rotas/>
      </div>
      <script src="https://unpkg.com/primereact/primereact.all.min.js"></script>
      </>
    )
  }
}

export default App;