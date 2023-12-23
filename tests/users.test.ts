import http, { IncomingMessage, ServerResponse } from 'http';
import app from '../src/server';

const API_URL = '/api/users';
const PORT = 3000; 

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  app(req, res);
});

beforeAll(() => {
  server.listen(PORT);
});

afterAll(() => {
  server.close();
});

describe('User API Tests', () => {
  let userId: string;

  test('Scenario 1: Get all records with a GET api/users request', async () => {
    const response = await makeRequest('GET', API_URL);
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body.toString())).toEqual([]);
  });

  test('Scenario 2: Create a new object by a POST api/users request', async () => {
    const userData = {
      username: 'MaheshPt',
      age: 23,
      hobbies: ['Dancing', 'Traveling'],
    };

    const response = await makeRequest('POST', API_URL, userData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
  });

  test('Scenario 3: Get the created record by its id with a GET api/users/{userId} request', async () => {
    const response = await makeRequest('GET', `${API_URL}/${userId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  test('Scenario 4: Update the created record with a PUT api/users/{userId} request', async () => {
    const updatedUserData = {
      username: 'Maheshpt',
      age: 26,
      hobbies: ['Reading', 'Traveling', 'Singing'],
    };

    const response = await makeRequest('PUT', `${API_URL}/${userId}`, updatedUserData);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.username).toBe(updatedUserData.username);
    expect(response.body.age).toBe(updatedUserData.age);
    expect(response.body.hobbies).toEqual(updatedUserData.hobbies);
  });

  test('Scenario 5: Delete the created object by id with a DELETE api/users/{userId} request', async () => {
    const response = await makeRequest('DELETE', `${API_URL}/${userId}`);
    expect(response.statusCode).toBe(204);
  });

  test('Scenario 6: Get a deleted object by id with a GET api/users/{userId} request', async () => {
    const response = await makeRequest('GET', `${API_URL}/${userId}`);
    expect(response.statusCode).toBe(404);
  });
});

// Helper function to make HTTP requests
function makeRequest(
    method: string,
    path: string,
    body?: Record<string, any>
  ): Promise<{ statusCode: number; body: any }> {
    return new Promise((resolve) => {
      const requestData = body ? JSON.stringify(body) : undefined;
  
      const req = http.request(
        {
          method,
          path,
          port: PORT,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestData ? Buffer.byteLength(requestData) : 0,
          },
        },
        (res: IncomingMessage) => {
          const data: Buffer[] = [];
  
          res.on('data', (chunk) => {
            data.push(chunk);
          });
  
          res.on('end', () => {
            const responseBody = Buffer.concat(data).toString(); // Parse buffer to string
            const parsedBody = responseBody ? JSON.parse(responseBody) : null;
            resolve({ statusCode: res.statusCode || 500, body: parsedBody });
          });
        }
      );
  
      if (requestData) {
        req.write(requestData);
      }
  
      req.end();
    });
  }
