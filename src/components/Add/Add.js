//imports do react
import React, {Component} from "react";

//rotas
import {urls} from "../../utils/urlUtils";
import { withRouter } from "react-router-dom";

//firebase.
import FirebaseService from "../../services/FirebaseService";

//estilos e peças.
import {Button, TextField, Typography} from "material-ui";
import { firebaseDatabase } from "../../utils/firebaseUtils";

class Add extends Component {

    state = {id:null, nome: '', responsavel: '', cnpj: '', projeto: ''};

    componentWillUnmount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
           this.setState({id});
           FirebaseService.getUniqueDataBy('startups', id, (data) => this.setState({...data},
            () => console.log(this.state)));
        }
    };


    submit = (event) => {
        event.preventDefault();

        const {nome} = this;
        const {responsavel} = this;
        const {cnpj} = this;
        const {projeto} = this;

        let objToSubmit =  {
            nome,
            responsavel,
            cnpj,
            projeto
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('startups', objToSubmit);
        } else {
            FirebaseDatabase.updateData(this.props.match.params.id, 'startups', objToSubmit)
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
                       defaultValue={''}
                       label="Nome"
                       required
                       onChange={this.handleChange('nome')}/>


            <TextField className="input-field"
                       type="text"
                       label="responsavel"
                       defaultValue={''}
                       required
                       onChange={this.handleChange('responsavel')}/>


            <TextField className="input-field"
                       type="text"
                       label="cnpj"
                       defaultValue={''}
                       required
                       onChange={this.handleChange('cnpj')}/>


            <TextField className="input-field"
                       type="text"
                       label="Nome do projeto"
                       defaultValue={''}
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