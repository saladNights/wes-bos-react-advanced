import { mount } from 'enzyme';
import wait from 'waait';
import PleaseSignin from '../components/PleaseSignin';
import { CURRENT_USER_QUERY} from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../lib/testUtils';

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

describe('Component', () => {
	it('renders the sign in dialog to logged out users', async () => {
		const wrapper = mount(
			<MockedProvider mocks={notSigninMocks}>
				<PleaseSignin />
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		expect(wrapper.text()).toContain('Sign In to continue');
		expect(wrapper.find('Signin').exists()).toBe(true);
	});

	it('renders the child component when the user is signed in', async () => {
		const wrapper = mount(
			<MockedProvider mocks={signedinMocks}>
				<PleaseSignin>
					<p>Hey!</p>
				</PleaseSignin>
			</MockedProvider>
		);

		await wait();
		wrapper.update();

		expect(wrapper.find('p').text()).toContain('Hey!');
	});
});
