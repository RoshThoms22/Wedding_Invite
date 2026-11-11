(() => {
  const wedding = {
    title: 'Wedding of Rosh Thomas Kurian & Jeni Anna Lalu',
    start: '20270102T103000Z',
    end: '20270102T123000Z',
    location: 'St. Thomas Mar Thoma Church, Kozhencherry, Pathanamthitta, Kerala, India',
    details: 'With joyful hearts, Rosh and Jeni invite you to celebrate the beginning of their forever.'
  };
  const pageUrl = 'https://roshthoms22.github.io/Wedding_Invite/';
  const encode = encodeURIComponent;
  const google = new URL('https://calendar.google.com/calendar/render');
  google.searchParams.set('action', 'TEMPLATE');
  google.searchParams.set('text', wedding.title);
  google.searchParams.set('dates', `${wedding.start}/${wedding.end}`);
  google.searchParams.set('details', `${wedding.details}\n${pageUrl}`);
  google.searchParams.set('location', wedding.location);
  document.querySelector('#googleCalendar').href = google.toString();

  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Rosh and Jeni//Wedding Invitation//EN','BEGIN:VEVENT',`DTSTART:${wedding.start}`,`DTEND:${wedding.end}`,`SUMMARY:${wedding.title}`,`DESCRIPTION:${wedding.details} ${pageUrl}`,`LOCATION:${wedding.location}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  document.querySelector('#appleCalendar').href = `data:text/calendar;charset=utf-8,${encode(ics)}`;

  const shareText = `Rosh & Jeni are getting married! 💍\n2 January 2027 · 4:00 PM\nSt. Thomas Mar Thoma Church, Kozhencherry\n\nOpen our invitation: ${pageUrl}`;
  const whatsappTarget = INVITATION.whatsappNumber ? `https://wa.me/${INVITATION.whatsappNumber}` : 'https://wa.me/';
  document.querySelector('#whatsappShare').href = `${whatsappTarget}?text=${encode(shareText)}`;

  const form = document.querySelector('#rsvpForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const attendance = data.get('attendance');
    const guests = data.get('guests');
    const note = data.get('note')?.trim();
    const response = `Wedding RSVP — Rosh & Jeni\nName: ${name}\nResponse: ${attendance}\nGuests: ${guests}${note ? `\nMessage: ${note}` : ''}`;
    localStorage.setItem('roshJeniRsvp', JSON.stringify({ name, attendance, guests, note }));
    document.querySelector('#rsvpStatus').textContent = 'Your response is ready to send in WhatsApp.';
    window.open(`${whatsappTarget}?text=${encode(response)}`, '_blank', 'noopener');
  });

  try {
    const saved = JSON.parse(localStorage.getItem('roshJeniRsvp'));
    if (saved?.name) {
      document.querySelector('#guestName').value = saved.name;
      document.querySelector('#guestCount').value = saved.guests || '1';
      document.querySelector('#guestNote').value = saved.note || '';
      const option = form.querySelector(`[name="attendance"][value="${CSS.escape(saved.attendance)}"]`);
      if (option) option.checked = true;
    }
  } catch (_) { /* Local storage is optional. */ }
})();
