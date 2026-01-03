export const CLASSES = {
  warrior: {
    name: "Warrior",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_warrior.jpg",
  },
  paladin: {
    name: "Paladin",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_paladin.jpg",
  },
  hunter: {
    name: "Hunter",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_hunter.jpg",
  },
  rogue: {
    name: "Rogue",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_rogue.jpg",
  },
  priest: {
    name: "Priest",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_priest.jpg",
  },
  deathknight: {
    name: "Death Knight",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_deathknight.jpg",
  },
  shaman: {
    name: "Shaman",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_shaman.jpg",
  },
  mage: {
    name: "Mage",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_mage.jpg",
  },
  warlock: {
    name: "Warlock",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_warlock.jpg",
  },
  monk: {
    name: "Monk",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_monk.jpg",
  },
  druid: {
    name: "Druid",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_druid.jpg",
  },
  demonhunter: {
    name: "Demon Hunter",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_demonhunter.jpg",
  },
  evoker: {
    name: "Evoker",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_evoker.jpg",
  },
} as const;

export type WoWClass = keyof typeof CLASSES;
