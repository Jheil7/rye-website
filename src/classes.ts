export type Role = "tank" | "healer" | "dps";

export type Spec = {
  name: string;
  role: Role;
  icon: string;
};

export type WowClass = {
  id: number;
  name: string;
  icon: string;
  specs: Record<string, Spec>;
};

export const CLASSES: Record<string, WowClass> = {
  warrior: {
    id: 1,
    name: "Warrior",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_warrior.jpg",
    specs: {
      arms: {
        name: "Arms",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_savageblow.jpg",
      },
      fury: {
        name: "Fury",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_innerrage.jpg",
      },
      protection: {
        name: "Protection",
        role: "tank",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_warrior_defensivestance.jpg",
      },
    },
  },

  paladin: {
    id: 2,
    name: "Paladin",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_paladin.jpg",
    specs: {
      holy: {
        name: "Holy",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg",
      },
      protection: {
        name: "Protection",
        role: "tank",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_paladin_shieldofthetemplar.jpg",
      },
      retribution: {
        name: "Retribution",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_auraoflight.jpg",
      },
    },
  },

  hunter: {
    id: 3,
    name: "Hunter",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_hunter.jpg",
    specs: {
      beastmastery: {
        name: "Beast Mastery",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_bestialdiscipline.jpg",
      },
      marksmanship: {
        name: "Marksmanship",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_focusedaim.jpg",
      },
      survival: {
        name: "Survival",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_hunter_camouflage.jpg",
      },
    },
  },

  rogue: {
    id: 4,
    name: "Rogue",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_rogue.jpg",
    specs: {
      assassination: {
        name: "Assassination",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_deadlybrew.jpg",
      },
      outlaw: {
        name: "Outlaw",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_rogue_waylay.jpg",
      },
      subtlety: {
        name: "Subtlety",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_stealth.jpg",
      },
    },
  },

  priest: {
    id: 5,
    name: "Priest",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_priest.jpg",
    specs: {
      discipline: {
        name: "Discipline",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_powerwordshield.jpg",
      },
      holy: {
        name: "Holy",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_guardianspirit.jpg",
      },
      shadow: {
        name: "Shadow",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_shadowwordpain.jpg",
      },
    },
  },

  deathknight: {
    id: 6,
    name: "Death Knight",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_deathknight.jpg",
    specs: {
      blood: {
        name: "Blood",
        role: "tank",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_bloodpresence.jpg",
      },
      frost: {
        name: "Frost",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_frostpresence.jpg",
      },
      unholy: {
        name: "Unholy",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_deathknight_unholypresence.jpg",
      },
    },
  },

  shaman: {
    id: 7,
    name: "Shaman",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_shaman.jpg",
    specs: {
      elemental: {
        name: "Elemental",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_lightning.jpg",
      },
      enhancement: {
        name: "Enhancement",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shaman_improvedstormstrike.jpg",
      },
      restoration: {
        name: "Restoration",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_magicimmunity.jpg",
      },
    },
  },

  mage: {
    id: 8,
    name: "Mage",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_mage.jpg",
    specs: {
      arcane: {
        name: "Arcane",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_holy_magicalsentry.jpg",
      },
      fire: {
        name: "Fire",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_fire_firebolt02.jpg",
      },
      frost: {
        name: "Frost",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_frost_frostbolt02.jpg",
      },
    },
  },

  warlock: {
    id: 9,
    name: "Warlock",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_warlock.jpg",
    specs: {
      affliction: {
        name: "Affliction",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_deathcoil.jpg",
      },
      demonology: {
        name: "Demonology",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_metamorphosis.jpg",
      },
      destruction: {
        name: "Destruction",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_shadow_rainoffire.jpg",
      },
    },
  },

  monk: {
    id: 10,
    name: "Monk",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_monk.jpg",
    specs: {
      brewmaster: {
        name: "Brewmaster",
        role: "tank",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_brewmaster_spec.jpg",
      },
      mistweaver: {
        name: "Mistweaver",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_mistweaver_spec.jpg",
      },
      windwalker: {
        name: "Windwalker",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_monk_windwalker_spec.jpg",
      },
    },
  },

  druid: {
    id: 11,
    name: "Druid",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_druid.jpg",
    specs: {
      balance: {
        name: "Balance",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_starfall.jpg",
      },
      feral: {
        name: "Feral",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_druid_catform.jpg",
      },
      guardian: {
        name: "Guardian",
        role: "tank",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_racial_bearform.jpg",
      },
      restoration: {
        name: "Restoration",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/spell_nature_healingtouch.jpg",
      },
    },
  },

  demonhunter: {
    id: 12,
    name: "Demon Hunter",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_demonhunter.jpg",
    specs: {
      havoc: {
        name: "Havoc",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_specdps.jpg",
      },
      vengeance: {
        name: "Vengeance",
        role: "tank",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_demonhunter_spectank.jpg",
      },
    },
  },

  evoker: {
    id: 13,
    name: "Evoker",
    icon: "https://wow.zamimg.com/images/wow/icons/large/class_evoker.jpg",
    specs: {
      devastation: {
        name: "Devastation",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_evoker_devastation.jpg",
      },
      preservation: {
        name: "Preservation",
        role: "healer",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_evoker_preservation.jpg",
      },
      augmentation: {
        name: "Augmentation",
        role: "dps",
        icon: "https://wow.zamimg.com/images/wow/icons/large/ability_evoker_augmentation.jpg",
      },
    },
  },
};

export const CLASS_BY_ID = Object.values(CLASSES).reduce<
  Record<number, WowClass>
>((acc, cls) => {
  acc[cls.id] = cls;
  return acc;
}, {});
