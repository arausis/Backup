from pynput import keyboard
import threading
import os
import time

ctrl_pressed = False
space_pressed = False

def run():
    os.system('bash ~/scripts/menu')

def on_key_press(key):
    global ctrl_pressed, space_pressed
    
    try:
        key_id = key.char
    except AttributeError:
        key_id = str(key)
    
    if key_id == 'Key.ctrl':
        ctrl_pressed = True
    elif key_id == 'Key.space':
        space_pressed = True
    else:
        ctrl_pressed = False
        space_pressed = False

    if ctrl_pressed and space_pressed:
        ctrl_pressed = False
        space_pressed = False
        x = threading.Thread(target=run)
        x.start()
        time.sleep(1)

def on_key_release(key):
    global ctrl_pressed, space_pressed

    try:
        key_id = key.char
    except AttributeError:
        key_id = str(key)
    
    if key_id == 'Key.ctrl_l':
        ctrl_pressed = False
    elif key_id == 'Key.space':
        space_pressed = False

# Create a keyboard listener
with keyboard.Listener(on_press=on_key_press, on_release=on_key_release) as listener:
    listener.join()
