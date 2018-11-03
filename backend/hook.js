// Listen on port 9001
var gith = require('gith').create( 9001 );
// Import execFile, to run our bash script
var execFile = require('child_process').execFile;

console.log('im here!')

gith({ repo: 'littlebigbot/comical' })
  .on( 'all', function( payload ) {
    console.log('on all')
    if( payload.branch === 'default' ) {
      console.log('default!')
      // Exec a shell script
      execFile('./hook.sh', function(error, stdout, stderr) {
        // Log success in some manner
        console.log( 'exec complete' );
      });
    }
  });
