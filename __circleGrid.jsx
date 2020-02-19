main();
//@include "functions.js"

// general variable
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
    //$.writeln(myPageWidth/2);
    //$.writeln(myPageHeight/2);

    myMargins = myPage.marginPreferences;
    marginWidth = myPageWidth - (myMargins.left + myMargins.right);
    marginHeight = myPageHeight - (myMargins.top + myMargins.bottom);

    // create flat map
    var flatMap = createFlatMap(marginWidth, marginHeight, 5, 5);

    for (var i = 0; i < flatMap.length; i++) {
        createCircle(undefined,flatMap[i][1], flatMap[i][0], 3);
    }
}