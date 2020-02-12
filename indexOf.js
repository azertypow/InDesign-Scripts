function indexOf(item1, item2) {
	var indexOf = -1;

	for (var i = 0; i < item1.length; i++) {

		if (item1[i] == item2) {
			indexOf = i;
		}
	}

	return indexOf;
}