// import react-testing methods
import {render, screen} from '@testing-library/react'
// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
import userEvent from '@testing-library/user-event'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
import Credits from './Credits'
import { BrowserRouter } from 'react-router-dom';

test('loads and displays', async () => {
  // Render a React element into the DOM
  render(<BrowserRouter>
            <Credits url="/credits" />
        </BrowserRouter>)
        
  await userEvent.click(screen.getByText('Credits'))
  // wait before throwing an error if it cannot find an element
  await screen.findByRole('heading')

  // assert that the alert message is correct using
  // toHaveTextContent, a custom matcher from jest-dom.
  const headings = screen.getAllByRole('heading');
  const acknowledgementHeading = headings.find(heading => heading.textContent === 'Acknowledgements');
  expect(acknowledgementHeading).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Acknowledgements' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Return to home page' })).toBeInTheDocument();
})
