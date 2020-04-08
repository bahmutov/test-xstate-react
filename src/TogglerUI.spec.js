import React from 'react'
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import {mount} from 'cypress-react-unit-test'
import {TogglerUI} from './TogglerUI'

describe('TogglerUI', () => {
  it('shows the given messages', () => {
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

    const offMessage = 'OFF'
    const onMessage = 'ON'
    mount(<TogglerUI toggleMachine={toggleMachine}
      offMessage={offMessage} onMessage={onMessage} />)

    cy.contains(offMessage).click()
    cy.contains(onMessage).should('be.visible')
  })
})
