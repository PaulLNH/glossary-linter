// Get the glossary data
const glossary = require("./glossary/glossary.json");
// Get the swagger spec
const spec = require("./spec/swagger.json");
// Import utils
const utils = require("./utils");

const getGlossaryTerms = async glossary => {
  // Iterate over the glossary terms
  return glossary.terms.map(term => term.title);
};

const getSpecPathTerms = async spec => {
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

const getSpecParamTerms = async spec => {
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
        if (Array.isArray(endpoints[endpoint][httpMethod].parameters)) {
          // Get all the terms from the parameters except headers
          const newParamTerms = endpoints[endpoint][httpMethod].parameters.map(
            param => param.in.toLowerCase() === "header" ? null : param.name
          ).filter(term => term !== null);
          paramTerms.push(...newParamTerms);
        }
      });
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
  specTerms.forEach(termArr => combinedSpecTerms.push(...termArr));
  combinedSpecTerms.forEach(term => {
    if (glossaryTerms.indexOf(term) !== -1) {
      matchingTerms.push(glossaryTerms[glossaryTerms.indexOf(term)]);
    }
  });
  return matchingTerms;
};

const addNewGlossaryTerm = async termObj => {
  const termModel = {
    section: "Collections and Pagination",
    title: "aggregations",
    dataType: "Array",
    definition:
      "An array of total item counts aggregated by the values of a response field.",
    example:
      '"aggregations": ["field": "pubTypeId", "counts": { "Image": 8, "condition": 410, "drug": 154, "lab": 7 }]',
    foundIn: ["Response"],
    synonyms: ["buckets"]
  };
};

const start = async () => {
  // First get all glossary terms
  const glossaryTerms = await getGlossaryTerms(glossary);
  // console.log(glossaryTerms);

  // Get the path terms from the spec
  const specPathTerms = await getSpecPathTerms(spec);
  // console.log(specPathTerms);

  // Get the parameter names from the spec
  const specParamTerms = await getSpecParamTerms(spec);
  console.log(specParamTerms);

  // Get the response terms from the spec
  // TODO: Write code for this later - complex

  // 


  const matchingTerms = await getMatchingTerms(
    glossaryTerms,
    specPathTerms,
    specParamTerms
  );
  console.log(matchingTerms, "Matching Terms");
};

start();
