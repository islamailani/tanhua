import { BaseMiddleware } from '@iredium/butterfly/lib/middlewares/base_middleware'
import { Database } from '@iredium/butterfly/lib/databases/database'
import express = require('express')
import session = require('express-session')
import connectMongo = require('connect-mongo')

const MongoStore = connectMongo(session)

export class Session extends BaseMiddleware {
  public generate ({ databases }): express.RequestHandler {
    const db: Database = databases.find((database: Database): boolean => database.name === 'mongoDb')
    return function sessionMiddleware (req, res, next): void {
      session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
          domain: process.env.SESSION_COOKIE_DOMAIN
        },
        store: new MongoStore({
          mongooseConnection: db.connection
        })
      })(req, res, next)
    }
  }
}
