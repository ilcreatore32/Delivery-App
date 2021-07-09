import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from 'react-router-dom'
import Modal from "../Modal/Modal";
import axiosClient from '../../config/axiosClient';
import { v4 as uuid } from 'uuid';

function AddProductModal(props) {
  const [user, setUser] = useState({
    cedula: 28044244,
    tipo_cedula: "V",
    nombre: "Jesús",
    apellido: "Rivas",
  })
  const [products, setProducts] = useState([])
  const [productsToSave, setProductsToSave] = useState([])

  const [errorProduct, setErrorProduct] = useState('')
  const [sucessProduct, setSucessProduct] = useState('')
  const [request, setRequest] = useState({
    idSolicitudEnvio: uuid(),
    descripcion: '',
    fecha: '',
    status: 'No Realizada',
    estado: '',
    municipio: '',
    ciudad: '',
    parroquia: '',
    avenida: '',
    calle: '',
    edificio: '',
    piso: '',
    referencia_extra: '',
    personas_cedula: user.cedula
  })

  const getProducts = async () => {
    try {
      let products = await axiosClient.get(`/products`)
      setProducts(products.data)
      setErrorProduct('')
    } catch (err) {
      if (err.response) {
        setErrorProduct(err.response.data.error);
        setProducts([]);
      }
    }
  }
  const saveProducts = e => {
    e.preventDefault()
    const getidProductosInput = document.getElementsByName("product_to_add")
    const cantidadProductosInput = document.getElementsByName("howMuch")
    const productsAndcantidad = {
      idProductos: getidProductosInput[0].value,
      cantidad: cantidadProductosInput[0].value < 0 ? 0 : cantidadProductosInput[0].value
    }
    if (productsToSave.length === 0) {
      if (productsAndcantidad.cantidad < 1) return
      setProductsToSave(prevproductsToSave => [...prevproductsToSave, productsAndcantidad])
    } else {
      if (productsAndcantidad.cantidad < 1) {
        let productsToConserve = productsToSave.filter(function(product) {
          return product.idProductos !== productsAndcantidad.idProductos
        })
        console.log(productsToConserve.length);
        setProductsToSave(productsToConserve)
        return
      }
      let repitedproduct = productsToSave.filter(function(product) {
        return product.idProductos === productsAndcantidad.idProductos
      })
      if (repitedproduct[0]) {
        setProductsToSave(prevproductsToSave => prevproductsToSave.map(product => (
          product.idProductos === repitedproduct[0].idProductos ? {...product, cantidad: productsAndcantidad.cantidad} : product
        )))
      } else {
        setProductsToSave(prevproductsToSave => [...prevproductsToSave, productsAndcantidad])
      }
    }
  }
  const saveRequest = e => {
    setRequest({
        ...request,
        [e.target.name] : e.target.value
    })
  }

  const sendRequest = async e => {
    e.preventDefault()
    if (productsToSave.length === 0) {
      setErrorProduct('Seleccione algún producto')
      setTimeout(() => {
        setErrorProduct('')
      }, 3000);
      return
    }
    try {
      await axiosClient.post('/requests', request)
      productsToSave.map(async product => {
        try {
          await axiosClient.post('/request_products', {
            cantidad: product.cantidad,
            idProductos: product.idProductos,
            idSolicitudEnvio: request.idSolicitudEnvio
          })
          setSucessProduct('Exito al crear producto');
          setTimeout(() => {
            setSucessProduct('')
            window.location.replace('/product')
          }, 3000);
        } catch (err) {
          if (err) {
            setErrorProduct(Object.values(err.response.data[0])[0]);
            setTimeout(() => {
              setErrorProduct('')
            }, 3000);
          }
        }
      })
    } catch (err) {
      if (err) {
        setErrorProduct(Object.values(err.response.data[0])[0]);
        setTimeout(() => {
          setErrorProduct('')
        }, 3000);
      }
    }
  }

  useEffect(() => {
    getProducts()
  },[])

  return (
    <Modal {...props}>
      <form onSubmit={sendRequest}>
        {errorProduct ? <span class="toast danger">{errorProduct}</span> : null}
        {sucessProduct ? <span class="toast success">{sucessProduct}</span> : null}
        {// <label htmlFor="product-options">Producto Solicitado</label>
        // <select name="product-options" id="product-options">
        //   <optgroup>
        //     <option value="test">test 1</option>
        //     <option value="test">test 2</option>
        //     <option value="test">test 3</option>
        //   </optgroup>
        // </select>
        }
        <form>
          <div className="grid-direction">
            <div>
              <label htmlFor="product">Producto</label>
              <select name="product_to_add" id="product">
                <optgroup>
                  {
                    (products && products.length !== 0)
                    ? products.map(product => (
                      <option value={product.idProductos} key={product.idProductos}>{product.nombre_producto}</option>
                    ))
                    : <option value="">No se encuentran productos</option>
                }
                </optgroup>
              </select>
            {/*<input className="small-input" type="text" name="product" />*/}
            </div>
            <div>
              <label htmlFor="howMuch">Cantidad Solicitada</label>
              <input className="small-input" type="number" name="howMuch" />
            </div>
            <div>
              <label htmlFor="add-product">Añadir</label>
              <button className="add-button flex-item small-flex-item add-product" onClick={saveProducts} name="add-product" type="submit">+</button>
            </div>
        </div>
        </form>
        {
          productsToSave.length !== 0
          ? <Fragment>
              <hr />
              <ul className="grid-products">
                { productsToSave.length !== 0
                  ? productsToSave.map(productToSave => {
                      const getProduct = products.filter(function(product) {
                        return productToSave.idProductos === product.idProductos
                      })
                      return (<li>{getProduct[0].nombre_producto}<sup>{productToSave.cantidad}</sup></li>)
                    })
                  : null
                }
              </ul>
              <hr />
            </Fragment>
          : false
        }


        <label htmlFor="date">Fecha</label>
        <input type="date" name="fecha" id="date" onChange={saveRequest}/>

        <label htmlFor="description">Descripción</label>
        <textarea
          name="descripcion"
          id="description"
          cols="30"
          rows="10"
          onChange={saveRequest}
        ></textarea>

        <div className="grid-direction">
          <div>
            <label htmlFor="estado">Estado</label>
            <input className="small-input" type="text" name="estado" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="municipio">Municipio</label>
            <input className="small-input" type="text" name="municipio" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="ciudad">Ciudad</label>
            <input className="small-input" type="text" name="ciudad" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="parroquia">Parroquia</label>
            <input className="small-input" type="text" name="parroquia" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="avenida">Avenida</label>
            <input className="small-input" type="text" name="avenida" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="calle">Calle</label>
            <input className="small-input" type="text" name="calle" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="edificio">Edificio</label>
            <input className="small-input" type="text" name="edificio" onChange={saveRequest}/>
          </div>

          <div>
            <label htmlFor="piso">Piso</label>
            <input className="small-input" type="text" name="piso" onChange={saveRequest}/>
          </div>
        </div>

        <label htmlFor="direction-ref">Referencia</label>
        <textarea
          name="referencia_extra"
          id="direction-ref"
          cols="30"
          rows="10"
          onChange={saveRequest}
        ></textarea>

        <button className="b-submit" type="submit">Publicar Envío</button>
      </form>
    </Modal>
  );
}

export default AddProductModal;
