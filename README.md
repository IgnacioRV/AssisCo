# AssisCo

This project is created with the aim to Control student's assistance to class, by providing each of them with a card that's read using an RFID reader set up on an Intel Edison Board (These boards would be distributed one in each class)

## Features

  - *RFID* - Low level javascript hack to read from cards that use RFID and generate a unique identifier for each student. 
  This ID is sent to a server along with the class identifier. 
  - *Led display controller* - For displaying the class name and current number of students
  - *Node.js server* To manage all the classes and the space available in each of them.
  - *User-friendly frontend* - So that both teachers and students can easily see the different classes and the number of sutdents in each.

## Installation

 - The Javascript code must be installed on an intel edison that´s connected to an RFID Reader and A LED Display (Probably you'll need to modify some of the controllers to your specific devices)
 - Once the script is installed the server will start running in the Intel Edison, access it on port 3000 and enjoy!
