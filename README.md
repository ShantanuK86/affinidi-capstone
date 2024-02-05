# Capstone Project Readme

## New Features and Code Added

### Country Name to Currency Code and Currency Conversion Feature
The Cart component includes functionality to fetch country information, obtain the corresponding currency code, and perform currency conversion based on the user's profile. Here's how this feature works:

- **Fetching Country Information:** The component retrieves country information using the profile.country property. It then makes a request to an API (https://api.api-ninjas.com/v1/country) to fetch details about the country, including its currency code. If the country information is successfully fetched, the currency code is extracted and stored using the setCurrencyCode hook.

- **Currency Conversion:** Once the currency code is obtained, the component calculates the total price of items in the cart along with any additional charges. If the country is not equal to 'India', an extra charge of $15 is applied. The convertCurrency function then performs the currency conversion using another API (https://currency-converter-pro1.p.rapidapi.com/convert). The converted currency amount is stored in the conversionResult state variable.

- **Displaying Currency Conversion Result:** The component renders the total price and any additional charges in the user's selected currency. If the conversion result is available (conversionResult is not null), it displays the converted total price along with the currency code.

- **Displaying Delivery Address:** Additionally, the component displays the delivery address based on the user's profile, including the postal code and country.

#### Code Snippet - Fetch Country Information and Convert Currency

```jsx
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
```

### Gender Recommendation Feature
The ProductDisplay component utilizes the gender information from the user's profile to provide personalized product recommendations. Here's how the gender recommendation feature works:

- **Filtering Recommendation Products:** The products array contains various items with associated gender information. The recommendationProducts variable filters these products based on the user's gender. If the user's gender is available in the profile, it filters products that match the user's gender or are marked as 'unisex'.

- **Displaying Recommendation Section:** The component renders a section titled "Recommendation for you" and displays products filtered based on the user's gender. Each recommended product is shown with its image, name, price, and an "Add to Cart" button.

- **Explore Other Items:** Additionally, the component displays a section titled "Explore other items" where products not matching the user's gender are displayed. This section allows users to explore a wider range of products beyond their gender-specific recommendations.
#### Code Snippet - Gender Recommendation Feature

```jsx
// Filtering products based on user's gender
const recommendationProducts = profile && profile.gender
  ? products.filter(product => product.gender === profile.gender || product.gender === 'unisex')
  : [];

const exploreProducts = profile && profile.gender
  ? products.filter(product => product.gender !== profile.gender)
  : products;

// Rendering recommendation section
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

// Rendering explore section
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

```
## Other Data Points Requested from the Vault
- In addition to gender, the following data points are requested from the Vault:
  - Country name
  - Postal code

## User Experience Enhancements

### 1. **Gender-based Recommendation:**

- By recommending items similar to the user's gender, the user experience is enhanced as it provides personalized recommendations tailored to the user's preferences.

- This feature increases user engagement by showcasing relevant products, ultimately leading to higher satisfaction and potentially increased conversions.

### 2. **Native Currency Billing:**

- Users can now receive bills in their native currency, providing a much better experience compared to displaying prices in the default currency (USD).

- This feature eliminates confusion and enhances transparency by presenting pricing information in a familiar currency, leading to a smoother checkout process and improved user satisfaction.

