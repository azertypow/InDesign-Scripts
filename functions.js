// This script contains utility functions used by other scripts, it is not meant to be executed on its own

// Function to create a text frame :
// takes a string, creates a frame of text with this string
function createTextFrame(string, paragraphStyle, layer, orientation, y1, x1) {
    //$.writeln(myDocument);
    var myFrame = myDocument.textFrames.add(layer, undefined, undefined, {
        geometricBounds: [y1, x1, y1 + 500, x1 + 500],
        contents: string
    });

    // apply paragraph style
    myFrame.texts[0].appliedParagraphStyle = paragraphStyle;

    // Change autosize preferences
    //myFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
    //myFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_AND_WIDTH;

    // fit frame to content
    myFrame.fit(FitOptions.FRAME_TO_CONTENT);

    if (orientation === 1) {
        myFrame.rotationAngle = 90;
    }

    //myFrame.resolve(AnchorPoint.CENTER_ANCHOR, CoordinateSpaces.INNER_COORDINATES);
}

// function to create a flat map array
function createFlatMap(width, height, columnCount, rowCount) {
    var map = [];
    var counter = 0;

    for (var y = 0; y < columnCount; y++) {
        //map[x] = []; // set up inner array
        for (var x = 0; x < rowCount; x++) {
            //addCell(map, x, y);
            map[counter] = [
                Math.round((width / (columnCount - 1)) * x) + myMargins.left,
                Math.round((height / (rowCount - 1)) * y) + myMargins.top
            ];
            counter++;
        }
    }
    return map;
}

// Function to create a layer
function createNumberedLayer(layerBaseName) {
    var layerCounter = 0;

    // Create a layer to hold the guides marks (if it does not already exist).
    // Try to select layer
    myLayer = app.activeDocument.layers.item(layerBaseName + " " + layerCounter);

    // while layer exists
    while (typeof myLayer != "undefined") {
        // Try to select layer
        myLayer = app.activeDocument.layers.item(layerBaseName + " " + layerCounter);

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
    var theLayer = app.activeDocument.layers.add({name: layerBaseName + " " + layerCounter});

    return theLayer;
}

// get random int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}