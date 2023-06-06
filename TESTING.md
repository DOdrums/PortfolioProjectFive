<!-- TOC -->

- [Browser Testing](#browser-testing)
- [Device Testing](#device-testing)
- [Manual Testing](#manual-testing)
- [Bugs](#bugs)

<!-- /TOC -->

## Browser Testing

The project was tested extensively on Google Chrome and Safari browsers, where no browser compatibility issues came up.

## Device Testing

The project was tested on a multitude of devices: several iPhones, android phones, linux laptops and Macbook Pro. The website was properly responsive on all devices.

## Manual Testing

Though no automated tests were written for the front-end, a lot of manual testing has been done. Not every individual test has been written down, for example: when the Home page is able to list all songs and posts, it can be assumed the route works as well. This doesn't mean the route wasn't initially tested, just that it wasn't documented.

| Page        | Action   | Expected Result                              | Pass/Fail |
| ----------- | -------- | -------------------------------------------- | --------- |
| Login       | Login    | Login the user or give proper errors         | Pass      |
| Login       | Logout   | Logout the user or give proper errors        | Pass      |
| Home        | List     | List all songs and posts                     | Pass      |
| Wall        | List     | List all songs and post of followed profiles | Pass      |
| Mic'd       | List     | List all Mic'd songs                         | Pass      |
| Profile     | Detail   | Show profile data                            | Pass      |
| Profile     | Edit     | Edit personal info                           | Pass      |
| Profile     | Edit     | Edit personal instrument                     | Pass      |
| Profile     | Edit     | Edit personal username                       | Pass      |
| Profile     | Edit     | Edit personal password                       | Pass      |
| Post create | Create   | Create and post a post                       | Pass      |
| Post create | Validate | All necessary validation errors are given    | Pass      |
| Song create | Create   | Create and post a song                       | Pass      |
| Song create | Validate | All necessary validation errors are given    | Pass      |
| Home/Wall   | Mic      | Mic a song                                   | Pass      |
| Home/Wall   | Like     | Like a post                                  | Pass      |
| Home/Wall   | Comment  | Comment on a post or song                    | Pass      |

## Bugs

- CORS problems: there were multiple ocasions in which CORS issues were encountered. The first was because of a simple spelling mistake in the backend: `CORS_ALLOWED_CREDNTIALS = True` instead of `CORS_ALLOW_CREDENTIALS = True`. The second was caused by SAMESITE settings. Since development was done locally at first, samesite would have to be setup for handling of cookies and tokens. To mitigate this, development was cotinued on gitpod, which won't cause samesite issues since you are running a seperate (virtual) machine.
- Signout bug: In local development, besides samesite issues, there are http and https issues. Standard, react runs a local http version of your site, but the backend logout view only accepts https. Because of this, the logout functionality wouldn't work. To mitigate this (before switching over to Gitpod completely, which would've also solved it), when running the react server, `HTTPS=true` was added to the `npm start` command.
