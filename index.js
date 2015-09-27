'use strict';

var fs = require( 'fs' );
var cheerio = require( 'cheerio' );
var netscapeBookmarks = require( 'netscape-bookmarks' );

var BookmarkDedupe = function( inFile, outFile ) {

	this.inFile = inFile;
	this.outFile = outFile;
};

BookmarkDedupe.prototype = {

	_dump: function( element, indent ) {

		indent = indent || '';

		var t = this;

		this.$( element ).children().each( function() {

			var name = t.$( this )[ 0 ].name;

			console.log( indent, name, t.$( this ).children().length );

			if ( t.$( this ).children().length ) {

				t._dump( t.$( this ), indent + '  ' );
			}


		} );
	},

	_parseWalk: function( out, folderElement, folderPath ) {

		var t = this;

		folderElement.children().each( function( index, element ) {

			var wrapped = t.$( element );

			var tag = element.name;

			switch ( tag ) {

				case 'p':

					t._parseWalk( out, wrapped.children().first(), folderPath );
					break;

				case 'dl':

					var subfolderName = wrapped.prev().text();

					out[ subfolderName ] = {
						contents: {}
					};

					t._parseWalk( out[ subfolderName ].contents, wrapped, folderPath.concat( [ subfolderName ] ) );
					break;

				case 'dt':

					t._parseWalk( out, wrapped, folderPath );
					break;

				case 'a':

					var name = wrapped.text();

					var url = wrapped.attr( 'href' );

					var i = 1;

					var key = name;

					while ( out[ key ] ) {

						key = name + ' (' + i++ + ')';

						// console.warn( 'Multiple bookmarks with the name', name, 'at', folderPath.join( '->' ) );
						// console.warn( 'Bookmark with url', url, 'was overwritten' );
					}

					out[ key ] = {
						url: url,
						add_date: +wrapped.attr( 'add_date' ),
						icon: wrapped.attr( 'icon' )
					};
					break;
			}

		} );
		return out;
	},

	parse: function() {

		var inContents = fs.readFileSync( this.inFile );
		this.$ = cheerio.load( inContents, {
			decodeEntities: false
		} );

		var result = this._parseWalk( {}, this.$( 'dl' ).first(), [ '(root folder)' ] );

		return result;
	},

	_dedupeWalk: function( obj, seen ) {

		for ( var name in obj ) {

			var item = obj[ name ];

			if ( item.contents ) {

				this._dedupeWalk( item.contents, seen );
			} else {

				if ( seen[ item.url ] ) {

					delete obj[ name ];

					seen[ item.url ] += 1;
				} else {

					seen[ item.url ] = 1;
				}
			}
		}
	},

	dedupe: function() {

		var parsed = this.parse();
		var seen = {};

		this._dedupeWalk( parsed, seen );

		var totalDuplicatesRemoved = 0;

		for ( var href in seen ) {

			var s = seen[ href ];

			if ( s > 1 ) {

				console.log( href, 'occurred', s, 'times, duplicates were removed.' );

				totalDuplicatesRemoved += s - 1;
			}
		}

		console.log( 'Deduplication summary:', totalDuplicatesRemoved, 'duplicates were removed.' );

		return parsed;
	}

};

module.exports = BookmarkDedupe;