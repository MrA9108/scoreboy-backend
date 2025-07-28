const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Match state
let matchState = {
  runs: 0,
  wickets: 0,
  balls: 0
};

// API endpoint to receive score
app.post('/api/updateScore', (req, res) => {
  const { score } = req.body;
  const cleanedScore = score.trim().toUpperCase();

  if (cleanedScore === 'X') {  // Treat 'X' as wicket
    matchState.wickets += 1;
  } else {
    const runValue = parseInt(cleanedScore);
    if (!isNaN(runValue)) {
      matchState.runs += runValue;
    }
  }

  matchState.balls += 1;

  // Calculate overs
  const overs = `${Math.floor(matchState.balls / 6)}.${matchState.balls % 6}`;

  // Log to CMD
  console.log(`Score received: ${score}`);
  console.log(`Updated → Runs: ${matchState.runs}, Wickets: ${matchState.wickets}, Balls: ${matchState.balls}`);

  res.json({
    runs: matchState.runs,
    wickets: matchState.wickets,
    overs: overs
  });
});

// Reset match data
app.post('/api/reset', (req, res) => {
  matchState.runs = 0;
  matchState.wickets = 0;
  matchState.balls = 0;

  console.log('✅ Backend match data reset');

  res.json({ message: 'Backend match data reset' });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
