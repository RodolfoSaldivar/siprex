import { reduxForm, Field, reset } from 'redux-form';
import { Row, Col } from 'react-materialize'
import * as actions from'../../actions';
import InputForma from './InputForma';
import { connect } from 'react-redux';
import React from 'react';
import _ from 'lodash';

//----> Los campos que la forma tiene con sus respectivos atributos
const camposForma = [
	{ name: 'nombre', label: 'NOMBRE', type: 'text' },
	{ name: 'mail', label: 'MAIL', type: 'text' },
	{ name: 'usuarios', label: 'MAX USUARIOS', type: 'number' },
	{ name: 'fecha_corte', label: 'FECHA CORTE', type: 'date' },
];

//----> Empieza el componente
const Guardar = ({ submitEmpresa, handleSubmit }) =>
{
	const cargarCampos = (casilla) =>
	{
		const { name, label, type } = camposForma[casilla];

		return (
			<Field
				key={name}
				name={name}
				label={label}
				type={type}
				component={InputForma}
			/>
		);
	}

	return (
		<form id="empresaForm" onSubmit={handleSubmit((values) => submitEmpresa(values))}>
			<div style={{marginTop: "60px"}} />
			<Row>
				<Col s={12} m={6}>
					{ cargarCampos(0) }
				</Col>
				<Col s={12} m={6}>
					{ cargarCampos(1) }
				</Col>
			</Row>
			<Row>
				<Col s={12} m={6}>
					{ cargarCampos(2) }
				</Col>
				<Col s={12} m={6}>
					{ cargarCampos(3) }
				</Col>
			</Row>
		</form>
	);
}

//----> Solo son funciones de validacion
function validate(values)
{
	const errors = {};

	_.each(camposForma, ({ name }) => {
		if (!values[name]) errors[name] = '*Requerido';
	});

	return errors;
}

//----> Con esta funcion hacemos que tenga acceso al action creator de submit empresa
const mapStateToProps = ({ submitEmpresa }) =>
{
	return { submitEmpresa };
};

//----> Primero conectamos con reduxForm y despues con los action creators
export default reduxForm({
	validate,
	form: 'empresaForm',
	onSubmitSuccess: (result, dispatch) => dispatch(reset('empresaForm'))
})
(connect(mapStateToProps, actions)(Guardar));