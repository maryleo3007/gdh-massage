export class UserModel {
    public $key: string;
    public mail: string;
    public reserved: boolean;
    public countReserved: number;
    public countAgendas: number;
    public messageEvent: string;
    public userBlocked: boolean;
    public dateBlocked: string;
    public lastDateAssist: string;
    public dateUnlocked: string;
    public countReservedMonth: number;
    public userBlockedAssist: boolean;
}