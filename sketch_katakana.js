var clicks = 0;
var timerValue = 0;
var value = 0;
var endclicks = 0;
var doublec = 0;
var movec = 0;
var ptimer;
var clicked = false, clickTimeout = 300;
var clicks2 = 0;
var doublec2 = 0;

// katakana
let table;
var r = 0;

var edpage = 0;
var page;

var raa = 0;
var raa2 = 0;
var raa3 = 0;

var cx = 0;
var cy = 0;
var cr = 0.3; // 0.2;

var points = 0;
var errors = 0;
var mx = 0;
var my = 0;

var coordinate_scale = 0.8;

var animatedraw = true;
var animatedrawout = animatedraw;
var animateonlyoneline = false;


function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  //table = loadTable('csv/hiragana1.csv', 'csv', 'header');
  table = loadTable('csv/kanji_v1.csv', 'csv', 'header');
  // table = loadTable('peruna2.csv', 'csv', 'header');
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");


}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  setInterval(timeIt, 100); // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG

  frameRate(60);

}

function draw() {


  //r = r + 1;
  if (animateonlyoneline) background(255);
  if (r < table.getRowCount() - 1) {

    page = int(table.getString(r, 1));
    while ((r < table.getRowCount() - 1 & (edpage == page)) & animatedrawout) {

      r++;


      page = int(table.getString(r, 1));

      var x0 = coordinate_scale * int(table.getString(r, 3));
      var y0 = coordinate_scale * int(table.getString(r, 4));
      var x1 = coordinate_scale * int(table.getString(r, 5));
      var y1 = coordinate_scale * int(table.getString(r, 6));
      var w0 = int(table.getString(r, 7));
      var r0 = int(table.getString(r, 9));
      var g0 = int(table.getString(r, 10));
      var b0 = int(table.getString(r, 11));

      strokeWeight(w0);

      let ra = randomGaussian() * 3 + 0.1; // random(-5, 6);
      let ra2 = randomGaussian() * 3 + 0.1; //random(-5, 6);
      let ra3 = randomGaussian() * 3 + 0.1; //random(-5, 6);

      raa = raa + ra;
      raa2 = raa2 + ra2;
      raa3 = raa3 + ra3;


      // moved to touch
      //cx = cx + randomGaussian() * cr; //random(-4,4);
      //cy = cy + randomGaussian() * cr; // random(-4,4);

      stroke(r0 + raa, g0 + raa2, b0 + raa3, 255);
      line(x0 + cx, y0 + cy, x1 + cx, y1 + cy);

      // if (edpage != page) 

      if (animatedraw) animatedrawout = !animatedrawout;

      mx = x1 + cx;
      my = y1 + cy;



    }
    if (edpage != page) {
      background(255);
      edpage = page;

      stroke(255, 0, 0);
      textSize(25);
      textAlign(CENTER, CENTER);
      strokeWeight(1);

      var yht = round(1000*int(points) /  (int(points) + int(errors)))/10;
      if (int(points)>0) text(yht + " %", width * 0.5, height - 60);

      // 0delayTime(1000);
    }
    // r++;
    if (animatedraw) animatedrawout = !animatedrawout;

  } else {
    // print("ready")
    r = 0;

    // load to arrays..
    // set some random values etc.


  }

  raa = 0;
  raa2 = 0;
  raa3 = 0;
  cx = 0;
  cy = 0;



  if (false) {
    background(value, 10, 10);
    rectMode(CENTER);
    fill(200, 60, 90);
    rect(width * 0.5, height * 0.5, 280, 72, 7);
    fill(0, 0, 100);
    textSize(27);
    textAlign(CENTER, CENTER);
    textFont('Avenir');
    let permin = round(clicks * 600 / timerValue);
    text('click: ' + clicks + " OR " + clicks2 + "TIME" + nfc(timerValue / 10, 1) + "\nperMin:" + permin, width * 0.5, height * 0.5 + 2);
    text('touch move: ' + movec, width * 0.5, height * 0.35 + 2);
    text('double: ' + doublec + " or " + doublec2, width * 0.5, height * 0.65 + 2);
    text('end: ' + endclicks, width * 0.5, height * 0.8 + 2);

  }
}

// TOUCH ------------------------------------------------------------
// full screen: https://editor.p5js.org/slow_izzm/sketches/lgzf4tJk6
function touchStarted() {
  let fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
  value = 0;
  if (ptimer == timerValue) {
    // double
    doublec = doublec + 1; //# // within selected time 0.1sec
  } else {
    clicks = clicks + 1;
  }
  // https://stackoverflow.com/questions/51144762/p5-js-mousepressed-works-but-doublepressed-doesnot
  ptimer = timerValue;
  if (!clicked) { //# https://stackoverflow.com/questions/51144762/p5-js-mousepressed-works-but-doublepressed-doesnot
    clicked = true;
    setTimeout(function () {
      if (clicked) {
        console.log("single click");
        clicked = false;
        //single ClickStuff
        clicks2 = clicks2 + 1;
      }
    }, clickTimeout);
  } else {
    clicked = false;
    console.log("double click");
    //double click Stuff
    doublec2 = doublec2 + 1;
  }
}

function touchEnded() {
  value = 50;
  // Clean code and post answer here: https://github.com/processing/p5.js/issues/1815

  // without this double clicks:
  if (event.type != 'mouseup') { // nicolasbaez commented 20 days ago at https://github.com/processing/p5.js/issues/1815
    //your code :)

    endclicks = endclicks + 1;
  }


}
// TOUCH MOVED ------------------------------------------------------
function touchMoved() {
  movec = movec + 1;

  cx = cx + randomGaussian() * cr; //random(-4,4);
  cy = cy + randomGaussian() * cr; // random(-4,4);

  if (((mouseX - mx) < 50) & (mouseY - my) < 50) {
    points = points + 1;
  } else {
    errors = errors + 1;
  }


}

// this function fires with any double click anywhere
//function doubleClicked() {
//	doublec = doublec + 1;
//}







function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function timeIt() {

  timerValue++;

}
/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function (event) {
  event.preventDefault();
};