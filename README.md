# SWYNEX API Integration — People Directory

A responsive frontend project that fetches sample user profiles from the public Random User Generator API and displays them in a searchable, filterable directory.

## Features

- Fetches 12 sample profiles from a public API using JavaScript `fetch()`
- Displays profile photos, names, email addresses, gender, and location
- Search by name, email, city, or country
- Filter profiles by gender
- Loading skeletons while data is being fetched
- Error handling with a retry option
- Refresh button to request a fresh set of profiles
- Responsive layout for desktop, tablet, and mobile screens

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API
- Random User Generator API

## API used

`https://randomuser.me/api/`

Official documentation: https://randomuser.me/documentation

The API generates sample profile data for development and testing. The profiles shown in this project are synthetic sample data, not a real user directory.

## Run locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` with the VS Code Live Server extension.
4. The People Directory will request sample data from the API automatically.

No Node.js or npm installation is required.

## Project files

- `index.html` — page structure
- `style.css` — responsive design and layout
- `script.js` — API request, loading/error handling, search, and filtering

## Learning outcomes

This project demonstrates how to make an HTTP request from a frontend application, read JSON data, render API results dynamically, manage loading and error states, and add client-side search and filtering.
