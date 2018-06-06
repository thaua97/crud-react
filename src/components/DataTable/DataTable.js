import React from 'react';
import {Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, Link} from "material-ui";
import FirebaseService from "../../services/FirebaseService";

export const DataTable = ({data}) => {

    const remove = (id) => {
        FirebaseService.remove(id, 'startups');
    };

    return <React.Fragment>
        <Grid container justify="center" alignItems="flex-star">
        <Grid item xs={12}>
        <Typography variant="headline" component="h2">Add New</Typography>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Responsavel</TableCell>
                    <TableCell>CNPJ</TableCell>
                    <TableCell>Projeto</TableCell>
                    <TableCell>Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>
                                {item.nome}
                            </TableCell>
                            <TableCell>{item.responsavel}</TableCell>
                            <TableCell>{item.cnpj}</TableCell>
                            <TableCell>{item.projeto}</TableCell>
                            <TableCell>
                                <Button onClick={() => remove(item.key)}>Remover</Button>
                                <Button 
                                    component={props => 
                                        <Link to={privateUrls.edit.pathWithouParam + item.key}    
                                            {...props}/>}>
                                            Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
        </Grid>
        </Grid>
    </React.Fragment>
};