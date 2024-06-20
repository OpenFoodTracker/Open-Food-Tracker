// src/__tests__/NavbarService.test.js
import { renderHook, act } from '@testing-library/react-hooks';
import { useLocation } from 'react-router-dom';
import { useNavbar } from '../components/Navbar/NavbarService';

// Mock the useLocation hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('useNavbar', () => {
  it('should initialize with the current location pathname', () => {
    useLocation.mockReturnValue({ pathname: '/home' });

    const { result } = renderHook(() => useNavbar());

    expect(result.current.value).toBe('/home');
  });

  it('should update the value based on location changes', () => {
    let location = { pathname: '/home' };
    useLocation.mockReturnValue(location);

    const { result, rerender } = renderHook(() => useNavbar());

    expect(result.current.value).toBe('/home');

    // Change location to /statistics
    location = { pathname: '/statistics' };
    useLocation.mockReturnValue(location);
    rerender();

    expect(result.current.value).toBe('/statistics');

    // Change location to /profile
    location = { pathname: '/profile' };
    useLocation.mockReturnValue(location);
    rerender();

    expect(result.current.value).toBe('/profile');
  });

  it('should handle value changes via handleChange function', () => {
    useLocation.mockReturnValue({ pathname: '/home' });

    const { result } = renderHook(() => useNavbar());

    act(() => {
      result.current.handleChange(null, '/statistics');
    });

    expect(result.current.value).toBe('/statistics');

    act(() => {
      result.current.handleChange(null, '/profile');
    });

    expect(result.current.value).toBe('/profile');
  });

  it('should default to /home if location is unknown', () => {
    useLocation.mockReturnValue({ pathname: '/unknown' });

    const { result } = renderHook(() => useNavbar());

    expect(result.current.value).toBe('/home');
  });
});
