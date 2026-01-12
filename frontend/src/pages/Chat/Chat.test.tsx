
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
//
import Chat from './Chat';
import { SocketProvider } from '../../context/SocketContext';
import { MyNameContext } from '../../context/MyNameContext';

// Mock the react-router-dom module
const mockedUseNavigate = vi.fn();
const mockedUseLocation = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
    useLocation: () => mockedUseLocation,
  };
});


describe('Chat component', () => {
  it('displays the Home page and displays it correctly', async () => {

    const user = userEvent.setup();

    const mockMyNameValue = {
      myName: "Mark",
      resetMyName:  vi.fn(),
    };
    render(
      <SocketProvider>
        <MyNameContext.Provider value={mockMyNameValue} >
            <Chat />
          </MyNameContext.Provider>  
      </SocketProvider>

    );
    const divElement = screen.getByTestId('send-msg-div');
    const textarea = screen.getByTestId('msg-input') as HTMLInputElement;

    // Check initial value
    expect(textarea.value).toEqual('');

    // Simulate user typing
    await user.type(textarea, 'Hello');

    // Verify updated value
    expect(textarea.value).toEqual('Hello');
    
    await user.click(divElement);

    // Assert the initial state (default is 'light')
    expect(screen.getByText(/1 Messages/i)).toBeInTheDocument();
  });
});



