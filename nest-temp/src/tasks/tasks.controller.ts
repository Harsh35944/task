import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('JWT-auth')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new task (Admin only)' })
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: any) {
    return this.tasksService.create(createTaskDto, user.sub);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tasks with pagination, filtering, and search',
    description:
      'Users can view tasks assigned to them or created by them. Admins can view all tasks.',
  })
  findAll(@Query() queryDto: QueryTaskDto, @CurrentUser() user: any) {
    // If user is not admin, pass userId to filter tasks
    const userId = user.role === Role.ADMIN ? undefined : user.sub;
    return this.tasksService.findAll(queryDto, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    // If user is not admin, pass userId to filter tasks
    const userId = user.role === Role.ADMIN ? undefined : user.sub;
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a task (Admin only)' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a task (Admin only)' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
