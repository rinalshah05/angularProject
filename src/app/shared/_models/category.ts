export class Category {
    constructor(public Id: number, public Name: string,public Icon:string,public BannerURL:string,
    public Files:Array<File>) { 
    }
 }