import React from "react";

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import Home from "../views/home";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultasLancamentos from "../views/lancamentos/consultas-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer } from "./provedorAutenticacao";
import LandingPage from "../views/landingPage";

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}) {
    return (
        <Route exact {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
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

function Rotas(props) {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consultas-lancamentos" component={ConsultasLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)
