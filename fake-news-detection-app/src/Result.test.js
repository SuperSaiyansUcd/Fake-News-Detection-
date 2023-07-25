// import react-testing methods
import {render, screen} from '@testing-library/react'
// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
import userEvent from '@testing-library/user-event'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
import Result from './Result'
import { BrowserRouter } from 'react-router-dom';

test('loads and displays greeting', async () => {
    // render(<BrowserRouter><Result /></BrowserRouter>)
  
    // fireEvent.click(screen.getByText('Result'))
  
    // await screen.findByRole('heading')
  
    // expect(screen.getByRole('heading')).toHaveTextContent('Result')
    // expect(screen.getByRole('button')).toBeDisabled()
})

