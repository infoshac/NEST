import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
   //constroi repositorio da tabela
   //injetando repositorio de cursos 
   constructor(
       @InjectRepository(Course)
       private readonly courseRepository: Repository<Course>,
    // injetando repositorio de tag
        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,
   ){}
   
    //LISTA TODOS 
    findAll(){
        return this.courseRepository.find();
    }

    //LISTA POR ID
    findOne(id:string){
        //percorre a ideintidade que é passado pela instancia indetitys e verifica se tem id igual
        return this.courseRepository.findOne(id);
    }

    //CADASTRAR
   async create(createCourseDto: CreateCourseDto){
       const tags = await Promise.all(
           createCourseDto.tags.map((name) => this.PreloaTagdByName(name),)
       );
        const course = this.courseRepository.create({...createCourseDto, });
        return this.courseRepository.save(course);
    }

    //UPDATE
    //define os parametros  id e updateCoursers que está vazio
    async update(id:string, updateCoursersDto: UpdateCourseDto){

        const tags = updateCoursersDto.tags && (await Promise.all(
            updateCoursersDto.tags.map((name:string ) => this.PreloaTagdByName(name)),
        ));



       const course= await this.courseRepository.preload({
           id: +id, ...updateCoursersDto, 
        });
        if(!course){
            throw new NotFoundException(`Course ID${id} not found`);
        }
        return this.courseRepository.save(course);
    }

    //DELETE
    async remove(id: string){
        const course= await this.courseRepository.findOne(id);

        if(!course){
            throw new NotFoundException(`Course ID${id} not found`);
        }
        return this.courseRepository.remove(course);
    }



    //metodo para verificar se algo ja esxiste no Banco de Dados
    private async PreloaTagdByName (name:string): Promise<Tag> {
        //procura e joga pra varivael
        const tag = await this.tagRepository.findOne({ name });
        //se existir retorna com ela
        if (tag) {
            return tag;
        }
        //se nao existir cria
        return this.tagRepository.create({ name });


    }

}
