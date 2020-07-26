const uuidv4 = require('uuid/v4')

const items = [
    {
        id: uuidv4(),
        name: "Report for Daily",
        level: 2
    },
    {
        id: uuidv4(),
        name: "Implement new features",
        level: 1
    },
    {
        id: uuidv4(),
        name: "Order Lunch",
        level: 0
    },
    {
        id: uuidv4(),
        name: "Take a nap",
        level: 2
    }
]

export default items;