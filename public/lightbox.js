const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const galleryLinks = document.querySelectorAll('.gallery-item');

galleryLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        lightboxImg.src = link.href;
        lightbox.style.display = 'flex';
    });
});

// Close on click outside or on Esc
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }
});
