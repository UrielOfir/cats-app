import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatSession } from './catSession.entity';
import { createMock } from '@golevelup/ts-jest'; // Assuming you're using this or a similar package for creating mock Request objects
import { Request } from 'express';
import makeUuid from '@/utils/makeUuid';

describe('CatController', () => {
  let controller: CatController;
  let mockCatService: Partial<CatService>;

  beforeEach(async () => {
    mockCatService = {
      // Your mock implementations
      voteForCat: jest.fn().mockImplementation(({ sessionId, catId }) => {
        const catLike = new CatSession();
        catLike.cat_id = catId;
        catLike.session_id = sessionId;
        return Promise.resolve(catLike);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [{ provide: CatService, useValue: mockCatService }],
    }).compile();

    controller = module.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Other tests...

  it('like should return a CatSession', async () => {
    const catId = makeUuid(); // Dummy UUID for test
    const sessionId = makeUuid(); // Dummy session UUID to be set in cookies

    // Create a mock Request object with the necessary cookie
    const mockRequest = createMock<Request>({
      cookies: { 'session-uuid': sessionId },
    });

    // Adjust the call to the like method to pass the mock Request object
    await expect(controller.like(catId, mockRequest)).resolves.toBeInstanceOf(
      CatSession,
    );
    expect(mockCatService.voteForCat).toHaveBeenCalledWith({
      sessionId,
      catId,
    });
  });
});
