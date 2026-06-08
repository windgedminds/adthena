// App Bar — Notification panel toggle
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('demo-notif-btn');
  var panel = document.getElementById('demo-notif-panel');
  if (btn && panel) {
    btn.addEventListener('click', function() {
      var hidden = panel.hasAttribute('hidden');
      if (hidden) {
        panel.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('click', function(e) {
      if (!btn.contains(e.target) && !panel.contains(e.target)) {
        panel.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
