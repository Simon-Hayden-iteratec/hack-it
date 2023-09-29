import { CreateProjectDto, ProjectDto, SimpleProjectDto } from '@hack-it/dtos';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { ProjectCollection } from '../../db/project-collection/project-collection.service';
import { ProjectEntity } from '../../db/project-collection/project.entity';
import { UserCollection } from '../../db/user-collection/user-collection.service';

@Controller('projects')
@ApiTags('projects')
export class ProjectController {
  constructor(
    private projectCollection: ProjectCollection,
    private userCollection: UserCollection
  ) {}

  @Get()
  async getAllProjects(): Promise<SimpleProjectDto[]> {
    const entities = await this.projectCollection.getAll();
    return entities.map(ProjectEntity.toSimpleDto);
  }

  @Get(':projectId')
  async getProject(@Param('projectId') projectId: string): Promise<ProjectDto> {
    let id: ObjectId;
    try {
      id = new ObjectId(projectId);
    } catch (_) {
      // Mask invalid ObjectID as "not found"
      throw new NotFoundException(`No project with ID '${projectId}' found`);
    }
    const entity = await this.projectCollection.getById(id);
    if (!entity) {
      throw new NotFoundException(`No project with ID '${projectId}' found`);
    }
    return ProjectEntity.toDto(entity);
  }

  @Get('event/:eventId')
  async getProjectsForEvent(
    @Param('eventId') eventId: string
  ): Promise<SimpleProjectDto[]> {
    let id: ObjectId;
    try {
      id = new ObjectId(eventId);
    } catch (_) {
      // Mask invalid ObjectID as "not found"
      return [];
    }
    const projects = await this.projectCollection.getForEvent(id);
    return projects.map((project) => ProjectEntity.toSimpleDto(project));
  }

  @Post()
  async createProject(
    @Body() dto: CreateProjectDto
  ): Promise<SimpleProjectDto> {
    let eventId: ObjectId;
    try {
      eventId = new ObjectId(dto.event);
    } catch (_) {
      throw new BadRequestException('Event must be a valid ID');
    }
    const owners = await this.userCollection.findOrCreateEmails(dto.owners);
    const project = await this.projectCollection.createProject(
      eventId,
      owners,
      dto
    );
    return ProjectEntity.toSimpleDto(project);
  }
}
