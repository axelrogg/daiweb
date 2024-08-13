export type MaterialReservation = {
    id: number;
    userId: number;
    material: string;
    status: string;
    isActive: boolean;
    createdAt: Date;
    validUntil: Date;
};

export type MaterialReservations = MaterialReservation[];

export type MaterialLoan = {
    id: number;
    material: string;
    isActive: boolean;
    createdAt: Date;
    validUntil: Date;
    //renewed_count: number
    userId: number;
    //loanedBy: number;
    //lastUpdatedAt: Date
    status: string;
    //returnedBy: number
};

export type MaterialLoans = MaterialLoan[];

export type DbUserInfo = {
    id: number;
    external_id: string;
    email: string;
    is_verified: boolean;
    is_staff: boolean;
    created_at: Date;
    last_updated_at: Date;
};

export type UserInfo = {
    id: number;
    externalId: string;
    email: string;
    isVerified: boolean;
    isStaff: boolean;
    createdAt: Date;
    lastUpdatedAt: Date;
};
