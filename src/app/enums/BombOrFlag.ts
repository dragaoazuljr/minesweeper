export enum BombOrEmpty {
    Bomb = "bomb",
    "00" = "",
    "01" = "1",
    "02" = "2",
    "03" = "3",
    "04" = "4",
    "05" = "5",
    "06" = "6",
    "07" = "7",
    "08" = "8",
}

export interface BombOrFlag {
    bombOrEmpty: BombOrEmpty;
    flagged: boolean;
}