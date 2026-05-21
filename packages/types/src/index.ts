export type OrderStatus =
    | 'PENDING'
    | 'PREPARING'
    | 'COMPLETED'
    | 'CANCELLED';

export interface DashboardStats {
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
}