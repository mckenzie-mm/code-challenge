// This is for maintaining State of the application (without using a database);

// Random Names
const firstNames = ["Alan", "Brian", "Charles", "David", "Debby", "Denise", "Steve", "Susan"];
const lastNames = ["Adams", "Allison", "Alvarez", "Andrews", "Baker", "Brown", "Burns", "Zeigler"];

function generateFullName(firsts, lasts) {
  const getRandomItem = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  };

  const randomFirstName = getRandomItem(firsts);
  const randomLastName = getRandomItem(lasts);

  return `${randomFirstName} ${randomLastName}`;
}

// Random Colors
const generateRandomHexColor = () => {
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
};

// State
export const UsersState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
}

// functions
export function activateUser(id) {
    // Generate random name and background color
    const name = generateFullName(firstNames, lastNames);
    const backgroundColor = generateRandomHexColor();
    // Set user in State
    const user = { id, name, backgroundColor }
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ])
    return user
}

export function userLeavesApp(id) {
    // Remove user from state
    UsersState.setUsers(
        UsersState.users.filter(user => user.id !== id)
    )
}




