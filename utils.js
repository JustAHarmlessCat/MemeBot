const fs = require("fs");

function loadData(filepath) {
  if (!filepath) filepath = "./roles.json";
  try {
    return JSON.parse(fs.readFileSync(filepath));
  } catch (err) {
    console.error(`Error reading file from disk: ${filepath}`, err);
    return false;
  }
}

function saveData(filepath, data) {
  if (!filepath) filepath = "./roles.json";
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing file on disk: ${filepath}`, err);
  }
}

async function messageCount(user){
  let data = loadData('./messageCount.json');
  if(!data || !data.user){
    data = { user: {} };
  }
  if(!data.user[user]){
    data.user[user] = 0;
  }
  data.user[user] += 1;
  saveData('./messageCount.json', data);
}

const CSS_COLOR_NAMES = [
  { name: "AliceBlue", color: "#F0F8FF" },
  { name: "AntiqueWhite", color: "#FAEBD7" },
  { name: "Aqua", color: "#00FFFF" },
  { name: "Aquamarine", color: "#7FFFD4" },
  { name: "Azure", color: "#F0FFFF" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Bisque", color: "#FFE4C4" },
  { name: "Black", color: "#000000" },
  { name: "BlanchedAlmond", color: "#FFEBCD" },
  { name: "Blue", color: "#0000FF" },
  { name: "BlueViolet", color: "#8A2BE2" },
  { name: "Brown", color: "#A52A2A" },
  { name: "BurlyWood", color: "#DEB887" },
  { name: "CadetBlue", color: "#5F9EA0" },
  { name: "Chartreuse", color: "#7FFF00" },
  { name: "Chocolate", color: "#D2691E" },
  { name: "Coral", color: "#FF7F50" },
  { name: "CornflowerBlue", color: "#6495ED" },
  { name: "Cornsilk", color: "#FFF8DC" },
  { name: "Crimson", color: "#DC143C" },
  { name: "Cyan", color: "#00FFFF" },
  { name: "DarkBlue", color: "#00008B" },
  { name: "DarkCyan", color: "#008B8B" },
  { name: "DarkGoldenRod", color: "#B8860B" },
  { name: "DarkGray", color: "#A9A9A9" },
  { name: "DarkGrey", color: "#A9A9A9" },
  { name: "DarkGreen", color: "#006400" },
  { name: "DarkKhaki", color: "#BDB76B" },
  { name: "DarkMagenta", color: "#8B008B" },
  { name: "DarkOliveGreen", color: "#556B2F" },
  { name: "DarkOrange", color: "#FF8C00" },
  { name: "DarkOrchid", color: "#9932CC" },
  { name: "DarkRed", color: "#8B0000" },
  { name: "DarkSalmon", color: "#E9967A" },
  { name: "DarkSeaGreen", color: "#8FBC8F" },
  { name: "DarkSlateBlue", color: "#483D8B" },
  { name: "DarkSlateGray", color: "#2F4F4F" },
  { name: "DarkSlateGrey", color: "#2F4F4F" },
  { name: "DarkTurquoise", color: "#00CED1" },
  { name: "DarkViolet", color: "#9400D3" },
  { name: "DeepPink", color: "#FF1493" },
  { name: "DeepSkyBlue", color: "#00BFFF" },
  { name: "DimGray", color: "#696969" },
  { name: "DimGrey", color: "#696969" },
  { name: "DodgerBlue", color: "#1E90FF" },
  { name: "FireBrick", color: "#B22222" },
  { name: "FloralWhite", color: "#FFFAF0" },
  { name: "ForestGreen", color: "#228B22" },
  { name: "Fuchsia", color: "#FF00FF" },
  { name: "Gainsboro", color: "#DCDCDC" },
  { name: "GhostWhite", color: "#F8F8FF" },
  { name: "Gold", color: "#FFD700" },
  { name: "GoldenRod", color: "#DAA520" },
  { name: "Gray", color: "#808080" },
  { name: "Grey", color: "#808080" },
  { name: "Green", color: "#008000" },
  { name: "GreenYellow", color: "#ADFF2F" },
  { name: "HoneyDew", color: "#F0FFF0" },
  { name: "HotPink", color: "#FF69B4" },
  { name: "IndianRed", color: "#CD5C5C" },
  { name: "Indigo", color: "#4B0082" },
  { name: "Ivory", color: "#FFFFF0" },
  { name: "Khaki", color: "#F0E68C" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "LavenderBlush", color: "#FFF0F5" },
  { name: "LawnGreen", color: "#7CFC00" },
  { name: "LemonChiffon", color: "#FFFACD" },
  { name: "LightBlue", color: "#ADD8E6" },
  { name: "LightCoral", color: "#F08080" },
  { name: "LightCyan", color: "#E0FFFF" },
  { name: "LightGoldenRodYellow", color: "#FAFAD2" },
  { name: "LightGray", color: "#D3D3D3" },
  { name: "LightGrey", color: "#D3D3D3" },
  { name: "LightGreen", color: "#90EE90" },
  { name: "LightPink", color: "#FFB6C1" },
  { name: "LightSalmon", color: "#FFA07A" },
  { name: "LightSeaGreen", color: "#20B2AA" },
  { name: "LightSkyBlue", color: "#87CEFA" },
  { name: "LightSlateGray", color: "#778899" },
  { name: "LightSlateGrey", color: "#778899" },
  { name: "LightSteelBlue", color: "#B0C4DE" },
  { name: "LightYellow", color: "#FFFFE0" },
  { name: "Lime", color: "#00FF00" },
  { name: "LimeGreen", color: "#32CD32" },
  { name: "Linen", color: "#FAF0E6" },
  { name: "Magenta", color: "#FF00FF" },
  { name: "Maroon", color: "#800000" },
  { name: "MediumAquaMarine", color: "#66CDAA" },
  { name: "MediumBlue", color: "#0000CD" },
  { name: "MediumOrchid", color: "#BA55D3" },
  { name: "MediumPurple", color: "#9370DB" },
  { name: "MediumSeaGreen", color: "#3CB371" },
  { name: "MediumSlateBlue", color: "#7B68EE" },
  { name: "MediumSpringGreen", color: "#00FA9A" },
  { name: "MediumTurquoise", color: "#48D1CC" },
  { name: "MediumVioletRed", color: "#C71585" },
  { name: "MidnightBlue", color: "#191970" },
  { name: "MintCream", color: "#F5FFFA" },
  { name: "MistyRose", color: "#FFE4E1" },
  { name: "Moccasin", color: "#FFE4B5" },
  { name: "NavajoWhite", color: "#FFDEAD" },
  { name: "Navy", color: "#000080" },
  { name: "OldLace", color: "#FDF5E6" },
  { name: "Olive", color: "#808000" },
  { name: "OliveDrab", color: "#6B8E23" },
  { name: "Orange", color: "#FFA500" },
  { name: "OrangeRed", color: "#FF4500" },
  { name: "Orchid", color: "#DA70D6" },
  { name: "PaleGoldenRod", color: "#EEE8AA" },
  { name: "PaleGreen", color: "#98FB98" },
  { name: "PaleTurquoise", color: "#AFEEEE" },
  { name: "PaleVioletRed", color: "#DB7093" },
  { name: "PapayaWhip", color: "#FFEFD5" },
  { name: "PeachPuff", color: "#FFDAB9" },
  { name: "Peru", color: "#CD853F" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Plum", color: "#DDA0DD" },
  { name: "PowderBlue", color: "#B0E0E6" },
  { name: "Purple", color: "#800080" },
  { name: "RebeccaPurple", color: "#663399" },
  { name: "Red", color: "#FF0000" },
  { name: "RosyBrown", color: "#BC8F8F" },
  { name: "RoyalBlue", color: "#4169E1" },
  { name: "SaddleBrown", color: "#8B4513" },
  { name: "Salmon", color: "#FA8072" },
  { name: "SandyBrown", color: "#F4A460" },
  { name: "SeaGreen", color: "#2E8B57" },
  { name: "SeaShell", color: "#FFF5EE" },
  { name: "Sienna", color: "#A0522D" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "SkyBlue", color: "#87CEEB" },
  { name: "SlateBlue", color: "#6A5ACD" },
  { name: "SlateGray", color: "#708090" },
  { name: "SlateGrey", color: "#708090" },
  { name: "Snow", color: "#FFFAFA" },
  { name: "SpringGreen", color: "#00FF7F" },
  { name: "SteelBlue", color: "#4682B4" },
  { name: "Tan", color: "#D2B48C" },
  { name: "Teal", color: "#008080" },
  { name: "Thistle", color: "#D8BFD8" },
  { name: "Tomato", color: "#FF6347" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Violet", color: "#EE82EE" },
  { name: "Wheat", color: "#F5DEB3" },
  { name: "White", color: "#FFFFFF" },
  { name: "WhiteSmoke", color: "#F5F5F5" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "YellowGreen", color: "#9ACD32" },
];

module.exports = {
  loadData,
  saveData,
  messageCount,
  CSS_COLOR_NAMES,
};
