import * as AWS from 'aws-sdk'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'




export class TodosAccess {
  constructor (   
    private readonly documentClient =  new AWS.DynamoDB.DocumentClient(),   
    private readonly todosTable = process.env.TODOs_TABLE,   
  ) {}

  async getAllTodo (userId: string): Promise<TodoItem[]> {
    console.log('Getting all todo')
    console.log('Getting all todo By user ID' +  userId)
    console.log('Getting all todo By user ID Table' +  this.todosTable)

    const params = {
      TableName: this.todosTable,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId'
      },
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }

    const result = await this.documentClient.query(params).promise()
    console.log(result)
    const items = result.Items

    return items as TodoItem[]
  }

  async createTodo (todoItem: TodoItem): Promise<TodoItem> {
    console.log('Creating new todo')

    const params = {
      TableName: this.todosTable,
      Item: todoItem
    }

    await this.documentClient.put(params).promise()    

    return todoItem as TodoItem
  }

  async updateTodo (
    todoUpdate: TodoUpdate,
    todoId: string,
    userId: string
  ): Promise<TodoUpdate> {
    console.log('Updating todo')

    const params = {
      TableName: this.todosTable,
      Key: {
        userId: userId,
        todoId: todoId
      },
      UpdateExpression: 'set #a = :a, #b = :b, #c = :c',
      ExpressionAttributeNames: {
        '#a': 'name',
        '#b': 'dueDate',
        '#c': 'done'
      },
      ExpressionAttributeValues: {
        ':a': todoUpdate['name'],
        ':b': todoUpdate['dueDate'],
        ':c': todoUpdate['done']
      },
      ReturnValues: 'ALL_NEW'
    }

    const result = await this.documentClient.update(params).promise()
    console.log(result)
    const attributes = result.Attributes

    return attributes as TodoUpdate
  }

  async deleteTodo (todoId: string, userId: string): Promise<string> {
    console.log('Deleting todo')

    const params = {
      TableName: this.todosTable,
      Key: {
        userId: userId,
        todoId: todoId
      }
    }

    const result = await this.documentClient.delete(params).promise()
    console.log(result)

    return '' as string
  }

  
}
