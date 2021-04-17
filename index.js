const fs = require("fs");
// Get the glossary data
// const glossary = require("./input/glossary/glossary.json");
const glossary = require("./input/glossary/glossary_min.json");
const GLOSSARY_OUTPUT_LOCATION = `${__dirname}/output`;
// const rawGlossaryData = fs.readFileSync("./input/glossary/glossary.json");
// const glossary = JSON.parse(rawGlossaryData);
// Get the swagger spec
// const spec = require("./spec/swagger.json");
const spec = require("./input/spec/DynaMed.json");
// Import utils
const {
  isArray,
  titleCase,
  parseJSONForWritingToFile,
} = require("./src/utils");
const { getGlossaryTerms } = require("./src/controllers").glossary;
const { getSpecParamTerms } = require("./src/controllers").spec;
const { GLOSSARY_FILENAME } = require("./src/constants");

const compareSpecTermsAgainstGlossary = async (specTerms, glossaryTerms) => {
  let combinedSpecTerms = [];
  let matchingTerms = [];
  specTerms.forEach((termArr) => combinedSpecTerms.push(...termArr));
  combinedSpecTerms.forEach((term) => {
    if (glossaryTerms.indexOf(term) !== -1) {
      matchingTerms.push(glossaryTerms[glossaryTerms.indexOf(term)]);
    }
  });
  return matchingTerms;
};

// TODO: Temporary solution for this is to output a new glossary.json file in the "output" folder.
const addNewTermToGlossary = async (termObj, glossary) => {
  const { section, title, dataType, definition, example, foundIn } = termObj;
  // console.log(glossary, "Updated Glossary BEFORE");
  const termModel = {
    section, // Comes from path? DynaMed, DynamicHealth?
    title, // The term
    dataType, // Data Type of the term
    definition, // Description of term
    example, // Code sample for this term
    foundIn: [...foundIn] || [], // query, body, ect
    synonyms: [], // Like terms (this may have to be manual for now?)
  };
  glossary.terms.push(termModel);
  // updatedGlossary = getUpdatedGlossary();
  // console.log(glossary, "Updated Glossary AFTER");
  console.log(
    `${GLOSSARY_OUTPUT_LOCATION}/${GLOSSARY_FILENAME}`,
    "GLOSSARY_OUTPUT_LOCATION"
  );
  fs.writeFile(
    `${GLOSSARY_OUTPUT_LOCATION}/${GLOSSARY_FILENAME}`,
    parseJSONForWritingToFile(glossary),
    function (err) {
      if (err) throw err;
      console.log(
        `Glossary has been updated to include "${termObj.title}" and can be found at: ${GLOSSARY_OUTPUT_LOCATION}/${GLOSSARY_FILENAME}`
      );
    }
  );
  return glossary;
};

const start = async () => {
  // First get all glossary terms
  // const glossaryTerms = await getGlossaryTerms(glossary);
  // console.log(glossaryTerms);

  // Get the parameter names from the spec
  const specParamTerms = await getSpecParamTerms(spec);
  console.log(specParamTerms);

  // Get the response terms from the spec
  // TODO: Write code for this later - complex

  // Add a term to the glossary
  addNewTermToGlossary(
    {
      section: "DynaMed",
      title: "Paul Laird",
      dataType: "String",
      definition: "The Author of this awesome tool.",
      example: '"paul": "Laird"',
      foundIn: ["query"],
      synonyms: [],
    },
    glossary
  );
};

start();
