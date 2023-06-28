import { Task } from './tasks.entity';
import { AppDataSource } from '../../index';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export class TasksController {
  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response> {
    let allTasks: Task[];

    try {
      allTasks = await AppDataSource.getRepository(
        Task,
      ).find({
        order: {
          date: 'ASC',
        },
      });

      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (errors) {
      return res
        .json({
          error: `Internal Server Error`,
        })
        .status(500);
    }
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const newTask = new Task();

    newTask.title = req.body.title;
    newTask.description = req.body.description;
    newTask.date = req.body.date;
    newTask.status = req.body.status;
    newTask.priority = req.body.priority;

    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(
        Task,
      ).save(newTask);

      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (error) {
      console.log(error);
      return res
        .json({
          error: `Internal Server Error`,
        })
        .status(500);
    }
  }
}

export const taskController = new TasksController();
