sap.ui.define([
		"jquery.sap.global",
		"sap/ui/core/Control",
		"sap/ui/dom/includeStylesheet"
	],
	function (jQuery, Control, includeStylesheet) {
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
					"circleMaxColor": {
						type: "string",
						defaultValue: "Black"
					},
					"circleMinColor": {
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
					},
					"showLegend": {
						type: "boolean",
						defaultValue: "true"
					},
					"minValueLegendText": {
						type: "string",
						defaultValue: "Minimum Value"
					},
					"maxValueLegendText": {
						type: "string",
						defaultValue: "Maximum Value"
					},
					"meanValueLegendText": {
						type: "string",
						defaultValue: "Mean Value"
					},
					"showCandleToolTip": {
						type: "boolean",
						defaultValue: true
					},
					"showLineToolTip": {
						type: "boolean",
						defaultValue: true
					},
					"showCircleToolTip": {
						type: "boolean",
						defaultValue: true
					}
					
				},
				events: {
					candleClick: {
						parameters: {
							value: {
								type: "object"
							}
						}
					},
					lineClick: {
						parameters: {
							value: {
								type: "object"
							}
						}
					}
				}
			}
		});

		graph.prototype.init = function () {
			 var libraryPath = jQuery.sap.getModulePath("com.test.candlegraph");
			// include the control's CSS
			includeStylesheet(libraryPath + "/graph/css/candleGraphStyle.css");
			this._data = {};
			this.xMargin = 90;
			this.yMargin = 5;
		};
		graph.prototype.initializeData = function (oData) {
			this._data = oData;
		};
		graph.prototype.onAfterRendering = function () {
		};
		graph.prototype._onClick = function (sSource, oData) {
			if(sSource === "lineClicked"){
				this.fireEvent("lineClick", {value: oData});
			}else if(sSource === "candleClicked"){
				this.fireEvent("candleClick", {value: oData});
			}
		};
		return graph;
	});