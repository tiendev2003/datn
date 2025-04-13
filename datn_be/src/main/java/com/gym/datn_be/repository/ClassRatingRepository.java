package com.gym.datn_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gym.datn_be.entity.ClassRating;
import com.gym.datn_be.entity.ClassSchedule;
import com.gym.datn_be.entity.User;

@Repository
public interface ClassRatingRepository extends JpaRepository<ClassRating, Long> {
    List<ClassRating> findByUser(User user);
    List<ClassRating> findByClassSchedule(ClassSchedule classSchedule);
    List<ClassRating> findByRatingGreaterThanEqual(int minRating);
    List<ClassRating> findByRatingLessThanEqual(int maxRating);

    @Query("SELECT AVG(cr.rating) FROM ClassRating cr WHERE cr.classSchedule = :classSchedule")
    double averageByClassSchedule(@Param("classSchedule") ClassSchedule classSchedule);
}