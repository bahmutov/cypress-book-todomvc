# cypress-book-todomvc

### Initial screen

This application starts with an input field.

![Initial screen](images/initial.png)

<details style="display:none">
<summary>Initial view</summary>
<!-- fiddle Initial -->

```js
cy.visit('/')
cy.get('input').should('be.visible')
cy.screenshot('initial')
```
<!-- fiddle-end -->
</details>

### Main feature

User can enter several todos, and they are added to the list

![Added three todos](images/todos.png)

<details style="display:none">
<!-- fiddle Adding todos -->

```js
cy.visit('/')
cy.get('.new-todo')
  .type('write in Markdown{enter}')
  .type('code in JavaScript{enter}')
  .type('test in Cypress{enter}')
cy.get('.todo-list li').should('have.length', 3)
cy.screenshot('todos')
```
<!-- fiddle-end -->
</details>

### Completing tasks

Once there are several todo items, the user can mark some items "done" and then clear them using a button.

![Completed items](images/completed-todos.png)

The "Clear completed" button is at the button and becomes visible only if there are completed items.

![Footer](images/footer.png)

Hover over the button and click on it

![Clear completed button](images/clear-completed.png)

Only a single active todo remains

![Single remaining todo](images/remaining-todo.png)

<details style="display:none">
<!-- fiddle Completing tasks -->

```js
cy.visit('/')
cy.get('.new-todo')
  .type('write in Markdown{enter}')
  .type('code in JavaScript{enter}')
  .type('test in Cypress{enter}')
cy.get('.todo-list li').should('have.length', 3)

cy.contains('.view', 'code in JavaScript').find('.toggle').click()
cy.contains('.view', 'test in Cypress').find('.toggle').click()
cy.get('.todo-list li.completed').should('have.length', 2)
cy.screenshot('completed-todos')

cy.get('footer.footer').screenshot('footer')
cy.contains('Clear completed').should('be.visible')
  .then($el => {
    $el.css({
      textDecoration: 'underline',
      border: '1px solid pink',
      borderRadius: '2px'
    })
  })
cy.get('footer.footer').screenshot('clear-completed').click()

cy.contains('Clear completed').should('be.visible')
  .then($el => {
    $el.css({
      textDecoration: 'none',
      border: 'none',
      borderRadius: 'none'
    })
  })
cy.get('.todo-list li').should('have.length', 1)
cy.screenshot('remaining-todo')
```
<!-- fiddle-end -->
</details>

## Explanation

This README file contains tests Cypress understands and runs by using [cypress-fiddle](https://github.com/cypress-io/cypress-fiddle) file preprocessor. Start the application and Cypress using

```
npm install
npm run dev
```

And click on the `README.md` file

![README spec](images/readme.png)

The tests should run. These tests are above in this file, hiding inside an invisible HTML element and a comment:

```
<details style="display:none">
<!-- fiddle Initial -->
... Cypress test ...
<!-- fiddle-end -->
</details>
```

This is similar to what I have done in [Self-testing JAM pages](https://www.cypress.io/blog/2019/11/13/self-testing-jam-pages/)

The test usually includes several [.screenshot](https://on.cypress.io/screenshot) commands, these images are moved into [images](images) folder using code in the [cypress/plugins/index.js](cypress/plugins/index.js) file.
