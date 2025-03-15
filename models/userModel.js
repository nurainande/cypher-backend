const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

// Define the user schema with enhanced validations
// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, 'Please enter your name'],
//         trim: true,
//         minlength: [3, 'Name must be at least 3 characters'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Please enter your email'],
//         unique: true,
//         lowercase: true,
//         match: [
//             /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//             'Please enter a valid email address',
//         ],
//     },
//     password: {
//         type: String,
//         required: [true, 'Please enter a password'],
//         minlength: [3, 'Password must be at least 6 characters'],
//         select: false, // Ensures password is not returned by default in queries
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'], // Specify acceptable roles
//         default: 'user',
//     },
// }, {
//     timestamps: true, // Automatically create createdAt and updatedAt fields
// });

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    role: String,
}, {
    timestamps: true
})

// // Pre-save middleware to hash the password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next(); // Only hash password if modified

//     // Hash the password with bcrypt
//     const salt = await bcrypt.genSalt(12); // Higher salt rounds for better security
//     this.password = await bcrypt.hash(this.password, salt);

//     next();
// });

// // Method to compare user-entered password with hashed password in the database
// userSchema.methods.correctPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
