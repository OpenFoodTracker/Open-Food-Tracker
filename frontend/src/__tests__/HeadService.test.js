// src/__tests__/HeadConfig.test.js
import { renderHook } from '@testing-library/react-hooks';
import { useHeadConfig } from '../components/Head/HeadService';
import logo from '../images/logo.jpg';

describe('useHeadConfig', () => {
  it('should return the correct configuration', () => {
    const { result } = renderHook(() => useHeadConfig());

    expect(result.current).toEqual({
      logo: logo,
      title: 'OPEN FOOD TRACKER',
      homePath: '/home',
    });
  });
});
