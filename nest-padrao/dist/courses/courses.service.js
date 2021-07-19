"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./entities/course.entity");
const tag_entity_1 = require("./entities/tag.entity");
let CoursesService = class CoursesService {
    constructor(courseRepository, tagRepository) {
        this.courseRepository = courseRepository;
        this.tagRepository = tagRepository;
    }
    findAll() {
        return this.courseRepository.find();
    }
    findOne(id) {
        return this.courseRepository.findOne(id);
    }
    async create(createCourseDto) {
        const tags = await Promise.all(createCourseDto.tags.map((name) => this.PreloaTagdByName(name)));
        const course = this.courseRepository.create(Object.assign({}, createCourseDto));
        return this.courseRepository.save(course);
    }
    async update(id, updateCoursersDto) {
        const tags = updateCoursersDto.tags && (await Promise.all(updateCoursersDto.tags.map((name) => this.PreloaTagdByName(name))));
        const course = await this.courseRepository.preload(Object.assign({ id: +id }, updateCoursersDto));
        if (!course) {
            throw new common_1.NotFoundException(`Course ID${id} not found`);
        }
        return this.courseRepository.save(course);
    }
    async remove(id) {
        const course = await this.courseRepository.findOne(id);
        if (!course) {
            throw new common_1.NotFoundException(`Course ID${id} not found`);
        }
        return this.courseRepository.remove(course);
    }
    async PreloaTagdByName(name) {
        const tag = await this.tagRepository.findOne({ name });
        if (tag) {
            return tag;
        }
        return this.tagRepository.create({ name });
    }
};
CoursesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(course_entity_1.Course)),
    __param(1, typeorm_1.InjectRepository(tag_entity_1.Tag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map