# Instagram_Clone

> Clone lại trang instagram sau khi học xong khóa học CoderX

# Functionality

## Auth

- Đăng kí user
- Đăng nhập user
- Lấy thông tin user đăng nhập
- Gửi email mật khẩu mới khi quên mật khẩu


## Profile

- Update info
- Chỉnh sữa thông tin user
- Thay đổi password
- Thay đổi avatar user


## Posts

- Đăng bài viết (kèm ảnh)
- Hiển thị tất cả các post ra trang chủ

- Xóa post (nếu là người đăng)
- Like & Unlike post
- Comment post
- Xóa comment post (nếu là người comment)



---

# Quick Start

### Add a default.json file in config folder with the following

```
{
    MONGO_URL= ""
    CLOUDINARY_CLOUDNAME = ""
    CLOUDINARY_APIKEY = ""
    CLOUDINARY_APISECRET = ""
    SESSION_USER= ""
    SESSION_PASS= ""
}
```

### Install server dependencies

```
npm install
```

### Install client dependencies

```
cd client
npm install
```

### Run both Express & React from root

```
npm run dev
```




### Author

Nguyen Cong Quyen - CoderX

### Version

1.0.0
