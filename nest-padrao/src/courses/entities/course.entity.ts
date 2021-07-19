import { json } from "express";
import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany} from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Course {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @JoinTable()
    @ManyToMany(()=> Tag, (tag: Tag) => tag.courses,)
    @Column('json', {nullable: true})
    tags: string[];
    static tags: any;

}
