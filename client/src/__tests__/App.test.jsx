import { describe, expect, it } from 'vitest';
import { render, screen } from '@utils/testsFunctions/tests.jsx';

import App from '../App.jsx';

describe('Render App', () => {
  it('the body loaded', () => {
    render(<App />);
    //const bodyElement = screen.getByTestId('main-body-test');
    screen.debug();
    //expect(bodyElement).toBeInTheDocument();
  });
});
