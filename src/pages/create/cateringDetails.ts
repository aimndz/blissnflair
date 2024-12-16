const cateringDetails = {
  title: "Flair Catering Services",
  mainDishesPerPrice: [
    {
      numberOfDish: 2,
      packages: [
        {
          title: "Package 1",
          price: 720,
          pax: "1-69 pax",
        },
        {
          title: "Package 2",
          price: 560,
          pax: "70-99 pax",
        },
        {
          title: "Package 3",
          price: 470,
          pax: "100-149 pax",
        },
        {
          title: "Package 4",
          price: 375,
          pax: "150-200 pax",
        },
      ],
    },
    {
      numberOfDish: 3,
      packages: [
        {
          title: "Package 1",
          price: 850,
          pax: "1-69 pax",
        },
        {
          title: "Package 2",
          price: 650,
          pax: "70-99 pax",
        },
        {
          title: "Package 3",
          price: 520,
          pax: "100-149 pax",
        },
        {
          title: "Package 4",
          price: 450,
          pax: "150-200 pax",
        },
      ],
    },
  ],
  packages: [
    {
      title: "Picka Pick-A-Snack Corner:",
      description: [
        { title: "", description: "Sandwich, Fruits, Salad & Drinks" },
      ],
    },
    {
      title: "Buffet:",
      description: [
        {
          title: "Main Dishes",
          description:
            " [Option: Beef, Pork, Chicken, or Fish] with Dessert & Pasta",
        },
        {
          title: "Unlimited",
          description: "Rice, Iced Tea, & Water",
        },
      ],
    },
  ],
  inclusions: [
    "Trained & Uniformed Servers",
    "Basic Backdrop Design",
    "Souvenir & Gift Table",
    "Cake Table",
    "Motif & Theme-Based Venue Styling",
    "Chairs & Round Table w/ Table No.",
    "Basic Entrance Arc",
  ],
  allDishes: [
    {
      category: "Beef",
      dishes: [
        "Beef broccoli",
        "Beef stroganoff",
        "Beef with mushroom",
        "Sliced roast beef with mushroom sauce",
        "Beef mechado",
        "Beef caldereta",
        "Beef karekare",
        "Beef teriyaki",
        "Beef lengua",
        "Beef lengua",
      ],
    },
    {
      category: "Pork",
      dishes: [
        "Pork hamonado",
        "Pork caldereta",
        "Sweet and sour pork",
        "Sliced roast pork with mushroom sauce",
        "Pork mechado",
        "Pork menudo",
        "Pork loin with gravy sauce",
        "Pork brocolli",
      ],
    },
    {
      category: "Chicken",
      dishes: [
        "Chicken honey",
        "Chicken cordon bleu",
        "Chicken teriyaki",
        "Orange chicken",
        "Breaded baked chicken",
        "Chicken fillet with gravy sauce",
        "Fried chicken",
        "Chicken pastel",
        "Chicken afritada",
        "Chicken fillet ala-king",
      ],
    },
    {
      category: "Fish",
      dishes: ["Sweet and sour fish", "Fish fillet with tartar sauce"],
    },
    {
      category: "Veggies",
      dishes: ["Chopsuey", "Sipo egg", "7 kinds", "Mix veggies"],
    },
  ],
  drinks: [
    "Blue lemonade",
    "Pineapple juice",
    "Orange juice",
    "Red tea or Iced tea",
  ],
  desserts: ["Buko salad", "Fruit salad", "Buko pandan", "Coffee jelly"],
  pastas: ["Baked Macaroni", "Spaghetti", "Creamy Carbonara", "Pasta Alfredo"],
  pickA_pick_a_snack_corner: [
    {
      category: "Sandwich",
      dishes: ["Ham", "Tuna", "Chicken", "Clubhouse"],
    },
    {
      category: "Fruits",
      dishes: ["Papaya", "Watermelon", "Apple", "Orange", "Pineapple"],
    },
    {
      category: "Salad Dressing",
      dishes: ["Caesar Salad", "Honey"],
    },
  ],
  addOns: [
    {
      title: "Food Carts",
      allCarts: [
        {
          title: "Cart 1",
          price: 4000,
          pax: 50,
          description: "3 hrs service",
          options: [
            "Street Food Cart",
            "Pop Corn Cart",
            "Juice Cart",
            "Hotdog Cart",
          ],
        },
        {
          title: "Cart 2",
          price: 4500,
          pax: 50,
          description: "3 hrs service",
          options: [
            "Cotton Candy Cart",
            "Ice Scramble Cart",
            "Candy Cart",
            "Donut Cart",
            "Nachos Cart",
            "Siomai Cart",
          ],
        },
        {
          title: "Cart 3",
          price: 4800,
          pax: 50,
          description: "3 hrs service",
          options: [
            "Kakanin Cart",
            "Ice Cream Cart",
            "Taho Cart",
            "Fruit Cart",
          ],
        },
      ],
    },
    {
      title: "Technicals",
      allTechs: [
        {
          title: "Photographer",
          description: "Basic Videos & Photos",
          hour: 4,
          price: 3500,
        },
        {
          title: "Photo Booth",
          description: "",
          hour: 2,
          price: 4500,
        },
        {
          title: "Lights, Sound, & DJ",
          description: "Free for 150 pax",
          hour: 4,
          price: 5000,
        },
        {
          title: "Emcee",
          description: "",
          hour: 4,
          price: 5500,
        },
        {
          title: "Hair & Make Up",
          description: "Traditional Make-up ! 1 person",
          hour: 4,
          price: 4500,
        },
        {
          title: "Live Singer",
          description: "",
          hour: 4,
          price: 4000,
        },
        {
          title: "LED Backdrop",
          description: "Height: 9 Feet x Width: 12 Feet",
          hour: 4,
          price: 20000,
        },
      ],
    },
  ],
};

export default cateringDetails;
