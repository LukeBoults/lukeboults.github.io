// whatsnew-loader.js
(function loadWhatsNew() {
    const container = document.querySelector('#whats-new-scroll .scroll-content');
    if (!container) return;

    // Tag -> accent color
    const ACCENTS = {
        'pill-dev': '#6aa9ff',
        'pill-tut': '#6aff9e',
        'pill-announce': '#ffc36a'
    };

    let posts = readFromLocal();
    if (posts.length) {
        render(posts);
    } else if (location.protocol.startsWith('http')) {
        // Hosted: try fetch fallback
        fetch('blog.html', { cache: 'no-store' })
            .then(r => r.text())
            .then(html => {
                posts = scrapeFromHtml(html);
                render(posts);
            })
            .catch(() => render([]));
    } else {
        // file:// and no local data
        render([]);
    }

    function readFromLocal() {
        try {
            const raw = localStorage.getItem('lb_blog_posts');
            const arr = raw ? JSON.parse(raw) : [];
            // newest first, take top 6 for a nicer loop
            arr.sort((a, b) => (b.dateISO || '') < (a.dateISO || '') ? -1 : 1);
            return arr.slice(0, 6);
        } catch { return []; }
    }

    function scrapeFromHtml(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const cards = Array.from(doc.querySelectorAll('.post-card'));
        const items = cards.map(card => {
            const title = card.querySelector('.post-title')?.textContent.trim() || '';
            const dateEl = card.querySelector('.post-date');
            const dateISO = card.getAttribute('data-date')
                || dateEl?.getAttribute('data-date')
                || dateEl?.getAttribute('datetime')
                || dateEl?.textContent?.trim() || '';
            const pillClass = card.querySelector('.post-tag')?.classList?.value?.split(' ').find(c => /^pill-/.test(c)) || '';
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
            return { title, href: `blog.html#${slug}`, pillClass, dateISO };
        }).filter(p => p.title);
        items.sort((a, b) => (b.dateISO || '') < (a.dateISO || '') ? -1 : 1);
        return items.slice(0, 6);
    }

    function render(arr) {
        if (!arr.length) {
            container.innerHTML = `<a href="blog.html" class="blog-btn">View blog updates →</a>`;
            return;
        }

        const rows = arr.map(p => {
            const accent = ACCENTS[p.pillClass] || 'transparent';
            const pillLabel = p.pillClass
                ? p.pillClass.replace('pill-', '').replace(/^\w/, c => c.toUpperCase())
                : '';
            const datePretty = p.dateISO
                ? new Date(p.dateISO).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                : '';

            return `
      <article class="post-card compact" style="--accent:${accent}">
        <div class="post-body">
          <h4 class="post-title"><a href="${p.href}">${p.title}</a></h4>
          <div class="post-meta">
            ${datePretty ? `<span class="post-date">${datePretty}</span>` : ''}
            ${pillLabel ? `<span class="post-tag ${p.pillClass}">${pillLabel}</span>` : ''}
          </div>
        </div>
      </article>
    `;
        }).join('');

        container.innerHTML = rows + rows; // duplicate for smooth loop
    }
})();