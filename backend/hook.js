const gith = require('gith').create( 9001 );
const execFile = require('child_process').execFile;

gith({ repo: 'littlebigbot/comical' })
  .on( 'all', function( payload ) {
    if( payload.branch === 'default' ) {
      execFile('./hook.sh', function(error, stdout, stderr) {
        console.log( 'exec complete' );
      });
    }
  });
