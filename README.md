# Organization Description
Parkbench is a collection of software packages designed to supplement
[SecureDrop](https://securedrop.org) instances by providing advanced but low
cost monitoring and intrusion detection. The software contains four primary
components:

* gpgmailer - Sends signed encrypted email.
* torwatchdog - Monitors the availability status of a website over Tor.
* watchman - Monitors a physical location with a camera.
* netcheck - Maintains a valid Internet connection with multiple devices.

These programs are designed to work on Ubuntu Linux, the same Linux distribution
that SecureDrop uses. These programs are still in development and may not be
production-ready.

Parkbench software is not endorsed by the SecureDrop team or the Freedom of the
Press Foundation.

# Motivation
The [Freedom of the Press Foundation](https://freedom.press) has done a good job
of creating a secure reporting tool for anonymous whistleblowers and informants,
but good software security is not worth much if there is insufficient physical
security. Fortunately most SecureDrop instances exist in the server rooms of big
multimedia news corporations that (hopefully) already have good physical
security. But what do you do if you are not a big news corporation and want to
run a SecureDrop instance? That's where Parkbench can help.

When you are running a SecureDrop instance, you want to be notified if your
SecureDrop website stops working and you want to be notified if someone is
trying physically access your SecureDrop servers. This software, along with a
custom built server cabinet, can make it very hard for someone to take down or
physically access your SecureDrop instance without you knowing about it.

We initially developed these applications with the intention of providing better
physical security for our own SecureDrop instance. However we eventually elected
to cancel the SecureDrop portion of our project and to only focus on developing
the supporting monitoring and intrusion detection software.

# How it Works

## Server Monitoring
It is important to know if your SecureDrop instance stops running. torwatchdog
and gpgmailer can be used together to provide you with encrypted email
notifications if your SecureDrop instance goes down. It is recommended that you
install this monitoring software on several geographically diverse computers to
make it harder for adversaries effectively disable it.

## Intrusion Detection
It is critical for any SecureDrop instance to have excellent physical security.
watchman, netcheck, gpgmailer, and a custom server cabinet can be used together
to make it extremely difficult for someone to gain physical access to SecureDrop
servers and go undetected.

### Internet Connection Redundancy
Many security systems can be foiled by simply cutting off their connection the
Internet. Technically speaking, Parkbench is no different. However, what makes
the Parkbench intrusion detection system special is that it supports any number
of backup Internet connections and is designed to cycle through them quickly.
Any Internet connection supported by Ubuntu's Network Manager is supported.

### Cabinet Setup
When we still intended to actually create a SecureDrop instance, we created a
custom server cabinet to house our SecureDrop servers. For the cabinet, we used
a steal lockable cabinet and drilled holes (with a hole saw) so that the servers
could get access to electricity and wired Ethernet. On the doors of the cabinet,
we attached a staple safety hasp which allowed us to lock the cabinet with a
high security padlock.

The cabinet was intended to store the following:

* The SecureDrop Application Server
* The SecureDrop Monitor Server
* A pfSense Network Firewall integrated with or connected to a switch
* A WiFi capable third server for Parkbench monitoring software
* The Secure Viewing Station laptop when not in use
* Several other secure laptops to be used for system administration
* Multiple USB cellular hotspots for maintaining a connection to the Internet
* A USB webcam for filming intruders
* Lighting to improve images of intruders
* Other things we wanted to keep secure such as extra lock keys

The SecureDrop Application Server and SecureDrop Monitor are simply plugged
into the pfSense firewall switch. The Parkbench monitoring server should
be plugged into the pfSense firewall switch, the camera, and the USB hot
spots. Of course, the secure viewing station should never be plugged into
anything but power.

Within the cabinet, we attached the USB webcam to the top of the cabinet and
positioned the camera so that it would be pointing at the head of the person
opening the cabinet. We added permanent lighting in the cabinet to better light
any potential intruder. To make the cabinet less conspicuous, we affixed the
loop side of hook and loop tape to the inside of the seams of the cabinet doors.
This stopped most of the light from being visible from outside of the cabinet
when it was closed.

The watchman camera software is specifically programmed to allow for the user
to plug and unplug the USB camera at will. This allows for the camera to be
easily temporarily disabled so that an adversary cannot discretely use it to
their advantage. To help ensure the camera is plugged back in before the cabinet
is locked, we clip the USB-A end of the camera to the outside of the cabinet.
This way, if we try to close the cabinet without plugging camera back in, the
cabinet door will not shut.

#### Webcam Microphones
Most USB Webcams today have an integrated microphone. We recommend disabling
this microphone so that an adversary cannot use it to their advantage.
Unfortunately, simply removing the webcam microphone will likely render the
webcam completely inoperative. However, from our experience, if you simply
bridge the solder points where the microphone should be, the camera will work as
expected.

#### Side Channel Attacks
It is important to note that this setup might be vulnerable to several side
channel attacks:

* Power monitoring attack
* Electromagnetic attack
* Acoustic attack

When we were still committed to implementing a SecureDrop instance, we were
going to attempt to mitigate these attacks. We had acquired a power line
conditioner to attempt to mitigate the power monitoring attack. To mitigate the
acoustic attack, we planned to write a small computer program to produce low
volume static from the Parkbench monitoring server's speakers. To mitigate the
electromagnetic attack, we were going to try to attach metal screening to the
insides of the cabinet.

I cannot say for certain if any of these mitigation measures would have worked.
If you decide to implement these mitigations, please do your own research and
thoroughly test them.

# Detailed Project Descriptions

## [torwatchdog](https://github.com/park-bench/torwatchdog)
torwatchdog is a simple website availability monitor that runs over Tor. In
order to operate more inconspicuously, it checks for the specified website for
availability at random intervals. When the specified website's availability
changes, torwatchdog sends an encrypted email notification to a predefined list
of recipients.

## [watchman](https://github.com/park-bench/watchman)
watchman is a surveillance daemon that captures images of anything that moves
within a camera's field of vision. Those images are then sent in an encrypted
email to a predefined list of recipients.

## [gpgmailer](https://github.com/park-bench/gpgmailer)
gpgmailer is a daemon that sends signed encrypted emails to a predefined list
of recipients. Also included is a client library for queuing messages. Messages
support an unencrypted subject, a plain text encrypted body (as opposed to a
rich text encrypted body), and any number of encrypted attachments. gpgmailer
is required by torwatchdog and watchman.

## [netcheck](https://github.com/park-bench/netcheck)
netcheck is a daemon that works hard at keeping the Parkbench monitoring server
connected to the Internet. It supports any number of Internet connections. Any
device supported by Ubuntu's Network Manager is supported. If an Internet
connection goes down, netcheck quickly switches to a backup. If all the backups
are exhausted, netcheck keeps cycling through devices until an Internet
connection is established.

## [parkbench-commmon](https://github.com/park-bench/parkbench-common)
parkbench-common is a collection of helper modules used by all other Parkbench
projects. Currently contains code responsible for configuration file parsing,
daemonization, and interprocess communication.

# Build/Install Instructions
All Parkbench projects depend on Ubuntu Linux 18.04 LTS and are installed via
the Apt packing system. Each package can be built in any order, but
parkbench-common must be installed first, followed by gpgmailer (if required),
and then either netcheck, torwatchdog, or watchman. Each of these projects have
more detailed build and install instructions on their respective project pages.

# Contact
We would love to know if you are using any of these projects. Even one user is
a strong motivator for us, so please contact us with any questions or comments,
either through GitHub or email.

* eviljoel: eviljoel (at) linux (dot) com,
  PGP fingerprint: A2BE 2D12 24D1 67CA 8830  DDE7 DFB3 676B 196D 6430

# License
Parkbench software projects are all licensed under the [GNU General Public
License version 3](https://www.gnu.org/licenses/gpl-3.0.en.html). This
description project is licensed under the [Creative Commons
Attribution-ShareAlike 4.0
International](https://creativecommons.org/licenses/by-sa/4.0/) license.

# Special Thanks
We'd like to thank to the now defunct [CivicLab](http://www.civiclab.us/) and
it former operators, Benjamin Sugar and [Tom Tresser](http://www.tresser.com/).
CivicLab provided some early support for our project by providing regular
meeting and storage space.

Mr. Tresser is an especially vocal community activist. As a thank you to him, we
would like to bring your attention to his book,
[Chicago Is Not Broke](http://wearenotbroke.org/).
