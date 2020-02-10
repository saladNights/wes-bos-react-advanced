import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import { fakeItem } from '../lib/testUtils';

const dogImage = 'https://dog.com/dog.jpg';

global.fetch = jest.fn().mockResolvedValue({
	json: () => ({
		secure_url: dogImage,
		eager: [{ secure_url: dogImage, }],
	}),
});

describe('Component', () => {
	it('renders and matches snapshot', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);

		const form = wrapper.find('form[data-test="form"]');
		expect(toJSON(form)).toMatchSnapshot();
	});

	it('uploads file when changed', async () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);

		const input = wrapper.find('input[type="file"]');

		input.simulate('change', { target: { files: ['fakedog.jpg'] } });

		await wait();
		const component = wrapper.find('CreateItem').instance();
		expect(component.state.image).toEqual(dogImage);
		expect(component.state.largeImage).toEqual(dogImage);
		expect(global.fetch).toHaveBeenCalled();
		global.fetch.mockReset();
	});

	it('handles state updating', () => {
		const wrapper = mount(
			<MockedProvider>
				<CreateItem />
			</MockedProvider>
		);

		wrapper.find('#title').simulate('change', { target: { value: 'test', name: 'title' } });
		wrapper.find('#price').simulate('change', { target: { value: 50000, name: 'price', type: 'number' } });
		wrapper.find('#description').simulate('change', { target: { value: 'nice item!', name: 'description' } });

		expect(wrapper.find('CreateItem').instance().state).toMatchObject({
			title: 'test',
			price: 50000,
			image: '',
			largeImage: '',
			description: 'nice item!',
		});
	});

	it('creates an item when the form is submitted', async () => {
		const item = fakeItem();
		const mocks = [
			{
				request: {
					query: CREATE_ITEM_MUTATION,
					variables: {
						title: item.title,
						price: item.price,
						image: '',
						largeImage: '',
						description: item.description,
					}
				},
				result: {
					data: {
						createItem: {
							...item,
							id: 'abc123',
							__typename: 'Item',
						}
					}
				}
			},
		];
		const wrapper = mount(
			<MockedProvider mocks={mocks}>
				<CreateItem />
			</MockedProvider>
		);

		wrapper.find('#title').simulate('change', { target: { value: item.title, name: 'title' } });
		wrapper.find('#price').simulate('change', { target: { value: item.price, name: 'price', type: 'number' } });
		wrapper.find('#description').simulate('change', { target: { value: item.description, name: 'description' } });

		Router.router = { push: jest.fn() };
		wrapper.find('form').simulate('submit');

		await wait(50);

		expect(Router.router.push).toHaveBeenCalled();
		expect(Router.router.push).toHaveBeenCalledWith({
			pathname: '/item',
			query: {
				id: 'abc123'
			}
		});
	});
});
