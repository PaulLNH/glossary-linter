const { titleCase } = require("../utils");
const { HEADER } = require("../constants");

module.exports = {
  // Returns all the spec params as objects
  getSpecParamTerms: async (spec) => {
    let paramTerms = [];
    const endpoints = spec.paths;
    // An array of endpoint paths as string eg: ['/articles/{articleId}']
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
            // Get all the terms from the parameters except headers
            const newParamTerms = endpoints[endpoint][httpMethod].parameters
              .map((param) =>
                param.in.toLowerCase() === HEADER
                  ? null
                  : {
                      // TODO: Come up with a way to add section. Possible values include:
                      // Tags (from endpoint), Product (from server/path)
                      section: "", // Intentionally blank, see 'TODO' above
                      title: param.name || "", // The term name itself
                      dataType: titleCase(param.schema.type) || "", // Data Type of the term in Title Case
                      definition: param.description || "", // Description of term
                      example: param.example || "", // Code sample for this term
                      foundIn: [param.in], // query, body, ect
                      synonyms: [], // Like terms (this may have to be manual for now?)
                    }
              )
              .filter((term) => term !== null);
            paramTerms.push(...newParamTerms);
          }
        });
      });
      return paramTerms;
      // Example Spec Term Return Value:
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
  },
};
