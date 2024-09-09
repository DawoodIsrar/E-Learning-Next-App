Root Directory Overview

Within the root directory, you'll find the following folders:

APIs:
This folder houses utility functions used to make API calls throughout the entire application.

Assets:
The Assets folder contains various resources such as images, icons, and more.

Components:
Here, you'll discover reusable components that are utilized throughout the application.

Contexts:
Instead of Redux, we rely on the Context API to manage global state.

Pages:
The Pages folder encompasses all individual pages, each with a unique URL.

SCSS:
SCSS files specific to pages are stored in this directory (reusable components have their own separate CSS files).

Utils:
Utils contains helpful functions that are utilized throughout the application.

Authentication:
For authentication, we utilize the 'next-auth' package. (under the app/api/auth/[...nextauth]/route(utitlity to handle next auth))

Theme State Management:
We manage the application's theme state through the Context API.

Automatic Sitemap Generation:
We've set up functionality for automatic generation of the 'sitemap.xml' file after each deployment, which also includes dynamic 'sitemap' and 'robots.txt' files.

Error Pages
401 (in the pages folder),
404 (in the pages folder),
Fallback Error (incase app crashes, under the components folder),
403 (inside detail page we have 403 for restricted topics)