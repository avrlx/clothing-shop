/**
 * server.js
 * Minimal Express server:
 *  - Serves the static frontend/ folder (so the whole site runs from one process)
 *  - Exposes POST /api/contact for the contact form
 *  - Serves pages/404.html for any unmatched route
 *
 * Run with: npm start   (from the project root — see package.json)
 */
const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const logger = require('./utils/logger');
const contactRoutes = require('./routes/contactRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

app.use(cors({ origin: config.corsOrigins }));
app.use(express.json());

// Static frontend (HTML/CSS/JS/assets)
app.use(express.static(FRONTEND_DIR));

// API routes
app.use('/api', contactRoutes);

// API 404 (JSON) — only reached for /api/* paths that don't match a route above
app.use('/api', notFoundHandler);

// Any other unmatched route falls back to the branded 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(FRONTEND_DIR, 'pages', '404.html'));
});

// Centralised error handler — must be last
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`D Fashion Mart server running at http://localhost:${config.port} (${config.nodeEnv})`);
});
