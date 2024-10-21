# uniswap-Aaron-demo
a demo from Aaron and KiritoFD,classmates in FDU for the graph with uniswap.We developed an integrated viewer that allows users to comfortably view the currently top-ranked pools, and then customize their viewing and sorting options (currently in progress). It's similar to DEX SCREENER with icon-based visualization that is still underway.
# Uniswap Aaron Demo Project

## Project Overview

This is a front-end application based on the Uniswap V2 subgraph, utilizing React and Apollo Client to display information about the top 5 trading pools. The project is designed for learning and demonstrating how to use The Graph API with React for data presentation.
## Feature Improvements

- Use **Bootstrap** to enhance the aesthetic and responsiveness of the interface.
- Add **loading animations**: Inform users that data is loading with a Spinner animation during data fetching.
- Include **error prompts**: Display user-friendly red error message boxes when errors occur.
- Utilize card (`Card`) layouts to present information for each trading pool, making the interface neater and more visually appealing.
- Add a **"View Details"** button for the expansion of further interactive features.
## Project Dependencies

Before installing and running this project, ensure you have the following tools installed:

- **Node.js**: v14 or higher
- **npm**: Typically installed alongside Node.js

### Dependencies

Below are the main dependencies required for the project:

- **React**: Front-end framework
- **Apollo Client**: Interacts with The Graph's GraphQL API
- **Bootstrap**: For beautifying the user interface
- **GraphQL**: For parsing GraphQL queries

All these dependencies can be automatically installed by running the installation command.

## Installation Steps

1. **Clone the Repository**

   Clone the project into your local development environment using the following command:

   ```bash
   git clone https://github.com/your-username/uniswap-aaron-
  ## Run the Project
check whether you have npm properly
   

     npm install  

run the project

    npm start
    ```markdown
After starting, you can visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project File Explanation

- **`src/`**: Contains all the source code files.
  - **`index.js`**: The entry file of the application.
  - **`App.js`**: The main application component.
  - **`Pools.js`**: A component for displaying Uniswap trading pool information.
- **`public/`**: Contains `index.html`, which is the base HTML file for the React application.
- **`package.json`**: Contains project information and a list of dependencies.
	 |--fronted
			
		 |--public   
		 // used to set up a basic React application. The `index.html` file provides the structure for the web page, `manifest.json` configures the web app for installation on devices, and `robots.txt` instructs search engine crawlers not to index the site.
		 |--src      
		 //form a React application that uses GraphQL to fetch and display data, with styling and testing setup.
		 
|--public
		
	index.html//serves as the entry point for a React application.
|-src
		
		//create a simple React application that displays 
		data fetched from a GraphQL API using Apollo Client.
		 The `App` component is the main entry point, which includes the `Pools` component to show the data.
		The application's styling is defined in `index.css`, and the root is set up in `index.js` with Apollo Client for data management.

## Dependency List

The **`package.json`** file lists all dependencies, including the following:

```json
"dependencies": {
  "@apollo/client": "^3.5.10",
  "bootstrap": "^5.3.0",
  "graphql": "^15.5.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-scripts": "5.0.1"
}
```

To use these dependencies, users simply need to run the `npm install` command.

## Other Commands

### Creating a Production Build

If you need to create an optimized build for a production environment, you can use the following command:

bash

```bash
npm run build
```

This will create a production version of the application in the `build/` folder.

## Technology Stack

-   **React**: Used for creating user interfaces.
-   **Apollo Client**: Used for managing GraphQL queries and state with The Graph.
-   **Bootstrap**: Used for quick beautification and responsive layouts.
 


		 
