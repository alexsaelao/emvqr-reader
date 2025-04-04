# EMVQR Reader

**EMVQR Reader** is a web application designed to scan and decode EMV QR codes. It extracts and displays structured information from the QR codes in a readable format.

## Features

- Scan and parse EMV QR codes
- Display decoded QR data in a clear UI
- Support for image upload and QR text input
- Built with Node.js, Express, and EJS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alexsaelao/emvqr-reader.git
   cd emvqr-reader
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Run the App

```bash
npm start
```

Visit `http://localhost:3000` in your browser to use the application.

## Project Structure

```
emvqr-reader/
├── controllers/        # Request handlers and business logic
├── middleware/         # Custom middleware (e.g., error handling)
├── public/             # Static assets (CSS, JS)
├── routes/             # Application routes
├── utility/            # Helper functions for QR parsing
├── views/              # EJS templates for frontend rendering
├── app.js              # Express application setup
└── package.json        # Project metadata and scripts
```

## Usage

- Upload a QR image or paste EMVQR text on the homepage.
- The app will decode the content and display the TLV (Tag-Length-Value) data in a structured format.

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Tailwind CSS](https://tailwindcss.com/)
