import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramReqDto } from './create-program.req.dto';

export class UpdateProgramDto extends PartialType(CreateProgramReqDto) {}
