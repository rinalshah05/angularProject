import { Colors } from "../app/shared/_models/colors";

let colorsList: Array<Colors> = [new Colors("Red", "#FF0000", 1),
 new Colors("Grey", "#808080", 2),
 new Colors("Yellow", "#FFFF00", 3),
 new Colors("Green", "#008000", 4),
 new Colors("Blue", "#0000FF", 5),
 new Colors("White", "#FFFFFF", 6)
];
let sizeList:Array<string>=["XS","S","M","L","XL","XXL","XXXL"];
let SuitableFor:Array<string>=["Boys","Girls","Men","Women","Kids","All","Unisex"]
export const constants = {
  APIServer: "http://localhost:3005",
  ProductBannerFolder: "http://localhost:3005/images/category/banners",
  ColorsList: colorsList,
  SizeList:sizeList,
  SuitableFor:SuitableFor
};
