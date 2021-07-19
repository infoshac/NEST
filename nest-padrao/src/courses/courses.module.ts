import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Course, Tag])],
    controllers:[CourseController],
    providers:[CoursesService],
})
export class CoursesModule {}
