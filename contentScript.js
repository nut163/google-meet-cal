```javascript
let meetEndTime;
let calendarEventId;

function detectMeetExit() {
    let meetUrl = window.location.href;
    if (!meetUrl.includes('meet.google.com')) {
        return;
    }

    window.addEventListener('beforeunload', function () {
        meetEndTime = new Date().toISOString();
        chrome.runtime.sendMessage({ message: 'updateEndTime', meetEndTime: meetEndTime, calendarEventId: calendarEventId });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getCalendarEventId') {
        calendarEventId = request.calendarEventId;
    }
});

detectMeetExit();
```