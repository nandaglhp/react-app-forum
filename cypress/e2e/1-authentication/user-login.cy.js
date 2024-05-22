describe('User login', () => {
    beforeEach(() => {
        cy.visit('/auth/signin');
    });

    it('should open the login page and show the login form', () => {
        cy.get('h1').should('contain', 'Sign In');

        cy.get('form').within(() => {
            cy.get('input[name="email"]').should('be.visible');
            cy.get('input[name="password"]').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');
        });
    });

    it('should fill in the form and submit it', () => {
        cy.get('form').within(() => {
            cy.get('input[name="email"]').type('johndoe@example.com');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
        });
    });

    it('should show field specific error messages', () => {
        cy.get('form').within(() => {
            cy.get('button[type="submit"]').click();
        });

        cy.get('form').within(() => {
            cy.get('.label-text-alt').should('contain', 'Email is required');
            cy.get('.label-text-alt').should('contain', 'Password is required');
        });
    });

    it('should render a toast if the email is invalid', () => {
        cy.get('form').within(() => {
            cy.get('input[name="email"]').type('invalid');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
        });

        cy.contains('"email" must be a valid email');
    });

    it('should render a toast if the account is not registered', () => {
        cy.get('form').within(() => {
            cy.get('input[name="email"]').type('not-registered@example.com');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
        });

        cy.contains('email or password is wrong');
    });

    it('should render a toast if the user successfully logged in', () => {
        cy.get('form').within(() => {
            cy.get('input[name="email"]').type('johndoe@example.com');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
        });

        cy.contains('Sign in successful');
    });

    it('should redirect to the home page after successful login', () => {
        cy.get('form').within(() => {
            cy.get('input[name="email"]').type('johndoe@example.com');
            cy.get('input[name="password"]').type('password');
            cy.get('button[type="submit"]').click();
        });

        cy.url().should('match', /\/$/);
        cy.get('h1').should('contain', 'All Threads');
    });

    it('should redirected to signin page if the user is not logged in', () => {
        cy.visit('/');
        cy.url().should('match', /\/auth\/signin/);
    });
});
