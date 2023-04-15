import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'


import { updateTodo } from '../../helpers/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'


export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {

    // TODO: Implement creating a new TODO item

    console.log('Update Item Processing Event ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    const updatedItem = await updateTodo(updatedTodo, todoId, jwtToken)

    
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        result: updatedItem
      })
    }

  }

