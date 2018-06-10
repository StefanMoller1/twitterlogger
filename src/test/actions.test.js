const actions =  require('../actions/mainActions');

// RAW file data split on \n
const rawTweets = ["Alan> something.", "Ward> something."];
const rawUsers = ["Ward follows Alan", "Alan follows Martin"];

// Cleaned file data
const UserPrep = JSON.stringify({"Ward":["Ward","Alan"],"Alan":["Alan","Martin"]});
const TweetPrep = JSON.stringify([["Alan","something."],["Ward","something."]]);

test('Testing prepUser function', () => {
	expect(actions.prepUsers(rawUsers) === UserPrep).toBeTruthy();
});

test('Testing prepFeed function', () => {
	expect(actions.prepFeed(rawTweets) === TweetPrep).toBeTruthy();
});