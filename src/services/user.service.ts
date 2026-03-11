import { API_ROUTES } from "@/constants"
import { apiService, type ApiResponse } from "@/lib"
import type { User, ChangePasswordRequest, ChangePasswordResponse } from "@/types/user"
import type { ResponseError } from "@/utils/error"


export interface IUserService {
    getAllUsers: () => Promise<ApiResponse<User[]> | ResponseError>
    getUserById: (id: string) => Promise<ApiResponse<User> | ResponseError>
    updateUser: (user: User) => Promise<ApiResponse<User> | ResponseError>
    changePassword: (data: ChangePasswordRequest) => Promise<ApiResponse<ChangePasswordResponse> | ResponseError>
}

class UserService implements IUserService {
    getAllUsers(): Promise<ApiResponse<User[]> | ResponseError> {
        return apiService(API_ROUTES.USERS.BASE).get<User[]>()
    }

    getUserById(id: string): Promise<ApiResponse<User> | ResponseError> {
        return apiService(API_ROUTES.USERS.GET_BY_ID).addPathParam(':id', id).get<User>()
    }

    updateUser(user: User): Promise<ApiResponse<User> | ResponseError> {
        return apiService(API_ROUTES.USERS.UPDATE_PROFILE).put<User>(user)
    }

    changePassword(data: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse> | ResponseError> {
        return apiService(API_ROUTES.USERS.CHANGE_PASSWORD).put<ChangePasswordResponse>(data)
    }
}

export const userService = new UserService()