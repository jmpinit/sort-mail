# sort-mail

__DEAD PROJECT!__

_Purpose_: Instantly show what needs to be done to a piece of mail for it to be correctly sorted.

_Method_: OCR a frame of video from a webcam and then fuzzy-search a list of names of people. Upon finding a match with high enough confidence, display where the person's mail should go. Only running a portion of a frame of video through OCR is currently implemented.

_Why Dead_: In testing, Tesseract gave very poor results most of the time. It seems that images from a webcam are not of high enough quality for the OCR to work well. And background imagery confuses Tesseract. Also, holding the mail items in the right position for the text to be visible, flat, and in-focus is very difficult. All-together, manually typing in the name is much faster.

## Prerequisites

You will need [Leiningen][1] 1.7.0 or above installed.

[1]: https://github.com/technomancy/leiningen

## Running

To start a web server for the application, run:

    lein ring server
