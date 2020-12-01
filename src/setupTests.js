import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

//Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output.
// must be paired with another test runner
Enzyme.configure({ adapter: new Adapter() })