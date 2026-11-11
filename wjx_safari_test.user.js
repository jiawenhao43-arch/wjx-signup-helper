// ==UserScript==
// @name         问卷星 Safari 注入诊断（仅测试）
// @namespace    https://jiawenhao43-arch.github.io/wjx-signup-helper/
// @version      1.0.0
// @description  仅显示诊断条，不点击、填写或提交任何内容
// @match        https://www.wjx.top/*
// @match        https://wjx.top/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  if (window.__WJX_SAFARI_DIAGNOSTIC__) return;
  window.__WJX_SAFARI_DIAGNOSTIC__ = true;
  const t0 = new Date().toLocaleTimeString();
  const hashAtStart = location.hash.includes('wjxhelper=');
  function install() {
    if (!document.body) return false;
    let badge = document.getElementById('wjx-safari-diagnostic-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'wjx-safari-diagnostic-badge';
      badge.style.cssText = 'position:fixed!important;z-index:2147483647!important;left:10px!important;right:10px!important;bottom:12px!important;padding:12px 14px!important;background:#103e58!important;color:#fff!important;border:2px solid #6df0c5!important;border-radius:12px!important;font:14px/1.55 -apple-system,system-ui,sans-serif!important;box-shadow:0 4px 18px #0005!important;white-space:pre-wrap!important;';
      document.body.appendChild(badge);
    }
    badge.textContent = '✅ Safari Userscripts 注入成功（仅诊断）\n' +
      '启动时间：' + t0 + '\n' +
      '启动时参数：' + (hashAtStart ? '存在' : '不存在') + '\n' +
      '当前参数：' + (location.hash.includes('wjxhelper=') ? '存在' : '不存在') + '\n' +
      '不会报名或提交';
    return true;
  }
  if (!install()) {
    const onReady = () => { install(); document.removeEventListener('DOMContentLoaded', onReady); };
    document.addEventListener('DOMContentLoaded', onReady);
  }
  const interval = setInterval(() => { if (install()) clearInterval(interval); }, 250);
  setTimeout(() => clearInterval(interval), 10000);
  console.log('[Safari注入诊断] 脚本执行', {hashAtStart, urlPath:location.pathname});
})();
