sap.ui.define([
		"jquery.sap.global",
		"sap/ui/core/Control"
	],
	function (jQuery, Control) {
		"use strict";
		var graph = Control.extend("com.test.candlegraph.graph.CandleGraph", {
			metadata: {
				properties: {
					"id": {
						type: "string",
						defaultValue: ""
					},
					"width": {
						type: "int",
						defaultValue: 640
					},
					"height": {
						type: "int",
						defaultValue: 480
					},
					"title": {
						type: "string",
						defaultValue: "Candle Graph"
					},
					"XAxisLabel": {
						type: "string",
						defaultValue: "X Axis"
					},
					"YAxisLabel": {
						type: "string",
						defaultValue: "Y Axis"
					},
					"candleColor": {
						type: "string",
						defaultValue: "Orange"
					},
					"circleColor": {
						type: "string",
						defaultValue: "Black"
					},
					"lineColor": {
						type: "string",
						defaultValue: "Cyan"
					},
					"showHorizontalDashedLines": {
						type: "boolean",
						defaultValue: false
					},
					"horizontalDashedLinesColor": {
						type: "string",
						defaultValue: "Grey"
					},
					"showVerticalDashedLines": {
						type: "boolean",
						defaultValue: false 
					},
					"verticalDashedLinesColor": {
						type: "string",
						defaultValue: "Grey"
					}
				},
				events: {

				}
			},
			init: function () {
				this._data = {};
				this.xMargin = 90;
				this.yMargin = 5;
			},
			initializeData: function (oData) {
				this._data = oData;
			},
			onAfterRendering: function () {

			}
		});
		return graph;
	});