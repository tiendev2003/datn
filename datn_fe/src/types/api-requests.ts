// Common request interfaces for API calls

// Authentication requests
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// User profile requests
export interface UpdateUserProfileRequest {
  name?: string;
  height?: number;
  weight?: number;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  healthConditions?: string;
  fitnessGoals?: string;
  notes?: string;
}

// Workout related requests
export interface CreateWorkoutPlanRequest {
  userId: number;
  trainerId: number;
  planName: string;
  description?: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  notes?: string;
}

export interface UpdateWorkoutPlanRequest {
  planName?: string;
  description?: string;
  endDate?: string; // YYYY-MM-DD
  planStatus?: string;
  notes?: string;
}

export interface CreateWorkoutSessionRequest {
  workoutPlanId: number;
  sessionName: string;
  scheduledDate: string; // YYYY-MM-DD
  notes?: string;
}

export interface UpdateWorkoutSessionRequest {
  sessionName?: string;
  scheduledDate?: string; // YYYY-MM-DD
  completedDate?: string; // YYYY-MM-DD
  sessionStatus?: string;
  notes?: string;
}

export interface WorkoutExerciseRequest {
  exerciseId: number;
  sequenceNumber: number;
  sets?: number;
  reps?: string;
  weight?: string;
  duration?: string;
  restPeriod?: string;
  notes?: string;
}

// Class booking requests
export interface CreateClassBookingRequest {
  userId: number;
  scheduleId: number;
}

export interface CancelClassBookingRequest {
  bookingId: number;
  cancellationReason?: string;
}

// PT session requests
export interface CreatePTSessionRequest {
  userPackageId: number;
  scheduledStart: string; // ISO date string
  scheduledEnd: string; // ISO date string
  userNotes?: string;
}

export interface UpdatePTSessionRequest {
  scheduledStart?: string; // ISO date string
  scheduledEnd?: string; // ISO date string
  actualStart?: string; // ISO date string
  actualEnd?: string; // ISO date string
  sessionStatus?: string;
  cancellationReason?: string;
  userNotes?: string;
  trainerNotes?: string;
}

// Membership requests
export interface CreateMembershipRequest {
  userId: number;
  membershipTypeId: number;
  startDate: string; // YYYY-MM-DD
  actualPrice: number;
  notes?: string;
}

export interface UpdateMembershipRequest {
  membershipStatus?: string;
  paymentStatus?: string;
  freezeStartDate?: string; // YYYY-MM-DD
  freezeEndDate?: string; // YYYY-MM-DD
  notes?: string;
}

// Payment requests
export interface CreatePaymentRequest {
  userId: number;
  paymentType: string;
  referenceId?: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentDetails?: string;
  notes?: string;
}

export interface ProcessRefundRequest {
  paymentId: number;
  amount: number;
  refundReason: string;
  notes?: string;
}

// Feedback requests
export interface CreateFeedbackRequest {
  userId: number;
  feedbackType: string;
  subject: string;
  message: string;
  rating?: number;
  trainerId?: number;
  classId?: number;
  isAnonymous?: boolean;
}

export interface RespondToFeedbackRequest {
  feedbackId: number;
  response: string;
  status: string;
}

// Pagination and filtering parameters
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface DateRangeParams {
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}

export interface UserFilterParams extends PaginationParams {
  searchTerm?: string;
  status?: string;
  role?: string;
}

export interface WorkoutFilterParams extends PaginationParams, DateRangeParams {
  userId?: number;
  trainerId?: number;
  status?: string;
}

export interface ClassFilterParams extends PaginationParams, DateRangeParams {
  classTypeId?: number;
  trainerId?: number;
  status?: string;
}