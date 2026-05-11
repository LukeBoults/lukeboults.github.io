// contact-form.js
(function () {
    const form = document.getElementById('contact-form-el');
    const statusEl = document.getElementById('contact-status');
    if (!form || !statusEl) return;

    function setStatus(msg, ok = true) {
        statusEl.textContent = msg;
        statusEl.classList.remove('success', 'error');
        statusEl.classList.add(ok ? 'success' : 'error');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        setStatus('Sending…', true);

        const endpoint = form.getAttribute('action');
        const data = Object.fromEntries(new FormData(form).entries());

        // Optional: label the source page in your inbox
        data._subject = `New message from ${data.name || 'Portfolio site'}`;

        // Disable button while sending
        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.disabled = true;

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form) // send as multipart/form-data per Formspree docs
            });

            if (res.ok) {
                form.reset();
                setStatus('Thanks! Your message has been sent :)', true);
            } else {
                // Try to read any error from Formspree
                let errText = 'Something went wrong. Please try again.';
                try {
                    const data = await res.json();
                    if (data?.errors?.length) errText = data.errors.map(e => e.message).join(', ');
                } catch { }
                setStatus(errText, false);
            }
        } catch (err) {
            setStatus('Network error. Please check your connection and try again.', false);
        } finally {
            if (btn) btn.disabled = false;
        }
    });
})();