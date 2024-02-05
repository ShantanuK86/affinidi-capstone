import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems }) => {
 const navigate = useNavigate();
 const { profile } = useContext(UserContext);
 const [countryInfo, setCountryInfo] = useState(null);
 const [conversionResult, setConversionResult] = useState(null);
 const [currencyCode, setCurrencyCode] = useState(null);

 useEffect(() => {
  // Fetch country information
  const fetchCountryInfo = async () => {
     if (!profile || !profile.country) {
       alert('Profile country information is missing.');
       return;
     }
     try {
       const response = await fetch(`https://api.api-ninjas.com/v1/country?name=${profile.country}`, {
         method: 'GET',
         headers: { 'X-Api-Key': 'CfRZ0F2z3uMQyxbOT4Mjcg==Id9d7BFatLmZIFYI' },
       });
       const data = await response.json();
       if (data.length > 0) {
         setCountryInfo(data[0]);
         setCurrencyCode(data[0].currency.code);
         // Convert currency if country information is available
         const { totalPrice, extraCharges } = getTotalPrice();
         convertCurrency('USD', data[0].currency.code, (totalPrice + extraCharges).toString());
       } else {
         alert('No information available for the provided country name.');
       }
     } catch (error) {
       console.error('Error fetching country info:', error);
     }
  };
 
  // Convert currency
  const convertCurrency = async (haveCurrency, wantCurrency, amount) => {
     if (!wantCurrency.trim() || !amount.trim()) {
       alert('Please fill in all fields.');
       return;
     }
     try {
       const response = await fetch(`https://currency-converter-pro1.p.rapidapi.com/convert?from=${haveCurrency}&to=${wantCurrency}&amount=${amount}`, {
         method: 'GET',
         headers: {
           'X-RapidAPI-Key': '63015cfefbmshf319b256e4788fcp1800abjsnfe5d52998580',
           'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
         }
       });
       const jsonResponse = await response.json();
       setConversionResult(jsonResponse.result.toFixed(2));
     } catch (error) {
       console.error('Error converting currency:', error);
     }
  };

    // Fetch country info and convert currency when component mounts
    if (profile && profile.country) {
      fetchCountryInfo(profile.country);
    }
 }, []);

  const getTotalPrice = () => {
    let totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    let extraCharges = 0;

    // Add extra charges if country is not equal to India
    if (profile && profile.country && profile.country !== 'India') {
      extraCharges = 15; // Extra charge of $15
    }

    return { totalPrice, extraCharges };
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  // Function to get delivery address from the profile's postal code and country
  const getDeliveryAddress = () => {
    if (profile && profile.postalCode && profile.country) {
      // Assuming the profile object has a postalCode and country property
      return `Deliver To: ${profile.postalCode}, ${profile.country}`;
    }
    return 'Delivery Address: Not Available';
  };

  return (
    <div className="Cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="4">Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td><img src={item.imageUrl} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>${getTotalPrice().totalPrice}{getTotalPrice().extraCharges > 0 && `+$${getTotalPrice().extraCharges} (extra charges)`}</td>
          </tr>
          {profile && profile.country === 'India' && (
            <tr>
              <td colSpan="4">Free Delivery Across India</td>
            </tr>
          )}
          {conversionResult && (
            <tr>
              <td colSpan="4">After Currency Conversion : {conversionResult} {currencyCode}</td>
            </tr>
          )}
        </tfoot>
      </table>
      <button onClick={goToCheckout} disabled={cartItems.length === 0}>Go to Checkout</button>

      {/* Display delivery address button */}
      <button>{getDeliveryAddress()}</button>
    </div>
  );
};

export default Cart;
