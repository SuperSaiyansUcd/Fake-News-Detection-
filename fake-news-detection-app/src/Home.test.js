import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom';

// Mock axios promise to subdue error warnings 
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));


test('loads and displays', async () => {
  // setup
  render(<BrowserRouter>
            <Home url="/home" />
        </BrowserRouter>)
        
  await userEvent.click(screen.getByText('Credits'))
  await screen.findByRole('heading')

  const fakeNewsDetectorHeading = screen.getByText('Fake News Detector');
  expect(fakeNewsDetectorHeading).toBeInTheDocument();

  // get
  const lstmButton = screen.getByRole('button', {
    name: 'Submit',
    title: 'Long short-term memory Machine Learning Model',
  });

  // assert
  expect(lstmButton).toBeInTheDocument();
})
