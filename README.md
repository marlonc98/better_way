# Better Way

## Introduction

Better Way is a mobile application built with React Native. It is designed to provide a seamless user experience with efficient data handling and modular architecture. The app connects to various APIs to fetch and display data, ensuring scalability and adaptability to future requirements.

## Technical Test

This project is a technical test where the requirement was to have three screens with authentication and display information according to the user. However, I took the opportunity to explore the use of Inversify for dependency injection.

### Accounts

This application has two users: admin and pokehunter. Everything is done using permissions instead of roles. The account "ASH KESHUN" only has access to the Pokémon list, and for the user "PROFESOR OAK," you can access berries too. The settings is another shared screen and is used to close the session.

#### Account Ash Keshun
*email*: pokehunter@mail.com  
*password*: Pikachu123#

#### Account Profesor OAK
*email*: admin@mail.com  
*password*: Admin123#

### Improvements to Consider

- **Better Validation**: Implement a more robust validation system, such as those provided by hooks.
- **Password Visibility**: Add an option to toggle the visibility of the password.
- **UI Enhancements**: Improve the user interface for a better user experience.
- **API Integration Focus**: My primary focus was on API integration and setting up a system with different environments.
- **Environment Flavors**: Add flavors to load environments as different apps, not just as a variable to change.

## Note on Experience

Although my main expertise is in Flutter, my knowledge in React and TypeScript allowed me to adapt to the requirements of this project and implement it in React Native.

## Exports

You can download the build APK from the expo server at the following URL:

[https://expo.dev/accounts/mackiller1998/projects/better_way/builds/7465b824-2515-467c-9774-e59679963c53](https://expo.dev/accounts/mackiller1998/projects/better_way/builds/7465b824-2515-467c-9774-e59679963c53)

You have to open this link from a Android mobile device

## Technologies Used

- **React Native**: The main framework for app development.

## Dependencies

- **@react-navigation/native**: ^6.0.6  
  Used for handling navigation in the app.

- **@react-navigation/native-stack**: ^6.2.5  
  Provides stack navigator for navigation.

- **react-native-screens**: ^3.8.0  
  Optimizes navigation performance by using native screens.

- **react-native-safe-area-context**: ^3.3.2  
  Handles safe area boundaries in the app.

- **react-native-svg**: ^12.1.1  
  Used for rendering SVG images in the app.

- **react-native-toast-message**: ^2.1.5  
  Used for displaying toast notifications, such as error or success messages.

- **inversify**: ^6.0.3  
  A powerful and flexible dependency injection library for TypeScript, allowing you to manage class dependencies using inversion of control (IoC) for better testability and modularity.

## Project Structure

The project is organized as follows:

### **assets/**
Contains all the public files, like images, icons, etc.

### **app/**
Main directory containing the app source code. It includes the following subfolders:

- **app/**:  
  - **dependency_injection/**: Manages dependency injection using the **Singleton** pattern. Classes are instantiated only once and reused throughout the app lifecycle.
  - **domain/**: Contains the core logic of the app.
    - **entities/**: Represents the app's internal models.
    - **use_cases/**: Connects the logic in specific functions.
    - **state/**: Manages global states of the app.
  - **presentation/**: Contains all the app's visual components.
    - **components/**: Reusable UI components.
    - **routes/**: Navigation routes.
    - **ui/**: UI pages and screens.

- **utils/**: Utility files with general classes for date formatting, currencies, and common functions.

## Environment Setup

### Prerequisites

- **Node.js** installed (≥ v16.0.0).
- **npm** or **yarn** for package management.
- **Visual Studio Code** or any code editor of your choice.
- **A modern web browser** (Chrome, Firefox, Edge) for testing the app.

### Installation

1. Clone the repository.

```bash
git clone https://github.com/YourUsername/better_way
```

2. Install the dependencies.

```bash
npm install
```

3. Run the app.

```bash
npm run <ios|android>
```
## How to Add Functionality

To add new features, the project follows a modular, layered architecture. Here’s a brief process:

1. **Create Entities**: Define entities, such as a `User` entity for login.
2. **Create Use Cases**: Implement the logic for features, e.g., `Login`, `Logout`.
3. **Create Repositories**: Define a repository for the feature (e.g., `AuthenticationRepository`).
4. **Create Fake Repositories**: For testing, create fake repositories that return mock data.
5. **Update DI**: Inject the dependencies via the DI layer.
6. **Create UI**: Create interfaces to interact with the new functionality using the Use Cases.
7. **Test with Fake Data**: Ensure the feature works with fake data before integrating it with real data.

Once everything works with fake data, you can implement the real repositories and connect them to the database.

## Flow Explanation

The app follows a Clean Architecture approach. The flow of the app is as follows:

1. The **UI** calls a **Use Case**.
2. The **Use Case** interacts with **Repositories** and **Providers**.
3. The **Repositories** fetch data and pass it to the domain entities using DTOs.
4. The **Provider** is updated with the response.
5. The UI receives the updated state and displays the result.

For example, during login, the `AuthRepository` calls the database, retrieves the user information, maps it to a domain entity via the DTO, and updates the user state. The UI will then receive the user information and display it.

## Additional Features

- **Singleton Pattern**: Used for dependency injection to ensure single instances of classes, especially for the DI layer and database configuration.
- **Context**: For state management, ensuring clear separation between the UI and business logic.

## Final Considerations

- **Scalability**: The project is designed with modularity in mind, making it easy to add new features or modify existing ones.
- **Server Migration**: The data layer is designed to allow a smooth migration to other databases without affecting the UI.

For any inquiries, you can contact me at:

- **Email**: [marlonmz1998@gmail.com](mailto:marlonmz1998@gmail.com)
- **Phone**: +57 3234686680

Marlon Alejandro Méndez Castañeda
