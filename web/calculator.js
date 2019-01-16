

function numericButton(digit) {
	var expression = document.getElementById('expression');
	
	expression.value = expression.value + digit;
}

function functionButton(func) {
	var expression = document.getElementById('expression');
	
	if (expression.value == "") {	
		
		expression.value = func + "(x)";
		
	} else {	
		expression.value = func + "(" + expression.value + ")";
		
	}
}

function operatorButton(operator) {
	var expression = document.getElementById("expression");

	if (operator == "") {
		expression.value = "x" + " " + operator;
	} else  {
		expression.value = expression.value + " " + operator;
	}
}

function clearEntryButton() {
	document.getElementById('result_pane').value = "";
}

function clearEverythingButton() {
	document.getElementById('result_pane').value = "";
	document.getElementById("expression").value = "";
}

function plotButton() {

	var expression = document.getElementById("expression").value;

	var data = new google.visualization.DataTable();
	data.addColumn('number', 'X');
	data.addColumn('number', 'Y');
	
	var startsAt = parseFloat(document.getElementById("where.x.starts").value);
	var endsWith = parseFloat(document.getElementById("where.x.ends").value);
	var incrementsBy = parseFloat(document.getElementById("where.x.by").value);

	for (var x = startsAt; x < endsWith; x=x+incrementsBy) {
		var y = eval(expression);

		log("plot: " + x + ", " + y + "\n");

		var row = new Array();
		row.push(x);
		row.push(y);
		data.addRow(row);
	}

	drawChart(data);
}

function drawChart(data) {

	var chart = new google.visualization.LineChart(document
			.getElementById('plot_pane'));

	var options = {
		backgroundColor: { fill: '#B4A77A' },
		'title' : "Chart",
		'width' : '100%',
		'height' : '100%',
		is3D : true,
		vAxis : {
			title : data.getColumnLabel(1)
		},
		hAxis : {
			title : data.getColumnLabel(0)
		},
		explorer : {
			actions : [ 'dragToZoom', 'rightClickToReset' ]
		}
	};

	chart.draw(data, options);
}

function log(str) {
	var logId = document.getElementById("log-pane");
	logId.append(str);
	logId.append("/n");
}

function calcButton() {
	var expressionId = document.getElementById("expression");
	var tf = document.getElementById('result_pane');

	tf.value = eval(expressionId.value);
}