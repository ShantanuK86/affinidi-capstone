# Capstone Project Readme

## New Features and Code Added

### Currency Conversion Feature
- Added functionality to fetch the user's country information and currency code from their profile.
- Integrated two APIs to convert the default currency (USD) of the website into the user's native currency.
- Currency conversion is triggered when the component mounts, ensuring accurate pricing throughout the user's session.
- Displayed the converted total price in the user's native currency along with the currency code in the cart view.
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

### Gender-based Recommendation Feature
- Utilized the gender data point obtained from the user to recommend items on the website page accordingly.
- Enhanced user experience by personalizing item recommendations based on the user's gender.

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


## Cart.js File Modifications
- Added functionality to fetch country information and convert currency when the component mounts.
- Implemented logic to calculate total price and extra charges based on the user's country.
- Integrated the display of converted total price and currency code in the cart view.
- Improved user experience by displaying delivery address information based on the user's postal code and country.

