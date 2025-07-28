const BASE_URL = 'https://scoreboy-backend.onrender.com';

async function submitScore() {
  const scoreInput = document.getElementById('scoreInput');
  const score = scoreInput.value.trim().toUpperCase();

  if (!/^[0-6X]$/.test(score)) {
    alert('Please enter a valid score: 0-6 or X');
    scoreInput.value = '';
    scoreInput.focus();
    return;
  }

  try {
    const response = await fetch('https://scoreboy-backend.onrender.com/api/updateScore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    });

    const res = await response.json();

    document.getElementById('runsDisplay').innerText = `Runs: ${res.runs}`;
    document.getElementById('wicketsDisplay').innerText = `Wickets: ${res.wickets}`;
    document.getElementById('oversDisplay').innerText = `Overs: ${res.overs}`;

    scoreInput.value = '';
    scoreInput.focus();

  } catch (error) {
    alert('Error sending score to server.');
    console.error(error);
  }
}

function resetMatch() {
  fetch('https://scoreboy-backend.onrender.com/api/updateScore', {
    method: 'POST'
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);

    document.getElementById('runsDisplay').innerText = 'Runs: 0';
    document.getElementById('wicketsDisplay').innerText = 'Wickets: 0';
    document.getElementById('oversDisplay').innerText = 'Overs: 0.0';
  })
  .catch(error => {
    console.error('Error resetting match:', error);
  });
}
