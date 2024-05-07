// Common Types

export type UserID = string | null;

export type PreviousLevelProgress = number | null;

export interface HomeProgressProps {
    prop: boolean;
    preLevelProgressNum: PreviousLevelProgress;
    upLevel: boolean;
}
