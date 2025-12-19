class HintAssistant {
    constructor() {
        this.assistant = document.getElementById('hint-assistant');
        this.hintText = document.getElementById('hint-text');
        this.triggers = document.querySelectorAll('.hint-trigger');
        this.hideTimeout = null;
        
        this.init();
    }
    
    init() {
        // Add hover listeners to all trigger elements
        this.triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', (e) => this.showHint(e));
            trigger.addEventListener('mouseleave', () => this.scheduleHide());
        });
        
        // Keep hint visible when hovering over the assistant itself
        this.assistant.addEventListener('mouseenter', () => {
            clearTimeout(this.hideTimeout);
        });
        
        this.assistant.addEventListener('mouseleave', () => {
            this.scheduleHide();
        });
    }
    
    showHint(event) {
        clearTimeout(this.hideTimeout);
        
        const trigger = event.currentTarget;
        const hintMessage = trigger.getAttribute('data-hint');
        
        if (!hintMessage) return;
        
        this.hintText.textContent = hintMessage;
        this.assistant.classList.add('active');
    }
    
    scheduleHide() {
        this.hideTimeout = setTimeout(() => {
            this.assistant.classList.remove('active');
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.hintAssistant = new HintAssistant();
});
