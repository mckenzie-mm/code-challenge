import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
//
import Home from './Home';
import { SocketProvider } from '../../context/SocketContext';
import { MyNameContext } from '../../context/MyNameContext';
import { ListContext } from '../../context/ListContext';

// Mock the react-router-dom module
const mockedUseNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});


describe('Home component', () => {
  it('displays the Home page and displays it correctly', () => {
    const mockMyNameValue = {
      myName: "Mark",
      resetMyName:  vi.fn(),
    };
    const mockMyListValue = {
      items: [{
        id: "_fdghaty_ffccc",
        name: "henry elephant",
        backgroundColor: "#444",
      }],
      resetItems:  vi.fn(),
    };

    render(
      <SocketProvider>
        <ListContext.Provider value={mockMyListValue}>
          <MyNameContext.Provider value={mockMyNameValue} >
            <Home />
          </MyNameContext.Provider>           
        </ListContext.Provider>
      </SocketProvider>

    );
    // Assert the initial state (default is 'light')
    expect(screen.getByText(/ChatApp/i)).toBeInTheDocument();
    expect(screen.getByText(/Mark/i)).toBeInTheDocument();
    expect(screen.getByText(/_fdghaty_ffccc/i)).toBeInTheDocument();
  });
});



