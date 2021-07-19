import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";


//? para opcional pq na atualizacao nem sempre é tudo
/*export class UpdateCourseDto {
    //readonly para nao ser manipulado
    @IsString()
    readonly name?: string;
    @IsString()
    readonly description?: string;
    @IsString({each: true})
    readonly tags?: string[];
} */

export class UpdateCourseDto extends PartialType(CreateCourseDto){}
