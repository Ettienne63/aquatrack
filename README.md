# AquaTrack

AquaTrack is a responsive web application designed to help aquarium hobbyists monitor the health of their aquarium by recording water parameters, tracking maintenance, and visualizing trends over time.

The application provides a clean dashboard that displays the latest tank status, maintenance reminders, historical readings, statistics, and parameter trends to help users make informed decisions about their aquarium.

---

## Features

### Dashboard
- Displays the latest recorded tank readings
- Tank health indicator
- Health recommendations
- Dashboard alerts
- Maintenance summary

### Reading Management
- Add new water parameter readings
- Edit existing readings
- Delete readings
- Search previous readings
- Sort readings by date

### Statistics & Trends
- Average parameter values
- Highest and lowest readings
- Total number of readings
- Parameter trend analysis
- Interactive charts powered by Chart.js

### Tank Profile
- Create and edit a tank profile
- Store:
  - Tank name
  - Tank dimensions
  - Tank volume
  - Tank start date
  - Tank type

### Validation
- Form validation before saving data
- User-friendly error handling
- Prevents invalid aquarium readings

### Data Storage
- Uses LocalStorage to persist data
- No database required
- Works completely in the browser

---

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- Chart.js
- LocalStorage

---

## Project Structure

```
AquaTrack
│
├── css/
│   └── custom.css
│
├── js/
│   ├── config/
│   ├── pages/
│   ├── storage/
│   ├── utils/
│   └── validation/
│
├── index.html
├── add-reading.html
├── edit-reading.html
└── profile.html
```

The project follows a modular architecture where each file has a single responsibility:

- **config** – Application configuration
- **storage** – LocalStorage operations
- **validation** – Input validation
- **utils** – Business logic and calculations
- **pages** – Page-specific functionality

---

## Future Improvements

Planned features include:

- Backend API
- User accounts
- Cloud database
- Multiple aquarium support
- Water testing history
- Image uploads
- Fish and plant inventory
- Feeding schedules
- Mobile notifications

---

## Screenshots

Screenshots will be added after deployment.

---

## Author

**Ettienne Janse van Vuuren**

Bachelor of Information Technology

GitHub: https://github.com/Ettienne63

---

## License

This project is intended for educational and portfolio purposes.
