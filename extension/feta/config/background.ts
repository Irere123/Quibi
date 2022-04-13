import { BrowserWindow, Menu, app, globalShortcut, ipcMain } from "electron";
import path from "path";
import serve from "electron-serve";
import { isLinux, isMac, isWin } from "./constants";
import { bWindowsType } from "./types";

let mainWindow: BrowserWindow;
let menu: Menu;
let splash: BrowserWindow;
export let bWindows: bWindowsType;

export const isProd = process.env.NODE_ENV === "production";
const instanceLock = app.requestSingleInstanceLock();
let shouldShowWindow = false;
let windowShowInterval: NodeJS.Timeout;
let skipUpdateTimeout: NodeJS.Timeout;

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    minWidth: 400,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: isLinux,
    show: false,
  });

  const port = process.argv[2];

  mainWindow.loadURL(
    isProd ? `app://./home.html` : `http://localhost:${port}/home`
  );

  bWindows = {
    main: mainWindow,
    overlay: undefined,
  };

  mainWindow.once("ready-to-show", () => {
    shouldShowWindow = true;
  });

  mainWindow.on("closed", () => {
    globalShortcut.unregisterAll();
    if (bWindows.overlay) {
      bWindows.overlay.destroy();
    }
    mainWindow.destroy();
  });

  ipcMain.on("@quibi/loaded", (event, doge) => {
    if (isMac) mainWindow.maximize();
  });
  ipcMain.on("@app/quit", (event, args) => {
    mainWindow.close();
  });

  ipcMain.on("@app/maximize", (event, args) => {
    if (isMac) {
      if (mainWindow.isFullScreenable()) {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    } else {
      if (mainWindow.maximizable) {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      }
    }
  });
  ipcMain.on("@app/minimize", (event, args) => {
    if (mainWindow.minimizable) {
      mainWindow.minimize();
    }
  });

  ipcMain.on("@app/hostPlatform", (event, args) => {
    event.sender.send("@app/hostPlatform", {
      isLinux,
      isMac,
      isWin,
    });
  });
}

function createSplashWindow() {
  splash = new BrowserWindow({
    width: 400,
    height: 410,
    transparent: true,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  splash.loadFile(
    path.join(__dirname, "../resources/splash/splash-screen.html")
  );
}

app.on("window-all-closed", async () => {
  app.quit();
});

if (!instanceLock) {
  if (process.env.hotReload) {
    app.relaunch();
  }
  app.quit();
} else {
  app.on("ready", () => {
    createSplashWindow();
    if (!isProd) startApp(splash);
    if (isLinux && isProd) {
      startApp(splash);
    }
  });
  app.on("second-instance", (event, argv, workingDirectory) => {
    if (mainWindow) {
      if (process.env.hotReload) return mainWindow.close();
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

function startApp(splash: BrowserWindow) {
  createMainWindow();

  if (skipUpdateTimeout) {
    clearTimeout(skipUpdateTimeout);
  }
  windowShowInterval = setInterval(() => {
    if (shouldShowWindow) {
      clearInterval(windowShowInterval);
      setTimeout(() => {
        splash.destroy();
        mainWindow.show();
      }, 1000);
    }
  }, 1500);
}
