// This script contains utility functions used by other scripts, it is not meant to be executed on its own

// Function to create a text frame :
// takes a string, creates a frame of text with this string
function createTextFrame(string, paragraphStyle, layer, orientation, y1, x1) {
    //$.writeln(myDocument);
    var myFrame = app.activeDocument.layoutWindows[0].activePage.textFrames.add(layer, undefined, undefined, {
        geometricBounds: [y1, x1, y1 + 50, x1 + 50],
        contents: string,
        //rotationAngle: -90,
    });

    // apply paragraph style
    myFrame.texts[0].appliedParagraphStyle = paragraphStyle;

    // change anchor point
    myFrame.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.INNER_COORDINATES);
    // fit frame to content
    //myFrame.fit(FitOptions.FRAME_TO_CONTENT);

    // change orientation
    if (orientation === 1) {
        myFrame.textFramePreferences.verticalJustification = VerticalJustification.BOTTOM_ALIGN;
        myFrame.rotationAngle = -90;
    }

    // Change autosize preferences
    //myFrame.textFramePreferences.autoSizingReferencePoint = AutoSizingReferenceEnum.TOP_LEFT_POINT;
    //myFrame.textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_AND_WIDTH_PROPORTIONALLY;

    // change anchor point
    //myFrame.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.INNER_COORDINATES);
    //myFrame.anchoredObjectSettings.anchorPoint = AnchorPoint.TOP_LEFT_ANCHOR;

}

// function to create a flat map array
function createFlatMap(width, height, columnCount, rowCount) {
    var map = [];
    var counter = 0;

    for (var y = 0; y < columnCount + 1; y++) {
        //map[x] = []; // set up inner array
        for (var x = 0; x < rowCount + 1; x++) {
            //addCell(map, x, y);
            map[counter] = [
                ((width / (columnCount)) * x) + myMargins.left,
                ((height / (rowCount)) * y) + myMargins.top
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

// create a circle
function createCircle(layer, y1, x1, radius) {
    myDocument.ovals.add(myLayer, undefined, undefined, {
        geometricBounds: [y1 - (radius / 2), x1 - (radius / 2), y1 + radius, x1 + radius],
        fillColor: "Black",
        strokeWeight: 0
    });
}

// get random int
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Function to draw a guide grid
function drawGuideGrid(layer, width, height, rows, columns) {
    var myPageHeight = app.activeDocument.documentPreferences.pageHeight;
    var myPageWidth = app.activeDocument.documentPreferences.pageWidth;

    // draw horizontal guides
    /*for (var i = 0; i < myPageHeight; i++) {
        if (i % Math.round(myPageHeight/rows) === 0) {
            drawGuide(i, 0);
        }
    }
    // draw vertical guides
    for (var i = 0; i < myPageWidth; i++) {
        if (i % Math.round(myPageWidth/columns) === 0) {
            drawGuide(i, 1);
        }
    }*/

    // vertical guides
    for (var y = 0; y < columns + 1; y++) {
        drawGuide(layer, (((width / (columns)) * y) + myMargins.left), 1);
    }
    // horizontal guides
    for (var x = 0; x < rows + 1; x++) {
        drawGuide(layer, (((height / (rows)) * x) + myMargins.top), 0);
    }

    // lock guide layer
    //layer.locked = true;
}

// Function to draw a single guide
function drawGuide(layer, myGuideLocation, myGuideOrientation) {
    // select guide layer
    //var myLayer = app.activeDocument.layers.item("Guides");

    with (app.activeWindow.activeSpread) {
        // if orientation is 0 -> horizontal
        if (myGuideOrientation == 0) {
            with (guides.add(layer, undefined, undefined)) {
                orientation = HorizontalOrVertical.horizontal;
                location = myGuideLocation;
                fitToPage = true;
            }
        }
        // if orientation is 1 -> vertical
        else {
            with (guides.add(layer, undefined, undefined)) {
                orientation = HorizontalOrVertical.vertical;
                location = myGuideLocation;
                fitToPage = true;
            }
        }
    }
}