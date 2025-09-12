Sidebar for NixOS to interact with Gemini CLI via local wrapper service.

Files:
- `main.py` — GTK sidebar app (calls http://localhost:3000/query)
- `icon.svg` — top-left icon
- `gemini_sidebar.desktop` — autostart file for the sidebar

Usage:
1. Ensure the wrapper service is running on http://localhost:3000
2. Run `python3 main.py` to start the sidebar
3. To autostart on NixOS, place `gemini_sidebar.desktop` in `~/.config/autostart/` or add the service to your NixOS configuration.

Behavior:
- "Perform" mode: sends an instruction to the wrapper to execute. The sidebar will display only "done" after completion.
- "Explain" mode: requests an explanation; the sidebar displays Gemini's returned text.

Security:
- Do not expose the wrapper to untrusted networks. The sidebar posts to localhost only.

Notes:
- This is a minimal GTK implementation. It requires Python GTK bindings: `python3 -m pip install pygobject requests`.