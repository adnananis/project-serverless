import { TodosAccess } from './todosAcess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'
import { TodoUpdate } from '../models/TodoUpdate'
import { AttachmentUtils } from './attachmentUtils'
//import { createLogger } from '../utils/logger'
//import * as uuid from 'uuid'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic

const uuidv4 = require('uuid/v4')
const toDoAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

const s3_BucketName = process.env.ATTACHMENT_S3_BUCKET

export async function getAllTodo (jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken)
    return toDoAccess.getAllTodo(userId)
  }
  
  export async function createTodo (
    createTodoRequest: CreateTodoRequest,
    jwtToken: string
  ): Promise<TodoItem> {
    const userId = parseUserId(jwtToken)
    const id = uuidv4()
    return toDoAccess.createTodo({
      userId: userId,
      todoId: id,
      createdAt: new Date().getTime().toString(),
      done: false,
      attachmentUrl: `https://${s3_BucketName}.s3.amazonaws.com/${id}`,
      ...createTodoRequest
    })
  }
  
  export async function updateTodo (
    updateTodoRequest: UpdateTodoRequest,
    todoId: string,
    jwtToken: string
  ): Promise<TodoUpdate> {
    const userId = parseUserId(jwtToken)
    return toDoAccess.updateTodo(updateTodoRequest, todoId, userId)
  }
  
  export async function deleteTodo (todoId: string, jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken)
    return toDoAccess.deleteTodo(todoId, userId)
  }
  
  export async function generateUploadUrl (todoId: string): Promise<string> {
    return attachmentUtils.generateUploadUrl(todoId)
  }
  
