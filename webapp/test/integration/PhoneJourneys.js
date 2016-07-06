jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"flexso/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"flexso/test/integration/pages/App",
	"flexso/test/integration/pages/Browser",
	"flexso/test/integration/pages/Master",
	"flexso/test/integration/pages/Detail",
	"flexso/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "flexso.view."
	});

	sap.ui.require([
		"flexso/test/integration/NavigationJourneyPhone",
		"flexso/test/integration/NotFoundJourneyPhone",
		"flexso/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});

