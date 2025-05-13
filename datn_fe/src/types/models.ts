// User-related types
export interface User {
  id?: number;
  email: string;
  username: string;
  isEmailVerified: boolean;
  activationToken?: string;
  resetToken?: string;
  preferredLanguage: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  isDeleted: boolean;
  deletionDate?: Date;
  failedLoginAttempts: number;
  accountLockedUntil?: Date;
  lastLoginIp?: string;
  gender?: Gender;
  roles?: Role[];
  userProfile?: UserProfile;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export interface UserProfile {
  profileId?: number;
  user?: User;
  height?: number;
  weight?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  healthConditions?: string;
  fitnessGoals?: string;
  notes?: string;
  name?: string;
  updatedAt: Date;
}

export interface Role {
  roleId?: number;
  roleName: string;
  name?: string;
  description?: string;
  permissions?: Permission[];
}

export interface Permission {
  permissionId?: number;
  name: string;
  description?: string;
}

// Trainer-related types
export interface TrainerProfile {
  trainerId?: number;
  user?: User;
  specialization?: string;
  certification?: string;
  experienceYears?: number;
  biography?: string;
  hourlyRate?: number;
  availableHoursPerWeek?: number;
  isActive: boolean;
  rating?: number;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  availabilities?: TrainerAvailability[];
  unavailabilities?: TrainerUnavailability[];
  ptPackages?: UserPTPackage[];
  classSchedules?: ClassSchedule[];
  assessments?: FitnessAssessment[];
  workoutPlans?: WorkoutPlan[];
}

export interface TrainerAvailability {
  availabilityId?: number;
  trainer?: TrainerProfile;
  dayOfWeek: number; // 1 (Monday) through 7 (Sunday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isRecurring: boolean;
}

export interface TrainerUnavailability {
  unavailabilityId?: number;
  trainer?: TrainerProfile;
  startDateTime: Date;
  endDateTime: Date;
  reason?: string;
}

export interface TrainerRating {
  ratingId?: number;
  user?: User;
  trainer?: TrainerProfile;
  session?: PTSession;
  rating: number;
  reviewText?: string;
  isAnonymous: boolean;
  isVerified: boolean;
  createdAt: Date;
}

// Workout-related types
export interface WorkoutPlan {
  planId?: number;
  user?: User;
  trainer?: TrainerProfile;
  planName: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  planStatus: PlanStatus;
  notes?: string;
}

export enum PlanStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export interface WorkoutSession {
  sessionId?: number;
  workoutPlan?: WorkoutPlan;
  sessionName: string;
  scheduledDate: Date;
  completedDate?: Date;
  notes?: string;
  sessionStatus: SessionStatus;
  exercises?: WorkoutExercise[];
}

export enum SessionStatus {
  PLANNED = 'PLANNED',
  COMPLETED = 'COMPLETED',
  MISSED = 'MISSED',
  RESCHEDULED = 'RESCHEDULED',
}

export interface WorkoutExercise {
  workoutExerciseId?: number;
  workoutSession?: WorkoutSession;
  exercise?: Exercise;
  sequenceNumber: number;
  sets?: number;
  reps?: string;
  weight?: string;
  duration?: string;
  restPeriod?: string;
  notes?: string;
  actualSetsCompleted?: number;
  actualRepsCompleted?: string;
  actualWeightUsed?: string;
  perceivedDifficulty?: number;
}

export interface Exercise {
  exerciseId?: number;
  exerciseName: string;
  description?: string;
  category: ExerciseCategory;
  difficultyLevel: DifficultyLevel;
  instructions?: string;
  demoVideoUrl?: string;
  imageUrl?: string;
  targetMuscles?: string;
  isActive: boolean;
}

export enum ExerciseCategory {
  STRENGTH = 'STRENGTH',
  CARDIO = 'CARDIO',
  FLEXIBILITY = 'FLEXIBILITY',
  BALANCE = 'BALANCE',
  FUNCTIONAL = 'FUNCTIONAL',
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

// Fitness-related types
export interface FitnessGoal {
  goalId?: number;
  user?: User;
  trainer?: TrainerProfile;
  goalType: GoalType;
  goalDescription: string;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  startDate: Date;
  targetDate?: Date;
  status: GoalStatus;
  completionDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum GoalType {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  ENDURANCE = 'ENDURANCE',
  FLEXIBILITY = 'FLEXIBILITY',
  OVERALL_FITNESS = 'OVERALL_FITNESS',
  OTHER = 'OTHER',
}

export enum GoalStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  ACHIEVED = 'ACHIEVED',
  ABANDONED = 'ABANDONED',
}

export interface FitnessAssessment {
  assessmentId?: number;
  user?: User;
  trainer?: TrainerProfile;
  assessmentDate: Date;
  weight?: number;
  bodyFatPercentage?: number;
  muscleMass?: number;
  bmi?: number;
  chestMeasurement?: number;
  waistMeasurement?: number;
  hipMeasurement?: number;
  armMeasurement?: number;
  thighMeasurement?: number;
  cardiovascularFitness?: string;
  flexibility?: string;
  strength?: string;
  notes?: string;
  createdAt: Date;
}

// Class-related types
export interface ClassType {
  classTypeId?: number;
  typeName: string;
  description?: string;
  durationMinutes: number;
  maxCapacity: number;
  intensity?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  schedules?: ClassSchedule[];
}

export interface ClassSchedule {
  scheduleId?: number;
  classType?: ClassType;
  trainer?: TrainerProfile;
  startTime: Date;
  endTime: Date;
  status: ClassStatus;
  maxAttendees?: number;
  notes?: string;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt?: Date;
  bookings?: ClassBooking[];
}

export enum ClassStatus {
  SCHEDULED = 'SCHEDULED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export interface ClassBooking {
  bookingId?: number;
  user?: User;
  classSchedule?: ClassSchedule;
  bookingTime: Date;
  status: BookingStatus;
  attended: boolean;
  cancellationReason?: string;
  cancellationTime?: Date;
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  ATTENDED = 'ATTENDED',
}

// Membership-related types
export interface MembershipType {
  membershipTypeId?: number;
  typeName: string;
  description?: string;
  durationDays: number;
  price: number;
  maxFreezeDays?: number;
  guestPasses?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  memberships?: Membership[];
  benefits?: MembershipBenefit[];
}

export interface MembershipBenefit {
  benefitId?: number;
  benefitName: string;
  description?: string;
  icon?: string;
  membershipTypes?: MembershipType[];
}

export interface Membership {
  membershipId?: number;
  user?: User;
  membershipType?: MembershipType;
  startDate: Date;
  endDate: Date;
  membershipStatus: MembershipStatus;
  paymentStatus: MembershipPaymentStatus;
  actualPrice: number;
  freezeStartDate?: Date;
  freezeEndDate?: Date;
  freezeDaysUsed?: number;
  remainingGuestPasses?: number;
  issuedBy?: User;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  renewals?: MembershipRenewal[];
}

export enum MembershipStatus {
  Active = 'Active',
  Expired = 'Expired',
  Frozen = 'Frozen',
  Cancelled = 'Cancelled',
}

export enum MembershipPaymentStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Failed = 'Failed',
  Refunded = 'Refunded',
}

export interface MembershipRenewal {
  renewalId?: number;
  membership?: Membership;
  previousEndDate: Date;
  newEndDate: Date;
  renewalDate: Date;
  amount: number;
  renewedBy?: User;
  notes?: string;
}

// PT Package related types
export interface PTPackage {
  packageId?: number;
  packageName: string;
  description?: string;
  numberOfSessions: number;
  validityDays: number;
  price: number;
  discountPercentage?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userPTPackages?: UserPTPackage[];
}

export interface UserPTPackage {
  userPackageId?: number;
  user?: User;
  ptPackage?: PTPackage;
  trainer?: TrainerProfile;
  purchaseDate: Date;
  expiryDate: Date;
  totalSessions: number;
  remainingSessions: number;
  packageStatus: PackageStatus;
  notes?: string;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum PackageStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface PTSession {
  sessionId?: number;
  userPackage?: UserPTPackage;
  user?: User;
  trainer?: TrainerProfile;
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart?: Date;
  actualEnd?: Date;
  sessionStatus: SessionStatus;
  cancellationReason?: string;
  userNotes?: string;
  trainerNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Payment-related types
export interface Payment {
  paymentId?: number;
  user?: User;
  paymentType: PaymentType;
  referenceId?: number;
  amount: number;
  currency: string;
  paymentDate: Date;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  paymentDetails?: string;
  processedBy?: User;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentType {
  MEMBERSHIP = 'MEMBERSHIP',
  PT_PACKAGE = 'PT_PACKAGE',
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  REFUND = 'REFUND',
  OTHER = 'OTHER',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  E_WALLET = 'E_WALLET',
  OTHER = 'OTHER',
}

export interface PaymentMethodModel {
  methodId?: number;
  methodName: string;
  description?: string;
  isActive: boolean;
}

export interface UserPaymentMethod {
  userMethodId?: number;
  user?: User;
  paymentMethod?: PaymentMethodModel;
  cardLastFour?: string;
  cardExpiry?: string;
  cardType?: string;
  billingAddress?: string;
  isDefault: boolean;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  invoiceId?: number;
  user?: User;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  amount: number;
  taxAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: InvoiceStatus;
  notes?: string;
  createdBy?: User;
  createdAt: Date;
  updatedAt: Date;
  items?: InvoiceItem[];
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  ISSUED = 'ISSUED',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export interface InvoiceItem {
  itemId?: number;
  invoice?: Invoice;
  itemType: ItemType;
  description: string;
  quantity: number;
  unitPrice: number;
  taxPercentage: number;
  discountPercentage: number;
  totalAmount: number;
  relatedEntityType?: string;
  relatedEntityId?: number;
}

export enum ItemType {
  MEMBERSHIP = 'MEMBERSHIP',
  PT_PACKAGE = 'PT_PACKAGE',
  CLASS = 'CLASS',
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
  OTHER = 'OTHER',
}

export interface Refund {
  refundId?: number;
  payment?: Payment;
  refundDate: Date;
  amount: number;
  refundReason: string;
  transactionId?: string;
  refundStatus: RefundStatus;
  processedBy?: User;
  notes?: string;
  createdAt: Date;
}

export enum RefundStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

// Activity and metrics
export interface UserActivityMetric {
  metricId?: number;
  user?: User;
  activityDate: Date;
  visitCount: number;
  totalDurationMinutes: number;
  classAttendances: number;
  ptSessions: number;
  lastUpdated: Date;
}

export interface SystemMetric {
  metricId?: number;
  location: string;
  metricDate: Date;
  totalVisitors: number;
  newMembers: number;
  totalBookings: number;
  classBookings: number;
  ptBookings: number;
  membershipSales: number;
  ptPackageSales: number;
  otherSales: number;
  totalRevenue: number;
  updatedAt: Date;
}

// Others
export interface Feedback {
  feedbackId?: number;
  user?: User;
  feedbackType: FeedbackType;
  subject: string;
  message: string;
  rating?: number;
  trainer?: TrainerProfile;
  classSchedule?: ClassSchedule;
  isAnonymous: boolean;
  status: FeedbackStatus;
  response?: string;
  respondedBy?: User;
  responseDate?: Date;
  createdAt: Date;
}

export enum FeedbackType {
  GENERAL = 'GENERAL',
  CLASS = 'CLASS',
  TRAINER = 'TRAINER',
  STAFF = 'STAFF',
  OTHER = 'OTHER',
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  RESPONDED = 'RESPONDED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface Referral {
  referralId?: number;
  referrer?: User;
  referred?: User;
  referralCode: string;
  referralDate?: Date;
  signupDate?: Date;
  status: ReferralStatus;
  rewardStatus?: RewardStatus;
  rewardDetails?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ReferralStatus {
  PENDING = 'PENDING',
  REGISTERED = 'REGISTERED',
  CONVERTED = 'CONVERTED',
  EXPIRED = 'EXPIRED',
}

export enum RewardStatus {
  PENDING = 'PENDING',
  ISSUED = 'ISSUED',
  CLAIMED = 'CLAIMED',
}

// Equipment and maintenance
export interface Equipment {
  equipmentId?: number;
  name: string;
  description?: string;
  serialNumber?: string;
  brand?: string;
  model?: string;
  purchaseDate?: Date;
  purchasePrice?: number;
  warrantyExpiration?: Date;
  location?: string;
  status: EquipmentStatus;
  notes?: string;
  maintenanceSchedule?: string;
  lastMaintenanceDate?: Date;
  nextMaintenanceDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  maintenanceLogs?: MaintenanceLog[];
}

export enum EquipmentStatus {
  AVAILABLE = 'AVAILABLE',
  IN_USE = 'IN_USE',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
  OUT_OF_ORDER = 'OUT_OF_ORDER',
  RETIRED = 'RETIRED'
}

export interface MaintenanceLog {
  logId?: number;
  equipment?: Equipment;
  maintenanceDate: Date;
  description: string;
  performedBy?: string;
  cost?: number;
  nextMaintenanceDate?: Date;
  isPreventive: boolean;
  status: MaintenanceStatus;
  notes?: string;
  createdAt: Date;
  updatedBy?: number;
}

export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

// Attendance tracking
export interface Attendance {
  attendanceId?: number;
  user?: User;
  checkInTime: Date;
  checkOutTime?: Date;
  duration?: number;
  checkInMethod: CheckInMethod;
  checkOutMethod?: CheckInMethod;
  notes?: string;
  createdAt: Date;
}

export enum CheckInMethod {
  CARD = 'CARD',
  QR_CODE = 'QR_CODE',
  FINGERPRINT = 'FINGERPRINT',
  FACE_RECOGNITION = 'FACE_RECOGNITION',
  MANUAL = 'MANUAL'
}

// Activity logging
export interface ActivityLog {
  logId?: number;
  user?: User;
  activityType: ActivityType;
  description: string;
  entityType?: string;
  entityId?: number;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export enum ActivityType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  VIEW = 'VIEW',
  EXPORT = 'EXPORT',
  IMPORT = 'IMPORT',
  PAYMENT = 'PAYMENT',
  BOOKING = 'BOOKING',
  CHECK_IN = 'CHECK_IN',
  CHECK_OUT = 'CHECK_OUT',
  OTHER = 'OTHER'
}

// Notification system
export interface Notification {
  notificationId?: number;
  user?: User;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedEntityType?: string;
  relatedEntityId?: number;
  createdAt: Date;
  scheduledFor?: Date;
  expiresAt?: Date;
}

export enum NotificationType {
  GENERAL = 'GENERAL',
  PAYMENT = 'PAYMENT',
  MEMBERSHIP = 'MEMBERSHIP',
  CLASS = 'CLASS',
  PT_SESSION = 'PT_SESSION',
  SYSTEM = 'SYSTEM',
  PROMOTION = 'PROMOTION'
}

export interface NotificationTemplate {
  templateId?: number;
  name: string;
  title: string;
  messageTemplate: string;
  type: NotificationType;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Promotion and marketing
export interface Promotion {
  promotionId?: number;
  code: string;
  name: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  applicableFor: ApplicableFor;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  createdBy?: User;
  createdAt: Date;
  updatedAt: Date;
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT'
}

export enum ApplicableFor {
  ALL = 'ALL',
  MEMBERSHIP = 'MEMBERSHIP',
  PT_PACKAGE = 'PT_PACKAGE',
  CLASS = 'CLASS',
  PRODUCT = 'PRODUCT'
}

// Resource booking
export interface Resource {
  resourceId?: number;
  name: string;
  type: ResourceType;
  description?: string;
  capacity?: number;
  location?: string;
  isActive: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  bookings?: ResourceBooking[];
}

export enum ResourceType {
  ROOM = 'ROOM',
  EQUIPMENT = 'EQUIPMENT',
  AREA = 'AREA',
  OTHER = 'OTHER'
}

export interface ResourceBooking {
  bookingId?: number;
  resource?: Resource;
  user?: User;
  trainer?: TrainerProfile;
  startTime: Date;
  endTime: Date;
  purpose: string;
  attendees?: number;
  status: ResourceBookingStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ResourceBookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}