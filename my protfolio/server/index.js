import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'submissions.json');

app.use(express.json());

const readSubmissions = async () => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeSubmissions = async (submissions) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
};

const escapeHtml = (text) => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

app.get('/api/contact-submissions', async (_req, res) => {
  try {
    const submissions = await readSubmissions();
    res.json(submissions);
  } catch (_error) {
    res.status(500).json({ message: 'Failed to load submissions.' });
  }
});

app.post('/api/contact-submissions', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const submissions = await readSubmissions();
    const newSubmission = {
      id: `${Date.now()}`,
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toLocaleString(),
    };

    submissions.unshift(newSubmission);
    await writeSubmissions(submissions);
    return res.status(201).json(newSubmission);
  } catch (_error) {
    return res.status(500).json({ message: 'Failed to save submission.' });
  }
});

app.get('/dashboard', async (_req, res) => {
  try {
    const submissions = await readSubmissions();
    const rows = submissions.length
      ? submissions.map((item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.email)}</td>
          <td>${escapeHtml(item.subject)}</td>
          <td>${escapeHtml(item.message)}</td>
          <td>${escapeHtml(item.submittedAt)}</td>
        </tr>
      `).join('')
      : '<tr><td colspan="5" class="empty">No submissions yet.</td></tr>';

    res.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Contact Dashboard</title>
          <style>
            body { font-family: Arial, sans-serif; background: #0b1020; color: #e2e8f0; margin: 0; padding: 24px; }
            .card { max-width: 1200px; margin: 0 auto; background: #111827; border: 1px solid #334155; border-radius: 14px; padding: 20px; }
            h1 { margin: 0 0 8px; }
            p { color: #94a3b8; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; }
            th, td { border-bottom: 1px solid #334155; padding: 12px; text-align: left; vertical-align: top; }
            th { color: #a78bfa; font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; }
            td { font-size: 14px; }
            .empty { text-align: center; color: #94a3b8; padding: 22px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Contact Dashboard</h1>
            <p>Total submissions: ${submissions.length}</p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </body>
      </html>
    `);
  } catch (_error) {
    res.status(500).send('Failed to load dashboard.');
  }
});

app.listen(PORT, () => {
  console.log(`Contact backend running on http://localhost:${PORT}`);
});
