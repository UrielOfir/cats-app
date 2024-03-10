import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { CatSession } from './catSession.entity';
import makeUuid from '@/utils/makeUuid';

export interface CatVoteResponse {
  cat: Cat;
  catSession: CatSession;
  error?: string;
}

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
    @InjectRepository(CatSession)
    private catSessionRepository: Repository<CatSession>,
    private configService: ConfigService, // Inject ConfigService
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedDevTestDbData();
  }

  private async seedDevTestDbData(): Promise<void> {
    const isDevelopment = this.configService.get('NODE_ENV') === 'development';
    const isTest = this.configService.get('NODE_ENV') === 'test';

    if (isDevelopment || isTest) {
      const count = await this.catRepository.count();
      if (count === 0) {
        await this.generateCatsByAmount(100);
      }
      const likes = await this.catSessionRepository.count();
      if (likes === 0) {
        await this.generateLikesByAmount(1000);
      }
    }
  }

  async getCatById(catId: string): Promise<Cat> {
    const cat = await this.catRepository
      .createQueryBuilder('cat')
      .loadRelationCountAndMap('cat.likes', 'cat.catSessions')
      .where('cat.id = :id', { id: catId })
      .getOne();

    return this.removePrefix(cat);
  }

  async findTop5(): Promise<Cat[]> {
    const cats = await this.catRepository
      .createQueryBuilder('cat')
      .select('*')
      .leftJoin('cat.catSessions', 'catSession')
      .select('cat')
      .addSelect('COUNT(catSession.id)', 'likes')
      .groupBy('cat.id')
      .orderBy('likes', 'DESC')
      .limit(5)
      .getRawMany();

    return this.removePrefixArray(cats);
  }

  async findCatsByName(name: string): Promise<Cat[]> {
    const cats = await this.catRepository
      .createQueryBuilder('cat')
      .leftJoin('cat.catSessions', 'catSession')
      .where('LOWER(cat.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .groupBy('cat.id')
      .addSelect('COUNT(catSession.id)', 'likes')
      .getRawMany();

    return this.removePrefixArray(cats);
  }

  async voteForCat({
    sessionId,
    catId,
  }: {
    sessionId: string;
    catId: string;
  }): Promise<CatVoteResponse> {
    try {
      const { session, error } = await this.createCatLikeSession({
        catId,
        likeSessionId: sessionId,
      });
      const cat = await this.getCatById(catId);

      return {
        cat,
        catSession: session,
        error,
      };
    } catch (error) {
      // Handle the error here
      console.error(error);
      throw error;
    }
  }

  async createCatLikeSession({
    catId,
    likeSessionId,
  }): Promise<{ session: CatSession } & { error?: string; message?: string }> {
    const existingSession = await this.catSessionRepository.findOne({
      where: { cat_id: catId, session_id: likeSessionId },
    });

    if (existingSession) {
      await this.catSessionRepository.remove(existingSession);
      return {
        session: existingSession,
        message: 'cat unliked successfully!',
      };
    }

    const newSession = this.catSessionRepository.create({
      cat_id: catId,
      session_id: likeSessionId,
    });

    await this.catSessionRepository.save(newSession);
    return { session: newSession };
  }

  private async generateLikesByAmount(number: number): Promise<void> {
    const cats = await this.catRepository.find();
    const cat_ids = cats.map((cat: Cat) => cat.id);
    for (let i = 0; i < number; i++) {
      const cat_id: any = cat_ids[Math.floor(Math.random() * cat_ids.length)];
      const catLikeSession = this.catSessionRepository.create({
        session_id: makeUuid(),
        cat_id: cat_id,
      });

      await this.catSessionRepository.save(catLikeSession);
    }
  }

  private async generateCatsByAmount(number: number): Promise<void> {
    const foods = [
      'Salmon Pâté',
      'Tuna Flakes',
      'Chicken and Liver Feast',
      'Turkey Giblets in Gravy',
      'Ocean Whitefish Dinner',
      'Sardine Mousse',
      'Beef and Egg Entrée',
      'Duck and Sweet Potato Formula',
      'Rabbit and Garden Vegetable Mix',
      'Cod and Shrimp Cocktail',
    ];

    for (let i = 0; i < number; i++) {
      const cat = new Cat();
      cat.name = faker.internet.userName();
      cat.birth = faker.date.past({ years: 15 }).toISOString().split('T')[0];
      cat.location = faker.location.city() + ', ' + faker.location.country();
      cat.food = foods[Math.floor(Math.random() * foods.length)];
      cat.height = Math.floor(Math.random() * (40 - 10 + 1) + 10);
      cat.weight = Math.floor(Math.random() * (30 - 10 + 1) + 10);
      cat.image = faker.image.urlLoremFlickr({ category: 'cats' });
      this.catRepository.save(cat);
    }
  }

  private async truncateTables(): Promise<void> {
    await this.catRepository.query('TRUNCATE TABLE cat_session CASCADE');
    await this.catRepository.query('TRUNCATE TABLE cat CASCADE');
  }

  private removePrefix(cat: Cat) {
    return Object.keys(cat).reduce((acc, key) => {
      const newKey = key.replace('cat_', '');
      acc[newKey] = cat[key];
      if (newKey === 'likes') {
        acc[newKey] = +cat[key];
      }
      return acc;
    }, {}) as Cat;
  }

  private removePrefixArray(cats: Cat[]) {
    return cats.map((cat) => this.removePrefix(cat));
  }

  async remove(id: string): Promise<void> {
    await this.catRepository.delete(id);
  }
}
