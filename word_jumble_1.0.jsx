main();
//@include "functions.js"

// Editable variables
var height_divisions;
var width_divisions;

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

                var dialogValues = myDisplayDialog();

                textFrame = app.selection[0];

                //var textContent = textFrame.contents;
                var texts = textFrame.texts[0];
                paragraphStyle = texts.appliedParagraphStyle;

                // create flat map
                var flatMap = createFlatMap(marginWidth, marginHeight, dialogValues.divisions, dialogValues.divisions);

                // Draw guide grid
                if (dialogValues.guideGrid === true)
                {
                    var guideLayer = createNumberedLayer("guides");
                    drawGuideGrid(guideLayer, marginWidth, marginHeight, dialogValues.divisions, dialogValues.divisions);
                }

                // create new layer
                var jumbleLayer = createNumberedLayer("jumble");

                // loop over words
                for (var i = 0; i < textFrame.words.length; i++) {
                    var randomCoord = flatMap[getRandomInt(0, flatMap.length)];
                    var randomOrientation = getRandomInt(0, 2);

                    //alert(flatMap[i]);
                    createTextFrame(
                        textFrame.words[i].contents,
                        paragraphStyle,
                        jumbleLayer,
                        randomOrientation,
                        randomCoord[1],
                        randomCoord[0]
                    );
                }

                //alert(textFrame.words.length);
                //alert(textFrame.words[0].contents);

                //createTextFrame(content, texts.appliedParagraphStyle, 0, 0, 100, 100);
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

// Function to display dialog box
function myDisplayDialog() {
    var myLabelWidth = 90;
    var myDialog = app.dialogs.add({name: "Grid Layout"});
    with (myDialog.dialogColumns.add()) {
        with (dialogRows.add()) {
            with (dialogColumns.add()) {
                staticTexts.add({staticLabel: "Divisions:", minWidth: myLabelWidth});
                //staticTexts.add({staticLabel: "Columns:", minWidth: myLabelWidth});
            }
            with (dialogColumns.add()) {
                var myNumberOfRowsField = integerEditboxes.add({editValue: 2});
                //var myNumberOfColumnsField = integerEditboxes.add({editValue: 2});
            }
        }

        with (dialogRows.add()) {
            staticTexts.add({staticLabel: "Options:"});
        }
        with (dialogRows.add()) {
            var drawGuideGridField = checkboxControls.add({
                staticLabel: "Draw Guide Grid",
                checkedState: false
            });
        }
    }
    var myResult = myDialog.show();
    if (myResult == true) {
        var drawGuideGrid = drawGuideGridField.checkedState;
        var divisions = myNumberOfRowsField.editValue;
        //var myNumberOfColumns = myNumberOfColumnsField.editValue;
        myDialog.destroy();

        return {
            guideGrid: drawGuideGrid,
            divisions: divisions,
        };

        // create layer
    } else {
        myDialog.destroy();
    }
}