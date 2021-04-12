// Get the glossary data
const glossary = require("./glossary/glossary.json");
// Get the swagger spec
const spec = require("./spec/swagger.json");
// Import utils
const utils = require("./utils");

const getGlossaryTerms = async (glossary) => {
  // Iterate over the glossary terms
  return glossary.terms.map((term) => term.title);
};

const getSpecPathTerms = async (spec) => {
  // Get terms in the path
  const endpoints = spec.paths;
  const endpointsArr = Object.keys(endpoints);
  if (Array.isArray(endpointsArr)) {
    return [].concat.apply(
      [],
      endpointsArr.map((endpoint) =>
        utils.removeEmptyStringsFromArray(endpoint.split("/"))
      )
    );
  } else {
    console.log("Error: The following data is not of type 'Array'.", arr);
  }
};

const getSpecParamTerms = async (spec) => {
  let paramTerms = [];
  const endpoints = spec.paths;
  // An array of endpoint paths as string
  const endpointsArr = Object.keys(endpoints);
  // Null check the array
  if (Array.isArray(endpointsArr)) {
    // Loop through each endpoint
    endpointsArr.forEach((endpoint) => {
      // Extract the number of HTTP methods from the endpoint
      const httpMethodsArr = Object.keys(endpoints[endpoint]);
      // For each HTTP method
      httpMethodsArr.forEach((httpMethod) => {
        // Null check the parameters array
        if (Array.isArray(endpoints[endpoint][httpMethod].parameters)) {
          const newParamTerms = endpoints[endpoint][httpMethod].parameters.map(
            (param) => param.name
          );
          paramTerms.push(...newParamTerms);
        }
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
    return paramTerms;
  } else {
    console.log(
      "Error: The following data is not of type 'Array'.",
      endpointsArr
    );
  }
};

const getMatchingTerms = async (glossaryTerms, ...specTerms) => {
  let combinedSpecTerms = [];
  let matchingTerms = [];
  specTerms.forEach((termArr) => combinedSpecTerms.push(...termArr));
  console.log(combinedSpecTerms, "SPEC TERMS");
  combinedSpecTerms.forEach((term) => {
    if (glossaryTerms.indexOf(term) !== -1) {
      matchingTerms.push(glossaryTerms[glossaryTerms.indexOf(term)]);
    }
  });
  return matchingTerms;
};

const start = async () => {
  // Create an array of glossary terms
  const glossaryTermsArray = await getGlossaryTerms(glossary);
  console.log(glossaryTermsArray);

  // Create an array of spec terms
  const specPathTerms = await getSpecPathTerms(spec);
  // console.log(specPathTerms);

  const specParamTerms = await getSpecParamTerms(spec);
  // console.log(specParamTerms);

  const matchingTerms = await getMatchingTerms(
    glossaryTermsArray,
    specPathTerms,
    specParamTerms
  );
  console.log(matchingTerms, "Matching Terms");
};

start();
