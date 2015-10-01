var tty = require('tty');

module.exports = function (ttyStream) {
  var refs = ttyStream ? ttyStream : [process.stdin, process.stdout];
  var width, height, size;

  if (refs.some(function (stream) {
    if (!stream.isTTY) return false;
    
    if (stream.columns && stream.rows) {
      width = stream.columns;
      height = stream.rows;  
    } else if (stream.getWindowSize) {
      size = stream.getWindowSize(1);
      width = size[0];
      height = size[1];
    } else if (tty.getWindowSize) {
      size = tty.getWindowSize();
      width = size[1];
      height = size[0];
    } else return false;

    return true;
  })) {
    return {width: width, height: height};
  } else {
    throw new Error('`tty-size` could not get the tty\'s size.');
  }
}