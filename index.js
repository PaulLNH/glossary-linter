// Get the glossary data
const glossary = require("./glossary/glossary.json");
// Get the swagger spec
// const spec = require("./spec/swagger.json");
const spec = require("./spec/DynaMed.json");
// Import utils
const { isArray, titleCase } = require("./utils");
const { HEADER } = require("./constants");

const getGlossaryTerms = async glossary => {
  // Iterate over the glossary terms
  return glossary.terms.map(({ title, dataType, example }) => {
    return {
      title: title || "",
      dataType: dataType || "",
      example: example || ""
    };
  });
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

// Returns all the spec params as objects
const getSpecParamTerms = async spec => {
  let paramTerms = [];
  const endpoints = spec.paths;
  // An array of endpoint paths as string eg: ['/articles/{articleId}']
  const endpointsArr = Object.keys(endpoints);
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
          const newParamTerms = endpoints[endpoint][httpMethod].parameters
            .map(param =>
              param.in.toLowerCase() === HEADER
                ? null
                : {
                    section: "", // Comes from path? DynaMed, DynamicHealth?
                    title: param.name || "", // The term
                    dataType: titleCase(param.schema.type) || "", // Data Type of the term
                    definition: param.description || "", // Description of term
                    example: param.example || "", // Code sample for this term
                    foundIn: [param.in], // query, body, ect
                    synonyms: [] // Like terms (this may have to be manual for now?)
                  }
            )
            .filter(term => term !== null);
          paramTerms.push(...newParamTerms);
        }
      });
    });
    return paramTerms;
    // Example Return Value:
    // [
    //   {
    //     section: "",
    //     title: "page",
    //     dataType: "Integer",
    //     definition: "Next page of items to return.",
    //     example: "",
    //     foundIn: ["query"],
    //     synonyms: []
    //   },
    //   {
    //     section: "",
    //     title: "pageSize",
    //     dataType: "Integer",
    //     definition: "Maximum number of items to return per page.",
    //     example: "",
    //     foundIn: ["query"],
    //     synonyms: []
    //   }
    // ];
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
    section: "", // Comes from path? DynaMed, DynamicHealth?
    title: "", // The term
    dataType: "", // Data Type of the term
    definition: "", // Description of term
    example: "", // Code sample for this term
    foundIn: [], // query, body, ect
    synonyms: [] // Like terms (this may have to be manual for now?)
  };
  return termModel;
};

const start = async () => {
  // First get all glossary terms
  const glossaryTerms = await getGlossaryTerms(glossary);
  // console.log(glossaryTerms);

  // Get the parameter names from the spec
  const specParamTerms = await getSpecParamTerms(spec);
  console.log(specParamTerms);

  // Get the response terms from the spec
  // TODO: Write code for this later - complex

  // const matchingTerms = await getMatchingTerms(
  //   glossaryTerms,
  //   specPathTerms,
  //   specParamTerms
  // );
  // console.log(matchingTerms, "Matching Terms");
};

start();
