package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.PTPackage;

@Repository
public interface PTPackageRepository extends JpaRepository<PTPackage, Long> {
    
    /**
     * Tìm gói PT theo tên gói (không phân biệt hoa thường)
     * 
     * @param packageName Tên gói PT
     * @return Gói PT
     */
    PTPackage findByPackageNameIgnoreCase(String packageName);
    
    /**
     * Kiểm tra xem tên gói PT đã tồn tại chưa (không phân biệt hoa thường)
     * 
     * @param packageName Tên gói PT
     * @return true nếu đã tồn tại, false nếu chưa tồn tại
     */
    boolean existsByPackageNameIgnoreCase(String packageName);
    
    /**
     * Tìm các gói PT đang hoạt động
     * 
     * @return Danh sách các gói PT đang hoạt động
     */
    List<PTPackage> findByIsActiveTrue();
    
    /**
     * Tìm các gói PT theo khoảng giá
     * 
     * @param minPrice Giá tối thiểu
     * @param maxPrice Giá tối đa
     * @return Danh sách các gói PT
     */
    @Query("SELECT p FROM PTPackage p WHERE p.price BETWEEN :minPrice AND :maxPrice AND p.isActive = true")
    List<PTPackage> findByPriceBetweenAndActive(@Param("minPrice") java.math.BigDecimal minPrice, @Param("maxPrice") java.math.BigDecimal maxPrice);
    
    /**
     * Tìm các gói PT theo số buổi tập (lớn hơn hoặc bằng)
     * 
     * @param sessions Số buổi tập
     * @return Danh sách các gói PT
     */
    @Query("SELECT p FROM PTPackage p WHERE p.numberOfSessions >= :sessions AND p.isActive = true")
    List<PTPackage> findByNumberOfSessionsGreaterThanEqual(@Param("sessions") Integer sessions);
    
    /**
     * Tìm các gói PT có giảm giá
     * 
     * @return Danh sách các gói PT có giảm giá
     */
    @Query("SELECT p FROM PTPackage p WHERE p.discountPercentage > 0 AND p.isActive = true")
    List<PTPackage> findWithDiscount();
    
    /**
     * Tìm các gói PT phổ biến nhất (dựa trên số lượng đăng ký)
     * 
     * @param limit Số lượng gói PT tối đa
     * @return Danh sách các gói PT phổ biến nhất
     */
    @Query(value = "SELECT p.* FROM pt_packages p " +
                  "JOIN user_pt_packages up ON p.package_id = up.package_id " +
                  "GROUP BY p.package_id " +
                  "ORDER BY COUNT(up.user_package_id) DESC " +
                  "LIMIT :limit", nativeQuery = true)
    List<PTPackage> findMostPopularPackages(@Param("limit") int limit);
}