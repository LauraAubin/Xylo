# Xylo

## Description

Xylo is a tool to explore how people remember passwords using sound and color. This project is meant for COMP 3008 Human Computer Interaction at Carleton University.

<img src="https://github.com/LauraAubin/Xylo/blob/master/Images/Collection.jpg" />

## Development

**Initial setup**

- Clone the repo.
- Make sure that your Node version is greater than 11. You can check this with `node -v` and upgrade with `brew upgrade node`.
- From the base folder run `npm install` to create node_modules.
- Navigate to the `/client` folder and run `npm install` here as well.

**Running the app**

- From the base folder, start the server with `yarn dev` and navigate to `http://localhost:3000/`.

**Ignoring local changes to the log file**

- Run `git update-index --assume-unchanged LogFile.txt` in your console to ignore any future changes to `LogFile.txt`.
