import React, { useState, useEffect, Fragment } from "react";
import Modal from "../Modal/Modal";
import axiosClient from '../../config/axiosClient';

function ShowProductModal(props) {
  const { selectedRequest, selectedRequestPerson } = props;

  const [productsPerRequest, setProductsPerRequest] = useState([])
  const [products, setProducts] = useState([])
  const [errorProduct, setErrorProduct] = useState('')

  const getProducts = async (idRequest) => {
    try {
      let products = await axiosClient.get(`/request_products/${idRequest}?option=allproducts`)
      setProducts(products.data)
      setErrorProduct('')
    } catch (err) {
      if (err.response) {
        setErrorProduct(err.response.data.error);
        setProducts([]);
      }
    }
  }
  const getProductsPerRequest = async (idRequest) => {
    try {
      let products_per_requests = await axiosClient.get(`/request_products/${idRequest}?option=relationByRequest`)
      setProductsPerRequest(products_per_requests.data)
      setErrorProduct('')
    } catch (err) {
      if (err.response) {
        setErrorProduct(err.response.data.error);
        setProductsPerRequest([]);
      }
    }
  }
  useEffect(() => {
    if ( selectedRequest.idSolicitudEnvio ) {
      getProducts(selectedRequest.idSolicitudEnvio)
      getProductsPerRequest(selectedRequest.idSolicitudEnvio)
      return
    } else {
      setProducts([])
      setProductsPerRequest([])
      return
    }
  },[selectedRequest])
  return (
    <Modal {...props}>
      {
        errorProduct
        ? <p>{errorProduct}</p>
        : <Fragment>
            <h3>Persona que solicita el envío: { selectedRequestPerson ? ` ${selectedRequestPerson.nombre} ${selectedRequestPerson.apellido}` : null}</h3>
            <h3>Cédula de Identidad: { selectedRequestPerson ? ` ${selectedRequestPerson.cedula}` : null}</h3>


            <h3>Descripción: { selectedRequest ? selectedRequest.descripcion : null}</h3>
            <h3>Fecha para entregar: { selectedRequest ? selectedRequest.fecha : null}</h3>
            <h3>Estado de la solicitud: { selectedRequest ? selectedRequest.status : null}</h3>
            <h3>Estado del país en el que se entregarán los productos: { selectedRequest ? selectedRequest.estado : null}</h3>
            <h3>Municipio en el que se entregarán los productos: { selectedRequest ? selectedRequest.municipio : null}</h3>
            <h3>Parroquia en la que se entregarán los productos: { selectedRequest ? selectedRequest.parroquia : null}</h3>
            { selectedRequest.avenida ? <h3>Avenida en la que se entregarán los productos:  `${selectedRequest.avenida}` </h3> : null}
            { selectedRequest.calle ? <h3>Calle en la que se entregarán los productos:  `${selectedRequest.calle}` </h3> : null}
            { selectedRequest.edificio ? <h3>Edificio en el que se entregarán los productos:  `${selectedRequest.edificio}` </h3> : null}
            { selectedRequest.piso ? <h3>Piso del edificio en el que se entregarán los productos:  `${selectedRequest.piso}` </h3> : null}
            { selectedRequest.referencia_extra ? <h3>Referencia Extra:  `${selectedRequest.referencia_extra}` </h3> : null}

            { productsPerRequest.length !== 0
              ? productsPerRequest.map(productPerRequest => {
                const { cantidad, idProductos } = productPerRequest
                const product_found = products.filter(function(product) {
                  return product.idProductos === idProductos
                })
                return (
                  product_found.length !==0
                  ? <Fragment key={idProductos}>
                  <h3>Nombre del Producto: { product_found ? product_found[0].nombre_producto : null}</h3>
                  <h3>Tipo de Producto: { product_found ? product_found[0].tipo_producto : null}</h3>
                  <h3>Tamaño: { product_found ? product_found[0].tamaño : null}</h3>
                  <h3>Peso (kg): { product_found ? product_found[0].peso : null}</h3>
                  <h3>Precio: { product_found ? product_found[0].precio : null}$</h3>
                  <h3>Cantidad: { productPerRequest ? productPerRequest.cantidad : null}</h3>
                </Fragment>
                : null
                )
              })
              : null
            }
          </Fragment>
      }


    </Modal>
  );
}

export default ShowProductModal;
