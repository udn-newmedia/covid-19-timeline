
function detectMob() {
  if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
  ){
      return true;
  }
  else {
      return false;
  }
}

function detectPlatform() {
  if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
  ){
      return 'Mob';
  }
  else {
      return 'PC';
  }
}

function iOSVersion(targetVersion) {
if (/iP(hone|od|ad)/.test(navigator.userAgent)) {
  // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if(parseInt(v[1], 10) >= targetVersion){
          return true
      }
      else{
          return false
      }
  // return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
  }
  else{
      return false
  }
}

function isFacebookApp(version) {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  // return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
  var findFBAV =ua.indexOf('FBAV/')
  // ***FB IOS before version 148 have top position problem
  var FBversion_now = Number(ua.slice(findFBAV + 5, findFBAV + 8))
  if(FBversion_now < version){
      return true;
  } else {
      return false;
  }
}

function isLineApp() {
  var ua = navigator.userAgent || navigator.vendor || window.opera;
  var line = ua.indexOf('Line/')

  if(line > 0){
      return true;
  } else {
      return false;
  }
}

function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  //   IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  //   IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  //   Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  //   Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

module.exports = {
  detectMob : detectMob,
  detectPlatform: detectPlatform,
  detectIE : detectIE,
  iOSVersion: iOSVersion,
  isFacebookApp: isFacebookApp,
  isLineApp: isLineApp
}