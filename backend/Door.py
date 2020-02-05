from enum import Enum
import time
import serial
import threading

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
    lockTimeout = 0

    def __init__(self, serialport):
        self.ser = serial.Serial(serialport, 9600)
        threading.Thread(target=self.watchLockStatus).start()

    def watchLockStatus(self):
        while True:
            if self.lockTimeout != 0:
                if time.time() > self.lockTimeout:
                    print("Auto lock timeout reached")
                    self.lock_control()
                else:
                    print("Auto lock in " + str(self.lockTimeout-time.time()) + " seconds")
            time.sleep(60)

    def lock_control(self):
        print("Lock")
        self.ser.write('0'.encode())
        self.state = State.NORMAL
        self.lockState = LockState.LOCKED
        # Clear auto lock timeout
        self.lockTimeout = 0

    def unlock_control(self):
        print("Unlock")
        self.ser.write('1'.encode())
        self.state = State.NORMAL
        self.lockState = LockState.UNLOCKED
        # Auto lock after 15 minutes
        self.lockTimeout = time.time() + (60*15)

    def enforce_state(self):
        if self.state == State.NORMAL:
            if self.lockState == LockState.UNLOCKED:
                self.unlock_control()
            elif self.lockState == LockState.LOCKED:
                self.lock_control()

    def timer(self, delay):
        print("Timer")
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
        print("Sweep")
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



