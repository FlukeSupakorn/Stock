const orders = [
  {
    id: 1,
    customer: "John Doe",
    total: 50,
    status: "Processing",
    products: [
      {
        id: 1,
        count: 1,
        totalPrice: 50
      }
    ]
  },
  {
    id: 2,
    customer: "Jane Smith",
    total: 100,
    status: "Shipped",
    products: [
      {
        id: 2,
        count: 5,
        totalPrice: 110
      }
    ]
  },
  {
    id: 3,
    customer: "Alice Johnson",
    total: 75,
    status: "Delivered",
    products: [
      {
        id: 3,
        count: 2,
        totalPrice: 60
      },
      {
        id: 4,
        count: 1,
        totalPrice: 15
      }
    ]
  },
  {
    id: 4,
    customer: "Bob Brown",
    total: 120,
    status: "Processing",
    products: [
      {
        id: 5,
        count: 3,
        totalPrice: 120
      }
    ]
  },
  {
    id: 5,
    customer: "Emma Davis",
    total: 90,
    status: "Shipped",
    products: [
      {
        id: 6,
        count: 2,
        totalPrice: 50
      },
      {
        id: 7,
        count: 1,
        totalPrice: 40
      }
    ]
  },
  {
    id: 6,
    customer: "Michael Wilson",
    total: 200,
    status: "Processing",
    products: [
      {
        id: 8,
        count: 4,
        totalPrice: 200
      }
    ]
  },
  {
    id: 7,
    customer: "Sarah Lee",
    total: 80,
    status: "Processing",
    products: [
      {
        id: 9,
        count: 2,
        totalPrice: 80
      }
    ]
  },
  {
    id: 8,
    customer: "David Clark",
    total: 150,
    status: "Shipped",
    products: [
      {
        id: 10,
        count: 3,
        totalPrice: 150
      }
    ]
  },
  {
    id: 9,
    customer: "Olivia Martinez",
    total: 110,
    status: "Processing",
    products: [
      {
        id: 11,
        count: 2,
        totalPrice: 70
      },
      {
        id: 12,
        count: 1,
        totalPrice: 40
      }
    ]
  },
  {
    id: 10,
    customer: "William Taylor",
    total: 95,
    status: "Delivered",
    products: [
      {
        id: 13,
        count: 1,
        totalPrice: 45
      },
      {
        id: 14,
        count: 2,
        totalPrice: 50
      }
    ]
  },
  {
    id: 11,
    customer: "Sophia Anderson",
    total: 70,
    status: "Processing",
    products: [
      {
        id: 15,
        count: 2,
        totalPrice: 70
      }
    ]
  },
  {
    id: 12,
    customer: "James Garcia",
    total: 130,
    status: "Shipped",
    products: [
      {
        id: 16,
        count: 2,
        totalPrice: 80
      },
      {
        id: 17,
        count: 1,
        totalPrice: 50
      }
    ]
  },
  {
    id: 13,
    customer: "Oliver Hernandez",
    total: 85,
    status: "Processing",
    products: [
      {
        id: 18,
        count: 1,
        totalPrice: 35
      },
      {
        id: 19,
        count: 2,
        totalPrice: 50
      }
    ]
  },
  {
    id: 14,
    customer: "Evelyn Martinez",
    total: 105,
    status: "Processing",
    products: [
      {
        id: 20,
        count: 3,
        totalPrice: 105
      }
    ]
  },
  {
    id: 15,
    customer: "Benjamin Lopez",
    total: 180,
    status: "Shipped",
    products: [
      {
        id: 21,
        count: 2,
        totalPrice: 100
      },
      {
        id: 22,
        count: 2,
        totalPrice: 80
      }
    ]
  },
  {
    id: 16,
    customer: "Mia Moore",
    total: 60,
    status: "Processing",
    products: [
      {
        id: 23,
        count: 3,
        totalPrice: 60
      }
    ]
  },
  {
    id: 17,
    customer: "Elijah Perez",
    total: 140,
    status: "Shipped",
    products: [
      {
        id: 24,
        count: 2,
        totalPrice: 100
      },
      {
        id: 25,
        count: 1,
        totalPrice: 40
      }
    ]
  },
  {
    id: 18,
    customer: "Charlotte Lewis",
    total: 115,
    status: "Processing",
    products: [
      {
        id: 26,
        count: 1,
        totalPrice: 45
      },
      {
        id: 27,
        count: 2,
        totalPrice: 70
      }
    ]
  },
  {
    id: 19,
    customer: "Aiden King",
    total: 170,
    status: "Delivered",
    products: [
      {
        id: 28,
        count: 2,
        totalPrice: 120
      },
      {
        id: 29,
        count: 1,
        totalPrice: 50
      }
    ]
  },
  {
    id: 20,
    customer: "Amelia Harris",
    total: 125,
    status: "Processing",
    products: [
      {
        id: 30,
        count: 5,
        totalPrice: 125
      }
    ]
  },
  {
    id: 21,
    customer: "Henry Baker",
    total: 190,
    status: "Shipped",
    products: [
      {
        id: 31,
        count: 2,
        totalPrice: 90
      },
      {
        id: 32,
        count: 2,
        totalPrice: 100
      }
    ]
  },
  {
    id: 22,
    customer: "Isabella Hall",
    total: 65,
    status: "Processing",
    products: [
      {
        id: 33,
        count: 1,
        totalPrice: 45
      },
      {
        id: 34,
        count: 1,
        totalPrice: 20
      }
    ]
  },
  {
    id: 23,
    customer: "Jacob Allen",
    total: 155,
    status: "Shipped",
    products: [
      {
        id: 35,
        count: 3,
        totalPrice: 135
      },
      {
        id: 36,
        count: 1,
        totalPrice: 20
      }
    ]
  },
  {
    id: 24,
    customer: "Abigail Parker",
    total: 90,
    status: "Processing",
    products: [
      {
        id: 37,
        count: 3,
        totalPrice: 90
      }
    ]
  },
  {
    id: 25,
    customer: "Michael Young",
    total: 210,
    status: "Delivered",
    products: [
      {
        id: 38,
        count: 3,
        totalPrice: 150
      },
      {
        id: 39,
        count: 1,
        totalPrice: 60
      }
    ]
  },
  {
    id: 26,
    customer: "Emily Cooper",
    total: 75,
    status: "Processing",
    products: [
      {
        id: 40,
        count: 3,
        totalPrice: 75
      }
    ]
  },
  {
    id: 27,
    customer: "William Rogers",
    total: 165,
    status: "Shipped",
    products: [
      {
        id: 41,
        count: 3,
        totalPrice: 135
      },
      {
        id: 42,
        count: 1,
        totalPrice: 30
      }
    ]
  },
  {
    id: 28,
    customer: "Sophia Morgan",
    total: 100,
    status: "Processing",
    products: [
      {
        id: 43,
        count: 2,
        totalPrice: 80
      },
      {
        id: 44,
        count: 1,
        totalPrice: 20
      }
    ]
  },
  {
    id: 29,
    customer: "Daniel Reed",
    total: 135,
    status: "Delivered",
    products: [
      {
        id: 45,
        count: 3,
        totalPrice: 135
      }
    ]
  },
  {
    id: 30,
    customer: "Ava Foster",
    total: 80,
    status: "Processing",
    products: [
      {
        id: 46,
        count: 2,
        totalPrice: 60
      },
      {
        id: 47,
        count: 1,
        totalPrice: 20
      }
    ]
  }
];

export default orders;