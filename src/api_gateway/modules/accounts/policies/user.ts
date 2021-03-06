import { ApiPolicy } from '@iredium/butterfly/lib/policies'

export class UserPolicy extends ApiPolicy {
  public me (): boolean {
    return false
  }

  public authenticate (): boolean {
    return true
  }

  public login (): boolean {
    return true
  }

  public register (): boolean {
    return true
  }
}
