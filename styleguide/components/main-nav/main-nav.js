document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('main-nav-demo');
  if (!nav) return;
  nav.querySelectorAll('.main-nav__item[data-nav]').forEach(function(item) {
    item.addEventListener('click', function() {
      nav.querySelectorAll('.main-nav__item').forEach(function(i) { i.classList.remove('main-nav__item--active'); });
      item.classList.add('main-nav__item--active');
      var subitems = item.nextElementSibling;
      if (subitems && subitems.classList.contains('main-nav__subitems')) {
        var isOpen = subitems.style.display !== 'none';
        nav.querySelectorAll('.main-nav__subitems').forEach(function(s) { s.style.display = 'none'; });
        if (!isOpen) subitems.style.display = 'flex';
      } else {
        nav.querySelectorAll('.main-nav__subitems').forEach(function(s) { s.style.display = 'none'; });
      }
    });
  });
  nav.querySelectorAll('.main-nav__subitem').forEach(function(sub) {
    sub.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.querySelectorAll('.main-nav__subitem').forEach(function(s) { s.classList.remove('main-nav__subitem--active'); });
      sub.classList.add('main-nav__subitem--active');
    });
  });
});
