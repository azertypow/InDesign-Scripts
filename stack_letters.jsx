main();
//@include "functions.js"

// general variables
var myLayer;
var myDocument;

var myPageWidth;
var myPageHeight;

var myPage;

var myMargins;
var marginWidth;
var marginHeight;

var textFrame;
var paragraphStyle;

function main() {
    // populating user variables
    height_divisions = 20;
    width_divisions = 20;

    // populating general variables
    myDocument = app.activeDocument;
    myPageWidth = myDocument.documentPreferences.pageWidth;
    myPageHeight = myDocument.documentPreferences.pageHeight;
    myPage = myDocument.layoutWindows[0].activePage;

    myMargins = myPage.marginPreferences;
    marginWidth = myPageWidth - (myMargins.left + myMargins.right);
    marginHeight = myPageHeight - (myMargins.top + myMargins.bottom);

    //Make certain that user interaction (display of dialogs, etc.) is turned on.
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

    // get selection
    if (myDocument.selection !== undefined && app.selection[0] !== undefined) {
        if (myDocument.selection.length === 1) {
            if (app.selection[0].toString() === "[object TextFrame]") {

                //var dialogValues = myDisplayDialog();

                textFrame = app.selection[0];

                var textContent = textFrame.contents;
                var texts = textFrame.texts[0];
                paragraphStyle = texts.appliedParagraphStyle;


                // create new layer
                var stackLayer = createNumberedLayer("stack");

                // loop over letters
                for (var i = 0; i < textContent.length; i++) {

                    //alert(flatMap[i]);
                    createTextFrame(
                        textContent[i],
                        paragraphStyle,
                        stackLayer,
                        0,
                        myMargins.top,
                        myMargins.left
                    );
                }

                //alert(textFrame.words.length);
                //alert(textFrame.words[0].contents);

            } else {
                alert("Selection not valid, please select a text frame");
            }
        } else {
            alert("Too many selected items, please select only one text frame");
        }
    } else {
        alert("No selection, please select a text frame");
    }
}