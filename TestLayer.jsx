
main();

function main() {
	var myDocument = app.activeDocument;
	var myPages = myDocument.pages;

	myDocument.layers.add({ name: 'newLayer' });
}