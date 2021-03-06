import { BaseError } from '@iredium/butterfly/lib/errors'
import { UserService } from '../services/user'
import { ApiController } from '@iredium/butterfly/lib/controllers'
import { UserPolicy } from '../policies/user'
import { BaseResponse, ViewResponse, RedirectResponse } from '@iredium/butterfly/lib/routes'
import { JsonResponse } from '@iredium/butterfly/lib/routes/responses/json'

export class UsersController extends ApiController {
  protected service: UserService

  public constructor () {
    super(UserService, UserPolicy)
  }

  public async me (req): Promise<BaseResponse> {
    this.authorize('me')
    return new JsonResponse(this.user)
  }

  public async authenticate (req): Promise<BaseResponse> {
    this.authorize('authenticate')
    const user = await this.service.authenticate('password', {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    return new JsonResponse(user)
  }

  public async login (req): Promise<BaseResponse> {
    this.authorize('login')
    try {
      const user = await this.service.authenticate('password', {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })
      req['session'].authenticatedUserId = user._id
      return new RedirectResponse(req.query.from || '/')
    } catch (error) {
      return new ViewResponse('pages/login/index.pug', {
        from: req.query.from,
        body: req.body,
        error
      })
    }
  }

  public async register (req): Promise<BaseResponse> {
    this.authorize('register')
    try {
      if (req.body.password !== req.body.password_again) {
        throw new BaseError('Register Error', 'Password doesn\'t match')
      }
      const user = await this.service.create(req.body)
      req['session'].authenticatedUserId = user._id
      return new RedirectResponse(req.query.from || '/')
    } catch (error) {
      return new ViewResponse('pages/register/index.pug', {
        from: req.query.from,
        body: req.body,
        error
      })
    }
  }

  public async loginView (req): Promise<BaseResponse> {
    this.authorize('login')
    return new ViewResponse('pages/login/index.pug', {
      from: encodeURIComponent(req.query.from)
    })
  }

  public async registerView (req): Promise<BaseResponse> {
    this.authorize('register')
    return new ViewResponse('pages/register/index.pug', {
      from: encodeURIComponent(req.query.from)
    })
  }
}
