import React from 'react'
import currencyFormatter from 'currency-formatter'

const LancamentosTable = (props) => {

    const rows = props.lancamentos.map( lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button className='btn btn-success' title='Efetivar'
                            disabled={ lancamento.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                            type='button'
                            style={{marginRight: '5px'}}>
                            <i className='pi pi-check'></i>
                    </button>
                    <button className='btn btn-warning' title='Cancelar'
                            disabled={ lancamento.status !== 'PENDENTE' }
                            onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                            type='button'
                            style={{marginRight: '5px'}}>
                            <i className='pi pi-times'></i>
                    </button>
                    <button className='btn btn-primary' title='Editar'
                            type='button'
                            onClick={e => props.editarAction(lancamento.id)}
                            style={{marginRight: '5px'}}>
                            <i className='pi pi-pencil'></i>
                    </button>
                    <button className='btn btn-danger' title='Excluir'
                            type='button' 
                            onClick={e => props.deletarAction(lancamento)}>
                            <i className='pi pi-trash'></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>Descri????o</th>
                    <th scope='col'>Valor</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>M??s</th>
                    <th scope='col'>Situa????o</th>
                    <th scope='col'>A????es</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable;