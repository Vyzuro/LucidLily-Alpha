function AutoTileConverter() { throw new Error('This is a static class'); }

AutoTileConverter._allSegments = [
    [13, 14, 17, 18],
    [2, 14, 17, 18],
    [13, 3, 17, 18],
    [2, 3, 17, 18],
    [13, 14, 17, 7],    
    [2, 14, 17, 7],        
    [13, 3, 13, 7],
    [2, 3, 17, 7],    

    [13, 14, 6, 18],
    [2, 14, 6, 18],
    [13, 3, 6, 18],
    [2, 3, 6, 18], 
    [13, 14, 6, 7], 
    [2, 14, 6, 7],     
    [13, 3, 6, 7],         
    [2, 3, 6, 7],             

    [12, 14, 16, 18],             
    [12, 3, 16, 18],             
    [12, 14, 16, 7],             
    [12, 3, 16, 7],                 
    [9, 10, 17, 18],
    [9, 10, 17, 7],
    [9, 10, 6, 18],
    [9, 10, 6, 7],

    [13, 15, 17, 19],
    [13, 15, 6, 19],
    [2, 15, 17, 19],
    [2, 15, 6, 19],
    [13, 14, 21, 22],
    [2, 14, 21, 22],
    [13, 3, 21, 22],
    [2, 3, 21, 22],

    [12, 15, 16, 19],
    [9, 10, 21, 22],    
    [8, 9, 12, 18],
    [8, 9, 12, 7],
    [10, 11, 17, 15],    
    [10, 11, 6, 15],        
    [13, 19, 22, 23],            
    [2, 19, 22, 23],    

    [16, 14, 20, 21],    
    [16, 3, 20, 21],    
    [8, 11, 12, 15],    
    [8, 9, 20, 21],    
    [16, 19, 20, 23],    
    [10, 11, 22, 23],    
    [8, 11, 20, 23],    
    [8, 11, 20, 23],    
];


AutoTileConverter.makeSegmentTile = function(source, bitmap, x, y, width, height, segments) {
  for (var i = 0; i < segments.length; i++) {
    var dx = x + (i % 2) * width;
    var dy = y + Math.floor(i / 2) * height;
    var index = segments[i];
    var sx = (index % 4) * width;
    var sy = Math.floor(index / 4) * height; 
    bitmap.blt(source, sx, sy, width, height, dx, dy);          
  }
};

AutoTileConverter.generateFullAutoTileBitmap = function(name, source) {


  var regEx = /tw\[(\d+)\]/i;
  var arr = regEx.exec(name);
  name = name.replace(regEx, '');
  var tileWidth = arr ? Number(arr[1]) : 48;


  regEx = /th\[(\d+)\]/i;
  arr = regEx.exec(name);
  name = name.replace(regEx, '');
  var tileHeight = arr ? Number(arr[1]) : 48;
  var sWidth = tileWidth / 2;
  var sHeight = tileHeight / 2;

  var bitmap = new Bitmap(tileWidth * 8, tileHeight * 6);
  var allSegments = AutoTileConverter._allSegments;
  for (var i = 0; i < allSegments.length; i++) {
    var segments = allSegments[i];
    var x = (i % 8) * tileWidth;
    var y = Math.floor(i / 8) * tileHeight;
    AutoTileConverter.makeSegmentTile(source, bitmap, x, y, sWidth, sHeight, segments);      
  }

  var fs = require('fs');
  var path = require('path');
  var base = path.dirname(process.mainModule.filename);
  var canvas = bitmap._canvas;
  var dataURL = canvas.toDataURL("image/png", 1);
  var folderName = 'Tile Converter/Output';
  var dirPath = base + '/'+ folderName + '/';
  // If Directory Path does not exist create it
  if (!fs.existsSync(dirPath)) { fs.mkdirSync(dirPath); }
    // Make Image Name
  var imageName = name;
  // Make File Name
  var fileName = dirPath + imageName + '.png';
  // Get Base 64 Data
  var base64Data = dataURL.replace(/^data:image\/png;base64,/, "");
  // Write File
  fs.writeFileSync(fileName, base64Data, 'base64', function(err) { console.log(err); });
};


Scene_Boot.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._startDate = Date.now();


  var path = require('path');
  var fs = require('fs');
  var base = path.dirname(process.mainModule.filename);
  var filePath = base + '/Tile Converter/Input';
  // If Directory does not exist, create it.
  if (!fs.existsSync(filePath)) { fs.mkdirSync(filePath); }
  // Get Directory List
  var dirList = fs.readdirSync(filePath);
  // Go Through Directory List
  for (var i = 0; i < dirList.length; i++) {
    // Get Filename
    var filename = path.basename(dirList[i], '.png');
    var format = path.extname(dirList[i]);
    // If Format is not a Javascript file the continue on
    if (format !== '.png') { continue; }
    // Get Bitmap
    var bitmap = ImageManager.loadBitmap('Tile Converter/Input/', filename, 0, false)
    bitmap.addLoadListener(AutoTileConverter.generateFullAutoTileBitmap.bind(this, filename, bitmap));
  }
};