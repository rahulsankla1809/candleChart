sap.ui.define([],
	function () {
		"use strict";
		var CandleGraphRenderer = {};
		CandleGraphRenderer.render = function (oRm, oControl) {

			var data = oControl._data;
			var dataLength = data.length;

			data.sort(function (a, b) {
				return a.yAxixMin - b.yAxixMin;
			});

			var yAxixMinMin = data[0].yAxixMin;
			var yAxixMinMax = data[dataLength - 1].yAxixMin;
			data.sort(function (a, b) {
				return a.yAxixMax - b.yAxixMax;
			});

			var yAxixMaxMin = data[0].yAxixMax;
			var yAxixMaxMax = data[dataLength - 1].yAxixMax;

			var yAxisMaxValue = Math.max(yAxixMinMin, yAxixMinMax, yAxixMaxMin, yAxixMaxMax);
			// var yAxisMinValue = Math.min(yAxixMinMin, yAxixMinMax, yAxixMaxMin, yAxixMaxMax);
			// finally sort based on x axis
			data.sort(function (a, b) {
				return a.xAxis - b.xAxis;
			});

			var xMargin = oControl.xMargin;
			var yMargin = oControl.yMargin;
			var width = oControl.getWidth();
			var height = oControl.getHeight();
			var xLength = xMargin + width;
			var yLength = yMargin + height;
			var xAxisTextStartPosition = xMargin;
			var YAxisTextStartPosition = yLength;
			var xAxisSeparation = width / (dataLength + 1);
			var yAxisSeparation = height / (dataLength + 1);
			var yAxisValuesPositions = [];

			// find the reduction factor for optimally show the graph. (no need for it)
			// var reductionFactor = Math.ceil(yAxisMaxValue / yLength);

			// to the nearest 10 or 100 or 1000
			var yAxisMaxValuePossible = Math.ceil(yAxisMaxValue / Math.pow(10, (yAxisMaxValue.toString().length - 1))) * Math.pow(10, ((
				yAxisMaxValue.toString().length - 1)));
			var yAxisDivision = yAxisMaxValuePossible / 10;

			oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.writeClasses();
			oRm.writeStyles();
			oRm.write(">");
			// write svg
			oRm.write("<svg version='1.2' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' role='img' width='" + (
				xLength + 30) + "' height='" + (yLength + 100) + "'");
			oRm.addClass("graph");
			oRm.writeClasses();
			oRm.write(">");

			// write title
			oRm.write("<g");
			oRm.addClass();
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("<text x='" + (xLength / 2) + "' y='20'");
			oRm.addClass("label-graph");
			oRm.writeClasses();
			oRm.write(">" + oControl.getTitle() + "</text>");
			oRm.write("</g>");

			// write Y axix
			oRm.write("<g");
			oRm.addClass("grid x-grid");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("<line x1='" + xMargin + "' x2='" + xMargin + "' y1='" + yMargin + "' y2='" + yLength + "'/>");
			oRm.write("</g>");

			// write X axix
			oRm.write("<g");
			oRm.addClass("grid y-grid");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("<line x1='" + xMargin + "' x2='" + xLength + "' y1='" + yLength + "' y2='" + yLength + "'/>");
			oRm.write("</g>");
			// Draw graph from here
			// First add labels, not optimized, using multiple loops
			// Label the x-axis	
			oRm.write("<g");
			oRm.addClass("labels x-labels");
			oRm.writeClasses();
			oRm.write(">");
			for (var i = 0; i < dataLength; i++) {
				xAxisTextStartPosition = xAxisTextStartPosition + xAxisSeparation;
				oRm.write("<text x='" + xAxisTextStartPosition + "' y='" + (yLength + 20) + "'>" + data[i].xAxis + "</text>");
				// draw Vertical dashed lines
				if (oControl.getShowVerticalDashedLines()) {
					oRm.write("<line x1='" + xAxisTextStartPosition + "' x2='" + xAxisTextStartPosition + "' y1='" + (yMargin + 30) + "' y2='" + yLength +
						"' stroke='" + oControl.getVerticalDashedLinesColor() + "' stroke-width='1' stroke-dasharray='5,5'/>");
				}
			}
			oRm.write("<text x='" + (xLength / 2) + "' y='" + (yLength + 40) + "'");
			oRm.addClass("label-title-x");
			oRm.writeClasses();
			oRm.write(">" + oControl.getXAxisLabel() + "</text>");
			oRm.write("</g>");
			// Close label x-axis

			// Label the Y-axis	
			oRm.write("<g");
			oRm.addClass("labels y-labels");
			oRm.writeClasses();
			oRm.write(">");
			for (i = 0; i < dataLength; i++) {
				YAxisTextStartPosition = YAxisTextStartPosition - yAxisSeparation;
				oRm.write("<text x='" + (xMargin - 20) + "' y='" + (YAxisTextStartPosition) + "'>" + ((i + 1) * yAxisDivision) + "</text>");
				// draw horizontal dashed lines
				yAxisValuesPositions.push({
					label: ((i + 1) * yAxisDivision),
					position: YAxisTextStartPosition
				});
				if (oControl.getShowHorizontalDashedLines()) {
					oRm.write("<line x1='" + xMargin + "' x2='" + (xLength - 30) + "' y1='" + YAxisTextStartPosition + "' y2='" + YAxisTextStartPosition +
						"' stroke='" + oControl.getHorizontalDashedLinesColor() + "' stroke-width='1' stroke-dasharray='5,5'/>");
				}
			}
			oRm.write("<text x='" + 20 + "' y='" + (yLength / 2) + "'");
			oRm.addClass("label-title-y");
			oRm.writeClasses();
			oRm.write(">" + oControl.getYAxisLabel() + "</text>");
			oRm.write("</g>");
			// Close label Y-axis
			// reset the start positions
			xAxisTextStartPosition = xMargin;
			YAxisTextStartPosition = height;
			// draw the graph 
			var path = [];
			for (i = 0; i < dataLength; i++) {
				// find the closest position of the value for min
				var closestMin = yAxisValuesPositions.reduce(function (prev, curr) {
					return (Math.abs(curr.label - data[i].yAxixMin) < Math.abs(prev.label - data[i].yAxixMin) ? curr : prev);
				});
				// find the closest position of the value for max
				var closestMax = yAxisValuesPositions.reduce(function (prev, curr) {
					return (Math.abs(curr.label - data[i].yAxixMax) < Math.abs(prev.label - data[i].yAxixMax) ? curr : prev);
				});

				var minPosition = closestMin.position - ((data[i].yAxixMin - closestMin.label) / closestMin.label) * yAxisSeparation;
				var maxPosition = closestMax.position - ((data[i].yAxixMax - closestMax.label) / closestMax.label) * yAxisSeparation;

				xAxisTextStartPosition = xAxisTextStartPosition + xAxisSeparation;
				oRm.write("<g>");
				oRm.write("<line id=candle" + i + " x1='" + xAxisTextStartPosition + "' x2='" + xAxisTextStartPosition + "' y1='" + minPosition +
					"' y2='" + maxPosition + "' stroke='" + oControl.getCandleColor() +
					"' stroke-width='2' ");
				oRm.addClass("styleLines");
				oRm.writeClasses();
				oRm.write("/>");

				oRm.write("<circle cx='" + xAxisTextStartPosition + "' cy='" + minPosition +
					"' r='3' stroke='" + oControl.getCircleMinColor() +
					"' fill='" + oControl.getCircleMinColor() + "'");
				oRm.addClass("styleCircle");
				oRm.writeClasses();
				oRm.write(">");
				oRm.write("<title>Min Value in " + data[i].xAxis + ": " + data[i].yAxixMin + "</title>");
				oRm.write("</circle>");
				oRm.write("<circle cx='" + xAxisTextStartPosition + "' cy='" + maxPosition +
					"' r='3' stroke='" + oControl.getCircleMaxColor() +
					"' fill='" + oControl.getCircleMaxColor() + "'");
				oRm.addClass("styleCircle");
				oRm.writeClasses();
				oRm.write(">");
				oRm.write("<title>Max Value in " + data[i].xAxis + ": " + data[i].yAxixMax + "</title>");
				oRm.write("</circle>");
				oRm.write("</g>");

				// find the closest position of the value for mean current
				var closestMeanCurr = yAxisValuesPositions.reduce(function (prev, curr) {
					return (Math.abs(curr.label - data[i].yAxixMean) < Math.abs(prev.label - data[i].yAxixMean) ? curr : prev);
				});
				// 	// find the closest position of the value for mean previous
				var meanPositionCurr = closestMeanCurr.position - ((data[i].yAxixMean - closestMeanCurr.label) / closestMeanCurr.label) *
					yAxisSeparation;
				if (i === 0) {
					var sPath = "M" + xAxisTextStartPosition + ", " + meanPositionCurr + " ";
				} else {
					sPath = sPath + "L" + xAxisTextStartPosition + ", " + meanPositionCurr + " ";
				}
				path.push({
					x: xAxisTextStartPosition,
					y: meanPositionCurr
				});
			}
			// add path (Old code had Lines instead, path seems to be a better choice)
			oRm.write("<g>");
			oRm.write("<path id='linePath' d='" + sPath + "' " + "stroke='" + oControl.getLineColor() + "' fill=none stroke-width='2' >");
			oRm.write("</path>");
			oRm.write("</g>");
			// add circles on the path points
			oRm.write("<g>");
			for (i = 0; i < dataLength; i++) {
				oRm.write("<circle cx='" + (path[i].x) + "' cy='" + path[i].y + "' r='2' stroke='" + oControl.getLineColor() +
					"' fill='" + oControl.getLineColor() + "'");
				oRm.addClass("styleCircle");
				oRm.writeClasses();
				oRm.write(">");
				oRm.write("<title>Mean Value in " + data[i].xAxis + " : " + data[i].yAxixMean + "</title>");
				oRm.write("</circle>");
			}
			oRm.write("</g>");
			// on click events
			// Line chart clicked
			$(document).on("click", "#linePath", function () {
				oControl._onClick("lineClicked", oControl._data);
			});
			// Candle clicked (not a good way to do, but functional)
			$(document).on("click", "[id*='candle']", function (element) {
				var sElementId = element.currentTarget.id;
				var dataPointer = sElementId.replace(/candle/, "");
				oControl._onClick("candleClicked", oControl._data[dataPointer]);
			});
			// close svg
			oRm.write("</svg>");
			// creating lenegds
			if (oControl.getShowLegend()) {
				oRm.write(
					"<svg version='1.2' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' role='img' width='250' height='100'"
				);
				oRm.addClass("legends");
				oRm.writeClasses();
				oRm.write(">");
				oRm.write("<g>");
				oRm.write("<text x='10' y='10'");
				oRm.addClass("label-title-x");
				oRm.writeClasses();
				oRm.write(">" + "Legends" + "</text>");
				oRm.write("</g>");
				// Minimum value legend
				oRm.write("<g>");
				oRm.write("<circle cx='15' cy='30' r='4' stroke='" + oControl.getCircleMinColor() + "' fill='" + oControl.getCircleMinColor() + "'/>");
				oRm.write("<text x='30' y='34'");
				oRm.addClass("labels x-labels");
				oRm.writeClasses();
				oRm.write(">" + oControl.getMinValueLegendText() + "</text>");
				oRm.write("</g>");
				// Maximum value legend
				oRm.write("<g>");
				oRm.write("<circle cx='15' cy='50' r='4' stroke='" + oControl.getCircleMaxColor() + "' fill='" + oControl.getCircleMaxColor() + "'/>");
				oRm.write("<text x='30' y='54'");
				oRm.addClass("labels x-labels");
				oRm.writeClasses();
				oRm.write(">" + oControl.getMaxValueLegendText() + "</text>");
				oRm.write("</g>");
				// Mean value legend
				oRm.write("<g>");
				oRm.write("<line x1='8' x2='25' y1='70' y2='70' stroke='" + oControl.getLineColor() + "'/>");
				oRm.write("<text x='30' y='74'");
				oRm.addClass("labels x-labels");
				oRm.writeClasses();
				oRm.write(">" + oControl.getMeanValueLegendText() + "</text>");
				oRm.write("</g>");
				oRm.write("</svg>");
			}
			// Close the Div 		              
			oRm.write("</div>");
		};
		return CandleGraphRenderer;
	}, true);