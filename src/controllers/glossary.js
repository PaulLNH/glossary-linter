module.exports = {
  getGlossaryTerms: async (glossary) => {
    // Iterate over the glossary terms
    const glossaryTerms = [...glossary.terms];
    return glossaryTerms.map(({ title, dataType, example }) => {
      return {
        title: title || "",
        dataType: dataType || "",
        example: example || "",
      };
    });
    // Example Glossary Term Return Value:
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
  },
};
