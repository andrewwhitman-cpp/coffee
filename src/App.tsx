import { useState, useEffect } from 'react'
import './App.css'
import IngredientsPanel from './components/IngredientsPanel'

interface Recipe {
  base: string[]
  flavor: string[]
  topping: string[]
}

const COFFEE_RECIPES: Record<string, Recipe> = {
  'Espresso': {
    base: ['Espresso'],
    flavor: [],
    topping: []
  },
  'Cappuccino': {
    base: ['Espresso'],
    flavor: ['Milk'],
    topping: []
  },
  'Latte': {
    base: ['Espresso'],
    flavor: ['Milk'],
    topping: []
  },
  'Mocha': {
    base: ['Espresso'],
    flavor: ['Milk', 'Chocolate'],
    topping: ['Whipped Cream']
  },
  'Americano': {
    base: ['Espresso', 'Hot Water'],
    flavor: [],
    topping: []
  },
  'Flat White': {
    base: ['Espresso', 'Steamed Milk'],
    flavor: ['Milk'],
    topping: []
  },
  'Irish Coffee': {
    base: ['Coffee'],
    flavor: ['Irish Cream'],
    topping: ['Whipped Cream']
  },
  'Iced Mocha': {
    base: ['Espresso'],
    flavor: ['Milk', 'Chocolate'],
    topping: ['Whipped Cream', 'Chocolate Chips']
  },
  'Cold Brew Latte': {
    base: ['Cold Brew'],
    flavor: ['Milk'],
    topping: []
  },
  'Hazelnut Latte': {
    base: ['Espresso'],
    flavor: ['Milk', 'Hazelnut'],
    topping: ['Whipped Cream']
  },
  'Peppermint Mocha': {
    base: ['Espresso'],
    flavor: ['Milk', 'Chocolate', 'Peppermint'],
    topping: ['Whipped Cream', 'Chocolate Chips']
  },
  'Affogato': {
    base: ['Espresso'],
    flavor: [],
    topping: ['Ice Cream']
  }
}

interface Ingredient {
  name: string
  amount: number
  type: 'base' | 'flavor' | 'topping' | 'milk'
}

type IngredientOrNull = Ingredient | null

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [coffeeType, setCoffeeType] = useState<string>('Custom Coffee')

  useEffect(() => {
    updateCoffeeType(ingredients)
  }, [ingredients])

  const updateCoffeeType = (currentIngredients: Ingredient[]) => {
    if (currentIngredients.length === 0) {
      setCoffeeType('Custom Coffee')
      return
    }

    const currentTypes = {
      base: currentIngredients.filter(i => i.type === 'base').map(i => i.name),
      milk: currentIngredients.filter(i => i.type === 'milk').map(i => i.name),
      flavor: currentIngredients.filter(i => i.type === 'flavor').map(i => i.name),
      topping: currentIngredients.filter(i => i.type === 'topping').map(i => i.name)
    }

    let bestMatch = 'Custom Coffee'
    let highestSimilarity = 0

    Object.entries(COFFEE_RECIPES).forEach(([name, recipe]) => {
      let similarity = 0
      
      // Calculate similarity for base ingredients (highest weight - 50%)
      const baseMatches = recipe.base.filter(item => currentTypes.base.includes(item)).length
      const baseExtraIngredients = currentTypes.base.filter(item => !recipe.base.includes(item)).length
      const basePenalty = baseExtraIngredients * 0.2 // Penalty for extra base ingredients
      const baseScore = (baseMatches / recipe.base.length) * 0.5 - basePenalty
      similarity += Math.max(0, baseScore) // Ensure score doesn't go negative

      // Calculate similarity for milk ingredients (medium weight - 30%)
      const milkMatches = currentTypes.milk.filter(item => recipe.flavor.includes(item as string)).length
      const milkScore = milkMatches > 0 ? 0.3 : 0
      similarity += milkScore

      // Calculate similarity for flavor ingredients (medium weight - 30%)
      const flavorMatches = recipe.flavor.filter(item => currentTypes.flavor.includes(item)).length
      const flavorMissing = recipe.flavor.filter(item => !currentTypes.flavor.includes(item)).length
      const flavorExtra = currentTypes.flavor.filter(item => !recipe.flavor.includes(item as string)).length
      const flavorPenalty = (flavorMissing + flavorExtra) * 0.1 // Smaller penalty for flavor mismatches
      const flavorScore = recipe.flavor.length > 0 ? 
        ((flavorMatches / recipe.flavor.length) * 0.3 - flavorPenalty) : 
        (currentTypes.flavor.length === 0 ? 0.3 : 0) // Full score if both have no flavors
      similarity += Math.max(0, flavorScore)

      // Calculate similarity for topping ingredients (lowest weight - 20%)
      const toppingMatches = recipe.topping.filter(item => currentTypes.topping.includes(item)).length
      const toppingMissing = recipe.topping.filter(item => !currentTypes.topping.includes(item)).length
      const toppingExtra = currentTypes.topping.filter(item => !recipe.topping.includes(item as string)).length
      const toppingPenalty = (toppingMissing + toppingExtra) * 0.05 // Smallest penalty for topping mismatches
      const toppingScore = recipe.topping.length > 0 ? 
        ((toppingMatches / recipe.topping.length) * 0.2 - toppingPenalty) : 
        (currentTypes.topping.length === 0 ? 0.2 : 0) // Full score if both have no toppings
      similarity += Math.max(0, toppingScore)

      // Only consider as a match if similarity is above threshold
      if (similarity > highestSimilarity && similarity >= 0.4) {
        highestSimilarity = similarity
        bestMatch = name
      }
    })

    setCoffeeType(bestMatch)
  }

  const handleAddIngredient = (ingredient: IngredientOrNull) => {
    if (ingredient === null) {
      setIngredients([])
      return
    }
    setIngredients([...ingredients, ingredient])
  }

  return (
    <div className="coffee-app">
      <h1>Coffee Creator</h1>
      <div className="coffee-type">
        <h2>{coffeeType}</h2>
        <p>{coffeeType === 'Custom Coffee' ? 'Add ingredients to see what type of coffee your creation matches!' : 'Your creation matches a classic coffee drink!'}</p>
      </div>
      <div className="coffee-container">
        <IngredientsPanel 
          ingredients={ingredients} 
          onAddIngredient={handleAddIngredient} 
        />
        <div className="coffee-cup">
          <div className="cup-body">
            <div className="liquid">
              {ingredients.map((ingredient, index) => (
                <div 
                  key={index} 
                  className={`layer ${ingredient.type}`} 
                  style={{ height: `${(index + 1) * 20}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
