type Theme = {
  accentBackground: string;
  accentColor: string;
  background0: string;
  background025: string;
  background05: string;
  background075: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color0: string;
  color025: string;
  color05: string;
  color075: string;
  background: string;
  backgroundHover: string;
  backgroundPress: string;
  backgroundFocus: string;
  borderColor: string;
  borderColorHover: string;
  borderColorPress: string;
  borderColorFocus: string;
  color: string;
  colorHover: string;
  colorPress: string;
  colorFocus: string;
  colorTransparent: string;
  placeholderColor: string;
  outlineColor: string;
};

function t(a: [number, number][]) {
  let res: Record<string, string> = {};
  for (const [ki, vi] of a) {
    res[ks[ki] as string] = vs[vi] as string;
  }
  return res as Theme;
}
const vs = [
  "hsla(215, 88%, 54%, 1)",
  "hsla(215, 88%, 49%, 0)",
  "hsla(215, 88%, 49%, 0.25)",
  "hsla(215, 88%, 49%, 0.5)",
  "hsla(215, 88%, 49%, 0.75)",
  "hsla(215, 88%, 49%, 1)",
  "hsla(215, 88%, 50%, 1)",
  "hsla(0, 0%, 100%, 1)",
  "hsla(0, 0%, 100%, 0)",
  "hsla(0, 0%, 100%, 0.25)",
  "hsla(0, 0%, 100%, 0.5)",
  "hsla(0, 0%, 100%, 0.75)",
  "hsla(215, 88%, 57%, 1)",
  "hsla(215, 88%, 35%, 0)",
  "hsla(215, 88%, 35%, 0.25)",
  "hsla(215, 88%, 35%, 0.5)",
  "hsla(215, 88%, 35%, 0.75)",
  "hsla(215, 88%, 35%, 1)",
  "hsla(215, 88%, 37%, 1)",
  "hsla(215, 88%, 38%, 1)",
  "hsla(215, 88%, 40%, 1)",
  "hsla(215, 88%, 42%, 1)",
  "hsla(215, 88%, 43%, 1)",
  "hsla(215, 88%, 45%, 1)",
  "hsla(215, 88%, 47%, 1)",
  "hsla(215, 88%, 48%, 1)",
  "hsla(0, 0%, 93%, 1)",
  "hsla(0, 0%, 93%, 0)",
  "hsla(0, 0%, 93%, 0.25)",
  "hsla(0, 0%, 93%, 0.5)",
  "hsla(0, 0%, 93%, 0.75)",
  "hsla(215, 88%, 51%, 1)",
  "hsla(215, 88%, 53%, 1)",
  "hsla(215, 88%, 56%, 1)",
  "hsla(215, 88%, 58%, 1)",
  "hsla(215, 88%, 60%, 1)",
  "hsla(215, 88%, 61%, 1)",
  "hsla(215, 88%, 63%, 1)",
  "hsla(215, 88%, 65%, 1)",
  "hsla(250, 50%, 95%, 1)",
  "hsla(249, 52%, 95%, 0)",
  "hsla(249, 52%, 95%, 0.25)",
  "hsla(249, 52%, 95%, 0.5)",
  "hsla(249, 52%, 95%, 0.75)",
  "hsla(215, 88%, 41%, 1)",
  "hsla(215, 88%, 46%, 1)",
  "hsla(215, 88%, 52%, 1)",
  "hsla(250, 50%, 90%, 1)",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.8)",
];

const ks = [
  "accentBackground",
  "accentColor",
  "background0",
  "background025",
  "background05",
  "background075",
  "color1",
  "color2",
  "color3",
  "color4",
  "color5",
  "color6",
  "color7",
  "color8",
  "color9",
  "color10",
  "color11",
  "color12",
  "color0",
  "color025",
  "color05",
  "color075",
  "background",
  "backgroundHover",
  "backgroundPress",
  "backgroundFocus",
  "borderColor",
  "borderColorHover",
  "borderColorPress",
  "borderColorFocus",
  "color",
  "colorHover",
  "colorPress",
  "colorFocus",
  "colorTransparent",
  "placeholderColor",
  "outlineColor",
];

