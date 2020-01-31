const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	}
});

const makeEmail = text => `
	<div
	class="email"
	style="
		border: 1px solid black;
		padding: 20px;
		line-height: 2;
		font-family: sans-serif;
		font-size: 20px;
	"
	>
		<h2>Hi!</h2>
		<p>${text}</p>
	</div>
`;

exports.transport = transport;
exports.makeEmail = makeEmail;
