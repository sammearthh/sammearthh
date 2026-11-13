// Add your portrait to this folder as profile.jpg.
const profilePhoto = 'profile.jpeg';
// Use a local video filename or a YouTube embed URL.
const introductionVideo = 'samarth-introduction.mp4';
// Add objects with title, url and takeaway for your five personal recommendations.
const recommendedTalks = [];

const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu +';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close -' : 'Menu +';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
const currentPage = location.pathname.split('/').pop() || 'index.html';
if (currentPage.startsWith('semester-')) {
  navigation.querySelector('a[href="journey.html"]').setAttribute('aria-current', 'page');
}
document.querySelectorAll('[data-profile]').forEach(photo => {
  photo.addEventListener('load', () => {
    photo.hidden = false;
    const fallback = photo.parentElement.querySelector('.portrait-fallback, .gallery-fallback');
    if (fallback) fallback.hidden = true;
  });
  photo.addEventListener('error', () => { photo.hidden = true; });
  if (profilePhoto) photo.src = profilePhoto;
});
const videoContainer = document.querySelector('#intro-video');
if (videoContainer && introductionVideo) {
  const isLocalVideo = /\.(mp4|webm|ogg)(?:[?#]|$)/i.test(introductionVideo);
  const player = document.createElement(isLocalVideo ? 'video' : 'iframe');
  player.src = introductionVideo;
  player.title = 'Samarth T - self-projection video';
  if (isLocalVideo) {
    player.controls = true;
    player.playsInline = true;
    player.preload = 'metadata';
    const download = document.createElement('a');
    download.href = introductionVideo;
    download.textContent = 'Open the introduction video';
    player.append(download);
  } else {
    player.allowFullscreen = true;
    player.loading = 'lazy';
  }
  videoContainer.replaceChildren(player);
}
const recommendationContainer = document.querySelector('#recommendations');
if (recommendationContainer && recommendedTalks.length) {
  recommendationContainer.replaceChildren();
  recommendedTalks.forEach(talk => {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.className = 'text-link';
    link.textContent = talk.title;
    link.href = talk.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    const takeaway = document.createElement('p');
    takeaway.textContent = talk.takeaway;
    article.append(link, takeaway);
    recommendationContainer.append(article);
  });
}
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-module]').forEach(group => {
      group.hidden = filter !== 'all' && group.dataset.module !== filter;
    });
  });
});
