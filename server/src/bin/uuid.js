const uuid = require('uuid');

const makeUUID = () => {
	const id = uuid.v4();
	return () => id;
}
module.exports = { makeUUID };