const n1 = t([
  [0, 0],
  [1, 0],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 4],
  [6, 5],
  [7, 5],
  [8, 5],
  [9, 5],
  [10, 5],
  [11, 6],
  [12, 6],
  [13, 6],
  [14, 6],
  [15, 6],
  [16, 7],
  [17, 7],
  [18, 8],
  [19, 9],
  [20, 10],
  [21, 11],
  [22, 5],
  [23, 4],
  [24, 5],
  [25, 5],
  [26, 5],
  [27, 5],
  [28, 5],
  [29, 5],
  [30, 7],
  [31, 7],
  [32, 7],
  [33, 7],
  [34, 8],
  [35, 6],
  [36, 9],
]);

export const light = n1;
const n2 = t([
  [0, 12],
  [1, 12],
  [2, 13],
  [3, 14],
  [4, 15],
  [5, 16],
  [6, 17],
  [7, 18],
  [8, 19],
  [9, 20],
  [10, 21],
  [11, 22],
  [12, 23],
  [13, 24],
  [14, 25],
  [15, 6],
  [16, 26],
  [17, 26],
  [18, 27],
  [19, 28],
  [20, 29],
  [21, 30],
  [22, 17],
  [23, 18],
  [24, 16],
  [25, 16],
  [26, 20],
  [27, 21],
  [28, 19],
  [29, 20],
  [30, 26],
  [31, 26],
  [32, 26],
  [33, 26],
  [34, 27],
  [35, 25],
  [36, 28],
]);

export const dark = n2;
const n3 = t([
  [0, 5],
  [1, 5],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 4],
  [6, 5],
  [7, 31],
  [8, 32],
  [9, 0],
  [10, 33],
  [11, 34],
  [12, 35],
  [13, 36],
  [14, 37],
  [15, 38],
  [16, 39],
  [17, 39],
  [18, 40],
  [19, 41],
  [20, 42],
  [21, 43],
  [22, 5],
  [23, 4],
  [24, 31],
  [25, 31],
  [26, 0],
  [27, 32],
  [28, 33],
  [29, 0],
  [30, 39],
  [31, 39],
  [32, 39],
  [33, 39],
  [34, 40],
  [35, 37],
  [36, 41],
]);

export const light_accent = n3;
const n4 = t([
  [0, 25],
  [1, 25],
  [2, 13],
  [3, 14],
  [4, 15],
  [5, 16],
  [6, 17],
  [7, 19],
  [8, 44],
  [9, 22],
  [10, 45],
  [11, 5],
  [12, 46],
  [13, 0],
  [14, 12],
  [15, 35],
  [16, 47],
  [17, 39],
  [18, 40],
  [19, 41],
  [20, 42],
  [21, 43],
  [22, 17],
  [23, 19],
  [24, 16],
  [25, 16],
  [26, 22],
  [27, 45],
  [28, 44],
  [29, 22],
  [30, 39],
  [31, 47],
  [32, 39],
  [33, 47],
  [34, 40],
  [35, 12],
  [36, 41],
]);

export const dark_accent = n4;
const n5 = t([
  [30, 7],
  [31, 6],
  [32, 7],
  [33, 6],
]);

export const light_alt1 = n5;
const n6 = t([
  [30, 6],
  [31, 6],
  [32, 6],
  [33, 6],
]);

export const light_alt2 = n6;
const n7 = t([
  [22, 5],
  [23, 5],
  [24, 5],
  [25, 5],
  [26, 6],
  [27, 6],
  [29, 6],
  [28, 6],
]);

export const light_active = n7;
export const light_surface3 = n7;
export const light_Button = n7;
export const light_SliderTrackActive = n7;
const n8 = t([
  [22, 5],
  [23, 5],
  [24, 5],
  [25, 5],
  [26, 5],
  [27, 5],
  [29, 5],
  [28, 6],
]);

export const light_surface1 = n8;
export const light_ListItem = n8;
export const light_SelectTrigger = n8;
export const light_Card = n8;
export const light_Progress = n8;
export const light_TooltipArrow = n8;
export const light_SliderTrack = n8;
export const light_Input = n8;
export const light_TextArea = n8;
const n9 = t([
  [22, 5],
  [23, 5],
  [24, 5],
  [25, 5],
  [26, 6],
  [27, 5],
  [29, 6],
  [28, 6],
]);

