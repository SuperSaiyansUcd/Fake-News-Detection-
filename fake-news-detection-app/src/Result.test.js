import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom'; 
import Result from './Result';
import '@testing-library/jest-dom'

const titleText =  'Man found dead';
const contentText = 'Man dead by parnell street';
global.fetch = jest.fn(() =>
  Promise.resolve({
      json: () => Promise.resolve({ title: titleText, content: contentText }),
  })
)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Result component', () => {
  const mockLocation = {
    pathname: '/Result',
    state: {
      title: titleText,
      content: contentText,
    },
  };

  beforeEach(() => {
    fetch.mockClear();
    window.history.pushState(mockLocation.state, '', mockLocation.pathname);
    useLocation.mockReturnValue(mockLocation);
  });

  it('displays correct title and content', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ title: titleText, content: contentText }),
      })
    );

    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>,
    );
        await waitFor(() => {
      expect(screen.getByText(titleText)).toBeInTheDocument();
      expect(screen.getByText(contentText)).toBeInTheDocument();

      expect(fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:5000/api/submit", 
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            title: 'Man found dead', 
            content: 'Man dead by parnell street'
          }),
        })
      );
    });
  });
});
