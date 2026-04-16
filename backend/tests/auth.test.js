import request from 'supertest';
import app from '../src/app.js';

describe('Auth endpoints', () => {
  it('should reject missing credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email and password are required');
  });

  it('should reject invalid credentials', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'missing@campus.edu',
      password: 'badpassword',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
