import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY} from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const notSigninMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: null }},
	},
];
const signedinMocks = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: { data: { me: fakeUser() }},
	},
];
const signedinMocksWithCart = [
	{
		request: { query: CURRENT_USER_QUERY },
		result: {
			data: {
				...fakeUser(),
				cart: [
					fakeCartItem(),
					fakeCartItem(),
					fakeCartItem(),
				]
			}
		},
	},
];

describe('Component', () => {
	it('renders a minimal nav when signed out', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSigninMocks}>
				<Nav />
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		const nav = wrapper.find('ul[data-test="nav"]');

		expect(toJSON(nav)).toMatchSnapshot();
	});

	it('renders a full nav when signed in', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedinMocks}>
				<Nav />
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		const nav = wrapper.find('ul[data-test="nav"]');

		expect(nav.children().length).toBe(6);
		expect(nav.text()).toContain('Sign Out');
	});

	it('renders the amount of items in the cart', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedinMocksWithCart}>
				<Nav />
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		const nav = wrapper.find('ul[data-test="nav"]');
		const count = nav.find('div.count');

		expect(toJSON(count)).toMatchSnapshot();
	});
});
