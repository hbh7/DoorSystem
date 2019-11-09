from Door import *
from flask import Flask
import os

app = Flask(__name__)

door = None

def connect():
    global door
    doorPath = ""
    for f in os.listdir("/dev"):
        if "ttyACM" in f:
            doorPath = "/dev/" + f

    door = Door(doorPath)


@app.route('/lock')
def lock():
    try:
        door.lock_control()
        return "ok"
    except:
        connect()
        lock()


@app.route('/unlock')
def unlock():
    try:
        door.unlock_control()
        return "ok"
    except:
        connect()
        unlock()


@app.route('/sweep/<int:iterations>')
def sweep(iterations=10):
    door.sweep(iterations)
    return "ok"


@app.route('/timer/<float:delay>')
def timer(delay=10):
    door.timer(delay)
    return "ok"


@app.route('/state')
def state():
    return State(door.state).name
    return "ok"


@app.route('/lockstate')
def lock_state():
    return LockState(door.lockState).name
    return "ok"


@app.route('/')
def hello_world():
    return 'Hello World!'


connect()

app.run("0.0.0.0", 8080)
