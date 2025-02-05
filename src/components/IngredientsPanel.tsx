import React from 'react';

interface Ingredient {
  name: string;
  amount: number;
  type: 'base' | 'flavor' | 'topping' | 'milk';
}

interface IngredientsPanelProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
}

const AVAILABLE_INGREDIENTS = {
  base: [
    { name: 'Espresso', amount: 1 },
    { name: 'Coffee', amount: 1 },
    { name: 'Hot Water', amount: 1 },
    { name: 'Cold Brew', amount: 1 },
    { name: 'Decaf Espresso', amount: 1 }
  ],
  milk: [
    { name: 'Steamed Milk', amount: 1 },
    { name: 'Milk', amount: 1 },
    { name: 'Almond Milk', amount: 1 },
    { name: 'Oat Milk', amount: 1 }
  ],
  flavor: [
    { name: 'Chocolate', amount: 1 },
    { name: 'Caramel', amount: 1 },
    { name: 'Vanilla', amount: 1 },
    { name: 'Hazelnut', amount: 1 },
    { name: 'Peppermint', amount: 1 },
    { name: 'Irish Cream', amount: 1 }
  ],
  topping: [
    { name: 'Whipped Cream', amount: 1 },
    { name: 'Cinnamon', amount: 1 },
    { name: 'Cocoa Powder', amount: 1 },
    { name: 'Chocolate Chips', amount: 1 },
    { name: 'Nutmeg', amount: 1 },
    { name: 'Caramel Drizzle', amount: 1 },
    { name: 'Ice Cream', amount: 1 }
  ]
};

const IngredientsPanel: React.FC<IngredientsPanelProps> = ({ ingredients, onAddIngredient }) => {
  const handleIngredientClick = (name: string, type: 'base' | 'flavor' | 'topping') => {
    onAddIngredient({
      name,
      amount: 1,
      type
    });
  };

  const handleReset = () => {
    // Reset ingredients by passing null
    onAddIngredient(null);
  };

  return (
    <div className="ingredients-selection">
      <div className="ingredient-category">
        <h3>Base</h3>
        <div className="ingredient-buttons">
          {AVAILABLE_INGREDIENTS.base.map((item) => (
            <button
              key={item.name}
              onClick={() => handleIngredientClick(item.name, 'base')}
              className="ingredient-button"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="ingredient-category">
        <h3>Milk</h3>
        <div className="ingredient-buttons">
          {AVAILABLE_INGREDIENTS.milk.map((item) => (
            <button
              key={item.name}
              onClick={() => handleIngredientClick(item.name, 'milk')}
              className="ingredient-button"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="ingredient-category">
        <h3>Flavors</h3>
        <div className="ingredient-buttons">
          {AVAILABLE_INGREDIENTS.flavor.map((item) => (
            <button
              key={item.name}
              onClick={() => handleIngredientClick(item.name, 'flavor')}
              className="ingredient-button"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="ingredient-category">
        <h3>Toppings</h3>
        <div className="ingredient-buttons">
          {AVAILABLE_INGREDIENTS.topping.map((item) => (
            <button
              key={item.name}
              onClick={() => handleIngredientClick(item.name, 'topping')}
              className="ingredient-button"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="selected-ingredients">
        <h3>Selected Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} ({ingredient.type})
            </li>
          ))}
        </ul>
        <button onClick={handleReset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default IngredientsPanel;