<<<<<<< HEAD
# Real Time Whiteboard (Currently in development process)
This is an online interactive whiteboard where users can draw shapes, write text etc and share their ideas with their friends in real time. 

- THIS REPO IS NOW OWNED BY SEC
=======
#Whiteboard App
An online collaborative whiteboard app which people can use to share ideas, tutor others etc. It enables users to write text, draw shapes,graphs etc and share their ideas with each other in real-time. We are using a JavaScript framework called Paper.js to build the main drawing tool in HTML5 Canvas and Firebase for the back-end. We initially intended to implement the drawing tool using raw JavaScript but we later realized that it would be very tedious to store what is being drawn on the canvas in the database. So we switched to Paper.js which uses segments to uniquely determine a curve. A segment is unique set of three points used by Paper.js. Any curve in Paper.js consists of a certain number of segments so we only have to store the segments in the Firebase database and push it back to the client and use the functions provided by Paper.js to redraw the curve.
>>>>>>> e317ecefaf2f06237e6347a4b9215da19ee64133
