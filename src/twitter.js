'use strict';

const Twit = require('twit');

const config = require('../config');

const defaultParams = {
	screen_name: config.screen_name,
	count: 5
};
const twitterClient = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});

let lastRequestTimestamp = undefined;
let userData = {};
let timeline = [];
let following = [];
let messageArray = [];

const getTwitterData = (path, params = defaultParams) => {
	return twitterClient.get(path, params);
};

const getUserData = () => {
	return new Promise((resolve, reject) => {
		getTwitterData('users/show')
			.then(result => {
				userData = result.data;
				resolve();
			})
			.catch(error => {
				reject(error);
			})
	});
};

const getTimeline = () => {
	return new Promise((resolve, reject) => {
		getTwitterData('statuses/home_timeline')
			.then(result => {
				timeline = result.data;
				resolve();
			})
			.catch(error => {
				reject(error);
			})
	});
};

const getFriends = () => {
	return new Promise((resolve, reject) => {
		getTwitterData('friends/list')
			.then(result => {
				following = result.data.users;
				resolve();
			})
			.catch(error => {
				reject(error);
			})
	});
};

const sortMessages = messages => {
	const msgArray = [];
	let receivedIndex = 0;
	let sentIndex = 0;

	while (receivedIndex < messages.received.length && sentIndex < messages.sent.length) {
		const receivedMsg = messages.received[receivedIndex]
		const sentMsg = messages.sent[sentIndex];

		const receivedDate = new Date(receivedMsg.created_at)
		const sentDate = new Date(sentMsg.created_at);

		if (receivedDate < sentDate) {
			msgArray.push(sentMsg);
			sentIndex++;
		} else {
			msgArray.push(receivedMsg);
			receivedIndex++;
		}
	}

	if (receivedIndex < messages.received.length) {
		for (let i = receivedIndex; i < messages.received.length; i++) {
			msgArray.push(messages.received[i]);
		}
	} else if (sentIndex < messages.sent.length) {
		for (let i = sentIndex; i < messages.sent.length; i++) {
			msgArray.push(messages.sent[i]);
		}
	}

	return msgArray;
};

const getMessages = () => {
	return new Promise((resolve, reject) => {
		let messages = {
			received: [],
			sent: []
		}
		getTwitterData('direct_messages')
			.then(result => {
				messages.received = result.data;
				return getTwitterData('direct_messages/sent');
			})
			.then(result => {
				messages.sent = result.data;
				messageArray = sortMessages(messages).reverse();
				resolve();
			})
			.catch(error => {
				reject(error);
			})
	});
};

const getData = callback => {
	// If timestamp difference is less than one minute, return stored data
	// Prevent being rate limited - 15req / 15 minutes
	const latestTimestamp = new Date();
	if (!lastRequestTimestamp || latestTimestamp - lastRequestTimestamp > 1000 * 60) {
		getUserData()
			.then(getTimeline)
			.then(getFriends)
			.then(getMessages)
			.then(() => {
				lastRequestTimestamp = latestTimestamp;
				return callback(null, {
					userData,
					timeline,
					following,
					messages: messageArray
				});
			})
			.catch(error => {
				console.error(error);
				return callback(error, null);
			})
	} else {
		return callback(null, {
			userData,
			timeline,
			following,
			messages: messageArray
		});
	}
};

const postTweet = statusText => {
	twitterClient.post('statuses/update', {status: statusText})
		.then(result => {

		})
		.catch(error => {

		})
};

module.exports = {
	getData
}
