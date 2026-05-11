// blog-publisher.js
(function publishBlogSummaries() {
    const slugify = (s) => (s || '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const cards = Array.from(document.querySelectorAll('.post-card'));
    if (!cards.length) return;

    const summaries = cards.map(card => {
        const titleEl = card.querySelector('.post-title');
        const dateEl = card.querySelector('.post-date');
        const tagEl = card.querySelector('.post-tag');
        const thumbEl = card.querySelector('.post-thumb img');
        const excerptEl = card.querySelector('.post-excerpt');

        const title = titleEl ? titleEl.textContent.trim() : '';
        const dateISO = (card.getAttribute('data-date')
            || (dateEl && (dateEl.getAttribute('data-date') || dateEl.getAttribute('datetime')))
            || (dateEl && dateEl.textContent.trim())) || '';
        const date = new Date(dateISO);
        const slug = slugify(title);
        const href = `blog.html#${slug}`;
        const pillClass = tagEl ? Array.from(tagEl.classList).find(c => /^pill-/.test(c)) : '';
        const thumb = thumbEl ? thumbEl.getAttribute('src') : '';
        const excerpt = excerptEl ? excerptEl.textContent.trim() : '';

        return {
            title, href, thumb, excerpt, pillClass,
            dateISO: isNaN(date) ? null : date.toISOString().slice(0, 10)
        };
    }).filter(p => p.title);

    summaries.sort((a, b) => (b.dateISO || '') < (a.dateISO || '') ? -1 : 1);

    try { localStorage.setItem('lb_blog_posts', JSON.stringify(summaries)); }
    catch (e) { console.warn('Unable to store blog summaries', e); }

    summaries.forEach(p => {
        const card = Array.from(document.querySelectorAll('.post-card'))
            .find(c => (c.querySelector('.post-title')?.textContent.trim() === p.title));
        if (card && !card.id) card.id = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    });
})();

(function () {
    const modal = document.getElementById('post-modal');
    const dialog = modal.querySelector('.modal-dialog');
    const content = modal.querySelector('.modal-content');
    let lastFocused = null;

    window.openPostModal = function (linkEl) {
        const card = linkEl.closest('.post-card');
        const full = card.querySelector('.full-post');
        if (!full) return;

        // Save focus and populate modal
        lastFocused = document.activeElement;
        content.innerHTML = full.innerHTML;

        // Show modal
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');

        // Focus first focusable (close button)
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn && closeBtn.focus();

        // Prevent background scroll
        document.documentElement.style.overflow = 'hidden';
    };

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        content.innerHTML = '';
        document.documentElement.style.overflow = '';
        // Restore focus
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    // Close on backdrop or close button
    modal.addEventListener('click', (e) => {
        if (e.target.matches('[data-close-modal], [data-close-modal] *')) {
            closeModal();
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // Trap focus (simple)
    modal.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const f = modal.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
})();
