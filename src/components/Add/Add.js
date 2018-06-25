//imports do react
import React, {Component} from "react";

//rotas
import {urls} from "../../utils/urlUtils";
import { withRouter } from "react-router-dom";
//firebase.
import FirebaseService from "../../services/FirebaseService";

//estilos e peças.
import {Button, TextField, Typography} from "material-ui";

class Add extends Component {

    state = {id: null, nome: '', responsavel: '', cnpj: '', projeto: ''};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('startups', id, (data) => this.setState({...data}, () => console.log(this.state)));
        }

};


    submit = (event) => {
        event.preventDefault();

        const {nome} = this.state;
        const {responsavel} = this.state;
        const {cnpj} = this.state;
        const {projeto} = this.state;

        let objToSubmit =  {
            nome,
            responsavel,
            cnpj,
            projeto
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('startups', objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'startups', objToSubmit)
        }

        this.props.history.push(urls.data.path);

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        return (<React.Fragment>

        <Typography variant="headline" component="h2">Novo projeto</Typography>
        <form onSubmit={this.submit}>

            <TextField className="input-field"
                       type="text"
                       value={this.state.nome}
                       label="Nome"
                       required
                       onChange={this.handleChange('nome')}/>


            <TextField className="input-field"
                       type="text"
                       value={this.state.responsavel}
                       label="responsavel"
                       required
                       onChange={this.handleChange('responsavel')}/>


            <TextField className="input-field"
                       type="text"
                       value={this.state.cnpj}
                       label="cnpj"
                       required
                       onChange={this.handleChange('cnpj')}/>


            <TextField className="input-field"
                       type="text"
                       value={this.state.projeto}
                       label="Nome do projeto"
                       required
                       onChange={this.handleChange('projeto')}/>

            <Button type="submit"
                    style={{marginTop: '20px', display: 'inline-block'}}>
                Enviar
            </Button>
        </form>
    </React.Fragment>)     

    }
}

export default withRouter(Add);