import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodesService {
  create(createEpisodeDto: CreateEpisodeDto) {
    console.log(createEpisodeDto);
    return 'This action adds a new episode';
  }

  findAll() {
    return `This action returns all episodes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} episode`;
  }

  update(id: number, _updateEpisodeDto: UpdateEpisodeDto) {
    console.log(_updateEpisodeDto);
    return `This action updates a #${id} episode`;
  }

  remove(id: number) {
    return `This action removes a #${id} episode`;
  }
}
