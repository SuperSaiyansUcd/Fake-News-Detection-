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
    test('loads and displays greeting', async () => {
    // setup
    render(<BrowserRouter>
        <Result url="/result" />
    </BrowserRouter>)

    await screen.findByRole('heading')

    // get
    const feedbackButton = screen.getByRole('button', {
        name: 'Give Feedback',
        title: 'Give Feedback Button',
    });
    const homeButton = screen.getByRole('button', {
        name : 'Return Home',
        title: 'Return Home Button'
    });

    // assert
    expect(feedbackButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();

})

