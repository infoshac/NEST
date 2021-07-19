import { IsString } from "class-validator";
export class CreateCourseDto {
    //readonly para nao ser manipulado
    
    @IsString()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsString({each: true})
    readonly tags: string[];

    
   /*
    @IsString()
     name: string;
    @IsString()
     description: string;
    @IsString({each: true})
     tags: string[];*/
}

