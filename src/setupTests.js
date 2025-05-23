// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder } from 'node:util';


// fixes "ReferenceError: TextEncoder is not defined"
// https://github.com/mswjs/msw/issues/1796#issuecomment-1782351156
global.TextEncoder = TextEncoder
