"use strict";

const BAD_CHARSET_RE = /charset\s*=\s*["']?MSWIN1253["']?/i;

function bytesFromBinaryString(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i) & 0xff;
  return bytes;
}

async function rawAsBinaryString(messageId) {
  const raw = await messenger.messages.getRaw(messageId, { data_format: "BinaryString" });
  if (typeof raw === "string") return raw;
  if (raw && typeof raw.arrayBuffer === "function") {
    const bytes = new Uint8Array(await raw.arrayBuffer());
    let out = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      out += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return out;
  }
  throw new Error("Unsupported raw message format");
}

function headerBodySplit(part) {
  const m = /\r?\n\r?\n/.exec(part);
  if (!m) return null;
  return { headers: part.slice(0, m.index), body: part.slice(m.index + m[0].length) };
}

function extractBoundary(topHeaders) {
  const unfolded = topHeaders.replace(/\r?\n[ \t]+/g, " ");
  const m = /Content-Type:\s*multipart\/[^;\r\n]+;[^\r\n]*boundary\s*=\s*(?:"([^"]+)"|([^;\s]+))/i.exec(unfolded);
  return m ? (m[1] || m[2]) : null;
}

function decodeBase64Windows1253(text) {
  const clean = text.replace(/\s+/g, "");
  if (!clean) throw new Error("Empty base64 body");
  const binary = atob(clean);
  return new TextDecoder("windows-1253").decode(bytesFromBinaryString(binary));
}

function extractFixedHtml(raw) {
  const top = headerBodySplit(raw);
  if (!top) return null;

  const boundary = extractBoundary(top.headers);
  if (!boundary) return null;

  // Split using the exact MIME boundary instead of guessing the next -- line.
  const delimiter = "--" + boundary;
  const parts = top.body.split(delimiter);

  for (const p of parts) {
    const trimmed = p.replace(/^\r?\n/, "").replace(/\r?\n--\r?\n?$/, "");
    const split = headerBodySplit(trimmed);
    if (!split) continue;

    const unfolded = split.headers.replace(/\r?\n[ \t]+/g, " ");
    if (!/^Content-Type:\s*text\/html\b/im.test(unfolded)) continue;
    if (!BAD_CHARSET_RE.test(unfolded)) continue;

    const cte = /Content-Transfer-Encoding:\s*([^\s;]+)/i.exec(unfolded)?.[1]?.toLowerCase() || "7bit";
    if (cte === "base64") return decodeBase64Windows1253(split.body);

    if (cte === "quoted-printable") {
      const qp = split.body
        .replace(/=\r?\n/g, "")
        .replace(/=([0-9A-F]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
      return new TextDecoder("windows-1253").decode(bytesFromBinaryString(qp));
    }

    return new TextDecoder("windows-1253").decode(bytesFromBinaryString(split.body));
  }
  return null;
}

async function sendWithRetries(tabId, html) {
  let lastError = null;
  for (let i = 0; i < 10; i++) {
    try {
      const reply = await messenger.tabs.sendMessage(tabId, { command: "mswin1253-apply", html });
      if (reply && reply.ok) return true;
    } catch (e) {
      lastError = e;
    }
    await new Promise(resolve => setTimeout(resolve, 150 + i * 100));
  }
  if (lastError) console.error("MSWIN1253 Greek Fix: could not reach display script", lastError);
  return false;
}

async function handleDisplayed(tab, message) {
  try {
    const raw = await rawAsBinaryString(message.id);
    if (!BAD_CHARSET_RE.test(raw)) return;
    const html = extractFixedHtml(raw);
    if (!html) {
      console.warn("MSWIN1253 Greek Fix: matching charset found, but HTML MIME part could not be decoded");
      return;
    }
    await sendWithRetries(tab.id, html);
  } catch (e) {
    console.error("MSWIN1253 Greek Fix", e);
  }
}

messenger.messageDisplayScripts.register({
  js: [{ file: "messageDisplay/fix.js" }],
  runAt: "document_start"
}).then(() => {
  messenger.messageDisplay.onMessageDisplayed.addListener(handleDisplayed);
}).catch(error => console.error("MSWIN1253 Greek Fix: registration failed", error));
