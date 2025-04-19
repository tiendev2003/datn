-- Câu 1: Liệt kê thông tin toàn bộ Sản phẩm.
SELECT 
    sp.MaSP,
    sp.TenSP,
    dm.TenDanhMuc,
    sp.GiaTien,
    sp.SoLuong,
    sp.XuatXu
FROM 
    SANPHAM sp
    INNER JOIN DMSANPHAM dm ON sp.MaDM = dm.MaDM;

-- Câu 2: Xóa toàn bộ khách hàng có DiaChi là 'Lang Son'.
DELETE FROM CHITIETDONHANG 
WHERE MaDH IN (
    SELECT MaDH 
    FROM DONHANG 
    WHERE MaKH IN (
        SELECT MaKH 
        FROM KHACHHANG 
        WHERE DiaChi = 'Lang Son'
    )
);

DELETE FROM DONHANG 
WHERE MaKH IN (
    SELECT MaKH 
    FROM KHACHHANG 
    WHERE DiaChi = 'Lang Son'
);

DELETE FROM KHACHHANG 
WHERE DiaChi = 'Lang Son';

-- Câu 3: Cập nhật giá trị của trường XuatXu trong bảng SanPham thành 'Viet Nam' đối với trường XuatXu có giá trị là 'VN'.

UPDATE SANPHAM
SET XuatXu = 'Viet Nam'
WHERE XuatXu = 'VN';
-- Câu 4: Liệt kê thông tin những sản phẩm có SoLuong lớn hơn 50 thuộc danh mục là 'Thoi trang nu' và những Sản phẩm có SoLuong lớn hơn 100 thuộc danh mục là 'Thoi trang nam'.

SELECT 
    sp.MaSP,
    sp.TenSP,
    dm.TenDanhMuc,
    sp.GiaTien,
    sp.SoLuong,
    sp.XuatXu
FROM 
    SANPHAM sp
    INNER JOIN DMSANPHAM dm ON sp.MaDM = dm.MaDM
WHERE 
    (dm.TenDanhMuc = 'Thoi trang nu' AND sp.SoLuong > 50)
    OR
    (dm.TenDanhMuc = 'Thoi trang nam' AND sp.SoLuong > 100);

-- Câu 5: Liệt kê những khách hàng có tên bắt đầu là ký tự 'A' và có độ dài là 5 ký tự.

SELECT 
    MaKH,
    TenKH,
    Email,
    SoDT,
    DiaChi
FROM 
    KHACHHANG
WHERE 
    TenKH LIKE 'A%'
    AND LEN(TenKH) = 5;
-- Câu 6: Liệt kê toàn bộ Sản phẩm, sắp xếp giảm dần theo TenSP và tăng dần theo GiaTien.

SELECT 
    sp.MaSP,
    sp.TenSP,
    dm.TenDanhMuc,
    sp.GiaTien,
    sp.SoLuong,
    sp.XuatXu
FROM 
    SANPHAM sp
    INNER JOIN DMSANPHAM dm ON sp.MaDM = dm.MaDM
ORDER BY 
    sp.TenSP DESC, 
    sp.SoLuong ASC;
-- Câu 7: Đếm các sản phẩm tương ứng theo từng khách hàng đã đặt hàng chỉ đếm những Sản phẩm được khách hàng đặt hàng trên 5 sản phẩm.

SELECT 
    kh.MaKH,
    kh.TenKH,
    COUNT(DISTINCT ctdh.MaSP) AS SoLuongSanPham
FROM 
    KHACHHANG kh
    INNER JOIN DONHANG dh ON kh.MaKH = dh.MaKH
    INNER JOIN CHITIETDONHANG ctdh ON dh.MaDH = ctdh.MaDH
GROUP BY 
    kh.MaKH,
    kh.TenKH
HAVING 
    SUM(ctdh.SoLuong) > 5;
