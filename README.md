# Swiggy Magical Arena

This project implements a Magical Arena where players can fight matches. Each player has attributes such as health, strength, and attack. The game ends when a player's health reaches 0.

## Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/download/) installed.

## Installation

1. unzip the repository

2. Navigate to the project directory:

   ```bash
   cd magical-arena
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Server

Start the server using the following command:

```bash
npm run start
```

The server will be running at `http://localhost:3000`.

## API Endpoints

You can use the following Postman collection to test the APIs:
[Swiggy.postman_collection.json](https://github.com/user-attachments/files/16162948/Swiggy.postman_collection.json)

### 1. Add a New PlayerA

**Endpoint:** `POST /players`

**Body:**

```json
{
  "name": "PlayerA",
  "health": 50,
  "strength": 5,
  "attack": 10
}
```

### 2. Add a New PlayerB

**Endpoint:** `POST /players`

**Body:**

```json
{
  "name": "PlayerB",
  "health": 100,
  "strength": 10,
  "attack": 5
}
```

### 3. Get All Players

**Endpoint:** `GET /players`

### 4. Fight

**Endpoint:** `POST /arena`

**Body:**

```json
{
  "playerAName": "PlayerA",
  "playerBName": "PlayerB"
}
```

## Testing

To run the unit tests, use the following command:

```bash
npm run test
```

## License

This project is licensed under the MIT License.
