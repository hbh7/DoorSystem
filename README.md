# DoorSystem
Code to make a "smart" door locking system that you can use to unlock your door with your phone, as well as see the current weather conditions.

Designed by [hbh7](http://github.com/hbh7) and [alexboz](http://github.com/alexboz)

Features include:
- Non-intrusive design that doesn't require any modifications to the door itself. Perfect for dorms, apartments, and rentals. 
- Minimal hardware requirements - all you need is a Raspberry Pi, Arduino, and a servo. Optionally, you can get POE to USB adapters for long range power like as seen in the pictures. V3 also used a breadboard and capacitors to smooth out some voltage drop issues. You can also get the camera module and 3.5" touch screen for full functionality. 
- Peephole camera that can be broadcast over the network for remote viewing.
- Automatic unlocking followed by relocking after 15s using the timer button. 
- Background color shifts throughout the day to simulate day/night.
- Servo is disabled when the door is locked so that it can still be manually operated using the key, otherwise the servo would probably overpower your attempts.  

Potential areas of improvement:
- Convert 4th button to a camera viewer
- Run the servo closer to 7v instead of 5v for better performance.
- Single power cord option with a better POE adapter.
- Proper cases for everything to contain hardware and manage wires better.

Touch screen and web UI:
![Touch screen and web UI](/images/ui.png)

Implementation v3:
![Implementation 3](/images/v3.jpg)

Implementation v2:
![Implementation 2](/images/v2.jpg)

Implementation v1:
![Implementation 1](/images/v1.jpg)


## General setup directions
1. You'll want to acquire hardware and familiarize yourself with the software. The exact model of Pi, Arduino, servo, screen, camera, etc. does not matter.  
2. The Pi should run [doorlock-arduino-server.py](backend/doorlock-arduino-server.py) with Python 3, ideally started automatically with something like a systemd service. 
3. The Pi should also serve the html folder using a PHP-capable webserver like Apache. 
4. The Pi's desktop can be configured to automatically launch a fullscreen kiosk browser to the locally served files for display on the screen. This varies by desktop environment. 
5. The Arduino needs the code in [Arduino_Servo_Controller_Sketch.ino](Arduino_Servo_Controller_Sketch/Arduino_Servo_Controller_Sketch.ino) written to it. This enables serial communication to the Pi and drives the servo. Adjust the code as necessary to specify your servo pin and servo angle to match your door lock setup. This will take some trial and error. 
6. You'll also need to 3D model and print your own adapter to match your lock and servo. There are a bunch of examples in the [models](models) folder. 
7. For the webcam, I used https://github.com/jacksonliam/mjpg-streamer. You could use this, or a number of other libraries. This may vary based on your camera choice. 
8. Feel free to open an issue or something if you're having trouble. Good luck!