export const light_surface2 = n9;
export const light_Checkbox = n9;
export const light_Switch = n9;
export const light_TooltipContent = n9;
export const light_RadioGroupItem = n9;
const n10 = t([
  [22, 6],
  [23, 6],
  [24, 6],
  [25, 6],
  [26, 6],
  [27, 6],
  [29, 6],
  [28, 6],
]);

export const light_surface4 = n10;
const n11 = t([
  [30, 26],
  [31, 6],
  [32, 26],
  [33, 6],
]);

export const dark_alt1 = n11;
const n12 = t([
  [30, 6],
  [31, 25],
  [32, 6],
  [33, 25],
]);

export const dark_alt2 = n12;
const n13 = t([
  [22, 20],
  [23, 21],
  [24, 19],
  [25, 19],
  [26, 23],
  [27, 24],
  [29, 23],
  [28, 22],
]);

export const dark_active = n13;
export const dark_surface3 = n13;
export const dark_Button = n13;
export const dark_SliderTrackActive = n13;
const n14 = t([
  [22, 18],
  [23, 19],
  [24, 17],
  [25, 17],
  [26, 21],
  [27, 22],
  [29, 21],
  [28, 20],
]);

export const dark_surface1 = n14;
export const dark_ListItem = n14;
export const dark_SelectTrigger = n14;
export const dark_Card = n14;
export const dark_Progress = n14;
export const dark_TooltipArrow = n14;
export const dark_SliderTrack = n14;
export const dark_Input = n14;
export const dark_TextArea = n14;
const n15 = t([
  [22, 19],
  [23, 20],
  [24, 18],
  [25, 18],
  [26, 22],
  [27, 23],
  [29, 22],
  [28, 21],
]);

export const dark_surface2 = n15;
export const dark_Checkbox = n15;
export const dark_Switch = n15;
export const dark_TooltipContent = n15;
export const dark_RadioGroupItem = n15;
const n16 = t([
  [22, 22],
  [23, 22],
  [24, 21],
  [25, 21],
  [26, 22],
  [27, 22],
  [29, 21],
  [28, 21],
]);

export const dark_surface4 = n16;
const n17 = t([
  [30, 39],
  [31, 38],
  [32, 39],
  [33, 38],
]);

export const light_accent_alt1 = n17;
const n18 = t([
  [30, 38],
  [31, 37],
  [32, 38],
  [33, 37],
]);

export const light_accent_alt2 = n18;
const n19 = t([
  [22, 0],
  [23, 32],
  [24, 33],
  [25, 33],
  [26, 35],
  [27, 34],
  [29, 35],
  [28, 36],
]);

export const light_accent_active = n19;
export const light_accent_surface3 = n19;
export const light_accent_Button = n19;
export const light_accent_SliderTrackActive = n19;
const n20 = t([
  [22, 31],
  [23, 5],
  [24, 32],
  [25, 32],
  [26, 33],
  [27, 0],
  [29, 33],
  [28, 34],
]);

export const light_accent_surface1 = n20;
export const light_accent_ListItem = n20;
export const light_accent_SelectTrigger = n20;
export const light_accent_Card = n20;
export const light_accent_Progress = n20;
export const light_accent_TooltipArrow = n20;
export const light_accent_SliderTrack = n20;
export const light_accent_Input = n20;
export const light_accent_TextArea = n20;
const n21 = t([
  [22, 32],
  [23, 31],
  [24, 0],
  [25, 0],
  [26, 34],
  [27, 33],
  [29, 34],
  [28, 35],
]);

export const light_accent_surface2 = n21;
export const light_accent_Checkbox = n21;
export const light_accent_Switch = n21;
export const light_accent_TooltipContent = n21;
export const light_accent_RadioGroupItem = n21;
const n22 = t([
  [22, 34],
  [23, 34],
  [24, 35],
  [25, 35],
  [26, 34],
  [27, 34],
  [29, 35],
  [28, 35],
]);

export const light_accent_surface4 = n22;
const n23 = t([
  [30, 47],
  [31, 35],
  [32, 47],
  [33, 35],
]);

