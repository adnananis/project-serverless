import 'source-map-support/register'
import { createLogger } from '../../utils/logger'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { generateUploadUrl } from '../../helpers/todos'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

// import { createAttachmentPresignedUrl } from '../../businessLogic/todos'
// import { getUserId } from '../utils'
const logger = createLogger('Create Todo')

// export const handler = middy(
    export const handler =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
   
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
   
    logger.info('Upload Image Handler Processing Event ', event)
    const todoId = event.pathParameters.todoId

    const URL = await generateUploadUrl(todoId)

    
   
            return {
                statusCode: 201,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                  newItem: todoId,
                  uploadUrl: URL
                })
              }
    
  }
// )

// handler
//   .use(httpErrorHandler())
//   .use(
//     cors({
//       credentials: true
//     })
//   )
