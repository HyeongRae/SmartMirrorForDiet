Module.register('TTS-Test', {
    notificationReceived(notification) {
        if (notification === 'DOM_OBJECTS_CREATED') {
            this.sendNotification('MMM-TTS', 'test mother fucker');
        }
    }
});
