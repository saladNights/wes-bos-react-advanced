import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
	id: '234rf2t',
	title: 'An Item',
	price: 5000,
	description: 'This is an item description',
	image: 'dog.jpg',
	largeImage: 'dogXL.jpg',
};

describe('Component', () => {
	it('renders properly',  () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const PriceTag = wrapper.find('ForwardRef(PriceTag)');

		expect(PriceTag.children().text()).toBe('$50');
		expect(wrapper.find('ForwardRef(Title) Link a').text()).toBe(fakeItem.title);

		const img = wrapper.find('img');

		expect(img.props().src).toBe(fakeItem.image);
		expect(img.props().alt).toBe(fakeItem.title);
	});

	it('renders out the buttons', () => {
		const wrapper = shallow(<ItemComponent item={fakeItem} />);
		const buttonList = wrapper.find('.buttonList');

		expect(buttonList.children()).toHaveLength(3);
		expect(buttonList.find('Link')).toHaveLength(1);
		expect(buttonList.find('AddToCart')).toHaveLength(1);
		expect(buttonList.find('DeleteItem')).toHaveLength(1);
	});
});
