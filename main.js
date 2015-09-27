#!/usr/bin/env node

'use strict';

var ArgumentParser = require( 'argparse' ).ArgumentParser;
var path = require( 'path' );

var pkg = require( path.join( __dirname, 'package.json' ) );

var parser = new ArgumentParser( {
	addHelp: true,
	description: pkg.description,
	version: pkg.version
} );

parser.addArgument( [ 'file' ], {
	help: 'File to deduplicate bookmarks in.'
} );

parser.addArgument( [ '-o' ], {
	help: 'Output file, defaults to <filename>.deduped.html'
} );

var args = parser.parseArgs();

var BookmarkDedupe = require( './index.js' );

var b = new BookmarkDedupe( args.file, args.file + '.deduped.html' );

b.dedupe();