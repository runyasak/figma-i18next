import { Resource } from "i18next";

// reference
// https://applelocalization.com/?q=back&l=English&l=Thai

const default_en = {
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

const default_th = {
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
        release: "ออกใหม่",
      },
    },
  },
};

const default_jp = {
  jp: {
    translation: {
      hello: "こんにちは",
      contacts: "連絡先",
      general: {
        back: "戻る",
        done: "完了",
        close: "閉じる",
      },
      home: {
        title: "ホームページ",
        description: "ここにあなたのホームページがあります",
      },
      main_menu: {
        home: "自宅",
        layer: "レイヤ",
        component: "コンポーネント",
        library: "ライブラリ",
        release: "ニューリリース",
      },
    },
  },
};

export const defaultLanguageStorage: Resource = Object.assign(
  {},
  ...[default_en, default_th, default_jp]
);
