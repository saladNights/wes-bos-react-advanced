import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
	query {
    me {
      id
      email
      name
      permissions
    }
	}
`;

class User extends Component {
	render() {
		return (
			<Query query={CURRENT_USER_QUERY} {...this.props}>
				{payload => this.props.children(payload)}
			</Query>
		);
	}
}

User.propTypes = {
	children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };
