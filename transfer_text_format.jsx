main();
// general variables
var myLayer;
var myDocument;

var myPageWidth;
var myPageHeight;

var myPage;

var myMargins;
var marginWidth;
var marginHeight;

function main() {
    myDocument = app.activeDocument;
    myPageWidth = myDocument.documentPreferences.pageWidth;
    myPageHeight = myDocument.documentPreferences.pageHeight;
    myPage = myDocument.layoutWindows[0].activePage;

    myMargins = myPage.marginPreferences;
    marginWidth = myPageWidth - (myMargins.left + myMargins.right);
    marginHeight = myPageHeight - (myMargins.top + myMargins.bottom);

    if (myDocument.selection !== undefined && app.selection[0] !== undefined) {
        var frame = app.selection[0];

        var content = frame.contents;
        var texts = frame.texts[0];
        //alert(texts.appliedParagraphStyle.name);

        createTextFrame(content, texts.appliedParagraphStyle, 0, 0, 100, 100);
    }
    else {
        alert("No valid selection, please select a text frame");
    }
}


// Function to create a text frame :
// takes a string, creates a frame of text with this string
function createTextFrame(string, format, y1, x1, y2, x2) {
    //$.writeln(myDocument);
    var myFrame = myDocument.textFrames.add(myLayer, undefined, undefined, {
        geometricBounds: [y1, x1, y2, x2],
        contents: string
    });

    myFrame.texts[0].appliedParagraphStyle = format;
    // fit frame to content
    //myFrame.fit(FitOptions.FRAME_TO_CONTENT);
    //myFrame.resolve(AnchorPoint.CENTER_ANCHOR, CoordinateSpaces.INNER_COORDINATES);
}