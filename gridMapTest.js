var theMap = createMap(100, 100, 10, 10);

//console.log();
for (var i = 0; i < theMap.length - 1; i++) {
    for (var j = 0; j < theMap[i].length - 1; j++) {
        console.log(`${theMap[i][j][0]} - ${theMap[i][j][1]}`);
        //$.write("-");
        //$.writeln(coordinates[i][j]);
    }
}


// function to create map array
function createMap(width, height, columnCount, rowCount) {
    var map = [];

    for (var x = 0; x < columnCount; x++) {
        map[x] = []; // set up inner array
        for (var y = 0; y < rowCount; y++) {
            //addCell(map, x, y);
            map[x][y] = [Math.round((width / columnCount) * x), Math.round((height / rowCount) * y)];
        }
    }
    return map;
}