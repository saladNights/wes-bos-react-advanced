import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import CartCount from '../components/CartCount';

describe('Component', () => {
	it('renders', () => {
		shallow(<CartCount count={10} />);
	});

	it('matches the snapshot', () => {
		const wrapper = shallow(<CartCount count={10} />);

		expect(toJSON(wrapper)).toMatchSnapshot();
	});

	it('updates via props', () => {
		const wrapper = shallow(<CartCount count={50} />);

		expect(toJSON(wrapper)).toMatchSnapshot();

		wrapper.setProps({ count: 15 });

		expect(toJSON(wrapper)).toMatchSnapshot();
	});
});


