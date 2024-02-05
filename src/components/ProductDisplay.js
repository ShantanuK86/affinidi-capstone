import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './ProductDisplay.css';

const ProductDisplay = ({ addToCart }) => {
  const { profile } = useContext(UserContext);
  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: 'hoodie.png', gender: 'unisex' },
    { id: 2, name: 'T-Shirt', price: 15, imageUrl: 'tee.png', gender: 'unisex' },
    { id: 3, name: 'Shirt', price: 20, imageUrl: 'mshirt.jpg', gender: 'male' },
    { id: 4, name: 'Handbag', price: 70, imageUrl: 'bag.jpg', gender: 'female' },
    { id: 5, name: 'Women Heels', price: 30, imageUrl: 'heel.jpg', gender: 'female' },
    { id: 6, name: 'Men Shoes', price: 25, imageUrl: 'shoes.jpg', gender: 'male' },
    { id: 7, name: 'Men Suit', price: 60, imageUrl: 'suits.jpg', gender: 'male' },
    { id: 8, name: 'Men Watch', price: 55, imageUrl: 'watch.jpg', gender: 'male' },
    { id: 9, name: 'Women T-Shirt', price: 15, imageUrl: 'wtshirt.jpg', gender: 'female' },
    { id: 10, name: 'Saree', price: 45, imageUrl: 'saree.jpg', gender: 'female' },
    { id: 11, name: 'Men-jeans', price: 20, imageUrl: 'mjeans.jpg', gender: 'male' },
  ];

  const recommendationProducts = profile && profile.gender
    ? products.filter(product => product.gender === profile.gender || product.gender === 'unisex')
    : [];

  const exploreProducts = profile && profile.gender
    ? products.filter(product => product.gender !== profile.gender)
    : products;

  return (
    <div className="ProductDisplay">
      <div className="SectionCard RecommendationSection">
        <h2>Recommendation for you</h2>
        <div className="ProductItems">
          {recommendationProducts.map((product) => (
            <div key={product.id} className="ProductItem">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className="SectionCard ExploreSection">
        <h2>Explore other items</h2>
        <div className="ProductItems">
          {exploreProducts.map((product) => (
            <div key={product.id} className="ProductItem">
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;