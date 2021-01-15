/// <reference types="cypress" />

context("Search", () => {
    ["red", "green", "peat", "px"].forEach((term) => {
        context(term, () => {
            it(`can search for value '${term}'`, () => {
                cy.visit("/");
                cy.getByTestId("search-input").type(term);
                cy.getByTestId("search-button").click();
            });

            it("shows search results", () => {
                cy.getByTestId("search-result").should("have.length.above", 0);
            });
        });
    });
});
