const expect = require('chai').expect;

describe('INITIALIZATION', () => {
	describe('Configuration', () => {
		let config;

		before(() => {
			try {
				config = require('../../config');
			} catch (error) {
			}
		});

		it('File exists', () => {
			expect(config).to.not.be.undefined;
			expect(config).to.be.a('object');
		});

		it('Should contain all necessary keys', () => {
			var expectedKeys = [
				'consumer_key',
				'consumer_secret',
				'access_token',
				'access_secret',
				'screen_name'
			];

			expect(config).to.contain.all.keys(expectedKeys);
			expect(config.consumer_key).to.have.length.above(0);
			expect(config.consumer_secret).to.have.length.above(0);
			expect(config.access_token).to.have.length.above(0);
			expect(config.access_secret).to.have.length.above(0);
			expect(config.screen_name).to.have.length.above(0);
		});

		describe('Config Keys', () => {
			it('Should have a consumer_key entered', () => {
				expect(config.consumer_key).to.have.length.above(0);
			});

			it('Should have a consumer_secret entered', () => {
				expect(config.consumer_secret).to.have.length.above(0);
			});

			it('Should have a access_token entered', () => {
				expect(config.access_token).to.have.length.above(0);
			});

			it('Should have a access_secret entered', () => {
				expect(config.access_secret).to.have.length.above(0);
			});

			it('Should have a screen_name entered', () => {
				expect(config.screen_name).to.have.length.above(0);
			});
		});
	});
});
