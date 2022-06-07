import React from "react";

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Home from "../views/home";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultasLancamentos from "../views/lancamentos/consultas-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import AuthService from "../app/service/authService";

function RotaAutenticada({component: Component, ...props}) {
    return (
        <Route {...props} render={ (componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={{pathname : '/login', state : { from: componentProps.location }}}/>
                )
            }
        }} />
    )
}

function Rotas() {
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <RotaAutenticada path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <Route path="/home" component={Home} />
                <RotaAutenticada path="/consultas-lancamentos" component={ConsultasLancamentos} />
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas
