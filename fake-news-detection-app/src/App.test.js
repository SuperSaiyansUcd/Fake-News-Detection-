// import react-testing methods
import {render, screen} from '@testing-library/react'
// userEvent library simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.
import userEvent from '@testing-library/user-event'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// Mocking the components
jest.mock('./Home', () => () => <div>Home</div>);
jest.mock('./Result', () => () => <div>Result</div>);
jest.mock('./Credits', () => () => <div>Credits</div>);

test('renders the home route by default', async () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
});

// test('navigates to the result route', async () => {
//     render(<MemoryRouter initialEntries={['/result']}><App /></MemoryRouter>);
//     expect(screen.getByText('Result')).toBeInTheDocument();
// });


// test('navigates to the credits route', async () => {
//     render(<MemoryRouter initialEntries={['/credits']}><App /></MemoryRouter>);
//     expect(screen.getByText('Credits')).toBeInTheDocument();
// });


