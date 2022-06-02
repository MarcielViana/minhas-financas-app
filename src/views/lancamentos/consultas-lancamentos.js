import React from "react";
import { withRouter } from 'react-router-dom';
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import LancamentosTable from "./lancamentosTable";

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if(!this.state.ano){
            mensagemErro('O campo ano é obrigatório.');
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro).then(resposta => {
            this.setState({lancamentos: resposta.data})
        }).catch(error => {
            console.log(error)
        })
    }

    editar = (id) => {
        console.log(id)
    }

    deletar = (lancamento) => {
        this.service.deletar(lancamento.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                lancamentos.splice(index, 1);
                this.setState(lancamentos)
                mensagemSucesso('Lançamento deletado com sucesso!')
            }).catch(error => {
                mensagemErro('Ocorreu um erro ao tentar deletar o lançamento!')
            })
    }

    render(){

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputAno" 
                                       value={this.state.ano}
                                       onChange={e => this.setState({ano: e.target.value})}
                                       aria-describedby="anoHelp" 
                                       placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" label="Descrição:">
                                <input type="text" 
                                       className="form-control" 
                                       id="inputDesc" 
                                       value={this.state.descricao}
                                       onChange={e => this.setState({descricao: e.target.value})}
                                       aria-describedby="descricaoHelp" 
                                       placeholder="Digite a Descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}
                                            className="form-control" 
                                            lista={meses}/>
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo" 
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})}
                                            className="form-control" 
                                            lista={tipos}/>
                            </FormGroup>

                            <button type="button" onClick={this.buscar} className="btn btn-success" style={{marginRight: '5px'}}>Buscar</button>
                            <button type="button" className="btn btn-danger">cadastrar</button>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                                lancamentos={this.state.lancamentos} 
                                deletarAction={this.deletar}
                                editarAction={this.editar}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);