const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJe5HECeF4aH4zQzMfrhHLMfMtXVLvkoKA-fsM1GtyQxcDzBdL8QRcTlq8Wy3_PlGz87IUe3IwrmSt/pub?gid=0&single=true&output=csv';

fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1);
    const today = new Date().toISOString().slice(0,10);

    rows.forEach(row => {
      const [date, dayType, start, end, confirmed, note] =
        row.split(',').map(v => v.replace(/"/g, ''));

      const div = document.createElement('div');

      if (dayType === 'holiday') {
        div.textContent = `🛌 ${date} 休日`;
      } else {
        const icon = confirmed === '1' ? '✅' : '⏳';
        div.textContent =
          `💼 ${date} ${icon} ${start || '--'}〜${end || '--'} ${note || ''}`;
      }

      document.getElementById('schedule').appendChild(div);
    });
  });