-- Câu 8: Liệt kê tên toàn bộ khách hàng (tên giống liệt kê 1 lần)

SELECT DISTINCT TenKH
FROM KHACHHANG;

-- Câu 9: Liệt kê MaKH, TenKH, TenSP, SoLuong, NgayDat, GiaTien, TongTien (của tất cả các lần đặt hàng của khách hàng).

SELECT 
    kh.MaKH,
    kh.TenKH,
    sp.TenSP,
    ctdh.SoLuong,
    dh.NgayDat,
    sp.GiaTien,
    ctdh.TongTien
FROM 
    KHACHHANG kh
    INNER JOIN DONHANG dh ON kh.MaKH = dh.MaKH
    INNER JOIN CHITIETDONHANG ctdh ON dh.MaDH = ctdh.MaDH
    INNER JOIN SANPHAM sp ON ctdh.MaSP = sp.MaSP;

-- Câu 10: Liệt kê MaKH, TenKH, MaDH, TenSP, SoLuong, TongTien của tất cả các lần đặt hàng của khách hàng.
-- (những khách hàng chưa đặt hàng lần nào thì vẫn phải liệt kê khách hàng đó ra).

SELECT 
    kh.MaKH,
    kh.TenKH,
    dh.MaDH,
    sp.TenSP,
    ctdh.SoLuong,
    ctdh.TongTien
FROM 
    KHACHHANG kh
    LEFT JOIN DONHANG dh ON kh.MaKH = dh.MaKH
    LEFT JOIN CHITIETDONHANG ctdh ON dh.MaDH = ctdh.MaDH
    LEFT JOIN SANPHAM sp ON ctdh.MaSP = sp.MaSP;

-- Câu 11: Liệt kê MaKH, TenKH của những khách hàng đã từng đặt hàng với hình thức thanh toán qua 'Visa' hoặc các hình thức thanh toán qua 'JCB'.

SELECT DISTINCT 
    kh.MaKH,
    kh.TenKH
FROM 
    KHACHHANG kh
    INNER JOIN DONHANG dh ON kh.MaKH = dh.MaKH
    INNER JOIN THANHTOAN tt ON dh.MaTT = tt.MaTT
WHERE 
    tt.PhuongThucTT IN ('Visa', 'JCB');

-- Câu 12: Liệt kê MaKH, TenKH của những khách hàng chưa từng mua bất kỳ sản phẩm nào.

SELECT 
    kh.MaKH,
    kh.TenKH
FROM 
    KHACHHANG kh
    LEFT JOIN DONHANG dh ON kh.MaKH = dh.MaKH
WHERE 
    dh.MaDH IS NULL;

-- Câu 13: Liệt kê MaKH, TenKH, TenSP, SoLuong, GiaTien, PhuongThucTT, NgayDat, TongTien của những Khách hàng có địa chỉ là 'Da Nang' và mới thực hi đặt hàng một lần duy nhất. Kết quả liệt kê được sắp xếp tăng dần của trường
SELECT 
    kh.MaKH,
    kh.TenKH,
    sp.TenSP,
    ctdh.SoLuong,
    sp.GiaTien,
    tt.PhuongThucTT,
    dh.NgayDat,
    ctdh.TongTien
FROM 
    KHACHHANG kh
    INNER JOIN DONHANG dh ON kh.MaKH = dh.MaKH
    INNER JOIN CHITIETDONHANG ctdh ON dh.MaDH = ctdh.MaDH
    INNER JOIN SANPHAM sp ON ctdh.MaSP = sp.MaSP
    INNER JOIN THANHTOAN tt ON dh.MaTT = tt.MaTT
WHERE 
    kh.DiaChi = 'Da Nang'
    AND kh.MaKH IN (
        SELECT MaKH
        FROM DONHANG
        GROUP BY MaKH
        HAVING COUNT(MaDH) = 1
    )
ORDER BY 
    kh.TenKH ASC;