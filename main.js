/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function() {
  var width = 300;
  chrome.app.window.create('index.html', {
    id: "vera",
    outerBounds: {
      width: width,
      height: screen.availHeight-200,
      left: Math.round((screen.availWidth-width)),
      top: Math.round(100)
    }
  });
});
