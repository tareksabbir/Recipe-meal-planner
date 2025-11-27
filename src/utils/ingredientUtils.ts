export const parseQuantity = (
  measure: string
): { quantity: number; unit: string } => {
  const match = measure.match(/^([\d/.]+)\s*(.*)$/);
  if (!match) return { quantity: 0, unit: measure };

  const quantityStr = match[1];
  let quantity = 0;

  if (quantityStr.includes("/")) {
    const [numerator, denominator] = quantityStr.split("/");
    quantity = parseFloat(numerator) / parseFloat(denominator);
  } else {
    quantity = parseFloat(quantityStr);
  }

  const unit = match[2].trim();
  return { quantity, unit };
};

export const normalizeUnit = (unit: string): string => {
  const normalizedUnit = unit.toLowerCase().trim();

  const unitMap: Record<string, string> = {
    t: "tsp",
    tsp: "tsp",
    teaspoon: "tsp",
    teaspoons: "tsp",
    tbsp: "tbsp",
    tablespoon: "tbsp",
    tablespoons: "tbsp",
    oz: "oz",
    ounce: "oz",
    ounces: "oz",
    lb: "lb",
    pound: "lb",
    pounds: "lb",
    g: "g",
    gram: "g",
    grams: "g",
    kg: "kg",
    kilogram: "kg",
    kilograms: "kg",
    ml: "ml",
    milliliter: "ml",
    milliliters: "ml",
    l: "l",
    liter: "l",
    liters: "l",
    c: "cup",
    cup: "cup",
    cups: "cup",
  };

  return unitMap[normalizedUnit] || normalizedUnit;
};

export const convertUnit = (
  quantity: number,
  fromUnit: string,
  toUnit: string
): number => {
  if (fromUnit === toUnit) return quantity;

  const conversions: Record<string, Record<string, number>> = {
    tsp: { tbsp: 1 / 3, cup: 1 / 48, ml: 5 },
    tbsp: { tsp: 3, cup: 1 / 16, ml: 15 },
    cup: { tsp: 48, tbsp: 16, ml: 240 },
    oz: { g: 28.35, lb: 1 / 16 },
    lb: { oz: 16, g: 453.59 },
    g: { oz: 1 / 28.35, kg: 1 / 1000, lb: 1 / 453.59 },
    kg: { g: 1000, lb: 2.20462 },
    ml: { l: 1 / 1000, tsp: 1 / 5, tbsp: 1 / 15, cup: 1 / 240 },
    l: { ml: 1000 },
  };

  if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
    return quantity * conversions[fromUnit][toUnit];
  }

  return quantity;
};

export const formatQuantity = (quantity: number, unit: string): string => {
  const roundedQuantity = Math.round(quantity * 10) / 10;
  if (roundedQuantity === Math.floor(roundedQuantity)) {
    return `${Math.floor(roundedQuantity)} ${unit}`;
  }

  return `${roundedQuantity} ${unit}`;
};
