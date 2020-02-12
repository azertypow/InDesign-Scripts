main();

// general variable
var myLayer;

function main() {
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
        loopOverText(readTextFile(myTextFile));
    } else {
        myDialog.destroy();
    }
}

/* ---- FUNCTIONS ----*/

// Function to create a text frame :
// takes a string, creates a frame of text with this string
function createTextFrame(string, y1, x1, y2, x2) {
    var myFrame = app.activeDocument.textFrames.add(myLayer, undefined, undefined, {
        geometricBounds: [y1, x1, y2, x2],
        contents: string
    });
    // fit frame to content
    myFrame.fit(FitOptions.FRAME_TO_CONTENT);
    //myFrame.resolve(AnchorPoint.CENTER_ANCHOR, CoordinateSpaces.INNER_COORDINATES);
}

// function to loop over text
function loopOverText(text) {
    for (var i = 0; i < text.length; i++) {
        //$.writeln(text.charAt(i));
        createTextFrame(text.charAt(i), i, i, i+20, i+20);
    }
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