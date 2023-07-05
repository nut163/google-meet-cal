```javascript
document.addEventListener('DOMContentLoaded', function() {
    let confirmButton = document.getElementById('confirmEndTimeButton');
    let cancelButton = document.getElementById('cancelEndTimeButton');
    let endTimeInput = document.getElementById('endTimeInput');

    confirmButton.addEventListener('click', function() {
        let endTime = endTimeInput.value;
        chrome.runtime.sendMessage({message: 'confirmEndTime', meetEndTime: endTime}, function(response) {
            window.close();
        });
    });

    cancelButton.addEventListener('click', function() {
        window.close();
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'updateEndTime') {
        showEndTimeConfirmation(request.meetEndTime);
    }
});

function showEndTimeConfirmation(meetEndTime) {
    let endTimeInput = document.getElementById('endTimeInput');
    endTimeInput.value = meetEndTime;
}
```