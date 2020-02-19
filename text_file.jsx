main();

// general variables
var myLayer;
var myDocument;

var myPageWidth;
var myPageHeight;

var myPage;

var myMargins;

function main() {
    myDocument = app.activeDocument;
    myPageWidth = myDocument.documentPreferences.pageWidth;
    myPageHeight = myDocument.documentPreferences.pageHeight;
    myPage = myDocument.layoutWindows[0].activePage;

    myMargins = myPage.marginPreferences;
    alert(myMargins.top);
    alert(myMargins.bottom);
    alert(myMargins.left);
    alert(myMargins.right);
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
    var coordinates = createMap(myPageWidth, myPageHeight, rows, columns);
    //$.writeln(coordinates);

    // loop over text char by char
    for (var i = 0; i < text.length; i++) {
        if (i < coordinates.length) {
            //$.write(text.charAt(i));
            //$.write(' : ');
            //$.writeln(coordinates[i]);

            createTextFrame(
                text.charAt(i),
                coordinates[i][1] - 10,
                coordinates[i][0] - 10,
                coordinates[i][1] + 20,
                coordinates[i][0] + 20
            );

            /*myDocument.ovals.add(myLayer, undefined, undefined, {
                geometricBounds: [coordinates[i][1] - 5, coordinates[i][0] - 5, coordinates[i][1] + 10, coordinates[i][0] + 10],
                fill: "Black"
            });*/

        }
    }
}

// function to create a flat map array
function createMap(width, height, columnCount, rowCount) {
    var map = [];
    var counter = 0;

    for (var x = 0; x < columnCount + 1; x++) {
        //map[x] = []; // set up inner array
        for (var y = 0; y < rowCount + 1; y++) {
            //addCell(map, x, y);
            map[counter] = [Math.round((width / columnCount) * x), Math.round((height / rowCount) * y)];
            counter++;
        }
    }

    return map;
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
        geometricBounds: [y1, x1, y2, x2],
        contents: string
    });
    // fit frame to content
    //myFrame.fit(FitOptions.FRAME_TO_CONTENT);
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