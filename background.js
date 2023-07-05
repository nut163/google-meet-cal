```javascript
let meetEndTime;
let calendarEventId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'updateEndTime') {
    meetEndTime = request.time;
    calendarEventId = request.eventId;
    chrome.action.setPopup({popup: 'popup.html'}, () => {
      chrome.action.openPopup();
    });
  } else if (request.message === 'confirmEndTime') {
    updateCalendarEvent();
  }
});

function updateCalendarEvent() {
  fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${calendarEventId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      end: {
        dateTime: meetEndTime
      }
    })
  }).then(response => {
    if (response.ok) {
      chrome.action.setPopup({popup: ''});
    } else {
      console.error('Failed to update calendar event');
    }
  });
}
```