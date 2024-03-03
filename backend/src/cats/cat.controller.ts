import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CatService, CatVoteResponse } from './cat.service';
import { Cat } from './cat.entity';
import { isValidUUID } from '../utils/isvaliduuid';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('top')
  findTop5(): Promise<Cat[]> {
    return this.catService.findTop5();
  }

  @Get('search')
  searchByName(@Query('name') name: string): Promise<Cat[]> {
    return this.catService.findCatsByName(name);
  }

  @Post('like/:id')
  async like(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<CatVoteResponse> {
    const sessionId = request.cookies['session-uuid']; // Extract session-uuid cookie as sessionId

    if (!isValidUUID(id) || !isValidUUID(sessionId)) {
      throw new HttpException('Invalid UUID', HttpStatus.BAD_REQUEST);
    }

    const response: CatVoteResponse = await this.catService.voteForCat({
      sessionId,
      catId: id,
    });
    if (response.error) {
      throw new HttpException(response.error, HttpStatus.BAD_REQUEST);
    }
    return response;
  }
}
