import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import { getCurrentUser } from 'src/lib/auth'
import { useRequireAuth } from '@redwoodjs/graphql-server'
import fetch from 'node-fetch'
import {
  // verifyEvent,
  // VerifyOptions,
  WebhookVerificationError,
} from '@redwoodjs/api/webhooks'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

export const handler = useRequireAuth({ handlerFn, getCurrentUser })

async function handlerFn(event: APIGatewayEvent, _context: Context) {
  const clerkInfo = { webhook: 'clerk' }
  const webhookLogger = logger.child({ clerkInfo })

  webhookLogger.trace('Invoked clerkWebhook function')

  if (!event.body) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'No body',
      }),
    }
  }

  if (event?.headers?.['content-type'] !== 'application/json') {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Wrong content-type',
      }),
    }
  }

  try {
    // const options: VerifyOptions = {
    //   signatureHeader: 'svix-signature',
    //   // signatureTransformer: (signature: string) => {
    //   //   // Clerk can pass a space separated list of signatures.
    //   //   // Let's just use the first one that's of version 1
    //   //   const passedSignatures = signature.split(' ')

    //   //   for (const versionedSignature of passedSignatures) {
    //   //     const [version, signature] = versionedSignature.split(',')

    //   //     if (version === 'v1') {
    //   //       return signature
    //   //     }
    //   //   }
    //   // },
    //   timestamp: parseInt(event.headers['svix-timestamp'], 10) * 1000,
    //   tolerance: 5 * 60 * 1000, // 5 minutes
    // }

    // const svix_id = event.headers['svix-id']
    // const svix_timestamp = event.headers['svix-timestamp']

    // verifyEvent('base64Sha256Verifier', {
    //   event,
    //   secret: process.env.CLERK_WH_SECRET.slice(6),
    //   payload: `${svix_id}.${svix_timestamp}.${event.body}`,
    //   options,
    // })

    webhookLogger.debug({ headers: event.headers }, 'Headers')

    let body

    try {
      body = JSON.parse(event.body)
    } catch {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: "Couldn't parse body",
        }),
      }
    }

    webhookLogger.debug({ body }, 'Body payload')

    return handleClerkPayload(body)
  } catch (error) {
    if (error instanceof WebhookVerificationError) {
      webhookLogger.warn('Unauthorized')

      return {
        statusCode: 401,
      }
    } else {
      webhookLogger.error({ error }, error.message)

      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 500,
        body: JSON.stringify({
          error: error.message,
        }),
      }
    }
  }
}

async function handleClerkPayload(body) {
  if (body.type === 'session.created') {
    logger.trace('session.created')

    // Set user gravatar hash
    const response = await fetch(
      `https://api.clerk.dev/v1/users/${body.data.user_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
        },
      }
    )
    const user = await response.json()
    logger.debug(user, 'User')
    logger.debug(user.email_addresses[0].email_address, 'User email')
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'clerk function',
    }),
  }
}
