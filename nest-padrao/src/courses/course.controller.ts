import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { get } from 'http';
import path from 'path/posix';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
//@param quando passado pela url
//@body quando passado pelo corpo
//@Resp para tratar a resposta devolvida
//Posso passar varios parametro dentro do metodo(@Param01() nome: tipo, @param02, )

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CoursesService){}
    @Get()
    findAll(){
        //chamado o metodo que se encontra em serviço
        return this.courseService.findAll();
    }
    //tratando resposta
    /*
    @Get()
    findAllResp(@Res() response){
        return response.status(200).send('Listagem de todos');
    }*/
    /*
    @Get(':id')
    findOne(@Param() params){
        return 'curso #${ }'+params.id ;
    }
    */
    @Get(':id')
    findOne(@Param('id')id: string){
        //return this.courseService.findOne(id);
        //verificaçao de erro coloca o retorno como uma variavel
        const courseSingle= this.courseService.findOne(id);
        //verifico
        if(!courseSingle){
            //mensagem de retorno
            throw new HttpException(
                `Curso de ID ${id} nao funciona`,
                HttpStatus.NOT_FOUND,
            );
        }
        return courseSingle;
    }

    //@Body traz os parameto e quanto eu definir
    /* @Post()
    create(@Body('name') nome, @Body('preco') preco ){
        return preco;
    } */
    @Post()
    //passando os parametros que vem do body conforme definido no DTO
        create(@Body() createCourseDto: CreateCourseDto){
            return this.courseService.create(createCourseDto);
        }
    //Update
    @Patch(':id')
    //chamando o valor do dto
        update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto){
           return this.courseService.update(id, updateCourseDto)
        }

    @Delete(':id')
    remove(@Param('id') id: string){
            return this.courseService.remove(id);
        }

}
