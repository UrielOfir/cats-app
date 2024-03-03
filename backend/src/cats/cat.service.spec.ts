import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatSession } from './catSession.entity';
import makeUuid from '@/utils/makeUuid';

jest.setTimeout(15000);

describe('CatService', () => {
  let service: CatService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test', // Specify path to your test env configuration
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => ({
            type: 'postgres', // Use your test database type
            host: config.get('TEST_DB_HOST'), // Ensure these are set in your .env.test
            port: config.get('TEST_DB_PORT'),
            username: config.get('TEST_DB_USERNAME'),
            password: config.get('TEST_DB_PASSWORD'),
            database: config.get('TEST_DB_NAME'),
            entities: [Cat, CatSession], // Include your entities
            synchronize: true, // Be cautious with this in production-like environments
          }),
        }),
        TypeOrmModule.forFeature([Cat, CatSession]),
      ],
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
    await service['seedDevTestDbData']();
    // await service.onModuleInit();
  });

  afterAll(async () => {
    // truncate tables
    await service['truncateTables']();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should generate cats and catsessions (likes) if in development and database is empty', async () => {
      await service.onModuleInit();
      const cats = await service.findTop5();
      expect(cats).toBeDefined();
      expect(cats).toBeInstanceOf(Array);
      expect(cats).toHaveLength(5);
      expect(typeof cats[0].likes).toBe('number');
    });
  });

  describe('findTop5', () => {
    it('should return top 5 cats based on likes', async () => {
      const result = await service.findTop5();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(5);
      // expect result[0].likes to be a number
      expect(result[0].likes).toBeDefined();
      expect(typeof result[0].likes).toBe('number');
    });
  });

  describe('getById', () => {
    it('should return cat matching the id', async () => {
      const result = await service.findTop5();
      const catId = result[0].id;
      const lookupCat = await service.getCatById(catId);

      expect(lookupCat).toBeDefined();
      expect(lookupCat.id).toBe(catId);
      expect(true).toBe(true);
    });
  });

  describe('search', () => {
    it('should return cats matching the search term', async () => {
      const cats = await service.findCatsByName('');
      expect(cats).toBeDefined();
      expect(cats).toBeInstanceOf(Array);
      expect(cats.length).toBeGreaterThan(0);
      expect(cats[0].likes).toBeDefined();
      expect(typeof cats[0].likes).toBe('number');
    });
  });

  describe.skip('like', () => {
    it('happy flow - vote for cat', async () => {
      const uuid = makeUuid();
      const cats = await service.findTop5();
      console.log('cats', { cats, uuid });

      await service.voteForCat({
        sessionId: uuid,
        catId: cats[0].id,
      });

      expect(true).toBe(true);
    });
  });

  describe.skip('remove', () => {
    it('should remove a cat by id', async () => {
      await service.remove('some-id');
      expect(true).toBe(true);
    });
  });
});
