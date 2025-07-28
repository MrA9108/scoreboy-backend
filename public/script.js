async function submitScore() {
  const scoreInput = document.getElementById('scoreInput');
  const score = scoreInput.value.trim().toUpperCase();

  // Validate input: 0-6 or X
  if (!/^[0-6X]$/.test(score)) {
    alert('Please enter a valid score: 0-6 or X');
    scoreInput.value = '';
    scoreInput.focus();
    return;
  }

  try {
    const response = await fetch('/api/updateScore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    });

    const res = await response.json();

    // Update display
    document.getElementById('runsDisplay').innerText = `Runs: ${res.runs}`;
    document.getElementById('wicketsDisplay').innerText = `Wickets: ${res.wickets}`;
    document.getElementById('oversDisplay').innerText = `Overs: ${res.overs}`;

    // Clear input and focus
    scoreInput.value = '';
    scoreInput.focus();

  } catch (error) {
    alert('Error sending score to server.');
    console.error(error);
  }
}
function resetMatch() {
  fetch('/api/reset', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message); // Shows: "Backend match data reset"
  })
  .catch(error => {
    console.error('Error resetting match:', error);
  });
}

