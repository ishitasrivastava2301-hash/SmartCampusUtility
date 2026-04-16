import request from 'supertest';
import app from '../src/app.js';

describe('Issue endpoints', () => {
  it('should deny access without token', async () => {
    const response = await request(app).get('/api/issues');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication required');
  });
});
