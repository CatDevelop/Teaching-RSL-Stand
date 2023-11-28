import base64
import datetime
import json
import logging
import os

from collections import deque
from concurrent.futures import ThreadPoolExecutor
from queue import Queue
from threading import Thread
import cv2
import numpy as np
import socketio
from flask import Flask
from model import Predictor


os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

sio = socketio.Server(cors_allowed_origins="*", async_mode="threading")
app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

CONFIG_PATH = "config.json"
SAMPLE_LENGTH = 32
INVERT = False

frame_queue = deque(maxlen=32)
sign_res = []
room_id = 0
users = {}
model = None


def init_model(config_path):
    try:
        with open('config.json', "r") as read_content:
            config = json.load(read_content)
    except FileNotFoundError:
        raise FileNotFoundError(f"Configuration file not found at path: {config_path}")
    except json.JSONDecodeError:
        raise ValueError(f"Error decoding the configuration file: {config_path}")
    try:
        model = Predictor(config)
        return model
    except KeyError as e:
        raise KeyError(f"Missing key in configuration file: {e}")
    except ValueError as e:
        raise ValueError(f"Error creating Predictor configuration: {e}")


def inference(model, frame_queue, result_queue, sid):
    global args, users

    while True:
        if users[sid][3]:
            users.pop(sid, None)
            break

        if len(frame_queue) >= args["sample_length"]:
            cur_windows = list(frame_queue)
        else:
            continue

        results = model.predict(cur_windows)
        if results:
            result_queue.put(results)
            print(datetime.datetime.now(), results)
            if results['labels'][0] != 'нет жеста':
            	sio.emit("send_not_normalize_text", json.dumps(results['labels']), room=sid)


def main():
    global frame_queue, model
    model = init_model('config.json')
    cam_disp = {'cam': None}
    with ThreadPoolExecutor(max_workers=2) as executor:
        executor.submit(create_server)

    while True:
        if cam_disp['cam'] is not None:
            cv2.imshow('cam', cam_disp['cam'])

        if cv2.waitKey(1) == ord('q'):
            break

@sio.event
def connect(sid, environ):
    global room_id, users, model
    print("Client connected:", sid)

    room_id = sid

    if sid not in users.keys():
        users[sid] = []
        users[sid].append(deque(maxlen=32))
        users[sid].append(Queue(maxsize=100))
        users[sid].append(Thread(target=inference, args=(model, users[sid][0], users[sid][1], sid), daemon=True))
        users[sid].append(False)
        users[sid][2].start()


@sio.event
def disconnect(sid):
    global room_id, users, model
    print("Client disconnected:", sid)
    users[sid][0].clear()
    users[sid][3] = True


# Socket.IO event handler: Received video frame data from the client
@sio.on("data")
def data(sid, data):
    global users
    image_data = data.split(",")[1]
    image_bytes = base64.b64decode(image_data)
    frame = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(frame, -1)
    # if camera rotated to 180 degrees
    if args["invert"]:
        image = cv2.rotate(image, cv2.ROTATE_180)
    users[sid][0].append(np.array(image[:, :, ::-1]))


def create_server():
#     webbrowser.open("https://pincode-project-localhost.netlify.app")
    app.run(host="0.0.0.0")


if __name__ == '__main__':
    main()