export const enforceMaxLength = (event) => {
    if (event.target.value.length > 10) {
      event.target.value = event.target.value.slice(0, 10);
    }
  };
  
  export const enforceNoSpecialChars = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
  };
  
  export const enforceNoSpacesOrSpecialChars = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
  };
  
  export const enforceNoSpaces = (event) => {
    event.target.value = event.target.value.replace(/\s/g, "");
  };
  
  export const enforceTextAndSpacesOnly = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
  };
  
  export const enforce10DigitNumbersNoSpaces = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    value = value.replace(/\s/g, "");
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
  
    event.target.value = value;
  };
  