import React from 'react'
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import {mount} from 'cypress-react-unit-test'
import {Toggler} from './Toggler'

describe('Toggler', () => {
  it('changes its mind', () => {
    mount(<Toggler />)
    cy.contains('Click to activate').click()
    cy.contains('Active!').click()
    cy.contains('Click to activate')
      .should('be.visible')
  })

  it('creates machine in the test', () => {
    // we can create machine whenever we want
    const toggleMachine = Machine({
      id: 'toggle',
      initial: 'inactive',
      states: {
        inactive: {
          on: { TOGGLE: 'active' }
        },
        active: {
          on: { TOGGLE: 'inactive' }
        }
      }
    });

    // 🐞 BUT we cannot call hook from the test -
    // they only make sense inside a function component
    // const [state, send] = useMachine(toggleMachine);

    // ✅ so instead we create a test component around Toggler
    const TestToggler = () => {
      // just a demo, not really used in this spec
      const [state, send] = useMachine(toggleMachine);
      return (<Toggler />)
    }

    mount(<TestToggler />)
    cy.contains('Click to activate').click()
    cy.contains('Active!').click()
    cy.contains('Click to activate')
      .should('be.visible')
  })
})
