import React, { useState, useEffect, Fragment } from "react";
import Modal from "../Modal/Modal";
import axiosClient from '../../config/axiosClient';

function AddProductModal(props) {
  const [products, setProducts] = useState([])
  const [productsToSave, setProductsToSave] = useState([])
  const [errorProduct, setErrorProduct] = useState('')

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
  useEffect(() => {
    getProducts()
  },[])

  return (
    <Modal {...props}>
      <form action="">
        // <label htmlFor="product-options">Producto Solicitado</label>
        // <select name="product-options" id="product-options">
        //   <optgroup>
        //     <option value="test">test 1</option>
        //     <option value="test">test 2</option>
        //     <option value="test">test 3</option>
        //   </optgroup>
        // </select>
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
        <input type="date" name="date" id="date" />

        <label htmlFor="description">Descripción</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>

        <div className="grid-direction">
          <div>
            <label htmlFor="estado">Estado</label>
            <input className="small-input" type="text" name="estado" />
          </div>

          <div>
            <label htmlFor="municipio">Municipio</label>
            <input className="small-input" type="text" />
          </div>

          <div>
            <label htmlFor="ciudad">Ciudad</label>
            <input className="small-input" type="text" name="ciudad" />
          </div>

          <div>
            <label htmlFor="parroquia">Parroquia</label>
            <input className="small-input" type="text" name="parroquia" />
          </div>

          <div>
            <label htmlFor="avenida">Avenida</label>
            <input className="small-input" type="text" name="avenida" />
          </div>

          <div>
            <label htmlFor="calle">Calle</label>
            <input className="small-input" type="text" name="calle" />
          </div>

          <div>
            <label htmlFor="edificio">Edificio</label>
            <input className="small-input" type="text" name="edificio" />
          </div>

          <div>
            <label htmlFor="piso">Piso</label>
            <input className="small-input" type="text" name="piso" />
          </div>
        </div>

        <label htmlFor="direction-ref">Referencia</label>
        <textarea
          name="direction-ref"
          id="direction-ref"
          cols="30"
          rows="10"
        ></textarea>

        <button className="b-submit" type="submit">Publicar Envío</button>
      </form>
    </Modal>
  );
}

export default AddProductModal;
