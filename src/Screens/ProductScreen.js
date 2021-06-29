import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';
import data from '../data';

export default function ProductScreen(props) {
  const product = data.products.find((x) => x._id === props.match.params.id);
  if (!product) {
    return <div> Producto no encontrado</div>;
  }
  return (
    <div>
      <Link to="/">Atrás</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name}></img>
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li>Precio : S/{product.price}</li>
            <li>
              Descripción:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Precio</div>
                  <div className="price">S/ {product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Estado</div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">Stock</span>
                    ) : (
                      <span className="error">No dispobible</span>
                    )}
                  </div>
                </div>
              </li>
              <li>
                <button className="primary block">Añadir al carrito</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}