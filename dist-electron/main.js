import { app as s, ipcMain as d, BrowserWindow as l } from "electron";
import { fileURLToPath as f } from "node:url";
import a from "node:path";
import { createRequire as m } from "node:module";
const { autoUpdater: n } = m(import.meta.url)("electron-updater");
function v(r) {
  n.autoDownload = !1, n.disableWebInstaller = !1, n.allowDowngrade = !1, n.on("checking-for-update", function() {
  }), n.on("update-available", (e) => {
    r.webContents.send("update-can-available", { update: !0, version: s.getVersion(), newVersion: e == null ? void 0 : e.version });
  }), n.on("update-not-available", (e) => {
    r.webContents.send("update-can-available", { update: !1, version: s.getVersion(), newVersion: e == null ? void 0 : e.version });
  }), d.handle("check-update", async () => {
    if (!s.isPackaged) {
      const e = new Error("The update feature is only available after the package.");
      return { message: e.message, error: e };
    }
    try {
      return await n.checkForUpdatesAndNotify();
    } catch (e) {
      return { message: "Network error", error: e };
    }
  }), d.handle("start-download", (e) => {
    R(
      (t, w) => {
        t ? e.sender.send("update-error", { message: t.message, error: t }) : e.sender.send("download-progress", w);
      },
      () => {
        e.sender.send("update-downloaded");
      }
    );
  }), d.handle("quit-and-install", () => {
    n.quitAndInstall(!1, !0);
  });
}
function R(r, e) {
  n.on("download-progress", (t) => r(null, t)), n.on("error", (t) => r(t, null)), n.on("update-downloaded", e), n.downloadUpdate();
}
const p = a.dirname(f(import.meta.url));
process.env.APP_ROOT = a.join(p, "..");
const i = process.env.VITE_DEV_SERVER_URL, b = a.join(process.env.APP_ROOT, "dist-electron"), c = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? a.join(process.env.APP_ROOT, "public") : c;
let o;
function u() {
  o = new l({
    icon: a.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: a.join(p, "preload.mjs")
    }
  }), v(o), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? o.loadURL(i) : o.loadFile(a.join(c, "index.html"));
}
s.on("window-all-closed", () => {
  process.platform !== "darwin" && (s.quit(), o = null);
});
s.on("activate", () => {
  l.getAllWindows().length === 0 && u();
});
s.whenReady().then(u);
export {
  b as MAIN_DIST,
  c as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
