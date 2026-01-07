const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQJe5HECeF4aH4zQzMfrhHLMfMtXVLvkoKA-fsM1GtyQxcDzBdL8QRcTlq8Wy3_PlGz87IUe3IwrmSt/pub?gid=0&single=true&output=csv';

fetch(CSV_URL)
  .then(res => res.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1);

    rows.forEach(row => {
      const [date, dayType, start, end, confirmed, note] =
        row.split(',').map(v => v.replace(/"/g, '').trim());

      const div = document.createElement('div');

      // 休日
      if (dayType === 'holiday') {
        div.textContent = `🛌 ${date} 休日`;
      }
      // 出勤日
      else {
        const icon = confirmed === '1' ? '✅' : '⏳';
        const startTime = start || '--:--';
        const endTime = end || '--:--';

        div.textContent =
          `💼 ${date} ${icon} ${startTime}〜${endTime} ${note || ''}`;
      }

      document.getElementById('schedule').appendChild(div);
    });
  })
  .catch(err => {
    console.error('CSVの読み込みに失敗しました', err);
  });
