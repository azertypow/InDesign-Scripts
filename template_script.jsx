main();

// general variables
var myLayer;
var myDocument;

var myPageWidth;
var myPageHeight;

var myPage;

var myMargins;

function main() {
    // populate variables
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

    //Display the browser.
    //var textFile = File.openDialog("Select a text file", "");

    // display dialog box
    //myDisplayDialog(textFile);
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
        // Get input variables
        var myNumberOfRows = myNumberOfRowsField.editValue;
        var myNumberOfColumns = myNumberOfColumnsField.editValue;

        // destroy dialog
        myDialog.destroy();

        // Next Actions
        // Next Actions

    } else {
        myDialog.destroy();
    }
}