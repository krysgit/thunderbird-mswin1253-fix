"use strict";

function sanitizeAndReplace(html) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, "text/html");

  for (const node of parsed.querySelectorAll(
    "script, iframe, frame, frameset, object, embed, applet, form, input, button, textarea, select, option, base"
  )) {
    node.remove();
  }

  for (const el of parsed.querySelectorAll("*")) {
    for (const attr of [...el.attributes]) {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim();

      if (name.startsWith("on")) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (name === "style" && /(?:url\s*\(|expression\s*\()/i.test(value)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if ((name === "href" || name === "src" || name === "action") && /^\s*javascript:/i.test(value)) {
        el.removeAttribute(attr.name);
        continue;
      }
      if (name === "src" && /^https?:/i.test(value)) {
        el.removeAttribute(attr.name);
      }
    }

    if (el.tagName === "A") {
      const href = el.getAttribute("href");
      if (href && !/^(?:https?:|mailto:|#)/i.test(href)) el.removeAttribute("href");
      el.setAttribute("rel", "noopener noreferrer");
      el.setAttribute("target", "_blank");
    }
  }

  const fragment = document.createDocumentFragment();
  for (const node of [...parsed.body.childNodes]) {
    fragment.appendChild(document.importNode(node, true));
  }
  document.body.replaceChildren(fragment);
  document.documentElement.dataset.mswin1253Fixed = "true";
}

messenger.runtime.onMessage.addListener((msg) => {
  if (!msg || msg.command !== "mswin1253-apply" || typeof msg.html !== "string") return;
  try {
    sanitizeAndReplace(msg.html);
    return Promise.resolve({ ok: true });
  } catch (e) {
    console.error("MSWIN1253 Greek Fix display error", e);
    return Promise.resolve({ ok: false, error: String(e) });
  }
});
