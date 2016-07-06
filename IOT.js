jQuery.sap.declare("sap.services.IOT");

sap.services.IOT = {
	_dmsUrl: "/iotrdms/",
	_mmsUrl: "/iotmms/",

	_showError: function(msg) {
		if(sap.ui.commons && typeof sap.ui.commons.MessageBox.show === "function") {
			sap.ui.commons.MessageBox.show(msg, "ERROR", "Error");
		} else if(sap.m && sap.m.MessageBox && typeof sap.m.MessageBox.error === "function") {
			sap.m.MessageBox.error(msg);
		} else {
			alert(msg);
		}
		
	} ,
	_handleError: function(para) {
		if(para.responseJSON && para.responseJSON.errors) {
			for(var idx in para.responseJSON.errors) {
				var err = para.responseJSON.errors[idx];
				this._showError(err.description);
			}
		} else if(para.responseText) {
			this._showError(para.responseText);
		} else {
			this._showError("Unknown error!");
		}
	},
	_request: function(method, url, data, callback, failCB) {
		var that = this;
		var req = {
			method: method,
			url: url,
			contentType: "application/json"
		};
		if(data) {
			req.data = JSON.stringify(data);
		}
		$.ajax(req).done(function(res) {
			if(typeof callback === "function") {
				callback(res);
			}
		}).fail(function(err) {
			if(typeof failCB === "function") {
				failCB(err);
			} else{
				that._handleError(err);
			}
			if(typeof callback === "function") {
				callback();
			}
		});
	},
	_get: function(url, done, fail) {
		this._request("GET", url, null, done, fail);
	},
	_delete: function(url, done, fail) {
		this._request("DELETE", url, null, done, fail);
	},
	_post: function(url, data, done, fail) {
		this._request("POST", url, data, done, fail);
	},

	setServiceUrl: function(dmsUrl, mmsUrl) {
		if(!dmsUrl.endsWith("/")) {
			dmsUrl += "/";
		}
		if(!mmsUrl.endsWith("/")) {
			mmsUrl += "/";
		}
		this._dmsUrl = dmsUrl;
		this._mmsUrl = mmsUrl;
	},
	getMmsUrl: function() {
		return this._mmsUrl;
	},
	getDmsUrl: function() {
		return this._dmsUrl;
	},
	getDeviceTypes: function(done, fail) {
		this._get(this._dmsUrl + "devicetypes", done, fail);
	},
	getMessageTypes: function(done, fail) {
		this._get(this._dmsUrl + "messagetypes", done, fail);
	},
	getDevices: function(done, fail) {
		this._get(this._dmsUrl + "devices", done, fail);
	},
	deleteDeviceType: function(id, done, fail) {
		this._delete(this._dmsUrl + "devicetypes/" + id, done, fail);
	},
	deleteMessageType: function(id, done, fail) {
		this._delete(this._dmsUrl + "messagetypes/" + id, done, fail);
	},
	deleteDevice: function(id, done, fail) {
		this._delete(this._dmsUrl + "devices/" + id, done, fail);
	},
	addDeviceType: function(name, done, fail) {
		this._post(this._dmsUrl + "devicetypes", {name: name}, done, fail);
	},
	addMessageType: function(data, done, fail) {
		data.fields = data.fields || [];
		for(var n=0;n<data.fields.length;n++) {
			data.fields[n].position = n+1;
		}
		this._post(this._dmsUrl + "messagetypes", data, done, fail);
	},
	addDevice: function(name, dtype, done, fail) {
		this._post(this._dmsUrl + "devices", {
			name: name, device_type: dtype
		}, done, fail);
	},
	getData: function(device,done, fail) {
		this._get(this._mmsUrl + "data/" + device, done, fail);
	},
	postData: function(device, mode, messageType, messages, done, fail) {
		this._post(this._mmsUrl + "data/" + device, {
			mode: mode,
			messageType: messageType,
			messages: messages
		}, done, fail);
	},
	pushData: function(device, method, sender, messageType, messages, done, fail) {
		this._post(this._mmsUrl + "push/" + device, {
			method: method,
			messageType: messageType,
			sender: sender,
			messages: messages
		}, done, fail);
	}
};
if(location.protocol !== "https:") {
	sap.services.IOT.setServiceUrl(
		"https://iotrdmsx36737db5-p935700trial.hanatrial.ondemand.com/com.sap.iotservices.dms/api/",
		"https://iotmmsp935700trial.hanatrial.ondemand.com/com.sap.iotservices.mms/v1/api/http/");
}