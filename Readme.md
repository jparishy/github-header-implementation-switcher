# GitHub Header Implementation Switcher
# Google Chrome Extension

Allows you to use Ctrl+Cmd+Up (like in Xcode) to switch between header files (.h) and implementation files (.m, .mm, .c, .cpp).

If the file your viewing is "Test.h", the extension will do a HEAD on "Test.m", "Test.mm", "Test.c", "Test.cpp" until it finds one that exists and then redirects to that file (ie. if it finds Test.m it stops and shows it).