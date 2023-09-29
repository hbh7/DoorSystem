#include <Servo.h>              //Servo library
 
Servo servo;        //initialize a servo object for the connected servo  
                
int angle = 0;    



void setup() {
  // put your setup code here, to run once:
  
  Serial.begin(9600);           // set up Serial library at 9600 bps
  while (!Serial) {
  ; // wait for serial port to connect. Needed for native USB port only
  }
  Serial.setTimeout(100);
  pinMode(LED_BUILTIN, OUTPUT);
  enableServo();
  closeDoor();
  disableServo();
}

void loop() {

  if (Serial.available() > 0) {
    // read the incoming byte:
    Serial.setTimeout(100);
    int incomingNumber = Serial.parseInt();
    Serial.setTimeout(10);
    Serial.parseInt();

    enableServo();
    if(incomingNumber == 1) {
      openDoor();
    } else {
      closeDoor();
    }
  }
}

void enableServo() {
  servo.attach(9);
  delay(10);
}

void disableServo() {
  servo.detach();
}

void openDoor() {
  Serial.println("Opening door");
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
  servo.write(80);
  delay(1500);
}


void closeDoor() {
  Serial.println("Closing door");
  digitalWrite(LED_BUILTIN, LOW);   // turn the LED on (HIGH is the voltage level)
  servo.write(180);
  delay(1500);
  disableServo();
}
