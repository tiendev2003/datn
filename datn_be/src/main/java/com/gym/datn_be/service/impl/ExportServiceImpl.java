package com.gym.datn_be.service.impl;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.gym.datn_be.dto.response.PTPackageResponse;
import com.gym.datn_be.dto.response.PTRevenueReportResponse;
import com.gym.datn_be.service.ExportService;
import com.gym.datn_be.service.PTPackageManagementService;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExportServiceImpl implements ExportService {

    private final PTPackageManagementService ptPackageManagementService;
    
    @Override
    public Resource exportPTRevenueReport(LocalDate startDate, LocalDate endDate, String format) {
        // Lấy dữ liệu doanh thu từ service
        List<PTRevenueReportResponse> revenueData = ptPackageManagementService.generateRevenueReport(startDate, endDate);
        
        if ("excel".equalsIgnoreCase(format)) {
            return createExcelPTRevenueReport(revenueData, startDate, endDate);
        } else if ("pdf".equalsIgnoreCase(format)) {
            return createPdfPTRevenueReport(revenueData, startDate, endDate);
        } else {
            throw new IllegalArgumentException("Format không hỗ trợ: " + format + ". Chỉ hỗ trợ excel hoặc pdf.");
        }
    }
    
    @Override
    public Resource exportPTPackages(String format) {
        // Lấy dữ liệu về các gói PT từ service
        List<PTPackageResponse> packages = ptPackageManagementService.getAllPTPackages();
        
        if ("excel".equalsIgnoreCase(format)) {
            return createExcelPTPackageReport(packages);
        } else if ("pdf".equalsIgnoreCase(format)) {
            return createPdfPTPackageReport(packages);
        } else {
            throw new IllegalArgumentException("Format không hỗ trợ: " + format + ". Chỉ hỗ trợ excel hoặc pdf.");
        }
    }
    
    // Create Excel report for PT Revenue
    private Resource createExcelPTRevenueReport(List<PTRevenueReportResponse> revenueData, LocalDate startDate, LocalDate endDate) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("PT Revenue Report");
            
            // Create header row style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            
            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"STT", "Thời gian", "Tổng gói bán được", "Tổng doanh thu", "Tỷ lệ hoàn thành", "Tỷ lệ hủy"};
            
            for (int i = 0; i < columns.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
                sheet.autoSizeColumn(i);
            }
            
            // Add report title and date range in merged cells above the header
            Row titleRow = sheet.createRow(sheet.getFirstRowNum() - 1);
            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 16);
            titleStyle.setFont(titleFont);
            
            org.apache.poi.ss.usermodel.Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("BÁO CÁO DOANH THU TỪ GÓI PT");
            titleCell.setCellStyle(titleStyle);
            
            Row dateRangeRow = sheet.createRow(sheet.getFirstRowNum());
            org.apache.poi.ss.usermodel.Cell dateRangeCell = dateRangeRow.createCell(0);
            dateRangeCell.setCellValue("Từ " + startDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + 
                                    " đến " + endDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            
            // Fill data row (since the PTRevenueReportResponse is a summary, we just have one main row)
            if (!revenueData.isEmpty()) {
                PTRevenueReportResponse data = revenueData.get(0); // Get the first report (should be the only one)
                
                Row row = sheet.createRow(1);
                row.createCell(0).setCellValue(1); // STT
                row.createCell(1).setCellValue(data.getStartDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + 
                               " - " + data.getEndDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
                row.createCell(2).setCellValue(data.getTotalPackagesSold());
                row.createCell(3).setCellValue(data.getTotalRevenue().doubleValue());
                row.createCell(4).setCellValue(data.getCompletionRate() + "%");
                row.createCell(5).setCellValue(data.getCancellationRate() + "%");
                
                // Add additional sections for detailed breakdowns
                int rowNum = 3;
                
                // Revenue by Trainer breakdown
                Row trainerHeaderRow = sheet.createRow(rowNum++);
                trainerHeaderRow.createCell(0).setCellValue("DOANH THU THEO HUẤN LUYỆN VIÊN");
                CellStyle sectionHeaderStyle = workbook.createCellStyle();
                Font sectionHeaderFont = workbook.createFont();
                sectionHeaderFont.setBold(true);
                sectionHeaderStyle.setFont(sectionHeaderFont);
                trainerHeaderRow.getCell(0).setCellStyle(sectionHeaderStyle);
                
                rowNum++;
                Row trainerTableHeaderRow = sheet.createRow(rowNum++);
                trainerTableHeaderRow.createCell(0).setCellValue("STT");
                trainerTableHeaderRow.createCell(1).setCellValue("Tên huấn luyện viên");
                trainerTableHeaderRow.createCell(2).setCellValue("Doanh thu");
                
                Map<String, BigDecimal> revenueByTrainer = data.getRevenueByTrainer();
                int trainerNum = 1;
                for (Map.Entry<String, BigDecimal> entry : revenueByTrainer.entrySet()) {
                    Row trainerRow = sheet.createRow(rowNum++);
                    trainerRow.createCell(0).setCellValue(trainerNum++);
                    trainerRow.createCell(1).setCellValue(entry.getKey());
                    trainerRow.createCell(2).setCellValue(entry.getValue().doubleValue());
                }
                
                // Revenue by Package breakdown
                rowNum += 2;
                Row packageHeaderRow = sheet.createRow(rowNum++);
                packageHeaderRow.createCell(0).setCellValue("DOANH THU THEO GÓI TẬP");
                packageHeaderRow.getCell(0).setCellStyle(sectionHeaderStyle);
                
                rowNum++;
                Row packageTableHeaderRow = sheet.createRow(rowNum++);
                packageTableHeaderRow.createCell(0).setCellValue("STT");
                packageTableHeaderRow.createCell(1).setCellValue("Tên gói");
                packageTableHeaderRow.createCell(2).setCellValue("Doanh thu");
                packageTableHeaderRow.createCell(3).setCellValue("Số gói bán được");
                packageTableHeaderRow.createCell(4).setCellValue("Tỷ lệ");
                
                Map<String, BigDecimal> revenueByPackage = data.getRevenueByPackage();
                int packageNum = 1;
                
                if (data.getPackageDetails() != null) {
                    for (PTRevenueReportResponse.PackageRevenueDetail detail : data.getPackageDetails()) {
                        Row packageRow = sheet.createRow(rowNum++);
                        packageRow.createCell(0).setCellValue(packageNum++);
                        packageRow.createCell(1).setCellValue(detail.getPackageName());
                        packageRow.createCell(2).setCellValue(detail.getRevenue().doubleValue());
                        packageRow.createCell(3).setCellValue(detail.getPackagesSold());
                        packageRow.createCell(4).setCellValue(detail.getPercentageOfTotalRevenue() + "%");
                    }
                } else if (revenueByPackage != null) {
                    for (Map.Entry<String, BigDecimal> entry : revenueByPackage.entrySet()) {
                        Row packageRow = sheet.createRow(rowNum++);
                        packageRow.createCell(0).setCellValue(packageNum++);
                        packageRow.createCell(1).setCellValue(entry.getKey());
                        packageRow.createCell(2).setCellValue(entry.getValue().doubleValue());
                    }
                }
            }
            
            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            workbook.write(out);
            return new ByteArrayResource(out.toByteArray());
            
        } catch (Exception e) {
            log.error("Lỗi khi tạo Excel file: {}", e.getMessage());
            throw new RuntimeException("Không thể tạo báo cáo Excel", e);
        }
    }
    
    // Create PDF report for PT Revenue using modern iText API
    private Resource createPdfPTRevenueReport(List<PTRevenueReportResponse> revenueData, LocalDate startDate, LocalDate endDate) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            // Initialize PDF writer and document
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            
            // Add title
            Paragraph title = new Paragraph("BÁO CÁO DOANH THU TỪ GÓI PT")
                    .setFontSize(16)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);
            
            // Add date range
            Paragraph dateRange = new Paragraph("Từ " + startDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + 
                                            " đến " + endDate.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")))
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(dateRange);
            
            document.add(new Paragraph("\n")); // Add some space
            
            if (!revenueData.isEmpty()) {
                PTRevenueReportResponse data = revenueData.get(0);
                
                // Main summary table
                Table summaryTable = new Table(UnitValue.createPercentArray(new float[]{15, 35, 25, 25}));
                summaryTable.setWidth(UnitValue.createPercentValue(100));
                
                // Add summary headers
                Cell headerCell1 = new Cell()
                        .add(new Paragraph("Tổng gói bán được"))
                        .setBold()
                        .setBackgroundColor(new DeviceRgb(184, 218, 255))
                        .setTextAlignment(TextAlignment.CENTER);
                
                Cell headerCell2 = new Cell()
                        .add(new Paragraph("Tổng doanh thu"))
                        .setBold()
                        .setBackgroundColor(new DeviceRgb(184, 218, 255))
                        .setTextAlignment(TextAlignment.CENTER);
                
                Cell headerCell3 = new Cell()
                        .add(new Paragraph("Tỷ lệ hoàn thành"))
                        .setBold()
                        .setBackgroundColor(new DeviceRgb(184, 218, 255))
                        .setTextAlignment(TextAlignment.CENTER);
                
                Cell headerCell4 = new Cell()
                        .add(new Paragraph("Tỷ lệ hủy"))
                        .setBold()
                        .setBackgroundColor(new DeviceRgb(184, 218, 255))
                        .setTextAlignment(TextAlignment.CENTER);
                
                summaryTable.addCell(headerCell1);
                summaryTable.addCell(headerCell2);
                summaryTable.addCell(headerCell3);
                summaryTable.addCell(headerCell4);
                
                // Add summary values
                summaryTable.addCell(new Cell().add(new Paragraph(String.valueOf(data.getTotalPackagesSold()))).setTextAlignment(TextAlignment.CENTER));
                summaryTable.addCell(new Cell().add(new Paragraph(data.getTotalRevenue().toString())).setTextAlignment(TextAlignment.CENTER));
                summaryTable.addCell(new Cell().add(new Paragraph(data.getCompletionRate() + "%")).setTextAlignment(TextAlignment.CENTER));
                summaryTable.addCell(new Cell().add(new Paragraph(data.getCancellationRate() + "%")).setTextAlignment(TextAlignment.CENTER));
                
                document.add(summaryTable);
                document.add(new Paragraph("\n"));
                
                // Revenue by trainer breakdown
                document.add(new Paragraph("DOANH THU THEO HUẤN LUYỆN VIÊN").setBold().setFontSize(14));
                document.add(new Paragraph("\n"));
                
                Table trainerTable = new Table(UnitValue.createPercentArray(new float[]{10, 50, 40}));
                trainerTable.setWidth(UnitValue.createPercentValue(100));
                
                // Trainer table headers
                trainerTable.addHeaderCell(new Cell().add(new Paragraph("STT")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                trainerTable.addHeaderCell(new Cell().add(new Paragraph("Tên huấn luyện viên")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                trainerTable.addHeaderCell(new Cell().add(new Paragraph("Doanh thu")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                
                // Trainer table rows
                Map<String, BigDecimal> revenueByTrainer = data.getRevenueByTrainer();
                int trainerNum = 1;
                if (revenueByTrainer != null) {
                    for (Map.Entry<String, BigDecimal> entry : revenueByTrainer.entrySet()) {
                        trainerTable.addCell(new Cell().add(new Paragraph(String.valueOf(trainerNum++))).setTextAlignment(TextAlignment.CENTER));
                        trainerTable.addCell(new Cell().add(new Paragraph(entry.getKey())));
                        trainerTable.addCell(new Cell().add(new Paragraph(entry.getValue().toString())).setTextAlignment(TextAlignment.RIGHT));
                    }
                }
                
                document.add(trainerTable);
                document.add(new Paragraph("\n"));
                
                // Revenue by package breakdown
                document.add(new Paragraph("DOANH THU THEO GÓI TẬP").setBold().setFontSize(14));
                document.add(new Paragraph("\n"));
                
                Table packageTable = new Table(UnitValue.createPercentArray(new float[]{10, 30, 20, 20, 20}));
                packageTable.setWidth(UnitValue.createPercentValue(100));
                
                // Package table headers
                packageTable.addHeaderCell(new Cell().add(new Paragraph("STT")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                packageTable.addHeaderCell(new Cell().add(new Paragraph("Tên gói")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                packageTable.addHeaderCell(new Cell().add(new Paragraph("Doanh thu")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                packageTable.addHeaderCell(new Cell().add(new Paragraph("Số gói bán được")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                packageTable.addHeaderCell(new Cell().add(new Paragraph("Tỷ lệ")).setBold().setBackgroundColor(new DeviceRgb(184, 218, 255)).setTextAlignment(TextAlignment.CENTER));
                
                // Package table rows
                int packageNum = 1;
                if (data.getPackageDetails() != null) {
                    for (PTRevenueReportResponse.PackageRevenueDetail detail : data.getPackageDetails()) {
                        packageTable.addCell(new Cell().add(new Paragraph(String.valueOf(packageNum++))).setTextAlignment(TextAlignment.CENTER));
                        packageTable.addCell(new Cell().add(new Paragraph(detail.getPackageName())));
                        packageTable.addCell(new Cell().add(new Paragraph(detail.getRevenue().toString())).setTextAlignment(TextAlignment.RIGHT));
                        packageTable.addCell(new Cell().add(new Paragraph(String.valueOf(detail.getPackagesSold()))).setTextAlignment(TextAlignment.CENTER));
                        packageTable.addCell(new Cell().add(new Paragraph(detail.getPercentageOfTotalRevenue() + "%")).setTextAlignment(TextAlignment.CENTER));
                    }
                } else {
                    Map<String, BigDecimal> revenueByPackage = data.getRevenueByPackage();
                    if (revenueByPackage != null) {
                        for (Map.Entry<String, BigDecimal> entry : revenueByPackage.entrySet()) {
                            packageTable.addCell(new Cell().add(new Paragraph(String.valueOf(packageNum++))).setTextAlignment(TextAlignment.CENTER));
                            packageTable.addCell(new Cell().add(new Paragraph(entry.getKey())));
                            packageTable.addCell(new Cell().add(new Paragraph(entry.getValue().toString())).setTextAlignment(TextAlignment.RIGHT));
                            packageTable.addCell(new Cell().add(new Paragraph("-")).setTextAlignment(TextAlignment.CENTER));
                            packageTable.addCell(new Cell().add(new Paragraph("-")).setTextAlignment(TextAlignment.CENTER));
                        }
                    }
                }
                
                document.add(packageTable);
            }
            
            document.close();
            
            return new ByteArrayResource(out.toByteArray());
            
        } catch (Exception e) {
            log.error("Lỗi khi tạo PDF file: {}", e.getMessage());
            throw new RuntimeException("Không thể tạo báo cáo PDF", e);
        }
    }
    
    // Create Excel report for PT Packages
    private Resource createExcelPTPackageReport(List<PTPackageResponse> packages) {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            Sheet sheet = workbook.createSheet("PT Packages");
            
            // Create header row style
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            
            // Create header row
            Row headerRow = sheet.createRow(0);
            String[] columns = {"STT", "ID Gói", "Tên Gói", "Mô tả", "Số buổi tập", "Giá", "Giảm giá", "Trạng thái", "Số người sử dụng"};
            
            for (int i = 0; i < columns.length; i++) {
                org.apache.poi.ss.usermodel.Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }
            
            // Fill data rows
            int rowNum = 1;
            for (PTPackageResponse pkg : packages) {
                Row row = sheet.createRow(rowNum++);
                
                row.createCell(0).setCellValue(rowNum - 1); // STT
                row.createCell(1).setCellValue(pkg.getPackageId() != null ? pkg.getPackageId() : 0); // ID
                row.createCell(2).setCellValue(pkg.getPackageName() != null ? pkg.getPackageName() : ""); // Tên gói
                row.createCell(3).setCellValue(pkg.getDescription() != null ? pkg.getDescription() : ""); // Mô tả
                row.createCell(4).setCellValue(pkg.getNumberOfSessions() != null ? pkg.getNumberOfSessions() : 0); // Số buổi tập
                
                // Fix: Convert BigDecimal to double for price
                row.createCell(5).setCellValue(pkg.getPrice() != null ? pkg.getPrice().doubleValue() : 0.0); // Giá
                
                // Fix: Convert BigDecimal to double for discount percentage
                row.createCell(6).setCellValue(pkg.getDiscountPercentage() != null ? pkg.getDiscountPercentage().doubleValue() : 0.0); // Giảm giá
                
                row.createCell(7).setCellValue(pkg.isActive() ? "Hoạt động" : "Không hoạt động"); // Trạng thái
                row.createCell(8).setCellValue(pkg.getActiveUsersCount() != null ? pkg.getActiveUsersCount() : 0); // Số người sử dụng
            }
            
            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }
            
            // Add title
            Row titleRow = sheet.createRow(sheet.getFirstRowNum() - 1);
            org.apache.poi.ss.usermodel.Cell titleCell = titleRow.createCell(0);
            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 16);
            titleStyle.setFont(titleFont);
            titleCell.setCellValue("DANH SÁCH CÁC GÓI HUẤN LUYỆN VIÊN CÁ NHÂN (PT)");
            titleCell.setCellStyle(titleStyle);
            
            workbook.write(out);
            return new ByteArrayResource(out.toByteArray());
            
        } catch (Exception e) {
            log.error("Lỗi khi tạo Excel file: {}", e.getMessage());
            throw new RuntimeException("Không thể tạo báo cáo Excel", e);
        }
    }
    
    // Create PDF report for PT Packages using modern iText API
    private Resource createPdfPTPackageReport(List<PTPackageResponse> packages) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            // Initialize PDF writer and document
            PdfWriter writer = new PdfWriter(out);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            
            // Add title
            Paragraph title = new Paragraph("DANH SÁCH CÁC GÓI HUẤN LUYỆN VIÊN CÁ NHÂN (PT)")
                    .setFontSize(16)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);
            
            document.add(new Paragraph("\n")); // Add some space
            
            // Create table
            Table table = new Table(UnitValue.createPercentArray(new float[]{5, 8, 15, 20, 8, 12, 8, 12, 12}));
            table.setWidth(UnitValue.createPercentValue(100));
            
            // Add headers
            String[] headers = {"STT", "ID Gói", "Tên Gói", "Mô tả", "Số buổi", "Giá", "Giảm giá", "Trạng thái", "Số người dùng"};
            for (String header : headers) {
                Cell headerCell = new Cell()
                        .add(new Paragraph(header))
                        .setBold()
                        .setBackgroundColor(new DeviceRgb(184, 218, 255))
                        .setTextAlignment(TextAlignment.CENTER);
                table.addHeaderCell(headerCell);
            }
            
            // Add data rows
            int rowNum = 1;
            for (PTPackageResponse pkg : packages) {
                table.addCell(new Cell().add(new Paragraph(String.valueOf(rowNum++))).setTextAlignment(TextAlignment.CENTER));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(pkg.getPackageId()))).setTextAlignment(TextAlignment.CENTER));
                table.addCell(new Cell().add(new Paragraph(pkg.getPackageName())));
                
                // Handle potentially long descriptions
                String description = pkg.getDescription();
                if (description != null && description.length() > 50) {
                    description = description.substring(0, 47) + "...";
                }
                table.addCell(new Cell().add(new Paragraph(description)));
                
                table.addCell(new Cell().add(new Paragraph(String.valueOf(pkg.getNumberOfSessions()))).setTextAlignment(TextAlignment.CENTER));
                
                // Use toString() for BigDecimal values in PDF
                table.addCell(new Cell().add(new Paragraph(pkg.getPrice() != null ? pkg.getPrice().toString() : "0")).setTextAlignment(TextAlignment.RIGHT));
                table.addCell(new Cell().add(new Paragraph(pkg.getDiscountPercentage() != null ? pkg.getDiscountPercentage().toString() + "%" : "0%")).setTextAlignment(TextAlignment.CENTER));
                table.addCell(new Cell().add(new Paragraph(pkg.isActive() ? "Hoạt động" : "Không hoạt động")).setTextAlignment(TextAlignment.CENTER));
                table.addCell(new Cell().add(new Paragraph(String.valueOf(pkg.getActiveUsersCount()))).setTextAlignment(TextAlignment.CENTER));
            }
            
            document.add(table);
            document.close();
            
            return new ByteArrayResource(out.toByteArray());
            
        } catch (Exception e) {
            log.error("Lỗi khi tạo PDF file: {}", e.getMessage());
            throw new RuntimeException("Không thể tạo báo cáo PDF", e);
        }
    }
}