# Community Manager API

This project is a REST API built using Node.js, Express, and MongoDB, enabling users to create communities and manage members. The application follows the Repository pattern for organized development.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/bhav380-2/SDE_intern_assignment_REST-API.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

Users can create communities, and as creators, they automatically become Community Admins. They can add other users to the community, who are assigned the Community Member role.

```bash
# To start the API in development environment
npm start

# To start the API in production environment
npm run prod_start
