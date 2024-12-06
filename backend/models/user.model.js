'use strict';

const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema

const User = new Schema({
  seqNo: Number,
  userName: {
    type: String,
    unique: true,
    required: 'ID is required',
  },
  password: {
    type: String,
    required: 'PW is required',
  },
  salt: {
    type: String,
  },
  personalInfo: {
    name: String,
    phone: String,
    email: String,
    department: String,
  },
  status: String,
},
{
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated',
  },
});

User.methods.hashPassword = function(password) {
  const hashPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64')
  return hashPassword
}
User.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password)
}

User.set('toJSON', {
  getters: true,
  virtuals: true,
})

mongoose.model('User', User)