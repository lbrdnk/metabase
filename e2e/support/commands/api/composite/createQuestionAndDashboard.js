Cypress.Commands.add(
  "createQuestionAndDashboard",
  ({ questionDetails, dashboardDetails, cardDetails } = {}) => {
    cy.createQuestion(questionDetails).then(({ body: { id: questionId } }) => {
      cy.createDashboard(dashboardDetails).then(
        ({ body: { id: dashboardId } }) => {
          cy.request("PUT", `/api/dashboard/${dashboardId}/cards`, {
            cards: [
              {
                id: -1,
                card_id: questionId,
                // Add sane defaults for the dashboard card size
                row: 0,
                col: 0,
                size_x: 8,
                size_y: 6,
                ...cardDetails,
              },
            ],
          }).then(response => ({
            ...response,
            body: response.body[0],
          }));
        },
      );
    });
  },
);
