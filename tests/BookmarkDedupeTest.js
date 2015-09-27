'use strict';

var path = require( 'path' );
var fs = require( 'fs' );
var assert = require( 'assert' );
var BookmarkDedupe = require( '../index.js' );

describe( 'BookmarkDedupe', function() {

	var expectedParse, b, testOut = '__test.deduped.html';

	after( function() {

		fs.unlinkSync( testOut );
	} );

	beforeEach( function() {

		b = new BookmarkDedupe( path.join( __dirname, 'resources/test.html' ), testOut );

		expectedParse = {
			'cheeriojs/cheerio': {
				url: 'https://github.com/cheeriojs/cheerio',
				add_date: 1443286719,
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVQ4jY1TMWsUQRT+5r3d3Cbe7t3u3hEDdoJgIVieGo1YBixsBIsUtvkHNpaCnaJFUMEihSlEbGxFE8XCRrDWIAqJyd3t3JGcuduZeRa5DUtAk6968/i+733zhlE4hHq9foWZbwG4pkRmAECU2gDw1lr7Qmu9WuarUs2NOH7Onrdw2LQMa8xyO8tuA7BlA07TdM0juvA/cQHj3KdOp3MZgGUAaMTxssc8nxuzOsrzm90s2yDmU6TUtoh0BKhut9t3Rnl+1/O8Mz7z7GSlcnqwt/cKURS1pptNmW42JUmSpfGQKoCp0tBqkTZJkqWCH0VRiyaYFw/uZ+2zcbkDYFAy2AEgAOCcWymaE8yLBOZZALDOjQB0jrGCdevccH9zPEsYPxWU2uz1eutHqbXWP6DUbwCAyAwV0QDUANAxEhBE6uNaSICfAMBK1dI0vX6UOo7jeSaKsD/5F5FSa04EW+22dca8jMPw0r/ESRheZKKnxVlE3lFuzOPRMIeIWN3v93u7ux+IaBBFUasgBkFwlYi2/SD4yEQnSwaPSGv9xa/4T6abzYm6789Vq9WFMAw/K6W2CmKlUtmJoqhRTmNFHmRZ9vXgLyRx/J6IzlnnzotIX2utS/ywkaabTDQFANaY1+0su7G/0TG6WTYHpVaY6LvH/A3ATMngRCE2xtwrxADA5ViDweDNZBDsQamG7/vLw+HwDwDUajVfiZx1wMNOt3u/rPkLJe7aBdfH1TYAAAAASUVORK5CYII='
			},
			'cheeriojs/cheerio (1)': {
				url: 'https://github.com/cheeriojs/cheerio',
				add_date: 1443357605,
				icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVQ4jY1TMWsUQRT+5r3d3Cbe7t3u3hEDdoJgIVieGo1YBixsBIsUtvkHNpaCnaJFUMEihSlEbGxFE8XCRrDWIAqJyd3t3JGcuduZeRa5DUtAk6968/i+733zhlE4hHq9foWZbwG4pkRmAECU2gDw1lr7Qmu9WuarUs2NOH7Onrdw2LQMa8xyO8tuA7BlA07TdM0juvA/cQHj3KdOp3MZgGUAaMTxssc8nxuzOsrzm90s2yDmU6TUtoh0BKhut9t3Rnl+1/O8Mz7z7GSlcnqwt/cKURS1pptNmW42JUmSpfGQKoCp0tBqkTZJkqWCH0VRiyaYFw/uZ+2zcbkDYFAy2AEgAOCcWymaE8yLBOZZALDOjQB0jrGCdevccH9zPEsYPxWU2uz1eutHqbXWP6DUbwCAyAwV0QDUANAxEhBE6uNaSICfAMBK1dI0vX6UOo7jeSaKsD/5F5FSa04EW+22dca8jMPw0r/ESRheZKKnxVlE3lFuzOPRMIeIWN3v93u7ux+IaBBFUasgBkFwlYi2/SD4yEQnSwaPSGv9xa/4T6abzYm6789Vq9WFMAw/K6W2CmKlUtmJoqhRTmNFHmRZ9vXgLyRx/J6IzlnnzotIX2utS/ywkaabTDQFANaY1+0su7G/0TG6WTYHpVaY6LvH/A3ATMngRCE2xtwrxADA5ViDweDNZBDsQamG7/vLw+HwDwDUajVfiZx1wMNOt3u/rPkLJe7aBdfH1TYAAAAASUVORK5CYII='
			},
			'Bookmarks Bar': {
				contents: {
					'a': {
						contents: {
							'bahamas10/node-netscape-bookmarks': {
								url: 'https://github.com/bahamas10/node-netscape-bookmarks',
								add_date: 1443286706,
								icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVQ4jY1TMWsUQRT+5r3d3Cbe7t3u3hEDdoJgIVieGo1YBixsBIsUtvkHNpaCnaJFUMEihSlEbGxFE8XCRrDWIAqJyd3t3JGcuduZeRa5DUtAk6968/i+733zhlE4hHq9foWZbwG4pkRmAECU2gDw1lr7Qmu9WuarUs2NOH7Onrdw2LQMa8xyO8tuA7BlA07TdM0juvA/cQHj3KdOp3MZgGUAaMTxssc8nxuzOsrzm90s2yDmU6TUtoh0BKhut9t3Rnl+1/O8Mz7z7GSlcnqwt/cKURS1pptNmW42JUmSpfGQKoCp0tBqkTZJkqWCH0VRiyaYFw/uZ+2zcbkDYFAy2AEgAOCcWymaE8yLBOZZALDOjQB0jrGCdevccH9zPEsYPxWU2uz1eutHqbXWP6DUbwCAyAwV0QDUANAxEhBE6uNaSICfAMBK1dI0vX6UOo7jeSaKsD/5F5FSa04EW+22dca8jMPw0r/ESRheZKKnxVlE3lFuzOPRMIeIWN3v93u7ux+IaBBFUasgBkFwlYi2/SD4yEQnSwaPSGv9xa/4T6abzYm6789Vq9WFMAw/K6W2CmKlUtmJoqhRTmNFHmRZ9vXgLyRx/J6IzlnnzotIX2utS/ywkaabTDQFANaY1+0su7G/0TG6WTYHpVaY6LvH/A3ATMngRCE2xtwrxADA5ViDweDNZBDsQamG7/vLw+HwDwDUajVfiZx1wMNOt3u/rPkLJe7aBdfH1TYAAAAASUVORK5CYII='
							},
							'bahamas10/node-netscape-bookmarks (1)': {
								url: 'https://github.com/bahamas10/node-netscape-bookmarks',
								add_date: 1443357570,
								icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVQ4jY1TMWsUQRT+5r3d3Cbe7t3u3hEDdoJgIVieGo1YBixsBIsUtvkHNpaCnaJFUMEihSlEbGxFE8XCRrDWIAqJyd3t3JGcuduZeRa5DUtAk6968/i+733zhlE4hHq9foWZbwG4pkRmAECU2gDw1lr7Qmu9WuarUs2NOH7Onrdw2LQMa8xyO8tuA7BlA07TdM0juvA/cQHj3KdOp3MZgGUAaMTxssc8nxuzOsrzm90s2yDmU6TUtoh0BKhut9t3Rnl+1/O8Mz7z7GSlcnqwt/cKURS1pptNmW42JUmSpfGQKoCp0tBqkTZJkqWCH0VRiyaYFw/uZ+2zcbkDYFAy2AEgAOCcWymaE8yLBOZZALDOjQB0jrGCdevccH9zPEsYPxWU2uz1eutHqbXWP6DUbwCAyAwV0QDUANAxEhBE6uNaSICfAMBK1dI0vX6UOo7jeSaKsD/5F5FSa04EW+22dca8jMPw0r/ESRheZKKnxVlE3lFuzOPRMIeIWN3v93u7ux+IaBBFUasgBkFwlYi2/SD4yEQnSwaPSGv9xa/4T6abzYm6789Vq9WFMAw/K6W2CmKlUtmJoqhRTmNFHmRZ9vXgLyRx/J6IzlnnzotIX2utS/ywkaabTDQFANaY1+0su7G/0TG6WTYHpVaY6LvH/A3ATMngRCE2xtwrxADA5ViDweDNZBDsQamG7/vLw+HwDwDUajVfiZx1wMNOt3u/rPkLJe7aBdfH1TYAAAAASUVORK5CYII='
							},
							'b': {
								contents: {
									'bahamas10/node-netscape-bookmarks': {
										url: 'https://github.com/bahamas10/node-netscape-bookmarks',
										add_date: 1443357649,
										icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVQ4jY1TMWsUQRT+5r3d3Cbe7t3u3hEDdoJgIVieGo1YBixsBIsUtvkHNpaCnaJFUMEihSlEbGxFE8XCRrDWIAqJyd3t3JGcuduZeRa5DUtAk6968/i+733zhlE4hHq9foWZbwG4pkRmAECU2gDw1lr7Qmu9WuarUs2NOH7Onrdw2LQMa8xyO8tuA7BlA07TdM0juvA/cQHj3KdOp3MZgGUAaMTxssc8nxuzOsrzm90s2yDmU6TUtoh0BKhut9t3Rnl+1/O8Mz7z7GSlcnqwt/cKURS1pptNmW42JUmSpfGQKoCp0tBqkTZJkqWCH0VRiyaYFw/uZ+2zcbkDYFAy2AEgAOCcWymaE8yLBOZZALDOjQB0jrGCdevccH9zPEsYPxWU2uz1eutHqbXWP6DUbwCAyAwV0QDUANAxEhBE6uNaSICfAMBK1dI0vX6UOo7jeSaKsD/5F5FSa04EW+22dca8jMPw0r/ESRheZKKnxVlE3lFuzOPRMIeIWN3v93u7ux+IaBBFUasgBkFwlYi2/SD4yEQnSwaPSGv9xa/4T6abzYm6789Vq9WFMAw/K6W2CmKlUtmJoqhRTmNFHmRZ9vXgLyRx/J6IzlnnzotIX2utS/ywkaabTDQFANaY1+0su7G/0TG6WTYHpVaY6LvH/A3ATMngRCE2xtwrxADA5ViDweDNZBDsQamG7/vLw+HwDwDUajVfiZx1wMNOt3u/rPkLJe7aBdfH1TYAAAAASUVORK5CYII='
									},
									'c': {
										contents: {
											'cheeriojs/cheerio': {
												url: 'https://github.com/cheeriojs/cheerio',
												add_date: 1443357598,
												icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJElEQVQ4jY1TMWsUQRT+5r3d3Cbe7t3u3hEDdoJgIVieGo1YBixsBIsUtvkHNpaCnaJFUMEihSlEbGxFE8XCRrDWIAqJyd3t3JGcuduZeRa5DUtAk6968/i+733zhlE4hHq9foWZbwG4pkRmAECU2gDw1lr7Qmu9WuarUs2NOH7Onrdw2LQMa8xyO8tuA7BlA07TdM0juvA/cQHj3KdOp3MZgGUAaMTxssc8nxuzOsrzm90s2yDmU6TUtoh0BKhut9t3Rnl+1/O8Mz7z7GSlcnqwt/cKURS1pptNmW42JUmSpfGQKoCp0tBqkTZJkqWCH0VRiyaYFw/uZ+2zcbkDYFAy2AEgAOCcWymaE8yLBOZZALDOjQB0jrGCdevccH9zPEsYPxWU2uz1eutHqbXWP6DUbwCAyAwV0QDUANAxEhBE6uNaSICfAMBK1dI0vX6UOo7jeSaKsD/5F5FSa04EW+22dca8jMPw0r/ESRheZKKnxVlE3lFuzOPRMIeIWN3v93u7ux+IaBBFUasgBkFwlYi2/SD4yEQnSwaPSGv9xa/4T6abzYm6789Vq9WFMAw/K6W2CmKlUtmJoqhRTmNFHmRZ9vXgLyRx/J6IzlnnzotIX2utS/ywkaabTDQFANaY1+0su7G/0TG6WTYHpVaY6LvH/A3ATMngRCE2xtwrxADA5ViDweDNZBDsQamG7/vLw+HwDwDUajVfiZx1wMNOt3u/rPkLJe7aBdfH1TYAAAAASUVORK5CYII='
											},
										}
									},
									'd': {
										contents: {}
									}
								}
							}
						}
					}
				}
			},
			'e': {
				contents: {}
			}
		};
	} );

	it( 'parses bookmark export', function() {

		assert.deepEqual( expectedParse, b.parse() );
	} );

	it( 'deduplicates correctly', function() {

		delete expectedParse[ 'Bookmarks Bar' ].contents.a.contents.b.contents[ 'bahamas10/node-netscape-bookmarks' ];
		delete expectedParse[ 'Bookmarks Bar' ].contents.a.contents[ 'bahamas10/node-netscape-bookmarks (1)' ];
		delete expectedParse[ 'cheeriojs/cheerio' ];
		delete expectedParse[ 'cheeriojs/cheerio (1)' ];

		assert.deepEqual( expectedParse, b.dedupe() );
	} );

	it( 'deduplicates and saves to file correctly', function() {

		b.save( b.dedupe() );

		assert.equal( fs.readFileSync( path.join( __dirname, 'resources/test.html.deduped.html' ), {
			encoding: 'utf-8'
		} ), fs.readFileSync( testOut, {
			encoding: 'utf-8'
		} ) );
	} );
} );