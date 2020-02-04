from enum import Enum
import time
import serial


class State(Enum):
    NORMAL = 0
    TIMER = 1
    SWEEP = 2


class LockState(Enum):
    MYSTERY = -1
    UNLOCKED = 0
    LOCKED = 1


class Door:
    state = State.NORMAL
    lockState = LockState.MYSTERY

    def __init__(self, serialport):
        self.ser = serial.Serial(serialport, 9600)

    def lock_control(self):
        self.ser.write('0'.encode())
        self.lockState = LockState.LOCKED

    def unlock_control(self):
        self.ser.write('1'.encode())
        self.lockState = LockState.UNLOCKED

    def enforce_state(self):
        if self.state == State.NORMAL:
            if self.lockState == LockState.UNLOCKED:
                self.unlock_control()
            elif self.lockState == LockState.LOCKED:
                self.lock_control()

    def lock(self):
        self.state = State.NORMAL
        self.lock_control()

    def unlock(self):
        self.state = State.NORMAL
        self.unlock_control()

    def timer(self, delay):
        if self.state == State.TIMER:  # Check if in timer state. If so, cancel it.
            self.state = State.NORMAL
            return
        self.state = State.TIMER
        self.unlock_control()
        time.sleep(delay)
        if self.state == State.TIMER:
            self.lock_control()
            self.state = State.NORMAL

    def sweep(self, iterations):
        if self.state == State.SWEEP:  # Check if in sweep state. If so, cancel it.
            self.state = State.NORMAL
            return
        self.state = State.SWEEP
        while self.state == State.SWEEP:
            for i in range(0, iterations):
                self.unlock_control()
                time.sleep(3)
                self.lock_control()
                time.sleep(3)
            self.state = State.NORMAL
