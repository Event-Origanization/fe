export interface SeoInfo {
  title: string;
  description: string;
}

export const SEO_DATA: Record<string, SeoInfo> = {
  Home: {
    title: '5P Event - Kiến Tạo Cảm Xúc, Thu Trọn Thương Hiệu',
    description: '5P Event mang đến những tuyệt tác sự kiện nghệ thuật và dịch vụ sự kiện chuyên nghiệp, toàn diện, thông minh, tinh tế.'
  },
  About: {
    title: 'Về Chúng Tôi | 5P Event',
    description: 'Tìm hiểu về tầm nhìn, sứ mệnh và giá trị cốt lõi của 5P Event - đơn vị tổ chức sự kiện hàng đầu.'
  },
  Signin: {
    title: 'Đăng Nhập | 5P Event',
    description: 'Đăng nhập vào hệ thống 5P Event.'
  },
  Signup: {
    title: 'Đăng Ký | 5P Event',
    description: 'Tham gia cộng đồng 5P Event.'
  },
  NotFound: {
    title: '404 - Không Tìm Thấy Trang | 5P Event',
    description: 'Trang bạn tìm kiếm không tồn tại.'
  },
  // Admin Routes
  HomePage: {
    title: 'Bảng Điều Khiển | 5P Event Admin',
    description: 'Hệ thống quản trị 5P Event.'
  },
  ProductManagement: {
    title: 'Quản Lý Sản Phẩm | 5P Event Admin',
    description: 'Quản lý danh sách sản phẩm.'
  },
  UserManagement: {
    title: 'Quản Lý Người Dùng | 5P Event Admin',
    description: 'Quản lý người dùng hệ thống.'
  }
};
