jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 FlightSet in the list

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
		"flexso/test/integration/MasterJourney",
		"flexso/test/integration/NavigationJourney",
		"flexso/test/integration/NotFoundJourney",
		"flexso/test/integration/BusyJourney",
		"flexso/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});