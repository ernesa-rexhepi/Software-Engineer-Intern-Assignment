**Rick and Morty Characters - React Application**
This project is a React application that uses Apollo Client to fetch and display a list of characters from the Rick and Morty GraphQL API. The app includes filtering, sorting, infinite scrolling, and multilingual support (English and German).

**Steps to Run the Application**

Clone the repository:
git clone <https://github.com/ernesa-rexhepi/Software-Engineer-Intern-Assignment.git>

Navigate to the project directory:
cd <repository-folder>

Install dependencies:
npm install or yarn install

Create an .env file in the root directory and add the following:
REACT_APP_API=https://rickandmortyapi.com/graphql

Start the development server:
npm start or yarn start

Open the application in your browser at http://localhost:3000.


**Key Files**

App.js: The root component that sets up the Apollo Client, renders the homepage, and includes the footer.
pages/Home.js: Contains the main layout of the app, including the title, filters, and the character list.
components/CharacterList.js: Fetches and displays the characters with filtering, sorting, and infinite scrolling functionality.
context/MainContext.js: Defines the Apollo Client configuration and GraphQL query to fetch characters.
components/Filter.js: Provides filtering functionality and context to manage filter states.
components/Footer.js: Displays the footer with a language switcher.
components/i18n.js: Configures internationalization for multilingual support.
style/home.module.css: Contains CSS styles for the application.