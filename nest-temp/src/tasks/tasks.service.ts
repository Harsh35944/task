import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto, createdBy: string) {
    try {
      const taskData = {
        ...createTaskDto,
        createdBy: new Types.ObjectId(createdBy),
        assignedTo: createTaskDto.assignedTo
          ? new Types.ObjectId(createTaskDto.assignedTo)
          : undefined,
        dueDate: createTaskDto.dueDate
          ? new Date(createTaskDto.dueDate)
          : undefined,
      };

      const task = await this.taskModel.create(taskData);
      const populatedTask = await this.taskModel
        .findById(task._id)
        .populate('createdBy', 'name email')
        .populate('assignedTo', 'name email')
        .exec();

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Task created successfully',
        data: populatedTask,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(queryDto: QueryTaskDto, userId?: string) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        status,
        priority,
        assignedTo,
        createdBy,
        dueDateFrom,
        dueDateTo,
      } = queryDto;

      const skip = (page - 1) * limit;

      // Build filter object
      const filter: any = { isActive: true };

      // Build $and array for complex queries
      const andConditions: any[] = [];

      // If user is not admin, only show tasks assigned to them or created by them
      if (userId) {
        andConditions.push({
          $or: [
            { assignedTo: new Types.ObjectId(userId) },
            { createdBy: new Types.ObjectId(userId) },
          ],
        });
      }

      // Search filter (title or description)
      if (search) {
        andConditions.push({
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        });
      }

      // Apply $and if we have conditions
      if (andConditions.length > 0) {
        filter.$and = andConditions;
      }

      // Status filter
      if (status) {
        filter.status = status;
      }

      // Priority filter
      if (priority) {
        filter.priority = priority;
      }

      // Assigned to filter
      if (assignedTo) {
        filter.assignedTo = new Types.ObjectId(assignedTo);
      }

      // Created by filter
      if (createdBy) {
        filter.createdBy = new Types.ObjectId(createdBy);
      }

      // Due date range filter
      if (dueDateFrom || dueDateTo) {
        filter.dueDate = {};
        if (dueDateFrom) {
          filter.dueDate.$gte = new Date(dueDateFrom);
        }
        if (dueDateTo) {
          filter.dueDate.$lte = new Date(dueDateTo);
        }
      }

      // Execute query with pagination
      const [tasks, total] = await Promise.all([
        this.taskModel
          .find(filter)
          .populate('createdBy', 'name email')
          .populate('assignedTo', 'name email')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        this.taskModel.countDocuments(filter).exec(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        statusCode: HttpStatus.OK,
        message: 'Tasks retrieved successfully',
        data: tasks,
        meta: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, userId?: string) {
    try {
      const filter: any = { _id: new Types.ObjectId(id), isActive: true };

      // If user is not admin, only show tasks assigned to them or created by them
      if (userId) {
        filter.$or = [
          { assignedTo: new Types.ObjectId(userId) },
          { createdBy: new Types.ObjectId(userId) },
        ];
      }

      const task = await this.taskModel
        .findOne(filter)
        .populate('createdBy', 'name email')
        .populate('assignedTo', 'name email')
        .exec();

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Task retrieved successfully',
        data: task,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const updateData: any = { ...updateTaskDto };

      if (updateTaskDto.assignedTo) {
        updateData.assignedTo = new Types.ObjectId(updateTaskDto.assignedTo);
      }

      if (updateTaskDto.dueDate) {
        updateData.dueDate = new Date(updateTaskDto.dueDate);
      }

      const task = await this.taskModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .populate('createdBy', 'name email')
        .populate('assignedTo', 'name email')
        .exec();

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Task updated successfully',
        data: task,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskModel.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true },
      );

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Task deleted successfully',
        data: null,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Something went wrong, please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
