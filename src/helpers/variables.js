let WPAPI = require( 'wpapi/superagent' );
let wp = new WPAPI({ endpoint: process.env.VUE_APP_API_ENDPOINT + 'wp-json' });

export { wp }