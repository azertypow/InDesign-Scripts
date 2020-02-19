main();

// general variable
var myLayer;

function main() {
    // display dialog box
    myDisplayDialog();
}

/* ---- FUNCTIONS ---- */

// Function to display dialog box
function myDisplayDialog() {
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

        // create guide layer
        myCreateGuideLayer("Guides_");

        // draw grid
        myDrawGrid(myNumberOfRows, myNumberOfColumns);
    } else {
        myDialog.destroy();
    }
}

// Function to create guide layer
function myCreateGuideLayer(layerBaseName) {
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

// Function to draw a guide grid
function myDrawGrid(rows, columns) {
    var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
    var myPageWidth = app.activeDocument.documentPreferences.pageWidth;

    // draw horizontal guides
    for (var i = 0; i < myPageHeight; i++) {
        if (i % Math.round(myPageHeight/rows) === 0) {
            myDrawGuide(i, 0);
        }
    }
    // draw vertical guides
    for (var i = 0; i < myPageWidth; i++) {
        if (i % Math.round(myPageWidth/columns) === 0) {
            myDrawGuide(i, 1);
        }
    }

    // lock guide layer
    myLayer.locked = true;
}

// Function to draw a single guide
function myDrawGuide(myGuideLocation, myGuideOrientation) {
    // select guide layer
    //var myLayer = app.activeDocument.layers.item("Guides");

    with (app.activeWindow.activeSpread) {
        // if orientation is 0 -> horizontal
        if (myGuideOrientation == 0) {
            with (guides.add(myLayer, undefined, undefined)) {
                orientation = HorizontalOrVertical.horizontal;
                location = myGuideLocation;
            }
        }
        // if orientation is 1 -> vertical
        else {
            with (guides.add(myLayer, undefined, undefined)) {
                orientation = HorizontalOrVertical.vertical;
                location = myGuideLocation;
            }
        }
    }
}