sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.test.candlegraph.controller.main", {
		onInit: function () {
			var data = [{
				xAxis: "2000",
				yAxixMin: "100",
				yAxixMax: "200",
				yAxixMean: "140"
			}, {
				xAxis: "2001",
				yAxixMin: "110",
				yAxixMax: "240",
				yAxixMean: "200"
			}, {
				xAxis: "2002",
				yAxixMin: "145",
				yAxixMax: "220",
				yAxixMean: "160"
			}, {
				xAxis: "2003",
				yAxixMin: "241",
				yAxixMax: "110",
				yAxixMean: "186"
			}, {
				xAxis: "2004",
				yAxixMin: "101",
				yAxixMax: "210",
				yAxixMean: "150"
			}, {
				xAxis: "2005",
				yAxixMin: "90",
				yAxixMax: "190",
				yAxixMean: "145"
			}, {
				xAxis: "2006",
				yAxixMin: "10",
				yAxixMax: "200",
				yAxixMean: "100"
			}, {
				xAxis: "2007",
				yAxixMin: "35",
				yAxixMax: "225",
				yAxixMean: "130"
			}, {
				xAxis: "2008",
				yAxixMin: "21",
				yAxixMax: "180",
				yAxixMean: "110"
			}, {
				xAxis: "2009",
				yAxixMin: "100",
				yAxixMax: "270",
				yAxixMean: "170"
			}, {
				xAxis: "2010",
				yAxixMin: "120",
				yAxixMax: "240",
				yAxixMean: "140"
			}
			
			];
			this.getView().byId("CandleGraph1").initializeData(data);
		}
	});
});