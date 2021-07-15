//Travelling salesman using genetic algorithm
var cities = [];
var totalCities = 12;
var populationSize = 500;
var population = [];
var fitness = [];
var recordDistance = Infinity;
var bestest;
var curBest;
var sequence = [];
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < totalCities; i++)
  {
      var v = createVector(random(width), random(height / 2));
      cities[i] = v;
      sequence[i] = i;
  }

  for (var i = 0; i < populationSize; i++)
  {
    population[i] = shuffle(sequence);
  }
}

function draw() 
{
  background(0);

  // Genetic Algorithm
  calcFitness();
  normalizeFitness();
  nextGeneration();

  // Printing the city dots for result
  fill(255);
  for (var i = 0; i < sequence.length; i++)
  {
    ellipse (cities[i].x, cities[i].y, 8, 8);
  }

  // Printing the city path for result
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < bestest.length; i++)
  {
    var n = bestest[i];
    vertex (cities[n].x, cities[n].y);
  }
  endShape();

  //Current
  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (var i = 0; i < curBest.length; i++)
  {
    var n = curBest[i];
    vertex (cities[n].x, cities[n].y);
  }
  endShape();
}

function swap(a, i, j)
{ 
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, sequence)
{
  var sum = 0;
  for (var i = 0; i < sequence.length - 1; i++)
  {
    var cityAIndex = sequence[i];
    var cityA = points[cityAIndex];
    var cityBIndex = sequence[i+1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

