// Get the glossary data
const glossary = require("./glossary/glossary.json");
// Get the swagger spec
const spec = require("./spec/swagger.json");
// Import utils
const utils = require("./utils");

const getGlossaryTerms = glossary => {
  // Iterate over the glossary terms
  return glossary.terms.map(term => term.title);
};

const getSpecPathTerms = spec => {
  // Get terms in the path
  const endpoints = spec.paths;
  const endpointsArr = Object.keys(endpoints);
  if (Array.isArray(endpointsArr)) {
    return [].concat.apply(
      [],
      endpointsArr.map(endpoint =>
        utils.removeEmptyStringsFromArray(endpoint.split("/"))
      )
    );
  } else {
    console.log("Error: The following data is not of type 'Array'.", arr);
  }
};

const getSpecParamTerms = spec => {
  let paramTerms = [];
  const endpoints = spec.paths;
  // An array of endpoint paths as string
  const endpointsArr = Object.keys(endpoints);
  // Null check the array
  if (Array.isArray(endpointsArr)) {
    // Loop through each endpoint
    endpointsArr.forEach(endpoint => {
      // Extract the number of HTTP methods from the endpoint
      const httpMethodsArr = Object.keys(endpoints[endpoint]);
      // For each HTTP method
      httpMethodsArr.forEach(httpMethod => {
        // Null check the parameters array
        console.log(endpoints[endpoint][httpMethod].parameters);
        // if (Array.isArray(endpoints[endpoint][httpMethod].parameters)) {
          const paramTerms = endpoints[endpoint][httpMethod].parameters.map(
            param => param.name
          )
          paramTerms.push(paramTerms);
        // } else {
        //   console.log(
        //     "Error: DOGSHIT The following data is not of type 'Array'.",
        //     endpoints[endpoint][httpMethod].parameters
        //   );
        // }
      });
      // for (index in httpMethodsArr) {
      //   console.log(httpMethodsArr[index], "Index");
      //   if (Array.isArray(httpMethodsArr[index].parameters)) {
      //     paramTerms = [...httpMethodsArr[index].parameters.map(parameter => parameter.name)];
      //   } else {
      //     console.log("Error: The following data is not of type 'Array'.", httpMethodsArr[index].parameters);
      //   }
      // }
    });
  } else {
    console.log(
      "Error: The following data is not of type 'Array'.",
      endpointsArr
    );
  }
};

// Create an array of glossary terms
const glossaryTermsArray = getGlossaryTerms(glossary);
// console.log(glossaryTermsArray);

// Create an array of spec terms
const specPathTerms = getSpecPathTerms(spec);
// console.log(specPathTerms);

const specParamTerms = getSpecParamTerms(spec);
console.log(specParamTerms);
