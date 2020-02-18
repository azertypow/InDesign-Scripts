main();

function main() {
    alert(app.selection[0].textFramePreferences.autoSizingType);
    app.selection[0].textFramePreferences.autoSizingType = AutoSizingTypeEnum.HEIGHT_ONLY;
    alert(app.selection[0].textFramePreferences.autoSizingType);
}