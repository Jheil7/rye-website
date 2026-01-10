// @ts-nocheck

export const CLASSES = {
  warrior: {
    id: 1,
    name: "Warrior",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_warrior.jpg",
  },
  paladin: {
    id: 2,
    name: "Paladin",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_paladin.jpg",
  },
  hunter: {
    id: 3,
    name: "Hunter",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_hunter.jpg",
  },
  rogue: {
    id: 4,
    name: "Rogue",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_rogue.jpg",
  },
  priest: {
    id: 5,
    name: "Priest",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_priest.jpg",
  },
  deathknight: {
    id: 6,
    name: "Death Knight",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_deathknight.jpg",
  },
  shaman: {
    id: 7,
    name: "Shaman",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_shaman.jpg",
  },
  mage: {
    id: 8,
    name: "Mage",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_mage.jpg",
  },
  warlock: {
    id: 9,
    name: "Warlock",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_warlock.jpg",
  },
  monk: {
    id: 10,
    name: "Monk",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_monk.jpg",
  },
  druid: {
    id: 11,
    name: "Druid",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_druid.jpg",
  },
  demonhunter: {
    id: 12,
    name: "Demon Hunter",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_demonhunter.jpg",
  },
  evoker: {
    id: 13,
    name: "Evoker",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_evoker.jpg",
  },
};

export const CLASS_BY_ID = Object.values(CLASSES).reduce((acc, cls) => {
  acc[cls.id] = cls;
  return acc;
}, {});
