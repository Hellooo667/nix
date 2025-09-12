#!/usr/bin/env python3
import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk, Gdk, GLib
import requests
import threading

WRAPPER_URL = 'http://localhost:3000/query'

class Sidebar(Gtk.Window):
    def __init__(self):
        super().__init__(title='Gemini Sidebar')
        self.set_default_size(320, 200)
        self.set_keep_above(True)
        self.set_decorated(False)
        self.set_type_hint(Gdk.WindowTypeHint.DOCK)
        # place the window at the top-right corner
        screen = Gdk.Screen.get_default()
        try:
            screen_width = screen.get_width()
        except Exception:
            # fallback if screen information isn't available
            screen_width = 800
        win_width = 320
        x = max(0, screen_width - win_width)
        self.move(x, 0)

        box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(box)

        header = Gtk.Box(spacing=6)
        box.pack_start(header, False, False, 6)

        self.mode_combo = Gtk.ComboBoxText()
        self.mode_combo.append_text('Perform')
        self.mode_combo.append_text('Explain')
        self.mode_combo.set_active(0)
        header.pack_start(self.mode_combo, False, False, 6)

        icon = Gtk.Image.new_from_file(GLib.build_filenamev([GLib.get_current_dir(), 'icon.svg']))
        # place icon at the right side of the header
        header.pack_end(icon, False, False, 6)

        self.entry = Gtk.Entry()
        self.entry.set_placeholder_text('Type a command or question...')
        box.pack_start(self.entry, False, False, 6)

        send_btn = Gtk.Button(label='Send')
        send_btn.connect('clicked', self.on_send)
        box.pack_start(send_btn, False, False, 6)

        self.output = Gtk.TextView()
        self.output.set_editable(False)
        box.pack_start(self.output, True, True, 6)

    def on_send(self, button):
        text = self.entry.get_text().strip()
        if not text:
            return
        mode = self.mode_combo.get_active_text()
        # run network call in background thread
        threading.Thread(target=self.query_wrapper, args=(text, mode), daemon=True).start()

    def query_wrapper(self, text, mode):
        payload = {'query': text, 'mode': mode}
        try:
            r = requests.post(WRAPPER_URL, json=payload, timeout=30)
            if r.status_code == 200:
                data = r.json()
                response = data.get('response', '')
            else:
                response = f'Error: {r.status_code}'
        except Exception as e:
            response = f'Error: {e}'

        # apply UI update on main thread
        GLib.idle_add(self.update_output, response, mode)

    def update_output(self, response, mode):
        buf = self.output.get_buffer()
        buf.set_text('')
        if mode == 'Perform':
            buf.set_text('done')
        else:
            buf.set_text(response)
        return False

if __name__ == '__main__':
    win = Sidebar()
    win.connect('destroy', Gtk.main_quit)
    win.show_all()
    Gtk.main()
