(function() {
    const cursorEl = document.getElementById('custom-cursor');
    const toggleEl = document.getElementById('cursor-toggle');

    let disabled = (localStorage.getItem('disableCursor') === 'true');
    let movingRight = false, currentX = 0, currentY = 0, targetX = 0, targetY = 0, prevX = 0;
    const smoothness = 0.05;

    // Initialize
    disabled ? disableCursor() : enableCursor();
    animate();

    // Toggle click
    toggleEl.addEventListener('click', (e) => {
        e.preventDefault();
        disabled ? enableCursor() : disableCursor();
    });

    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        if (!disabled) {
            movingRight = (e.pageX > prevX);
            prevX = e.pageX;
            targetX = e.clientX;
            targetY = e.clientY;
        }
    });

    // Cursor on/off
    function enableCursor() {
        disabled = false;
        localStorage.setItem('disableCursor', 'false');
        toggleEl.textContent = 'Disable Custom Cursor';
        cursorEl.style.display = '';
        currentX = targetX;
        currentY = targetY;
    }

    function disableCursor() {
        disabled = true;
        localStorage.setItem('disableCursor', 'true');
        toggleEl.textContent = 'Enable Custom Cursor';
        cursorEl.style.display = 'none';
    }

    // Animation loop
    function animate() {
        if (!disabled) {
            currentX += (targetX - currentX) * smoothness;
            currentY += (targetY - currentY) * smoothness;
            cursorEl.style.left = (movingRight ? currentX - cursorEl.width : currentX) + 'px';
            cursorEl.style.transform = 'scaleX(' + (movingRight ? -1 : 1) + ')';
            cursorEl.style.top = (currentY - (cursorEl.height / 2)) + 'px';
        }
        requestAnimationFrame(animate);
    }
})();
