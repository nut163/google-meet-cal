```javascript
// Default user settings
const defaultUserSettings = {
  autoUpdateTime: false,
};

// Load user settings from Chrome Storage
function loadUserSettings() {
  chrome.storage.sync.get('userSettings', (data) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    const userSettings = data.userSettings || defaultUserSettings;
    document.getElementById('autoUpdateTime').checked = userSettings.autoUpdateTime;
  });
}

// Save user settings to Chrome Storage
function saveUserSettings() {
  const userSettings = {
    autoUpdateTime: document.getElementById('autoUpdateTime').checked,
  };

  chrome.storage.sync.set({ userSettings }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    console.log('User settings saved.');
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadUserSettings);
document.getElementById('saveButton').addEventListener('click', saveUserSettings);
```