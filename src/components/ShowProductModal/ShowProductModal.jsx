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
  const formatDate = (fecha) => {
    let date = new Date(fecha)
    return date.toISOString().split("T")[0]
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
            <label htmlFor="times">Persona que solicita el envío: </label>
            <div id="times">
              <input type="text" value={ selectedRequestPerson ? ` ${selectedRequestPerson.nombre} ${selectedRequestPerson.apellido}` : null}/>
            </div>

            <label htmlFor="times">Cédula de Identidad:</label>
            <div id="times">
              <input type="number" value={ selectedRequestPerson ? selectedRequestPerson.cedula : null}/>
            </div>

            <label htmlFor="description">Descripción</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={selectedRequest ? selectedRequest.descripcion : null}
            ></textarea>

            <label htmlFor="date">Fecha para entregar:</label>
            <input type="date" name="date" id="date" value={ selectedRequest.fecha ? formatDate(selectedRequest.fecha) : null}/>

            <div className="grid-direction">
              <div>
                <label htmlFor="estado">Estado</label>
                <input className="small-input" type="text" name="estado" value={ selectedRequest.estado ? selectedRequest.estado : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="municipio">Municipio</label>
                <input className="small-input" type="text" name="municipio" value={ selectedRequest.municipio ? selectedRequest.municipio : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="ciudad">Ciudad</label>
                <input className="small-input" type="text" name="ciudad" value={ selectedRequest.ciudad ? selectedRequest.ciudad : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="parroquia">Parroquia</label>
                <input className="small-input" type="text" name="parroquia" value={ selectedRequest.parroquia ? selectedRequest.parroquia : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="avenida">Avenida</label>
                <input className="small-input" type="text" name="avenida" value={ selectedRequest.avenida ? selectedRequest.avenida : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="calle">Calle</label>
                <input className="small-input" type="text" name="calle" value={ selectedRequest.calle ? selectedRequest.calle : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="edificio">Edificio</label>
                <input className="small-input" type="text" name="edificio" value={ selectedRequest.edificio ? selectedRequest.edificio : 'Sin Especificar'}/>
              </div>

              <div>
                <label htmlFor="piso">Piso</label>
                <input className="small-input" type="text" name="piso" value={ selectedRequest.piso ? selectedRequest.piso : 'Sin Especificar'}/>
              </div>
            </div>
            <label htmlFor="direction-ref">Referencia extra: </label>
            <textarea
              name="referencia_extra"
              id="direction-ref"
              cols="30"
              rows="10"
              value={ selectedRequest.referencia_extra ? selectedRequest.referencia_extra : 'Sin Especificar' }
            ></textarea>
            <p>Productos Solicitados</p>
            <hr />
              <ul className="grid-products">
                { productsPerRequest.length !== 0
                  ? productsPerRequest.map(productPerRequest => {
                      const { cantidad, idProductos } = productPerRequest
                      const product_found = products.filter(function(product) {
                        return product.idProductos === idProductos
                      })
                      return (
                        product_found.length !== 0
                        ? <li key={idProductos}>{ product_found ? product_found[0].nombre_producto : null} <sup>{cantidad}</sup></li>
                        : null
                      )
                    })
                  : null
                }
              </ul>
            <hr />
            <form action="">










            </form>
          </Fragment>
      }


    </Modal>
  );
}

export default ShowProductModal;
