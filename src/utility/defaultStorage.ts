import { Resource } from "i18next";

// reference
// https://applelocalization.com/?q=back&l=English&l=Thai

const defaule_en = {
  en: {
    translation: {
      hello: "Hello",
      contacts: "Contacts",

      general: {
        back: "Back",
        done: "Done",
        close: "Close",
      },
      home: {
        title: "Home",
        description: "Here is your home",
      },
      main_menu: {
        home: "Home",
        layer: "Layer",
        component: "Component",
        library: "Library",
        release: "Release",
      },
    },
  },
};

const defaule_th = {
  th: {
    translation: {
      hello: "สวัสดี",
      contacts: "รายชื่อ",

      general: {
        back: "ย้อนกลับ",
        done: "เสร็จสิ้น",
        close: "ปิด",
      },
      home: {
        title: "หน้าแรก",
        description: "หน้าแรกของคุณ",
      },
      main_menu: {
        home: "หน้าแรก",
        layer: "เลเยอร์",
        component: "คอมโปเน้น",
        library: "คลังคำศัพท์",
        release: "ล่าสุด",
      },
    },
  },
};

export const defaultLanguageStorage: Resource = Object.assign(
  {},
  ...[defaule_en, defaule_th]
);
