// server/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import passport from './middleware/passport.js';

// Import routes
import authRoutes from './routes/auth.js';
// import adminRoutes from './routes/admin.js';
import adminRoutes from './routes/admin.js'; // ✅ now default export exists
import jobRoutes from './routes/jobs.js';
import companyRoutes from './routes/companies.js';
import applicationRoutes from './routes/applications.js';
import profileRoutes from './routes/profiles.js';
import notificationRoutes from './routes/notifications.js';
import blogRoutes from './routes/blog.js';
import savedJobsRoutes from './routes/savedJobs.js'; // ✅ check folder name!
import contactsRoutes from './routes/conatact.js';
import likedRoutes from './routes/likedJobs.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://bahathjobz.com','https://www.bahathjobz.com','http://localhost:5173', 'http://localhost:4173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session required for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'super-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));



// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/saved-jobs', savedJobsRoutes); // ✅ saved jobs mounted correctly
app.use('/api/contacts', contactsRoutes);
app.use('/api/liked-jobs', likedRoutes);


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 BAHATH JOBZ Backend running on port ${PORT}`);
});
