import PokeCard from "./PokeCard.vue";

describe("<PokeCard />", () => {
  it("renders", () => {
    const props: any = {
      card: {
        key: "club",
        group: "club",
        number: 13,
        symbol: "K",
      },
    };

    // see: https://on.cypress.io/mounting-vue
    cy.mount(PokeCard, {
      props: props,
    });
    cy.get("[data-cy=symbol]").should("have.text", "K");
  });
});
