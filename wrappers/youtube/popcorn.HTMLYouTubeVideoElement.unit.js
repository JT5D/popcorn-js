
var testData = {

  videoSrc: "http://www.youtube.com/watch/?v=nfGV32RNkhw",
  expectedDuration: 151,

  createMedia: function( id ) {
    return Popcorn.HTMLYouTubeVideoElement( id );
  },

  // We need to test YouTube's URL params, which not all
  // wrappers mimic.  Do it as a set of tests specific
  // to YouTube.
  playerSpecificAsyncTests: function() {

    asyncTest( "YouTube 01 - autoplay, loop params", 4, function() {

      var video = testData.createMedia( "#video" );

      video.addEventListener( "loadedmetadata", function onLoadedMetadata() {
        video.removeEventListener( "loadedmetadata", onLoadedMetadata, false );
        equal( video.autoplay, true, "autoplay is set via param" );
        equal( video.loop, true, "loop is set via param" );
        start();
      }, false);

      equal( video.autoplay, false, "autoplay is initially false" );
      equal( video.loop, false, "loop is initially false" );

      video.src = testData.videoSrc + "&autoplay=1&loop=1";

    });

  }
};

// YouTube tends to fail when the iframes live in the qunit-fixture
// div. Simulate the same effect by deleting all iframes under #video
// after each test ends.
var qunitStart = start;
start = function() {
  // Give the video time to finish loading so callbacks don't throw
  setTimeout( function() {
    qunitStart();
    var video = document.querySelector( "#video" );
    while( video.hasChildNodes() ) {
      video.removeChild( video.lastChild );
    }
  }, 500 );
};
