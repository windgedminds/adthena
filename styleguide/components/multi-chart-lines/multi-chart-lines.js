/**
 * Multi-Chart Lines  —  mclc
 * Draws smooth Catmull-Rom sparklines + gradient fills into .mclc__svg elements,
 * and wires up the hover dot / tooltip interaction.
 *
 * Usage
 * -----
 * Call mclcInit() after the DOM is ready, or import and call manually.
 * SVG elements are identified by the class .mclc__svg and driven by data attributes:
 *
 *   data-color   Hex colour for the line and gradient, e.g. "#6848c6"
 *   data-ymin    Minimum Y value (default: 0)
 *   data-ymax    Maximum Y value — should match the top y-axis label
 *   data-vals    Comma-separated normalised values 0–1, one per data point
 *   data-start   (optional) ISO date of first point, e.g. "2026-04-21"
 *                Each subsequent point is assumed to be +1 day.
 *                When present the tooltip shows "21 Apr, 2026 \n value"
 *
 * The function is idempotent — already-drawn SVGs are skipped on re-call.
 * Pass animate=true to run the left-to-right draw-on animation.
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Catmull-Rom → cubic bezier path
  // tension 0.35 gives a smooth but faithful curve through all data points
  // ---------------------------------------------------------------------------
  function smoothPath(vals) {
    var t = 0.35;
    var n = vals.length;
    // Map normalised values [0-1] onto a 100×100 viewBox
    var pts = vals.map(function (v, i) {
      return [i / (n - 1) * 100, (1 - v) * 100];
    });
    var d = 'M' + pts[0][0].toFixed(2) + ',' + pts[0][1].toFixed(2);
    for (var i = 0; i < n - 1; i++) {
      var p0 = pts[Math.max(0, i - 1)];
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var p3 = pts[Math.min(n - 1, i + 2)];
      d += ' C' + [
        p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t,
        p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t,
        p2[0], p2[1]
      ].map(function (x) { return x.toFixed(2); }).join(',');
    }
    return d;
  }

  // ---------------------------------------------------------------------------
  // Draw all undrawn .mclc__svg elements
  // ---------------------------------------------------------------------------
  function mclcDrawAll(animate) {
    document.querySelectorAll('.mclc__svg[data-vals]').forEach(function (svg, idx) {
      var alreadyDrawn = !!svg.querySelector('path');
      if (alreadyDrawn) {
        if (animate) mclcAnimate(svg, idx * 120);
        return;
      }

      var vals     = svg.dataset.vals.split(',').map(Number);
      var color    = svg.dataset.color || '#6848c6';
      var linePath = smoothPath(vals);
      var areaPath = linePath + ' L100,100 L0,100 Z';
      var gid      = 'mg' + Math.random().toString(36).slice(2, 8);

      svg.innerHTML =
        '<defs>' +
          '<linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0%"   stop-color="' + color + '" stop-opacity="0.22"/>' +
            '<stop offset="100%" stop-color="' + color + '" stop-opacity="0.02"/>' +
          '</linearGradient>' +
        '</defs>' +
        '<path d="' + areaPath + '" fill="url(#' + gid + ')" stroke="none"/>' +
        '<path d="' + linePath + '" fill="none" stroke="' + color + '"' +
             ' stroke-width="2.5" stroke-linecap="round"' +
             ' vector-effect="non-scaling-stroke"/>';

      initHover(svg);
      if (animate) mclcAnimate(svg, idx * 120);
    });
  }

  // ---------------------------------------------------------------------------
  // Left-to-right draw-on animation (clip rect expanding over 900ms)
  // ---------------------------------------------------------------------------
  function mclcAnimate(svg, delay) {
    var defs = svg.querySelector('defs');
    if (!defs) return;

    var clipId   = 'mclc-clip-' + Math.random().toString(36).slice(2, 7);
    var clipRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    clipRect.setAttribute('x', '-2');
    clipRect.setAttribute('y', '-20');
    clipRect.setAttribute('width', '0');
    clipRect.setAttribute('height', '140');

    var clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    clipPath.setAttribute('id', clipId);
    clipPath.appendChild(clipRect);
    defs.appendChild(clipPath);

    svg.querySelectorAll('path').forEach(function (p) {
      p.setAttribute('clip-path', 'url(#' + clipId + ')');
    });

    var duration = 900;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }

    setTimeout(function () {
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var t = Math.min((ts - start) / duration, 1);
        clipRect.setAttribute('width', (ease(t) * 105).toFixed(3));
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          svg.querySelectorAll('path').forEach(function (p) {
            p.removeAttribute('clip-path');
          });
          clipPath.remove();
        }
      }
      requestAnimationFrame(step);
    }, delay);
  }

  // ---------------------------------------------------------------------------
  // Hover dot + tooltip
  // Binary-search along the SVG path length to find the nearest point to
  // the cursor, then positions a dot and tooltip DOM element over it.
  // ---------------------------------------------------------------------------
  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function fmtDate(isoStr, offsetDays) {
    if (!isoStr) return '';
    var d = new Date(isoStr + 'T00:00:00');
    d.setDate(d.getDate() + offsetDays);
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ', ' + d.getFullYear();
  }

  function initHover(svg) {
    var wrap = svg.parentNode;
    if (!wrap) return;

    var color    = svg.dataset.color  || '#6848c6';
    var ymin     = parseFloat(svg.dataset.ymin  || '0');
    var ymax     = parseFloat(svg.dataset.ymax  || '100');
    var startStr = svg.dataset.start  || '';
    var nPts     = (svg.dataset.vals  || '').split(',').length || 30;
    var paths    = svg.querySelectorAll('path');
    var line     = paths[paths.length - 1]; // last path = stroke line
    if (!line) return;

    // Dot
    var dot = document.createElement('div');
    dot.className = 'mclc__hover-dot';
    dot.style.background = color;
    wrap.appendChild(dot);

    // Tooltip
    var tip = document.createElement('div');
    tip.className = 'mclc__hover-tooltip';
    wrap.appendChild(tip);

    var totalLen = line.getTotalLength();
    var vb       = svg.viewBox.baseVal;

    function positionAt(xFrac) {
      // Binary search for the path point whose x matches xFrac
      var lo = 0, hi = totalLen;
      for (var i = 0; i < 24; i++) {
        var mid = (lo + hi) / 2;
        if (line.getPointAtLength(mid).x / vb.width < xFrac) lo = mid; else hi = mid;
      }
      var pt    = line.getPointAtLength((lo + hi) / 2);
      var svgR  = svg.getBoundingClientRect();
      var wrapR = wrap.getBoundingClientRect();
      var domX  = (svgR.left - wrapR.left) + (pt.x / vb.width)  * svgR.width;
      var domY  = (svgR.top  - wrapR.top)  + (pt.y / vb.height) * svgR.height;

      dot.style.left = domX + 'px';
      dot.style.top  = domY + 'px';
      tip.style.left = domX + 'px';
      tip.style.top  = (domY - 8) + 'px';

      var val     = Math.round(ymin + (1 - pt.y / vb.height) * (ymax - ymin)).toLocaleString();
      var idx     = Math.round(xFrac * (nPts - 1));
      var dateStr = fmtDate(startStr, idx);

      tip.innerHTML = dateStr
        ? '<span style="display:block;font-weight:400;opacity:0.72;font-size:10px;line-height:1.3">'
            + dateStr + '</span>' + val
        : val;
    }

    wrap.addEventListener('mouseenter', function () {
      dot.style.opacity = '1';
      tip.style.opacity = '1';
    });
    wrap.addEventListener('mouseleave', function () {
      dot.style.opacity = '0';
      tip.style.opacity = '0';
    });
    wrap.addEventListener('mousemove', function (e) {
      var svgR = svg.getBoundingClientRect();
      positionAt(Math.max(0.01, Math.min(0.99, (e.clientX - svgR.left) / svgR.width)));
    });
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Draw all .mclc__svg elements on the page.
   * @param {boolean} [animate] - if true, play the left-to-right draw-on animation
   */
  function mclcInit(animate) {
    mclcDrawAll(animate);
  }

  // Auto-init with animation on DOMContentLoaded.
  // Remove / change the `true` argument if you prefer no animation on load.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { mclcInit(true); });
  } else {
    mclcInit(true);
  }

  // Expose for manual use
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { mclcInit: mclcInit };  // CommonJS / Node
  } else {
    window.mclcInit = mclcInit;               // browser global
  }

})();
