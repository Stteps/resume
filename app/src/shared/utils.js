const snakeCase = string => {
    return string.replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
};

const formDataFormatter = (selector) => {
    const formData = new FormData(document.querySelector(selector));
    const formattedFormData = new FormData();
    for (const entry of formData.entries()) 
        formattedFormData.append(snakeCase(entry[0]), entry[1]);
    return Object.fromEntries(formattedFormData);
};

export {
    formDataFormatter,
    snakeCase
};