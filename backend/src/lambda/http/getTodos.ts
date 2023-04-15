import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { createLogger } from '../../utils/logger'
import { getAllTodo } from '../../helpers/todos'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'

// import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
// import { getUserId } from '../utils';

//const docClient = new AWS.DynamoDB.DocumentClient()

//const toDoTable = process.env.TODOs_TABLE

const logger = createLogger('getTodo')

// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler =  async (event): Promise<APIGatewayProxyResult> => {
    // Write your code here
   // createLogger('Get Todo Processing Event ' + event)
   logger.info('Processing Event ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const items = await getAllTodo(jwtToken)
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items
      })
    }
    
  }


