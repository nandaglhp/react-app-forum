describe('User logout', () => {
    beforeEach(() => {
        cy.visit('/auth/signin');

        cy.get('form').within(() => {
            cy.get('input[name="email"]').type('johndoe@example.com');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
        });
    });

    it('should show the logout button and redirect to the signin page when pressing it', () => {
        cy.url().should('match', /\/$/);

        cy.get('button[type="button"]').contains('Sign out').click();

        cy.url().should('match', /\/auth\/signin/);
    });
});
