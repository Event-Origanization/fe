export interface User {
  id: number
  username: string
  email: string
  isActive: boolean
  image?: string
  role: string
  createdAt: string
  updatedAt?: string
  wallet?: {
    balance: number
    currency: string
    isActive: boolean
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
    user: {
      id: number
      username: string
      email: string
      role: string
      image?: string
      isActive: boolean
      createdAt: string
    }
    tokens: {
      accessToken: string
      refreshToken: string
      expiresIn: number
    }
    message: string
  }

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface RegisterResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LogoutRequest {
  refreshToken: string
}

export interface LogoutResponse {
  message: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface ChangePasswordResponse {
  message: string
}

export enum  userRoles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER',
}
