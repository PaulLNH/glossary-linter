// Get the glossary data
const glossary = require("./glossary/glossary.json");
// Get the swagger spec
// const spec = require("./spec/swagger.json");
const spec = require("./spec/DynaMed.json");
// Import utils
const { isArray } = require("./utils");
const { HEADER } = require("./constants");

const getGlossaryTerms = async glossary => {
  // Iterate over the glossary terms
  return glossary.terms.map(({ title, dataType, example }) => { return { title: title || "", dataType: dataType || "", example: example || "" } });
  // Example Return value:
  // [
  //   {
  //     title: 'timestamp',
  //     dataType: 'String',
  //     example: '"timestamp": "2019-03-20T14:14:45.000Z"'
  //   },
  //   {
  //     title: 'title',
  //     dataType: 'String',
  //     example: '"title": "Heart Failure Alternative Treatments"'
  //   },
  // ]
};

// const getSpecPathTerms = async spec => {
//   // Get terms in the path
//   const endpoints = spec.paths;
//   const endpointsArr = Object.keys(endpoints);
//   if (Array.isArray(endpointsArr)) {
//     return [].concat.apply(
//       [],
//       endpointsArr.map(endpoint =>
//         utils.removeEmptyStringsFromArray(endpoint.split("/"))
//       )
//     );
//   } else {
//     console.log("Error: The following data is not of type 'Array'.", arr);
//   }
// };

// Returns all the spec params as objects
const getSpecParamTerms = async spec => {
  let paramTerms = [];
  const endpoints = spec.paths;
  // An array of endpoint paths as string eg: ['/articles/{articleId}']
  const endpointsArr = Object.keys(endpoints);
  console.log(endpointsArr);
  // Null check the array
  if (isArray(endpointsArr)) {
    // Loop through each endpoint
    endpointsArr.forEach(endpoint => {
      // Extract the number of HTTP methods from the endpoint
      const httpMethodsArr = Object.keys(endpoints[endpoint]);
      // For each HTTP method
      httpMethodsArr.forEach(httpMethod => {
        // Null check the parameters array
        if (isArray(endpoints[endpoint][httpMethod].parameters)) {
          // Get all the terms from the parameters except headers
          const newParamTerms = endpoints[endpoint][httpMethod].parameters.map(
            param => param.in.toLowerCase() === HEADER ? null : param.name
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
getSpecParamTerms(spec);

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
    section: "", // Comes from path? DynaMed, DynamicHealth?
    title: "", // The term
    dataType: "", // Data Type of the term
    definition: "", // Description of term
    example: '', // Code sample for this term
    foundIn: [], // query, body, ect
    synonyms: [] // Like terms (this may have to be manual for now?)
  };
  return termModel;
};

const start = async () => {
  // First get all glossary terms
  const glossaryTerms = await getGlossaryTerms(glossary);
  // console.log(glossaryTerms);

  // Get the path terms from the spec
  // const specPathTerms = await getSpecPathTerms(spec);
  // console.log(specPathTerms);

  // Get the parameter names from the spec
  // const specParamTerms = await getSpecParamTerms(spec);
  // console.log(specParamTerms);

  // Get the response terms from the spec
  // TODO: Write code for this later - complex

  // 


  // const matchingTerms = await getMatchingTerms(
  //   glossaryTerms,
  //   specPathTerms,
  //   specParamTerms
  // );
  // console.log(matchingTerms, "Matching Terms");
};

start();
