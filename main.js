function drawCanvas() {
	//alert("Enter drawCanvas");

	// Initialize canvas variables
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	var userShape;
	var userSize;

	// Get user parameters
	userShape = el("UserShape").value;
	userSize = parseInt(el("UserSize").value);
	ctx.fillStyle = el("UserColor").value;
	ctx.strokeStyle = el("UserColor").value;

	switch(userShape)
	{
		case "square":
			drawSquare(canvas, ctx, userSize);
			break;

		case "circle":
			drawCircle(canvas, ctx, userSize);
			break;

		case "triangle":
			drawTriangle(canvas, ctx, userSize);
			break;
	
		default:
			break;
	}
}

function drawSquare(canvas, ctx, size) {
	//alert("Enter drawSquare");

	var horizCnt = canvas.width / (size+10);
	var vertCnt = canvas.height / (size+10);
	var i, j;
	var xPos, yPos;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = (size+10) * i;
			yPos = (size+10) * j;
			ctx.fillRect(xPos, yPos, size, size);
		}
	}
}

function drawTriangle(canvas, ctx, size) {
	//alert("Enter drawTriangle");

	var horizCnt = canvas.width / size;
	var vertCnt = canvas.height / size;
	var i, j;
	var xPos, yPos;
	var coordText;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = size * i;
			yPos = size * j;
			ctx.beginPath();
			ctx.moveTo(xPos + (size * 0.5), yPos);	// Start at middle top
			ctx.lineTo(xPos, yPos + size);			// Draw to left bottom
			ctx.lineTo(xPos + size, yPos + size);	// Draw to right bottom
			ctx.lineTo(xPos + (size * 0.5), yPos);	// Draw back to middle top
			ctx.closePath();
			ctx.stroke();
			coordText = j.toString() + "," + i.toString();
			ctx.fillText(coordText, xPos + (size * 0.4), yPos + (size * 0.7));
		}
	}
}

function drawCircle(canvas, ctx, radius) {
	var diameter = radius * 2;
	var horizCnt = canvas.width / (diameter+10);
	var vertCnt = canvas.height / (diameter+10);
	var i, j;
	var xPos, yPos;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = radius + (diameter+10) * i;
			yPos = radius + (diameter+10) * j;
			ctx.beginPath();
			ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
}

function readImage() {
	//alert("Entered readImage");
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	if ( this.files && this.files[0] ) {
		var FR= new FileReader();
		FR.onload = function(e) {
		var img = new Image();
		img.addEventListener("load", function() {
			drawImage(canvas, ctx, img);
		});
		img.src = e.target.result;
		};
		FR.readAsDataURL( this.files[0] );
	}
}

function drawImage(canvas, ctx, img) {
	var horizCnt = canvas.width / img.width;
	var vertCnt = canvas.height / img.height;
	var i, j;
	var xPos, yPos;
	var coordText;

	for (j = 0; j < vertCnt; j++) {
		for (i = 0; i < horizCnt; i++) {
			xPos = img.width * i;
			yPos = img.height * j;
			ctx.save();
			//ctx.setTransform(1,0,0,1,0,0);
			ctx.translate( xPos + (0.5 * img.width), yPos + (0.5 * img.height));
			ctx.rotate(Math.PI/2);
			ctx.drawImage(img, xPos, yPos);

			ctx.strokeStyle = "red";
			coordText = j.toString() + "," + i.toString();
			ctx.fillText(coordText, xPos + (img.width * 0.4), yPos + (img.height * 0.7));

			ctx.restore();
		}
	}
}

function clearCanvas() {
	// Initialize canvas variables
	const canvas = el("MainCanvas");
	const ctx = canvas.getContext("2d");

	// clear
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function el(id) {return document.getElementById(id);}
