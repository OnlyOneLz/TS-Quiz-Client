// Common Types

export type UserID = string | null;

export type anyProgress = number | null;

export interface HomeProgressProps {
    prop: boolean;
    preLevelProgressNum: anyProgress;
    upLevel: boolean;
}
