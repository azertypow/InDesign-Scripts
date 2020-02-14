main();

// general variable
var myLayer;
var myDocument;

var myPageWidth;
var myPageHeight;

function main() {
    myDocument = app.activeDocument;
    myPageWidth = myDocument.documentPreferences.pageWidth;
    myPageHeight = myDocument.documentPreferences.pageHeight;
    //$.writeln(myPageWidth/2);
    //$.writeln(myPageHeight/2);

    //Make certain that user interaction (display of dialogs, etc.) is turned on.
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
    // acceptable extensions
    myExtensions = [".txt", ".md"];
    //Display the folder browser.
    var textFile = File.openDialog("Select a text file", "");

    // display dialog box
    myDisplayDialog(textFile);
}

/* ---- FUNCTIONS ---- */

// Function to display dialog box
function myDisplayDialog(myTextFile) {
    var myLabelWidth = 90;
    var myDialog = app.dialogs.add({name: "Grid Layout"});
    with (myDialog.dialogColumns.add()) {
        with (dialogRows.add()) {
            with (dialogColumns.add()) {
                staticTexts.add({staticLabel: "Rows:", minWidth: myLabelWidth});
                staticTexts.add({staticLabel: "Columns:", minWidth: myLabelWidth});
            }
            with (dialogColumns.add()) {
                var myNumberOfRowsField = integerEditboxes.add({editValue: 2});
                var myNumberOfColumnsField = integerEditboxes.add({editValue: 2});
            }
        }
    }
    var myResult = myDialog.show();
    if (myResult == true) {
        var myNumberOfRows = myNumberOfRowsField.editValue;
        var myNumberOfColumns = myNumberOfColumnsField.editValue;
        myDialog.destroy();

        // create layer
        myCreateNumberedLayer("text ");

        // read text file
        loopOverText(readTextFile(myTextFile), myNumberOfRows, myNumberOfColumns);
    } else {
        myDialog.destroy();
    }
}

/* ---- FUNCTIONS ----*/

// function to loop over text
function loopOverText(text, rows, columns) {
    var coordinates = createMap(20, 20);
    //$.writeln(coordinates);

    for (var i = 0; i < coordinates.length - 1; i++) {
        for (var j = 0; j < coordinates[i].length - 1; j++) {
            if (i < text.length) {
                $.write(coordinates[i][j][0]);
                $.write("-");
                $.writeln(coordinates[i][j][1]);
                createTextFrame(
                    text.charAt(i),
                    coordinates[i][j][0],
                    coordinates[i][j][1],
                    coordinates[i][j][0] + 20,
                    coordinates[i][j][1] + 20
                );
            }
        }
    }
}

// function to create map array
function createMap(width, height, rowCount, columnCount) {
    var map = [];
    for (var x = 0; x < columnCount; x++) {
        map[x] = []; // set up inner array
        for (var y = 0; y < rowCount; y++) {
            addCell(map, x, y);
        }
    }
    return map;
}

// function to add cell to map
function addCell(map, x, y) {
    map[x][y] = cell(x, y); // create a new object on x and y
}

function cell(x, y) {
    return [x + 1, y + 1];
}

// Function to output grid coordinates
// takes number of columns and rows
// returns a 2D array of coordinates
function gridCoords(rows, columns) {
    /*
    // horizontal coords
    var xCoords = lengthCoords(myPageHeight, rows);
    // vertical coords
    var yCoords = lengthCoords(myPageWidth, columns);

    // create 2D array
    for (var i = 0; i < xCoords.length; i++) {
        gridCoords.push([xCoords[i], yCoords[i]]);
    }*/

    var gridCoords = [];

    for (var i = 0; i < myPageWidth; i++) {
        for (var j = 0; j < myPageHeight; j++) {
            gridCoords.push([i, j]);
        }
    }

    return gridCoords;
}

// Function to output coords for a given length divided by a given number
// outputs an array of ints
function lengthCoords(length, divisions) {
    var coordsArray = [];
    for (var i = 0; i < length; i++) {
        if (i % Math.round(length / divisions) === 0) {
            coordsArray.push(i);
        }
    }
    return coordsArray;
}

// Function to create a text frame :
// takes a string, creates a frame of text with this string
function createTextFrame(string, y1, x1, y2, x2) {
    //$.writeln(myDocument);
    var myFrame = myDocument.textFrames.add(myLayer, undefined, undefined, {
        geometricBounds: [y1, x1, x2, y2],
        contents: string
    });
    // fit frame to content
    myFrame.fit(FitOptions.FRAME_TO_CONTENT);
    //myFrame.resolve(AnchorPoint.CENTER_ANCHOR, CoordinateSpaces.INNER_COORDINATES);
}

// Function to read text file : takes file location, returns file text
function readTextFile(file) {
    var text = file.open("r");
    //alert(file.read());

    return file.read();
}

// Function to create guide layer
function myCreateNumberedLayer(layerBaseName) {
    var layerCounter = 0;

    // Create a layer to hold the guides marks (if it does not already exist).
    // Try to select layer
    myLayer = app.activeDocument.layers.item(layerBaseName + layerCounter);

    // while layer exists
    while (typeof myLayer != "undefined") {
        // Try to select layer
        myLayer = app.activeDocument.layers.item(layerBaseName + layerCounter);

        try {
            var myLayerName = myLayer.name;
            // increment layer counter
            layerCounter++;
        }
            // if the layer does not exists
        catch (myError) {
            break;
        }
    }
    // create layer
    myLayer = app.activeDocument.layers.add({name: layerBaseName + layerCounter});
}