export const dark_accent_alt1 = n23;
const n24 = t([
  [30, 35],
  [31, 12],
  [32, 35],
  [33, 12],
]);

export const dark_accent_alt2 = n24;
const n25 = t([
  [22, 22],
  [23, 45],
  [24, 44],
  [25, 44],
  [26, 46],
  [27, 0],
  [29, 46],
  [28, 5],
]);

export const dark_accent_active = n25;
export const dark_accent_surface3 = n25;
export const dark_accent_Button = n25;
export const dark_accent_SliderTrackActive = n25;
const n26 = t([
  [22, 19],
  [23, 44],
  [24, 17],
  [25, 17],
  [26, 45],
  [27, 5],
  [29, 45],
  [28, 22],
]);

export const dark_accent_surface1 = n26;
export const dark_accent_ListItem = n26;
export const dark_accent_SelectTrigger = n26;
export const dark_accent_Card = n26;
export const dark_accent_Progress = n26;
export const dark_accent_TooltipArrow = n26;
export const dark_accent_SliderTrack = n26;
export const dark_accent_Input = n26;
export const dark_accent_TextArea = n26;
const n27 = t([
  [22, 44],
  [23, 22],
  [24, 19],
  [25, 19],
  [26, 5],
  [27, 46],
  [29, 5],
  [28, 45],
]);

export const dark_accent_surface2 = n27;
export const dark_accent_Checkbox = n27;
export const dark_accent_Switch = n27;
export const dark_accent_TooltipContent = n27;
export const dark_accent_RadioGroupItem = n27;
const n28 = t([
  [22, 5],
  [23, 5],
  [24, 45],
  [25, 45],
  [26, 5],
  [27, 5],
  [29, 45],
  [28, 45],
]);

export const dark_accent_surface4 = n28;
const n29 = t([
  [30, 5],
  [31, 5],
  [32, 5],
  [33, 5],
  [22, 7],
  [23, 7],
  [24, 7],
  [25, 7],
  [26, 6],
  [27, 6],
  [29, 6],
  [28, 6],
]);

export const light_SwitchThumb = n29;
export const light_SliderThumb = n29;
export const light_Tooltip = n29;
export const light_ProgressIndicator = n29;
const n30 = t([[22, 48]]);

export const light_SheetOverlay = n30;
export const light_DialogOverlay = n30;
export const light_ModalOverlay = n30;
export const light_accent_SheetOverlay = n30;
export const light_accent_DialogOverlay = n30;
export const light_accent_ModalOverlay = n30;
const n31 = t([
  [30, 18],
  [31, 19],
  [32, 17],
  [33, 17],
  [22, 26],
  [23, 26],
  [24, 26],
  [25, 26],
  [26, 6],
  [27, 25],
  [29, 24],
  [28, 23],
]);

export const dark_SwitchThumb = n31;
export const dark_SliderThumb = n31;
export const dark_Tooltip = n31;
export const dark_ProgressIndicator = n31;
const n32 = t([[22, 49]]);

export const dark_SheetOverlay = n32;
export const dark_DialogOverlay = n32;
export const dark_ModalOverlay = n32;
export const dark_accent_SheetOverlay = n32;
export const dark_accent_DialogOverlay = n32;
export const dark_accent_ModalOverlay = n32;
const n33 = t([
  [30, 31],
  [31, 5],
  [32, 32],
  [33, 32],
  [22, 39],
  [23, 39],
  [24, 39],
  [25, 39],
  [26, 38],
  [27, 37],
  [29, 36],
  [28, 35],
]);

export const light_accent_SwitchThumb = n33;
export const light_accent_SliderThumb = n33;
export const light_accent_Tooltip = n33;
export const light_accent_ProgressIndicator = n33;
const n34 = t([
  [30, 19],
  [31, 44],
  [32, 17],
  [33, 17],
  [22, 39],
  [23, 47],
  [24, 39],
  [25, 47],
  [26, 35],
  [27, 12],
  [29, 0],
  [28, 46],
]);

export const dark_accent_SwitchThumb = n34;
export const dark_accent_SliderThumb = n34;
export const dark_accent_Tooltip = n34;
export const dark_accent_ProgressIndicator = n34;
