import React from 'react'
import { useMachine } from '@xstate/react';

export const TogglerUI = ({ toggleMachine, offMessage, onMessage }) => {
  const [state, send] = useMachine(toggleMachine);

  return (
    <button onClick={() => send('TOGGLE')}>
      {state.value === 'inactive'
        ? offMessage
        : onMessage}
    </button>
  );
};
