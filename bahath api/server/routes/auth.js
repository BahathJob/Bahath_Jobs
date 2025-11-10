// server/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import {authenticateToken, generateToken } from '../middleware/auth.js';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import passport from '../middleware/passport.js';
import sendEmail from '../utils/sendmail.js';

dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

/// Utility: generate 6-digit OTP
function generateOTP() {
  // return Math.floor(100000 + Math.random() * 900000).toString();
   return '1234';
}

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phone, country } = req.body;

    // Check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists with this email' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        phone,
        role,
        country,
      },
    });

    // Generate JWT
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
        country: user.country,
      },
    });
  } catch (err) {
    console.error('🚨 Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

router.post('/send-otp', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Generate OTP
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
      // Save OTP to the database
      await prisma.otp.create({
        data: {
          email,
          otp,
          expiresAt,
        },
      });
  
      // Send OTP email
      const subject = 'Your Bahath Jobz Verification OTP';
      const html = `
        <h2>Hello!</h2>
        <p>Your OTP for verification is: <b>${otp}</b></p>
        <p>It will expire in 10 minutes.</p>
      `;
  
      const mailStatus = await sendEmail({
        to: email,
        subject,
        html,
      });
  
      if (mailStatus.success) {
        console.log(`✅ OTP email sent to ${email} successfully`);
        res.status(200).json({ message: 'OTP sent successfully' });
      } else {
        console.log(`❌ OTP email failed for ${email}: ${mailStatus.error}`);
        res.status(500).json({ message: 'Failed to send OTP' });
      }
    } catch (err) {
      console.error('🚨 Send OTP error:', err);
      res.status(500).json({ message: 'Failed to send OTP', error: err.message });
    }
  });

  router.post('/verify-otp', async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      // Find the OTP in the database
      const otpRecord = await prisma.otp.findFirst({
        where: {
          email,
          otp,
        },
      });
  
      if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
  
      // Check if the OTP has expired
      if (new Date() > new Date(otpRecord.expiresAt)) {
        return res.status(400).json({ message: 'OTP has expired' });
      }
  
      // Delete the OTP from the database
      await prisma.otp.delete({
        where: {
          id: otpRecord.id,
        },
      });
  
      res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
      console.error('🚨 Verify OTP error:', err);
      res.status(500).json({ message: 'Failed to verify OTP', error: err.message });
    }
  });



// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = generateToken(req.user.id);

    // Redirect to frontend with token in query params
    const frontendURL = 'https://bahathjobz.com'; // your frontend URL
    res.redirect(`${frontendURL}/auth/google/callback?token=${token}`);
  }
);


// Register
// router.post('/register', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, role, phone ,country} = req.body;


//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email' });
//     }

//     // Hash password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create user in DB
//     const user = await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword, 
//         first_name: firstName,
//         last_name: lastName,
//         phone,
//         role,
//         country,
//       },
//     });

//      // Generate OTP
//     const otp = generateOTP();

//     // Send OTP email
//     const mailOptions = {
//       from: `"Bahath Jobz" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'Your Registration OTP',
//       html: `
//         <h2>Welcome, ${firstName}!</h2>
//         <p>Your OTP for registration is: <strong>${otp}</strong></p>
//         <p>It is valid for 10 minutes.</p>
//       `,
//     };

//     try {
//       await transporter.sendMail(mailOptions);
//       console.log(`OTP sent to ${email}: ${otp}`);
//       // Optionally, save OTP in DB for verification later
//       // await prisma.otp.create({ data: { userId: user.id, otp, expiresAt: new Date(Date.now() + 10*60*1000) } });
//     } catch (emailError) {
//       console.error('Failed to send OTP:', emailError);
//     }


//     // Generate token
//     const token = generateToken(user.id);

//     //  try {
//     //   await sendEmail({
//     //     to: user.email,
//     //     subject: 'Welcome to Veggi-Go!',
//     //     html: `
//     //       <h1>Welcome, ${user.first_name}!</h1>
//     //       <p>Thank you for registering at <strong>Veggi-Go</strong>. We're excited to have you on board!</p>
//     //       <p>You can now log in and start using our platform.</p>
//     //       <p>Best regards,<br>Veggi-Go Team</p>
//     //     `,
//     //   });
//     //   console.log('Welcome email sent to', user.email);
//     // } catch (emailError) {
//     //   console.error('Failed to send welcome email:', emailError);
//     //   // Not returning an error here, because registration should succeed even if email fails
//     // }

//     res.status(201).json({
//       message: 'User registered successfully',
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//         firstName: user.first_name,
//         lastName: user.last_name,
//         phone: user.phone,
//         role: user.role,
//         avatar: user.avatar,
//         isActive: user.is_active,
//         createdAt: user.created_at,
//         country: user.country,
//       },
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Registration failed' });
//   } 
// });

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user
    const user = await prisma.user.findFirst({
      where: {
        email,
        is_active: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If user has no password, they should use Google to log in
    if (!user.password) {
      return res.status(401).json({ message: 'You have registered using a social account. Please use Google to log in.' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        isActive: user.is_active,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});




//  server/routes/auth.js
// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      isActive: user.is_active,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});
// router.post('/change-password', authenticateToken, async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const userId = req.user.id;

//     // Get user from Prisma
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check old password
//     const validPassword = await bcrypt.compare(oldPassword, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: 'Invalid old password' });
//     }

//     // Hash new password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

//     // Update password
//     await prisma.user.update({
//       where: { id: userId },
//       data: { password: hashedPassword },
//     });

//     res.json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error('Change password error:', error);
//     res.status(500).json({ message: 'Failed to change password' });
//   }
// });
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword, phone, country } = req.body;
    const userId = req.user.id;

    // Get user from Prisma
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check old password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Prepare update data
    const updateData = {
      password: hashedPassword,
    };

    if (phone !== undefined) updateData.phone = phone;
    if (country !== undefined) updateData.country = country;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.json({
      message: 'Password (and user info) updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        phone: updatedUser.phone,
        country: updatedUser.country,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Failed to change password' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const activeJobs = await prisma.job.count({
      where: { is_approved: true },
    });

    const jobSeekers = await prisma.user.count({
      where: { role: 'job_seeker' },
    });

    const companies = await prisma.company.count();

    res.json({
      activeJobs,
      jobSeekers,
      companies,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});
export default router;