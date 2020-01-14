# Sanitization Exercise #1 - Basic data polishing

In this exercise we want to training to polish / slightly modify the received data to the format we want.

So we tolerate little errors without punishing the user with heavy error messages and take care about the correction ourselves.

## Add Basic Text Sanitization

* Add a textarea field "About me" to your registration form
    * use "aboutMe" as name for the HTML textarea
    * provide a label for the textarea
* Add a checkbox "Newsletter" to your form
    * use name "news" and set an value attribute "1" on the field (=> value="1")
* Add basic sanitization for all your received text fields
    * Trim & Normalize the email field
    * Trim the "aboutMe" text field
    * Convert the received value for the newsletter field to boolean

