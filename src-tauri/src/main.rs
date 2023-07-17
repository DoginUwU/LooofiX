// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{AppHandle, WindowBuilder, WindowUrl, Manager};

#[tauri::command]
async fn open_settings(app: AppHandle) -> Result<(), String> {
    let window = WindowBuilder::new(&app, "settings", WindowUrl::App("settings".into()))
        .title("Settings")
        .resizable(false)
        .transparent(true)
        .decorations(false)
        .build()
        .expect("failed to create window");

    window.show().unwrap();

    Ok(())
}

#[tauri::command]
async fn sync(app: AppHandle, win_id: &str, fn_name: &str, args: Vec<String>) -> Result<(), String> {
    println!("Javascript function called: {} {:?}", fn_name, args);

    app.emit_all("sync-internal", (win_id, fn_name, args)).unwrap();

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![open_settings, sync])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
