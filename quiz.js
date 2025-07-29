document.getElementById('hustleForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const form = e.target;
  const formData = {
    age: form.age.value,
    time: form.time.value,
    interest: form.interest.value,
    zipcode: form.zipcode.value,
    city: '', // optional: add client-side lookup
    region: '', // optional: add client-side lookup
  };

  try {
    const res = await fetch('/api/refine-hustles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    const results = document.getElementById('results');
    results.innerHTML = `<h2>Side Hustle Ideas:</h2><ul>${data.ideas.map(idea => `<li>${idea}</li>`).join('')}</ul>`;
  } catch (err) {
    console.error(err);
    document.getElementById('results').innerHTML = "⚠️ Something went wrong. Try again.";
  }
});
