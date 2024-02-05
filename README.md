# Capstone Project Readme

## New Features and Code Added

### Currency Conversion Feature
- Added functionality to fetch the user's country information and currency code from their profile.
- Integrated two APIs to convert the default currency (USD) of the website into the user's native currency.
- Currency conversion is triggered when the component mounts, ensuring accurate pricing throughout the user's session.
- Displayed the converted total price in the user's native currency along with the currency code in the cart view.

### Gender-based Recommendation Feature
- Utilized the gender data point obtained from the user to recommend items on the website page accordingly.
- Enhanced user experience by personalizing item recommendations based on the user's gender.

## Other Data Points Requested from the Vault
- In addition to gender, the following data points are requested from the Vault:
  - Country name
  - Postal code

## User Experience Enhancement
1. **Gender-based Recommendation:**
   - By recommending items similar to the user's gender, the user experience is enhanced as it provides personalized recommendations tailored to the user's preferences.
   - This feature increases user engagement by showcasing relevant products, ultimately leading to higher satisfaction and potentially increased conversions.

2. **Native Currency Billing:**
   - Users can now receive bills in their native currency, providing a much better experience compared to displaying prices in the default currency (USD).
   - This feature eliminates confusion and enhances transparency by presenting pricing information in a familiar currency, leading to a smoother checkout process and improved user satisfaction.

## Cart.js File Modifications
- Added functionality to fetch country information and convert currency when the component mounts.
- Implemented logic to calculate total price and extra charges based on the user's country.
- Integrated the display of converted total price and currency code in the cart view.
- Improved user experience by displaying delivery address information based on the user's postal code and country.

