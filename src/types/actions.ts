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

export type UserInfo = {
    id: number;
    email: string;
    name: string;
    isVerified: boolean;
    isStaff: boolean;
    pictureUri: string;
    createdAt: Date;
    lastUpdatedAt: Date;
};
