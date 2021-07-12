//Reference : https://www.youtube.com/watch?v=9zfeTw-uFCw&list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV

function calcFitness()
{
    var curRec = Infinity;
    for (var i = 0; i < population.length; i++)
    {
        var d = calcDistance(cities, population[i]);
        if (d < recordDistance)
        {
            recordDistance = d;
            bestest = population[i];
        }
        if (d < curRec)
        {
            curRec = d;
            curBest = population[i];
        }
        fitness[i] = 1 / (d + 1);  // +1 for when/if d is zero
    }
}

function normalizeFitness()
{
    var sum = 0;
    for (var i = 0; i < fitness.length; i++)
    {
        sum += fitness[i];
    }
    for (var i = 0; i < fitness.length; i++)
    {
        fitness[i] = fitness[i] / sum;
    }
}

function nextGeneration()
{
    var newPopulation = [];
    for (var i = 0; i < population.length; i++) //for every member of the existing population make a new member of the new population
    {
        var sequenceA = pickOne(population, fitness);
        var sequenceB = pickOne(population, fitness);
        var sequence = crossOver(sequenceA, sequenceB);
        mutate(sequence, 0.01);
        newPopulation[i] = sequence;
    }
    population = newPopulation;
}

function pickOne(list, prob)
{
    var index = 0;
    var r = random(1);
    while(r > 0)
    {
        r = r- prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function crossOver(sequenceA, sequenceB)
{
    const start = floor(random(sequenceA.length));
    const end = floor(random(start + 1, sequenceA.length));
    const newSeq = sequenceA.slice(start, end);
    for (var i = 0; i < sequenceB.length; i++)
    {
        const city = sequenceB[i];
        if (!newSeq.includes(city))
        {
            newSeq.push(city);
        }
    }
    return newSeq;
}

function mutate(sequence, mutationRate)
{
    for (var i = 0; i < cities.length; i++)
    {
        if (random(1) < mutationRate)
        {
            var indexA = floor(random(sequence.length));
            var indexB = (indexA + 1) % totalCities;
            swap(sequence, indexA, indexB);
        }
    }
}