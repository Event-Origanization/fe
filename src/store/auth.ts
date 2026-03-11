import { type LoginRequest, type RegisterRequest, type User } from '@/types/user'
import { authService } from '@/services/auth.service'
import { defineStore } from 'pinia'
import { ResponseError } from '@/utils/error'
import { HttpStatusCode } from 'axios'
import router from '@/router'
import { USER_ROLES } from '@/constants'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accessToken: string
  refreshToken: string
  expiresIn: number
  loading: boolean
  error: string
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<string | undefined>
  getMe: () => Promise<void>
  register: (data: RegisterRequest) => Promise<string | undefined>
  logout: () => Promise<void>
}

export const useAuthStore = defineStore<
  'auth',
  AuthState,
  {
    isLoggedIn: (state: AuthState) => boolean
    isAdmin: (state: AuthState) => boolean
  },
  AuthActions
>('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
    loading: false,
    error: '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,

    isAdmin: (state): boolean =>
      state.user?.role === USER_ROLES.ROLE_ADMIN
  },

  actions: {
    async login(credentials: LoginRequest): Promise<string | undefined> {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.login(credentials)
        

        if (result instanceof ResponseError) {
          this.error = result.message
          return this.error
        }

        const { user, tokens } = result.data  

        this.user = user
        this.isAuthenticated = true
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        this.expiresIn = tokens.expiresIn

        const isAdmin =
          user.role === USER_ROLES.ROLE_ADMIN
        router.push(isAdmin ? '/administrators' : '/')
        return undefined
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async getMe() {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.getMe()

        if (result instanceof ResponseError) {
          this.error = result.message
          return
        }
        this.isAuthenticated = true;
        this.user = result.data
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
      } finally {
        this.loading = false
      }
    },

    async register(data: RegisterRequest): Promise<string | undefined> {
      this.loading = true
      this.error = ''

      try {
        const result = await authService.register(data)

        if (result instanceof ResponseError) {
          return result.message
        }

        // Registration successful, redirect to OTP verification
        router.push({
          path: '/verify-otp',
          query: { email: data.email }
        })
        return undefined
      } catch (err) {
        if (err instanceof ResponseError && err.status === HttpStatusCode.InternalServerError)
          return
        this.error = err instanceof Error ? err.message : 'Registration failed.'
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await authService.logout()
        this.isAuthenticated = false
      } finally {
        this.$reset()
        router.push('/')
      }
    },
  },
})
