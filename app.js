const express = require('express');
const { performance } = require('perf_hooks');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Listening on PORT: ', PORT);
});

app.post('/hanoi', (req, res) => {
    const startTime = performance.now();
    const solutionSteps = towerOfHanoi(req.body.numberOfDisks, 'A', 'C', 'B', []);
    const endTime = performance.now();
    
    res.json({
        numberOfSteps: solutionSteps.length, 
        millisecondsToSolve: endTime - startTime, 
        solutionSteps: solutionSteps
    });
});

function towerOfHanoi(n, source, target, auxiliary, steps) {
    if (n > 0) {
        // Move n - 1 disks from source to auxiliary, so they are out of the way
        towerOfHanoi(n - 1, source, auxiliary, target, steps);

        // Move the nth disk from source to target
        steps.push({disk: n, sourceRod: source, targetRod: target});

        // Move the n - 1 disks that we left on auxiliary to target
        towerOfHanoi(n - 1, auxiliary, target, source, steps);
    }
    return steps;
}