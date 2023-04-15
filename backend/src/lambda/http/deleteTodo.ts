import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'



import { createLogger } from '../../utils/logger'
import { deleteTodo } from '../../helpers/todos'


const logger = createLogger('deleteTodo')

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    logger.info('Processing Event ', event)
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    const todoId = event.pathParameters.todoId

    const deleteData = await deleteTodo(todoId, jwtToken)

    return {
      statusCode: 200,
      body: deleteData
    }
}



