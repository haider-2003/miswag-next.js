 // this for uil convert from "1234567" => "1,234,567"
export const formatPrice = (priceString) => {
  const number = parseFloat(priceString);
  return isNaN(number) ? priceString : number.toLocaleString();
};

//this is just for logic or math
export const parsePrice = (priceString) => parseFloat(priceString) || 0;
