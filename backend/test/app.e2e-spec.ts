import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { ConfigModule } from '@nestjs/config';

jest.setTimeout(15000);

// Updated to return the initialized app
const initModuleFixture = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      ConfigModule.forRoot({
        envFilePath: '.env.test', // Load test environment variables
      }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  return app;
};

describe('CatController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initModuleFixture(); // Use the returned app here as well
  });

  it('/cats (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/cats/top');
    const { body, statusCode } = response;
    const cat = body[0];
    expect(statusCode).toBe(200);
    expect(body).toBeDefined();
    expect(body.length <= 5).toBe(true);
    expect(cat.id).toBeDefined();
    expect(cat.likes >= 0).toBe(true);
  });
});

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initModuleFixture(); // Use the returned app here as well
  });

  it('/auth/setCookie (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/auth/setCookie');
    const { body, statusCode, headers } = response;
    console.log(headers);
    expect(statusCode).toBe(200);
    expect(headers['set-cookie']).toBeDefined();
    expect(headers['set-cookie'][0]).toContain('session-uuid');
    expect(body.message).toBe('Session cookie set');
  });
});
