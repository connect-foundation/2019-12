import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'intersection-observer';

const mockConsoleMethod = (realConsoleMethod: any) => {
  const ignoredMessages = ['test was not wrapped in act(...)'];

  return (message: any, ...args: any) => {
    const containsIgnoredMessage = ignoredMessages.some(ignoredMessage =>
      message.includes(ignoredMessage),
    );

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args);
    }
  };
};

console.warn = jest.fn(mockConsoleMethod(console.warn));
console.error = jest.fn(mockConsoleMethod(console.error));

configure({ adapter: new Adapter() });
