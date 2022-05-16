# JS_harjotus2_dom

- How to make a transfer Javascript to Typescript https://youtu.be/qFMMOJucqTw :
- npx tsc --init (to create tsconfig.json, then uncomment: ”outDoor”: ”./dist”, server.js is placed”rootDir”: ”./”, ”moduleResolution”…)
- npm -D typescript @types/node @types/express @types/nodemon (to adding into devDependcies)
- change the server.js to server.ts
- add to package.json:
- ”scripts":
  { "start": "nodemon dist/server.js",
  "build": "tsc -p tsconfig.json"
  },
- npm run build (it compile the server.ts to /dist/server.js, this command has been set in package.json)
- npm start
